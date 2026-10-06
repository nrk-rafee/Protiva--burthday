"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Flame, MoveRight } from "lucide-react"
import Button from "../Button"

const confettiColors = [
  "#ff8fab",
  "#ffb3c6",
  "#fca5a5",
  "#e9a8ff",
  "#ffd166",
  "#ffffff",
]

// Stars
const stars = [
  { left: "5%", top: "10%", size: 18, delay: 0 },
  { left: "13%", top: "24%", size: 12, delay: 0.5 },
  { left: "22%", top: "8%", size: 15, delay: 1 },
  { left: "31%", top: "18%", size: 10, delay: 1.5 },
  { left: "42%", top: "7%", size: 16, delay: 0.7 },
  { left: "52%", top: "25%", size: 12, delay: 1.2 },
  { left: "63%", top: "11%", size: 17, delay: 0.3 },
  { left: "73%", top: "21%", size: 11, delay: 1.7 },
  { left: "83%", top: "8%", size: 15, delay: 0.9 },
  { left: "94%", top: "25%", size: 13, delay: 1.4 },

  { left: "8%", top: "43%", size: 10, delay: 1.8 },
  { left: "20%", top: "37%", size: 14, delay: 0.4 },
  { left: "78%", top: "39%", size: 12, delay: 1.1 },
  { left: "91%", top: "46%", size: 15, delay: 0.6 },
]

// Balloons
const balloons = [
  {
    left: "1%",
    color1: "#ff6b9d",
    color2: "#d92d6d",
    size: 65,
    delay: 0,
    duration: 5,
    rotate: -5,
  },
  {
    left: "13%",
    color1: "#ffd166",
    color2: "#e09b18",
    size: 58,
    delay: 0.7,
    duration: 5.5,
    rotate: 4,
  },
  {
    left: "25%",
    color1: "#8174ff",
    color2: "#5143c8",
    size: 70,
    delay: 1,
    duration: 5.2,
    rotate: -4,
  },
  {
    left: "39%",
    color1: "#ff7eb6",
    color2: "#e83d7d",
    size: 62,
    delay: 0.4,
    duration: 5.7,
    rotate: 5,
  },
  {
    left: "53%",
    color1: "#62d9ff",
    color2: "#298ac7",
    size: 68,
    delay: 1.3,
    duration: 5,
    rotate: -4,
  },
  {
    left: "67%",
    color1: "#c084fc",
    color2: "#8b43c7",
    size: 60,
    delay: 0.6,
    duration: 5.4,
    rotate: 4,
  },
  {
    left: "80%",
    color1: "#ff8fab",
    color2: "#db4771",
    size: 68,
    delay: 1,
    duration: 5.8,
    rotate: -5,
  },
  {
    left: "92%",
    color1: "#ff6b9d",
    color2: "#d92d6d",
    size: 58,
    delay: 0.3,
    duration: 5.2,
    rotate: 5,
  },
]

