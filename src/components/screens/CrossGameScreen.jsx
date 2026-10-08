"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, RotateCcw } from "lucide-react"
import Button from "../Button"

/* ======================================================
   WINNING LINES
====================================================== */

const WINNING_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

/* ======================================================
   CHECK RESULT
====================================================== */

function getGameResult(board) {
    for (const [a, b, c] of WINNING_LINES) {
        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return {
                winner: board[a],
                line: [a, b, c],
            }
        }
    }

    if (board.every(Boolean)) {
        return {
            winner: "draw",
            line: [],
        }
    }

    return null
}

/* ======================================================
   COMPUTER AI
====================================================== */

function getComputerMove(board, computerSide) {
    const playerSide =
        computerSide === "X" ? "O" : "X"

    /* 1. Computer tries to win */

    for (const [a, b, c] of WINNING_LINES) {
        const values = [
            board[a],
            board[b],
            board[c],
        ]

        if (
            values.filter(
                (value) => value === computerSide
            ).length === 2 &&
            values.includes(null)
        ) {
            if (!board[a]) return a
            if (!board[b]) return b
            if (!board[c]) return c
        }
    }

    /* 2. Computer blocks player */

    for (const [a, b, c] of WINNING_LINES) {
        const values = [
            board[a],
            board[b],
            board[c],
        ]

        if (
            values.filter(
                (value) => value === playerSide
            ).length === 2 &&
            values.includes(null)
        ) {
            if (!board[a]) return a
            if (!board[b]) return b
            if (!board[c]) return c
        }
    }

    /* 3. Center */

    if (!board[4]) {
        return 4
    }

    /* 4. Corner */

    const corners = [0, 2, 6, 8].filter(
        (index) => !board[index]
    )

    if (corners.length > 0) {
        return corners[
            Math.floor(
                Math.random() * corners.length
            )
        ]
    }

    /* 5. Any empty cell */

    const emptySquares = board
        .map((value, index) =>
            value ? null : index
        )
        .filter((value) => value !== null)

    if (emptySquares.length === 0) {
        return null
    }

    return emptySquares[
        Math.floor(
            Math.random() * emptySquares.length
        )
    ]
}

/* ======================================================
   MOVE SOUND

   No external file.
   Works locally, so slow internet doesn't affect it.
====================================================== */

function playMoveSound(type = "player") {
    try {
        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext

        if (!AudioContext) return

        const context =
            CrossGameScreen.audioContext ||
            new AudioContext()

        CrossGameScreen.audioContext =
            context

        if (context.state === "suspended") {
            context.resume().catch(() => {})
        }

        const oscillator =
            context.createOscillator()

        const gain =
            context.createGain()

        oscillator.type = "sine"

        /*
          Slightly different tone for
          player and computer.
        */

        oscillator.frequency.value =
            type === "computer"
                ? 520
                : 680

        gain.gain.setValueAtTime(
            0.0001,
            context.currentTime
        )

        gain.gain.exponentialRampToValueAtTime(
            0.09,
            context.currentTime + 0.015
        )

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            context.currentTime + 0.13
        )

        oscillator.connect(gain)
        gain.connect(context.destination)

        oscillator.start()

        oscillator.stop(
            context.currentTime + 0.14
        )
    } catch {
        /* Sound failure should NEVER stop the game */
    }
}

/* ======================================================
   CONFETTI
====================================================== */

