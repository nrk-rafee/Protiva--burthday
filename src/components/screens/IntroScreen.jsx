"use client"

import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
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
   FIREWORK BACKGROUND
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
   ONE FIREWORK LETTER
====================================================== */

function FireworkLetter({
    item,
    visible,
    balloonPhase,
}) {
    const wordPositions = {
        0: {
            top: "8%",
            left: "50%",
        },
        1: {
            top: "42%",
            left: "50%",
        },
        2: {
            top: "76%",
            left: "50%",
        },
    }

    const position = wordPositions[item.wordIndex]

    const wordLengths = {
        0: 5,
        1: 8,
        2: 4,
    }

    const wordLength = wordLengths[item.wordIndex]

    const spacing = 42

    const offset =
        (item.letterIndex - (wordLength - 1) / 2) *
        spacing

    return (
        <div
            className="absolute"
            style={{
                top: position.top,
                left: `calc(50% + ${offset}px)`,
                transform: "translate(-50%, -50%)",
            }}
        >
            {/* Launching spark */}

            {visible && (
                <motion.div
                    className="pointer-events-none absolute left-1/2 top-1/2"
                    initial={{
                        y: 230,
                        opacity: 1,
                    }}
                    animate={{
                        y: 0,
                        opacity: [1, 1, 0],
                    }}
                    transition={{
                        duration: 0.62,
                        ease: "easeOut",
                    }}
                >
                    <div
                        className="h-2 w-2 rounded-full"
                        style={{
                            background: item.color,
                            boxShadow: `
                                0 0 8px ${item.color},
                                0 0 20px ${item.color}
                            `,
                        }}
                    />
                </motion.div>
            )}

            {/* Firework explosion */}

            {visible && (
                <motion.div
                    className="pointer-events-none absolute left-1/2 top-1/2"
                    initial={{
                        scale: 0,
                        opacity: 1,
                    }}
                    animate={{
                        scale: [0, 1.2, 1.8, 0],
                        opacity: [1, 1, 0.5, 0],
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.55,
                        ease: "easeOut",
                    }}
                >
                    {Array.from({ length: 16 }).map(
                        (_, rayIndex) => {
                            const angle =
                                (360 / 16) * rayIndex

                            const radians =
                                (angle * Math.PI) /
                                180

                            const distance =
                                25 +
                                (rayIndex % 4) * 9

                            const x =
                                Math.cos(radians) *
                                distance

                            const y =
                                Math.sin(radians) *
                                distance

                            return (
                                <motion.span
                                    key={rayIndex}
                                    className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
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
                                        duration: 0.65,
                                        delay: 0.55,
                                        ease: "easeOut",
                                    }}
                                />
                            )
                        }
                    )}
                </motion.div>
            )}

            {/* Letter + balloon */}

            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={
                            balloonPhase
                                ? {
                                      opacity: 0,
                                      y: -230,
                                      scale: 0.85,
                                  }
                                : {
                                      opacity: 1,
                                      y: 0,
                                      scale: [
                                          0,
                                          1.25,
                                          0.92,
                                          1,
                                      ],
                                  }
                        }
                        transition={
                            balloonPhase
                                ? {
                                      duration: 1.8,
                                      delay:
                                          item.index *
                                          0.12,
                                      ease: "easeInOut",
                                  }
                                : {
                                      duration: 0.6,
                                      delay: 0.6,
                                      ease: "backOut",
                                  }
                        }
                        className="relative"
                    >
                        {/* Balloon */}

                        {balloonPhase && (
                            <motion.div
                                className="absolute bottom-full left-1/2 -translate-x-1/2"
                                initial={{
                                    opacity: 0,
                                    scale: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.45,
                                    delay:
                                        item.index *
                                        0.12,
                                    ease: "backOut",
                                }}
                            >
                                <div
                                    className="relative h-11 w-9 rounded-[50%]"
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
                                                rgba(90,30,140,0.95)
                                            )
                                        `,
                                        boxShadow: `
                                            0 0 18px ${item.color}
                                        `,
                                    }}
                                >
                                    <div
                                        className="absolute left-1/2 top-full h-24 w-px -translate-x-1/2 bg-white/45"
                                    />

                                    <div
                                        className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 bg-white/50"
                                        style={{
                                            clipPath:
                                                "polygon(0 0,100% 0,50% 100%)",
                                        }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Actual letter */}

                        <span
                            className="block text-3xl font-black uppercase md:text-4xl"
                            style={{
                                color: item.color,
                                textShadow: `
                                    0 0 8px ${item.color},
                                    0 0 20px ${item.color},
                                    0 0 35px ${item.color}
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

function BirthdayFireworkShow({
    onFinished,
    onAllLettersShown,
}) {
    const [visibleCount, setVisibleCount] =
        useState(0)

    const [balloonPhase, setBalloonPhase] =
        useState(false)

    const letters = useMemo(
        () => createLetters().flat(),
        []
    )

    /*
      IMPORTANT FIX:

      The parent IntroScreen re-renders when
      showSecondGif changes.

      If we directly put onFinished / onAllLettersShown
      inside the timer effect dependency array,
      the entire firework timer can restart.

      So we keep the latest callbacks inside refs.

      This means:
      - GIF can change
      - parent can re-render
      - BirthdayFireworkShow does NOT restart
      - visibleCount stays unchanged
      - balloonPhase stays unchanged
    */

    const onFinishedRef = useRef(onFinished)
    const onAllLettersShownRef =
        useRef(onAllLettersShown)

    useEffect(() => {
        onFinishedRef.current = onFinished
        onAllLettersShownRef.current =
            onAllLettersShown
    }, [onFinished, onAllLettersShown])

    useEffect(() => {
        const revealTimers = []

        /*
          One letter every 650ms.
        */

        letters.forEach((_, index) => {
            const timer = setTimeout(() => {
                setVisibleCount(index + 1)

                /*
                  IMPORTANT:

                  Only after the FINAL letter E
                  becomes visible, tell the parent
                  to change the GIF.

                  This does NOT restart this component.
                */

                if (index === letters.length - 1) {
                    onAllLettersShownRef.current?.()
                }
            }, 700 + index * 650)

            revealTimers.push(timer)
        })

        /*
          After last letter:
          wait 1.5 seconds,
          then balloons start.
        */

        const balloonTimer = setTimeout(
            () => {
                setBalloonPhase(true)
            },
            700 +
                letters.length * 650 +
                1500
        )

        /*
          After balloons fly away:
          show Start the surprise button.
        */

        const finishTimer = setTimeout(
            () => {
                onFinishedRef.current?.()
            },
            700 +
                letters.length * 650 +
                1500 +
                3000
        )

        return () => {
            revealTimers.forEach(clearTimeout)
            clearTimeout(balloonTimer)
            clearTimeout(finishTimer)
        }
    }, [letters])

    return (
        <div className="absolute inset-x-0 bottom-0 top-[38%] z-10 overflow-hidden">
            {/* Tiny stars */}

            {Array.from({ length: 35 }).map(
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
                                0.15,
                                0.8,
                                0.15,
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

            {/* Birthday letters */}

            {letters.map((item, index) => (
                <FireworkLetter
                    key={item.id}
                    item={item}
                    visible={index < visibleCount}
                    balloonPhase={balloonPhase}
                />
            ))}

            {/* Continuous small launch sparks */}

            {!balloonPhase &&
                Array.from({ length: 12 }).map(
                    (_, index) => (
                        <motion.span
                            key={`launch-${index}`}
                            className="absolute bottom-0 h-1 w-1 rounded-full bg-white"
                            style={{
                                left: `${
                                    5 +
                                    (index * 19) %
                                        90
                                }%`,
                            }}
                            animate={{
                                y: [
                                    0,
                                    -80,
                                    -180,
                                ],
                                opacity: [
                                    0,
                                    1,
                                    0,
                                ],
                            }}
                            transition={{
                                duration: 2,
                                delay:
                                    index * 0.3,
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

    /*
      false = first GIF
              /gifs/121.webp

      true = second GIF
             /gifs/5.webp

      IMPORTANT:
      This state ONLY controls the GIF.
      It does NOT control or restart
      the birthday firework animation.
    */

    const [showSecondGif, setShowSecondGif] =
        useState(false)

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
                STEP 1 — OLD BIRTHDAY CARD + NEW FIREWORK SHOW
            ================================================== */}

            {step === 1 && (
                <motion.div
                    key="step1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
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

                    <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(circle_at_50%_100%,rgba(255,70,180,0.15),transparent_65%)]" />

                    <BackgroundFireworks />

                    {/* ==================================================
                        OLD BIRTHDAY CARD
                    ================================================== */}

                    <div className="absolute inset-x-0 top-[5%] z-30 flex justify-center px-4">
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
                            {/* Card glow */}

                            <div className="pointer-events-none absolute inset-0 rounded-[42px] bg-gradient-to-b from-white/50 to-transparent" />

                            {/* GIF */}

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
                                <motion.img
                                    key={
                                        showSecondGif
                                            ? "gif-5"
                                            : "gif-121"
                                    }
                                    src={
                                        showSecondGif
                                            ? "/gifs/5.webp"
                                            : "/gifs/121.webp"
                                    }
                                    alt="Birthday animation"
                                    className="h-full w-full object-contain"
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                    }}
                                    transition={{
                                        duration: 0.35,
                                    }}
                                />
                            </div>

                            {/* Old title */}

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
                        FIREWORK + LETTER AREA
                    ================================================== */}

                    <BirthdayFireworkShow
                        onAllLettersShown={() =>
                            setShowSecondGif(true)
                        }
                        onFinished={() =>
                            setShowStartButton(true)
                        }
                    />

                    {/* ==================================================
                        A LITTLE SURPRISE
                    ================================================== */}

                    <motion.div
                        className="
                            absolute
                            left-1/2
                            top-[27%]
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
                        }}
                    >
                        <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">
                            A little surprise
                        </p>
                    </motion.div>

                    {/* ==================================================
                        START THE SURPRISE BUTTON
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
                                    z-[200]
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
                        fixed
                        inset-0
                        flex
                        min-h-screen
                        items-center
                        justify-center
                        overflow-y-auto
                        px-4
                        py-6
                    "
                >
                    <div
                        className="
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
