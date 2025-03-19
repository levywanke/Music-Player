"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

type Track = {
  id: number
  title: string
  artist: string
  album: string
  duration: number
  image: string
}

// Mock lyrics data
const mockLyrics = [
  { time: 0, text: "♪ (Music intro)" },
  { time: 5, text: "Verse 1:" },
  { time: 10, text: "I've been trying to call" },
  { time: 15, text: "I've been on my own for long enough" },
  { time: 20, text: "Maybe you can show me how to love, maybe" },
  { time: 25, text: "I'm going through withdrawals" },
  { time: 30, text: "You don't even have to do too much" },
  { time: 35, text: "You can turn me on with just a touch, baby" },
  { time: 40, text: "Chorus:" },
  { time: 45, text: "I look around and Sin City's cold and empty" },
  { time: 50, text: "No one's around to judge me" },
  { time: 55, text: "I can't see clearly when you're gone" },
  { time: 60, text: "I said, ooh, I'm blinded by the lights" },
  { time: 65, text: "No, I can't sleep until I feel your touch" },
  { time: 70, text: "I said, ooh, I'm drowning in the night" },
  { time: 75, text: "Oh, when I'm like this, you're the one I trust" },
]

export function LyricsModal({ track }: { track: Track | null }) {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0)

  useEffect(() => {
    // Simulate lyrics timing based on progress
    const interval = setInterval(() => {
      if (currentLyricIndex < mockLyrics.length - 1) {
        setCurrentLyricIndex((prev) => prev + 1)
      }
    }, 5000) // Update every 5 seconds for demo purposes

    return () => clearInterval(interval)
  }, [currentLyricIndex])

  if (!track) return <div className="text-center text-zinc-400">No track selected</div>

  return (
    <div className="text-white">
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-40 h-40 mb-4">
          <Image src={track.image || "/placeholder.svg"} alt={track.title} fill className="object-cover rounded-md" />
        </div>
        <h2 className="text-xl font-bold">{track.title}</h2>
        <p className="text-zinc-400">{track.artist}</p>
      </div>

      <div className="max-h-[300px] overflow-y-auto pr-2">
        <div className="space-y-6 text-center">
          {mockLyrics.map((lyric, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                index === currentLyricIndex
                  ? "text-white text-xl font-bold"
                  : index < currentLyricIndex
                    ? "text-zinc-500 text-base"
                    : "text-zinc-700 text-base"
              }`}
            >
              {lyric.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

