"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Clock, Play, ChevronLeft, ChevronRight, Bell, User, MoreHorizontal, Heart } from "lucide-react"
import Image from "next/image"
import { useNowPlaying } from "@/components/now-playing-context"
import { useModal } from "@/components/modal-context"
import { TrackDetailsModal } from "@/components/track-details-modal"

// Mock data for the UI
const featuredPlaylists = [
  {
    id: 1,
    title: "Today's Top Hits",
    description: "Jung Kook is on top of the Hottest 50!",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 2,
    title: "RapCaviar",
    description: "New music from Drake, Kendrick Lamar and more",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 3,
    title: "All Out 2010s",
    description: "The biggest songs of the 2010s.",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 4,
    title: "Rock Classics",
    description: "Rock legends & epic songs that continue to inspire generations.",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 5,
    title: "Chill Hits",
    description: "Kick back to the best new and recent chill hits.",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 6,
    title: "Viva Latino",
    description: "Today's top Latin hits, elevating the genre worldwide!",
    image: "/placeholder.svg?height=150&width=150",
  },
]

const recentlyPlayed = [
  { id: 1, title: "Liked Songs", type: "Playlist", image: "/placeholder.svg?height=80&width=80" },
  { id: 2, title: "Discover Weekly", type: "Playlist", image: "/placeholder.svg?height=80&width=80" },
  { id: 3, title: "Taylor Swift", type: "Artist", image: "/placeholder.svg?height=80&width=80" },
  { id: 4, title: "Chill Mix", type: "Playlist", image: "/placeholder.svg?height=80&width=80" },
  { id: 5, title: "Hip Hop Mix", type: "Playlist", image: "/placeholder.svg?height=80&width=80" },
  { id: 6, title: "The Weeknd", type: "Artist", image: "/placeholder.svg?height=80&width=80" },
]

const newReleases = [
  { id: 1, title: "New Album", artist: "Popular Artist", image: "/placeholder.svg?height=150&width=150" },
  { id: 2, title: "Single Release", artist: "Trending Artist", image: "/placeholder.svg?height=150&width=150" },
  { id: 3, title: "EP Collection", artist: "Indie Band", image: "/placeholder.svg?height=150&width=150" },
  { id: 4, title: "Debut Album", artist: "New Artist", image: "/placeholder.svg?height=150&width=150" },
]

