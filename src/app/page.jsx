"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

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

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return (
          <LoaderScreen
            onDone={() => goToScreen(1)}
          />
        )

      case 1:
        return (
          <IntroScreen
            onNext={() => goToScreen(2)}
          />
        )

      case 2:
        return (
          <CakeScreen
            onNext={() => goToScreen(3)}
          />
        )

      case 3:
        return (
          <BalloonGameScreen
            onNext={() => goToScreen(4)}
          />
        )

      case 4:
        return (
          <PhotosScreen
            onNext={() => goToScreen(5)}
          />
        )

      case 5:
        return (
          <PuzzleScreen
            onNext={() => goToScreen(6)}
          />
        )

      case 6:
        return <MessageScreen />

      default:
        return <MessageScreen />
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{
              opacity: 0,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.01,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="flex w-full items-center justify-center"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
