"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useModal } from "@/components/modal-context"

export function CreatePlaylistModal() {
  const [playlistName, setPlaylistName] = useState("My Playlist #1")
  const [description, setDescription] = useState("")
  const { closeModal } = useModal()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the playlist to your backend
    console.log("Creating playlist:", { playlistName, description })
    closeModal()
  }

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">Create playlist</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-full bg-[#2A2A2A] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-spotify-green"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Description <span className="text-zinc-400">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#2A2A2A] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-spotify-green h-24 resize-none"
            placeholder="Add an optional description"
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost" className="text-white hover:bg-[#2A2A2A]" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" className="bg-spotify-green hover:bg-spotify-green-light text-black font-bold">
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}

