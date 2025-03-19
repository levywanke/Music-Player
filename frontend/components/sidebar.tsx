"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Search, Library, ChevronRight, Plus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useModal } from "@/components/modal-context"
import { CreatePlaylistModal } from "@/components/create-playlist-modal"

const playlists = [
  "Discover Weekly",
  "Release Radar",
  "Liked Songs",
  "Today's Top Hits",
  "Chill Vibes",
  "Workout Mix",
  "Throwback Hits",
  "Road Trip Playlist",
  "Study Focus",
  "Morning Coffee",
  "Evening Jazz",
  "Party Anthems",
  "Acoustic Covers",
  "Hip Hop Essentials",
  "Rock Classics",
  "Indie Discoveries",
  "Electronic Dance",
  "Relaxing Ambient",
  "Mood Booster",
  "Sleep Sounds",
]

export default function Sidebar() {
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(true)
  const [activeNav, setActiveNav] = useState("home")
  const { openModal } = useModal()

  const handleCreatePlaylist = () => {
    openModal(<CreatePlaylistModal />)
  }

  return (
    <div className="w-64 flex-shrink-0 flex flex-col h-full bg-black">
      {/* Main navigation */}
      <div className="p-2 space-y-1 bg-[#121212] rounded-lg m-2">
        <Link href="/" onClick={() => setActiveNav("home")}>
          <Button
            variant="ghost"
            className={`w-full justify-start text-white hover:bg-[#282828] font-bold py-3 ${activeNav === "home" ? "text-white" : "text-zinc-400"}`}
          >
            <Home className="mr-4 h-6 w-6" />
            Home
          </Button>
        </Link>
        <Link href="/search" onClick={() => setActiveNav("search")}>
          <Button
            variant="ghost"
            className={`w-full justify-start hover:bg-[#282828] font-bold py-3 ${activeNav === "search" ? "text-white" : "text-zinc-400"}`}
          >
            <Search className="mr-4 h-6 w-6" />
            Search
          </Button>
        </Link>
      </div>

      {/* Library section */}
      <div className="flex-1 bg-[#121212] rounded-lg m-2 flex flex-col overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            className="text-zinc-400 hover:text-white hover:bg-transparent flex items-center gap-2"
            onClick={() => setIsLibraryExpanded(!isLibraryExpanded)}
          >
            <Library className="h-6 w-6" />
            <span className="font-bold">Your Library</span>
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-white hover:bg-[#282828] rounded-full h-8 w-8"
              onClick={handleCreatePlaylist}
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-white hover:bg-[#282828] rounded-full h-8 w-8"
            >
              <ChevronRight className={`h-5 w-5 transition-transform ${isLibraryExpanded ? "rotate-90" : ""}`} />
            </Button>
          </div>
        </div>

        {isLibraryExpanded && (
          <>
            <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hidden">
              <Button
                variant="secondary"
                className="rounded-full text-xs px-3 py-1 h-auto bg-[#232323] hover:bg-[#2A2A2A] text-white whitespace-nowrap"
              >
                Playlists
              </Button>
              <Button
                variant="secondary"
                className="rounded-full text-xs px-3 py-1 h-auto bg-[#232323] hover:bg-[#2A2A2A] text-white whitespace-nowrap"
              >
                Artists
              </Button>
              <Button
                variant="secondary"
                className="rounded-full text-xs px-3 py-1 h-auto bg-[#232323] hover:bg-[#2A2A2A] text-white whitespace-nowrap"
              >
                Albums
              </Button>
              <Button
                variant="secondary"
                className="rounded-full text-xs px-3 py-1 h-auto bg-[#232323] hover:bg-[#2A2A2A] text-white whitespace-nowrap"
              >
                Podcasts
              </Button>
            </div>

            <div className="px-2 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search in Your Library"
                  className="w-full bg-[#242424] text-sm text-zinc-400 py-2 pl-9 pr-3 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>
            </div>

            <div className="px-4 py-2 flex justify-between items-center">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-transparent p-0">
                <Clock className="h-4 w-4 mr-2" />
                Recents
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-white hover:bg-transparent h-8 w-8 p-0"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 9.5H9.5V13H6.5V9.5H3V6.5H6.5V3H9.5V6.5H13V9.5Z" fill="currentColor" />
                </svg>
              </Button>
            </div>

            <ScrollArea className="flex-1 px-2">
              <div className="space-y-1 p-2">
                {playlists.map((playlist, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="w-full justify-start text-sm font-normal text-zinc-400 hover:text-white hover:bg-[#232323]"
                  >
                    {playlist}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  )
}

