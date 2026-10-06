"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import MessageScreen from "@/components/screens/MessageScreen"

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0)

  const screens = [
    <LoaderScreen
      key="loader"
      onDone={() => setCurrentScreen(1)}
    />,

    <IntroScreen
      key="intro"
      onNext={() => setCurrentScreen(2)}
    />,

    <CakeScreen
      key="cake"
      onNext={() => setCurrentScreen(3)}
    />,

    <PhotosScreen
      key="photos"
      onNext={() => setCurrentScreen(4)}
    />,

    <MessageScreen key="message" />,
  ]

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
            {screens[currentScreen]}
          </motion.div>

        </AnimatePresence>

      </div>

    </main>
  )
}
