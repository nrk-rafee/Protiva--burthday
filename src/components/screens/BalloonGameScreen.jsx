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
        color1: "#ff8fb8",
        color2: "#e93478",
        left: "8%",
        top: "16%",
        rotate: -5,
        delay: 0,
    },
    {
        id: 2,
        word: "my",
        color1: "#ffd1df",
        color2: "#f28cae",
        left: "32%",
        top: "21%",
        rotate: 4,
        delay: 0.25,
    },
    {
        id: 3,
        word: "future",
        color1: "#ffb6bd",
        color2: "#ef6f7c",
        left: "56%",
        top: "19%",
        rotate: -4,
        delay: 0.5,
    },
    {
        id: 4,
        word: "wife 🫶",
        color1: "#d8a0ff",
        color2: "#a950df",
        left: "80%",
        top: "15%",
        rotate: 5,
        delay: 0.75,
    },
]

// ======================================================
// CONFETTI DATA
// ======================================================

const confettiColors = [
    "#ff8fab",
    "#ffd166",
    "#c084fc",
    "#8be9fd",
    "#ffb3c6",
    "#ffffff",
]

// ======================================================
// BACKGROUND
// ======================================================

function BalloonBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Main background */}
            <div className="absolute inset-0 bg-[#fff9fc]" />

            {/* Soft pink glow */}
            <div
                className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_50%_35%,rgba(255,190,215,0.42),transparent_58%)]
                "
            />

            {/* Top soft glow */}
            <div
                className="
                    absolute
                    top-0
                    left-0
                    right-0
                    h-72
                    bg-gradient-to-b
                    from-pink-100/70
                    to-transparent
                "
            />

            {/* Decorative stars */}
            <motion.div
                className="absolute left-8 top-28 text-5xl text-pink-200"
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [-5, 5, -5],
                    opacity: [0.4, 0.75, 0.4],
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
                className="absolute right-8 top-40 text-4xl text-purple-200"
                animate={{
                    scale: [1, 1.12, 1],
                    rotate: [5, -5, 5],
                    opacity: [0.35, 0.7, 0.35],
                }}
                transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                ✦
            </motion.div>

            <div className="absolute left-[-25px] bottom-28 text-7xl text-pink-100">
                ★
            </div>

            <div className="absolute right-[-20px] bottom-24 text-7xl text-pink-100">
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
        "#ff8fab",
        "#ffb3c6",
        "#ffd166",
        "#c084fc",
        "#8be9fd",
        "#ff8fab",
        "#ffb3c6",
        "#ffd166",
        "#c084fc",
        "#ff8fab",
    ]

    return (
        <div className="fixed left-0 right-0 top-0 z-10 pointer-events-none">
            {/* Curved rope */}
            <svg
                className="h-28 w-full"
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
            >
                <path
                    d="M0 8 Q100 75 200 8 Q300 75 400 8"
                    fill="none"
                    stroke="#f09bb8"
                    strokeWidth="2"
                />

                {colors.map((color, index) => {
                    const x = index * 40 + 4
                    const y =
                        index < 5
                            ? 20 + index * 9
                            : 56 - (index - 5) * 9

                    return (
                        <path
                            key={index}
                            d={`M${x} ${y} L${x + 17} ${y} L${x + 8.5} ${y + 30} Z`}
                            fill={color}
                        />
                    )
                })}
            </svg>
        </div>
    )
}

// ======================================================
// CONFETTI
// ======================================================

function CelebrationConfetti() {
    const pieces = Array.from({ length: 85 })

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
            {pieces.map((_, index) => {
                const left =
                    (index * 47 + 7) % 100

                const rotation =
                    (index * 37) % 360

                const size =
                    5 + (index % 5)

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
                                window.innerHeight * 0.35,
                                window.innerHeight + 100,
                            ],
                            x: [
                                0,
                                (index % 2 === 0 ? 1 : -1) *
                                    (20 + (index % 5) * 12),
                                (index % 2 === 0 ? -1 : 1) *
                                    (30 + (index % 4) * 14),
                            ],
                            rotate: [
                                rotation,
                                rotation + 180,
                                rotation + 420,
                            ],
                            opacity: [
                                0,
                                1,
                                1,
                                0,
                            ],
                        }}
                        transition={{
                            duration:
                                3.5 + (index % 5) * 0.35,
                            delay:
                                (index % 18) * 0.04,
                            ease: "easeOut",
                        }}
                    />
                )
            })}
        </div>
    )
}

