
"use client"

import { useCallback, useState } from "react"

import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import BalloonGameScreen from "@/components/screens/BalloonGameScreen"
import CrossGameScreen from "@/components/screens/CrossGameScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import PuzzleScreen from "@/components/screens/PuzzleScreen"
import MessageScreen from "@/components/screens/MessageScreen"
import HugScreen from "@/components/screens/HugScreen"

export default function HomePage() {
    const [currentScreen, setCurrentScreen] = useState(0)

    const goToScreen = useCallback((screen) => {
        setCurrentScreen(screen)
    }, [])

    switch (currentScreen) {
        // 0 — LOADER
        case 0:
            return (
                <main className="relative min-h-screen overflow-hidden">
                    <LoaderScreen onDone={() => goToScreen(1)} />
                </main>
            )

        // 1 — INTRO
        case 1:
            return (
                <main className="relative min-h-screen overflow-hidden">
                    <IntroScreen onNext={() => goToScreen(2)} />
                </main>
            )

        // 2 — CAKE
        case 2:
            return (
                <main className="relative min-h-screen overflow-hidden">
                    <CakeScreen onNext={() => goToScreen(3)} />
                </main>
            )

        // 3 — BALLOON GAME
        case 3:
            return (
                <main className="relative min-h-screen overflow-hidden">
                    <BalloonGameScreen onNext={() => goToScreen(4)} />
                </main>
            )

        // 4 — X / O GAME
        case 4:
            return (
                <main className="relative min-h-screen overflow-hidden">
                    <CrossGameScreen onNext={() => goToScreen(5)} />
                </main>
            )

        // 5 — PHOTO GALLERY
        case 5:
            return (
                <main className="relative min-h-screen overflow-hidden">
                    <PhotosScreen onNext={() => goToScreen(6)} />
                </main>
            )

        // 6 — PUZZLE
        case 6:
            return (
                <main className="relative min-h-screen overflow-hidden">
                    <PuzzleScreen onNext={() => goToScreen(7)} />
                </main>
            )

        // 7 — BIRTHDAY MESSAGE
        case 7:
            return (
                <main className="relative min-h-screen overflow-hidden">
                    <MessageScreen onNext={() => goToScreen(8)} />
                </main>
            )

        // 8 — VIRTUAL HUG
        case 8:
            return (
                <main className="relative min-h-screen overflow-hidden">
                    <HugScreen />
                </main>
            )

        default:
            return (
                <main className="relative min-h-screen overflow-hidden">
                    <MessageScreen onNext={() => goToScreen(8)} />
                </main>
            )
    }
}
