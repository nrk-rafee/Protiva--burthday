"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
import { Mail, Loader2 } from "lucide-react"
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

const SKY_DURATION = 80

export default function PhotosScreen({ onNext }) {
  const [imagesReady, setImagesReady] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)

  const [butterfliesCaught, setButterfliesCaught] = useState(0)

  const [butterfly, setButterfly] = useState({
    x: 50,
    y: 50,
    visible: true,
    id: 0,
  })

  // =====================================================
  // PRELOAD ALL PHOTOS
  // =====================================================

  useEffect(() => {
    let mounted = true
    let completed = 0

    photos.forEach((src) => {
      const img = new Image()

      const done = () => {
        completed++

        if (!mounted) return

        setLoadedCount(completed)

        if (completed >= photos.length) {
          setImagesReady(true)
        }
      }

      img.onload = done
      img.onerror = done
      img.src = src
    })

    return () => {
      mounted = false
    }
  }, [])

  // =====================================================
  // MOVE BUTTERFLY AUTOMATICALLY
  // =====================================================

  useEffect(() => {
    const moveButterfly = () => {
      setButterfly((old) => ({
        ...old,
        x: 6 + Math.random() * 88,
        y: 8 + Math.random() * 82,
      }))
    }

    const interval = setInterval(moveButterfly, 2200)

    return () => clearInterval(interval)
  }, [])

  // =====================================================
  // CATCH BUTTERFLY
  // =====================================================

  const catchButterfly = () => {
    // Increase score
    setButterfliesCaught((count) => count + 1)

    // Immediately disappear
    setButterfly((old) => ({
      ...old,
      visible: false,
    }))

    // Spawn a NEW butterfly shortly after
    setTimeout(() => {
      setButterfly({
        x: 6 + Math.random() * 88,
        y: 8 + Math.random() * 82,
        visible: true,
        id: Date.now(),
      })
    }, 350)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[50] h-screen w-screen overflow-hidden"
      initial={{
        backgroundColor: "#060a28",
      }}
      animate={{
        backgroundColor: [
          "#060a28",
          "#111c46",
          "#655477",
          "#efa879",
          "#9edbe8",
          "#f7e8b8",
          "#f6c18e",
          "#ed9b75",
          "#805070",
          "#060a28",
        ],
      }}
      transition={{
        duration: SKY_DURATION,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >

      {/* =================================================
          SKY
      ================================================= */}

      <Sky />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="relative z-20 flex h-screen w-full flex-col items-center justify-center px-3 py-3">

        {/* TITLE */}

        <motion.div
          className="mb-2 text-center"
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <motion.h2
            className="text-2xl font-semibold sm:text-3xl"
            animate={{
              color: [
                "#ffd7e8",
                "#fff0c4",
                "#ffffff",
                "#ffe1c8",
                "#ffd7e8",
              ],
            }}
            transition={{
              duration: SKY_DURATION,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Some Sweet Moments
          </motion.h2>

          <p className="mt-1 text-xs text-white/65">
            Swipe for more 💕
          </p>
        </motion.div>

        {/* =================================================
            LUXURY PHOTO ALBUM
        ================================================= */}

        <motion.div
          className="
            relative
            w-[min(92vw,390px)]
            rounded-[30px]
            border
            border-white/30
            bg-white/10
            p-2
            shadow-2xl
            backdrop-blur-md
          "
          animate={{
            backgroundColor: [
              "rgba(255,255,255,0.12)",
              "rgba(255,255,255,0.42)",
              "rgba(255,255,255,0.58)",
              "rgba(35,20,70,0.35)",
              "rgba(255,255,255,0.12)",
            ],
            boxShadow: [
              "0 0 35px rgba(120,140,255,0.28)",
              "0 0 40px rgba(255,200,120,0.25)",
              "0 0 45px rgba(255,255,255,0.28)",
              "0 0 45px rgba(180,90,190,0.28)",
              "0 0 35px rgba(120,140,255,0.28)",
            ],
          }}
          transition={{
            duration: SKY_DURATION,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >

          {/* Luxury top corners */}

          <div className="pointer-events-none absolute left-2 top-2 z-30 text-sm text-yellow-100/80">
            ✦
          </div>

          <div className="pointer-events-none absolute right-2 top-2 z-30 text-sm text-yellow-100/80">
            ✦
          </div>

          <div className="pointer-events-none absolute bottom-2 left-2 z-30 text-sm text-yellow-100/70">
            ✧
          </div>

          <div className="pointer-events-none absolute bottom-2 right-2 z-30 text-sm text-yellow-100/70">
            ✧
          </div>

          {/* Thin luxury inner border */}

          <div
            className="
              relative
              rounded-[25px]
              border
              border-white/35
              p-1
            "
          >

            {/* PHOTO */}

            <AnimatePresence mode="wait">

              {!imagesReady ? (

                <motion.div
                  key="loading"
                  className="
                    flex
                    h-[52vh]
                    min-h-[300px]
                    max-h-[500px]
                    w-full
                    items-center
                    justify-center
                    rounded-[20px]
                    bg-black/10
                  "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center">
                    <Loader2
                      size={28}
                      className="mx-auto animate-spin text-white"
                    />

                    <p className="mt-3 text-sm text-white">
                      Preparing memories...
                    </p>

                    <p className="mt-1 text-xs text-white/60">
                      {loadedCount} / {photos.length}
                    </p>
                  </div>
                </motion.div>

              ) : (

                <motion.div
                  key="gallery"
                  initial={{
                    opacity: 0,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.7,
                  }}
                >

                  <Swiper
                    modules={[EffectFade, Autoplay]}
                    effect="fade"
                    fadeEffect={{
                      crossFade: true,
                    }}
                    autoplay={{
                      delay: 3600,
                      disableOnInteraction: false,
                    }}
                    speed={1400}
                    loop={true}
                    className="
                      h-[52vh]
                      min-h-[300px]
                      max-h-[500px]
                      w-full
                      rounded-[20px]
                    "
                  >

                    {photos.map((src, index) => (
                      <SwiperSlide key={src}>

                        <div
                          className="
                            relative
                            h-full
                            w-full
                            overflow-hidden
                            rounded-[20px]
                            bg-black/10
                          "
                        >

                          <img
                            src={src}
                            alt={`Memory ${index + 1}`}
                            draggable="false"
                            decoding="async"
                            className="
                              h-full
                              w-full
                              select-none
                              object-contain
                            "
                          />

                          {/* Soft luxury overlay */}

                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-0
                              rounded-[20px]
                              shadow-[inset_0_0_25px_rgba(0,0,0,0.15)]
                            "
                          />

                          {/* Number */}

                          <div
                            className="
                              absolute
                              bottom-2
                              right-2
                              rounded-full
                              bg-black/35
                              px-2
                              py-1
                              text-[9px]
                              text-white
                              backdrop-blur-md
                            "
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>

                        </div>

                      </SwiperSlide>
                    ))}

                  </Swiper>

                </motion.div>

              )}

            </AnimatePresence>

          </div>

        </motion.div>

        {/* =================================================
            BUTTERFLY COUNTER
        ================================================= */}

        <motion.div
          className="
            relative
            z-30
            mt-2
            rounded-full
            border
            border-white/20
            bg-black/15
            px-4
            py-1.5
            text-xs
            text-white/80
            backdrop-blur-md
          "
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          🦋 Caught: {butterfliesCaught}
        </motion.div>

        {/* =================================================
            OPEN MESSAGE
        ================================================= */}

        <motion.div
          className="relative z-40 mt-2"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
          }}
        >
          <Button
            onClick={onNext}
            className="
              bg-gradient-to-r
              from-pink-400
              to-fuchsia-500
              text-white
              shadow-[0_0_25px_rgba(255,100,180,0.35)]
            "
          >
            <Mail size={18} />
            Open My Message
          </Button>
        </motion.div>

      </div>

      {/* =================================================
          FULL SCREEN BUTTERFLY
          এটা পুরো viewport-এ উড়বে
      ================================================= */}

      <AnimatePresence>
        {butterfly.visible && (
          <motion.button
            key={butterfly.id}
            type="button"
            aria-label="Catch the butterfly"
            onClick={catchButterfly}
            className="
              fixed
              z-[200]
              flex
              h-14
              w-14
              touch-manipulation
              items-center
              justify-center
              rounded-full
              text-4xl
              select-none
              cursor-pointer
            "
            style={{
              left: `${butterfly.x}%`,
              top: `${butterfly.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{
              opacity: 0,
              scale: 0.3,
              rotate: -20,
            }}
            animate={{
              opacity: 1,
              scale: [0.9, 1.15, 0.95, 1],
              rotate: [-8, 8, -5, 5, 0],
            }}
            exit={{
              opacity: 0,
              scale: 0,
              rotate: 30,
            }}
            transition={{
              opacity: {
                duration: 0.2,
              },
              scale: {
                duration: 0.8,
              },
              rotate: {
                duration: 1,
              },
            }}
          >
            🦋
          </motion.button>
        )}
      </AnimatePresence>

      {/* SIGNATURE */}

      <motion.div
        className="
          pointer-events-none
          fixed
          bottom-1
          right-3
          z-[100]
          text-[10px]
        "
        animate={{
          color: [
            "rgba(255,255,255,0.45)",
            "rgba(60,60,60,0.40)",
            "rgba(60,60,60,0.40)",
            "rgba(255,255,255,0.45)",
          ],
        }}
        transition={{
          duration: SKY_DURATION,
          repeat: Infinity,
        }}
      >
        @Rafee🫶protiva
      </motion.div>

    </motion.div>
  )
}


// =====================================================
// SKY BACKGROUND
// =====================================================

function Sky() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* MOON */}

      <motion.div
        className="
          absolute
          h-20
          w-20
          rounded-full
          bg-white
          shadow-[0_0_60px_rgba(255,255,255,0.8)]
          sm:h-28
          sm:w-28
        "
        animate={{
          left: [
            "72%",
            "62%",
            "50%",
            "38%",
            "26%",
            "14%",
            "7%",
            "7%",
            "72%",
          ],
          top: [
            "8%",
            "10%",
            "13%",
            "17%",
            "20%",
            "18%",
            "12%",
            "12%",
            "8%",
          ],
          opacity: [
            1,
            1,
            0.8,
            0.4,
            0.05,
            0,
            0,
            0,
            1,
          ],
        }}
        transition={{
          duration: SKY_DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SUN */}

      <motion.div
        className="
          absolute
          h-20
          w-20
          rounded-full
          bg-[#fff3a6]
          shadow-[0_0_80px_rgba(255,215,100,0.9)]
          sm:h-28
          sm:w-28
        "
        animate={{
          left: [
            "5%",
            "15%",
            "28%",
            "42%",
            "55%",
            "68%",
            "82%",
            "92%",
            "5%",
          ],
          top: [
            "25%",
            "20%",
            "14%",
            "9%",
            "8%",
            "11%",
            "17%",
            "25%",
            "25%",
          ],
          opacity: [
            0,
            0,
            0.15,
            0.6,
            1,
            1,
            0.65,
            0.05,
            0,
          ],
        }}
        transition={{
          duration: SKY_DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* STARS */}

      {Array.from({ length: 38 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${(index * 19) % 72}%`,
          }}
          animate={{
            opacity: [
              0.85,
              0.65,
              0.05,
              0,
              0.05,
              0.65,
              0.85,
            ],
          }}
          transition={{
            duration: SKY_DURATION,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ATMOSPHERIC LIGHT */}

      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 70% 10%, rgba(90,110,255,0.16), transparent 45%)",
            "radial-gradient(circle at 55% 10%, rgba(255,190,120,0.20), transparent 50%)",
            "radial-gradient(circle at 50% 25%, rgba(255,240,180,0.28), transparent 60%)",
            "radial-gradient(circle at 65% 15%, rgba(255,150,100,0.24), transparent 55%)",
            "radial-gradient(circle at 50% 10%, rgba(80,50,160,0.18), transparent 60%)",
            "radial-gradient(circle at 70% 10%, rgba(90,110,255,0.16), transparent 45%)",
          ],
        }}
        transition={{
          duration: SKY_DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* BOTTOM GLOW */}

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-48"
        animate={{
          background: [
            "linear-gradient(to top, rgba(20,25,80,0.55), transparent)",
            "linear-gradient(to top, rgba(255,180,100,0.18), transparent)",
            "linear-gradient(to top, rgba(255,235,170,0.15), transparent)",
            "linear-gradient(to top, rgba(100,40,100,0.45), transparent)",
            "linear-gradient(to top, rgba(20,25,80,0.55), transparent)",
          ],
        }}
        transition={{
          duration: SKY_DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

    </div>
  )
}
