"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { challenges } from "@/lib/data"
import ChallengeCard from "@/components/challenge-card"
import { Button } from "@/components/ui/button"
import { BrainCircuit, BarChart } from "lucide-react"

export default function Challenge({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()

  // Safely unwrap params
  const { id } = use(params)
  const challengeId = typeof id === "string" ? Number.parseInt(id, 10) : 0
  const challenge = challenges[challengeId]

  const [progress, setProgress] = useState<number[]>([])
  const [currentChallenge, setCurrentChallenge] = useState(0)

  useEffect(() => {
    const savedProgress = localStorage.getItem("challengeProgress")
    const savedCurrent = localStorage.getItem("currentChallenge")

    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }

    if (savedCurrent) {
      setCurrentChallenge(Number.parseInt(savedCurrent, 10))
    }
  }, [])

  if (!challenge) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-sky-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Challenge Not Found</h1>
          <Button onClick={() => router.push("/challenges")}>Back to Challenges</Button>
        </div>
      </main>
    )
  }

  const markAsCompleted = () => {
    const newProgress = [...progress]
    if (!newProgress.includes(challengeId)) {
      newProgress.push(challengeId)
      setProgress(newProgress)
      localStorage.setItem("challengeProgress", JSON.stringify(newProgress))
    }

    if (currentChallenge === challengeId) {
      const nextChallenge = challengeId + 1
      if (nextChallenge < challenges.length) {
        setCurrentChallenge(nextChallenge)
        localStorage.setItem("currentChallenge", nextChallenge.toString())
      }
    }
  }

  const handleNext = () => {
    const nextId = challengeId + 1
    if (nextId < challenges.length) {
      router.push(`/challenge/${nextId}`)
    } else {
      router.push("/challenges")
    }
  }

  const displayType = challenge.type === "article" ? "Reading" : "Watching"

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-slate-50 to-sky-50">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <BrainCircuit className="h-5 w-5 text-sky-600 mr-2" />
            <span className="font-medium text-sky-700">FluentMind</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push("/progress")}>
              <BarChart className="h-4 w-4 mr-1" />
              Progress
            </Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/challenges")}>
              Back
            </Button>
          </div>
        </div>

        <ChallengeCard
          key={challengeId}
          index={challengeId + 1}
          total={challenges.length}
          type={challenge.type}
          displayType={displayType}
          text={challenge.text}
          blanks={challenge.blanks}
          hints={challenge.hints}
          source={challenge.source}
          videoPath={challenge.videoPath}
          difficulty={challenge.difficulty}
          onComplete={markAsCompleted}
          onNext={handleNext}
        />
      </div>
    </main>
  )
}