// ======================================================
// POP PARTICLES
// ======================================================

function PopParticles({ color1, color2 }) {
    const particles = Array.from({ length: 18 })

    return (
        <div className="absolute inset-0 pointer-events-none z-30">
            {particles.map((_, index) => {
                const angle =
                    (360 / particles.length) * index

                const distance =
                    35 + (index % 5) * 10

                const x =
                    Math.cos(
                        (angle * Math.PI) / 180
                    ) * distance

                const y =
                    Math.sin(
                        (angle * Math.PI) / 180
                    ) * distance

                return (
                    <motion.span
                        key={index}
                        className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
                        style={{
                            backgroundColor:
                                index % 2 === 0
                                    ? color1
                                    : color2,
                            boxShadow: `0 0 8px ${
                                index % 2 === 0
                                    ? color1
                                    : color2
                            }`,
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
                            scale: [0, 1.4, 0],
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

function Balloon({
    item,
    popped,
    onPop,
}) {
    if (popped) {
        return (
            <div
                className="absolute"
                style={{
                    left: item.left,
                    top: item.top,
                    width: 75,
                    height: 170,
                    transform: "translateX(-50%)",
                }}
            >
                <PopParticles
                    color1={item.color1}
                    color2={item.color2}
                />
            </div>
        )
    }

    return (
        <motion.div
            className="absolute z-20"
            style={{
                left: item.left,
                top: item.top,
                width: 78,
                height: 180,
                transform: "translateX(-50%)",
            }}
            initial={{
                opacity: 0,
                y: 25,
                scale: 0.75,
            }}
            animate={{
                opacity: 1,
                y: [25, 0, -5, 0],
                scale: 1,
                rotate: [
                    item.rotate,
                    item.rotate + 3,
                    item.rotate - 3,
                    item.rotate,
                ],
            }}
            transition={{
                opacity: {
                    duration: 0.5,
                    delay: item.delay,
                },
                y: {
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item.delay,
                },
                rotate: {
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item.delay,
                },
                scale: {
                    duration: 0.5,
                    delay: item.delay,
                },
            }}
        >
            {/* Balloon */}
            <motion.button
                type="button"
                onClick={() => onPop(item.id)}
                aria-label={`Pop balloon ${item.id}`}
                className="
                    absolute
                    left-1/2
                    top-0
                    -translate-x-1/2
                    cursor-pointer
                    touch-manipulation
                    focus:outline-none
                "
                whileTap={{
                    scale: 0.9,
                }}
            >
                <div
                    className="relative rounded-[50%]"
                    style={{
                        width: 74,
                        height: 88,
                        background: `
                            radial-gradient(
                                circle at 28% 20%,
                                rgba(255,255,255,0.72),
                                transparent 16%
                            ),
                            linear-gradient(
                                145deg,
                                ${item.color1},
                                ${item.color2}
                            )
                        `,
                        boxShadow: `
                            inset -12px -15px 22px rgba(0,0,0,0.12),
                            0 12px 24px rgba(80,40,80,0.15)
                        `,
                    }}
                >
                    {/* Shine */}
                    <div
                        className="
                            absolute
                            left-[18px]
                            top-[14px]
                            h-7
                            w-4
                            rotate-[-25deg]
                            rounded-full
                            bg-white/45
                            blur-[1px]
                        "
                    />

                    {/* Knot */}
                    <div
                        className="absolute left-1/2 -bottom-[7px] -translate-x-1/2"
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

            {/* String */}
            <motion.div
                className="
                    absolute
                    left-1/2
                    top-[88px]
                    h-[90px]
                    w-[1.5px]
                    origin-top
                    bg-gray-400/70
                "
                animate={{
                    rotate: [
                        -3,
                        3,
                        -3,
                    ],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Hidden/revealed word */}
            <AnimatePresence>
                {popped && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 10,
                            scale: 0.7,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.45,
                        }}
                        className="
                            absolute
                            left-1/2
                            top-[188px]
                            -translate-x-1/2
                            whitespace-nowrap
                            text-center
                            text-xl
                            font-semibold
                            text-[#963d75]
                        "
                    >
                        {item.word}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ======================================================
// MAIN BALLOON GAME
// ======================================================

export default function BalloonGameScreen({ onNext }) {
    const [popped, setPopped] = useState([])
    const [celebration, setCelebration] = useState(false)

    const handlePop = (id) => {
        if (popped.includes(id)) return

        setPopped((previous) => [
            ...previous,
            id,
        ])
    }

    useEffect(() => {
        if (popped.length === 4) {
            const timer = setTimeout(() => {
                setCelebration(true)
            }, 250)

            return () => clearTimeout(timer)
        }
    }, [popped])

    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            className="
                fixed
                inset-0
                overflow-hidden
                bg-[#fff9fc]
            "
        >
            <BalloonBackground />
            <TopBunting />

            {/* Main content */}
            <div
                className="
                    relative
                    z-30
                    flex
                    min-h-screen
                    w-full
                    flex-col
                    items-center
                    px-4
                    pt-28
                    pb-20
                "
            >
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
                    className="
                        text-center
                        text-2xl
                        md:text-3xl
                        font-semibold
                        text-[#963d52]
                    "
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
                        rounded-[48px]
                        border
                        border-white
                        bg-white/80
                        shadow-[0_15px_55px_rgba(120,70,100,0.16)]
                        backdrop-blur-sm
                    "
                >
                    {/* Soft inner glow */}
                    <div className="absolute inset-0 rounded-[48px] bg-gradient-to-b from-white/70 via-transparent to-pink-50/60" />

                    {/* Balloon game area */}
                    <div className="absolute inset-x-0 top-0 h-[430px]">
                        {balloonData.map((item) => (
                            <Balloon
                                key={item.id}
                                item={item}
                                popped={popped.includes(item.id)}
                                onPop={handlePop}
                            />
                        ))}
                    </div>

                    {/* Words appear here based on balloon position */}
                    {balloonData.map((item) => {
                        if (!popped.includes(item.id)) {
                            return null
                        }

                        return (
                            <motion.div
                                key={`word-${item.id}`}
                                initial={{
                                    opacity: 0,
                                    y: 8,
                                    scale: 0.8,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                className="absolute z-40"
                                style={{
                                    left: item.left,
                                    top:
                                        "calc(" +
                                        item.top +
                                        " + 188px)",
                                    transform:
                                        "translateX(-50%)",
                                }}
                            >
                                <span className="
                                    whitespace-nowrap
                                    text-xl
                                    font-semibold
                                    text-[#963d75]
                                ">
                                    {item.word}
                                </span>
                            </motion.div>
                        )
                    })}

                    {/* Strings stay visible */}
                    {balloonData.map((item) => (
                        <div
                            key={`string-${item.id}`}
                            className="absolute z-10"
                            style={{
                                left: item.left,
                                top:
                                    "calc(" +
                                    item.top +
                                    " + 88px)",
                                height: 300,
                            }}
                        >
                            <div
                                className="
                                    h-full
                                    w-[1.5px]
                                    bg-gray-400/55
                                "
                            />
                        </div>
                    ))}

                    {/* Bottom hint */}
                    {popped.length < 4 && (
                        <motion.p
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            className="
                                absolute
                                bottom-7
                                left-0
                                right-0
                                text-center
                                text-sm
                                text-gray-400
                            "
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
                            }}
                            className="relative z-[120] mt-7"
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

            {/* Final celebration */}
            <AnimatePresence>
                {celebration && (
                    <CelebrationConfetti />
                )}
            </AnimatePresence>

            {/* Signature */}
            <div className="
                fixed
                bottom-3
                right-4
                z-[150]
                text-sm
                text-gray-400/70
                pointer-events-none
            ">
                @Rafee🫶protiva
            </div>
        </motion.div>
    )
}
