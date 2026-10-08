"use client"

import { useEffect, useMemo, useState } from "react"
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
// BOTTOM BALLOONS FOR STEP 0
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
            style={{ left: item.left }}
            initial={{ rotate: item.rotate }}
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
                style={{ height: item.length }}
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
            style={{ left: item.left }}
            initial={{ rotate: item.rotate }}
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
                style={{ height: item.length }}
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
                        right: item.size * -0.1,
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
// FIREWORK COLORS
// ======================================================

const fireworkColors = [
    "#ff4fa3",
    "#ffd166",
    "#65e7ff",
    "#a98cff",
    "#7dff7a",
    "#ff7b7b",
]

// ======================================================
// BIRTHDAY LETTERS
// ======================================================

const birthdayLines = [
    "HAPPY",
    "BIRTHDAY",
    "CUTIE",
]

// ======================================================
// CREATE LETTER DATA
// ======================================================

function createLetters() {
    let counter = 0

    return birthdayLines.map((line, lineIndex) => {
        return line.split("").map((letter, index) => {
            const item = {
                id: counter,
                letter,
                lineIndex,
                index,
                delay: counter * 0.72,
                color:
                    fireworkColors[
                        counter % fireworkColors.length
                    ],
                left:
                    lineIndex === 0
                        ? `${15 + index * 18}%`
                        : lineIndex === 1
                        ? `${8 + index * 16.8}%`
                        : `${25 + index * 12.5}%`,
            }

            counter += 1

            return item
        })
    })
}

// ======================================================
// FIREWORK LETTER
// ======================================================

