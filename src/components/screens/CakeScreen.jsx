"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Flame, MoveRight } from "lucide-react"
import Button from "../Button"


// ======================================================
// CONFETTI COLORS
// ======================================================

const confettiColors = [
  "#ff8fab",
  "#ffb3c6",
  "#fca5a5",
  "#e9a8ff",
  "#ffd166",
  "#ffffff",
]


// ======================================================
// NIGHT DECORATION DATA
// ======================================================

const stars = [
  { left: "5%", top: "12%", size: 18, delay: 0 },
  { left: "16%", top: "25%", size: 13, delay: 0.8 },
  { left: "28%", top: "10%", size: 15, delay: 1.4 },
  { left: "40%", top: "22%", size: 11, delay: 0.4 },
  { left: "53%", top: "9%", size: 17, delay: 1.1 },
  { left: "65%", top: "27%", size: 13, delay: 1.8 },
  { left: "77%", top: "13%", size: 16, delay: 0.6 },
  { left: "90%", top: "24%", size: 12, delay: 1.5 },
  { left: "12%", top: "43%", size: 10, delay: 2 },
  { left: "87%", top: "45%", size: 15, delay: 0.9 },
]


const flowers = [
  {
    emoji: "🌸",
    left: "3%",
    bottom: "18%",
    size: 38,
    delay: 0,
    rotate: -8,
  },
  {
    emoji: "🌷",
    left: "13%",
    bottom: "8%",
    size: 34,
    delay: 0.7,
    rotate: 5,
  },
  {
    emoji: "🌺",
    left: "25%",
    bottom: "15%",
    size: 40,
    delay: 1.2,
    rotate: -5,
  },
  {
    emoji: "🌼",
    left: "39%",
    bottom: "7%",
    size: 34,
    delay: 0.4,
    rotate: 6,
  },
  {
    emoji: "🌸",
    left: "53%",
    bottom: "13%",
    size: 38,
    delay: 1.5,
    rotate: -6,
  },
  {
    emoji: "🌷",
    left: "67%",
    bottom: "7%",
    size: 35,
    delay: 0.8,
    rotate: 5,
  },
  {
    emoji: "🌺",
    left: "80%",
    bottom: "15%",
    size: 40,
    delay: 1.7,
    rotate: -5,
  },
  {
    emoji: "🌸",
    left: "91%",
    bottom: "8%",
    size: 35,
    delay: 0.3,
    rotate: 7,
  },
]


const balloons = [
  {
    left: "4%",
    color1: "#ff6b9d",
    color2: "#d92d6d",
    size: 72,
    delay: 0,
    duration: 4.8,
    rotate: -5,
  },
  {
    left: "15%",
    color1: "#ffd166",
    color2: "#e09b18",
    size: 64,
    delay: 0.8,
    duration: 5.5,
    rotate: 4,
  },
  {
    left: "28%",
    color1: "#8b7cff",
    color2: "#5b4ed1",
    size: 76,
    delay: 1.3,
    duration: 5.1,
    rotate: -4,
  },
  {
    left: "43%",
    color1: "#ff7eb6",
    color2: "#e83d7d",
    size: 68,
    delay: 0.4,
    duration: 5.7,
    rotate: 5,
  },
  {
    left: "57%",
    color1: "#62d9ff",
    color2: "#298ac7",
    size: 73,
    delay: 1.6,
    duration: 5,
    rotate: -4,
  },
  {
    left: "70%",
    color1: "#c084fc",
    color2: "#8b43c7",
    size: 66,
    delay: 0.7,
    duration: 5.4,
    rotate: 4,
  },
  {
    left: "83%",
    color1: "#ff8fab",
    color2: "#db4771",
    size: 76,
    delay: 1.1,
    duration: 5.8,
    rotate: -5,
  },
]


// ======================================================
// NIGHT BACKGROUND
// ======================================================

