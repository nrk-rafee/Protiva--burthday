
"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const paragraphs = [
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

const fullMessage = paragraphs.map((p) => p.text).join("\n\n")

const snowflakes = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: (i % 10) * 0.45,
  duration: 6 + (i % 5) * 1.5,
  size: 3 + (i % 3) * 1.5,
  drift: ((i % 7) - 3) * 15,
}))

export default function MessageScreen({ onNext }) {
  const [started, setStarted] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    if (!started) return

    let index = 0
    let timeoutId

    setTypedText("")
    setTypingDone(false)

    function typeNext() {
      index += 1
      setTypedText(fullMessage.slice(0, index))

      if (index < fullMessage.length) {
        const character = fullMessage[index - 1]

        const delay =
          character === "\n"
            ? 180
            : ".,!💗🫶".includes(character)
              ? 150
              : 27

        timeoutId = setTimeout(typeNext, delay)
      } else {
        setTypingDone(true)
      }
    }

    timeoutId = setTimeout(typeNext, 650)

    return () => clearTimeout(timeoutId)
  }, [started])

  let characterOffset = 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
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
      {/* Gentle snowfall during typing */}
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
              boxShadow: "0 0 7px rgba(244,114,182,0.35)",
            }}
            animate={
              started && !typingDone
                ? {
                    y: ["0%", "110dvh"],
                    x: [0, flake.drift, -flake.drift / 2, 0],
                    opacity: [0, 0.65, 0.4, 0],
                  }
                : { y: 0, opacity: 0 }
            }
            transition={
              started && !typingDone
                ? {
                    duration: flake.duration,
                    delay: flake.delay,
                    repeat: Infinity,
                    ease: "linear",
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>

      {/* Centered page content */}
      <div className="relative z-10 flex w-full flex-col items-center">
        <div className="mb-6 text-center">
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
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -12 }}
              transition={{ duration: 0.5 }}
              className="flex w-full flex-col items-center"
            >
              {/* Envelope above the clickable card */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-6 flex h-24 items-center justify-center text-[100px] leading-none"
                aria-hidden="true"
              >
                ✉️
              </motion.div>

              {/* GIF is INSIDE the card, not above it */}
              <motion.button
                type="button"
                onClick={() => setStarted(true)}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                className="
                  flex min-h-[220px] w-full
                  flex-col items-center justify-center
                  rounded-[32px] border border-pink-300/70
                  bg-gradient-to-br from-white via-[#fff8fc] to-pink-100
                  px-5 py-7
                  shadow-[0_0_28px_rgba(236,72,153,0.12)]
                  transition-shadow duration-300
                  hover:shadow-[0_0_35px_rgba(236,72,153,0.2)]
                "
              >
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="flex h-[105px] w-full items-center justify-center"
                >
                  <img
                    src="/gifs/msg.gif"
                    alt="A special animated message"
                    className="max-h-[105px] max-w-full object-contain"
                  />
                </motion.div>

                <span className="mt-4 text-center text-lg font-semibold text-pink-500">
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
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.92,
                rotateX: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              {/* Letter */}
              <div
                className="
                  relative w-full rounded-[34px]
                  border border-pink-100
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
                  {paragraphs.map((paragraph, i) => {
                    const start = characterOffset
                    const end = start + paragraph.text.length

                    characterOffset = end + 2

                    if (typedText.length <= start) return null

                    const visibleText = typedText.slice(
                      start,
                      Math.min(end, typedText.length)
                    )

                    const cursorVisible =
                      typedText.length >= start &&
                      typedText.length < end

                    return (
                      <p key={i} className={paragraph.className}>
                        {visibleText}

                        {cursorVisible && (
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

              {/* Appears only after typing is complete */}
              <AnimatePresence>
                {typingDone && (
                  <motion.button
                    type="button"
                    onClick={onNext}
                    initial={{ opacity: 0, y: 18, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
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
