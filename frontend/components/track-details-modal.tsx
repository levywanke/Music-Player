"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Share2, MoreHorizontal, Play, Pause } from "lucide-react"
import { useState } from "react"
import { useNowPlaying } from "@/components/now-playing-context"

type Track = {
  id: number
  title: string
  artist: string
  album: string
  duration: number
  image: string
}

export function TrackDetailsModal({ track }: { track: Track }) {
  const [isLiked, setIsLiked] = useState(false)
  const { currentTrack, isPlaying, togglePlayPause, setCurrentTrack } = useNowPlaying()

  const isCurrentTrack = currentTrack?.id === track.id

  const handlePlayPause = () => {
    if (isCurrentTrack) {
      togglePlayPause()
    } else {
      setCurrentTrack(track)
      if (!isPlaying) {
        togglePlayPause()
      }
    }
  }

  // Format seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-40 h-40 md:h-40">
          <Image src={track.image || "/placeholder.svg"} alt={track.title} fill className="object-cover rounded-md" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{track.title}</h2>
          <p className="text-lg text-zinc-400">{track.artist}</p>
          <p className="text-sm text-zinc-500 mt-1">Album: {track.album}</p>
          <p className="text-sm text-zinc-500">Duration: {formatDuration(track.duration)}</p>

          <div className="flex items-center gap-4 mt-6">
            <Button
              className="bg-spotify-green hover:bg-spotify-green-light text-black rounded-full h-12 w-12 flex items-center justify-center"
              onClick={handlePlayPause}
            >
              {isCurrentTrack && isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-white"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-6 w-6 ${isLiked ? "fill-spotify-green text-spotify-green" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              <Share2 className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">About</h3>
        <p className="text-zinc-400">
          This is a sample track description. In a real application, this would contain information about the track, the
          artist, release date, genre, and other relevant details.
        </p>
      </div>
    </div>
  )
}

