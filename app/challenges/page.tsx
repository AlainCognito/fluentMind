"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { challenges, type Difficulty, getDifficultyColor, getDifficultyEmoji } from "@/lib/data"
import { CheckCircle, BrainCircuit, BookOpen, Video, BarChart } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function Challenges() {
  const router = useRouter()
  const [progress, setProgress] = useState<number[]>([])
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "all">("all")

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

  // Filter challenges based on difficulty
  const filteredChallenges = challenges.filter((challenge) => {
    return selectedDifficulty === "all" || challenge.difficulty === selectedDifficulty
  })

  // Count challenges by difficulty
  const easyChallenges = challenges.filter((c) => c.difficulty === "easy").length
  const mediumChallenges = challenges.filter((c) => c.difficulty === "medium").length
  const hardChallenges = challenges.filter((c) => c.difficulty === "hard").length

  // Count completed challenges by difficulty
  const completedEasy = progress.filter((index) => challenges[index].difficulty === "easy").length
  const completedMedium = progress.filter((index) => challenges[index].difficulty === "medium").length
  const completedHard = progress.filter((index) => challenges[index].difficulty === "hard").length

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-sky-50 to-indigo-50">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <BrainCircuit className="h-6 w-6 text-sky-600 mr-2" />
            <h1 className="text-2xl font-bold text-sky-700">FluentMind</h1>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-slate-600 hidden sm:block">
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

        {/* Difficulty tabs */}
        <Tabs
          defaultValue="all"
          className="mb-6"
          onValueChange={(value) => setSelectedDifficulty(value as Difficulty | "all")}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all" className="px-4">
                All
                <Badge variant="outline" className="ml-2">
                  {challenges.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="easy" className="px-4">
                Easy
                <Badge variant="outline" className="ml-2 bg-emerald-50 text-emerald-700 border-emerald-200">
                  {completedEasy}/{easyChallenges}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="medium" className="px-4">
                Medium
                <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                  {completedMedium}/{mediumChallenges}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="hard" className="px-4">
                Hard
                <Badge variant="outline" className="ml-2 bg-rose-50 text-rose-700 border-rose-200">
                  {completedHard}/{hardChallenges}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <ChallengeGrid
              filteredChallenges={filteredChallenges}
              progress={progress}
              currentChallenge={currentChallenge}
            />
          </TabsContent>

          <TabsContent value="easy" className="mt-0">
            <ChallengeGrid
              filteredChallenges={filteredChallenges}
              progress={progress}
              currentChallenge={currentChallenge}
            />
          </TabsContent>

          <TabsContent value="medium" className="mt-0">
            <ChallengeGrid
              filteredChallenges={filteredChallenges}
              progress={progress}
              currentChallenge={currentChallenge}
            />
          </TabsContent>

          <TabsContent value="hard" className="mt-0">
            <ChallengeGrid
              filteredChallenges={filteredChallenges}
              progress={progress}
              currentChallenge={currentChallenge}
            />
          </TabsContent>
        </Tabs>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-slate-700 mb-2">No challenges found</h3>
            <p className="text-slate-500">Try selecting a different difficulty level</p>
          </div>
        )}
      </div>
    </main>
  )
}

function ChallengeGrid({
  filteredChallenges,
  progress,
  currentChallenge,
}: {
  filteredChallenges: typeof challenges
  progress: number[]
  currentChallenge: number
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence>
        {filteredChallenges.map((challenge) => {
          // Find the index in the original challenges array
          const originalIndex = challenges.findIndex(
            (c) => c.text === challenge.text && c.type === challenge.type && c.difficulty === challenge.difficulty,
          )

          const isCompleted = progress.includes(originalIndex)
          const isCurrent = currentChallenge === originalIndex && !isCompleted
          const difficultyColor = getDifficultyColor(challenge.difficulty)
          const difficultyEmoji = getDifficultyEmoji(challenge.difficulty)

          return (
            <motion.div
              key={originalIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/challenge/${originalIndex}`}>
                <Card
                  className={`
                  h-full cursor-pointer border-2 overflow-hidden
                  ${
                    isCompleted
                      ? "border-green-400 bg-gradient-to-br from-green-50 to-green-100"
                      : isCurrent
                        ? "border-sky-400 bg-gradient-to-br from-sky-50 to-sky-100"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                  }
                `}
                >
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-3">
                      <Badge
                        className={
                          challenge.difficulty === "easy"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : challenge.difficulty === "medium"
                              ? "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"
                              : "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100"
                        }
                      >
                        {difficultyEmoji} {challenge.difficulty}
                      </Badge>
                      <span className="text-sm font-medium text-slate-500">#{originalIndex + 1}</span>
                    </div>

                    <div className="flex items-center mb-3">
                      {challenge.type === "article" ? (
                        <BookOpen
                          className={`h-5 w-5 mr-2 ${
                            isCompleted
                              ? "text-green-500"
                              : isCurrent
                                ? "text-sky-500"
                                : challenge.difficulty === "easy"
                                  ? "text-emerald-500"
                                  : challenge.difficulty === "medium"
                                    ? "text-amber-500"
                                    : "text-rose-500"
                          }`}
                        />
                      ) : (
                        <Video
                          className={`h-5 w-5 mr-2 ${
                            isCompleted
                              ? "text-green-500"
                              : isCurrent
                                ? "text-sky-500"
                                : challenge.difficulty === "easy"
                                  ? "text-emerald-500"
                                  : challenge.difficulty === "medium"
                                    ? "text-amber-500"
                                    : "text-rose-500"
                          }`}
                        />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          isCompleted
                            ? "text-green-700"
                            : isCurrent
                              ? "text-sky-700"
                              : challenge.difficulty === "easy"
                                ? "text-emerald-700"
                                : challenge.difficulty === "medium"
                                  ? "text-amber-700"
                                  : "text-rose-700"
                        }`}
                      >
                        {challenge.type === "article" ? "Reading" : "Watching"}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 mt-3">{challenge.source.title}</div>

                    {isCompleted && (
                      <div className="absolute top-3 right-3">
                        <div className="bg-green-500 rounded-full p-1">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
