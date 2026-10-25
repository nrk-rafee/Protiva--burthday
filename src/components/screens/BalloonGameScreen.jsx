"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MoveRight } from "lucide-react"
import Button from "../Button"

// ======================================================
// BALLOON DATA
// ======================================================

const balloonData = [
    {
        id: 1,
        word: "You",
        color1: "#ff9eb7",
        color2: "#d84d78",
        left: "20%",
        top: "30%",
        rotate: -5,
        delay: 0,
    },
    {
        id: 2,
        word: "are",
        color1: "#ffc45b",
        color2: "#c68118",
        left: "40%",
        top: "40%",
        rotate: 4,
        delay: 0.2,
    },
    {
        id: 3,
        word: "a",
        color1: "#65e49a",
        color2: "#168d57",
        left: "60%",
        top: "40%",
        rotate: -4,
        delay: 0.4,
    },
    {
        id: 4,
        word: "cutiee 🫶",
        color1: "#70d7ff",
        color2: "#2588bd",
        left: "80%",
        top: "30%",
        rotate: 5,
        delay: 0.6,
    },
]

// ======================================================
// CONFETTI COLORS
// ======================================================

const confettiColors = [
    "#ff8fab",
    "#ffd166",
    "#c084fc",
    "#8be9fd",
    "#ffb3c6",
    "#f472b6",
    "#ffffff",
]

// ======================================================
// BACKGROUND
// ======================================================

