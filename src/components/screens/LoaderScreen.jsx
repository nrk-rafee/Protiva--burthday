
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
    const [videoIndex, setVideoIndex] = useState(1)

    const handleNumber = (number) => {
        if (unlocked || code.length >= 4) return

        setError(false)

        const newCode = code + number
        setCode(newCode)

        if (newCode.length === 4) {
            if (newCode === SECRET_CODE) {
                setUnlocked(true)

                setTimeout(() => {
                    onDone?.()
                }, 550)
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
            className="fixed inset-0 z-[9999] flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-black"
        >
            {/* FULL-SCREEN HD VIDEO BACKGROUND */}

            {!unlocked && (
                <>
                    <video
                        key={videoIndex}
                        src={
                            videoIndex === 1
                                ? "/lockscreen1.mp4"
                                : "/lockscreen2.mp4"
                        }
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        onEnded={() =>
                            setVideoIndex((prev) =>
                                prev === 1 ? 2 : 1
                            )
                        }
                        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
                    />

                    {/* Very light tint for text readability */}
                    <div className="pointer-events-none absolute inset-0 z-[1] bg-black/15" />

                    {/* Subtle edge shading; no blur */}
                    <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/25" />
                </>
            )}

            {/* FLOATING HEARTS */}

            {!unlocked && (
                <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
                    {["♡", "♡", "♡", "✦", "♡", "♡"].map(
                        (item, i) => (
                            <motion.span
                                key={i}
                                initial={{
                                    y: "110vh",
                                    x: `${(i * 17) % 100}vw`,
                                    opacity: 0,
                                }}
                                animate={{
                                    y: "-10vh",
                                    opacity: [0, 0.45, 0],
                                }}
                                transition={{
                                    duration: 8 + i,
                                    repeat: Infinity,
                                    delay: i * 0.9,
                                    ease: "linear",
                                }}
                                className="absolute text-xl text-pink-200/70"
                            >
                                {item}
                            </motion.span>
                        )
                    )}
                </div>
            )}

            {/* ONLY TEXT AND BUTTONS — NO CARD BACKGROUND */}

            <AnimatePresence mode="wait">
                {!unlocked ? (
                    <motion.div
                        key="lock"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.5 }}
                        className={`relative z-10 flex max-h-full w-full max-w-[440px] flex-col items-center justify-center overflow-y-auto px-5 py-5 ${
                            error ? "animate-[shake_0.45s_ease-in-out]" : ""
                        }`}
                    >
                        {/* HEADING */}

                        <h1 className="text-center text-[30px] font-extrabold leading-tight tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.8)] sm:text-[36px]">
                            Unlock Your Surprise
                        </h1>

                        <p className="mt-3 text-center text-[15px] font-semibold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.9)] sm:text-base">
                            Enter the secret code to begin 💗
                        </p>

                        {/* CODE HEARTS */}

                        <div className="mt-7 flex justify-center gap-3">
                            {[0, 1, 2, 3].map((index) => (
                                <motion.div
                                    key={index}
                                    animate={
                                        code.length > index
                                            ? { scale: [1, 1.15, 1] }
                                            : {}
                                    }
                                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 ${
                                        code.length > index
                                            ? "border-pink-300 bg-pink-400/95"
                                            : "border-white/80 bg-black/25"
                                    }`}
                                >
                                    <span
                                        className={`text-xl ${
                                            code.length > index
                                                ? "text-white"
                                                : "text-white"
                                        }`}
                                    >
                                        {code.length > index ? "♥" : "♡"}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* ERROR MESSAGE */}

                        <div className="mt-2 h-6 text-center">
                            <AnimatePresence>
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-sm font-bold text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.9)]"
                                    >
                                        Wrong code! Try again 💕
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* NUMBER KEYPAD */}

                        <div className="mx-auto mt-3 grid w-full max-w-[330px] grid-cols-3 gap-3 sm:gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                                (number) => (
                                    <motion.button
                                        key={number}
                                        type="button"
                                        whileTap={{ scale: 0.92 }}
                                        whileHover={{ scale: 1.04 }}
                                        onClick={() =>
                                            handleNumber(String(number))
                                        }
                                        className="flex h-[62px] items-center justify-center rounded-full border border-white/80 bg-white/90 text-2xl font-extrabold text-pink-600 shadow-[0_4px_15px_rgba(0,0,0,0.18)] sm:h-[68px]"
                                    >
                                        {number}
                                    </motion.button>
                                )
                            )}

                            <div />

                            <motion.button
                                type="button"
                                whileTap={{ scale: 0.92 }}
                                whileHover={{ scale: 1.04 }}
                                onClick={() => handleNumber("0")}
                                className="flex h-[62px] items-center justify-center rounded-full border border-white/80 bg-white/90 text-2xl font-extrabold text-pink-600 shadow-[0_4px_15px_rgba(0,0,0,0.18)] sm:h-[68px]"
                            >
                                0
                            </motion.button>

                            <motion.button
                                type="button"
                                whileTap={{ scale: 0.92 }}
                                whileHover={{ scale: 1.04 }}
                                onClick={handleDelete}
                                className="flex h-[62px] items-center justify-center rounded-full border border-white/80 bg-white/90 text-xl font-bold text-pink-600 shadow-[0_4px_15px_rgba(0,0,0,0.18)] sm:h-[68px]"
                            >
                                ⌫
                            </motion.button>
                        </div>

                        {/* BOTTOM TEXT */}

                        <motion.p
                            animate={{ opacity: [0.75, 1, 0.75] }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                            }}
                            className="mt-6 text-center text-sm font-bold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]"
                        >
                            ✨ A little surprise is waiting for you ✨
                        </motion.p>

                        <p className="mt-2 text-center text-xs font-semibold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
                            Made with 💗 for a special birthday
                        </p>
                    </motion.div>
                ) : (
                    /* UNLOCK CELEBRATION */

                    <motion.div
                        key="party"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 0.7,
                            ease: "backOut",
                        }}
                        className="relative z-10 flex h-full w-full items-center justify-center"
                    >
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

                        <div className="relative z-10 px-4 text-center">
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
                                className="mt-5 text-3xl font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]"
                            >
                                Surprise Unlocked! 💗
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="mt-2 text-base text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]"
                            >
                                Get ready for your birthday surprise ✨
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SHAKE ANIMATION */}

            <style jsx global>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-10px); }
                    40% { transform: translateX(10px); }
                    60% { transform: translateX(-7px); }
                    80% { transform: translateX(7px); }
                }
            `}</style>
        </motion.div>
    )
}
