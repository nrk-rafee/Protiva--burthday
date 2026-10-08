"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Heart } from "lucide-react"
import Button from "../Button"

/* ======================================================
   TOP DECORATIONS
====================================================== */

const hangingDecorations = [
    { type: "moon", left: "5%", size: 70, length: 100, delay: 0 },
    { type: "star", left: "28%", size: 38, length: 85, delay: 0.5 },
    { type: "star", left: "52%", size: 34, length: 70, delay: 1 },
    { type: "star", left: "74%", size: 42, length: 95, delay: 0.3 },
    { type: "moon", left: "91%", size: 55, length: 80, delay: 1.2 },
]

function TopDecoration() {
    return (
        <div className="pointer-events-none fixed left-0 right-0 top-0 z-20 h-[190px] overflow-hidden">
            {hangingDecorations.map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute top-0 flex flex-col items-center"
                    style={{ left: item.left }}
                    animate={{
                        rotate: [-3, 3, -3],
                    }}
                    transition={{
                        duration: 4 + index * 0.3,
                        delay: item.delay,
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
                            animate={{
                                scale: [1, 1.08, 1],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                            }}
                            style={{
                                fontSize: item.size,
                                lineHeight: 1,
                                color: "#e7ad59",
                                textShadow:
                                    "0 0 20px rgba(231,173,89,0.4)",
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
                            }}
                        >
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#ffd98a,#d99238)",
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
                    style={{
                        left: `${7 + index * 16}%`,
                    }}
                    animate={{
                        y: [0, -8, 0],
                        rotate: [-3, 3, -3],
                    }}
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
                            background: `linear-gradient(
                                145deg,
                                ${color},
                                rgba(0,0,0,0.55)
                            )`,
                            boxShadow:
                                "inset -10px -12px 20px rgba(0,0,0,0.2)",
                        }}
                    >
                        <div className="absolute left-[16px] top-[12px] h-5 w-3 rotate-[-25deg] rounded-full bg-white/40 blur-[2px]" />

                        <div
                            className="absolute left-1/2 top-full h-24 w-px -translate-x-1/2 bg-white/20"
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

/* ======================================================
   BACKGROUND FIREWORKS
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
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {backgroundFireworks.map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    style={{
                        left: item.left,
                        top: item.top,
                    }}
                >
                    <motion.div
                        className="h-2 w-2 rounded-full"
                        style={{
                            background: item.color,
                            boxShadow: `0 0 25px 8px ${item.color}`,
                        }}
                        animate={{
                            scale: [0, 1.8, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            delay: item.delay,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                    />

                    {Array.from({ length: 12 }).map((_, ray) => {
                        const angle = (360 / 12) * ray

                        return (
                            <motion.span
                                key={ray}
                                className="absolute left-1/2 top-1/2 h-8 w-[2px] origin-bottom rounded-full"
                                style={{
                                    background: item.color,
                                    boxShadow: `0 0 7px ${item.color}`,
                                    transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                                }}
                                animate={{
                                    scaleY: [0, 1, 0],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 1.4,
                                    delay: item.delay,
                                    repeat: Infinity,
                                    repeatDelay: 3,
                                }}
                            />
                        )
                    })}
                </motion.div>
            ))}
        </div>
    )
}

/* ======================================================
   LETTER DATA
====================================================== */

const words = ["HAPPY", "BIRTHDAY", "CUTIE"]

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
    "#ff8fab",
    "#ff6fae",
    "#8be9fd",
    "#ffd166",
    "#ff9de2",
    "#c7a0ff",
    "#ff6fae",
]

function createLetters() {
    let counter = 0

    return words.map((word, wordIndex) =>
        [...word].map((letter, letterIndex) => {
            const current = {
                id: `${wordIndex}-${letterIndex}`,
                letter,
                wordIndex,
                letterIndex,
                index: counter,
                color: letterColors[counter % letterColors.length],
            }

            counter++
            return current
        })
    )
}

/* ======================================================
   FIREWORK SPARK
====================================================== */

function FireworkBurst({ color }) {
    return (
        <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2"
            initial={{
                scale: 0,
                opacity: 1,
            }}
            animate={{
                scale: [0, 1, 1.7, 0],
                opacity: [1, 1, 0.7, 0],
            }}
            transition={{
                duration: 0.75,
                ease: "easeOut",
            }}
        >
            {Array.from({ length: 18 }).map((_, index) => {
                const angle = (360 / 18) * index
                const radians = (angle * Math.PI) / 180

                const distance = 30 + (index % 4) * 10

                const x = Math.cos(radians) * distance
                const y = Math.sin(radians) * distance

                return (
                    <motion.span
                        key={index}
                        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                        style={{
                            background: color,
                            boxShadow: `0 0 10px ${color}`,
                        }}
                        initial={{
                            x: 0,
                            y: 0,
                            opacity: 1,
                            scale: 1,
                        }}
                        animate={{
                            x,
                            y,
                            opacity: 0,
                            scale: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            ease: "easeOut",
                        }}
                    />
                )
            })}

            {/* Bright center */}
            <motion.div
                className="h-3 w-3 rounded-full"
                style={{
                    background: "#fff",
                    boxShadow: `
                        0 0 8px #fff,
                        0 0 20px ${color},
                        0 0 35px ${color}
                    `,
                }}
                animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 0.65,
                }}
            />
        </motion.div>
    )
}

