
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Heart, Clock, Sparkles } from "lucide-react"
import Button from "../Button"

/* ======================================================
   TOP DECORATIONS
====================================================== */

const decorations = [
    { type: "moon", left: "5%", size: 70, length: 100 },
    { type: "star", left: "28%", size: 38, length: 85 },
    { type: "star", left: "52%", size: 34, length: 70 },
    { type: "star", left: "74%", size: 42, length: 95 },
    { type: "moon", left: "91%", size: 55, length: 80 },
]

function TopDecoration() {
    return (
        <div className="pointer-events-none fixed left-0 right-0 top-0 z-40 h-[190px] overflow-hidden">
            {decorations.map((item, index) => (
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
                        className="w-[2px] bg-[#d6a653]/50"
                        style={{ height: item.length }}
                    />

                    {item.type === "star" ? (
                        <motion.span
                            animate={{ scale: [1, 1.12, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            style={{
                                fontSize: item.size,
                                lineHeight: 1,
                                color: "#e7b75e",
                                textShadow: "0 0 20px rgba(231,173,89,.6)",
                            }}
                        >
                            ★
                        </motion.span>
                    ) : (
                        <div
                            className="relative rounded-full"
                            style={{
                                width: item.size,
                                height: item.size,
                                background: "linear-gradient(135deg,#ffe3a0,#d99238)",
                                boxShadow: "0 0 25px rgba(218,160,65,.2)",
                            }}
                        >
                            <div
                                className="absolute rounded-full"
                                style={{
                                    width: item.size * 0.8,
                                    height: item.size * 0.8,
                                    top: -item.size * 0.08,
                                    right: -item.size * 0.1,
                                    background: "#030303",
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

function BottomBalloons() {
    const colors = ["#d99b4d", "#27364d", "#d99b4d", "#27364d", "#d99b4d", "#27364d"]

    return (
        <div className="pointer-events-none fixed bottom-[-25px] left-0 right-0 z-30 h-[120px] overflow-hidden">
            {colors.map((color, index) => (
                <motion.div
                    key={index}
                    className="absolute bottom-0"
                    style={{ left: `${7 + index * 16}%` }}
                    animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
                    transition={{
                        duration: 4 + index * 0.3,
                        delay: index * 0.3,
                        repeat: Infinity,
                    }}
                >
                    <div
                        className="relative rounded-[50%]"
                        style={{
                            width: 70,
                            height: 82,
                            background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,.5), transparent 17%), linear-gradient(145deg, ${color}, #080b14)`,
                            boxShadow: "inset -10px -12px 20px rgba(0,0,0,.3)",
                        }}
                    >
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

function BackgroundFireworks() {
    const items = [
        { left: "10%", top: "18%", color: "#ff6fae" },
        { left: "32%", top: "24%", color: "#ffd166" },
        { left: "78%", top: "18%", color: "#c7a0ff" },
        { left: "20%", top: "58%", color: "#8be9fd" },
        { left: "82%", top: "50%", color: "#fff0a6" },
    ]

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute h-2 w-2 rounded-full"
                    style={{
                        left: item.left,
                        top: item.top,
                        background: item.color,
                        boxShadow: `0 0 25px 8px ${item.color}`,
                    }}
                    animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
                    transition={{
                        duration: 1.5,
                        delay: index * 1.1,
                        repeat: Infinity,
                        repeatDelay: 3,
                    }}
                />
            ))}
        </div>
    )
}

/* ======================================================
   BIRTHDAY LETTERS
====================================================== */

function BirthdayLetters() {
    const words = ["HAPPY", "BIRTHDAY", "CUTIE"]
    const colors = ["#ff4fa3", "#ffd166", "#8be9fd", "#c7a0ff", "#ff8fab"]

    return (
        <div className="absolute inset-x-0 top-[42%] z-10 flex flex-col items-center gap-7 px-2">
            {words.map((word, wordIndex) => (
                <div key={word} className="flex justify-center gap-1 sm:gap-2">
                    {[...word].map((letter, index) => (
                        <motion.span
                            key={`${word}-${index}`}
                            initial={{ opacity: 0, y: 100, scale: 0 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: [0, 1.25, 1],
                            }}
                            transition={{
                                duration: 0.7,
                                delay: wordIndex * 2 + index * 0.12,
                                ease: "backOut",
                            }}
                            className="text-2xl font-black sm:text-4xl"
                            style={{
                                color: colors[(index + wordIndex) % colors.length],
                                textShadow: "0 0 12px currentColor, 0 0 28px currentColor",
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>
            ))}
        </div>
    )
}

/* ======================================================
   MAIN INTRO SCREEN
====================================================== */

export default function IntroScreen({ onNext }) {
    const [step, setStep] = useState(0)
    const [loadingDone, setLoadingDone] = useState(false)
    const [countdown, setCountdown] = useState("00:00:00")
    const [midnightReached, setMidnightReached] = useState(false)
    const [audioBlocked, setAudioBlocked] = useState(false)
    const [showStartButton, setShowStartButton] = useState(false)

    const audioRef = useRef(null)
    const audioStartedRef = useRef(false)

    /* ==================================================
       MIDNIGHT COUNTDOWN
       Browser/device local time is used.
    ================================================== */

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        // Next midnight according to the visitor's device time
        const now = new Date()
        const target = new Date(now)
        target.setHours(24, 0, 0, 0)

        const updateCountdown = () => {
            const currentTime = new Date()
            const remaining = target.getTime() - currentTime.getTime()

            if (remaining <= 0) {
                setCountdown("00:00:00")
                setMidnightReached(true)

                if (!audioStartedRef.current) {
                    audioStartedRef.current = true

                    audio.play()
                        .then(() => setAudioBlocked(false))
                        .catch(() => {
                            setAudioBlocked(true)
                        })
                }

                return
            }

            const hours = Math.floor(remaining / 3600000)
            const minutes = Math.floor((remaining % 3600000) / 60000)
            const seconds = Math.floor((remaining % 60000) / 1000)

            setCountdown(
                `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
            )
        }

        updateCountdown()
        const timer = setInterval(updateCountdown, 1000)

        return () => clearInterval(timer)
    }, [])

    /* ==================================================
       AUDIO RETRY AFTER USER TAP
    ================================================== */

    const tryPlayAudio = () => {
        if (!midnightReached || !audioRef.current) return

        audioRef.current.play()
            .then(() => {
                setAudioBlocked(false)
                audioStartedRef.current = true
            })
            .catch(() => setAudioBlocked(true))
    }

    /* ==================================================
       LOADING BAR
    ================================================== */

    useEffect(() => {
        if (step !== 0) return

        const timer = setTimeout(() => {
            setLoadingDone(true)
        }, 6500)

        return () => clearTimeout(timer)
    }, [step])

    /* ==================================================
       FIREWORK BUTTON
    ================================================== */

    useEffect(() => {
        if (step !== 1) return

        const timer = setTimeout(() => {
            setShowStartButton(true)
        }, 14500)

        return () => clearTimeout(timer)
    }, [step])

    return (
        <div
            className="fixed inset-0 overflow-hidden bg-black text-white"
            onClick={tryPlayAudio}
        >
            {/* Birthday song: public/images/birthdaysong.mp3 */}
            <audio
                ref={audioRef}
                src="/images/birthdaysong.mp3"
                preload="auto"
                loop
            />

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#17130b_0%,#050505_55%,#000_100%)]" />

            <TopDecoration />

            <AnimatePresence mode="wait">

                {/* ==================================================
                    STEP 0 — MIDNIGHT SURPRISE
                ================================================== */}

                {step === 0 && (
                    <motion.div
                        key="midnight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.03 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 z-10 flex items-center justify-center overflow-y-auto px-4 py-24"
                    >
                        <div className="relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[42px] border border-[#c9a45d]/30 bg-black/80 px-5 py-7 text-center shadow-[0_0_70px_rgba(205,160,75,0.10)] backdrop-blur-xl sm:px-7">

                            {/* Gold glow */}
                            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-pink-500/10 blur-3xl" />

                            {/* Countdown heading */}
                            <div className="relative z-10 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#d9b86f]">
                                <Clock size={16} />
                                Midnight Surprise
                            </div>

                            {/* Countdown */}
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        "0 0 15px rgba(218,175,90,.08)",
                                        "0 0 30px rgba(218,175,90,.22)",
                                        "0 0 15px rgba(218,175,90,.08)",
                                    ],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="relative z-10 mx-auto mt-4 inline-flex rounded-2xl border border-[#c9a45d]/30 bg-[#100e09] px-6 py-3"
                            >
                                <span className="font-mono text-3xl font-bold tracking-[0.12em] text-[#f4d58b] sm:text-4xl">
                                    {midnightReached ? "00:00:00" : countdown}
                                </span>
                            </motion.div>

                            {/* Anime video */}
                            <div className="relative z-10 mt-7 flex h-[250px] w-full items-center justify-center overflow-hidden rounded-[30px] border border-[#c9a45d]/20 bg-transparent sm:h-[290px]">
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,169,82,0.12),transparent_70%)]" />

                                <video
                                    src="/1.2.mp4"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                    className="relative z-10 h-full w-full object-contain mix-blend-screen"
                                />
                            </div>

                            {/* Title */}
                            <div className="relative z-10 mt-7">
                                <motion.h1
                                    animate={{
                                        textShadow: [
                                            "0 0 10px rgba(255,140,210,.2)",
                                            "0 0 25px rgba(255,140,210,.5)",
                                            "0 0 10px rgba(255,140,210,.2)",
                                        ],
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="text-3xl font-semibold italic leading-tight text-pink-200 sm:text-4xl"
                                >
                                    Something special
                                    <br />
                                    is waiting...
                                </motion.h1>

                                <p className="mt-4 text-sm text-white/70 sm:text-base">
                                    A beautiful moment is coming ✨
                                </p>
                            </div>

                            {/* Loading text */}
                            <div className="relative z-10 mt-8">
                                <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#b89b62]">
                                    {loadingDone ? "Your surprise is ready" : "Get ready to celebrate"}
                                </p>

                                <div className="mx-auto mt-4 h-[7px] w-[78%] overflow-hidden rounded-full bg-white/15">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{
                                            duration: 6.5,
                                            ease: "easeInOut",
                                        }}
                                        className="h-full rounded-full bg-gradient-to-r from-amber-400 via-pink-400 to-fuchsia-500 shadow-[0_0_15px_rgba(255,100,190,.5)]"
                                    />
                                </div>
                            </div>

                            {/* Open button */}
                            <AnimatePresence>
                                {loadingDone && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.6, ease: "backOut" }}
                                        className="relative z-20 mt-7"
                                    >
                                        <Button
                                            onClick={() => setStep(1)}
                                            className="mx-auto flex w-full max-w-[300px] items-center justify-center gap-3 rounded-full border border-[#f6d994]/40 bg-gradient-to-r from-[#9d7132] via-[#e4b75e] to-[#9d7132] py-4 font-semibold text-black shadow-[0_0_30px_rgba(218,175,90,.25)] transition-transform hover:scale-[1.03]"
                                        >
                                            <Gift size={21} />
                                            <span>Open It!</span>
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {audioBlocked && midnightReached && (
                                <p className="relative z-10 mt-4 text-xs text-amber-200/70">
                                    Tap anywhere to start the birthday song 🎵
                                </p>
                            )}

                            <p className="relative z-10 mt-6 text-[10px] tracking-[0.3em] text-white/25">
                                MADE WITH LOVE · RAFEE
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* ==================================================
                    STEP 1 — BIRTHDAY FIREWORK SHOW
                ================================================== */}

                {step === 1 && (
                    <motion.div
                        key="fireworks"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(90,50,150,.25),transparent_65%)]" />

                        <BackgroundFireworks />

                        {/* Birthday heading */}
                        <div className="absolute inset-x-0 top-[12%] z-20 px-4 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <Sparkles className="mx-auto mb-3 text-amber-300" size={28} />

                                <h2 className="text-2xl font-semibold text-pink-200 sm:text-3xl">
                                    Happy Birthday,
                                    <br />
                                    Cutie ❤️
                                </h2>

                                <p className="mt-2 text-xs tracking-[0.3em] text-white/50">
                                    A LITTLE SURPRISE
                                </p>
                            </motion.div>
                        </div>

                        {/* Animated letters */}
                        <BirthdayLetters />

                        {/* Bottom balloons */}
                        <BottomBalloons />

                        {/* Next button */}
                        <AnimatePresence>
                            {showStartButton && (
                                <motion.div
                                    initial={{ opacity: 0, y: 35, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, ease: "backOut" }}
                                    className="fixed bottom-12 left-1/2 z-[100] w-full -translate-x-1/2 px-5"
                                >
                                    <Button
                                        onClick={() => setStep(2)}
                                        className="mx-auto flex min-w-[230px] items-center justify-center gap-3 rounded-full border border-pink-200/30 bg-gradient-to-r from-pink-500 to-purple-500 py-4 text-white shadow-[0_10px_40px_rgba(255,100,200,.3)]"
                                    >
                                        <Heart size={20} />
                                        <span>Start the surprise</span>
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* ==================================================
                    STEP 2 — CUTIEPIE SCREEN
                ================================================== */}

                {step === 2 && (
                    <motion.div
                        key="cutiepie"
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.03 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-20 flex items-center justify-center overflow-y-auto px-4 py-8"
                    >
                        <div className="mx-auto flex w-full max-w-[440px] flex-col items-center gap-5 rounded-[42px] border border-[#d7b36c]/30 bg-[#080808]/90 p-7 text-center shadow-[0_0_60px_rgba(218,175,90,.12)] backdrop-blur-xl">

                            <div className="flex h-52 w-full items-end justify-center overflow-hidden rounded-[30px] border border-[#d7b36c]/20 bg-gradient-to-b from-[#211b16] to-black">
                                <img
                                    loading="lazy"
                                    src="/gifs/intro.gif"
                                    alt="Cute birthday animation"
                                    className="h-full w-auto object-contain"
                                />
                            </div>

                            <div>
                                <h1 className="text-2xl font-semibold leading-tight text-pink-200 sm:text-3xl">
                                    A Cutiepie was born today,
                                    <br />
                                    16 years ago! ❤️
                                </h1>

                                <p className="mt-4 text-sm text-white/70">
                                    Yes, it’s YOU! A little surprise awaits...
                                </p>
                            </div>

                            <Button
                                onClick={() => onNext?.()}
                                className="mt-3 flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#a87938] to-[#e5bd70] px-8 py-3 font-semibold text-black shadow-[0_8px_30px_rgba(218,175,90,.2)]"
                            >
                                <Gift size={20} />
                                <span>Continue</span>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pointer-events-none fixed bottom-4 right-4 z-[150] text-xs text-white/30">
                @Rafee🫶protiva
            </div>
        </div>
    )
}
