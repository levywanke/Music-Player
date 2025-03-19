"use client"

import { useState } from "react"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  Maximize2,
  ListMusic,
  Heart,
  Mic2,
  Laptop2,
  VolumeX,
  Volume1,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"
import { useNowPlaying } from "@/components/now-playing-context"
import { useModal } from "@/components/modal-context"
import { QueueModal } from "@/components/queue-modal"
import { LyricsModal } from "@/components/lyrics-modal"

export default function Player() {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    progress,
    setProgress,
    volume,
    setVolume,
    nextTrack,
    prevTrack,
    queue,
  } = useNowPlaying()

  const [isMuted, setIsMuted] = useState(false)
  const [prevVolume, setPrevVolume] = useState(volume)
  const [isLiked, setIsLiked] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [showLyrics, setShowLyrics] = useState(false)
  const { openModal } = useModal()

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    if (value[0] === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false)
      setVolume(prevVolume)
    } else {
      setPrevVolume(volume)
      setIsMuted(true)
      setVolume(0)
    }
  }

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0])
  }

  const showQueue = () => {
    openModal(<QueueModal />)
  }

  const showLyricsModal = () => {
    openModal(<LyricsModal track={currentTrack} />)
  }

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    if (!currentTrack) return "0:00"
    const duration = currentTrack.duration
    const currentSeconds = Math.floor((duration * progress) / 100)
    const mins = Math.floor(currentSeconds / 60)
    const secs = Math.floor(currentSeconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatDuration = (seconds: number) => {
    if (!seconds) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Volume icon based on volume level
  const VolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX className="h-4 w-4" />
    } else if (volume < 50) {
      return <Volume1 className="h-4 w-4" />
    } else {
      return <Volume2 className="h-4 w-4" />
    }
  }

  return (
    <div className="h-[90px] bg-[#181818] border-t border-[#282828] flex items-center px-4">
      {/* Now playing */}
      <div className="flex items-center w-[30%]">
        {currentTrack ? (
          <>
            <div className="relative h-14 w-14 mr-3 group">
              <Image
                src={currentTrack.image || "/placeholder.svg"}
                alt={currentTrack.title}
                fill
                className={`object-cover ${isPlaying ? "album-rotate" : ""}`}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white h-8 w-8"
                  onClick={() =>
                    openModal(
                      <div className="p-4">
                        <Image
                          src={currentTrack.image || "/placeholder.svg"}
                          alt={currentTrack.title}
                          width={300}
                          height={300}
                          className="mx-auto rounded-md"
                        />
                        <h2 className="text-xl font-bold text-white mt-4">{currentTrack.title}</h2>
                        <p className="text-zinc-400">{currentTrack.artist}</p>
                      </div>,
                    )
                  }
                >
                  <Maximize2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div>
              <div className="text-white text-sm font-medium hover:underline cursor-pointer">{currentTrack.title}</div>
              <div className="text-xs text-zinc-400 hover:underline hover:text-white cursor-pointer">
                {currentTrack.artist}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-4 text-zinc-400 hover:text-white"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-spotify-green text-spotify-green" : ""}`} />
            </Button>
          </>
        ) : (
          <div className="text-zinc-400 text-sm">No track selected</div>
        )}
      </div>

      {/* Player controls */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="flex items-center gap-4 mb-1">
          <Button
            variant="ghost"
            size="icon"
            className={`text-zinc-400 hover:text-white ${isShuffle ? "text-spotify-green" : ""}`}
            onClick={() => setIsShuffle(!isShuffle)}
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white" onClick={prevTrack}>
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            className="bg-white text-black hover:bg-zinc-200 rounded-full h-8 w-8 flex items-center justify-center"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white" onClick={nextTrack}>
            <SkipForward className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`text-zinc-400 hover:text-white ${isRepeat ? "text-spotify-green" : ""}`}
            onClick={() => setIsRepeat(!isRepeat)}
          >
            <Repeat className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center w-full max-w-md gap-2">
          <span className="text-xs text-zinc-400 w-10 text-right">{formatTime(progress)}</span>
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            className="cursor-pointer"
            onValueChange={handleProgressChange}
          />
          <span className="text-xs text-zinc-400 w-10">
            {currentTrack ? formatDuration(currentTrack.duration) : "0:00"}
          </span>
        </div>
      </div>

      {/* Volume controls */}
      <div className="flex items-center justify-end gap-3 w-[30%]">
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white" onClick={showLyricsModal}>
          <Mic2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white" onClick={showQueue}>
          <ListMusic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
          <Laptop2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white" onClick={toggleMute}>
          <VolumeIcon />
        </Button>
        <Slider
          value={[volume]}
          max={100}
          step={1}
          className="w-24 cursor-pointer"
          onValueChange={handleVolumeChange}
        />
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