function NightBackground() {
  return (
    <motion.div
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
        duration: 1.4,
      }}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >

      {/* Main night background */}
      <div className="absolute inset-0 bg-[#080d2b]" />

      {/* Blue/purple glow */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_45%,rgba(86,75,180,0.35),transparent_58%)]
        "
      />

      {/* Moon */}
      <motion.div
        className="
          absolute
          top-8
          right-8
          md:right-16
          h-20
          w-20
          md:h-28
          md:w-28
          rounded-full
          bg-gradient-to-br
          from-[#fff1c7]
          to-[#e8b35e]
          shadow-[0_0_35px_rgba(255,210,130,0.35)]
        "
        animate={{
          y: [0, 4, 0, -3, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Moon cut-out */}
        <div
          className="
            absolute
            -right-3
            -top-2
            h-16
            w-16
            md:h-24
            md:w-24
            rounded-full
            bg-[#080d2b]
          "
        />
      </motion.div>


      {/* Stars */}
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute text-[#ffe3a3]"
          style={{
            left: star.left,
            top: star.top,
            fontSize: star.size,
            textShadow:
              "0 0 12px rgba(255,220,150,0.8)",
          }}
          initial={{
            opacity: 0.3,
            scale: 0.8,
          }}
          animate={{
            opacity: [0.3, 1, 0.4, 1, 0.3],
            scale: [0.8, 1.15, 0.9, 1.1, 0.8],
          }}
          transition={{
            duration: 3.5,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✦
        </motion.div>
      ))}


      {/* Tiny stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 25 }).map((_, index) => (
          <motion.span
            key={index}
            className="
              absolute
              h-1
              w-1
              rounded-full
              bg-white
            "
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 19) % 65}%`,
            }}
            animate={{
              opacity: [0.15, 0.8, 0.15],
            }}
            transition={{
              duration: 2 + (index % 3),
              delay: index * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>


      {/* Soft bottom glow */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-48
          bg-gradient-to-t
          from-purple-900/40
          to-transparent
        "
      />
    </motion.div>
  )
}


// ======================================================
// FLOWERS
// ======================================================

function FlowerDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">

      {flowers.map((flower, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: flower.left,
            bottom: flower.bottom,
            fontSize: flower.size,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            rotate: flower.rotate,
          }}
          animate={{
            opacity: 1,
            scale: [0, 1, 1.04, 1],
            rotate: [
              flower.rotate,
              flower.rotate + 5,
              flower.rotate - 5,
              flower.rotate,
            ],
            y: [0, -5, 0, -3, 0],
          }}
          transition={{
            duration: 1.2,
            delay: flower.delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
        >
          {flower.emoji}
        </motion.div>
      ))}

    </div>
  )
}


// ======================================================
// BALLOONS
// ======================================================

function BalloonDecoration() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-36 md:h-44 pointer-events-none z-20 overflow-hidden">

      {balloons.map((balloon, index) => (
        <motion.div
          key={index}
          className="absolute bottom-[-20px]"
          style={{
            left: balloon.left,
          }}
          initial={{
            y: 40,
            rotate: balloon.rotate,
          }}
          animate={{
            y: [
              40,
              5,
              18,
              0,
              40,
            ],
            rotate: [
              balloon.rotate,
              balloon.rotate + 5,
              balloon.rotate - 5,
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

          {/* Balloon */}
          <div
            className="relative rounded-[50%]"
            style={{
              width: balloon.size,
              height: balloon.size * 1.15,
              background: `
                radial-gradient(
                  circle at 30% 22%,
                  rgba(255,255,255,0.65),
                  transparent 13%
                ),
                linear-gradient(
                  145deg,
                  ${balloon.color1},
                  ${balloon.color2}
                )
              `,
              boxShadow:
                "inset -10px -14px 20px rgba(0,0,0,0.18), 0 4px 15px rgba(0,0,0,0.2)",
            }}
          >

            {/* Highlight */}
            <div
              className="
                absolute
                left-[20%]
                top-[15%]
                h-5
                w-3
                rotate-[-25deg]
                rounded-full
                bg-white/35
                blur-[1px]
              "
            />

            {/* Knot */}
            <div
              className="absolute left-1/2 -bottom-1 -translate-x-1/2"
              style={{
                width: 10,
                height: 9,
                background: balloon.color2,
                clipPath:
                  "polygon(0 0, 100% 0, 70% 100%, 30% 100%)",
              }}
            />

            {/* String */}
            <motion.div
              className="
                absolute
                left-1/2
                top-full
                w-[1px]
                h-12
                bg-white/25
                origin-top
              "
              animate={{
                rotate: [-3, 3, -3],
              }}
              transition={{
                duration: balloon.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

          </div>

        </motion.div>
      ))}

    </div>
  )
}


// ======================================================
// MAIN CAKE SCREEN
// ======================================================

export default function CakeScreen({ onNext }) {

  const [lit, setLit] = useState(false)


  const burst = () => {
    confetti({
      particleCount: 90,
      spread: 100,
      startVelocity: 30,
      origin: {
        y: 0.55,
      },
      colors: confettiColors,
    })
  }


  const lightCandle = () => {

    if (lit) return

    setLit(true)

    setTimeout(() => {
      burst()
    }, 600)

  }


  return (
    <motion.div
      animate={{
        backgroundColor: lit
          ? "#0b1033"
          : "#fff8fc",
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
      }}
      className="
        relative
        overflow-hidden
        p-7
        rounded-[60px]
        drop-shadow-2xl
        min-w-48
        w-full
        max-w-110
        flex
        flex-col
        items-center
        gap-4
        my-10
        min-h-[650px]
      "
    >

      {/* ==================================================
          NIGHT BACKGROUND
      ================================================== */}

      <AnimatePresence>
        {lit && <NightBackground />}
      </AnimatePresence>


      {/* ==================================================
          FLOWERS
      ================================================== */}

      <AnimatePresence>
        {lit && <FlowerDecoration />}
      </AnimatePresence>


      {/* ==================================================
          BALLOONS
      ================================================== */}

      <AnimatePresence>
        {lit && <BalloonDecoration />}
      </AnimatePresence>


      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <div className="relative z-40 w-full flex flex-col items-center">

        {/* Birthday title */}

        <motion.div
          className="
            relative
            w-full
            text-center
            text-3xl
            md:text-4xl
            font-semibold
            drop-shadow
            leading-tight
            px-4
          "
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            color: lit ? "#ffd1e5" : "#a23b61",
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: lit ? 0.5 : 0,
          }}
        >
          Happy Birthday, Cutiepiee!
        </motion.div>


        {/* ==================================================
            CAKE AREA
        ================================================== */}

        <motion.div
          className="
            relative
            flex
            flex-col
            items-center
            gap-8
            w-full
            mt-6
            rounded-[40px]
            overflow-hidden
          "
          animate={{
            background: lit
              ? "linear-gradient(to bottom, #252852, #121738)"
              : "linear-gradient(to bottom, rgba(255,255,255,0.8), #fecdd3)",
            boxShadow: lit
              ? "inset 0 0 40px rgba(120,100,255,0.18), 0 0 30px rgba(100,80,200,0.15)"
              : "inset 0 0 25px rgba(255,255,255,0.7)",
          }}
          transition={{
            duration: 1.5,
          }}
          style={{
            minHeight: 290,
          }}
        >

          {/* Small stars around cake */}

          <AnimatePresence>
            {lit && (
              <>
                <motion.div
                  className="absolute top-8 left-8 text-yellow-200 text-xl z-20"
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  ✨
                </motion.div>

                <motion.div
                  className="absolute top-16 right-8 text-pink-200 text-lg z-20"
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2.3,
                    repeat: Infinity,
                  }}
                >
                  ✨
                </motion.div>
              </>
            )}
          </AnimatePresence>


          {/* Cake */}

          <div className="relative z-30 flex items-end justify-center w-full h-72 pb-10">

            <Cake lit={lit} />

          </div>

        </motion.div>


        {/* ==================================================
            BUTTON
        ================================================== */}

        <div className="relative z-50 mt-7">

          <AnimatePresence mode="wait">

            {!lit ? (

              <motion.div
                key="light"
                initial={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  y: 10,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >

                <Button
                  onClick={lightCandle}
                  className="bg-[#ffccd3] text-secondary"
                >
                  <Flame
                    size={18}
                    className="mb-0.5"
                  />

                  Light the Candle
                </Button>

              </motion.div>

            ) : (

              <motion.div
                key="next"
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 2,
                  ease: "easeOut",
                }}
              >

                <Button
                  onClick={onNext}
                  className="
                    bg-gradient-to-r
                    from-pink-400
                    to-fuchsia-500
                    text-white
                    shadow-[0_0_25px_rgba(255,80,170,0.25)]
                  "
                >
                  Next

                  <MoveRight
                    size={18}
                    className="mt-0.5"
                  />

                </Button>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </div>


      {/* ==================================================
          SIGNATURE
      ================================================== */}

      <div
        className="
          fixed
          bottom-4
          right-4
          z-[60]
          text-sm
          pointer-events-none
        "
      >
        <motion.span
          animate={{
            color: lit
              ? "rgba(255,255,255,0.45)"
              : "rgba(120,120,120,0.55)",
          }}
          transition={{
            duration: 1,
          }}
        >
          @Rafee🫶protiva
        </motion.span>
      </div>

    </motion.div>
  )
}


// ======================================================
// CAKE
// ======================================================

function Cake({ lit }) {

  return (

    <div className="flex flex-col items-center">

      <div className="cake">

        <div className="plate"></div>

        <div className="layer layer-bottom"></div>

        <div className="layer layer-middle"></div>

        <div className="layer layer-top"></div>

        <div className="icing"></div>

        <div className="drip drip1"></div>

        <div className="drip drip2"></div>

        <div className="drip drip3"></div>


        {/* Candle */}

        <div className="candle">

          <AnimatePresence>

            {lit && (

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  y: 10,
                }}
                animate={{
                  opacity: [0, 1, 0.85, 1],
                  scale: [0.2, 1.15, 0.9, 1],
                  y: [10, 0, -2, 0],
                }}
                transition={{
                  duration: 0.9,
                  ease: "easeOut",
                }}
                className="relative"
              >

                {/* Flame glow */}

                <motion.div
                  className="
                    absolute
                    -inset-5
                    rounded-full
                    bg-orange-400/30
                    blur-xl
                  "
                  animate={{
                    opacity: [0.35, 0.8, 0.4, 0.75],
                    scale: [0.8, 1.2, 0.9, 1.1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />


                {/* Actual flame */}

                <motion.div
                  className="flame relative z-10"
                  animate={{
                    scale: [1, 1.08, 0.94, 1.05, 1],
                    rotate: [-2, 2, -2, 1, -2],
                  }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </div>

    </div>

  )
}
