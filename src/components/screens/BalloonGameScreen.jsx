
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
        color1: "#ff91b5",
        color2: "#e94e79",
        left: "18%",
        top: "14%",
        rotate: -5,
        delay: 0,
    },
    {
        id: 2,
        word: "are",
        color1: "#ffcf78",
        color2: "#e99513",
        left: "39%",
        top: "19%",
        rotate: 4,
        delay: 0.2,
    },
    {
        id: 3,
        word: "a",
        color1: "#70e0a0",
        color2: "#16a866",
        left: "61%",
        top: "19%",
        rotate: -4,
        delay: 0.4,
    },
    {
        id: 4,
        word: "cutiee 🫶",
        color1: "#83d9ff",
        color2: "#168ed0",
        left: "82%",
        top: "14%",
        rotate: 5,
        delay: 0.6,
    },
]

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
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#050307]">
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 48%, #26001c 0%, #10000d 55%, #030204 100%)",
                }}
            />

            <div
                className="absolute inset-0 opacity-25"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px",
                }}
            />

            <div
                className="absolute bottom-0 left-0 h-1/2 w-full"
                style={{
                    background:
                        "radial-gradient(ellipse at bottom left, rgba(100,0,35,0.35), transparent 70%)",
                }}
            />

            <motion.div
                className="absolute left-6 top-48 text-5xl text-pink-500/20"
                animate={{
                    scale: [1, 1.15, 1],
                    rotate: [-5, 5, -5],
                    opacity: [0.25, 0.65, 0.25],
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
                className="absolute right-6 top-[42%] text-4xl text-purple-400/20"
                animate={{
                    scale: [1, 1.15, 1],
                    rotate: [5, -5, 5],
                    opacity: [0.2, 0.55, 0.2],
                }}
                transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                ✦
            </motion.div>

            <div className="absolute bottom-20 -left-5 text-7xl text-pink-600/20">
                ★
            </div>

            <div className="absolute bottom-20 -right-4 text-7xl text-pink-600/20">
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
        "#ff477e",
        "#20c4e8",
        "#ffb900",
        "#10d69a",
        "#d75ce5",
        "#ff477e",
        "#20c4e8",
        "#ffb900",
        "#d75ce5",
        "#10d69a",
        "#ff477e",
    ]

    return (
        <div className="pointer-events-none fixed left-0 right-0 top-0 z-50">
            <svg
                className="h-32 w-full"
                viewBox="0 0 400 125"
                preserveAspectRatio="none"
            >
                <path
                    d="M0 0 Q100 150 200 0 Q300 150 400 0"
                    fill="none"
                    stroke="#b98acb"
                    strokeWidth="2"
                />

                {colors.map((color, index) => {
                    const x = index * 38 - 5

                    const y =
                        index <= 5
                            ? 15 + index * 10
                            : 65 - (index - 5) * 10

                    return (
                        <path
                            key={index}
                            d={`M${x} ${y} L${x + 18} ${y + 2} L${x + 9} ${y + 31} Z`}
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
        <div className="pointer-events-none absolute inset-0 overflow-visible">
            {particles.map((_, index) => {
                const angle = (360 / particles.length) * index
                const distance = 30 + (index % 5) * 12

                const x =
                    Math.cos((angle * Math.PI) / 180) * distance

                const y =
                    Math.sin((angle * Math.PI) / 180) * distance

                const color =
                    index % 2 === 0 ? color1 : color2

                return (
                    <motion.span
                        key={index}
                        className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
                        style={{
                            backgroundColor: color,
                            boxShadow: `0 0 10px ${color}`,
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
// SINGLE BALLOON
// ======================================================

function Balloon({ item, popped, onPop }) {
    return (
        <motion.div
            className="absolute z-20 flex flex-col items-center"
            style={{
                left: item.left,
                top: item.top,
                width: 90,
                height: 110,
                marginLeft: -45,
            }}
            initial={{
                opacity: 0,
                scale: 0.75,
                y: 15,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
            }}
            transition={{
                duration: 0.6,
                delay: item.delay,
            }}
        >
            <AnimatePresence mode="wait">
                {!popped ? (
                    <motion.button
                        key="balloon"
                        type="button"
                        aria-label={`Pop balloon ${item.id}`}
                        onClick={() => onPop(item.id)}
                        className="absolute left-0 top-0 flex h-[100px] w-[90px] cursor-pointer items-start justify-center border-0 bg-transparent p-0 focus:outline-none"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: [
                                item.rotate,
                                item.rotate + 2,
                                item.rotate - 2,
                                item.rotate,
                            ],
                        }}
                        exit={{
                            opacity: 0,
                            scale: 1.35,
                        }}
                        transition={{
                            duration: 0.4,
                            rotate: {
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div
                            className="relative h-[88px] w-[74px] rounded-[50%]"
                            style={{
                                background: `
                                    radial-gradient(
                                        ellipse at 29% 23%,
                                        rgba(255,255,255,0.95) 0%,
                                        rgba(255,255,255,0.55) 10%,
                                        transparent 23%
                                    ),
                                    linear-gradient(
                                        145deg,
                                        ${item.color1} 0%,
                                        ${item.color2} 100%
                                    )
                                `,
                                boxShadow: `
                                    inset -12px -16px 22px rgba(0,0,0,0.22),
                                    inset 5px 5px 12px rgba(255,255,255,0.15),
                                    0 10px 25px rgba(0,0,0,0.25)
                                `,
                            }}
                        >
                            <div className="absolute left-[18px] top-[14px] h-7 w-4 rotate-[-25deg] rounded-full bg-white/35 blur-[1px]" />

                            <div
                                className="absolute -bottom-[7px] left-1/2 -translate-x-1/2"
                                style={{
                                    width: 13,
                                    height: 12,
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
                        className="absolute left-1/2 top-0 flex h-[100px] w-[150px] -translate-x-1/2 items-center justify-center whitespace-nowrap"
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

                        <span className="relative z-10 text-xl font-bold text-pink-300 drop-shadow-[0_0_8px_rgba(255,100,180,0.4)]">
                            {item.word}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ======================================================
// CELEBRATION CONFETTI
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
                    confettiColors[index % confettiColors.length]

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
                        }}
                        initial={{
                            y: -30,
                            opacity: 0,
                            rotate: rotation,
                        }}
                        animate={{
                            y: [-30, "35vh", "75vh", "110vh"],
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
// CHARACTER VIDEOS — OVERLAY LAYER
// ======================================================

function CharacterVideos() {
    return (
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-30 h-[48vh] max-h-[560px] w-full overflow-hidden">

            {/* LEFT CHARACTER */}
            <video
                src="/ballon%20left%20.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute bottom-0 left-0 h-full w-[56%] object-contain object-bottom"
                style={{
                    mixBlendMode: "screen",
                    WebkitMixBlendMode: "screen",
                    background: "transparent",
                }}
            />

            {/* RIGHT CHARACTER */}
            <video
                src="/ballon%20right%20.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute bottom-0 right-0 h-full w-[56%] object-contain object-bottom"
                style={{
                    mixBlendMode: "screen",
                    WebkitMixBlendMode: "screen",
                    background: "transparent",
                }}
            />
        </div>
    )
}

// ======================================================
// MAIN BALLOON SCREEN
// ======================================================

export default function BalloonGameScreen({ onNext }) {
    const [popped, setPopped] = useState([])
    const [celebration, setCelebration] = useState(false)

    const handlePop = (id) => {
        setPopped((previous) => {
            if (previous.includes(id)) return previous
            return [...previous, id]
        })
    }

    useEffect(() => {
        if (popped.length !== 4) return

        const timer = setTimeout(() => {
            setCelebration(true)
        }, 350)

        return () => clearTimeout(timer)
    }, [popped])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 overflow-x-hidden overflow-y-auto bg-[#050307] text-white"
        >
            <BalloonBackground />

            {/* VIDEOS BEHIND THE TEXT AND BUTTONS */}
            <CharacterVideos />

            <TopBunting />

            {/* MAIN CONTENT */}
            <div className="relative z-40 flex min-h-screen w-full flex-col items-center px-4 pb-16 pt-40">

                {/* HEADING */}
                <motion.h1
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-50 text-center font-serif text-2xl italic text-[#f1d8ef] sm:text-3xl"
                    style={{
                        textShadow: "0 2px 15px rgba(255,150,220,0.12)",
                    }}
                >
                    {popped.length < 4
                        ? "Pop all 4 balloons"
                        : "You found them all! 💗"}
                </motion.h1>

                {/* BALLOON CARD */}
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
                    className="relative mt-7 h-[55vh] min-h-[520px] max-h-[820px] w-full max-w-[630px] overflow-hidden rounded-[36px] border border-[#5a153e]/30"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(49,0,32,0.98) 0%, rgba(38,0,25,0.92) 48%, rgba(27,0,20,0.12) 100%)",
                        boxShadow:
                            "0 15px 55px rgba(120,0,70,0.16), inset 0 0 45px rgba(0,0,0,0.12)",
                    }}
                >
                    <div
                        className="pointer-events-none absolute inset-0 z-0"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(255,100,190,0.025), transparent 45%, rgba(100,0,70,0.02))",
                        }}
                    />

                    {/* STRINGS */}
                    <svg
                        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient
                                id="balloonString"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#ffffff"
                                    stopOpacity="0.75"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#c7c4d0"
                                    stopOpacity="0.85"
                                />
                            </linearGradient>
                        </defs>

                        <path
                            d="M18 27 Q26 60 50 96"
                            fill="none"
                            stroke="url(#balloonString)"
                            strokeWidth="0.25"
                            vectorEffect="non-scaling-stroke"
                        />

                        <path
                            d="M39 32 Q40 66 50 96"
                            fill="none"
                            stroke="url(#balloonString)"
                            strokeWidth="0.25"
                            vectorEffect="non-scaling-stroke"
                        />

                        <path
                            d="M61 32 Q60 66 50 96"
                            fill="none"
                            stroke="url(#balloonString)"
                            strokeWidth="0.25"
                            vectorEffect="non-scaling-stroke"
                        />

                        <path
                            d="M82 27 Q74 60 50 96"
                            fill="none"
                            stroke="url(#balloonString)"
                            strokeWidth="0.25"
                            vectorEffect="non-scaling-stroke"
                        />

                        <circle
                            cx="50"
                            cy="96"
                            r="0.55"
                            fill="#e9e2ee"
                        />
                    </svg>

                    {/* BALLOONS */}
                    {balloonData.map((item) => (
                        <Balloon
                            key={item.id}
                            item={item}
                            popped={popped.includes(item.id)}
                            onPop={handlePop}
                        />
                    ))}

                    {/* HINT — ABOVE VIDEO */}
                    {popped.length < 4 && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute bottom-7 left-0 right-0 z-[60] px-2 text-center font-serif text-sm tracking-wide text-white/90 drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] sm:text-base"
                        >
                            Tap the balloons one by one 🎈
                        </motion.p>
                    )}

                    {/* COMPLETED HINT — ABOVE VIDEO */}
                    {popped.length === 4 && (
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-7 left-0 right-0 z-[60] text-center font-serif text-sm italic text-pink-100 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                        >
                            A little surprise for you! 💗
                        </motion.p>
                    )}
                </motion.div>

                {/* NEXT BUTTON — ALWAYS ABOVE VIDEO */}
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
                            exit={{
                                opacity: 0,
                                y: 10,
                            }}
                            transition={{
                                duration: 0.55,
                                delay: 0.5,
                            }}
                            className="relative z-[100] mt-7"
                        >
                            <Button
                                onClick={onNext}
                                className="justify-center border border-pink-300/20 bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-[0_8px_30px_rgba(255,80,170,0.3)]"
                            >
                                Next
                                <MoveRight size={18} />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* CELEBRATION */}
            <AnimatePresence>
                {celebration && <CelebrationConfetti />}
            </AnimatePresence>

            {/* SIGNATURE */}
            <div className="pointer-events-none fixed bottom-3 right-4 z-[300] text-sm text-white/50">
                @Rafee🫶protiva
            </div>
        </motion.div>
    )
}
