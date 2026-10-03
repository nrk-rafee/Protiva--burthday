"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const SECRET_CODE = "6511"

const confetti = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 0.35,
    duration: 1.8 + Math.random() * 1.2,
    rotate: Math.random() * 360,
    emoji: ["💗", "💕", "✨", "🎀", "🌸", "💖"][i % 6],
}))

export default function LoaderScreen({ onDone }) {
    const [code, setCode] = useState("")
    const [error, setError] = useState(false)
    const [unlocked, setUnlocked] = useState(false)

    const handleNumber = (number) => {
        if (unlocked || code.length >= 4) return

        setError(false)

        const newCode = code + number
        setCode(newCode)

        if (newCode.length === 4) {
            if (newCode === SECRET_CODE) {
                setUnlocked(true)

                // Party animation er por main website open hobe
                setTimeout(() => {
                    onDone?.()
                }, 1900)
            } else {
                setError(true)

                setTimeout(() => {
                    setCode("")
                    setError(false)
                }, 700)
            }
        }
    }

    const handleDelete = () => {
        if (unlocked) return
        setError(false)
        setCode((prev) => prev.slice(0, -1))
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#fff4f8] px-4"
        >
            {/* Soft background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.12, 1],
                        opacity: [0.35, 0.55, 0.35],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-pink-200/50 blur-3xl"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-rose-200/50 blur-3xl"
                />

                {/* Floating hearts */}
                {["♡", "♡", "♡", "♡", "✦", "♡", "♡", "♡"].map(
                    (item, i) => (
                        <motion.span
                            key={i}
                            initial={{
                                y: "110vh",
                                x: `${(i * 13) % 100}vw`,
                                opacity: 0,
                            }}
                            animate={{
                                y: "-10vh",
                                opacity: [0, 0.5, 0],
                            }}
                            transition={{
                                duration: 7 + i,
                                repeat: Infinity,
                                delay: i * 0.7,
                                ease: "linear",
                            }}
                            className="absolute text-xl text-pink-300/50"
                        >
                            {item}
                        </motion.span>
                    )
                )}
            </div>

            {/* Main Card */}
            <AnimatePresence mode="wait">
                {!unlocked ? (
                    <motion.div
                        key="lock"
                        initial={{ y: 25, scale: 0.94, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className={`relative w-full max-w-[430px] overflow-hidden rounded-[38px] border border-white/80 bg-white/85 px-6 py-8 shadow-[0_25px_80px_rgba(236,72,153,0.18)] backdrop-blur-xl sm:px-10 ${
                            error ? "animate-[shake_0.45s_ease-in-out]" : ""
                        }`}
                    >
                        {/* Top decorative dots */}
                        <div className="absolute left-0 right-0 top-0 flex justify-center gap-2 pt-4">
                            <span className="h-1.5 w-8 rounded-full bg-pink-200" />
                            <span className="h-1.5 w-2 rounded-full bg-rose-300" />
                            <span className="h-1.5 w-2 rounded-full bg-pink-200" />
                        </div>

                        {/* Lock icon */}
                        <div className="flex justify-center pt-4">
                            <motion.div
                                animate={{
                                    y: [0, -5, 0],
                                    rotate: [0, -2, 2, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative flex h-28 w-28 items-center justify-center rounded-full border-[7px] border-white bg-gradient-to-br from-pink-50 to-rose-100 shadow-[0_12px_35px_rgba(244,63,94,0.15)]"
                            >
                                <div className="text-[52px]">🔐</div>

                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 1.8,
                                        repeat: Infinity,
                                    }}
                                    className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-pink-400 to-rose-500 text-xl shadow-lg"
                                >
                                    💗
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Heading */}
                        <div className="mt-7 text-center">
                            <h1 className="text-[30px] font-bold tracking-tight text-pink-600 sm:text-[34px]">
                                Unlock Your Surprise
                            </h1>

                            <p className="mt-2 text-[15px] font-medium text-rose-400 sm:text-base">
                                Enter the secret code to begin 💗
                            </p>
                        </div>

                        {/* Code dots */}
                        <div className="mt-7 flex justify-center gap-3">
                            {[0, 1, 2, 3].map((index) => (
                                <motion.div
                                    key={index}
                                    animate={
                                        code.length > index
                                            ? {
                                                  scale: [1, 1.2, 1],
                                              }
                                            : {}
                                    }
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                                        code.length > index
                                            ? "border-pink-400 bg-pink-100"
                                            : "border-pink-100 bg-white"
                                    }`}
                                >
                                    {code.length > index ? (
                                        <span className="text-lg text-pink-500">
                                            ♥
                                        </span>
                                    ) : (
                                        <span className="text-pink-200">
                                            ♡
                                        </span>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Error message */}
                        <div className="h-7 pt-2 text-center">
                            <AnimatePresence>
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-sm font-semibold text-rose-500"
                                    >
                                        Oops! Secret code ta vul hoyeche 💕
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Keypad */}
                        <div className="mx-auto mt-4 grid max-w-[310px] grid-cols-3 gap-3 sm:gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                                <motion.button
                                    key={number}
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{
                                        scale: 1.04,
                                        backgroundColor: "#fff1f6",
                                    }}
                                    onClick={() => handleNumber(String(number))}
                                    className="flex h-[62px] items-center justify-center rounded-full border border-pink-100 bg-white text-2xl font-bold text-pink-500 shadow-[0_5px_18px_rgba(244,114,182,0.10)] transition-colors sm:h-[68px]"
                                >
                                    {number}
                                </motion.button>
                            ))}

                            <div />

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                whileHover={{
                                    scale: 1.04,
                                    backgroundColor: "#fff1f6",
                                }}
                                onClick={() => handleNumber("0")}
                                className="flex h-[62px] items-center justify-center rounded-full border border-pink-100 bg-white text-2xl font-bold text-pink-500 shadow-[0_5px_18px_rgba(244,114,182,0.10)] sm:h-[68px]"
                            >
                                0
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                whileHover={{
                                    scale: 1.04,
                                    backgroundColor: "#fff1f6",
                                }}
                                onClick={handleDelete}
                                className="flex h-[62px] items-center justify-center rounded-full border border-pink-100 bg-white text-xl text-rose-400 shadow-[0_5px_18px_rgba(244,114,182,0.10)] sm:h-[68px]"
                            >
                                ⌫
                            </motion.button>
                        </div>

                        {/* Bottom message */}
                        <motion.p
                            animate={{ opacity: [0.55, 1, 0.55] }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                            }}
                            className="mt-7 text-center text-sm font-medium text-pink-300"
                        >
                            ✨ A little surprise is waiting for you ✨
                        </motion.p>

                        <p className="mt-2 text-center text-xs text-rose-300">
                            Made with 💗 for a special birthday
                        </p>
                    </motion.div>
                ) : (
                    /* PARTY SCREEN */
                    <motion.div
                        key="party"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 0.7,
                            ease: "backOut",
                        }}
                        className="relative flex h-screen w-screen items-center justify-center"
                    >
                        {/* Confetti */}
                        {confetti.map((item) => (
                            <motion.span
                                key={item.id}
                                initial={{
                                    x: 0,
                                    y: 0,
                                    opacity: 0,
                                    rotate: 0,
                                    scale: 0,
                                }}
                                animate={{
                                    x: `${(Math.random() - 0.5) * 100}vw`,
                                    y: `${-20 - Math.random() * 75}vh`,
                                    opacity: [0, 1, 1, 0],
                                    rotate: item.rotate + 720,
                                    scale: [0, 1.2, 1],
                                }}
                                transition={{
                                    duration: item.duration,
                                    delay: item.delay,
                                    ease: "easeOut",
                                }}
                                className="absolute text-2xl"
                                style={{
                                    left: item.left,
                                    top: "70%",
                                }}
                            >
                                {item.emoji}
                            </motion.span>
                        ))}

                        <div className="relative z-10 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.3, 1] }}
                                transition={{
                                    duration: 0.8,
                                    ease: "backOut",
                                }}
                                className="text-7xl"
                            >
                                🎉
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                                className="mt-5 text-3xl font-bold text-pink-600"
                            >
                                Surprise Unlocked! 💗
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="mt-2 text-base text-rose-400"
                            >
                                Get ready for your birthday surprise ✨
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Shake animation */}
            <style jsx global>{`
                @keyframes shake {
                    0%,
                    100% {
                        transform: translateX(0);
                    }
                    20% {
                        transform: translateX(-10px);
                    }
                    40% {
                        transform: translateX(10px);
                    }
                    60% {
                        transform: translateX(-7px);
                    }
                    80% {
                        transform: translateX(7px);
                    }
                }
            `}</style>
        </motion.div>
    )
}
