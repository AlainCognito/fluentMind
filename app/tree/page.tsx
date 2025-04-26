"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { challenges } from "@/lib/data"
import { CheckCircle, BrainCircuit, BookOpen, Video, BarChart } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function Tree() {
  const router = useRouter()
  const [progress, setProgress] = useState<number[]>([])
  const [currentChallenge, setCurrentChallenge] = useState(0)

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("challengeProgress")
    const savedCurrent = localStorage.getItem("currentChallenge")

    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }

    if (savedCurrent) {
      setCurrentChallenge(Number.parseInt(savedCurrent, 10))
    } else {
      // If no current challenge is set, set it to the first uncompleted challenge
      setCurrentChallenge(0)
      localStorage.setItem("currentChallenge", "0")
    }
  }, [])

  const completedCount = progress.length
  const totalCount = challenges.length

  // Group challenges for layout
  const leftChallenges = challenges.filter((_, i) => i % 3 === 0)
  const middleChallenges = challenges.filter((_, i) => i % 3 === 1)
  const rightChallenges = challenges.filter((_, i) => i % 3 === 2)

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-sky-50 to-indigo-50">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-16 h-16 rounded-full bg-sky-100 opacity-40"></div>
        <div className="absolute top-40 right-[15%] w-24 h-24 rounded-full bg-indigo-100 opacity-50"></div>
        <div className="absolute bottom-[20%] left-[20%] w-32 h-32 rounded-full bg-blue-100 opacity-30"></div>
        <div className="absolute bottom-[30%] right-[25%] w-20 h-20 rounded-full bg-sky-100 opacity-40"></div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-[15%] left-[30%] w-8 h-8 rounded-full bg-sky-200 opacity-30"
          animate={{ y: [0, -15, 0], transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } }}
        ></motion.div>
        <motion.div
          className="absolute top-[25%] right-[35%] w-6 h-6 rounded-full bg-indigo-200 opacity-30"
          animate={{
            y: [0, -10, 0],
            transition: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 },
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-[35%] left-[40%] w-10 h-10 rounded-full bg-blue-200 opacity-30"
          animate={{
            y: [0, -12, 0],
            transition: { duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 },
          }}
        ></motion.div>
      </div>

      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <BrainCircuit className="h-6 w-6 text-sky-600 mr-2" />
            <h1 className="text-2xl font-bold text-sky-700">FluentMind</h1>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-slate-600">
              <span className="font-medium">{completedCount}</span> of <span className="font-medium">{totalCount}</span>{" "}
              completed
            </p>
            <Button variant="outline" size="sm" onClick={() => router.push("/progress")}>
              <BarChart className="h-4 w-4 mr-1" />
              Progress
            </Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/")}>
              Home
            </Button>
          </div>
        </div>

        {/* Challenge grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
          {/* Left column */}
          <div className="flex flex-col items-center gap-6">
            {leftChallenges.map((challenge, branchIndex) => {
              const index = branchIndex * 3
              const isCompleted = progress.includes(index)
              const isCurrent = currentChallenge === index && !isCompleted

              return (
                <ChallengeNode
                  key={index}
                  index={index}
                  type={challenge.type}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                />
              )
            })}
          </div>

          {/* Middle column */}
          <div className="flex flex-col items-center gap-6">
            {middleChallenges.map((challenge, branchIndex) => {
              const index = branchIndex * 3 + 1
              const isCompleted = progress.includes(index)
              const isCurrent = currentChallenge === index && !isCompleted

              return (
                <ChallengeNode
                  key={index}
                  index={index}
                  type={challenge.type}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                />
              )
            })}
          </div>

          {/* Right column */}
          <div className="flex flex-col items-center gap-6">
            {rightChallenges.map((challenge, branchIndex) => {
              const index = branchIndex * 3 + 2
              const isCompleted = progress.includes(index)
              const isCurrent = currentChallenge === index && !isCompleted

              return (
                <ChallengeNode
                  key={index}
                  index={index}
                  type={challenge.type}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                />
              )
            })}
          </div>
        </div>

        {completedCount === totalCount && (
          <div className="mt-6">
            <Button asChild className="w-full bg-sky-600 hover:bg-sky-700">
              <Link href="/summary">View Summary</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

// Challenge node component
function ChallengeNode({
  index,
  type,
  isCompleted,
  isCurrent,
}: {
  index: number
  type: string
  isCompleted: boolean
  isCurrent: boolean
}) {
  // Convert type labels
  const displayType = type === "article" ? "Reading" : "Watching"

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
      <Link
        href={`/challenge/${index}`}
        className={`
          relative flex flex-col items-center justify-center w-full h-32 rounded-xl 
          ${
            isCompleted
              ? "bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-400 shadow-md"
              : isCurrent
                ? "bg-gradient-to-br from-sky-100 to-sky-200 border-2 border-sky-400 shadow-md"
                : "bg-gradient-to-br from-white to-slate-100 border-2 border-slate-200 hover:border-sky-300"
          }
          transition-all duration-200 group
        `}
      >
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm">
          <span className="text-xs font-bold">{index + 1}</span>
        </div>

        {type === "article" ? (
          <BookOpen
            className={`h-10 w-10 mb-2 ${
              isCompleted ? "text-green-500" : isCurrent ? "text-sky-500" : "text-slate-400 group-hover:text-sky-400"
            }`}
          />
        ) : (
          <Video
            className={`h-10 w-10 mb-2 ${
              isCompleted ? "text-green-500" : isCurrent ? "text-sky-500" : "text-slate-400 group-hover:text-sky-400"
            }`}
          />
        )}

        <span
          className={`text-sm font-medium ${
            isCompleted ? "text-green-700" : isCurrent ? "text-sky-700" : "text-slate-600 group-hover:text-sky-600"
          }`}
        >
          {displayType}
        </span>

        {isCompleted && (
          <div className="absolute -bottom-3 -right-3 h-8 w-8 bg-white rounded-full p-1 shadow-sm">
            <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  )
}
