export type Difficulty = "easy" | "medium" | "hard"

export interface Challenge {
  type: "article" | "video"
  text: string
  blanks: string[]
  hints: string[]
  source: { title: string; author: string; url: string }
  videoPath?: string
  difficulty: Difficulty
}

export const challenges: Challenge[] = [
  {
    type: "article",
    text: "The ___ fox jumps over the ___ dog.",
    blanks: ["quick", "lazy"],
    hints: ["fast or rapid", "not active or energetic"],
    source: { title: "Classic Proverb", author: "Unknown", url: "https://roundcube.telecomnancy.eu/?_task=mail&_mbox=INBOX" },
    difficulty: "easy",
  },
  {
    type: "article",
    text: "She ___ to the store to ___ some groceries.",
    blanks: ["went", "buy"],
    hints: ["past tense of go", "to purchase"],
    source: { title: "Daily English", author: "Language Institute", url: "#" },
    difficulty: "easy",
  },
  {
    type: "video",
    text: "The speaker mentioned that learning a language requires ___ and ___.",
    blanks: ["patience", "practice"],
    hints: ["ability to wait calmly", "repeated exercise to improve skill"],
    source: { title: "Language Learning Tips", author: "Education Channel", url: "#" },
    videoPath: "/videos/language-learning.mp4",
    difficulty: "easy",
  },
  {
    type: "article",
    text: "The ___ of the story is that honesty is the ___ policy.",
    blanks: ["moral", "best"],
    hints: ["lesson or message", "superior to all others"],
    source: { title: "Aesop's Fables", author: "Aesop", url: "#" },
    difficulty: "medium",
  },
  {
    type: "article",
    text: "She was ___ by the ___ of the sunset over the ocean.",
    blanks: ["amazed", "beauty"],
    hints: ["greatly surprised or impressed", "pleasing quality that delights the senses"],
    source: { title: "Travel Journal", author: "Wanderlust Magazine", url: "#" },
    difficulty: "medium",
  },
  {
    type: "video",
    text: "According to the lecture, climate change is primarily caused by ___ and ___.",
    blanks: ["emissions", "deforestation"],
    hints: ["release of gases", "clearing of forests"],
    source: { title: "Environmental Science", author: "Dr. Green", url: "#" },
    videoPath: "/videos/test.mp4",
    difficulty: "medium",
  },
  {
    type: "article",
    text: "The ___ to success is ___ and determination.",
    blanks: ["key", "hard work"],
    hints: ["tool that unlocks something", "diligent effort"],
    source: { title: "Success Principles", author: "Achievement Press", url: "#" },
    difficulty: "hard",
  },
  {
    type: "article",
    text: "She ___ her mind and decided to ___ a different career path.",
    blanks: ["changed", "pursue"],
    hints: ["altered or modified", "to follow or chase"],
    source: { title: "Career Transitions", author: "Professional Growth", url: "#" },
    difficulty: "hard",
  },
  {
    type: "video",
    text: "The documentary explained how ___ can affect our ___ health.",
    blanks: ["stress", "mental"],
    hints: ["pressure or tension", "relating to the mind"],
    source: { title: "Health & Wellness", author: "Medical Channel", url: "#" },
    videoPath: "/videos/mental-health.mp4",
    difficulty: "hard",
  },
  {
    type: "article",
    text: "The ___ of the experiment ___ the scientist's hypothesis.",
    blanks: ["results", "confirmed"],
    hints: ["outcomes or consequences", "verified or proved"],
    source: { title: "Scientific Method", author: "Research Journal", url: "#" },
    difficulty: "hard",
  },
]

export const getDifficultyColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "easy":
      return "emerald"
    case "medium":
      return "amber"
    case "hard":
      return "rose"
    default:
      return "sky"
  }
}

export const getDifficultyEmoji = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "easy":
      return "🌱"
    case "medium":
      return "🌿"
    case "hard":
      return "🌳"
    default:
      return "✨"
  }
}
