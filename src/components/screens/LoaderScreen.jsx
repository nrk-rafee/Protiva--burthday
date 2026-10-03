"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const SECRET_CODE = "6511"

const confetti = [
    { x: "-42vw", y: "105vh", r: -25, d: 0 },
    { x: "-30vw", y: "100vh", r: 35, d: 0.1 },
    { x: "-18vw", y: "108vh", r: -40, d: 0.2 },
    { x: "-5vw", y: "102vh", r: 25, d: 0.05 },
    { x: "8vw", y: "105vh", r: -30, d: 0.15 },
    { x: "20vw", y: "101vh", r: 40, d: 0.25 },
    { x: "32vw", y: "108vh", r: -20, d: 0.08 },
    { x: "44vw", y: "103vh", r: 30, d: 0.18 },
    { x: "-38vw", y: "110vh", r: 55, d: 0.3 },
    { x: "-24vw", y: "104vh", r: -55, d: 0.12 },
    { x: "-10vw", y: "109vh", r: 45, d: 0.22 },
    { x: "4vw", y: "103vh", r: -45, d: 0.04 },
    { x: "17vw", y: "110vh", r: 50, d: 0.17 },
    { x: "30vw", y: "104vh", r: -35, d: 0.28 },
    { x: "42vw", y: "109vh", r: 60, d: 0.1 },
]

const balloons = [
    { left: "5%", emoji: "🎈", delay: 0 },
    { left: "18%", emoji: "🎀", delay: 0.2 },
    { left: "75%", emoji: "🎈", delay: 0.1 },
    { left: "88%", emoji: "🎈", delay: 0.35 },
]