/* ======================================================
   ONE LETTER
====================================================== */

function FireworkLetter({
    item,
    visible,
    balloonPhase,
}) {
    const wordLengths = {
        0: 5,
        1: 8,
        2: 4,
    }

    const wordPositions = {
        0: "13%",
        1: "47%",
        2: "81%",
    }

    const wordLength = wordLengths[item.wordIndex]

    /*
      Mobile-friendly spacing.
      The width is smaller on phones so
      the letters don't go outside the screen.
    */
    const spacing =
        item.wordIndex === 1
            ? 30
            : 36

    const offset =
        (item.letterIndex - (wordLength - 1) / 2) *
        spacing

    const topPosition = wordPositions[item.wordIndex]

    return (
        <div
            className="absolute"
            style={{
                top: topPosition,
                left: `calc(50% + ${offset}px)`,
                transform: "translate(-50%, -50%)",
            }}
        >
            {/* ==================================================
                ROCKET / RISING SPARK
            ================================================== */}

            {visible && (
                <motion.div
                    className="pointer-events-none absolute left-1/2 top-1/2 z-20"
                    initial={{
                        y: 250,
                        opacity: 0,
                    }}
                    animate={{
                        y: [250, 120, 0],
                        opacity: [0, 1, 1],
                    }}
                    transition={{
                        duration: 0.65,
                        ease: "easeOut",
                    }}
                >
                    <motion.div
                        className="rounded-full"
                        style={{
                            width: 7,
                            height: 7,
                            background: item.color,
                            boxShadow: `
                                0 0 8px ${item.color},
                                0 0 20px ${item.color},
                                0 0 35px ${item.color}
                            `,
                        }}
                    />

                    {/* Rocket trail */}
                    <motion.div
                        className="absolute left-1/2 top-2 -translate-x-1/2"
                        style={{
                            width: 2,
                            height: 55,
                            background: `linear-gradient(
                                to bottom,
                                ${item.color},
                                transparent
                            )`,
                        }}
                    />
                </motion.div>
            )}

            {/* ==================================================
                EXPLOSION
            ================================================== */}

            {visible && (
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-30">
                    <FireworkBurst color={item.color} />
                </div>
            )}

            {/* ==================================================
                LETTER
            ================================================== */}

            <AnimatePresence>
                {visible && (
                    <motion.div
                        className="relative z-40"
                        initial={{
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={
                            balloonPhase
                                ? {
                                      opacity: 0,
                                      y: -330,
                                      scale: 0.7,
                                  }
                                : {
                                      opacity: 1,
                                      scale: [
                                          0,
                                          1.35,
                                          0.9,
                                          1,
                                      ],
                                  }
                        }
                        transition={
                            balloonPhase
                                ? {
                                      duration: 1.8,
                                      delay:
                                          item.index * 0.13,
                                      ease: "easeInOut",
                                  }
                                : {
                                      duration: 0.55,
                                      delay: 0.6,
                                      ease: "backOut",
                                  }
                        }
                    >
                        {/* ==================================================
                            BALLOON
                        ================================================== */}

                        {balloonPhase && (
                            <motion.div
                                className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2"
                                initial={{
                                    opacity: 0,
                                    scale: 0.2,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: [0, 1, 1, 0],
                                    scale: [0.2, 1, 1, 0.8],
                                    y: [20, 0, -20, -60],
                                }}
                                transition={{
                                    duration: 1.8,
                                    delay:
                                        item.index * 0.13,
                                    ease: "easeInOut",
                                }}
                            >
                                <div
                                    className="relative h-12 w-10 rounded-[50%]"
                                    style={{
                                        background: `
                                            radial-gradient(
                                                circle at 30% 22%,
                                                rgba(255,255,255,0.95),
                                                transparent 17%
                                            ),
                                            linear-gradient(
                                                145deg,
                                                ${item.color},
                                                rgba(90,30,140,0.95)
                                            )
                                        `,
                                        boxShadow: `
                                            0 0 12px ${item.color},
                                            0 0 25px ${item.color}
                                        `,
                                    }}
                                >
                                    {/* Balloon knot */}
                                    <div
                                        className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2"
                                        style={{
                                            background:
                                                item.color,
                                            clipPath:
                                                "polygon(0 0,100% 0,50% 100%)",
                                        }}
                                    />

                                    {/* Balloon string */}
                                    <div
                                        className="absolute left-1/2 top-full h-28 w-px -translate-x-1/2 bg-white/50"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Letter */}
                        <span
                            className="
                                block
                                text-3xl
                                font-black
                                uppercase
                                md:text-4xl
                            "
                            style={{
                                color: item.color,
                                textShadow: `
                                    0 0 8px ${item.color},
                                    0 0 18px ${item.color},
                                    0 0 32px ${item.color}
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

function BirthdayFireworkShow({ onFinished }) {
    const [visibleCount, setVisibleCount] =
        useState(0)

    const [balloonPhase, setBalloonPhase] =
        useState(false)

    const letters = useMemo(
        () => createLetters().flat(),
        []
    )

    useEffect(() => {
        const timers = []

        /*
          First letter appears after 1 second.
          Then each next letter every 650ms.
        */
        letters.forEach((_, index) => {
            const timer = setTimeout(
                () => {
                    setVisibleCount(index + 1)
                },
                1000 + index * 650
            )

            timers.push(timer)
        })

        /*
          Last letter timing
          + 1.5 seconds waiting time
        */
        const balloonTimer = setTimeout(
            () => {
                setBalloonPhase(true)
            },
            1000 +
                letters.length * 650 +
                1500
        )

        /*
          Balloons take about 3.5 seconds.
        */
        const finishTimer = setTimeout(
            () => {
                onFinished?.()
            },
            1000 +
                letters.length * 650 +
                1500 +
                3600
        )

        return () => {
            timers.forEach(clearTimeout)
            clearTimeout(balloonTimer)
            clearTimeout(finishTimer)
        }
    }, [letters, onFinished])

    return (
        <div className="absolute inset-x-0 bottom-0 top-[36%] z-10 overflow-hidden">
            {/* ==================================================
                SMALL STARS
            ================================================== */}

            {Array.from({ length: 40 }).map(
                (_, index) => (
                    <motion.span
                        key={index}
                        className="absolute h-[2px] w-[2px] rounded-full bg-white"
                        style={{
                            left: `${(index * 37) % 100}%`,
                            top: `${(index * 47) % 95}%`,
                        }}
                        animate={{
                            opacity: [
                                0.1,
                                0.8,
                                0.1,
                            ],
                            scale: [
                                0.6,
                                1.4,
                                0.6,
                            ],
                        }}
                        transition={{
                            duration:
                                2 +
                                (index % 4) *
                                    0.4,
                            delay:
                                (index % 6) * 0.2,
                            repeat: Infinity,
                        }}
                    />
                )
            )}

            {/* ==================================================
                LETTERS
            ================================================== */}

            {letters.map((item, index) => (
                <FireworkLetter
                    key={item.id}
                    item={item}
                    visible={
                        index < visibleCount
                    }
                    balloonPhase={
                        balloonPhase
                    }
                />
            ))}

            {/* ==================================================
                EXTRA RANDOM LAUNCH SPARKS
            ================================================== */}

            {!balloonPhase &&
                Array.from({ length: 14 }).map(
                    (_, index) => (
                        <motion.span
                            key={`launch-${index}`}
                            className="absolute bottom-0 h-1.5 w-1.5 rounded-full"
                            style={{
                                left: `${
                                    4 +
                                    (index * 17) %
                                        92
                                }%`,
                                background:
                                    index % 2 === 0
                                        ? "#ff6fae"
                                        : "#ffd166",
                                boxShadow:
                                    "0 0 10px rgba(255,255,255,0.8)",
                            }}
                            animate={{
                                y: [
                                    0,
                                    -90,
                                    -180,
                                    -250,
                                ],
                                opacity: [
                                    0,
                                    1,
                                    1,
                                    0,
                                ],
                            }}
                            transition={{
                                duration: 2.1,
                                delay:
                                    index * 0.25,
                                repeat: Infinity,
                                ease: "easeOut",
                            }}
                        />
                    )
                )}
        </div>
    )
}

/* ======================================================
   MAIN INTRO SCREEN
====================================================== */

export default function IntroScreen({ onNext }) {
    const [step, setStep] = useState(0)

    const [showStartButton, setShowStartButton] =
        useState(false)

    return (
        <AnimatePresence mode="wait">
            {/* ==================================================
                STEP 0
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
                    }}
                    className="fixed inset-0 overflow-hidden bg-[#070d2b]"
                >
                    <div className="absolute inset-0 bg-[#070d2b]" />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(90,90,180,0.22),transparent_55%)]" />

                    <TopDecoration />

                    <div className="relative z-20 flex min-h-screen w-full items-center justify-center px-4 py-8">
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
                            }}
                            className="
                                relative
                                mx-auto
                                w-full
                                max-w-[440px]
                                rounded-[48px]
                                border
                                border-white/15
                                bg-[#20264f]/95
                                p-6
                                shadow-[0_25px_70px_rgba(0,0,0,0.45)]
                                backdrop-blur-md
                                md:p-8
                            "
                        >
                            <div className="pointer-events-none absolute inset-0 rounded-[48px] bg-gradient-to-b from-white/[0.06] to-transparent" />

                            <div
                                className="
                                    relative
                                    z-10
                                    flex
                                    h-44
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
                                "
                            >
                                <motion.div
                                    className="text-7xl md:text-8xl"
                                    animate={{
                                        y: [0, -7, 0],
                                        rotate: [
                                            -2,
                                            2,
                                            -2,
                                        ],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                    }}
                                >
                                    🎁
                                </motion.div>
                            </div>

                            <div className="relative z-10 mt-8 text-center">
                                <h1 className="text-3xl font-semibold italic leading-tight text-pink-200 md:text-4xl">
                                    Something special
                                    <br />
                                    is waiting...
                                </h1>

                                <p className="mt-5 text-base text-[#c7cbe7] md:text-lg">
                                    Tap the button to open
                                    it ✨
                                </p>
                            </div>

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
                                    "
                                >
                                    <Gift size={21} />

                                    <span>
                                        Open It!
                                    </span>
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    <BottomBalloons />

                    <div className="fixed bottom-5 right-5 z-40 text-sm text-white/35">
                        @Rafee🫶protiva
                    </div>
                </motion.div>
            )}

            {/* ==================================================
                STEP 1 — FIREWORK BIRTHDAY SHOW
            ================================================== */}

            {step === 1 && (
                <motion.div
                    key="step1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.5,
                    }}
                    className="
                        fixed
                        inset-0
                        overflow-hidden
                        bg-[#03050f]
                    "
                >
                    {/* Night sky */}
                    <div className="absolute inset-0 bg-[#03050f]" />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(80,50,180,0.27),transparent_62%)]" />

                    <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(circle_at_50%_100%,rgba(255,70,180,0.15),transparent_65%)]" />

                    <BackgroundFireworks />

                    {/* ==================================================
                        BIRTHDAY CARD
                    ================================================== */}

                    <div className="absolute inset-x-0 top-[4%] z-30 flex justify-center px-4">
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
                                duration: 0.6,
                                ease: "easeOut",
                            }}
                            className="
                                relative
                                mx-auto
                                w-full
                                max-w-[420px]
                                rounded-[42px]
                                border
                                border-white/25
                                bg-white/[0.90]
                                p-5
                                shadow-[0_25px_80px_rgba(0,0,0,0.45)]
                                backdrop-blur-xl
                            "
                        >
                            <div className="pointer-events-none absolute inset-0 rounded-[42px] bg-gradient-to-b from-white/50 to-transparent" />

                            {/* Cake */}
                            <div
                                className="
                                    relative
                                    z-10
                                    flex
                                    h-[105px]
                                    w-full
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    rounded-[30px]
                                    bg-gradient-to-b
                                    from-pink-100
                                    to-pink-200
                                    shadow-inner
                                "
                            >
                                <motion.div
                                    className="text-6xl"
                                    animate={{
                                        y: [0, -5, 0],
                                        rotate: [
                                            -2,
                                            2,
                                            -2,
                                        ],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    🎂
                                </motion.div>
                            </div>

                            <div className="relative z-10 mt-5 text-center">
                                <h1
                                    className="
                                        text-2xl
                                        font-semibold
                                        leading-tight
                                        text-primary
                                        md:text-3xl
                                    "
                                >
                                    Happy Birthday,
                                    <br />
                                    Cutie ❤️
                                </h1>

                                <p className="mt-2 text-sm text-primary/65 md:text-base">
                                    Today is all about you ✨
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* ==================================================
                        LITTLE SURPRISE
                    ================================================== */}

                    <motion.div
                        className="
                            absolute
                            left-1/2
                            top-[29%]
                            z-30
                            -translate-x-1/2
                            whitespace-nowrap
                        "
                        initial={{
                            opacity: 0,
                            y: -10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 0.4,
                        }}
                    >
                        <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">
                            A little surprise
                        </p>
                    </motion.div>

                    {/* ==================================================
                        FIREWORK SHOW
                    ================================================== */}

                    <BirthdayFireworkShow
                        onFinished={() =>
                            setShowStartButton(true)
                        }
                    />

                    {/* ==================================================
                        START BUTTON
                    ================================================== */}

                    <AnimatePresence>
                        {showStartButton && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 35,
                                    scale: 0.9,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                transition={{
                                    duration: 0.6,
                                    ease: "backOut",
                                }}
                                className="
                                    fixed
                                    bottom-8
                                    left-1/2
                                    z-[500]
                                    -translate-x-1/2
                                    px-4
                                "
                            >
                                <Button
                                    onClick={() =>
                                        onNext?.()
                                    }
                                    className="
                                        min-w-[230px]
                                        justify-center
                                        bg-[#f1caeb]
                                        text-primary
                                        shadow-[0_10px_40px_rgba(255,120,210,0.35)]
                                    "
                                >
                                    <Heart size={20} />

                                    <span>
                                        Start the surprise
                                    </span>
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Signature */}
                    <div className="fixed bottom-4 right-4 z-[150] text-sm text-white/30">
                        @Rafee🫶protiva
                    </div>
                </motion.div>
            )}

            {/* ==================================================
                STEP 2 — CUTIEPIE SCREEN
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
                        fixed
                        inset-0
                        z-50
                        flex
                        min-h-screen
                        items-center
                        justify-center
                        overflow-y-auto
                        px-4
                        py-6
                        bg-[#070d2b]
                    "
                >
                    {/* Background */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,100,190,0.12),transparent_60%)]" />

                    {/* Centered card */}
                    <div
                        className="
                            relative
                            z-10
                            mx-auto
                            flex
                            w-full
                            max-w-[440px]
                            flex-col
                            items-center
                            gap-4
                            rounded-[60px]
                            bg-[#fff8fc]
                            p-7
                            drop-shadow-2xl
                        "
                    >
                        <div
                            className="
                                relative
                                flex
                                h-44
                                w-full
                                items-end
                                justify-center
                                overflow-hidden
                                rounded-[40px]
                                bg-gradient-to-b
                                from-white/80
                                to-pink-200
                                shadow-inner
                                md:h-52
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
                                    font-semibold
                                    leading-tight
                                    text-primary
                                    drop-shadow
                                    md:text-3xl
                                "
                            >
                                A Cutiepie was born today,
                                <br />
                                16 years ago!
                            </h1>

                            <p className="mt-4 text-foreground">
                                Yes, it’s YOU! A little
                                surprise awaits...
                            </p>
                        </div>

                        <div className="mt-4">
                            <Button
                                onClick={() =>
                                    onNext?.()
                                }
                                className="
                                    justify-center
                                    bg-[#f1caeb]
                                    text-primary
                                "
                            >
                                <Gift size={20} />

                                <span>
                                    Start the surprise
                                </span>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
