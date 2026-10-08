"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { RotateCcw, ArrowRight, Trophy, X, Circle } from "lucide-react"
import Button from "../Button"

/* ======================================================
   WINNING COMBINATIONS
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
   CHECK WINNER
====================================================== */

function getWinner(board) {
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
   SIMPLE COMPUTER MOVE
   Smart but beatable
====================================================== */

function getComputerMove(board, computer) {
    const player = computer === "X" ? "O" : "X"

    // 1. Try to win
    for (const [a, b, c] of WINNING_LINES) {
        const values = [board[a], board[b], board[c]]

        if (
            values.filter((value) => value === computer)
                .length === 2 &&
            values.includes(null)
        ) {
            if (!board[a]) return a
            if (!board[b]) return b
            if (!board[c]) return c
        }
    }

    // 2. Block player
    for (const [a, b, c] of WINNING_LINES) {
        const values = [board[a], board[b], board[c]]

        if (
            values.filter((value) => value === player)
                .length === 2 &&
            values.includes(null)
        ) {
            if (!board[a]) return a
            if (!board[b]) return b
            if (!board[c]) return c
        }
    }

    // 3. Prefer center
    if (!board[4]) {
        return 4
    }

    // 4. Prefer corners
    const corners = [0, 2, 6, 8].filter(
        (index) => !board[index]
    )

    if (corners.length > 0) {
        return corners[
            Math.floor(Math.random() * corners.length)
        ]
    }

    // 5. Any empty space
    const empty = board
        .map((value, index) =>
            value ? null : index
        )
        .filter((value) => value !== null)

    if (empty.length === 0) {
        return null
    }

    return empty[
        Math.floor(Math.random() * empty.length)
    ]
}

/* ======================================================
   CONFETTI
====================================================== */

function CelebrationConfetti() {
    const pieces = useMemo(
        () => Array.from({ length: 90 }),
        []
    )

    return (
        <div className="pointer-events-none fixed inset-0 z-[500] overflow-hidden">
            {pieces.map((_, index) => {
                const left =
                    (index * 37 + 5) % 100

                const rotation =
                    (index * 43) % 360

                const size =
                    5 + (index % 5)

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
                                ][
                                    index % 6
                                ],
                            rotate: rotation,
                        }}
                        animate={{
                            y: [
                                -20,
                                250,
                                window.innerHeight + 100,
                            ],
                            x: [
                                0,
                                index % 2 === 0
                                    ? 35
                                    : -35,
                                index % 3 === 0
                                    ? -25
                                    : 25,
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
                                3.2 +
                                (index % 5) *
                                    0.25,
                            delay:
                                (index % 15) *
                                0.04,
                            ease: "easeOut",
                        }}
                    />
                )
            })}
        </div>
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
                relative
                mx-auto
                w-full
                max-w-[330px]
                rounded-[32px]
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
                    rounded-[22px]
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
                                          scale: 0.92,
                                      }
                                    : undefined
                            }
                            className={`
                                relative
                                aspect-square
                                overflow-hidden
                                rounded-[12px]
                                border
                                border-[#9f7d59]
                                bg-gradient-to-br
                                from-[#f0dfc5]
                                to-[#cdb08c]
                                shadow-[inset_0_3px_8px_rgba(255,255,255,0.55),inset_0_-5px_10px_rgba(70,40,20,0.18)]
                                transition
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
                                        rotate: -20,
                                    }}
                                    animate={{
                                        scale: 1,
                                        rotate: 0,
                                    }}
                                    className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        text-[58px]
                                        font-black
                                        leading-none
                                        text-orange-500
                                        drop-shadow-[0_3px_2px_rgba(0,0,0,0.2)]
                                        md:text-[64px]
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
                                    className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        text-[55px]
                                        font-black
                                        leading-none
                                        text-black
                                        drop-shadow-[0_3px_2px_rgba(255,255,255,0.2)]
                                        md:text-[62px]
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
   CHOOSE X / O
====================================================== */

function ChooseSide({ onChoose }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
            }}
            className="
                relative
                z-20
                mx-auto
                w-full
                max-w-[420px]
                rounded-[42px]
                border
                border-white/40
                bg-white/90
                p-7
                text-center
                shadow-[0_25px_70px_rgba(70,40,30,0.22)]
                backdrop-blur-xl
            "
        >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-3xl">
                🎮
            </div>

            <h1 className="text-3xl font-bold text-[#713b50]">
                Choose Your Side
            </h1>

            <p className="mt-2 text-sm text-gray-500">
                তুমি কোনটা নিয়ে খেলবে? 💗
            </p>

            <div className="mt-7 grid grid-cols-2 gap-4">
                <motion.button
                    type="button"
                    onClick={() => onChoose("X")}
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
                        border-orange-300
                        bg-orange-50
                        py-6
                        text-orange-500
                        shadow-lg
                    "
                >
                    <span className="text-6xl font-black">
                        ×
                    </span>

                    <span className="text-lg font-semibold">
                        X
                    </span>
                </motion.button>

                <motion.button
                    type="button"
                    onClick={() => onChoose("O")}
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
                        border-gray-300
                        bg-gray-50
                        py-6
                        text-black
                        shadow-lg
                    "
                >
                    <span className="text-6xl font-black">
                        ○
                    </span>

                    <span className="text-lg font-semibold">
                        O
                    </span>
                </motion.button>
            </div>

            <p className="mt-6 text-xs text-gray-400">
                One move is yours, then one move is mine 😌
            </p>
        </motion.div>
    )
}

/* ======================================================
   MAIN GAME
====================================================== */

export default function CrossGameScreen({ onNext }) {
    const [playerSide, setPlayerSide] =
        useState(null)

    const [board, setBoard] = useState(
        Array(9).fill(null)
    )

    const [turn, setTurn] = useState(null)

    const [result, setResult] =
        useState(null)

    const [winningLine, setWinningLine] =
        useState([])

    const [computerThinking, setComputerThinking] =
        useState(false)

    const [celebrating, setCelebrating] =
        useState(false)

    const computerSide =
        playerSide === "X" ? "O" : "X"

    /* ==================================================
       RESET GAME
    ================================================== */

    const startGame = (side) => {
        setPlayerSide(side)

        setBoard(Array(9).fill(null))

        setResult(null)

        setWinningLine([])

        setCelebrating(false)

        /*
          X always gets the first move.

          If player chooses X:
          player starts.

          If player chooses O:
          computer starts automatically.
        */

        if (side === "X") {
            setTurn("X")
        } else {
            setTurn("O")
        }
    }

    /* ==================================================
       CHECK RESULT AFTER EVERY MOVE
    ================================================== */

    useEffect(() => {
        if (!playerSide) return

        const gameResult = getWinner(board)

        if (!gameResult) return

        setResult(gameResult.winner)

        setWinningLine(gameResult.line)

        if (gameResult.winner === playerSide) {
            setCelebrating(true)
        }

        setComputerThinking(false)
        setTurn(null)
    }, [board, playerSide])

    /* ==================================================
       COMPUTER AUTO MOVE
    ================================================== */

    useEffect(() => {
        if (!playerSide) return

        if (result) return

        if (turn !== computerSide) return

        setComputerThinking(true)

        const timer = setTimeout(() => {
            setBoard((currentBoard) => {
                const move = getComputerMove(
                    currentBoard,
                    computerSide
                )

                if (move === null) {
                    return currentBoard
                }

                const nextBoard = [
                    ...currentBoard,
                ]

                nextBoard[move] =
                    computerSide

                return nextBoard
            })

            setTurn(playerSide)
            setComputerThinking(false)
        }, 700)

        return () =>
            clearTimeout(timer)
    }, [
        turn,
        computerSide,
        playerSide,
        result,
    ])

    /* ==================================================
       PLAYER MOVE
    ================================================== */

    const handleCellClick = (index) => {
        if (!playerSide) return

        if (result) return

        if (computerThinking) return

        if (turn !== playerSide) return

        if (board[index]) return

        const nextBoard = [...board]

        nextBoard[index] = playerSide

        setBoard(nextBoard)

        setTurn(computerSide)
    }

    /* ==================================================
       RESULT TEXT
    ================================================== */

    const resultTitle =
        result === playerSide
            ? "You Win! 🎉"
            : result === "draw"
              ? "It's a Draw! 🤍"
              : "Oops... You Lost 😭"

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
                z-50
                overflow-y-auto
                bg-[#fff8f2]
            "
        >
            {/* Background */}

            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,192,220,0.42),transparent_55%)]" />

            <div className="pointer-events-none fixed left-[-50px] top-20 text-7xl text-pink-100">
                ✦
            </div>

            <div className="pointer-events-none fixed right-[-30px] top-32 text-7xl text-purple-100">
                ✦
            </div>

            <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-8">
                <AnimatePresence mode="wait">
                    {/* ==================================================
                        CHOOSE SIDE
                    ================================================== */}

                    {!playerSide && (
                        <ChooseSide
                            key="choose"
                            onChoose={startGame}
                        />
                    )}

                    {/* ==================================================
                        GAME
                    ================================================== */}

                    {playerSide && !result && (
                        <motion.div
                            key="game"
                            initial={{
                                opacity: 0,
                                scale: 0.94,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            className="
                                relative
                                w-full
                                max-w-[440px]
                                rounded-[44px]
                                border
                                border-white/60
                                bg-white/85
                                p-5
                                shadow-[0_25px_70px_rgba(70,40,30,0.20)]
                                backdrop-blur-xl
                            "
                        >
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-sm text-gray-500">
                                        You are
                                    </span>

                                    <span
                                        className={`
                                            rounded-full
                                            px-4
                                            py-1
                                            text-xl
                                            font-black
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
                                    </span>
                                </div>

                                <h1 className="mt-3 text-2xl font-bold text-[#713b50]">
                                    Tic-Tac-Toe 💕
                                </h1>

                                <p className="mt-1 text-xs text-gray-400">
                                    {computerThinking
                                        ? "My turn... 🤔"
                                        : "Your turn — make a move ✨"}
                                </p>
                            </div>

                            <div className="mt-6">
                                <GameBoard
                                    board={board}
                                    onCellClick={
                                        handleCellClick
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

                            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                                <span>
                                    You:{" "}
                                    <b>
                                        {playerSide ===
                                        "X"
                                            ? "×"
                                            : "○"}
                                    </b>
                                </span>

                                <span>•</span>

                                <span>
                                    Me:{" "}
                                    <b>
                                        {computerSide ===
                                        "X"
                                            ? "×"
                                            : "○"}
                                    </b>
                                </span>
                            </div>
                        </motion.div>
                    )}

                    {/* ==================================================
                        RESULT
                    ================================================== */}

                    {playerSide && result && (
                        <motion.div
                            key="result"
                            initial={{
                                opacity: 0,
                                scale: 0.85,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            className="
                                relative
                                w-full
                                max-w-[420px]
                                rounded-[44px]
                                border
                                border-white/60
                                bg-white/90
                                p-7
                                text-center
                                shadow-[0_25px_80px_rgba(70,40,30,0.24)]
                                backdrop-blur-xl
                            "
                        >
                            {result === playerSide ? (
                                <>
                                    <motion.div
                                        animate={{
                                            rotate: [
                                                -8,
                                                8,
                                                -8,
                                            ],
                                            scale: [
                                                1,
                                                1.1,
                                                1,
                                            ],
                                        }}
                                        transition={{
                                            duration: 1.5,
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
                                        I knew you could do
                                        it, Cutie! 💗
                                    </p>

                                    <div className="mt-5 overflow-hidden rounded-[28px] border border-pink-100 bg-pink-50 p-3 shadow-inner">
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
                                                shadow-[0_10px_35px_rgba(255,80,170,0.3)]
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
                                    <div className="text-6xl">
                                        😭
                                    </div>

                                    <h1 className="mt-3 text-3xl font-bold text-[#713b50]">
                                        {resultTitle}
                                    </h1>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Don't worry... try
                                        again 💗
                                    </p>

                                    <div className="mt-5 overflow-hidden rounded-[28px] border border-gray-100 bg-gray-50 p-3 shadow-inner">
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

            {/* Celebration only when player wins */}

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
