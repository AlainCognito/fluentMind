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
    text: " The ancient Egyptians built massive pyramids as part of their ___.",
    blanks: ["religion"],
    hints: ["A system of beliefs and worship"],
    source: { title: "Ancient Egypt", author: "Wikipedia", url: "https://en.wikipedia.org/wiki/Culture_of_Egypt" },
    difficulty: "easy",
  },
  {
    type: "video",
    text: "I just need to light the ___ , you have insurance right?.",
    blanks: ["torch"],
    hints: ["A portable light source that uses a flame."],
    source: { title: "Hydrogen", author: "Sick Science!", url: "https://www.youtube.com/@sickscience/" },
    videoPath: "/videos/v1.mp4",
    difficulty: "easy",
  },
  {
    type: "article",
    text: "Water changes from a liquid to a gas during the process of ___.",
    blanks: ["evaporation"],
    hints: ["Think about what happens when water boils"],
    source: { title: "Evaporation and the Water Cycle", author: "U.S. Geological Survey", url: "https://www.usgs.gov/special-topics/water-science-school/science/evaporation-and-water-cycle" },
    difficulty: "easy",
  },
  {
    type: "video",
    text: "My parents ___ into thinking computer games are no fun .",
    blanks: ["brainwashed"],
    hints: ["To make someone believe something untrue by using force or threats."],
    source: { title: "Video games", author: "JRE podcast", url: "https://www.youtube.com/channel/UCzQUP1qoWDoEbmsQxvdjxgQ" },
    videoPath: "/videos/v2.mp4",
    difficulty: "easy",
  },
  {
    type: "article",
    text: "Setting clear goals can increase your ___ to achieve them.",
    blanks: ["drive"],
    hints: ["The internal motivation that pushes you to act."],
    source: { title: "Motivation and Goal Setting", author: "Cuesta College", url: "https://www.cuesta.edu/student/resources/ssc/study_guides/study_skills/502_study_goals.html" },
    difficulty: "easy",
  },
  {
    type: "article",
    text: "The teacher used a variety of strategies to ___ to different learning styles.",
    blanks: ["cater"],
    hints: ["To provide what is needed or required."],
    source: { title: "7 types of learning styles", author: "Teach:able", url: "https://teachable.com/blog/types-of-learning-styles" },
    difficulty: "medium",
  },
  {
    type: "video",
    text: "So it isn't blown ___.",
    blanks: ["environmentally"],
    hints: ["relating to the natural world and the impact of human activity on it."],
    source: { title: "Electric tanks", author: "JRE podcast", url: "https://www.youtube.com/channel/UCzQUP1qoWDoEbmsQxvdjxgQ" },
    videoPath: "/videos/v3.mp4",
    difficulty: "medium",
  },
  {
    type: "article",
    text: " ___ is the process by which plants convert sunlight into chemical energy.",
    blanks: ["Photosynthesis"],
    hints: ["The process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll."],
    source: { title: "Plants", author: "National Geographic Education", url: "https://education.nationalgeographic.org/resource/photosynthesis/" },
    difficulty: "medium",
  },
  {
    type: "video",
    text: "We are launching to space by going to Earth's ___.",
    blanks: ["orbit"],
    hints: ["The curved path of a celestial object or spacecraft around a star, planet, or moon."],
    source: { title: "Scales", author: "the_science_fact", url: "https://www.youtube.com/@the_science_fact" },
    videoPath: "/videos/v4.mp4",
    difficulty: "medium",
  },
  {
    type: "article",
    text: "The treaty marked the end of the war and the beginning of a new political ___.",
    blanks: ["era"],
    hints: ["A period characterized by particular events or developments."],
    source: { title: "The Treaty of Versailles", author: "Office of the historian", url: "https://history.state.gov/milestones/1914-1920/paris-peace" },
    difficulty: "medium",
  },
  {
    type: "article",
    text: "After watching the documentary, she felt a profound sense of ___ , realizing that every stranger has a life as vivid and complex as her own.",
    blanks: ["sonder"],
    hints: ["The realization that each random passerby is living a life as complex as one's own.​"],
    source: { title: "The Dictionary of Obscure Sorrows", author: "Wikipedia", url: "https://en.wikipedia.org/wiki/The_Dictionary_of_Obscure_Sorrows" },
    difficulty: "hard",
  },
  {
    type: "video",
    text: "Caffein is an ___ .",
    blanks: ["adenosine antagonist"],
    hints: ["A substance that blocks the action of adenosine, a neurotransmitter that promotes sleep and relaxation."],
    source: { title: "Caffein", author: "JRE podcast", url: "https://www.youtube.com/channel/UCzQUP1qoWDoEbmsQxvdjxgQ" },
    videoPath: "/videos/v5.mp4",
    difficulty: "hard",
  },
  {
    type: "article",
    text: "The ancient manuscript was filled with ___ , making it a challenge for modern scholars to interpret.",
    blanks: ["hapax legomenon"],
    hints: ["A word or expression that occurs only once within a context, such as a single document or the entire corpus of a language.​"],
    source: { title: "Hapax legomenon", author: "Wikipedia", url: "https://en.wikipedia.org/wiki/Hapax_legomenon" },
    difficulty: "hard",
  },
  {
    type: "video",
    text: "There is an astronomer in that ___ .",
    blanks: ["observatory"],
    hints: ["place where astronomers observe celestial events"],
    source: { title: "The Universe", author: "UniverseLair", url: "https://www.youtube.com/@UniverseLair/" },
    videoPath: "/videos/v6.mp4",
    difficulty: "medium",
  },
  {
    type: "article",
    text: "The biologist was fascinated by the ___ , which seemed to defy conventional classification.",
    blanks: ["amphisbaena"],
    hints: ["cut into pieces", "putting in or including"],
    source: { title: "250 Unique Words With Their Meanings", author: "Parade", url: "https://parade.com/1241196/marynliles/unique-words/" },
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