function CelebrationConfetti() {
    const pieces = useMemo(
        () => Array.from({ length: 80 }),
        []
    )

    return (
        <div className="pointer-events-none fixed inset-0 z-[500] overflow-hidden">
            {pieces.map((_, index) => {
                const left =
                    (index * 41 + 7) % 100

                const size =
                    5 + (index % 5)

                const rotation =
                    (index * 37) % 360

                return (
                    <motion.span
                        key={index}
                        className="absolute rounded-sm"
                        style={{
                            left: `${left}%`,
                            top: "-20px",
                            width: size,
                            height: size * 1.7,
                            background:
                                [
                                    "#ff4fa3",
                                    "#ffd166",
                                    "#8be9fd",
                                    "#c7a0ff",
                                    "#ff8fab",
                                    "#ffffff",
                                ][index % 6],
                            rotate: rotation,
                        }}
                        animate={{
                            y: [
                                -20,
                                300,
                                "110vh",
                            ],
                            x: [
                                0,
                                index % 2
                                    ? -35
                                    : 35,
                                index % 3
                                    ? 25
                                    : -25,
                            ],
                            rotate: [
                                rotation,
                                rotation + 180,
                                rotation + 500,
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
                                3 +
                                (index % 5) * 0.2,
                            delay:
                                (index % 12) * 0.035,
                            ease: "easeOut",
                        }}
                    />
                )
            })}
        </div>
    )
}

/* ======================================================
   CHOOSE SIDE
====================================================== */

function ChooseSide({ onChoose }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.92,
                y: 25,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
            }}
            transition={{
                duration: 0.45,
            }}
            className="
                relative
                w-full
                max-w-[420px]
                overflow-hidden
                rounded-[42px]
                border
                border-white/70
                bg-white/90
                p-7
                text-center
                shadow-[0_25px_80px_rgba(80,40,60,0.20)]
                backdrop-blur-xl
            "
        >
            <div className="pointer-events-none absolute -left-3 top-5 text-4xl opacity-30">
                💕
            </div>

            <div className="pointer-events-none absolute -right-2 bottom-8 text-3xl opacity-30">
                ✨
            </div>

            <motion.div
                animate={{
                    y: [0, -5, 0],
                    rotate: [-3, 3, -3],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                }}
                className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-pink-100
                    to-purple-100
                    text-3xl
                    shadow-inner
                "
            >
                🎮
            </motion.div>

            <h1 className="mt-4 text-3xl font-bold text-[#713b50]">
                Choose Your Side
            </h1>

            <p className="mt-2 text-sm text-gray-500">
                তুমি কোনটা নিয়ে খেলবে? 💗
            </p>

            <div className="mt-7 grid grid-cols-2 gap-4">

                {/* X */}

                <motion.button
                    type="button"
                    onClick={() => onChoose("X")}
                    whileHover={{
                        y: -4,
                    }}
                    whileTap={{
                        scale: 0.94,
                    }}
                    className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-2
                        rounded-[28px]
                        border-2
                        border-orange-200
                        bg-gradient-to-br
                        from-orange-50
                        to-yellow-50
                        py-6
                        text-orange-500
                        shadow-[0_12px_30px_rgba(255,150,50,0.15)]
                    "
                >
                    <span className="text-6xl font-black">
                        ×
                    </span>

                    <span className="font-semibold">
                        Play as X
                    </span>
                </motion.button>

                {/* O */}

                <motion.button
                    type="button"
                    onClick={() => onChoose("O")}
                    whileHover={{
                        y: -4,
                    }}
                    whileTap={{
                        scale: 0.94,
                    }}
                    className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-2
                        rounded-[28px]
                        border-2
                        border-gray-200
                        bg-gradient-to-br
                        from-gray-50
                        to-white
                        py-6
                        text-black
                        shadow-[0_12px_30px_rgba(50,50,50,0.12)]
                    "
                >
                    <span className="text-6xl font-black">
                        ○
                    </span>

                    <span className="font-semibold">
                        Play as O
                    </span>
                </motion.button>

            </div>

            <p className="mt-6 text-xs text-gray-400">
                কে আগে শুরু করবে সেটা প্রতি game-এ বদলাবে 🤭
            </p>
        </motion.div>
    )
}

/* ======================================================
   GAME BOARD
====================================================== */

