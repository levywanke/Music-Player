"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

// Mock data for tracks
const mockTracks = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    duration: 233,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    title: "Dance Monkey",
    artist: "Tones and I",
    album: "The Kids Are Coming",
    duration: 209,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    album: "Divinely Uninspired...",
    duration: 182,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "WHEN WE ALL FALL ASLEEP...",
    duration: 194,
    image: "/placeholder.svg?height=300&width=300",
  },
]

type Track = {
  id: number
  title: string
  artist: string
  album: string
  duration: number
  image: string
}

type NowPlayingContextType = {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  volume: number
  queue: Track[]
  setCurrentTrack: (track: Track) => void
  togglePlayPause: () => void
  setProgress: (progress: number) => void
  setVolume: (volume: number) => void
  nextTrack: () => void
  prevTrack: () => void
  addToQueue: (track: Track) => void
  removeFromQueue: (trackId: number) => void
}

const NowPlayingContext = createContext<NowPlayingContextType | undefined>(undefined)

export function NowPlayingProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(mockTracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(70)
  const [queue, setQueue] = useState<Track[]>(mockTracks.slice(1))

  // Auto-increment progress when playing
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextTrack()
            return 0
          }
          return prev + 0.1
        })
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentTrack])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    if (queue.length > 0) {
      setCurrentTrack(queue[0])
      setQueue(queue.slice(1))
      setProgress(0)
    }
  }

  const prevTrack = () => {
    // In a real app, you'd have a history of played tracks
    setProgress(0)
  }

  const addToQueue = (track: Track) => {
    setQueue([...queue, track])
  }

  const removeFromQueue = (trackId: number) => {
    setQueue(queue.filter((track) => track.id !== trackId))
  }

  return (
    <NowPlayingContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        volume,
        queue,
        setCurrentTrack,
        togglePlayPause,
        setProgress,
        setVolume,
        nextTrack,
        prevTrack,
        addToQueue,
        removeFromQueue,
      }}
    >
      {children}
    </NowPlayingContext.Provider>
  )
}

export function useNowPlaying() {
  const context = useContext(NowPlayingContext)
  if (context === undefined) {
    throw new Error("useNowPlaying must be used within a NowPlayingProvider")
  }
  return context
}

