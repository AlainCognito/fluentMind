"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { challenges } from "@/lib/data"
import { CheckCircle, Trophy, BrainCircuit } from "lucide-react"

export default function Summary() {
  const router = useRouter()
  const [progress, setProgress] = useState<number[]>([])

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("challengeProgress")

    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  const completedCount = progress.length
  const totalCount = challenges.length
  const isAllCompleted = completedCount === totalCount

  const resetProgress = () => {
    localStorage.setItem("challengeProgress", JSON.stringify([]))
    localStorage.setItem("currentChallenge", "0")
    router.push("/")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-sky-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <BrainCircuit className="h-6 w-6 text-sky-600 mr-2" />
          <h1 className="text-2xl font-bold text-sky-700">FluentMind</h1>
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <Trophy className="h-16 w-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Great job!</h1>

        <p className="text-slate-600 mb-6">
          {isAllCompleted
            ? "You've completed all challenges! Your English skills are improving with every exercise."
            : `You've completed ${completedCount} out of ${totalCount} challenges. Keep going to master your skills!`}
        </p>

        {isAllCompleted ? (
          <div className="mb-6 flex justify-center">
            <CheckCircle className="text-green-500 h-8 w-8" />
          </div>
        ) : (
          <div className="mb-6 text-lg font-medium">
            Progress: {completedCount}/{totalCount}
          </div>
        )}

        <div className="space-y-3">
          <Button onClick={() => router.push("/tree")} className="w-full bg-sky-600 hover:bg-sky-700">
            View All Challenges
          </Button>

          <Button variant="outline" onClick={resetProgress} className="w-full">
            Start Over
          </Button>
        </div>
      </div>
    </main>
  )
}
