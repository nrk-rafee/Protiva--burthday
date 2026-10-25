
"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const messageParagraphs = [
  {
    text: "Happy Birthday, Cutiepie! 💗",
    className: "text-[17px] font-medium text-gray-700",
  },
  {
    text: "You deserve all the happiness, love, and smiles in the world today and always.",
    className: "mt-5 text-[15px] leading-7 text-gray-600",
  },
  {
    text: "You have this special way of making everything around you brighter — your smile, your kindness, and the way you make people feel truly cared for.",
    className: "mt-5 text-[15px] leading-7 text-gray-600",
  },
  {
    text: "I hope your day is filled with laughter, surprises, and beautiful moments that make your heart happy.",
    className: "mt-5 text-[15px] leading-7 text-gray-600",
  },
  {
    text: "You're truly one of a kind, and I just want you to know how special you are.",
    className: "mt-5 text-[15px] leading-7 text-gray-600",
  },
  {
    text: "Wishing you endless happiness, success, and all the sweet things life has to offer. 💗",
    className: "mt-6 text-[15px] font-semibold leading-7 text-pink-500",
  },
  {
    text: "With lots of love 🫶",
    className: "mt-6 text-[19px] text-gray-800",
  },
]

const fullMessage = messageParagraphs.map((p) => p.text)

const snowflakes = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: (i % 11) * 0.42,
  duration: 6 + (i % 6) * 1.4,
  size: 3 + (i % 4) * 1.2,
  drift: ((i % 7) - 3) * 17,
  opacity: 0.25 + (i % 5) * 0.1,
}))

export default function MessageScreen({ onNext }) {
  const [started, setStarted] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [typingDone, setTypingDone] = useState(false)

  const completeMessage = fullMessage.join("\n\n")

  // Type the whole letter gradually after the envelope is opened.
  useEffect(() => {
    if (!started) return

    let index = 0
    let timeoutId

    setTypedText("")
    setTypingDone(false)

    const typeNextCharacter = () => {
      index += 1
      setTypedText(completeMessage.slice(0, index))

      if (index < completeMessage.length) {
        // Slightly varied speed for a natural typing effect.
        const character = completeMessage[index - 1]
        const delay =
          character === "\n"
            ? 180
            : ".!💗🫶".includes(character)
              ? 240
              : character === ","
                ? 110
                : 25

        timeoutId = setTimeout(typeNextCharacter, delay)
      } else {
        setTypingDone(true)
      }
    }

    timeoutId = setTimeout(typeNextCharacter, 500)

    return () => clearTimeout(timeoutId)
  }, [started, completeMessage])

  // Show each paragraph using the characters already typed.
  let characterOffset = 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="
        relative isolate mx-auto my-5
        flex min-h-[78dvh] w-full max-w-[440px]
        flex-col items-center justify-center
        overflow-hidden rounded-[42px]
        bg-[#fff8fc] px-4 py-7
        shadow-2xl shadow-pink-200/40
        sm:px-7 sm:py-9
      "
    >
      {/* Soft snowfall while the letter is being typed */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {snowflakes.map((flake) => (
          <motion.span
            key={flake.id}
            className="absolute -top-3 rounded-full bg-white"
            style={{
              left: flake.left,
              width: flake.size,
              height: flake.size,
              opacity: flake.opacity,
              boxShadow: "0 0 7px rgba(244, 114, 182, 0.3)",
            }}
            animate={
              started && !typingDone
                ? {
                    y: ["0%", "110dvh"],
                    x: [0, flake.drift, -flake.drift / 2, 0],
                    opacity: [
                      0,
                      flake.opacity,
                      flake.opacity * 0.8,
                      0,
                    ],
                  }
                : {
                    y: 0,
                    opacity: 0,
                  }
            }
            transition={
              started && !typingDone
                ? {
                    duration: flake.duration,
                    delay: flake.delay,
                    repeat: Infinity,
                    ease: "linear",
                  }
                : { duration: 0.4 }
            }
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex w-full flex-col items-center">
        <div className="mb-5 text-center">
          <h2 className="text-2xl font-semibold text-pink-600 sm:text-3xl">
            A Special Message 💌
          </h2>

          <p className="mt-2 text-sm text-pink-400">
            Just for you, Cutiepie 💗
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -15 }}
              transition={{ duration: 0.55 }}
              className="flex w-full flex-col items-center"
            >
              {/* GIF appears before opening the letter */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-5 flex h-36 w-full items-center justify-center"
              >
                <img
                  src="/gifs/msg.gif"
                  alt="A cute animated birthday message"
                  className="max-h-36 max-w-full object-contain"
                />
              </motion.div>

              <motion.button
                type="button"
                onClick={() => setStarted(true)}
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                className="
                  group flex min-h-[190px] w-full
                  flex-col items-center justify-center
                  rounded-[32px] border border-pink-400/30
                  bg-gradient-to-br from-[#fff0fa] via-white to-pink-100
                  px-5 py-8
                  shadow-[0_0_30px_rgba(236,72,153,0.13)]
                  transition-shadow duration-300
                  hover:shadow-[0_0_38px_rgba(236,72,153,0.24)]
                "
              >
                <motion.span
                  animate={{ scale: [1, 1.13, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="text-6xl"
                >
                  💌
                </motion.span>

                <span className="mt-5 text-center text-lg font-semibold text-pink-500">
                  Tap to see what's inside
                </span>

                <span className="mt-2 text-xs text-pink-300">
                  A little surprise, just for you ♡
                </span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 35, scale: 0.94, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              {/* Letter card stays centered */}
              <div
                className="
                  relative w-full overflow-hidden
                  rounded-[34px] border border-pink-100
                  bg-gradient-to-b from-white via-[#fff9fc] to-pink-100
                  p-5 shadow-inner sm:p-7
                "
              >
                <span className="absolute left-4 top-3 text-xl text-pink-300">
                  💗
                </span>

                <span className="absolute right-4 top-3 text-xl text-pink-300">
                  💗
                </span>

                <div className="min-h-[330px] pt-7 text-center sm:min-h-[350px]">
                  {messageParagraphs.map((paragraph, i) => {
                    const start = characterOffset
                    const end = start + paragraph.text.length
                    characterOffset = end + 2

                    const visibleText = typedText.slice(
                      start,
                      Math.min(end, typedText.length)
                    )

                    if (typedText.length <= start) return null

                    return (
                      <p key={i} className={paragraph.className}>
                        {visibleText}
                        {typedText.length < end &&
                          typedText.length >= start && (
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                              }}
                              className="ml-0.5 inline-block text-pink-500"
                            >
                              |
                            </motion.span>
                          )}
                      </p>
                    )
                  })}
                </div>

                <div className="mt-5 flex items-center justify-between px-1">
                  <span className="text-xl">🌸</span>
                  <span className="text-xs text-pink-300">
                    Made with love ♡
                  </span>
                  <span className="text-xl">🌸</span>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-5 text-center text-sm text-gray-400"
              >
                Made specially for you 💕
              </motion.p>

              {/* Continue button appears after the entire message is typed */}
              <AnimatePresence>
                {typingDone && (
                  <motion.button
                    type="button"
                    onClick={onNext}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.55 }}
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.96 }}
                    className="
                      mt-6 w-full rounded-full
                      bg-gradient-to-r from-pink-500 to-rose-500
                      px-6 py-4 font-bold text-white
                      shadow-lg shadow-pink-200
                      transition-shadow hover:shadow-xl
                    "
                  >
                    One Last Thing 💗 →
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
