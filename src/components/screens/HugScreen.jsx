
"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function HugScreen() {
  const [progress, setProgress] = useState(0)
  const [holding, setHolding] = useState(false)
  const [videoSrc, setVideoSrc] = useState(
    "/Iv_0_20261030155231~2.mp4"
  )

  const intervalRef = useRef(null)
  const startTimeRef = useRef(0)

  const stopHolding = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    setHolding(false)
    setProgress(0)
  }

  const startHolding = (event) => {
    event.preventDefault()

    if (intervalRef.current) return

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
      }
    }, 25)
  }

  const handleVideoError = () => {
    if (videoSrc === "/Iv_0_20261030155231~2.mp4") {
      setVideoSrc("/lv_0_20261030155231~2.mp4")
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
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
        className="relative z-10 w-full max-w-[440px] rounded-[42px] bg-[#fffef6]/95 px-6 py-8 text-center shadow-[0_25px_70px_rgba(70,80,40,0.20)] sm:px-10 sm:py-10"
      >

        {/* Video / Dance GIF */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mb-4 flex h-[180px] w-full items-center justify-center overflow-hidden"
        >

          {/* Video - Default */}
          <video
            key={videoSrc}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={handleVideoError}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${
              holding ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Dance GIF - While holding */}
          <img
            src="/gifs/dance.webp"
            alt="Cute dancing animation"
            width="220"
            height="180"
            loading="eager"
            decoding="async"
            className={`absolute inset-0 m-auto h-auto max-h-[180px] w-full max-w-[220px] object-contain transition-opacity duration-200 ${
              holding ? "opacity-100" : "opacity-0"
            }`}
          />

        </motion.div>

        {/* Heading */}
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
          style={{
            touchAction: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
          className={`mt-8 flex min-h-[82px] w-full select-none items-center justify-center gap-3 rounded-[23px] border-2 border-pink-300 bg-pink-100 px-4 py-4 text-lg font-bold text-rose-600 shadow-sm transition-transform ${
            holding
              ? "scale-[0.98] bg-pink-200"
              : "active:scale-[0.98]"
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

      </motion.section>
    </main>
  )
}
