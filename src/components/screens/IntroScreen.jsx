"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Heart } from "lucide-react"
import Button from "../Button"

// ======================================================
// TOP HANGING DECORATIONS
// ======================================================

const hangingDecorations = [
    {
        type: "moon",
        left: "5%",
        size: 82,
        length: 125,
        delay: 0,
        duration: 4.5,
        rotate: -3,
    },
    {
        type: "star",
        left: "30%",
        size: 48,
        length: 105,
        delay: 0.7,
        duration: 4,
        rotate: 3,
    },
    {
        type: "star",
        left: "50%",
        size: 42,
        length: 75,
        delay: 1.2,
        duration: 4.8,
        rotate: -3,
    },
    {
        type: "star",
        left: "72%",
        size: 55,
        length: 120,
        delay: 0.4,
        duration: 4.3,
        rotate: 4,
    },
    {
        type: "moon",
        left: "91%",
        size: 65,
        length: 95,
        delay: 1.5,
        duration: 5,
        rotate: -4,
    },
]

// ======================================================
// BOTTOM BALLOONS
// ======================================================

const bottomBalloons = [
    {
        color1: "#e9a44f",
        color2: "#a96520",
        left: "7%",
        size: 105,
        delay: 0,
        duration: 5.5,
        rotate: -4,
    },
    {
        color1: "#27374d",
        color2: "#101b2c",
        left: "21%",
        size: 108,
        delay: 0.8,
        duration: 6.2,
        rotate: 4,
    },
    {
        color1: "#e9a44f",
        color2: "#a96520",
        left: "37%",
        size: 115,
        delay: 1.4,
        duration: 5.8,
        rotate: -3,
    },
    {
        color1: "#27374d",
        color2: "#101b2c",
        left: "54%",
        size: 105,
        delay: 0.5,
        duration: 6.4,
        rotate: 3,
    },
    {
        color1: "#e9a44f",
        color2: "#a96520",
        left: "69%",
        size: 110,
        delay: 1.1,
        duration: 5.7,
        rotate: -4,
    },
    {
        color1: "#27374d",
        color2: "#101b2c",
        left: "84%",
        size: 105,
        delay: 1.8,
        duration: 6,
        rotate: 4,
    },
]

// ======================================================
// HANGING STAR
// ======================================================

function HangingStar({ item }) {
    return (
        <motion.div
            className="absolute top-0 flex flex-col items-center"
            style={{
                left: item.left,
            }}
            initial={{
                rotate: item.rotate,
            }}
            animate={{
                rotate: [
                    item.rotate,
                    item.rotate + 5,
                    item.rotate - 5,
                    item.rotate + 3,
                    item.rotate,
                ],
            }}
            transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <div
                className="w-[2px] bg-[#d49b42]/50"
                style={{
                    height: item.length,
                }}
            />

            <motion.div
                animate={{
                    scale: [1, 1.05, 1, 1.04, 1],
                }}
                transition={{
                    duration: item.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    width: item.size,
                    height: item.size,
                    color: "#e7ad59",
                    fontSize: item.size,
                    lineHeight: 1,
                }}
            >
                ★
            </motion.div>
        </motion.div>
    )
}

// ======================================================
// HANGING MOON
// ======================================================

function HangingMoon({ item }) {
    return (
        <motion.div
            className="absolute top-0 flex flex-col items-center"
            style={{
                left: item.left,
            }}
            initial={{
                rotate: item.rotate,
            }}
            animate={{
                rotate: [
                    item.rotate,
                    item.rotate + 4,
                    item.rotate - 4,
                    item.rotate + 2,
                    item.rotate,
                ],
            }}
            transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <div
                className="w-[2px] bg-[#d49b42]/50"
                style={{
                    height: item.length,
                }}
            />

            <motion.div
                animate={{
                    y: [0, 3, 0, -2, 0],
                }}
                transition={{
                    duration: item.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="relative"
                style={{
                    width: item.size,
                    height: item.size,
                }}
            >
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background:
                            "linear-gradient(135deg, #ffd98a, #d99238)",
                        boxShadow:
                            "0 0 25px rgba(235,170,80,0.18)",
                    }}
                />

                <div
                    className="absolute rounded-full"
                    style={{
                        width: item.size * 0.82,
                        height: item.size * 0.82,
                        top: item.size * -0.08,
                        right: item.size * -0.10,
                        background: "#070d2b",
                    }}
                />
            </motion.div>
        </motion.div>
    )
}

// ======================================================
// TOP DECORATION
// ======================================================

