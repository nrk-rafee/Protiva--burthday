
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

/* =========================================
   TOP DECORATIONS
========================================= */

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
                        className="w-[2px] bg-[#d49b42]/50"
                        style={{ height: item.length }}
                    />

                    {item.type === "star" ? (
                        <motion.div
                            animate={{ scale: [1, 1.12, 1] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            style={{
                                fontSize: item.size,
                                lineHeight: 1,
                                color: "#e7ad59",
                                textShadow: "0 0 20px rgba(231,173,89,0.6)",
                            }}
                        >
                            ★
                        </motion.div>
                    ) : (
                        <div
                            className="relative rounded-full"
                            style={{
                                width: item.size,
                                height: item.size,
                                background: "linear-gradient(135deg,#ffe19b,#d99238)",
                            }}
                        >
                            <div
                                className="absolute rounded-full"
                                style={{
                                    width: item.size * 0.8,
                                    height: item.size * 0.8,
                                    top: -item.size * 0.08,
                                    right: -item.size * 0.1,
                                    background: "#000000",
                                }}
                            />
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    )
}

/* =========================================
   BOTTOM BALLOONS
========================================= */

const balloonColors = [
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
            {balloonColors.map((color, index) => (
                <motion.div
                    key={index}
                    className="absolute bottom-0"
                    style={{ left: `${7 + index * 16}%` }}
                    animate={{
                        y: [0, -8, 0],
                        rotate: [-3, 3, -3],
                    }}
                    transition={{
                        duration: 4 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <div
                        className="relative rounded-[50%]"
                        style={{
                            width: 70,
                            height: 82,
                            background: `linear-gradient(145deg, ${color}, rgba(0,0,0,0.65))`,
                            boxShadow: "inset -10px -12px 20px rgba(0,0,0,0.3)",
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

/* =========================================
   CONTINUOUS FIREWORKS
========================================= */

function CelebrationFireworks() {
    const colors = [
        "#ff6fae",
        "#ffd166",
        "#c7a0ff",
        "#8be9fd",
        "#fff0a6",
    ]

    return (
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
            {Array.from({ length: 9 }).map((_, index) => {
                const left = `${(index * 37 + 8) % 95}%`
                const top = `${(index * 23 + 12) % 75}%`
                const color = colors[index % colors.length]

                return (
                    <motion.div
                        key={index}
                        className="absolute"
                        style={{ left, top }}
                        animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 1.3,
                            delay: index * 0.7,
                            repeat: Infinity,
                            repeatDelay: 1.5,
                        }}
                    >
                        {Array.from({ length: 12 }).map((_, ray) => {
                            const angle = ray * 30

                            return (
                                <motion.span
                                    key={ray}
                                    className="absolute left-1/2 top-1/2 h-8 w-[2px] origin-bottom rounded-full"
                                    style={{
                                        background: color,
                                        boxShadow: `0 0 8px ${color}`,
                                        transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                                    }}
                                    animate={{
                                        scaleY: [0, 1, 0],
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        delay: index * 0.7,
                                        repeat: Infinity,
                                        repeatDelay: 1.5,
                                    }}
                                />
                            )
                        })}
                    </motion.div>
                )
            })}
        </div>
    )
}

/* =========================================
   FALLING GLITTER / CONFETTI
========================================= */

function FallingGlitter() {
    const colors = [
        "#ffd166",
        "#ff6fae",
        "#ffffff",
        "#c7a0ff",
        "#8be9fd",
    ]

    return (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            {Array.from({ length: 65 }).map((_, index) => (
                <motion.span
                    key={index}
                    className="absolute top-[-20px] rounded-full"
                    style={{
                        left: `${(index * 37) % 100}%`,
                        width: index % 3 === 0 ? 5 : 3,
                        height: index % 3 === 0 ? 8 : 4,
                        background: colors[index % colors.length],
                        boxShadow: `0 0 8px ${colors[index % colors.length]}`,
                    }}
                    animate={{
                        y: ["0vh", "110vh"],
                        x: [0, index % 2 === 0 ? 35 : -35, 0],
                        rotate: [0, 180, 360],
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: 4 + (index % 5),
                        delay: (index % 13) * 0.35,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    )
}

/* =========================================
   BIRTHDAY LETTERS
========================================= */

const birthdayWords = ["HAPPY", "BIRTHDAY", "CUTIE"]

const letterColors = [
    "#ff4fa3",
    "#ffd166",
    "#8be9fd",
    "#c7a0ff",
    "#ff8fab",
    "#fff0a6",
    "#ff6fae",
    "#8be9fd",
    "#c7a0ff",
    "#ffd166",
]

function BirthdayLetters() {
    const letters = useMemo(
        () =>
            birthdayWords.flatMap((word, wordIndex) =>
                [...word].map((letter, letterIndex) => ({
                    id: `${wordIndex}-${letterIndex}`,
                    letter,
                    wordIndex,
                    letterIndex,
                }))
            ),
        []
    )

    const [visibleCount, setVisibleCount] = useState(0)

    useEffect(() => {
        const timers = []

        letters.forEach((_, index) => {
            const timer = setTimeout(() => {
                setVisibleCount(index + 1)
            }, 400 + index * 180)

            timers.push(timer)
        })

        return () => timers.forEach(clearTimeout)
    }, [letters])

    return (
        <div className="relative z-30 flex w-full flex-col items-center justify-center gap-3 px-2 text-center">
            {birthdayWords.map((word, wordIndex) => {
                const wordLetters = letters.filter(
                    item => item.wordIndex === wordIndex
                )

                return (
                    <div
                        key={word}
                        className="flex items-center justify-center gap-[2px] sm:gap-2"
                    >
                        {wordLetters.map(item => {
                            const index = letters.findIndex(
                                letter => letter.id === item.id
                            )

                            const visible = index < visibleCount

                            return (
                                <motion.span
                                    key={item.id}
                                    initial={{
                                        opacity: 0,
                                        y: 80,
                                        scale: 0,
                                        rotate: -90,
                                    }}
                                    animate={
                                        visible
                                            ? {
                                                opacity: 1,
                                                y: [80, -12, 0],
                                                scale: [0, 1.4, 1],
                                                rotate: 0,
                                            }
                                            : {}
                                    }
                                    transition={{
                                        duration: 0.65,
                                        ease: "backOut",
                                    }}
                                    className="text-2xl font-black uppercase sm:text-4xl md:text-5xl"
                                    style={{
                                        color: letterColors[index % letterColors.length],
                                        textShadow: `
                                            0 0 8px currentColor,
                                            0 0 20px currentColor,
                                            0 0 35px currentColor
                                        `,
                                    }}
                                >
                                    {item.letter}
                                </motion.span>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

/* =========================================
   MAIN INTRO SCREEN
========================================= */

export default function IntroScreen({ onNext }) {
    const [step, setStep] = useState(0)

    // Countdown: 11:59:00 → 12:00:00
    const [seconds, setSeconds] = useState(0)
    const [midnightReached, setMidnightReached] = useState(false)

    const [musicBlocked, setMusicBlocked] = useState(false)
    const [showCurtainVideo, setShowCurtainVideo] = useState(false)
    const [showStartButton, setShowStartButton] = useState(false)

    const audioRef = useRef(null)

    /* =====================================
       COUNTDOWN
       100ms = 1 displayed second
       Total countdown = about 6 seconds
    ===================================== */

    useEffect(() => {
        if (midnightReached) return

        const timer = setInterval(() => {
            setSeconds(previous => {
                if (previous >= 59) {
                    clearInterval(timer)
                    setMidnightReached(true)
                    return 60
                }

                return previous + 1
            })
        }, 100)

        return () => clearInterval(timer)
    }, [midnightReached])

    /* =====================================
       MIDNIGHT: START MUSIC
       Stay on the countdown page.
    ===================================== */

    useEffect(() => {
        if (!midnightReached) return

        const audio = audioRef.current

        if (audio) {
            audio.currentTime = 0

            audio.play()
                .then(() => setMusicBlocked(false))
                .catch(() => setMusicBlocked(true))
        }
    }, [midnightReached])

    /* =====================================
       OPEN IT BUTTON
       Go to the original birthday screen.
    ===================================== */

    const handleOpenIt = () => {
        // Try playing music again after the user's tap.
        const audio = audioRef.current

        if (audio && midnightReached) {
            audio.play()
                .then(() => setMusicBlocked(false))
                .catch(() => setMusicBlocked(true))
        }

        setStep(1)
    }

    /* =====================================
       START CURTAIN TIMER AFTER OPEN IT
    ===================================== */

    useEffect(() => {
        if (step !== 1) return

        const curtainTimer = setTimeout(() => {
            setShowCurtainVideo(true)
        }, 12000)

        return () => clearTimeout(curtainTimer)
    }, [step])

    /* =====================================
       CURTAIN VIDEO BUTTON
    ===================================== */

    const handleCurtainTime = (event) => {
        if (event.currentTarget.currentTime >= 5) {
            setShowStartButton(true)
        }
    }

    const enableMusic = () => {
        const audio = audioRef.current

        if (audio) {
            audio.play()
                .then(() => setMusicBlocked(false))
                .catch(() => setMusicBlocked(true))
        }
    }

    return (
        <>
            {/* Music stays mounted while IntroScreen is open */}
            <audio
                ref={audioRef}
                src="/music.mp3"
                preload="auto"
                loop
            />

            <AnimatePresence mode="wait">

                {/* =====================================
                    STEP 0 — COUNTDOWN SCREEN
                ===================================== */}

                {step === 0 && (
                    <motion.div
                        key="step0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 overflow-hidden bg-black"
                    >
                        <div className="absolute inset-0 bg-black" />

                        <TopDecoration />

                        <div className="relative z-20 flex min-h-screen w-full items-center justify-center px-4 py-8">
                            <motion.div
                                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.7 }}
                                className="
                                    relative
                                    mx-auto
                                    w-full
                                    max-w-[440px]
                                    overflow-hidden
                                    rounded-[42px]
                                    border
                                    border-[#d8ad62]/40
                                    bg-black
                                    p-5
                                    shadow-[0_20px_80px_rgba(0,0,0,0.9),0_0_35px_rgba(218,170,95,0.12)]
                                    sm:p-7
                                "
                            >
                                <div className="pointer-events-none absolute inset-0 rounded-[42px] border border-white/10" />

                                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-400/10 blur-3xl" />

                                {/* Countdown clock */}
                                <div className="relative z-10 mb-5 flex flex-col items-center">
                                    <div className="mb-2 flex items-center gap-2 text-[#e9bd70]">
                                        <Clock size={17} />
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.35em]">
                                            Midnight surprise
                                        </span>
                                    </div>

                                    <motion.div
                                        animate={{
                                            textShadow: [
                                                "0 0 8px rgba(255,190,90,0.3)",
                                                "0 0 22px rgba(255,190,90,0.8)",
                                                "0 0 8px rgba(255,190,90,0.3)",
                                            ],
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                        }}
                                        className="rounded-2xl border border-[#d8ad62]/40 bg-[#100d08] px-6 py-3"
                                    >
                                        <span className="font-mono text-3xl font-bold tracking-[0.12em] text-[#ffd98a] sm:text-4xl">
                                            {seconds >= 60
                                                ? "12:00:00"
                                                : `11:59:${String(seconds).padStart(2, "0")}`}
                                        </span>
                                    </motion.div>
                                </div>

                                {/* Anime video */}
                                <div
                                    className="
                                        relative
                                        z-10
                                        flex
                                        h-[290px]
                                        w-full
                                        items-center
                                        justify-center
                                        overflow-hidden
                                        rounded-[30px]
                                        border
                                        border-[#d8ad62]/25
                                        bg-black
                                        sm:h-[340px]
                                    "
                                >
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(218,170,95,0.12),transparent_70%)]" />

                                    <motion.video
                                        src="/1.2.mp4"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="auto"
                                        className="
                                            relative
                                            z-10
                                            h-full
                                            w-full
                                            object-contain
                                            mix-blend-screen
                                        "
                                        animate={{
                                            scale: [1, 1.035, 1],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </div>

                                {/* Title */}
                                <div className="relative z-10 mt-7 text-center">
                                    <motion.h1
                                        animate={{
                                            textShadow: [
                                                "0 0 10px rgba(255,120,190,0.15)",
                                                "0 0 25px rgba(255,120,190,0.45)",
                                                "0 0 10px rgba(255,120,190,0.15)",
                                            ],
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                        }}
                                        className="text-3xl font-semibold italic leading-tight text-pink-200 sm:text-4xl"
                                    >
                                        Something special
                                        <br />
                                        is waiting...
                                    </motion.h1>

                                    <p className="mt-4 text-sm text-gray-300 sm:text-base">
                                        A beautiful moment is coming ✨
                                    </p>
                                </div>

                                {/* Countdown message */}
                                <div className="relative z-10 mt-6 text-center">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#d8ad62]/70">
                                        Get ready to celebrate
                                    </p>

                                    <motion.div className="mx-auto mt-3 h-1.5 max-w-[220px] overflow-hidden rounded-full bg-white/10">
                                        <motion.div
                                            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-pink-400"
                                            initial={{ width: "0%" }}
                                            animate={{
                                                width: `${Math.min((seconds / 60) * 100, 100)}%`,
                                            }}
                                            transition={{ duration: 0.1 }}
                                        />
                                    </motion.div>
                                </div>

                                {/* OPEN IT BUTTON */}
                                <AnimatePresence>
                                    {midnightReached && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 20,
                                                scale: 0.85,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{
                                                duration: 0.6,
                                                ease: "backOut",
                                            }}
                                            className="relative z-30 mt-6 flex justify-center"
                                        >
                                            <Button
                                                onClick={handleOpenIt}
                                                className="
                                                    min-w-[190px]
                                                    justify-center
                                                    rounded-full
                                                    border
                                                    border-pink-200/30
                                                    bg-gradient-to-r
                                                    from-pink-500
                                                    to-purple-500
                                                    px-8
                                                    py-3
                                                    text-white
                                                    shadow-[0_10px_40px_rgba(255,120,210,0.4)]
                                                "
                                            >
                                                <Heart size={20} />
                                                <span>Open It</span>
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Music fallback */}
                                {musicBlocked && midnightReached && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={enableMusic}
                                        className="
                                            relative
                                            z-30
                                            mx-auto
                                            mt-3
                                            block
                                            rounded-full
                                            border
                                            border-[#e9bd70]/50
                                            bg-black
                                            px-5
                                            py-2
                                            text-xs
                                            text-[#ffd98a]
                                        "
                                    >
                                        ♫ Tap to play birthday music
                                    </motion.button>
                                )}
                            </motion.div>
                        </div>

                        <BottomBalloons />

                        <div className="fixed bottom-5 right-5 z-40 text-xs text-white/35">
                            @Rafee🫶protiva
                        </div>
                    </motion.div>
                )}

                {/* =====================================
                    STEP 1 — MIDNIGHT BIRTHDAY CELEBRATION
                    ORIGINAL DESIGN PRESERVED
                ===================================== */}

                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="fixed inset-0 overflow-hidden bg-black"
                    >
                        <div className="absolute inset-0 bg-black" />

                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(75,35,100,0.22),transparent_65%)]" />

                        <CelebrationFireworks />
                        <FallingGlitter />

                        <TopDecoration />

                        <div className="absolute inset-x-0 top-[22%] z-30 flex justify-center px-3">
                            <BirthdayLetters />
                        </div>

                        <motion.div
                            className="absolute inset-x-0 top-[48%] z-30 text-center"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3, duration: 1 }}
                        >
                            <p className="text-sm font-medium tracking-[0.2em] text-pink-200 sm:text-lg">
                                HAPPY BIRTHDAY, CUTIE ❤️
                            </p>

                            <p className="mt-3 text-xs text-white/60 sm:text-sm">
                                Today is your special day ✨
                            </p>
                        </motion.div>

                        {/* Curtain video */}
                        {showCurtainVideo && (
                            <motion.video
                                key="curtain-video"
                                src="/curtain.mp4"
                                autoPlay
                                muted
                                playsInline
                                preload="auto"
                                onTimeUpdate={handleCurtainTime}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    z-40
                                    h-full
                                    w-full
                                    object-contain
                                    mix-blend-screen
                                "
                            />
                        )}

                        {/* Start surprise button */}
                        <AnimatePresence>
                            {showStartButton && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 35,
                                        scale: 0.8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{
                                        duration: 0.7,
                                        ease: "backOut",
                                    }}
                                    className="fixed bottom-10 left-1/2 z-[100] -translate-x-1/2 px-4"
                                >
                                    <Button
                                        onClick={() => onNext?.()}
                                        className="
                                            min-w-[230px]
                                            justify-center
                                            rounded-full
                                            border
                                            border-pink-200/30
                                            bg-gradient-to-r
                                            from-pink-500
                                            to-purple-500
                                            text-white
                                            shadow-[0_10px_40px_rgba(255,120,210,0.4)]
                                        "
                                    >
                                        <Heart size={20} />
                                        <span>Start the surprise</span>
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Music fallback */}
                        {musicBlocked && (
                            <motion.button
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={enableMusic}
                                className="
                                    fixed
                                    bottom-24
                                    left-1/2
                                    z-[110]
                                    -translate-x-1/2
                                    whitespace-nowrap
                                    rounded-full
                                    border
                                    border-[#e9bd70]/50
                                    bg-black/90
                                    px-5
                                    py-3
                                    text-sm
                                    text-[#ffd98a]
                                    shadow-lg
                                "
                            >
                                ♫ Tap to play birthday music
                            </motion.button>
                        )}

                        <BottomBalloons />

                        <div className="fixed bottom-5 right-5 z-[150] text-xs text-white/35">
                            @Rafee🫶protiva
                        </div>
                    </motion.div>
                )}

                {/* =====================================
                    STEP 2 — ORIGINAL CUTIEPIE SCREEN
                    PRESERVED
                ===================================== */}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{
                            opacity: 0,
                            scale: 0.96,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 1.03,
                        }}
                        transition={{ duration: 0.5 }}
                        className="
                            fixed
                            inset-0
                            flex
                            min-h-screen
                            items-center
                            justify-center
                            overflow-y-auto
                            bg-black
                            px-4
                            py-6
                        "
                    >
                        <div
                            className="
                                mx-auto
                                flex
                                w-full
                                max-w-[440px]
                                flex-col
                                items-center
                                gap-4
                                rounded-[45px]
                                border
                                border-[#d8ad62]/30
                                bg-[#090909]
                                p-7
                                shadow-2xl
                            "
                        >
                            <div
                                className="
                                    relative
                                    flex
                                    h-44
                                    w-full
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    rounded-[30px]
                                    border
                                    border-[#d8ad62]/20
                                    bg-black
                                    shadow-inner
                                    md:h-52
                                "
                            >
                                <img
                                    loading="lazy"
                                    src="/gifs/intro.gif"
                                    alt="Cute"
                                    className="h-full w-full object-contain"
                                />
                            </div>

                            <div className="text-center">
                                <h1
                                    className="
                                        text-2xl
                                        font-semibold
                                        leading-tight
                                        text-pink-200
                                        md:text-3xl
                                    "
                                >
                                    A Cutiepie was born today,
                                    <br />
                                    16 years ago!
                                </h1>

                                <p className="mt-4 text-gray-300">
                                    Yes, it’s YOU! A little surprise awaits...
                                </p>
                            </div>

                            <div className="mt-4">
                                <Button
                                    onClick={() => onNext?.()}
                                    className="
                                        justify-center
                                        rounded-full
                                        bg-gradient-to-r
                                        from-pink-500
                                        to-purple-500
                                        text-white
                                    "
                                >
                                    <Gift size={20} />
                                    <span>Start the surprise</span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </>
    )
}
