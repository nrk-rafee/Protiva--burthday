"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Mail, MoveRight } from "lucide-react"

// ======================================================
// PUZZLE IMAGES
// ======================================================

const PUZZLES = [
  "/images/Screenshot_20261004-114337~2.jpg",
  "/images/puzzle.jpeg",
]

// ======================================================
// SHUFFLE PUZZLE
// ======================================================

function createShuffledPuzzle() {
  const original = Array.from(
    { length: 9 },
    (_, index) => index
  )

  let shuffled

  do {
    shuffled = [...original].sort(
      () => Math.random() - 0.5
    )
  } while (
    shuffled.every(
      (value, index) => value === index
    )
  )

  return shuffled
}

// ======================================================
// CONFETTI
// ======================================================

function Confetti() {
  const pieces = useMemo(() => {
    return Array.from(
      { length: 65 },
      (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        delay: `${(index % 15) * 0.04}s`,
        duration: `${2.2 + (index % 5) * 0.25}s`,
        rotate: `${(index * 43) % 360}deg`,
      })
    )
  }, [])

  return (
    <div
      className="
        fixed
        inset-0
        z-[500]
        pointer-events-none
        overflow-hidden
      "
    >
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="
            absolute
            top-[-20px]
            h-3
            w-2
            rounded-sm
          "
          style={{
            left: piece.left,
            background:
              piece.id % 4 === 0
                ? "#ff6fae"
                : piece.id % 4 === 1
                ? "#ffd166"
                : piece.id % 4 === 2
                ? "#b77cff"
                : "#7ddff2",
          }}
          initial={{
            y: -30,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            opacity: [0, 1, 1, 0],
            rotate: 720,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

// ======================================================
// PUZZLE PIECE
// ======================================================

function PuzzlePiece({
  puzzleImage,
  piece,
  index,
  selected,
  onSelect,
}) {
  const row = Math.floor(piece / 3)
  const column = piece % 3

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(index)}
      className={`
        relative
        aspect-square
        overflow-hidden
        border-[1.5px]
        border-white
        bg-white
        outline-none
        touch-manipulation
        select-none

        ${
          selected
            ? "z-20 ring-4 ring-pink-400/70"
            : ""
        }
      `}
      whileTap={{
        scale: 0.94,
      }}
      animate={
        selected
          ? {
              scale: 1.04,
              y: -3,
            }
          : {
              scale: 1,
              y: 0,
            }
      }
      transition={{
        duration: 0.18,
      }}
      aria-label={`Puzzle piece ${index + 1}`}
    >
      <div
        className="
          absolute
          inset-0
        "
        style={{
          backgroundImage: `url("${puzzleImage}")`,
          backgroundSize: "300% 300%",
          backgroundPosition: `${column * 50}% ${row * 50}%`,
          backgroundRepeat: "no-repeat",
        }}
      />

      {selected && (
        <div
          className="
            absolute
            inset-0
            bg-pink-400/10
            pointer-events-none
          "
        />
      )}
    </motion.button>
  )
}

// ======================================================
// MAIN PUZZLE SCREEN
// ======================================================

export default function PuzzleScreen({ onNext }) {
  const puzzleInitRef = useRef(false)

  const [puzzleImage, setPuzzleImage] =
    useState(null)

  const [preview, setPreview] =
    useState(true)

  const [pieces, setPieces] = useState(
    Array.from(
      { length: 9 },
      (_, index) => index
    )
  )

  const [selected, setSelected] =
    useState(null)

  const [solved, setSolved] =
    useState(false)

  const [moves, setMoves] =
    useState(0)

  // ====================================================
  // SELECT ALTERNATING PUZZLE
  //
  // 1st = cake
  // 2nd = puzzle.jpeg
  // 3rd = cake
  // 4th = puzzle.jpeg
  // ====================================================

  useEffect(() => {
    if (puzzleInitRef.current) {
      return
    }

    puzzleInitRef.current = true

    try {
      const saved =
        localStorage.getItem(
          "protiva-puzzle-turn"
        )

      const currentTurn =
        saved === "1" ? 1 : 0

      setPuzzleImage(
        PUZZLES[currentTurn]
      )

      const nextTurn =
        currentTurn === 0 ? 1 : 0

      localStorage.setItem(
        "protiva-puzzle-turn",
        String(nextTurn)
      )
    } catch {
      setPuzzleImage(
        PUZZLES[0]
      )
    }
  }, [])

  // ====================================================
  // PREVIEW TIMER
  // ====================================================

  useEffect(() => {
    if (!puzzleImage) {
      return
    }

    const timer = setTimeout(() => {
      setPieces(
        createShuffledPuzzle()
      )

      setPreview(false)
    }, 1800)

    return () => {
      clearTimeout(timer)
    }
  }, [puzzleImage])

  // ====================================================
  // CHECK SOLUTION
  // ====================================================

  function checkSolved(currentPieces) {
    return currentPieces.every(
      (piece, index) =>
        piece === index
    )
  }

  // ====================================================
  // PIECE CLICK
  // ====================================================

  function handlePieceClick(index) {
    if (
      preview ||
      solved ||
      !puzzleImage
    ) {
      return
    }

    // First piece
    if (selected === null) {
      setSelected(index)
      return
    }

    // Same piece
    if (selected === index) {
      setSelected(null)
      return
    }

    // Swap
    const newPieces = [
      ...pieces,
    ]

    const first = selected
    const second = index

    ;[
      newPieces[first],
      newPieces[second],
    ] = [
      newPieces[second],
      newPieces[first],
    ]

    setPieces(newPieces)
    setSelected(null)

    setMoves(
      (value) => value + 1
    )

    // Check solved
    if (
      checkSolved(newPieces)
    ) {
      setTimeout(() => {
        setSolved(true)
      }, 350)
    }
  }

  // ====================================================
  // OPEN MESSAGE
  // ====================================================

  function handleOpenMessage(event) {
    event.preventDefault()
    event.stopPropagation()

    if (
      typeof onNext ===
      "function"
    ) {
      onNext()
    }
  }

  // ====================================================
  // LOADING
  // ====================================================

  if (!puzzleImage) {
    return (
      <div
        className="
          fixed
          inset-0
          z-[9999]
          flex
          items-center
          justify-center
          bg-[#fff7fa]
        "
      >
        <div
          className="
            rounded-full
            bg-white
            px-6
            py-3
            text-sm
            font-medium
            text-pink-500
            shadow-lg
          "
        >
          Preparing your puzzle... 🧩
        </div>
      </div>
    )
  }

  // ====================================================
  // MAIN
  // ====================================================

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
        z-[100]
        overflow-hidden
        bg-[#fff7fa]
      "
    >

      {/* ==================================================
          BACKGROUND
      ================================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
        "
      >

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_35%,rgba(255,205,220,0.55),transparent_65%)]
          "
        />

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-72
            bg-gradient-to-b
            from-pink-100/80
            to-transparent
          "
        />

        <motion.div
          className="
            absolute
            left-[8%]
            top-[24%]
            text-2xl
            text-pink-200
          "
          animate={{
            y: [0, -12, 0],
            opacity: [
              0.35,
              0.8,
              0.35,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          ♡
        </motion.div>

        <motion.div
          className="
            absolute
            right-[10%]
            top-[30%]
            text-3xl
            text-pink-200
          "
          animate={{
            y: [0, -15, 0],
            opacity: [
              0.3,
              0.75,
              0.3,
            ],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
          }}
        >
          ♡
        </motion.div>

        <div
          className="
            absolute
            left-[-15px]
            bottom-16
            text-7xl
            text-pink-100
          "
        >
          ✦
        </div>

        <div
          className="
            absolute
            right-[-15px]
            bottom-20
            text-7xl
            text-pink-100
          "
        >
          ♡
        </div>
      </div>

      {/* ==================================================
          BUNTING
      ================================================== */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          z-10
          pointer-events-none
        "
      >
        <svg
          className="h-28 w-full"
          viewBox="0 0 400 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 8 Q100 75 200 8 Q300 75 400 8"
            fill="none"
            stroke="#ef9bb9"
            strokeWidth="2"
          />

          <path
            d="M5 18 L30 18 L17 45 Z"
            fill="#ffb5c9"
          />

          <path
            d="M42 38 L67 38 L54 65 Z"
            fill="#ff8fb5"
          />

          <path
            d="M80 50 L105 50 L92 77 Z"
            fill="#ffd166"
          />

          <path
            d="M118 52 L143 52 L130 80 Z"
            fill="#c084fc"
          />

          <path
            d="M156 42 L181 42 L168 70 Z"
            fill="#8be9fd"
          />

          <path
            d="M195 20 L220 20 L207 48 Z"
            fill="#ff8fab"
          />

          <path
            d="M234 38 L259 38 L246 65 Z"
            fill="#ffb3c6"
          />

          <path
            d="M274 50 L299 50 L286 77 Z"
            fill="#ffd166"
          />

          <path
            d="M314 38 L339 38 L326 65 Z"
            fill="#c084fc"
          />

          <path
            d="M354 18 L379 18 L366 45 Z"
            fill="#ff8fab"
          />
        </svg>
      </div>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div
        className="
          relative
          z-20
          flex
          min-h-screen
          flex-col
          items-center
          px-4
          pt-28
          pb-24
        "
      >

        {/* TITLE */}

        <motion.h1
          className="
            text-center
            text-2xl
            font-semibold
            text-[#303b50]
            md:text-3xl
          "
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          Fix the Picture 🧩
        </motion.h1>

        {/* INSTRUCTION */}

        <motion.div
          className="
            mt-4
            rounded-full
            bg-white
            px-5
            py-2.5
            text-center
            text-sm
            font-medium
            text-pink-500
            shadow-[0_5px_15px_rgba(120,70,100,0.12)]
          "
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
        >
          {preview
            ? "Memorize the picture! 🥰"
            : solved
            ? "Perfect! You did it! 💗"
            : selected === null
            ? "Tap two pieces to swap them!"
            : "Now tap another piece to swap!"}
        </motion.div>

        {/* ==================================================
            PUZZLE CARD
        ================================================== */}

        <motion.div
          className="
            relative
            mt-7
            w-full
            max-w-[470px]
            rounded-[34px]
            border
            border-dashed
            border-gray-400/60
            bg-white/75
            p-4
            shadow-[0_15px_45px_rgba(120,70,100,0.12)]
            backdrop-blur-sm
          "
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <AnimatePresence mode="wait">

            {/* PREVIEW */}

            {preview ? (
              <motion.div
                key="preview"
                initial={{
                  opacity: 0,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                }}
                className="
                  relative
                  aspect-square
                  w-full
                  overflow-hidden
                  rounded-2xl
                  bg-white
                "
              >
                <img
                  src={puzzleImage}
                  alt="Birthday puzzle preview"
                  draggable="false"
                  className="
                    h-full
                    w-full
                    object-cover
                    select-none
                    pointer-events-none
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-white/5
                    pointer-events-none
                  "
                />
              </motion.div>
            ) : (

              /* PUZZLE */

              <motion.div
                key="puzzle"
                initial={{
                  opacity: 0,
                  scale: 0.94,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="
                  grid
                  aspect-square
                  w-full
                  grid-cols-3
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  shadow-inner
                "
              >
                {pieces.map(
                  (piece, index) => (
                    <PuzzlePiece
                      key={`${piece}-${index}`}
                      puzzleImage={
                        puzzleImage
                      }
                      piece={piece}
                      index={index}
                      selected={
                        selected ===
                        index
                      }
                      onSelect={
                        handlePieceClick
                      }
                    />
                  )
                )}
              </motion.div>
            )}

          </AnimatePresence>

          {/* SOLVED GLOW */}

          {solved && (
            <motion.div
              className="
                pointer-events-none
                absolute
                inset-2
                rounded-[26px]
                ring-4
                ring-pink-300/70
              "
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: [
                  0,
                  1,
                  0.5,
                ],
                scale: [
                  0.95,
                  1,
                  1.02,
                ],
              }}
              transition={{
                duration: 1,
              }}
            />
          )}

        </motion.div>

        {/* MOVES */}

        {!preview &&
          !solved && (
            <motion.p
              className="
                mt-5
                text-sm
                font-medium
                text-gray-500
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >
              Swaps: {moves}
            </motion.p>
          )}

      </div>

      {/* ==================================================
          IMPORTANT:
          MESSAGE BUTTON IS OUTSIDE MAIN CONTENT
          
          This is the actual fix.
      ================================================== */}

      {solved && (
        <div
          className="
            fixed
            inset-x-0
            bottom-20
            z-[9999]
            flex
            justify-center
            pointer-events-none
            px-4
          "
        >
          <motion.button
            type="button"
            onClick={handleOpenMessage}
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 16,
            }}
            className="
              pointer-events-auto
              relative
              z-[9999]
              flex
              min-h-[54px]
              min-w-[250px]
              cursor-pointer
              touch-manipulation
              select-none
              items-center
              justify-center
              gap-2
              rounded-full
              bg-gradient-to-r
              from-pink-400
              to-fuchsia-500
              px-7
              py-3
              font-medium
              text-white
              shadow-[0_8px_30px_rgba(255,80,170,0.4)]
              outline-none
              transition-transform
              duration-200
              hover:scale-105
              active:scale-95
            "
          >
            <Mail
              size={18}
            />

            <span>
              Open My Message Cutie
            </span>

            <MoveRight
              size={18}
            />
          </motion.button>
        </div>
      )}

      {/* CONFETTI */}

      {solved && (
        <Confetti />
      )}

      {/* ==================================================
          FOOTER
      ================================================== */}

      <div
        className="
          fixed
          bottom-3
          right-4
          z-[800]
          text-sm
          text-gray-400/70
        "
      >
        @Rafee🫶protiva
      </div>

    </motion.div>
  )
}
