
"use client"

import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Gift, Heart, Clock } from "lucide-react"
import Button from "../Button"

/* ======================================================
   TOP DECORATIONS
====================================================== */

const hangingDecorations = [
    { type: "moon", left: "5%", size: 70, length: 100 },
    { type: "star", left: "28%", size: 38, length: 85 },
    { type: "star", left: "52%", size: 34, length: 70 },
    { type: "star", left: "74%", size: 42, length: 95 },
    { type: "moon", left: "91%", size: 55, length: 80 },
]

function TopDecoration() {
    return (
        <div className="pointer-events-none fixed left-0 right-0 top-0 z-20 h-[190px] overflow-hidden">
            {hangingDecorations.map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute top-0 flex flex-col items-center"
                    style={{ left: item.left }}
                    animate={{ rotate: [-3, 3, -3] }}
                    transition={{
                        duration: 4 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <div
                        className="w-[2px] bg-[#d49b42]/40"
                        style={{ height: item.length }}
                    />

                    {item.type === "star" ? (
                        <motion.div
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            style={{
                                fontSize: item.size,
                                lineHeight: 1,
                                color: "#e7ad59",
                                textShadow: "0 0 20px rgba(231,173,89,0.4)",
                            }}
                        >
                            ★
                        </motion.div>
                    ) : (
                        <div
                            className="relative rounded-full"
                            style={{ width: item.size, height: item.size }}
                        >
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: "linear-gradient(135deg,#ffd98a,#d99238)",
                                }}
                            />
                            <div
                                className="absolute rounded-full"
                                style={{
                                    width: item.size * 0.8,
                                    height: item.size * 0.8,
                                    top: -item.size * 0.08,
                                    right: -item.size * 0.1,
                                    background: "#070d2b",
                                }}
                            />
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    )
}

/* ======================================================
   BOTTOM BALLOONS
====================================================== */

const bottomBalloons = [
    "#e9a44f",
    "#27374d",
    "#e9a44f",
    "#27374d",
    "#e9a44f",
    "#27374d",
]

function BottomBalloons() {
    return (
        <div className="pointer-events-none fixed bottom-[-25px] left-0 right-0 z-30 h-[120px] overflow-hidden">
            {bottomBalloons.map((color, index) => (
                <motion.div
                    key={index}
                    className="absolute bottom-0"
                    style={{ left: `${7 + index * 16}%` }}
                    animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
                    transition={{
                        duration: 4 + index * 0.3,
                        delay: index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <div
                        className="relative rounded-[50%]"
                        style={{
                            width: 70,
                            height: 82,
                            background: `linear-gradient(145deg, ${color}, rgba(0,0,0,0.55))`,
                            boxShadow: "inset -10px -12px 20px rgba(0,0,0,0.2)",
                        }}
                    >
                        <div className="absolute left-[16px] top-[12px] h-5 w-3 rotate-[-25deg] rounded-full bg-white/40 blur-[2px]" />
                        <div className="absolute left-1/2 top-full h-24 w-px -translate-x-1/2 bg-white/20" />
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

/* ======================================================
   FIREWORK BACKGROUND
====================================================== */

const backgroundFireworks = [
    { left: "10%", top: "18%", color: "#ff6fae", delay: 0 },
    { left: "32%", top: "24%", color: "#ffd166", delay: 1.3 },
    { left: "78%", top: "18%", color: "#c7a0ff", delay: 2 },
    { left: "20%", top: "58%", color: "#8be9fd", delay: 2.8 },
    { left: "82%", top: "50%", color: "#fff0a6", delay: 3.5 },
]

function BackgroundFireworks() {
    return (
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
            {backgroundFireworks.map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    style={{ left: item.left, top: item.top }}
                >
                    <motion.div
                        className="h-2 w-2 rounded-full"
                        style={{
                            background: item.color,
                            boxShadow: `0 0 25px 8px ${item.color}`,
                        }}
                        animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
                        transition={{
                            duration: 1.5,
                            delay: item.delay,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                    />
                </motion.div>
            ))}
        </div>
    )
}

/* ======================================================
   BIRTHDAY LETTERS
====================================================== */

const words = ["HAPPY", "BIRTHDAY", "CUTIE"]

const letterColors = [
    "#ff4fa3", "#ffd166", "#8be9fd",
    "#c7a0ff", "#ff8fab", "#fff0a6",
    "#ff6fae", "#8be9fd", "#c7a0ff",
    "#ffd166", "#ff8fab", "#ff6fae",
    "#8be9fd", "#ffd166", "#ff9de2",
    "#c7a0ff", "#ff6fae",
]

function createLetters() {
    let counter = 0

    return words.flatMap((word, wordIndex) =>
        [...word].map((letter, letterIndex) => ({
            id: `${wordIndex}-${letterIndex}`,
            letter,
            wordIndex,
            letterIndex,
            index: counter,
            color: letterColors[counter++ % letterColors.length],
        }))
    )
}

function FireworkLetter({ item, visible, balloonPhase }) {
    const positions = [
        { top: "12%", length: 5 },
        { top: "45%", length: 8 },
        { top: "78%", length: 4 },
    ]

    const position = positions[item.wordIndex]
    const offset = (
        item.letterIndex - (position.length - 1) / 2
    ) * 32

    return (
        <div
            className="absolute"
            style={{
                top: position.top,
                left: `calc(50% + ${offset}px)`,
                transform: "translate(-50%, -50%)",
            }}
        >
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={
                            balloonPhase
                                ? { opacity: 0, y: -230, scale: 0.85 }
                                : { opacity: 1, y: 0, scale: [0, 1.2, 1] }
                        }
                        transition={{
                            duration: balloonPhase ? 1.8 : 0.6,
                            delay: balloonPhase ? item.index * 0.12 : 0,
                            ease: "easeOut",
                        }}
                    >
                        {balloonPhase && (
                            <motion.div
                                className="absolute bottom-full left-1/2 -translate-x-1/2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: item.index * 0.12 }}
                            >
                                <div
                                    className="h-11 w-9 rounded-[50%]"
                                    style={{
                                        background: `linear-gradient(145deg, ${item.color}, rgba(90,30,140,0.95))`,
                                        boxShadow: `0 0 18px ${item.color}`,
                                    }}
                                />
                            </motion.div>
                        )}

                        <span
                            className="block text-3xl font-black uppercase md:text-4xl"
                            style={{
                                color: item.color,
                                textShadow: `
                                    0 0 8px ${item.color},
                                    0 0 20px ${item.color},
                                    0 0 35px ${item.color}
                                `,
                            }}
                        >
                            {item.letter}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

/* ======================================================
   BIRTHDAY FIREWORK SHOW
====================================================== */

function BirthdayFireworkShow({ onAllLettersShown, onBalloonPhase }) {
    const [visibleCount, setVisibleCount] = useState(0)
    const [balloonPhase, setBalloonPhase] = useState(false)

    const letters = useMemo(() => createLetters(), [])

    const onAllRef = useRef(onAllLettersShown)
    const onBalloonRef = useRef(onBalloonPhase)

    useEffect(() => {
        onAllRef.current = onAllLettersShown
        onBalloonRef.current = onBalloonPhase
    }, [onAllLettersShown, onBalloonPhase])

    useEffect(() => {
        const timers = []

        letters.forEach((_, index) => {
            timers.push(
                setTimeout(() => {
                    setVisibleCount(index + 1)

                    if (index === letters.length - 1) {
                        onAllRef.current?.()
                    }
                }, 700 + index * 650)
            )
        })

        const balloonTimer = setTimeout(() => {
            setBalloonPhase(true)
            onBalloonRef.current?.()
        }, 700 + letters.length * 650 + 1500)

        return () => {
            timers.forEach(clearTimeout)
            clearTimeout(balloonTimer)
        }
    }, [letters])

    return (
        <div className="absolute inset-x-0 bottom-0 top-[38%] z-10 overflow-hidden">
            {Array.from({ length: 35 }).map((_, index) => (
                <motion.span
                    key={index}
                    className="absolute h-[2px] w-[2px] rounded-full bg-white"
                    style={{
                        left: `${(index * 37) % 100}%`,
                        top: `${(index * 47) % 95}%`,
                    }}
                    animate={{ opacity: [0.15, 0.8, 0.15] }}
                    transition={{
                        duration: 2 + (index % 4) * 0.4,
                        repeat: Infinity,
                    }}
                />
            ))}

            {letters.map((item, index) => (
                <FireworkLetter
                    key={item.id}
                    item={item}
                    visible={index < visibleCount}
                    balloonPhase={balloonPhase}
                />
            ))}
        </div>
    )
}

/* ======================================================
   MAIN INTRO SCREEN
====================================================== */

export default function IntroScreen({ onNext }) {
    const [step, setStep] = useState(0)

    const [showSecondGif, setShowSecondGif] = useState(false)
    const [showCurtainVideo, setShowCurtainVideo] = useState(false)
    const [showFinalVideo, setShowFinalVideo] = useState(false)
    const [showStartButton, setShowStartButton] = useState(false)

    const [remainingSeconds, setRemainingSeconds] = useState(10)
    const [midnightReached, setMidnightReached] = useState(false)

    const audioRef = useRef(null)
    const audioStartedRef = useRef(false)
    const curtainHandledRef = useRef(false)

    const CURTAIN_REVEAL_TIME = 5

    /* Countdown */
    useEffect(() => {
        if (step !== 0 || midnightReached) return

        const startTime = Date.now()
        const duration = 10000

        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime
            const left = Math.max(
                0,
                Math.ceil((duration - elapsed) / 1000)
            )

            setRemainingSeconds(left)

            if (elapsed >= duration) {
                clearInterval(timer)
                setRemainingSeconds(0)
                setMidnightReached(true)
            }
        }, 100)

        return () => clearInterval(timer)
    }, [step, midnightReached])

    /* Birthday song */
    useEffect(() => {
        if (!midnightReached || audioStartedRef.current) return

        const audio = audioRef.current
        if (!audio) return

        audioStartedRef.current = true
        audio.currentTime = 0
        audio.play().catch(() => {})
    }, [midnightReached])

    const startBirthdaySong = () => {
        const audio = audioRef.current
        if (!audio) return

        audio.play().catch(() => {})
    }

    const handleOpenIt = () => {
        startBirthdaySong()
        setStep(1)
    }

    /* Start final video exactly once */
    const startFinalVideo = () => {
        if (curtainHandledRef.current) return

        curtainHandledRef.current = true
        setShowCurtainVideo(false)
        setShowFinalVideo(true)
    }

    const handleCurtainTime = (event) => {
        if (
            event.currentTarget.currentTime >= CURTAIN_REVEAL_TIME
        ) {
            startFinalVideo()
        }
    }

    /* Final video finished or failed */
    const finishFinalVideo = () => {
        setShowStartButton(true)
    }

    const clockSeconds = 50 + (10 - remainingSeconds)

    const clockText =
        remainingSeconds === 0
            ? "12:00:00"
            : `11:59:${String(clockSeconds).padStart(2, "0")}`

    const loadingProgress = midnightReached
        ? 100
        : ((10 - remainingSeconds) / 10) * 100

    return (
        <>
            <audio
                ref={audioRef}
                src="/images/birthdaysong.mp3"
                preload="auto"
                loop
            />

            <AnimatePresence mode="wait">

                {/* STEP 0 — COUNTDOWN */}

                {step === 0 && (
                    <motion.div
                        key="step0"
                        initial={{ opacity: 0, scale: 0.985 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.015 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 overflow-hidden bg-black"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(150,110,35,0.13),transparent_60%)]" />

                        <TopDecoration />

                        <div className="relative z-20 flex min-h-screen w-full items-center justify-center px-4 py-8">
                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45 }}
                                className="
                                    relative mx-auto w-full max-w-[440px]
                                    overflow-hidden rounded-[42px]
                                    border border-[#d6b66f]/30
                                    bg-black/80 p-6
                                    shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_35px_rgba(218,170,95,0.12)]
                                    backdrop-blur-xl md:p-8
                                "
                            >
                                <div className="pointer-events-none absolute inset-0 rounded-[42px] border border-white/5" />

                                <div className="relative z-10 mb-5 flex flex-col items-center">
                                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#d8b66f]">
                                        <Clock size={17} />
                                        Midnight Surprise
                                    </div>

                                    <motion.div
                                        key={clockText}
                                        initial={{ opacity: 0.65, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.15 }}
                                        className="mt-4 rounded-[22px] border border-[#d6b66f]/30 bg-[#100e09] px-8 py-4"
                                    >
                                        <div className="text-center font-mono text-[34px] font-bold tracking-[0.12em] text-[#f5d58b]">
                                            {clockText}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Countdown video */}
                                <div className="relative z-10 flex h-[250px] w-full items-center justify-center overflow-hidden rounded-[32px] bg-black sm:h-[280px]">
                                    <video
                                        src="/1.2.mp4"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="auto"
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                <div className="relative z-10 mt-7 text-center">
                                    <h1 className="text-3xl font-semibold italic leading-tight text-pink-200 md:text-4xl">
                                        Something special
                                        <br />
                                        is waiting...
                                    </h1>

                                    <p className="mt-5 text-base text-white/80 md:text-lg">
                                        {midnightReached
                                            ? "The beautiful moment is here ✨"
                                            : "A beautiful moment is coming ✨"}
                                    </p>
                                </div>

                                <div className="relative z-10 mt-8 min-h-[90px]">
                                    {!midnightReached ? (
                                        <div className="flex flex-col items-center">
                                            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[#d6b66f]/70">
                                                Get ready to celebrate
                                            </p>

                                            <div className="h-[8px] w-full max-w-[320px] overflow-hidden rounded-full bg-white/15">
                                                <motion.div
                                                    className="h-full rounded-full bg-gradient-to-r from-amber-400 via-pink-400 to-fuchsia-500"
                                                    style={{ width: `${loadingProgress}%` }}
                                                />
                                            </div>

                                            <p className="mt-3 text-xs tracking-widest text-white/35">
                                                YOUR SURPRISE IS ALMOST HERE
                                            </p>
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.65, ease: "backOut" }}
                                            className="flex justify-center"
                                        >
                                            <Button
                                                onClick={handleOpenIt}
                                                className="
                                                    w-full max-w-[320px] justify-center
                                                    rounded-full border border-[#f5d58b]/40
                                                    bg-gradient-to-r from-[#b98736] via-[#f0c875] to-[#b98736]
                                                    text-black
                                                "
                                            >
                                                <Gift size={21} />
                                                <span>Open It!</span>
                                            </Button>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        <BottomBalloons />

                        <div className="fixed bottom-5 right-5 z-40 text-sm text-white/35">
                            @Rafee🫶protiva
                        </div>
                    </motion.div>
                )}

                {/* STEP 1 — BIRTHDAY ANIMATION */}

                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 overflow-hidden bg-[#03050f]"
                    >
                        <div className="absolute inset-0 bg-[#03050f]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(80,50,180,0.27),transparent_62%)]" />
                        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(circle_at_50%_100%,rgba(255,70,180,0.15),transparent_65%)]" />

                        <BackgroundFireworks />

                        {/* Curtain video: no upward animation */}
                        {showCurtainVideo && (
                            <video
                                key="curtain-video"
                                src="/curtain.mp4"
                                autoPlay
                                muted
                                playsInline
                                preload="auto"
                                onTimeUpdate={handleCurtainTime}
                                onEnded={startFinalVideo}
                                onError={startFinalVideo}
                                className="
                                    pointer-events-none absolute inset-0
                                    z-20 h-full w-full
                                    object-contain mix-blend-screen
                                "
                            />
                        )}

                        {/* Final video: directly starts, no slide-up effect */}
                        {showFinalVideo && (
                            <video
                                key="final-video"
                                src="/lv_0_20261030214702.mp4"
                                autoPlay
                                muted
                                playsInline
                                preload="auto"
                                onEnded={finishFinalVideo}
                                onError={finishFinalVideo}
                                className="
                                    pointer-events-none absolute inset-0
                                    z-20 h-full w-full
                                    object-contain object-center
                                    mix-blend-screen
                                "
                            />
                        )}

                        {/* Birthday card: transparent background */}
                        <div className="absolute inset-x-0 top-[5%] z-30 flex justify-center px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="
                                    relative w-full max-w-[420px]
                                    rounded-[42px] p-5
                                    bg-transparent
                                "
                            >
                                {/* GIF area: transparent */}
                                <div className="relative z-10 flex h-[105px] w-full items-center justify-center overflow-hidden bg-transparent">
                                    <motion.img
                                        key={showSecondGif ? "gif-5" : "gif-121"}
                                        src={
                                            showSecondGif
                                                ? "/gifs/5.webp"
                                                : "/gifs/121.webp"
                                        }
                                        alt="Birthday animation"
                                        className="h-full w-full object-contain"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.35 }}
                                    />
                                </div>

                                <div className="relative z-10 mt-5 text-center">
                                    <h1 className="text-2xl font-semibold leading-tight text-pink-200 md:text-3xl">
                                        Happy Birthday,
                                        <br />
                                        Cutie ❤️
                                    </h1>

                                    <p className="mt-2 text-sm text-white/75 md:text-base">
                                        Today is all about you ✨
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Fireworks and letters */}
                        <BirthdayFireworkShow
                            onAllLettersShown={() => setShowSecondGif(true)}
                            onBalloonPhase={() => setShowCurtainVideo(true)}
                        />

                        <motion.div
                            className="absolute left-1/2 top-[27%] z-30 -translate-x-1/2 whitespace-nowrap"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">
                                A little surprise
                            </p>
                        </motion.div>

                        {/* Start button */}
                        <AnimatePresence>
                            {showStartButton && (
                                <motion.div
                                    initial={{ opacity: 0, y: 35, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, ease: "backOut" }}
                                    className="fixed bottom-8 left-1/2 z-[200] -translate-x-1/2 px-4"
                                >
                                    <Button
                                        onClick={() => onNext?.()}
                                        className="
                                            min-w-[230px] justify-center
                                            bg-[#f1caeb] text-primary
                                            shadow-[0_10px_40px_rgba(255,120,210,0.35)]
                                        "
                                    >
                                        <Heart size={20} />
                                        <span>Start the surprise</span>
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="fixed bottom-4 right-4 z-[150] text-sm text-white/30">
                            @Rafee🫶protiva
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </>
    )
}