export default function MainContent() {
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null)
  const { currentTrack, setCurrentTrack, togglePlayPause, isPlaying, queue } = useNowPlaying()
  const { openModal } = useModal()

  const handleTrackClick = (track: any) => {
    setCurrentTrack(track)
    if (!isPlaying) {
      togglePlayPause()
    }
  }

  const handleTrackDetails = (track: any) => {
    openModal(<TrackDetailsModal track={track} />)
  }

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-[#1e1e1e] to-[#121212] overflow-hidden">
      {/* Top navigation */}
      <div className="flex justify-between items-center p-4 sticky top-0 z-10 bg-transparent spotify-gradient">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="bg-black/40 text-white rounded-full h-8 w-8">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="bg-black/40 text-white rounded-full h-8 w-8">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white bg-black/40 hover:bg-[#333333] rounded-full px-4 font-bold"
          >
            Upgrade
          </Button>
          <Button variant="ghost" size="icon" className="bg-black/40 text-white rounded-full h-8 w-8">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="bg-black/40 text-white rounded-full h-8 w-8">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-full">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-6">Good afternoon</h1>

          {/* Recently played section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {recentlyPlayed.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="flex items-center bg-[#181818]/80 hover:bg-[#282828]/80 h-[4.5rem] p-0 overflow-hidden rounded-md group"
              >
                <div className="h-[4.5rem] w-[4.5rem] relative flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <span className="ml-4 font-bold text-white">{item.title}</span>
                <div className="ml-auto mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    className="bg-spotify-green hover:bg-spotify-green-light text-black rounded-full h-10 w-10 shadow-lg"
                  >
                    <Play className="h-5 w-5 ml-0.5" />
                  </Button>
                </div>
              </Button>
            ))}
          </div>

          {/* Made for you section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Made for you</h2>
              <Button variant="link" className="text-zinc-400 hover:text-white font-bold">
                Show all
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {featuredPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-[#181818] hover:bg-[#282828] transition-all duration-300 rounded-md p-4 group spotify-hover-trigger"
                >
                  <div className="relative aspect-square mb-4 shadow-lg">
                    <Image
                      src={playlist.image || "/placeholder.svg"}
                      alt={playlist.title}
                      fill
                      className="object-cover rounded-md"
                    />
                    <Button
                      size="icon"
                      className="absolute bottom-2 right-2 bg-spotify-green hover:bg-spotify-green-light text-black rounded-full spotify-hover-target shadow-lg"
                    >
                      <Play className="h-5 w-5 ml-0.5" />
                    </Button>
                  </div>
                  <h3 className="font-bold text-white truncate">{playlist.title}</h3>
                  <p className="text-sm text-zinc-400 line-clamp-2 h-10 mt-1">{playlist.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* New Releases section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">New Releases</h2>
              <Button variant="link" className="text-zinc-400 hover:text-white font-bold">
                Show all
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {newReleases.map((release) => (
                <div
                  key={release.id}
                  className="bg-[#181818] hover:bg-[#282828] transition-all duration-300 rounded-md p-4 group spotify-hover-trigger"
                >
                  <div className="relative aspect-square mb-4 shadow-lg">
                    <Image
                      src={release.image || "/placeholder.svg"}
                      alt={release.title}
                      fill
                      className="object-cover rounded-md"
                    />
                    <Button
                      size="icon"
                      className="absolute bottom-2 right-2 bg-spotify-green hover:bg-spotify-green-light text-black rounded-full spotify-hover-target shadow-lg"
                    >
                      <Play className="h-5 w-5 ml-0.5" />
                    </Button>
                  </div>
                  <h3 className="font-bold text-white truncate">{release.title}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{release.artist}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top tracks section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Your top tracks</h2>
            <div className="bg-[#181818]/60 rounded-md overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#282828] text-xs">
                    <th className="px-4 py-2 text-zinc-400 font-normal w-8">#</th>
                    <th className="px-4 py-2 text-zinc-400 font-normal">Title</th>
                    <th className="px-4 py-2 text-zinc-400 font-normal hidden md:table-cell">Album</th>
                    <th className="px-4 py-2 text-zinc-400 font-normal text-right">
                      <Clock className="h-4 w-4 inline" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((track, index) => (
                    <tr
                      key={track.id}
                      className="hover:bg-[#282828]/40 group"
                      onMouseEnter={() => setHoveredTrack(track.id)}
                      onMouseLeave={() => setHoveredTrack(null)}
                    >
                      <td className="px-4 py-3 text-zinc-400">
                        {hoveredTrack === track.id ? (
                          <Play className="h-4 w-4 text-white cursor-pointer" onClick={() => handleTrackClick(track)} />
                        ) : (
                          index + 1
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="h-10 w-10 relative mr-3">
                            <Image
                              src={track.image || "/placeholder.svg"}
                              alt={track.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div
                              className="text-white font-medium hover:underline cursor-pointer"
                              onClick={() => handleTrackDetails(track)}
                            >
                              {track.title}
                            </div>
                            <div className="text-sm text-zinc-400 hover:text-white hover:underline cursor-pointer">
                              {track.artist}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-zinc-400 hidden md:table-cell">{track.album}</td>
                      <td className="px-4 py-3 text-zinc-400 text-right">
                        <div className="flex items-center justify-end gap-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-zinc-400 hover:text-white"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          {formatTime(track.duration)}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-zinc-400 hover:text-white"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

