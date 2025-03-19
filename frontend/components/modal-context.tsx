"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

type ModalContextType = {
  isOpen: boolean
  content: React.ReactNode
  openModal: (content: React.ReactNode) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<React.ReactNode>(null)

  const openModal = (content: React.ReactNode) => {
    setContent(content)
    setIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
          <div className="spotify-glassmorphism relative z-10 w-full max-w-lg rounded-lg p-6 shadow-xl animate-in fade-in zoom-in-95 duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-zinc-400 hover:text-white"
              onClick={closeModal}
            >
              <X className="h-5 w-5" />
            </Button>
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

