"use client"

import { useCallback, useEffect, useRef, useState } from "react"

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
    const [musicStarted, setMusicStarted] = useState(false)

    const audioRef = useRef(null)

    const goToScreen = useCallback((screen) => {
        setCurrentScreen(screen)
    }, [])

    // Start music after the password screen is unlocked
    useEffect(() => {
        const audio = audioRef.current

        if (!audio || !musicStarted) return

        audio.play().catch((error) => {
            console.log("Music playback could not start:", error)
        })
    }, [musicStarted])

    // Called when LoaderScreen unlocks successfully
    const handleUnlock = useCallback(() => {
        setMusicStarted(true)
        setCurrentScreen(1)
    }, [])

    return (
        <>
            {/* Background music stays mounted across all screens */}
            <audio
                ref={audioRef}
                src="/images/birthdaysong.mp3"
                preload="auto"
                loop
            />

            {currentScreen === 0 && (
                <main className="relative min-h-screen overflow-hidden">
                    <LoaderScreen onDone={handleUnlock} />
                </main>
            )}

            {currentScreen === 1 && (
                <main className="relative min-h-screen overflow-hidden">
                    <IntroScreen onNext={() => goToScreen(2)} />
                </main>
            )}

            {currentScreen === 2 && (
                <main className="relative min-h-screen overflow-hidden">
                    <CakeScreen onNext={() => goToScreen(3)} />
                </main>
            )}

            {currentScreen === 3 && (
                <main className="relative min-h-screen overflow-hidden">
                    <BalloonGameScreen onNext={() => goToScreen(4)} />
                </main>
            )}

            {currentScreen === 4 && (
                <main className="relative min-h-screen overflow-hidden">
                    <CrossGameScreen onNext={() => goToScreen(5)} />
                </main>
            )}

            {currentScreen === 5 && (
                <main className="relative min-h-screen overflow-hidden">
                    <PhotosScreen onNext={() => goToScreen(6)} />
                </main>
            )}

            {currentScreen === 6 && (
                <main className="relative min-h-screen overflow-hidden">
                    <PuzzleScreen onNext={() => goToScreen(7)} />
                </main>
            )}

            {currentScreen === 7 && (
                <main className="relative min-h-screen overflow-hidden">
                    <MessageScreen onNext={() => goToScreen(8)} />
                </main>
            )}

            {currentScreen === 8 && (
                <main className="relative min-h-screen overflow-hidden">
                    <HugScreen />
                </main>
            )}
        </>
    )
}
