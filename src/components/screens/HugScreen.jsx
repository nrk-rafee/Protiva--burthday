
"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function HugScreen() {
  const [progress, setProgress] = useState(0)
  const [received, setReceived] = useState(false)
  const [holding, setHolding] = useState(false)

  const intervalRef = useRef(null)
  const startTimeRef = useRef(0)
  const receivedRef = useRef(false)

  const stopHolding = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setHolding(false)

    if (!receivedRef.current) {
      setProgress(0)
    }
  }

  const startHolding = (event) => {
    event.preventDefault()

    if (receivedRef.current || intervalRef.current) return

    startTimeRef.current = Date.now()
    setProgress(0)
    setHolding(true)

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const nextProgress = Math.min((elapsed / 2200) * 100, 100)

      setProgress(nextProgress)

      if (nextProgress >= 100) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        receivedRef.current = true
        setReceived(true)
        setHolding(false)
        setProgress(100)
      }
    }, 25)
  }

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#fff9d9] via-[#f7ffeb] to-[#f5ffe5] px-5 py-10">
      {/* Decorative flowers */}
      <div className="pointer-events-none absolute -left-8 -top-8 text-8xl opacity-70">
        🌺
      </div>
      <div className="pointer-events-none absolute -right-8 -top-8 text-7xl opacity-60">
        🌼
      </div>
      <div className="pointer-events-none absolute -bottom-8 -left-5 text-7xl opacity-60">
        🌸
      </div>
      <div className="pointer-events-none absolute -bottom-8 -right-5 text-8xl opacity-70">
        🌷
      </div>

      <motion.section
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65 }}
        className="relative z-10 w-full max-w-[440px] rounded-[42px] bg-[#fffef6]/95 px-6 py-10 text-center shadow-[0_25px_70px_rgba(70,80,40,0.20)] sm:px-10"
      >
        {!received ? (
          <>
            <h1 className="font-serif text-3xl font-bold italic leading-tight text-slate-800 sm:text-4xl">
              Sending You a
              <br />
              Virtual Hug!
            </h1>

            <p className="mt-4 text-sm text-slate-500">
              A little hug, made just for you 💗
            </p>

            {/* Progress bar */}
            <div
              className="mt-8 h-4 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner"
              role="progressbar"
              aria-label="Hug progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Hold button */}
            <button
              type="button"
              onPointerDown={startHolding}
              onPointerUp={stopHolding}
              onPointerLeave={stopHolding}
              onPointerCancel={stopHolding}
              onContextMenu={(event) => event.preventDefault()}
              style={{ touchAction: "none", userSelect: "none" }}
              className={`mt-8 flex min-h-[82px] w-full select-none items-center justify-center gap-3 rounded-[23px] border-2 border-pink-300 bg-pink-100 px-4 py-4 text-lg font-bold text-rose-600 shadow-sm transition-transform ${
                holding ? "scale-[0.98] bg-pink-200" : "active:scale-[0.98]"
              }`}
            >
              <span className="text-2xl">❤️</span>
              <span>
                {holding
                  ? "Keep Holding..."
                  : "Press & Hold to Receive"}
              </span>
            </button>

            <p className="mt-6 text-sm font-medium text-slate-400">
              {holding
                ? "Almost there... 💗"
                : "Hold until the hug is received 💕"}
            </p>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="py-5"
          >
            
<div className="mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-teal-200 to-cyan-300 shadow-xl">
  <img
    src="/gifs/12%20(1).webp"
    alt="A warm virtual hug"
    width="128"
    height="128"
    loading="eager"
    decoding="async"
    className="h-full w-full object-contain"
  />
</div>


            <h1 className="mt-8 font-serif text-3xl font-bold italic text-slate-800 sm:text-4xl">
              Hug Received!
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Many many happy returns of the day
            </p>

            <p className="mt-3 text-2xl">
              💝🌸🥀
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-sm text-pink-500"
            >
              Sending you lots of happiness and love 💗
            </motion.div>
          </motion.div>
        )}
      </motion.section>
    </main>
  )
}
