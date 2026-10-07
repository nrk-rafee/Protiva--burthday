"use client"

import { useCallback, useState } from "react"

import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import BalloonGameScreen from "@/components/screens/BalloonGameScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import PuzzleScreen from "@/components/screens/PuzzleScreen"
import MessageScreen from "@/components/screens/MessageScreen"

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0)

  const goToScreen = useCallback((screen) => {
    setCurrentScreen(screen)
  }, [])

  switch (currentScreen) {
    case 0:
      return (
        <main className="relative min-h-screen overflow-hidden">
          <LoaderScreen
            onDone={() => goToScreen(1)}
          />
        </main>
      )

    case 1:
      return (
        <main className="relative min-h-screen overflow-hidden">
          <IntroScreen
            onNext={() => goToScreen(2)}
          />
        </main>
      )

    case 2:
      return (
        <main className="relative min-h-screen overflow-hidden">
          <CakeScreen
            onNext={() => goToScreen(3)}
          />
        </main>
      )

    case 3:
      return (
        <main className="relative min-h-screen overflow-hidden">
          <BalloonGameScreen
            onNext={() => goToScreen(4)}
          />
        </main>
      )

    case 4:
      return (
        <main className="relative min-h-screen overflow-hidden">
          <PhotosScreen
            onNext={() => goToScreen(5)}
          />
        </main>
      )

    case 5:
      return (
        <main className="relative min-h-screen overflow-hidden">
          <PuzzleScreen
            onNext={() => goToScreen(6)}
          />
        </main>
      )

    case 6:
      return (
        <main className="relative min-h-screen overflow-hidden">
          <MessageScreen />
        </main>
      )

    default:
      return (
        <main className="relative min-h-screen overflow-hidden">
          <MessageScreen />
        </main>
      )
  }
}
