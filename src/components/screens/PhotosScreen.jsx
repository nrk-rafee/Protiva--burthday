
"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
import { Puzzle, Loader2, Sun, Moon } from "lucide-react"
import Button from "../Button"

const photos = [
  "/images/1.png",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
  "/images/10.jpg",
  "/images/11.png",
  "/images/12.png",
  "/images/13.jpg",
]

export default function PhotosScreen({ onNext }) {
  const [imagesReady, setImagesReady] = useState(false)
  const [isDay, setIsDay] = useState(false)
  const [butterfliesCaught, setButterfliesCaught] = useState(0)

  const [butterfly, setButterfly] = useState({
    x: 50,
    y: 50,
    visible: true,
    id: 0,
  })

  const butterflyTimeoutRef = useRef(null)
  const butterflyIntervalRef = useRef(null)

  // ============================================
  // LOAD FIRST PHOTO ONLY
  // Show gallery as soon as first photo is ready
  // ============================================

  useEffect(() => {
    let mounted = true
    const firstImage = new Image()

    const finishLoading = () => {
      if (mounted) setImagesReady(true)
    }

    firstImage.onload = finishLoading
    firstImage.onerror = finishLoading
    firstImage.src = photos[0]

    return () => {
      mounted = false
      firstImage.onload = null
      firstImage.onerror = null
    }
  }, [])

  // ============================================
  // BUTTERFLY MOVEMENT
  // ============================================

  useEffect(() => {
    butterflyIntervalRef.current = setInterval(() => {
      setButterfly((old) => {
        if (!old.visible) return old

        return {
          ...old,
          x: 8 + Math.random() * 84,
          y: 12 + Math.random() * 70,
        }
      })
    }, 3000)

    return () => {
      clearInterval(butterflyIntervalRef.current)
      clearTimeout(butterflyTimeoutRef.current)
    }
  }, [])

  // ============================================
  // CATCH BUTTERFLY
  // ============================================

  const catchButterfly = () => {
    if (!butterfly.visible) return

    setButterfliesCaught((count) => count + 1)

    setButterfly((old) => ({
      ...old,
      visible: false,
    }))

    clearTimeout(butterflyTimeoutRef.current)

    butterflyTimeoutRef.current = setTimeout(() => {
      setButterfly({
        x: 8 + Math.random() * 84,
        y: 12 + Math.random() * 70,
        visible: true,
        id: Date.now(),
      })
    }, 450)
  }

  return (
    <motion.div
      className={`fixed inset-0 z-[50] h-[100dvh] w-screen overflow-hidden transition-colors duration-700 ${
        isDay
          ? "bg-gradient-to-b from-sky-300 via-amber-50 to-orange-100"
          : "bg-gradient-to-b from-[#080d2d] via-[#18214c] to-[#29203f]"
      }`}
    >
      {/* ============================================
          SKY BACKGROUND
      ============================================ */}

      <Sky isDay={isDay} />

      {/* ============================================
          DAY / NIGHT TOGGLE
      ============================================ */}

      <motion.button
        type="button"
        onClick={() => setIsDay((day) => !day)}
        whileTap={{ scale: 0.94 }}
        aria-label={isDay ? "Switch to night mode" : "Switch to day mode"}
        aria-pressed={isDay}
        className={`fixed right-3 top-3 z-[250] flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold shadow-lg backdrop-blur-xl transition-colors duration-500 ${
          isDay
            ? "border-white/60 bg-white/65 text-slate-800"
            : "border-white/20 bg-black/25 text-white"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDay ? "day" : "night"}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2"
          >
            {isDay ? <Moon size={17} /> : <Sun size={17} />}
            {isDay ? "Night Mode" : "Day Mode"}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* ============================================
          MAIN CONTENT
      ============================================ */}

      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center gap-2 px-3 pb-8 pt-14">

        {/* TITLE */}

        <motion.div
          className="mb-1 text-center"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-1 text-2xl"
          >
            🦋
          </motion.div>

          <h2
            className={`text-2xl font-semibold transition-colors duration-500 sm:text-3xl ${
              isDay ? "text-rose-600" : "text-pink-200"
            }`}
          >
            Some Sweet Moments
          </h2>

          <p
            className={`mt-1 text-xs transition-colors duration-500 ${
              isDay ? "text-slate-700/75" : "text-white/65"
            }`}
          >
            Swipe for more 💕
          </p>
        </motion.div>

        {/* ============================================
            PHOTO ALBUM
        ============================================ */}

        <motion.div
          className={`relative w-[min(92vw,390px)] rounded-[30px] border p-2 shadow-2xl backdrop-blur-md transition-colors duration-700 ${
            isDay
              ? "border-white/75 bg-white/45 shadow-amber-900/10"
              : "border-white/30 bg-white/10 shadow-indigo-300/20"
          }`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
        >
          {/* Decorative corners */}

          <div className="pointer-events-none absolute left-2 top-2 z-30 text-sm text-yellow-200">
            ✦
          </div>

          <div className="pointer-events-none absolute right-2 top-2 z-30 text-sm text-yellow-200">
            ✦
          </div>

          <div className="pointer-events-none absolute bottom-2 left-2 z-30 text-sm text-yellow-200">
            ✧
          </div>

          <div className="pointer-events-none absolute bottom-2 right-2 z-30 text-sm text-yellow-200">
            ✧
          </div>

          <div className="relative rounded-[25px] border border-white/35 p-1">

            {/* LOADING / GALLERY */}

            {!imagesReady ? (
              <div className="flex h-[52vh] min-h-[280px] max-h-[500px] w-full items-center justify-center rounded-[20px] bg-black/10">
                <div className="text-center">
                  <Loader2
                    size={28}
                    className={`mx-auto animate-spin ${
                      isDay ? "text-rose-500" : "text-white"
                    }`}
                  />

                  <p
                    className={`mt-3 text-sm ${
                      isDay ? "text-slate-700" : "text-white"
                    }`}
                  >
                    Preparing memories...
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Swiper
                  modules={[EffectFade, Autoplay]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  autoplay={{
                    delay: 3600,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  speed={650}
                  loop
                  preloadImages={false}
                  watchSlidesProgress
                  className="h-[52vh] min-h-[280px] max-h-[500px] w-full rounded-[20px]"
                >
                  {photos.map((src, index) => (
                    <SwiperSlide key={src}>
                      <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-black/10">

                        <img
                          src={src}
                          alt={`Memory ${index + 1}`}
                          width="800"
                          height="1000"
                          loading={index === 0 ? "eager" : "lazy"}
                          fetchPriority={index === 0 ? "high" : "low"}
                          decoding="async"
                          draggable="false"
                          className="h-full w-full select-none object-contain"
                        />

                        {/* Soft overlay */}

                        <div className="pointer-events-none absolute inset-0 rounded-[20px] shadow-[inset_0_0_25px_rgba(0,0,0,0.12)]" />

                        {/* Image number */}

                        <div className="absolute bottom-2 right-2 rounded-full bg-black/40 px-2 py-1 text-[9px] text-white backdrop-blur-md">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* ============================================
            BUTTERFLY COUNTER
        ============================================ */}

        <div
          className={`relative z-30 mt-1 rounded-full border px-4 py-1.5 text-xs backdrop-blur-md transition-colors duration-500 ${
            isDay
              ? "border-rose-300/60 bg-white/45 text-slate-700"
              : "border-white/20 bg-black/15 text-white/85"
          }`}
        >
          🦋 Caught: {butterfliesCaught}
        </div>

        {/* ============================================
            PUZZLE BUTTON
        ============================================ */}

        <motion.div
          className="relative z-40 mt-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <Button
            onClick={onNext}
            className="bg-gradient-to-r from-pink-400 to-fuchsia-500 text-white shadow-[0_0_25px_rgba(255,100,180,0.35)]"
          >
            <Puzzle size={18} />
            Let's Play a Puzzle 🧩
          </Button>
        </motion.div>
      </div>

      {/* ============================================
          BUTTERFLY GAME
      ============================================ */}

      <AnimatePresence>
        {butterfly.visible && (
          <motion.button
            key={butterfly.id}
            type="button"
            aria-label="Catch the butterfly"
            onClick={catchButterfly}
            className="fixed z-[200] flex h-14 w-14 touch-manipulation select-none items-center justify-center rounded-full text-4xl"
            style={{
              left: `${butterfly.x}%`,
              top: `${butterfly.y}%`,
              marginLeft: "-28px",
              marginTop: "-28px",
              touchAction: "manipulation",
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: 1,
              scale: [0.9, 1.12, 0.95, 1],
              rotate: [-7, 7, -4, 4, 0],
            }}
            exit={{ opacity: 0, scale: 0.3, rotate: 25 }}
            transition={{
              opacity: { duration: 0.18 },
              scale: { duration: 0.65 },
              rotate: { duration: 0.8 },
            }}
          >
            🦋
          </motion.button>
        )}
      </AnimatePresence>

      {/* ============================================
          SIGNATURE
      ============================================ */}

      <div
        className={`pointer-events-none fixed bottom-1 right-3 z-[100] text-[10px] transition-colors duration-500 ${
          isDay ? "text-slate-700/50" : "text-white/45"
        }`}
      >
        @Rafee🫶protiva
      </div>
    </motion.div>
  )
}

// ============================================
// DAY / NIGHT SKY
// ============================================

function Sky({ isDay }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      <AnimatePresence mode="wait">
        {isDay ? (
          <motion.div
            key="day-sky"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            {/* Sun */}

            <div className="absolute right-[12%] top-[9%] h-20 w-20 rounded-full bg-yellow-200 shadow-[0_0_65px_rgba(255,220,100,0.7)] sm:h-28 sm:w-28" />

            {/* Soft clouds */}

            <div className="absolute left-[8%] top-[19%] text-4xl opacity-75">
              ☁️
            </div>

            <div className="absolute right-[15%] top-[34%] text-3xl opacity-60">
              ☁️
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-amber-100/10" />
          </motion.div>
        ) : (
          <motion.div
            key="night-sky"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            {/* Moon */}

            <div className="absolute right-[12%] top-[9%] h-20 w-20 rounded-full bg-indigo-50 shadow-[0_0_60px_rgba(220,220,255,0.6)] sm:h-28 sm:w-28" />

            {/* Stars */}

            {Array.from({ length: 28 }, (_, index) => (
              <motion.span
                key={index}
                className="absolute h-1 w-1 rounded-full bg-white"
                style={{
                  left: `${(index * 37) % 100}%`,
                  top: `${(index * 19) % 80}%`,
                }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 3 + (index % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (index % 5) * 0.15,
                }}
              />
            ))}

            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-purple-900/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