function BalloonBackground() {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#050307]" />

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(105,0,67,0.24),transparent_70%)]" />

            <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />

            <motion.div
                className="absolute left-8 top-32 text-5xl text-pink-400/20"
                animate={{
                    scale: [1, 1.15, 1],
                    rotate: [-5, 5, -5],
                    opacity: [0.25, 0.55, 0.25],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                ✦
            </motion.div>

            <motion.div
                className="absolute right-8 top-48 text-4xl text-purple-400/20"
                animate={{
                    scale: [1, 1.12, 1],
                    rotate: [5, -5, 5],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                ✦
            </motion.div>

            <div className="absolute bottom-28 left-[-25px] text-7xl text-pink-500/10">
                ★
            </div>

            <div className="absolute bottom-24 right-[-20px] text-7xl text-pink-500/10">
                ♡
            </div>
        </div>
    )
}

// ======================================================
// TOP BUNTING
// ======================================================

function TopBunting() {
    const colors = [
        "#ff648b",
        "#24c6ef",
        "#ffc32b",
        "#27d89a",
        "#d56bea",
        "#ff648b",
        "#24c6ef",
        "#ffc32b",
        "#d56bea",
        "#27d89a",
    ]

    return (
        <div className="pointer-events-none fixed left-0 right-0 top-0 z-10">
            <svg
                className="h-32 w-full"
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
            >
                <path
                    d="M0 0 Q100 115 200 0 Q300 115 400 0"
                    fill="none"
                    stroke="#a67cae"
                    strokeWidth="2"
                />

                {colors.map((color, index) => {
                    const x = index * 40 + 4

                    const y =
                        index < 5
                            ? 16 + index * 9
                            : 52 - (index - 5) * 9

                    return (
                        <path
                            key={index}
                            d={`M${x} ${y} L${x + 17} ${y} L${x + 8.5} ${y + 28} Z`}
                            fill={color}
                        />
                    )
                })}
            </svg>
        </div>
    )
}

// ======================================================
// POP PARTICLES
// ======================================================

function PopParticles({ color1, color2 }) {
    const particles = Array.from({ length: 20 })

    return (
        <div className="pointer-events-none absolute inset-0">
            {particles.map((_, index) => {
                const angle = (360 / particles.length) * index
                const distance = 35 + (index % 5) * 10

                const x =
                    Math.cos((angle * Math.PI) / 180) *
                    distance

                const y =
                    Math.sin((angle * Math.PI) / 180) *
                    distance

                const color =
                    index % 2 === 0 ? color1 : color2

                return (
                    <motion.span
                        key={index}
                        className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
                        style={{
                            backgroundColor: color,
                            boxShadow: `0 0 8px ${color}`,
                        }}
                        initial={{
                            x: 0,
                            y: 0,
                            scale: 0,
                            opacity: 1,
                        }}
                        animate={{
                            x,
                            y,
                            scale: [0, 1.5, 0],
                            opacity: [1, 1, 0],
                        }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                        }}
                    />
                )
            })}
        </div>
    )
}

// ======================================================
// CONFETTI
// ======================================================

function CelebrationConfetti() {
    const pieces = Array.from({ length: 90 })

    return (
        <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
            {pieces.map((_, index) => {
                const left = (index * 47 + 7) % 100
                const rotation = (index * 37) % 360
                const size = 5 + (index % 5)

                const color =
                    confettiColors[
                        index % confettiColors.length
                    ]

                return (
                    <motion.span
                        key={index}
                        className="absolute rounded-sm"
                        style={{
                            left: `${left}%`,
                            top: "-20px",
                            width: size,
                            height: size * 1.7,
                            backgroundColor: color,
                            rotate: rotation,
                        }}
                        initial={{
                            y: -30,
                            opacity: 0,
                        }}
                        animate={{
                            y: [
                                -30,
                                "35vh",
                                "75vh",
                                "110vh",
                            ],
                            x: [
                                0,
                                index % 2 === 0 ? 25 : -25,
                                index % 2 === 0 ? -35 : 35,
                                index % 2 === 0 ? 20 : -20,
                            ],
                            rotate: [
                                rotation,
                                rotation + 180,
                                rotation + 360,
                                rotation + 540,
                            ],
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: 3.5 + (index % 5) * 0.35,
                            delay: (index % 20) * 0.04,
                            ease: "easeOut",
                        }}
                    />
                )
            })}
        </div>
    )
}

// ======================================================
// SINGLE BALLOON
// ======================================================

function Balloon({ item, popped, onPop }) {
    return (
        <motion.div
            className="absolute z-20 flex flex-col items-center"
            style={{
                left: item.left,
                top: item.top,
                width: 100,
                transform: "translateX(-50%)",
            }}
            initial={{
                opacity: 0,
                y: 20,
                scale: 0.8,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.55,
                delay: item.delay,
            }}
        >
            <AnimatePresence mode="wait">
                {!popped ? (
                    <motion.button
                        key="balloon"
                        type="button"
                        onClick={() => onPop(item.id)}
                        aria-label={`Pop balloon ${item.id}`}
                        className="relative flex h-[112px] w-[100px] cursor-pointer touch-manipulation items-center justify-center focus:outline-none"
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: [
                                item.rotate,
                                item.rotate + 3,
                                item.rotate - 3,
                                item.rotate,
                            ],
                        }}
                        exit={{
                            opacity: 0,
                            scale: 1.35,
                        }}
                        transition={{
                            duration: 0.45,
                            rotate: {
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                        }}
                        whileTap={{
                            scale: 0.88,
                        }}
                    >
                        {/* Balloon body */}

                        <div
                            className="relative h-[108px] w-[88px] rounded-[50%]"
                            style={{
                                background: `
                                    radial-gradient(
                                        ellipse at 30% 24%,
                                        rgba(255,255,255,0.8) 0%,
                                        rgba(255,255,255,0.25) 12%,
                                        transparent 25%
                                    ),
                                    linear-gradient(
                                        145deg,
                                        ${item.color1},
                                        ${item.color2}
                                    )
                                `,
                                boxShadow: `
                                    inset -12px -15px 22px rgba(0,0,0,0.22),
                                    inset 5px 5px 12px rgba(255,255,255,0.1),
                                    0 12px 24px rgba(0,0,0,0.2)
                                `,
                            }}
                        >
                            {/* Shine */}

                            <div
                                className="absolute left-[20px] top-[22px] h-7 w-5 rotate-[-25deg] rounded-full bg-white/50 blur-[1px]"
                            />

                            {/* Knot */}

                            <div
                                className="absolute left-1/2 -bottom-[8px] -translate-x-1/2"
                                style={{
                                    width: 15,
                                    height: 13,
                                    background: item.color2,
                                    clipPath:
                                        "polygon(0 0, 100% 0, 70% 100%, 30% 100%)",
                                }}
                            />
                        </div>
                    </motion.button>
                ) : (
                    <motion.div
                        key="word"
                        className="relative flex h-[112px] w-[130px] items-center justify-center whitespace-nowrap"
                        initial={{
                            opacity: 0,
                            scale: 0.3,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 15,
                        }}
                    >
                        <PopParticles
                            color1={item.color1}
                            color2={item.color2}
                        />

                        <span className="relative z-10 text-lg font-bold text-white drop-shadow-[0_0_10px_rgba(255,160,210,0.7)] sm:text-xl">
                            {item.word}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ======================================================
// CURVED BALLOON STRINGS
// All four strings meet at the bottom centre.
// ======================================================

function BalloonStrings() {
    return (
        <svg
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            viewBox="0 0 620 570"
            preserveAspectRatio="none"
            fill="none"
        >
            <g
                stroke="rgba(255,255,255,0.78)"
                strokeWidth="1.6"
                strokeLinecap="round"
            >
                <path d="M124 260 C140 365 280 460 310 552" />
                <path d="M248 310 C260 385 292 465 310 552" />
                <path d="M372 310 C360 385 328 465 310 552" />
                <path d="M496 260 C480 365 340 460 310 552" />
            </g>

            <circle
                cx="310"
                cy="552"
                r="4"
                fill="rgba(255,255,255,0.9)"
            />
        </svg>
    )
}

// ======================================================
// MAIN SCREEN
// ======================================================

export default function BalloonGameScreen({ onNext }) {
    const [popped, setPopped] = useState([])
    const [celebration, setCelebration] = useState(false)

    // ==================================================
    // POP BALLOON
    // ==================================================

    const handlePop = (id) => {
        if (popped.includes(id)) return

        setPopped((previous) => [...previous, id])
    }

    // ==================================================
    // START CELEBRATION
    // ==================================================

    useEffect(() => {
        if (popped.length !== 4) return

        const timer = setTimeout(() => {
            setCelebration(true)
        }, 300)

        return () => clearTimeout(timer)
    }, [popped])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 overflow-hidden bg-[#050307]"
        >
            {/* Background */}

            <BalloonBackground />

            {/* Top bunting */}

            <TopBunting />

            {/* Main content */}

            <div className="relative z-30 flex min-h-screen w-full flex-col items-center px-4 pb-20 pt-28">
                {/* Heading */}

                <motion.h1
                    initial={{
                        opacity: 0,
                        y: -15,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="text-center font-serif text-2xl italic text-white sm:text-3xl"
                    style={{
                        textShadow:
                            "0 0 18px rgba(255,190,230,0.15)",
                    }}
                >
                    {popped.length < 4
                        ? "Pop all 4 balloons"
                        : "You found them all! 💗"}
                </motion.h1>

                {/* Balloon card */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                        scale: 0.97,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.1,
                    }}
                    className="
                        relative
                        mt-7
                        h-[570px]
                        w-full
                        max-w-[620px]
                        overflow-hidden
                        rounded-[40px]
                        border
                        border-white/[0.04]
                        bg-[#260019]
                        shadow-[0_15px_55px_rgba(0,0,0,0.4)]
                    "
                >
                    {/* Card background glow */}

                    <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-[radial-gradient(ellipse_at_50%_25%,rgba(110,0,70,0.2),transparent_70%)]" />

                    {/* Curved strings behind the balloons */}

                    <BalloonStrings />

                    {/* Balloons */}

                    <div className="absolute inset-0">
                        {balloonData.map((item) => (
                            <Balloon
                                key={item.id}
                                item={item}
                                popped={popped.includes(item.id)}
                                onPop={handlePop}
                            />
                        ))}
                    </div>

                    {/* Hint */}

                    {popped.length < 4 && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute bottom-7 left-0 right-0 z-30 text-center text-sm text-white/55"
                        >
                            Tap the balloons one by one 🎈
                        </motion.p>
                    )}
                </motion.div>

                {/* Next button */}

                <AnimatePresence>
                    {popped.length === 4 && (
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
                            transition={{
                                duration: 0.55,
                                delay: 0.7,
                            }}
                            className="relative z-[250] mt-7"
                        >
                            <Button
                                onClick={onNext}
                                className="
                                    justify-center
                                    bg-gradient-to-r
                                    from-pink-400
                                    to-fuchsia-500
                                    text-white
                                    shadow-[0_8px_30px_rgba(255,80,170,0.3)]
                                "
                            >
                                Next
                                <MoveRight size={18} />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Celebration */}

            <AnimatePresence>
                {celebration && <CelebrationConfetti />}
            </AnimatePresence>

            {/* Signature */}

            <div className="pointer-events-none fixed bottom-3 right-4 z-[300] text-sm text-white/40">
                @Rafee🫶protiva
            </div>
        </motion.div>
    )
}
