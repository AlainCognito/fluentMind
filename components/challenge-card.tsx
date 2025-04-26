"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { LightbulbIcon, CheckCircle, XCircle, Play } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { getDifficultyColor, getDifficultyEmoji, type Difficulty } from "@/lib/data"

interface ChallengeCardProps {
  index: number
  total: number
  type: "article" | "video"
  displayType: string
  text: string
  blanks: string[]
  hints: string[]
  source: { title: string; author: string; url: string }
  videoPath?: string
  difficulty: Difficulty
  onComplete: () => void
  onNext: () => void
}

export default function ChallengeCard({
  index,
  total,
  type,
  displayType,
  text,
  blanks,
  hints,
  source,
  videoPath,
  difficulty,
  onComplete,
  onNext,
}: ChallengeCardProps) {
  const [answers, setAnswers] = useState<string[]>(Array(blanks.length).fill(""))
  const [showAnswers, setShowAnswers] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  // Reset state when challenge changes
  useEffect(() => {
    setAnswers(Array(blanks.length).fill(""))
    setShowAnswers(false)
    setIsCorrect(null)
    setIsCompleted(false)
    setIsVideoPlaying(false)
  }, [index, blanks.length])

  // Video event listeners
  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current

      const handlePlay = () => setIsVideoPlaying(true)
      const handlePause = () => setIsVideoPlaying(false)
      const handleEnded = () => setIsVideoPlaying(false)

      videoElement.addEventListener("play", handlePlay)
      videoElement.addEventListener("pause", handlePause)
      videoElement.addEventListener("ended", handleEnded)

      return () => {
        videoElement.removeEventListener("play", handlePlay)
        videoElement.removeEventListener("pause", handlePause)
        videoElement.removeEventListener("ended", handleEnded)
      }
    }
  }, [videoRef])

  // Split text by underscores to create input fields
  const textParts = text.split("___")

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    const correct = answers.every((answer, index) => answer.toLowerCase().trim() === blanks[index].toLowerCase().trim())

    setIsCorrect(correct)

    if (correct) {
      setIsCompleted(true)
      onComplete()
    }
  }

  const handleShowAnswers = () => {
    setShowAnswers(true)
    setAnswers([...blanks])
    setIsCompleted(true)
    onComplete()
  }

  // Calculate input widths based on answer length
  const getInputWidth = (index: number) => {
    const length = blanks[index].length
    return `ch-${Math.max(length + 2, 8)}`
  }

  const difficultyColor = getDifficultyColor(difficulty)
  const difficultyEmoji = getDifficultyEmoji(difficulty)

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error)
      })
    }
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Challenge {index} of {total} · {displayType}
        </h2>
        <Badge
          className={
            difficulty === "easy"
              ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              : difficulty === "medium"
                ? "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"
                : "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100"
          }
        >
          {difficultyEmoji} {difficulty}
        </Badge>
      </div>

      {type === "video" && videoPath && (
        <div className="mb-6 aspect-video rounded-lg overflow-hidden bg-black relative" ref={videoContainerRef}>
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className={`w-full h-full ${!isVideoPlaying ? "opacity-0" : ""}`}
              preload="metadata"
              controls={isVideoPlaying}
            >
              <source src={videoPath} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play button overlay */}
            {!isVideoPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={handlePlayVideo}
              >
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                  <Play className="h-10 w-10 text-white ml-1" fill="currentColor" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="text-lg leading-relaxed">
          {textParts.map((part, i) => (
            <span key={i}>
              {part}
              {i < textParts.length - 1 && (
                <span className="inline-block">
                  <input
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    value={answers[i] || ""}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                    disabled={showAnswers}
                    className={`mx-1 px-2 py-1 border-b-2 focus:border-sky-500 outline-none text-center ${
                      showAnswers
                        ? "bg-green-50 border-green-500 text-green-700"
                        : isCorrect === false
                          ? "bg-red-50 border-red-300"
                          : "border-slate-300"
                    } ${getInputWidth(i)}`}
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-xs text-slate-400 hover:text-sky-500">
                        <LightbulbIcon className="h-3 w-3 inline mr-1" />
                        Hint
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2 text-sm">{hints[i]}</PopoverContent>
                  </Popover>
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {isCorrect !== null && (
        <div
          className={`mb-4 p-3 rounded-lg flex items-center ${
            isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {isCorrect ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Correct! Well done.</span>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 mr-2" />
              <span>Not quite right. Try again or check the answers.</span>
            </>
          )}
        </div>
      )}

      <div className="text-xs text-slate-500 mb-6">
        Source:{" "}
        {source.url ? (
          <Link href={source.url} className="hover:underline">
            {source.title} — {source.author}
          </Link>
        ) : (
          <span>
            {source.title} — {source.author}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {!isCompleted ? (
          <>
            <Button onClick={handleSubmit} className="bg-sky-600 hover:bg-sky-700">
              Submit
            </Button>
            <Button variant="ghost" onClick={handleShowAnswers}>
              Show Answers
            </Button>
          </>
        ) : (
          <Button onClick={onNext} className="bg-sky-600 hover:bg-sky-700">
            Next Challenge
          </Button>
        )}
      </div>
    </div>
  )
}
