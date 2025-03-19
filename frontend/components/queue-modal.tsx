"use client"

import { useNowPlaying } from "@/components/now-playing-context"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Play, MoreHorizontal, X } from "lucide-react"

export function QueueModal() {
  const { currentTrack, queue, setCurrentTrack, removeFromQueue } = useNowPlaying()

  const handlePlayTrack = (track: any) => {
    setCurrentTrack(track)
  }

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">Queue</h2>

      {currentTrack && (
        <div className="mb-6">
          <h3 className="text-sm text-zinc-400 mb-2">Now playing</h3>
          <div className="flex items-center bg-[#282828]/50 p-2 rounded-md">
            <div className="h-10 w-10 relative mr-3">
              <Image
                src={currentTrack.image || "/placeholder.svg"}
                alt={currentTrack.title}
                fill
                className="object-cover rounded-sm"
              />
            </div>
            <div>
              <div className="text-white font-medium">{currentTrack.title}</div>
              <div className="text-sm text-zinc-400">{currentTrack.artist}</div>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-sm text-zinc-400 mb-2">Next in queue</h3>
      {queue.length > 0 ? (
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
          {queue.map((track) => (
            <div
              key={track.id}
              className="flex items-center justify-between bg-[#282828]/30 p-2 rounded-md group hover:bg-[#282828]"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 relative mr-3">
                  <Image
                    src={track.image || "/placeholder.svg"}
                    alt={track.title}
                    fill
                    className="object-cover rounded-sm"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white h-8 w-8"
                      onClick={() => handlePlayTrack(track)}
                    >
                      <Play className="h-4 w-4 ml-0.5" />
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="text-white font-medium">{track.title}</div>
                  <div className="text-sm text-zinc-400">{track.artist}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFromQueue(track.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-zinc-400 text-center py-8">Your queue is empty</div>
      )}
    </div>
  )
}