function FireworkLetter({
    item,
    visible,
    balloonPhase,
}) {
    const [burst, setBurst] = useState(false)

    useEffect(() => {
        if (!visible) {
            setBurst(false)
            return
        }

        const timer = setTimeout(() => {
            setBurst(true)
        }, 80)

        return () => clearTimeout(timer)
    }, [visible])

    const particles = useMemo(
        () =>
            Array.from(
                { length: 18 },
                (_, index) => index
            ),
        []
    )

    const angleStep =
        360 / particles.length

    return (
        <div
            className="absolute"
            style={{
                left: item.left,
                top:
                    item.lineIndex === 0
                        ? "38%"
                        : item.lineIndex === 1
                        ? "51%"
                        : "64%",
                transform: "translate(-50%, -50%)",
            }}
        >
            {/* Rocket / rising spark */}

            {!visible && (
                <motion.div
                    className="absolute left-1/2 bottom-0"
                    style={{
                        width: 4,
                        height: 18,
                        borderRadius: 999,
                        background: item.color,
                        boxShadow: `
                            0 0 8px ${item.color},
                            0 0 16px ${item.color}
                        `,
                    }}
                    animate={{
                        y: [
                            90,
                            45,
                            0,
                        ],
                        opacity: [
                            0,
                            1,
                            0,
                        ],
                    }}
                    transition={{
                        duration: 0.7,
                        delay: item.delay,
                        ease: "easeOut",
                    }}
                />
            )}

            {/* Explosion */}

            {visible && (
                <motion.div
                    className="absolute left-1/2 top-1/2"
                    style={{
                        width: 8,
                        height: 8,
                        transform: "translate(-50%, -50%)",
                    }}
                    initial={{
                        scale: 0,
                        opacity: 1,
                    }}
                    animate={{
                        scale: [0, 1, 1.7, 0],
                        opacity: [1, 1, 0.5, 0],
                    }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                    }}
                >
                    {particles.map((_, index) => {
                        const angle =
                            angleStep * index

                        const radians =
                            (angle * Math.PI) / 180

                        const distance =
                            32 + (index % 4) * 7

                        const x =
                            Math.cos(radians) *
                            distance

                        const y =
                            Math.sin(radians) *
                            distance

                        return (
                            <motion.span
                                key={index}
                                className="absolute left-1/2 top-1/2 h-[4px] w-[4px] rounded-full"
                                style={{
                                    background:
                                        item.color,
                                    boxShadow:
                                        `0 0 8px ${item.color}`,
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
                </motion.div>
            )}

            {/* Letter */}

            {visible && (
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0,
                        y: 10,
                    }}
                    animate={
                        balloonPhase
                            ? {
                                  opacity: 1,
                                  scale: 1,
                                  y: -230,
                              }
                            : {
                                  opacity: 1,
                                  scale: [
                                      0,
                                      1.25,
                                      0.95,
                                      1,
                                  ],
                                  y: 0,
                              }
                    }
                    transition={
                        balloonPhase
                            ? {
                                  duration: 2.1,
                                  delay:
                                      item.index *
                                      0.12,
                                  ease: "easeInOut",
                              }
                            : {
                                  duration: 0.65,
                                  ease: "backOut",
                              }
                    }
                    className="relative"
                >
                    {/* Balloon */}

                    {balloonPhase && (
                        <motion.div
                            className="
                                absolute
                                left-1/2
                                bottom-full
                                -translate-x-1/2
                            "
                            initial={{
                                opacity: 0,
                                scale: 0,
                                y: 25,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.55,
                                delay:
                                    item.index *
                                    0.12,
                                ease: "backOut",
                            }}
                        >
                            {/* Balloon body */}

                            <div
                                className="relative h-12 w-10 rounded-[50%]"
                                style={{
                                    background: `
                                        radial-gradient(
                                            circle at 30% 25%,
                                            rgba(255,255,255,0.9),
                                            transparent 18%
                                        ),
                                        linear-gradient(
                                            145deg,
                                            ${item.color},
                                            rgba(100,40,160,0.9)
                                        )
                                    `,
                                    boxShadow:
                                        `0 0 18px ${item.color}`,
                                }}
                            >
                                <div
                                    className="
                                        absolute
                                        left-1/2
                                        -bottom-1
                                        h-2
                                        w-2
                                        -translate-x-1/2
                                        bg-white/50
                                    "
                                    style={{
                                        clipPath:
                                            "polygon(0 0,100% 0,50% 100%)",
                                    }}
                                />

                                {/* String */}

                                <div
                                    className="
                                        absolute
                                        left-1/2
                                        top-full
                                        h-20
                                        w-px
                                        -translate-x-1/2
                                        bg-white/45
                                    "
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Letter */}

                    <span
                        className="
                            block
                            text-4xl
                            font-black
                            uppercase
                            md:text-5xl
                        "
                        style={{
                            color: item.color,
                            textShadow: `
                                0 0 8px ${item.color},
                                0 0 20px ${item.color},
                                0 3px 12px rgba(0,0,0,0.5)
                            `,
                        }}
                    >
                        {item.letter}
                    </span>
                </motion.div>
            )}

            {/* Small smoke */}

            {burst && (
                <motion.div
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        h-3
                        w-3
                        rounded-full
                        bg-white/30
                        blur-md
                    "
                    initial={{
                        scale: 0,
                        opacity: 0.8,
                    }}
                    animate={{
                        scale: 5,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                />
            )}
        </div>
    )
}

// ======================================================
// BIRTHDAY FIREWORK SHOW
// ======================================================

function BirthdayFireworkShow({ onFinished }) {
    const [visibleCount, setVisibleCount] =
        useState(0)

    const [balloonPhase, setBalloonPhase] =
        useState(false)

    const allLetters = useMemo(
        () => createLetters(),
        []
    )

    const flatLetters =
        allLetters.flat()

    useEffect(() => {
        // Reveal letters one by one
        const timers = flatLetters.map(
            (_, index) => {
                return setTimeout(
                    () => {
                        setVisibleCount(
                            index + 1
                        )
                    },
                    650 + index * 720
                )
            }
        )

        // After final letter reveal,
        // wait about 1.5 seconds
        // then balloons start
        const balloonTimer =
            setTimeout(
                () => {
                    setBalloonPhase(true)
                },
                650 +
                    flatLetters.length *
                        720 +
                    1500
            )

        // After balloons fly away,
        // show explore button
        const finishTimer =
            setTimeout(
                () => {
                    onFinished?.()
                },
                650 +
                    flatLetters.length *
                        720 +
                    1500 +
                    2700
            )

        return () => {
            timers.forEach(clearTimeout)
            clearTimeout(balloonTimer)
            clearTimeout(finishTimer)
        }
    }, [flatLetters, onFinished])

    return (
        <div
            className="
                absolute
                inset-0
                z-10
                overflow-hidden
            "
        >
            {/* Tiny stars */}

            {Array.from({
                length: 65,
            }).map((_, index) => (
                <motion.span
                    key={index}
                    className="
                        absolute
                        h-[2px]
                        w-[2px]
                        rounded-full
                        bg-white
                    "
                    style={{
                        left: `${
                            (index * 41) %
                            100
                        }%`,
                        top: `${
                            (index * 23) %
                            82
                        }%`,
                    }}
                    animate={{
                        opacity: [
                            0.15,
                            0.9,
                            0.15,
                        ],
                        scale: [
                            0.7,
                            1.5,
                            0.7,
                        ],
                    }}
                    transition={{
                        duration:
                            2 +
                            (index % 4) *
                                0.5,
                        delay:
                            (index % 7) *
                            0.2,
                        repeat: Infinity,
                    }}
                />
            ))}

            {/* All letters */}

            {flatLetters.map(
                (item, index) => (
                    <FireworkLetter
                        key={item.id}
                        item={item}
                        visible={
                            index <
                            visibleCount
                        }
                        balloonPhase={
                            balloonPhase
                        }
                    />
                )
            )}

            {/* Bottom launch particles */}

            {!balloonPhase &&
                Array.from({
                    length: 18,
                }).map((_, index) => (
                    <motion.span
                        key={`launch-${index}`}
                        className="
                            absolute
                            bottom-0
                            h-1
                            w-1
                            rounded-full
                            bg-white
                        "
                        style={{
                            left: `${
                                5 +
                                (index *
                                    17) %
                                    90
                            }%`,
                        }}
                        animate={{
                            y: [
                                0,
                                -120 -
                                    (index %
                                        4) *
                                        50,
                                -220,
                            ],
                            opacity: [
                                0,
                                1,
                                0,
                            ],
                        }}
                        transition={{
                            duration:
                                2.2 +
                                (index %
                                    4) *
                                    0.35,
                            delay:
                                index * 0.35,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                    />
                ))}
        </div>
    )
}

// ======================================================
// MAIN INTRO SCREEN
// ======================================================

export default function IntroScreen({ onNext }) {
    const [step, setStep] = useState(0)
    const [showExplore, setShowExplore] =
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
                    className="
                        fixed
                        inset-0
                        overflow-hidden
                        bg-[#070d2b]
                    "
                >
                    <div className="absolute inset-0 bg-[#070d2b]" />

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
                            backgroundSize:
                                "72px 72px",
                        }}
                    />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(90,90,180,0.22),transparent_55%)]" />

                    <TopDecoration />

                    {/* CENTERED CARD */}

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
                                    className="absolute h-32 w-32 rounded-full bg-pink-400/20 blur-3xl"
                                    animate={{
                                        scale: [
                                            1,
                                            1.2,
                                            1,
                                        ],
                                        opacity: [
                                            0.4,
                                            0.7,
                                            0.4,
                                        ],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat:
                                            Infinity,
                                    }}
                                />

                                <motion.div
                                    className="relative z-10 text-7xl md:text-8xl"
                                    animate={{
                                        y: [
                                            0,
                                            -7,
                                            0,
                                        ],
                                        rotate: [
                                            -2,
                                            2,
                                            -2,
                                        ],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat:
                                            Infinity,
                                    }}
                                >
                                    🎁
                                </motion.div>
                            </div>

                            <div className="relative z-10 mt-8 text-center">
                                <h1
                                    className="
                                        text-3xl
                                        font-semibold
                                        italic
                                        leading-tight
                                        text-pink-200
                                        md:text-4xl
                                    "
                                >
                                    Something special
                                    <br />
                                    is waiting...
                                </h1>

                                <p className="mt-5 text-base text-[#c7cbe7] md:text-lg">
                                    Tap the button to open it ✨
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
                STEP 1 — FIREWORK LETTER REVEAL
            ================================================== */}

            {step === 1 && (
                <motion.div
                    key="step1"
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
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

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(80,50,180,0.25),transparent_60%)]" />

                    <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[radial-gradient(circle_at_50%_100%,rgba(255,70,180,0.13),transparent_65%)]" />

                    {/* Firework show */}

                    <BirthdayFireworkShow
                        onFinished={() =>
                            setShowExplore(true)
                        }
                    />

                    {/* Main title label */}

                    <motion.div
                        className="
                            absolute
                            left-1/2
                            top-[12%]
                            z-30
                            -translate-x-1/2
                            whitespace-nowrap
                            text-center
                        "
                        initial={{
                            opacity: 0,
                            y: -15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 0.2,
                        }}
                    >
                        <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                            A little surprise
                        </p>
                    </motion.div>

                    {/* Explore button */}

                    <AnimatePresence>
                        {showExplore && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 25,
                                    scale: 0.9,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                className="
                                    fixed
                                    bottom-10
                                    left-1/2
                                    z-[100]
                                    -translate-x-1/2
                                "
                            >
                                <Button
                                    onClick={() =>
                                        onNext?.()
                                    }
                                    className="
                                        min-w-[220px]
                                        justify-center
                                        bg-[#f1caeb]
                                        text-primary
                                        shadow-[0_10px_35px_rgba(255,120,210,0.3)]
                                    "
                                >
                                    <Heart size={20} />
                                    <span>
                                        Let's explore
                                    </span>
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Signature */}

                    <div className="fixed bottom-4 right-4 z-[100] text-sm text-white/35">
                        @Rafee🫶protiva
                    </div>
                </motion.div>
            )}

            {/* ==================================================
                STEP 2 — ORIGINAL CUTIEPIE SCREEN
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
                        mx-auto
                        flex
                        min-w-48
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
                            Yes, it’s YOU! A little surprise awaits...
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
                </motion.div>
            )}
        </AnimatePresence>
    )
}
