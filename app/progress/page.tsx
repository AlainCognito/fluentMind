"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { challenges } from "@/lib/data"
import {
  BrainCircuit,
  Trophy,
  BookOpen,
  Video,
  AlertTriangle,
  CheckCircle,
  Award,
  Target,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ProgressPage() {
  const router = useRouter()
  const [progress, setProgress] = useState<number[]>([])
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("challengeProgress")

    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  const resetProgress = () => {
    localStorage.setItem("challengeProgress", JSON.stringify([]))
    localStorage.setItem("currentChallenge", "0")
    setProgress([])
    setShowResetDialog(false)
  }

  const completedCount = progress.length
  const totalCount = challenges.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  // Calculate reading and watching stats
  const readingChallenges = challenges.filter((c) => c.type === "article")
  const watchingChallenges = challenges.filter((c) => c.type === "video")

  const completedReading = progress.filter((index) => challenges[index].type === "article").length
  const completedWatching = progress.filter((index) => challenges[index].type === "video").length

  const readingPercentage = Math.round((completedReading / readingChallenges.length) * 100) || 0
  const watchingPercentage = Math.round((completedWatching / watchingChallenges.length) * 100) || 0

  // Calculate difficulty stats
  const easyChallenges = challenges.filter((c) => c.difficulty === "easy")
  const mediumChallenges = challenges.filter((c) => c.difficulty === "medium")
  const hardChallenges = challenges.filter((c) => c.difficulty === "hard")

  const completedEasy = progress.filter((index) => challenges[index].difficulty === "easy").length
  const completedMedium = progress.filter((index) => challenges[index].difficulty === "medium").length
  const completedHard = progress.filter((index) => challenges[index].difficulty === "hard").length

  const easyPercentage = Math.round((completedEasy / easyChallenges.length) * 100) || 0
  const mediumPercentage = Math.round((completedMedium / mediumChallenges.length) * 100) || 0
  const hardPercentage = Math.round((completedHard / hardChallenges.length) * 100) || 0

  // Calculate achievements
  const achievements = [
    {
      title: "First Steps",
      description: "Complete your first challenge",
      icon: <Award className="h-6 w-6 text-amber-500" />,
      unlocked: completedCount >= 1,
      progress: Math.min(completedCount, 1),
      total: 1,
    },
    {
      title: "Bookworm",
      description: "Complete 3 reading challenges",
      icon: <BookOpen className="h-6 w-6 text-emerald-500" />,
      unlocked: completedReading >= 3,
      progress: Math.min(completedReading, 3),
      total: 3,
    },
    {
      title: "Visual Learner",
      description: "Complete 3 watching challenges",
      icon: <Video className="h-6 w-6 text-blue-500" />,
      unlocked: completedWatching >= 3,
      progress: Math.min(completedWatching, 3),
      total: 3,
    },
    {
      title: "Easy Mastery",
      description: "Complete all easy challenges",
      icon: <Award className="h-6 w-6 text-emerald-500" />,
      unlocked: completedEasy === easyChallenges.length,
      progress: completedEasy,
      total: easyChallenges.length,
    },
    {
      title: "Medium Mastery",
      description: "Complete all medium challenges",
      icon: <Award className="h-6 w-6 text-amber-500" />,
      unlocked: completedMedium === mediumChallenges.length,
      progress: completedMedium,
      total: mediumChallenges.length,
    },
    {
      title: "Hard Mastery",
      description: "Complete all hard challenges",
      icon: <Award className="h-6 w-6 text-rose-500" />,
      unlocked: completedHard === hardChallenges.length,
      progress: completedHard,
      total: hardChallenges.length,
    },
    {
      title: "Halfway There",
      description: "Complete 50% of all challenges",
      icon: <Target className="h-6 w-6 text-purple-500" />,
      unlocked: completionPercentage >= 50,
      progress: completedCount,
      total: Math.ceil(totalCount / 2),
    },
    {
      title: "Master Linguist",
      description: "Complete all challenges",
      icon: <Trophy className="h-6 w-6 text-yellow-500" />,
      unlocked: completionPercentage === 100,
      progress: completedCount,
      total: totalCount,
    },
  ]

  const unlockedAchievements = achievements.filter((a) => a.unlocked).length
  const totalAchievements = achievements.length
  const achievementPercentage = Math.round((unlockedAchievements / totalAchievements) * 100)

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-sky-50 to-indigo-50">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <BrainCircuit className="h-6 w-6 text-sky-600 mr-2" />
            <h1 className="text-2xl font-bold text-sky-700">FluentMind</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push("/challenges")}>
              Challenges
            </Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/")}>
              Home
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Summary Card */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-sky-600" />
                  Learning Summary
                </CardTitle>
                <CardDescription>Your overall learning progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-sky-50 to-sky-100 p-4 rounded-xl border border-sky-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-sky-700">Completion</h3>
                      <span className="text-lg font-bold text-sky-700">{completionPercentage}%</span>
                    </div>
                    <Progress value={completionPercentage} className="h-2 mb-2" />
                    <p className="text-xs text-sky-600">
                      {completedCount} of {totalCount} challenges completed
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-amber-700">Achievements</h3>
                      <span className="text-lg font-bold text-amber-700">{achievementPercentage}%</span>
                    </div>
                    <Progress value={achievementPercentage} className="h-2 mb-2">
                      <div className="h-full bg-amber-500" style={{ width: `${achievementPercentage}%` }}></div>
                    </Progress>
                    <p className="text-xs text-amber-600">
                      {unlockedAchievements} of {totalAchievements} achievements unlocked
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-emerald-500" /> Reading
                      </span>
                      <span className="text-sm font-medium">{readingPercentage}%</span>
                    </div>
                    <Progress value={readingPercentage} className="h-2 bg-slate-100">
                      <div className="h-full bg-emerald-500" style={{ width: `${readingPercentage}%` }}></div>
                    </Progress>
                    <p className="text-xs text-muted-foreground mt-1">
                      {completedReading} of {readingChallenges.length} reading challenges completed
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium flex items-center">
                        <Video className="h-4 w-4 mr-1 text-blue-500" /> Watching
                      </span>
                      <span className="text-sm font-medium">{watchingPercentage}%</span>
                    </div>
                    <Progress value={watchingPercentage} className="h-2 bg-slate-100">
                      <div className="h-full bg-blue-500" style={{ width: `${watchingPercentage}%` }}></div>
                    </Progress>
                    <p className="text-xs text-muted-foreground mt-1">
                      {completedWatching} of {watchingChallenges.length} watching challenges completed
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="ml-auto">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Reset Progress
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will reset all your progress and achievements. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={resetProgress} className="bg-red-500 hover:bg-red-600">
                        Reset
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>

            {/* Difficulty Progress */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-sky-600" />
                  Difficulty Progress
                </CardTitle>
                <CardDescription>Your progress across difficulty levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                        Easy
                      </span>
                      <span className="text-sm font-medium">{easyPercentage}%</span>
                    </div>
                    <Progress value={easyPercentage} className="h-2 bg-slate-100">
                      <div className="h-full bg-emerald-500" style={{ width: `${easyPercentage}%` }}></div>
                    </Progress>
                    <p className="text-xs text-muted-foreground mt-1">
                      {completedEasy} of {easyChallenges.length} easy challenges completed
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                        Medium
                      </span>
                      <span className="text-sm font-medium">{mediumPercentage}%</span>
                    </div>
                    <Progress value={mediumPercentage} className="h-2 bg-slate-100">
                      <div className="h-full bg-amber-500" style={{ width: `${mediumPercentage}%` }}></div>
                    </Progress>
                    <p className="text-xs text-muted-foreground mt-1">
                      {completedMedium} of {mediumChallenges.length} medium challenges completed
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-rose-500 mr-2"></span>
                        Hard
                      </span>
                      <span className="text-sm font-medium">{hardPercentage}%</span>
                    </div>
                    <Progress value={hardPercentage} className="h-2 bg-slate-100">
                      <div className="h-full bg-rose-500" style={{ width: `${hardPercentage}%` }}></div>
                    </Progress>
                    <p className="text-xs text-muted-foreground mt-1">
                      {completedHard} of {hardChallenges.length} hard challenges completed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-amber-500" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  {unlockedAchievements} of {achievements.length} achievements unlocked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className={`flex items-center p-4 rounded-lg border ${
                                  achievement.unlocked
                                    ? "bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-200"
                                    : "bg-slate-50 border-slate-200"
                                }`}
                              >
                                <div
                                  className={`mr-4 p-3 rounded-full ${
                                    achievement.unlocked ? "bg-white shadow-sm" : "bg-slate-100"
                                  }`}
                                >
                                  {achievement.icon}
                                </div>
                                <div className="flex-grow">
                                  <h3 className="font-medium text-sm">{achievement.title}</h3>
                                  <p className="text-xs text-slate-500">{achievement.description}</p>
                                  <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5">
                                    <div
                                      className={`h-1.5 rounded-full ${
                                        achievement.unlocked ? "bg-green-500" : "bg-sky-400"
                                      }`}
                                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs text-slate-400 mt-1">
                                    {achievement.progress} / {achievement.total}
                                  </p>
                                </div>
                                {achievement.unlocked && (
                                  <div className="ml-2">
                                    <div className="bg-green-500 rounded-full p-1">
                                      <CheckCircle className="h-4 w-4 text-white" />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {achievement.unlocked
                                  ? "Achievement unlocked!"
                                  : "Keep going to unlock this achievement!"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