function TopDecoration() {
    return (
        <div className="fixed top-0 left-0 right-0 h-[250px] md:h-[310px] pointer-events-none z-10 overflow-hidden">
            {hangingDecorations.map((item, index) => {
                if (item.type === "moon") {
                    return (
                        <HangingMoon
                            key={index}
                            item={item}
                        />
                    )
                }

                return (
                    <HangingStar
                        key={index}
                        item={item}
                    />
                )
            })}
        </div>
    )
}

// ======================================================
// BOTTOM BALLOONS
// ======================================================

function BottomBalloons() {
    return (
        <div className="fixed bottom-[-12px] left-0 right-0 h-[150px] md:h-[190px] pointer-events-none z-30 overflow-hidden">
            {bottomBalloons.map((balloon, index) => (
                <motion.div
                    key={index}
                    className="absolute bottom-[-28px]"
                    style={{
                        left: balloon.left,
                    }}
                    initial={{
                        y: 15,
                        rotate: balloon.rotate,
                    }}
                    animate={{
                        y: [
                            15,
                            -7,
                            4,
                            -5,
                            15,
                        ],
                        rotate: [
                            balloon.rotate,
                            balloon.rotate + 4,
                            balloon.rotate - 4,
                            balloon.rotate + 3,
                            balloon.rotate,
                        ],
                    }}
                    transition={{
                        duration: balloon.duration,
                        delay: balloon.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <motion.div
                        className="relative rounded-[50%]"
                        animate={{
                            scale: [
                                1,
                                1.025,
                                1,
                                1.02,
                                1,
                            ],
                        }}
                        transition={{
                            duration: balloon.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            width: balloon.size,
                            height: balloon.size * 1.15,
                            background: `radial-gradient(
                                circle at 30% 25%,
                                rgba(255,255,255,0.75),
                                transparent 14%
                            ),
                            linear-gradient(
                                145deg,
                                ${balloon.color1},
                                ${balloon.color2}
                            )`,
                            boxShadow:
                                "inset -12px -15px 25px rgba(0,0,0,0.18), 0 5px 15px rgba(0,0,0,0.12)",
                        }}
                    >
                        <div
                            className="absolute rounded-full bg-white/40 blur-[2px]"
                            style={{
                                width: balloon.size * 0.18,
                                height: balloon.size * 0.27,
                                left: balloon.size * 0.18,
                                top: balloon.size * 0.16,
                                transform: "rotate(-25deg)",
                            }}
                        />

                        <div
                            className="absolute left-1/2 -bottom-[7px] -translate-x-1/2"
                            style={{
                                width: 10,
                                height: 12,
                                background: balloon.color2,
                                clipPath:
                                    "polygon(0 0, 100% 0, 70% 100%, 30% 100%)",
                            }}
                        />

                        <div
                            className="absolute left-1/2 top-full"
                            style={{
                                width: "1px",
                                height: 35,
                                background:
                                    "rgba(180,180,180,0.28)",
                            }}
                        />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    )
}

// ======================================================
// FIREWORK DATA
// ======================================================

const fireworks = [
    {
        left: "10%",
        top: "20%",
        delay: 0,
        color: "#ff6fae",
        size: 1,
    },
    {
        left: "32%",
        top: "13%",
        delay: 1.2,
        color: "#ffd166",
        size: 0.85,
    },
    {
        left: "53%",
        top: "22%",
        delay: 2.2,
        color: "#8be9fd",
        size: 1.1,
    },
    {
        left: "78%",
        top: "17%",
        delay: 3.1,
        color: "#c7a0ff",
        size: 0.9,
    },
    {
        left: "22%",
        top: "43%",
        delay: 3.8,
        color: "#ff8fab",
        size: 0.8,
    },
    {
        left: "70%",
        top: "40%",
        delay: 4.8,
        color: "#fff0a6",
        size: 1,
    },
    {
        left: "45%",
        top: "55%",
        delay: 5.8,
        color: "#ff9de2",
        size: 0.75,
    },
    {
        left: "88%",
        top: "55%",
        delay: 6.7,
        color: "#8be9fd",
        size: 0.8,
    },
]

// ======================================================
// SINGLE FIREWORK
// ======================================================

function FireworkBurst({ item }) {
    const rays = Array.from({ length: 18 })
    const sparks = Array.from({ length: 14 })

    return (
        <div
            className="absolute"
            style={{
                left: item.left,
                top: item.top,
                width: 10,
                height: 10,
                transform: "translate(-50%, -50%)",
            }}
        >
            {/* Center glow */}
            <motion.div
                className="absolute left-1/2 top-1/2 rounded-full"
                style={{
                    width: 8,
                    height: 8,
                    backgroundColor: item.color,
                    boxShadow: `0 0 25px 8px ${item.color}`,
                    transform: "translate(-50%, -50%)",
                }}
                animate={{
                    scale: [0, 1.8, 0],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 1.45,
                    delay: item.delay,
                    repeat: Infinity,
                    repeatDelay: 2.2,
                    ease: "easeOut",
                }}
            />

            {/* Main rays */}
            {rays.map((_, index) => {
                const angle =
                    (360 / rays.length) * index

                return (
                    <motion.span
                        key={`ray-${index}`}
                        className="absolute left-1/2 top-1/2 origin-bottom rounded-full"
                        style={{
                            width: 2.5,
                            height: 42 * item.size,
                            backgroundColor: item.color,
                            boxShadow: `0 0 9px ${item.color}`,
                            rotate: angle,
                            translateX: "-50%",
                            translateY: "-100%",
                        }}
                        animate={{
                            scaleY: [0, 1.25, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 1.45,
                            delay: item.delay,
                            repeat: Infinity,
                            repeatDelay: 2.2,
                            ease: "easeOut",
                        }}
                    />
                )
            })}

            {/* Flying sparks */}
            {sparks.map((_, index) => {
                const angle =
                    (360 / sparks.length) * index

                const distance =
                    (48 + (index % 4) * 12) *
                    item.size

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
                        key={`spark-${index}`}
                        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                        style={{
                            backgroundColor: item.color,
                            boxShadow:
                                `0 0 10px ${item.color}`,
                        }}
                        animate={{
                            x: [0, x],
                            y: [0, y],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 1.45,
                            delay: item.delay,
                            repeat: Infinity,
                            repeatDelay: 2.2,
                            ease: "easeOut",
                        }}
                    />
                )
            })}
        </div>
    )
}

// ======================================================
// FIREWORKS BACKGROUND
// ======================================================

function FireworksBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#050817]">
            {/* Main night sky */}
            <div className="absolute inset-0 bg-[#050817]" />

            {/* Purple / pink atmospheric glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(120,70,210,0.28),transparent_62%)]" />

            {/* Bottom glow */}
            <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[radial-gradient(circle_at_50%_100%,rgba(255,80,180,0.14),transparent_65%)]" />

            {/* Stars */}
            {Array.from({ length: 45 }).map((_, index) => (
                <motion.span
                    key={`star-${index}`}
                    className="absolute h-1 w-1 rounded-full bg-white"
                    style={{
                        left: `${(index * 37) % 100}%`,
                        top: `${(index * 19) % 78}%`,
                    }}
                    animate={{
                        opacity: [
                            0.15,
                            0.9,
                            0.2,
                        ],
                        scale: [
                            0.6,
                            1.3,
                            0.6,
                        ],
                    }}
                    transition={{
                        duration:
                            2.2 + (index % 4) * 0.5,
                        delay:
                            (index % 8) * 0.25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Fireworks */}
            {fireworks.map((item, index) => (
                <FireworkBurst
                    key={index}
                    item={item}
                />
            ))}

            {/* Soft vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_35%,rgba(0,0,0,0.42)_100%)]" />
        </div>
    )
}

// ======================================================
// MAIN INTRO SCREEN
// ======================================================

export default function IntroScreen({ onNext }) {
    const [step, setStep] = useState(0)

    return (
        <AnimatePresence mode="wait">

            {/* ==================================================
                STEP 0 — SOMETHING SPECIAL
            ================================================== */}

            {step === 0 && (
                <motion.div
                    key="step0"
                    initial={{
                        opacity: 0,
                        scale: 0.985,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 1.015,
                    }}
                    transition={{
                        duration: 0.4,
                        ease: "easeOut",
                    }}
                    className="fixed inset-0 overflow-hidden bg-[#070d2b]"
                >
                    {/* Background */}
                    <div className="absolute inset-0 bg-[#070d2b]" />

                    {/* Subtle grid */}
                    <div
                        className="absolute inset-0 opacity-[0.13]"
                        style={{
                            backgroundImage: `
                                linear-gradient(
                                    rgba(255,255,255,0.18) 1px,
                                    transparent 1px
                                ),
                                linear-gradient(
                                    90deg,
                                    rgba(255,255,255,0.18) 1px,
                                    transparent 1px
                                )
                            `,
                            backgroundSize: "72px 72px",
                        }}
                    />

                    {/* Soft center glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(90,90,180,0.22),transparent_55%)]" />

                    {/* Top decorations */}
                    <TopDecoration />

                    {/* Main content */}
                    <div className="relative z-20 flex min-h-screen items-center justify-center px-4 py-8">

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 18,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.45,
                                delay: 0,
                                ease: "easeOut",
                            }}
                            className="
                                relative
                                w-full
                                max-w-[440px]
                                rounded-[48px]
                                border
                                border-white/15
                                bg-[#20264f]/95
                                p-6
                                md:p-8
                                shadow-[0_25px_70px_rgba(0,0,0,0.45)]
                                backdrop-blur-md
                            "
                        >
                            {/* Inner glow */}
                            <div className="pointer-events-none absolute inset-0 rounded-[48px] bg-gradient-to-b from-white/[0.06] to-transparent" />

                            {/* Gift */}
                            <div
                                className="
                                    relative
                                    z-10
                                    flex
                                    h-44
                                    md:h-52
                                    w-full
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    rounded-[38px]
                                    border
                                    border-white/10
                                    bg-gradient-to-b
                                    from-[#77758e]
                                    to-[#66657d]
                                    shadow-inner
                                "
                            >
                                <motion.div
                                    className="absolute h-32 w-32 rounded-full bg-pink-400/20 blur-3xl"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [
                                            0.4,
                                            0.7,
                                            0.4,
                                        ],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />

                                <motion.div
                                    className="relative z-10 text-7xl md:text-8xl"
                                    animate={{
                                        y: [0, -7, 0],
                                        rotate: [-2, 2, -2],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    🎁
                                </motion.div>
                            </div>

                            {/* Title */}
                            <div className="relative z-10 mt-8 text-center">
                                <motion.h1
                                    animate={{
                                        opacity: [
                                            0.9,
                                            1,
                                            0.9,
                                        ],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="
                                        text-3xl
                                        md:text-4xl
                                        font-semibold
                                        italic
                                        leading-tight
                                        text-pink-200
                                    "
                                    style={{
                                        textShadow:
                                            "0 0 25px rgba(255,150,210,0.18)",
                                    }}
                                >
                                    Something special
                                    <br />
                                    is waiting...
                                </motion.h1>

                                <p className="mt-5 text-base md:text-lg text-[#c7cbe7]">
                                    Tap the button to open it ✨
                                </p>
                            </div>

                            {/* Open button */}
                            <div className="relative z-10 mt-8 flex justify-center">
                                <Button
                                    onClick={() =>
                                        setStep(1)
                                    }
                                    className="
                                        w-full
                                        max-w-[320px]
                                        justify-center
                                        bg-gradient-to-r
                                        from-pink-500
                                        to-fuchsia-500
                                        text-white
                                        shadow-[0_8px_30px_rgba(255,20,147,0.25)]
                                        hover:scale-[1.02]
                                    "
                                >
                                    <Gift size={21} />
                                    <span>Open It!</span>
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom balloons */}
                    <BottomBalloons />

                    {/* ONE signature only */}
                    <div className="fixed bottom-5 right-5 z-40 text-sm text-white/35">
                        @Rafee🫶protiva
                    </div>
                </motion.div>
            )}

            {/* ==================================================
                STEP 1 — HAPPY BIRTHDAY + FIREWORKS
            ================================================== */}

            {step === 1 && (
                <motion.div
                    key="step1"
                    initial={{
                        opacity: 0,
                        scale: 0.97,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 1.03,
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                    className="
                        fixed
                        inset-0
                        flex
                        items-center
                        justify-center
                        overflow-hidden
                        bg-[#050817]
                        px-4
                        py-8
                    "
                >
                    {/* Fireworks */}
                    <FireworksBackground />

                    {/* Birthday card */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.55,
                            delay: 0.05,
                            ease: "easeOut",
                        }}
                        className="
                            relative
                            z-20
                            flex
                            w-full
                            max-w-[420px]
                            flex-col
                            items-center
                            gap-5
                            rounded-[42px]
                            border
                            border-white/25
                            bg-white/[0.88]
                            p-6
                            shadow-[0_25px_80px_rgba(0,0,0,0.5)]
                            backdrop-blur-md
                            md:p-8
                        "
                    >
                        {/* Cake area */}
                        <div
                            className="
                                relative
                                flex
                                h-48
                                w-full
                                items-center
                                justify-center
                                overflow-hidden
                                rounded-[32px]
                                border
                                border-pink-200/60
                                bg-gradient-to-b
                                from-white
                                to-pink-100
                                shadow-inner
                            "
                        >
                            {/* Cake glow */}
                            <motion.div
                                className="
                                    absolute
                                    h-32
                                    w-32
                                    rounded-full
                                    bg-pink-300/40
                                    blur-3xl
                                "
                                animate={{
                                    scale: [
                                        1,
                                        1.25,
                                        1,
                                    ],
                                    opacity: [
                                        0.35,
                                        0.7,
                                        0.35,
                                    ],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Birthday cake GIF */}
                            <motion.img
                                src="/gifs/birthday cake 1.webp"
                                alt="Birthday Cake"
                                className="
                                    relative
                                    z-10
                                    h-40
                                    w-40
                                    object-contain
                                    md:h-44
                                    md:w-44
                                "
                                animate={{
                                    y: [0, -7, 0],
                                    rotate: [
                                        -1.5,
                                        1.5,
                                        -1.5,
                                    ],
                                    scale: [
                                        1,
                                        1.035,
                                        1,
                                    ],
                                }}
                                transition={{
                                    duration: 2.8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Sparkle */}
                            <motion.span
                                className="
                                    absolute
                                    left-7
                                    top-7
                                    z-10
                                    text-2xl
                                "
                                animate={{
                                    y: [0, -7, 0],
                                    opacity: [
                                        0.4,
                                        1,
                                        0.4,
                                    ],
                                    scale: [
                                        0.9,
                                        1.1,
                                        0.9,
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                ✨
                            </motion.span>

                            {/* Heart */}
                            <motion.span
                                className="
                                    absolute
                                    bottom-7
                                    right-7
                                    z-10
                                    text-2xl
                                "
                                animate={{
                                    y: [0, -8, 0],
                                    opacity: [
                                        0.4,
                                        1,
                                        0.4,
                                    ],
                                    scale: [
                                        0.9,
                                        1.1,
                                        0.9,
                                    ],
                                }}
                                transition={{
                                    duration: 2.4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                💖
                            </motion.span>
                        </div>

                        {/* Birthday title */}
                        <div className="text-center">
                            <motion.h1
                                className="
                                    text-3xl
                                    font-bold
                                    leading-tight
                                    text-pink-600
                                    md:text-4xl
                                "
                                animate={{
                                    textShadow: [
                                        "0 0 8px rgba(255,100,180,0.12)",
                                        "0 0 25px rgba(255,100,180,0.45)",
                                        "0 0 8px rgba(255,100,180,0.12)",
                                    ],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                Happy Birthday,
                                <br />
                                Cutie ❤️
                            </motion.h1>

                            <p className="mt-4 text-foreground">
                                Today is all about you ✨
                            </p>
                        </div>

                        {/* Continue */}
                        <div className="mt-2 flex w-full justify-center">
                            <Button
                                onClick={() =>
                                    setStep(2)
                                }
                                className="
                                    justify-center
                                    bg-[#f1caeb]
                                    text-primary
                                "
                            >
                                <Heart size={20} />
                                <span>Let's explore</span>
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* ==================================================
                STEP 2 — CUTIEPIE
            ================================================== */}

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
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                    className="
                        bg-[#fff8fc]
                        p-7
                        rounded-[60px]
                        drop-shadow-2xl
                        min-w-48
                        w-full
                        max-w-110
                        relative
                        flex
                        flex-col
                        items-center
                        gap-4
                    "
                >
                    <div
                        className="
                            relative
                            h-44
                            md:h-52
                            bg-linear-to-b
                            from-white/80
                            to-pink-200
                            w-full
                            rounded-[40px]
                            flex
                            items-end
                            justify-center
                            shadow-inner
                            overflow-hidden
                        "
                    >
                        <img
                            loading="lazy"
                            src="/gifs/intro.gif"
                            alt="Cute"
                            className="w-26 md:w-32"
                        />
                    </div>

                    <div className="text-center">
                        <h1
                            className="
                                text-2xl
                                md:text-3xl
                                font-semibold
                                text-primary
                                drop-shadow
                                leading-tight
                            "
                        >
                            A Cutiepie was born today,
                            <br />
                            16 years ago!
                        </h1>

                        <p className="mt-4 text-foreground">
                            Yes, it’s YOU! A little surprise awaits...
                        </p>
                    </div>

                    <div className="mt-4">
                        <Button
                            onClick={() => {
                                onNext?.()
                            }}
                            className="
                                justify-center
                                bg-[#f1caeb]
                                text-primary
                            "
                        >
                            <Gift size={20} />
                            <span>Start the surprise</span>
                        </Button>
                    </div>
                </motion.div>
            )}

        </AnimatePresence>
    )
}
