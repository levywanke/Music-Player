import Player from "@/components/player"
import Sidebar from "@/components/sidebar"
import MainContent from "@/components/main-content"
import { NowPlayingProvider } from "@/components/now-playing-context"
import { ModalProvider } from "@/components/modal-context"

export default function Home() {
  return (
    <NowPlayingProvider>
      <ModalProvider>
        <div className="h-screen overflow-hidden bg-gradient-to-b from-spotify-black to-spotify-darkgray">
          <div className="flex h-[calc(100%-90px)]">
            <Sidebar />
            <MainContent />
          </div>
          <Player />
        </div>
      </ModalProvider>
    </NowPlayingProvider>
  )
}