export default function LoaderScreen({ onDone }) {
    const [code, setCode] = useState("")
    const [error, setError] = useState(false)
    const [unlocked, setUnlocked] = useState(false)

    const addNumber = (number) => {
        if (unlocked) return

        setError(false)

        if (code.length < 4) {
            setCode((prev) => prev + number)
        }
    }

    const removeNumber = () => {
        if (unlocked) return
        setError(false)
        setCode((prev) => prev.slice(0, -1))
    }

    useEffect(() => {
        if (code.length !== 4 || unlocked) return

        if (code === SECRET_CODE) {
            setUnlocked(true)

            const timer = setTimeout(() => {
                onDone?.()
            }, 3000)

            return () => clearTimeout(timer)
        }

        setError(true)

        const timer = setTimeout(() => {
            setCode("")
            setError(false)
        }, 700)

        return () => clearTimeout(timer)
    }, [code, unlocked, onDone])

    const numbers = [
        "1", "2", "3",
        "4", "5", "6",
        "7", "8", "9",
        "", "0", "delete"
    ]

    return (
        <div className="fixed inset-0 z-[9999] overflow-hidden bg-gradient-to-br from-pink-100 via-white to-rose-100">

            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity
                    }}
                />

                <motion.div
                    className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-rose-300/30 blur-3xl"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity
                    }}
                />
            </div>

            {/* Floating hearts */}
            {!unlocked && (
                <div className="absolute inset-0 pointer-events-none">
                    {["♡", "♡", "♡", "♡", "♡", "♡", "♡", "♡"].map(
                        (heart, index) => (
                            <motion.div
                                key={index}
                                className="absolute text-pink-300/50 text-2xl"
                                style={{
                                    left: `${8 + index * 12}%`,
                                    top: `${10 + (index % 4) * 22}%`
                                }}
                                animate={{
                                    y: [0, -18, 0],
                                    opacity: [0.25, 0.7, 0.25],
                                    rotate: [-8, 8, -8]
                                }}
                                transition={{
                                    duration: 3 + index * 0.2,
                                    repeat: Infinity,
                                    delay: index * 0.25
                                }}
                            >
                                {heart}
                            </motion.div>
                        )
                    )}
                </div>
            )}

            <AnimatePresence mode="wait">

                {/* ================= LOCK SCREEN ================= */}
                {!unlocked && (
                    <motion.div
                        key="lock-screen"
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            scale: 1.15,
                            filter: "blur(10px)"
                        }}
                        transition={{ duration: 0.7 }}
                        className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6"
                    >

                        <motion.div
                            className="relative w-full max-w-[390px] rounded-[42px] border border-white/80 bg-white/85 p-6 shadow-[0_25px_80px_rgba(236,72,153,0.20)] backdrop-blur-xl sm:p-8"
                            animate={
                                error
                                    ? {
                                          x: [-10, 10, -8, 8, 0]
                                      }
                                    : {}
                            }
                            transition={{ duration: 0.35 }}
                        >

                            {/* Top decoration */}
                            <div className="absolute left-5 top-5 text-pink-300 text-xl">
                                ✦
                            </div>

                            <div className="absolute right-6 top-6 text-rose-300 text-lg">
                                ♡
                            </div>

                            {/* Lock */}
                            <motion.div
                                className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-rose-100 shadow-inner"
                                animate={{
                                    y: [0, -5, 0]
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity
                                }}
                            >
                                <div className="relative text-5xl">
                                    🔐
                                </div>
                            </motion.div>

                            {/* Heading */}
                            <motion.h1
                                className="text-center text-3xl font-bold tracking-tight text-pink-600"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Unlock Your Surprise
                            </motion.h1>

                            <motion.p
                                className="mt-2 text-center text-sm font-medium text-rose-400"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.35 }}
                            >
                                Enter the secret code to begin 💗
                            </motion.p>

                            {/* Code dots */}
                            <div className="my-7 flex justify-center gap-4">
                                {[0, 1, 2, 3].map((index) => (
                                    <motion.div
                                        key={index}
                                        animate={
                                            code[index]
                                                ? {
                                                      scale: [1, 1.2, 1]
                                                  }
                                                : {}
                                        }
                                        className={`flex h-11 w-11 items-center justify-center rounded-full border-2 ${
                                            error
                                                ? "border-red-300 bg-red-50"
                                                : code[index]
                                                ? "border-pink-400 bg-pink-100"
                                                : "border-pink-100 bg-white"
                                        }`}
                                    >
                                        <span className="text-lg">
                                            {code[index] ? "♥" : "♡"}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-3 text-center text-sm font-semibold text-rose-500"
                                >
                                    Oops! That's not the secret code 💔
                                </motion.p>
                            )}

                            {/* Keypad */}
                            <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                {numbers.map((number, index) => {

                                    if (number === "") {
                                        return <div key={index} />
                                    }

                                    if (number === "delete") {
                                        return (
                                            <motion.button
                                                key={index}
                                                type="button"
                                                onClick={removeNumber}
                                                whileTap={{ scale: 0.9 }}
                                                className="flex h-14 items-center justify-center rounded-full border border-pink-100 bg-white text-xl text-rose-400 shadow-sm transition hover:bg-pink-50 sm:h-16"
                                            >
                                                ⌫
                                            </motion.button>
                                        )
                                    }

                                    return (
                                        <motion.button
                                            key={number}
                                            type="button"
                                            onClick={() => addNumber(number)}
                                            whileHover={{
                                                scale: 1.05,
                                                boxShadow:
                                                    "0 10px 25px rgba(236,72,153,0.15)"
                                            }}
                                            whileTap={{
                                                scale: 0.9
                                            }}
                                            className="flex h-14 items-center justify-center rounded-full border border-pink-100 bg-white text-xl font-bold text-pink-500 shadow-sm sm:h-16"
                                        >
                                            {number}
                                        </motion.button>
                                    )
                                })}
                            </div>

                            {/* Bottom text */}
                            <motion.div
                                className="mt-6 text-center text-xs font-medium text-pink-300"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity
                                }}
                            >
                                ✨ A little surprise is waiting for you ✨
                            </motion.div>

                        </motion.div>
                    </motion.div>
                )}

                {/* ================= PARTY SCREEN ================= */}
                {unlocked && (
                    <motion.div
                        key="party-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-300 via-rose-200 to-purple-300"
                    >

                        {/* Confetti */}
                        {confetti.map((item, index) => (
                            <motion.div
                                key={index}
                                className="absolute h-3 w-2 rounded-sm bg-pink-500"
                                style={{
                                    left: "50%",
                                    top: "42%",
                                    x: item.x,
                                    y: item.y
                                }}
                                initial={{
                                    opacity: 0,
                                    scale: 0,
                                    rotate: 0
                                }}
                                animate={{
                                    opacity: [0, 1, 1, 0],
                                    scale: [0, 1.2, 1, 0.7],
                                    y: ["0vh", "-35vh", "-70vh", "-110vh"],
                                    x: [
                                        "0vw",
                                        item.x,
                                        `${parseFloat(item.x) * 1.2}vw`,
                                        `${parseFloat(item.x) * 1.4}vw`
                                    ],
                                    rotate: [0, item.r, item.r * 2, item.r * 3]
                                }}
                                transition={{
                                    duration: 2.5,
                                    delay: item.d,
                                    ease: "easeOut"
                                }}
                            />
                        ))}

                        {/* Balloons */}
                        {balloons.map((balloon, index) => (
                            <motion.div
                                key={index}
                                className="absolute bottom-[-60px] text-5xl"
                                style={{ left: balloon.left }}
                                initial={{ y: 0, opacity: 0 }}
                                animate={{
                                    y: "-115vh",
                                    opacity: [0, 1, 1, 0],
                                    rotate: [-8, 8, -8]
                                }}
                                transition={{
                                    duration: 3,
                                    delay: balloon.delay,
                                    ease: "easeOut"
                                }}
                            >
                                {balloon.emoji}
                            </motion.div>
                        ))}

                        {/* Party message */}
                        <motion.div
                            initial={{
                                scale: 0.4,
                                opacity: 0,
                                rotate: -8
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                rotate: 0
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 180,
                                damping: 12
                            }}
                            className="relative z-20 px-6 text-center"
                        >
                            <motion.div
                                className="mb-5 text-7xl"
                                animate={{
                                    rotate: [-8, 8, -8],
                                    scale: [1, 1.12, 1]
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: 2
                                }}
                            >
                                🎉
                            </motion.div>

                            <h2 className="text-4xl font-black text-white drop-shadow-lg sm:text-5xl">
                                Surprise! 💗
                            </h2>

                            <p className="mt-3 text-lg font-semibold text-white/95">
                                The birthday magic is unlocked ✨
                            </p>

                            <motion.div
                                className="mt-5 text-4xl"
                                animate={{
                                    scale: [1, 1.25, 1]
                                }}
                                transition={{
                                    duration: 0.7,
                                    repeat: 2
                                }}
                            >
                                🎂💖🎈
                            </motion.div>
                        </motion.div>

                    </motion.div>
                )}

            </AnimatePresence>

            {/* Small footer */}
            {!unlocked && (
                <div className="absolute bottom-3 left-0 right-0 z-20 text-center text-[10px] font-medium text-pink-300">
                    Made with 💗 for a special birthday
                </div>
            )}

        </div>
    )
}