function NightBackground() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Main night sky */}
      <div className="absolute inset-0 bg-[#070b2b]" />

      {/* Purple / blue night glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(91,78,190,0.38),transparent_58%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(87,55,160,0.25),transparent_40%)]" />

      {/* FULL ROUND MOON */}
      <motion.div
        className="
          absolute
          top-10
          right-8
          md:right-16
          w-20
          h-20
          md:w-28
          md:h-28
          rounded-full
          bg-white
          shadow-[0_0_45px_rgba(255,255,255,0.65)]
        "
        animate={{
          y: [0, 4, 0, -3, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Moon soft glow */}
      <div className="absolute top-6 right-4 md:right-12 w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/10 blur-2xl" />

      {/* Stars */}
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute text-[#fff4c7]"
          style={{
            left: star.left,
            top: star.top,
            fontSize: star.size,
            textShadow: "0 0 14px rgba(255,240,180,0.9)",
          }}
          initial={{
            opacity: 0.25,
            scale: 0.8,
          }}
          animate={{
            opacity: [0.25, 1, 0.4, 1, 0.25],
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
      {Array.from({ length: 35 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            left: `${(index * 31) % 100}%`,
            top: `${(index * 17) % 78}%`,
          }}
          animate={{
            opacity: [0.1, 0.8, 0.15],
          }}
          transition={{
            duration: 2 + (index % 3),
            delay: index * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Bottom purple glow */}
      <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-purple-950/70 via-purple-900/20 to-transparent" />
    </motion.div>
  )
}

function BalloonDecoration() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-32 md:h-40 pointer-events-none z-20 overflow-hidden">
      {balloons.map((balloon, index) => (
        <motion.div
          key={index}
          className="absolute bottom-[-18px]"
          style={{
            left: balloon.left,
          }}
          initial={{
            y: 60,
            rotate: balloon.rotate,
          }}
          animate={{
            y: [60, 10, 20, 0, 60],
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
                "inset -10px -14px 20px rgba(0,0,0,0.18), 0 4px 15px rgba(0,0,0,0.25)",
            }}
          >
            {/* Balloon highlight */}
            <div className="absolute left-[20%] top-[15%] h-5 w-3 rotate-[-25deg] rounded-full bg-white/35 blur-[1px]" />

            {/* Balloon knot */}
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
              className="absolute left-1/2 top-full w-[1px] h-12 bg-white/30 origin-top"
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

export default function CakeScreen({ onNext }) {
  const [lit, setLit] = useState(false)

  const burst = () => {
    confetti({
      particleCount: 100,
      spread: 110,
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
          ? "#070b2b"
          : "#fff8fc",
      }}
      transition={{
        duration: 1.4,
      }}
      className={
        lit
          ? "fixed inset-0 z-[100] overflow-hidden min-h-screen w-screen"
          : "relative overflow-hidden bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 flex flex-col items-center gap-4 my-10 min-h-[650px]"
      }
    >
      {/* Full screen night background */}
      <AnimatePresence>
        {lit && <NightBackground />}
      </AnimatePresence>

      {/* Balloons only — flowers removed */}
      <AnimatePresence>
        {lit && <BalloonDecoration />}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-40 min-h-screen w-full flex flex-col items-center justify-center px-5 py-8">
        
        {/* Birthday title */}
        <motion.div
          className="w-full max-w-[430px] text-center text-3xl md:text-4xl font-semibold drop-shadow leading-tight"
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            color: lit
              ? "#ffc9df"
              : "#a23b61",
          }}
          transition={{
            duration: 1,
            delay: lit ? 0.4 : 0,
          }}
        >
          Happy Birthday, Cutiepiee!
        </motion.div>

        {/* Cake area */}
        <motion.div
          className="relative flex flex-col items-center justify-center w-full max-w-[560px] mt-7 rounded-[40px] overflow-hidden"
          animate={{
            background: lit
              ? "linear-gradient(to bottom, #282b60, #111735)"
              : "linear-gradient(to bottom, rgba(255,255,255,0.8), #fecdd3)",

            boxShadow: lit
              ? "0 0 50px rgba(91,78,190,0.25), inset 0 0 50px rgba(100,80,200,0.18)"
              : "inset 0 0 25px rgba(255,255,255,0.7)",
          }}
          transition={{
            duration: 1.5,
          }}
          style={{
            minHeight: 310,
          }}
        >
          {/* Small sparkle */}
          {lit && (
            <>
              <motion.div
                className="absolute top-8 left-8 text-yellow-200 text-xl z-20"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                ✨
              </motion.div>

              <motion.div
                className="absolute top-16 right-8 text-yellow-200 text-xl z-20"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
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

          <div className="relative z-30 flex items-end justify-center w-full h-80 pb-8">
            <Cake lit={lit} />
          </div>
        </motion.div>

        {/* Button */}
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
                }}
              >
                <Button
                  onClick={lightCandle}
                  className="bg-[#ffccd3] text-secondary"
                >
                  <Flame size={18} className="mb-0.5" />
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
                }}
              >
                <Button
                  onClick={onNext}
                  className="
                    bg-gradient-to-r
                    from-pink-400
                    to-fuchsia-500
                    text-white
                    shadow-[0_0_30px_rgba(255,80,170,0.35)]
                  "
                >
                  Next
                  <MoveRight size={18} className="mt-0.5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Signature */}
      <motion.div
        className="fixed bottom-2 right-3 z-[120] text-sm pointer-events-none"
        animate={{
          color: lit
            ? "rgba(255,255,255,0.45)"
            : "rgba(120,120,120,0.55)",
        }}
      >
        @Rafee🫶protiva
      </motion.div>
    </motion.div>
  )
}

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
                    opacity: [0.3, 0.8, 0.4, 0.75],
                    scale: [0.8, 1.2, 0.9, 1.1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Flame */}
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