function GameBoard({
    board,
    onCellClick,
    disabled,
    winningLine,
}) {
    return (
        <div
            className="
                mx-auto
                w-full
                max-w-[335px]
                rounded-[34px]
                border-[8px]
                border-[#d8b995]
                bg-[#ead5b8]
                p-3
                shadow-[0_18px_45px_rgba(70,40,20,0.28)]
            "
        >
            <div
                className="
                    grid
                    grid-cols-3
                    gap-2
                    rounded-[24px]
                    bg-[#c9aa85]
                    p-2
                "
            >
                {board.map((value, index) => {
                    const isWinning =
                        winningLine.includes(index)

                    return (
                        <motion.button
                            key={index}
                            type="button"
                            disabled={
                                disabled ||
                                Boolean(value)
                            }
                            onClick={() =>
                                onCellClick(index)
                            }
                            whileTap={
                                !disabled && !value
                                    ? {
                                          scale: 0.93,
                                      }
                                    : undefined
                            }
                            className={`
                                relative
                                aspect-square
                                overflow-hidden
                                rounded-[13px]
                                border
                                border-[#9f7d59]
                                bg-gradient-to-br
                                from-[#f3e2c8]
                                via-[#e7d1ae]
                                to-[#cdb08c]
                                shadow-[inset_0_3px_8px_rgba(255,255,255,0.55),inset_0_-5px_10px_rgba(70,40,20,0.16)]
                                ${
                                    isWinning
                                        ? "ring-4 ring-pink-400 shadow-[0_0_25px_rgba(244,114,182,0.75)]"
                                        : ""
                                }
                            `}
                        >
                            {value === "X" && (
                                <motion.div
                                    initial={{
                                        scale: 0,
                                        rotate: -25,
                                    }}
                                    animate={{
                                        scale: 1,
                                        rotate: 0,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 18,
                                    }}
                                    className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        text-[60px]
                                        font-black
                                        leading-none
                                        text-orange-500
                                        drop-shadow-[0_3px_2px_rgba(0,0,0,0.18)]
                                    "
                                >
                                    ×
                                </motion.div>
                            )}

                            {value === "O" && (
                                <motion.div
                                    initial={{
                                        scale: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 20,
                                    }}
                                    className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        text-[56px]
                                        font-black
                                        leading-none
                                        text-black
                                    "
                                >
                                    ○
                                </motion.div>
                            )}
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}

/* ======================================================
   MAIN GAME
====================================================== */

export default function CrossGameScreen({
    onNext,
}) {
    const [playerSide, setPlayerSide] =
        useState(null)

    const [board, setBoard] = useState(
        Array(9).fill(null)
    )

    const [turn, setTurn] = useState(null)

    const [result, setResult] = useState(null)

    const [winningLine, setWinningLine] =
        useState([])

    const [computerThinking, setComputerThinking] =
        useState(false)

    const [celebrating, setCelebrating] =
        useState(false)

    /*
      IMPORTANT:

      false = Computer starts
      true  = Player starts

      This value is changed after EVERY game.
    */

    const [playerStarts, setPlayerStarts] =
        useState(false)

    /*
      Used to prevent an old computer timer
      from affecting a newly restarted game.
    */

    const gameIdRef = useRef(0)

    /* ==================================================
       PRELOAD GIFS
    ================================================== */

    useEffect(() => {
        const happy = new Image()
        happy.src = "/gifs/happy.gif"

        const retry = new Image()
        retry.src = "/gifs/4.webp"
    }, [])

    /* ==================================================
       START / RESTART GAME
    ================================================== */

    const startGame = (side) => {
        /*
          Every call starts a completely fresh game.
        */

        gameIdRef.current += 1

        const newGameId =
            gameIdRef.current

        setPlayerSide(side)

        setBoard(
            Array(9).fill(null)
        )

        setResult(null)

        setWinningLine([])

        setComputerThinking(false)

        setCelebrating(false)

        /*
          FIRST GAME:
          Computer starts.

          NEXT GAME:
          Player starts.

          Then computer again...
        */

        const shouldPlayerStart =
            playerStarts

        const computerSide =
            side === "X"
                ? "O"
                : "X"

        if (shouldPlayerStart) {
            setTurn(side)
        } else {
            setTurn(computerSide)
        }

        /*
          Flip starter for NEXT game.
        */

        setPlayerStarts(
            (previous) => !previous
        )

        /*
          Unlock audio after user has interacted
          with the Choose X/O button.
        */

        try {
            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext

            if (AudioContext) {
                if (
                    !CrossGameScreen.audioContext
                ) {
                    CrossGameScreen.audioContext =
                        new AudioContext()
                }

                const audio =
                    CrossGameScreen.audioContext

                if (
                    audio.state ===
                    "suspended"
                ) {
                    audio.resume().catch(
                        () => {}
                    )
                }
            }
        } catch {}

        /*
          If website is starting this game,
          play its move after a small delay.
        */

        if (!shouldPlayerStart) {
            setTimeout(() => {
                /*
                  This timeout is only a small visual
                  delay. Actual computer logic is handled
                  by the effect below.
                */

                if (
                    gameIdRef.current !==
                    newGameId
                ) {
                    return
                }
            }, 0)
        }
    }

    /* ==================================================
       PLAYER MOVE
    ================================================== */

    const handlePlayerMove = (index) => {
        if (!playerSide) return

        if (result) return

        if (computerThinking) return

        if (turn !== playerSide) return

        if (board[index]) return

        /*
          New array.
          We never mutate React state directly.
        */

        const nextBoard = [...board]

        nextBoard[index] = playerSide

        /*
          Sound for PLAYER move.
        */

        playMoveSound("player")

        const gameResult =
            getGameResult(nextBoard)

        setBoard(nextBoard)

        if (gameResult) {
            setResult(
                gameResult.winner
            )

            setWinningLine(
                gameResult.line
            )

            setTurn(null)

            if (
                gameResult.winner ===
                playerSide
            ) {
                setCelebrating(true)
            }

            return
        }

        /*
          Computer's turn.
        */

        const computerSide =
            playerSide === "X"
                ? "O"
                : "X"

        setTurn(computerSide)
    }

    /* ==================================================
       COMPUTER TURN
    ================================================== */

    useEffect(() => {
        if (!playerSide) return

        if (!turn) return

        if (result) return

        const computerSide =
            playerSide === "X"
                ? "O"
                : "X"

        /*
          Not computer's turn.
        */

        if (turn !== computerSide) {
            return
        }

        /*
          Prevent duplicate computer timers.
        */

        let cancelled = false

        setComputerThinking(true)

        const currentGameId =
            gameIdRef.current

        const timer = setTimeout(() => {
            if (cancelled) return

            /*
              If user already started a new game,
              this old timer does nothing.
            */

            if (
                currentGameId !==
                gameIdRef.current
            ) {
                return
            }

            const move =
                getComputerMove(
                    board,
                    computerSide
                )

            if (move === null) {
                setComputerThinking(false)
                return
            }

            const nextBoard = [...board]

            nextBoard[move] =
                computerSide

            /*
              Sound for COMPUTER move.
            */

            playMoveSound("computer")

            const gameResult =
                getGameResult(nextBoard)

            setBoard(nextBoard)

            if (gameResult) {
                setResult(
                    gameResult.winner
                )

                setWinningLine(
                    gameResult.line
                )

                setTurn(null)

                setComputerThinking(false)

                if (
                    gameResult.winner ===
                    playerSide
                ) {
                    setCelebrating(true)
                }

                return
            }

            /*
              COMPUTER FINISHED.

              Now it is ALWAYS player's turn.
            */

            setComputerThinking(false)

            setTurn(playerSide)
        }, 650)

        return () => {
            cancelled = true
            clearTimeout(timer)
        }
    }, [
        turn,
        playerSide,
        result,
        board,
    ])

    /* ==================================================
       RESULT TITLE
    ================================================== */

    const resultTitle =
        result === playerSide
            ? "You Win! 🎉"
            : result === "draw"
              ? "It's a Draw! 🤍"
              : "Oops... You Lost 😭"

    /* ==================================================
       RENDER
    ================================================== */

    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 0.35,
            }}
            className="
                fixed
                inset-0
                z-50
                overflow-y-auto
                bg-[#fff8f2]
            "
        >

            {/* ==================================================
                BACKGROUND
            ================================================== */}

            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,185,215,0.45),transparent_48%),radial-gradient(circle_at_15%_80%,rgba(210,190,255,0.22),transparent_35%),radial-gradient(circle_at_90%_75%,rgba(255,210,180,0.22),transparent_35%)]" />

            {/* Floating decoration */}

            <motion.div
                animate={{
                    y: [0, -10, 0],
                    rotate: [-5, 5, -5],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                }}
                className="
                    pointer-events-none
                    fixed
                    left-5
                    top-28
                    text-4xl
                    opacity-35
                "
            >
                💕
            </motion.div>

            <motion.div
                animate={{
                    y: [0, 10, 0],
                    rotate: [5, -5, 5],
                }}
                transition={{
                    duration: 4.5,
                    repeat: Infinity,
                }}
                className="
                    pointer-events-none
                    fixed
                    right-5
                    top-36
                    text-3xl
                    opacity-30
                "
            >
                ✨
            </motion.div>

            <div className="pointer-events-none fixed bottom-28 left-5 text-3xl opacity-20">
                🌸
            </div>

            <div className="pointer-events-none fixed bottom-32 right-5 text-3xl opacity-20">
                💗
            </div>

            {/* ==================================================
                CONTENT
            ================================================== */}

            <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-8">

                <AnimatePresence mode="wait">

                    {/* ==================================================
                        CHOOSE SIDE
                    ================================================== */}

                    {!playerSide && (
                        <ChooseSide
                            key="choose-side"
                            onChoose={startGame}
                        />
                    )}

                    {/* ==================================================
                        GAME
                    ================================================== */}

                    {playerSide &&
                        !result && (
                            <motion.div
                                key="game-screen"
                                initial={{
                                    opacity: 0,
                                    scale: 0.96,
                                    y: 15,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.4,
                                }}
                                className="
                                    relative
                                    w-full
                                    max-w-[440px]
                                    overflow-hidden
                                    rounded-[44px]
                                    border
                                    border-white/70
                                    bg-white/90
                                    p-5
                                    shadow-[0_25px_80px_rgba(70,40,30,0.20)]
                                    backdrop-blur-xl
                                "
                            >

                                {/* Card decoration */}

                                <div className="pointer-events-none absolute -right-7 -top-7 h-24 w-24 rounded-full bg-pink-100/50 blur-2xl" />

                                <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-purple-100/50 blur-2xl" />

                                {/* Header */}

                                <div className="relative z-10 text-center">

                                    <div className="flex items-center justify-center gap-2">

                                        <span className="text-sm text-gray-500">
                                            You are
                                        </span>

                                        <motion.span
                                            animate={{
                                                y: [
                                                    0,
                                                    -2,
                                                    0,
                                                ],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                            }}
                                            className={`
                                                rounded-full
                                                px-4
                                                py-1
                                                text-xl
                                                font-black
                                                shadow-sm
                                                ${
                                                    playerSide ===
                                                    "X"
                                                        ? "bg-orange-100 text-orange-500"
                                                        : "bg-gray-100 text-black"
                                                }
                                            `}
                                        >
                                            {playerSide ===
                                            "X"
                                                ? "×"
                                                : "○"}
                                        </motion.span>

                                    </div>

                                    <h1 className="mt-3 text-[29px] font-bold tracking-tight text-[#713b50]">
                                        Tic-Tac-Toe 💕
                                    </h1>

                                    <div className="mt-1 flex items-center justify-center gap-1 text-xs text-gray-400">

                                        {computerThinking ? (
                                            <>
                                                <span>
                                                    My turn
                                                </span>

                                                <motion.span
                                                    animate={{
                                                        opacity: [
                                                            0.3,
                                                            1,
                                                            0.3,
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                    }}
                                                >
                                                    🤔
                                                </motion.span>
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                    Your turn
                                                </span>

                                                <span>
                                                    ✨
                                                </span>
                                            </>
                                        )}

                                    </div>
                                </div>

                                {/* Board */}

                                <div className="relative z-10 mt-6">
                                    <GameBoard
                                        board={board}
                                        onCellClick={
                                            handlePlayerMove
                                        }
                                        disabled={
                                            computerThinking ||
                                            turn !==
                                                playerSide
                                        }
                                        winningLine={
                                            winningLine
                                        }
                                    />
                                </div>

                                {/* Legend */}

                                <div className="relative z-10 mt-5 flex items-center justify-center gap-3 text-xs text-gray-400">

                                    <span>
                                        You:{" "}
                                        <b
                                            className={
                                                playerSide ===
                                                "X"
                                                    ? "text-orange-500"
                                                    : "text-black"
                                            }
                                        >
                                            {playerSide ===
                                            "X"
                                                ? "×"
                                                : "○"}
                                        </b>
                                    </span>

                                    <span className="text-pink-200">
                                        ♥
                                    </span>

                                    <span>
                                        Me:{" "}
                                        <b>
                                            {playerSide ===
                                            "X"
                                                ? "○"
                                                : "×"}
                                        </b>
                                    </span>

                                </div>

                                <p className="relative z-10 mt-3 text-center text-[10px] text-gray-300">
                                    Take your best move 😌
                                </p>

                            </motion.div>
                        )}

                    {/* ==================================================
                        RESULT
                    ================================================== */}

                    {playerSide &&
                        result && (
                            <motion.div
                                key="result-screen"
                                initial={{
                                    opacity: 0,
                                    scale: 0.88,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.45,
                                }}
                                className="
                                    relative
                                    w-full
                                    max-w-[420px]
                                    overflow-hidden
                                    rounded-[44px]
                                    border
                                    border-white/70
                                    bg-white/95
                                    p-7
                                    text-center
                                    shadow-[0_25px_80px_rgba(70,40,30,0.22)]
                                    backdrop-blur-xl
                                "
                            >

                                {/* WIN */}

                                {result ===
                                playerSide ? (
                                    <>
                                        <motion.div
                                            animate={{
                                                y: [
                                                    0,
                                                    -8,
                                                    0,
                                                ],
                                                rotate: [
                                                    -5,
                                                    5,
                                                    -5,
                                                ],
                                            }}
                                            transition={{
                                                duration: 1.4,
                                                repeat: Infinity,
                                            }}
                                            className="text-6xl"
                                        >
                                            🏆
                                        </motion.div>

                                        <h1 className="mt-3 text-3xl font-bold text-pink-500">
                                            You Win! 🎉
                                        </h1>

                                        <p className="mt-2 text-sm text-gray-500">
                                            I knew you could
                                            do it, Cutie! 💗
                                        </p>

                                        <div className="mt-5 overflow-hidden rounded-[28px] border border-pink-100 bg-pink-50 p-3">
                                            <img
                                                src="/gifs/happy.gif"
                                                alt="Happy celebration"
                                                className="mx-auto h-[190px] w-full object-contain"
                                            />
                                        </div>

                                        <div className="mt-6">
                                            <Button
                                                onClick={
                                                    onNext
                                                }
                                                className="
                                                    min-w-[210px]
                                                    justify-center
                                                    bg-gradient-to-r
                                                    from-pink-400
                                                    to-fuchsia-500
                                                    text-white
                                                    shadow-[0_10px_35px_rgba(255,80,170,0.30)]
                                                "
                                            >
                                                Continue

                                                <ArrowRight
                                                    size={
                                                        19
                                                    }
                                                />
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <motion.div
                                            animate={{
                                                y: [
                                                    0,
                                                    -5,
                                                    0,
                                                ],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                            }}
                                            className="text-6xl"
                                        >
                                            {result ===
                                            "draw"
                                                ? "🤍"
                                                : "😭"}
                                        </motion.div>

                                        <h1 className="mt-3 text-3xl font-bold text-[#713b50]">
                                            {resultTitle}
                                        </h1>

                                        <p className="mt-2 text-sm text-gray-500">
                                            No worries...
                                            Let's try again
                                            💗
                                        </p>

                                        <div className="mt-5 overflow-hidden rounded-[28px] border border-gray-100 bg-gray-50 p-3">
                                            <img
                                                src="/gifs/4.webp"
                                                alt="Try again"
                                                className="mx-auto h-[190px] w-full object-contain"
                                            />
                                        </div>

                                        <div className="mt-6">
                                            <Button
                                                onClick={() =>
                                                    startGame(
                                                        playerSide
                                                    )
                                                }
                                                className="
                                                    min-w-[210px]
                                                    justify-center
                                                    bg-gradient-to-r
                                                    from-pink-400
                                                    to-purple-500
                                                    text-white
                                                    shadow-[0_10px_35px_rgba(180,80,220,0.25)]
                                                "
                                            >
                                                <RotateCcw
                                                    size={
                                                        18
                                                    }
                                                />

                                                Try Again
                                            </Button>
                                        </div>
                                    </>
                                )}

                            </motion.div>
                        )}

                </AnimatePresence>
            </div>

            {/* ==================================================
                CONFETTI
            ================================================== */}

            <AnimatePresence>
                {celebrating && (
                    <CelebrationConfetti />
                )}
            </AnimatePresence>

            {/* Signature */}

            <div className="pointer-events-none fixed bottom-3 right-4 z-[600] text-xs text-gray-400/70">
                @Rafee🫶protiva
            </div>

        </motion.div>
    )
}
