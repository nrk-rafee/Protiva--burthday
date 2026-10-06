"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
import { Mail, Loader2 } from "lucide-react"
import Button from "../Button"

// =====================================================
// CORRECT PHOTO FILES
// =====================================================

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

  const [butterflyPosition, setButterflyPosition] = useState({
    x: 50,
    y: 50,
  })

  // =====================================================
  // PRELOAD ALL IMAGES
  // =====================================================

  useEffect(() => {
    let mounted = true
    let completed = 0

    photos.forEach((src) => {
      const img = new Image()

      const done = () => {
        completed += 1

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
  // BUTTERFLY MOVEMENT
  // =====================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setButterflyPosition({
        x: 12 + Math.random() * 76,
        y: 15 + Math.random() * 65,
      })
    }, 1700)

    return () => clearInterval(interval)
  }, [])

  // =====================================================
  // CATCH BUTTERFLY
  // =====================================================

  const catchButterfly = () => {
    setButterfliesCaught((count) => count + 1)

    setButterflyPosition({
      x: 12 + Math.random() * 76,
      y: 15 + Math.random() * 65,
    })
  }

  return (
    <motion.div
      className="fixed inset-0 z-[50] h-screen w-screen overflow-hidden"
      initial={{
        backgroundColor: "#060a28",
      }}
      animate={{
        backgroundColor: [
          "#060a28", // deep night
          "#111c46", // late night
          "#655477", // dawn
          "#efa879", // sunrise
          "#9edbe8", // morning
          "#f7e8b8", // bright day
          "#f6c18e", // afternoon
          "#ed9b75", // sunset
          "#805070", // evening
          "#060a28", // night
        ],
      }}
      transition={{
        duration: SKY_DURATION,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* =================================================
          BACKGROUND SKY
      ================================================= */}

      <Sky />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="relative z-20 flex h-screen w-full flex-col items-center justify-center px-3 py-4 sm:px-5">

        {/* =================================================
            TITLE
        ================================================= */}

        <motion.div
          className="mb-3 text-center"
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
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

          <motion.p
            className="mt-1 text-xs sm:text-sm"
            animate={{
              color: [
                "rgba(255,255,255,0.70)",
                "rgba(70,60,70,0.70)",
                "rgba(70,60,70,0.70)",
                "rgba(255,255,255,0.70)",
              ],
            }}
            transition={{
              duration: SKY_DURATION,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Swipe for more 💕
          </motion.p>
        </motion.div>

        {/* =================================================
            DECORATED ALBUM
        ================================================= */}

        <motion.div
          className="
            relative
            w-full
            max-w-[430px]
            rounded-[38px]
            border
            border-white/30
            p-4
            shadow-2xl
            backdrop-blur-md
            sm:p-5
          "
          animate={{
            backgroundColor: [
              "rgba(13,20,60,0.72)",
              "rgba(255,255,255,0.46)",
              "rgba(255,255,255,0.64)",
              "rgba(35,20,70,0.68)",
              "rgba(13,20,60,0.72)",
            ],
            boxShadow: [
              "0 0 45px rgba(100,120,255,0.25)",
              "0 0 45px rgba(255,190,100,0.24)",
              "0 0 45px rgba(255,255,255,0.30)",
              "0 0 50px rgba(160,80,180,0.28)",
              "0 0 45px rgba(100,120,255,0.25)",
            ],
          }}
          transition={{
            duration: SKY_DURATION,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Top decorative tape */}

          <div className="absolute -top-2 left-8 z-30 h-8 w-20 rotate-[-5deg] rounded-sm bg-white/35 shadow-sm backdrop-blur-sm" />

          <div className="absolute -top-2 right-8 z-30 h-8 w-20 rotate-[5deg] rounded-sm bg-pink-200/35 shadow-sm backdrop-blur-sm" />

          {/* Small decorative dots */}

          <div className="absolute left-4 top-12 text-lg text-pink-200">
            ✦
          </div>

          <div className="absolute right-4 top-12 text-lg text-yellow-200">
            ✦
          </div>

          <div className="absolute bottom-4 left-4 text-lg text-pink-200/80">
            ♡
          </div>

          <div className="absolute bottom-4 right-4 text-lg text-yellow-100/80">
            ♡
          </div>

          {/* Album heading */}

          <div className="relative z-10 mb-3 flex items-center justify-between px-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/60">
              Little Memories
            </span>

            <span className="text-xs text-white/60">
              01 — 13
            </span>
          </div>

          {/* =================================================
              PHOTO AREA
          ================================================= */}

          <div className="relative z-10 rounded-[30px] bg-white/15 p-3 shadow-inner">

            <AnimatePresence mode="wait">
              {!imagesReady ? (
                <motion.div
                  key="loader"
                  className="
                    flex
                    h-[330px]
                    w-full
                    flex-col
                    items-center
                    justify-center
                    rounded-[24px]
                    bg-black/10
                    backdrop-blur-sm
                  "
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                >
                  <Loader2
                    size={30}
                    className="animate-spin text-white"
                  />

                  <p className="mt-3 text-sm text-white">
                    Preparing your memories...
                  </p>

                  <p className="mt-1 text-xs text-white/60">
                    {loadedCount} / {photos.length}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="gallery"
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.8,
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
                      pauseOnMouseEnter: false,
                    }}
                    speed={1400}
                    loop={true}
                    allowTouchMove={true}
                    className="
                      h-[330px]
                      w-[245px]
                      rounded-[24px]
                      sm:h-[360px]
                      sm:w-[270px]
                    "
                  >
                    {photos.map((src, index) => (
                      <SwiperSlide key={src}>
                        <motion.div
                          className="
                            relative
                            h-full
                            w-full
                            overflow-hidden
                            rounded-[24px]
                            bg-white/10
                            p-2
                            shadow-xl
                          "
                        >
                          {/* Inner photo frame */}

                          <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-white">

                            <img
                              src={src}
                              alt={`Memory ${index + 1}`}
                              draggable="false"
                              decoding="async"
                              fetchPriority={
                                index === 0 ? "high" : "auto"
                              }
                              className="
                                h-full
                                w-full
                                select-none
                                object-contain
                              "
                            />

                            {/* soft image glow */}

                            <div
                              className="
                                pointer-events-none
                                absolute
                                inset-0
                                rounded-[18px]
                                shadow-[inset_0_0_35px_rgba(0,0,0,0.16)]
                              "
                            />

                            {/* Photo number */}

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
                                backdrop-blur-sm
                              "
                            >
                              {String(index + 1).padStart(2, "0")}
                            </div>
                          </div>
                        </motion.div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* =================================================
            BUTTERFLY GAME
        ================================================= */}

        <motion.div
          className="
            relative
            mt-3
            h-[82px]
            w-full
            max-w-[430px]
            overflow-hidden
            rounded-2xl
            border
            border-white/20
            bg-black/10
            px-3
            py-2
            backdrop-blur-sm
          "
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
          }}
        >
          {/* Game title */}

          <div className="pointer-events-none absolute left-3 top-2 z-10">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
              Catch the Butterfly 🦋
            </p>

            <p className="text-[9px] text-white/55">
              Caught: {butterfliesCaught}
            </p>
          </div>

          {/* Moving butterfly */}

          <motion.button
            type="button"
            aria-label="Catch the butterfly"
            onClick={catchButterfly}
            className="
              absolute
              z-20
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-2xl
              drop-shadow-lg
              select-none
              touch-manipulation
            "
            animate={{
              left: `${butterflyPosition.x}%`,
              top: `${butterflyPosition.y}%`,
            }}
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
            whileTap={{
              scale: 0.75,
              rotate: 15,
            }}
          >
            🦋
          </motion.button>
        </motion.div>

        {/* =================================================
            OPEN MESSAGE BUTTON
        ================================================= */}

        <motion.div
          className="relative z-40 mt-3"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
            duration: 0.7,
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.035, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Button
              onClick={onNext}
              className="
                bg-gradient-to-r
                from-pink-400
                to-fuchsia-500
                text-white
                shadow-[0_0_25px_rgba(255,100,180,0.30)]
              "
            >
              <Mail size={18} />
              Open My Message
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* =================================================
          SIGNATURE
      ================================================= */}

      <motion.div
        className="
          pointer-events-none
          fixed
          bottom-2
          right-3
          z-[100]
          text-xs
        "
        animate={{
          color: [
            "rgba(255,255,255,0.45)",
            "rgba(70,70,70,0.40)",
            "rgba(70,70,70,0.40)",
            "rgba(255,255,255,0.45)",
          ],
        }}
        transition={{
          duration: SKY_DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        @Rafee🫶protiva
      </motion.div>
    </motion.div>
  )
}

// =====================================================
// SKY
// =====================================================

function Sky() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* =================================================
          FULL ROUND WHITE MOON
      ================================================= */}

      <motion.div
        className="
          absolute
          h-20
          w-20
          rounded-full
          bg-white
          shadow-[0_0_55px_rgba(255,255,255,0.80)]
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
            "9%",
            "11%",
            "13%",
            "17%",
            "20%",
            "18%",
            "12%",
            "12%",
            "9%",
          ],
          opacity: [
            1,
            1,
            0.85,
            0.45,
            0.05,
            0,
            0,
            0,
            1,
          ],
          scale: [
            1,
            1.04,
            1.02,
            1,
            0.95,
            0.85,
            0.75,
            0.75,
            1,
          ],
        }}
        transition={{
          duration: SKY_DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          SUN
      ================================================= */}

      <motion.div
        className="
          absolute
          h-20
          w-20
          rounded-full
          bg-[#fff3a6]
          shadow-[0_0_80px_rgba(255,215,100,0.85)]
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
            0.12,
            0.6,
            1,
            1,
            0.65,
            0.05,
            0,
          ],
          scale: [
            0.65,
            0.75,
            0.9,
            1,
            1.06,
            1.04,
            0.95,
            0.75,
            0.65,
          ],
        }}
        transition={{
          duration: SKY_DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          ATMOSPHERIC LIGHT
      ================================================= */}

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

      {/* =================================================
          STARS
      ================================================= */}

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
            scale: [
              1,
              1.2,
              0.7,
              0.5,
              0.7,
              1.2,
              1,
            ],
          }}
          transition={{
            duration: SKY_DURATION,
            delay: (index % 8) * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* =================================================
          BIG STARS
      ================================================= */}

      <motion.div
        className="absolute left-[12%] top-[24%] text-2xl text-yellow-100"
        animate={{
          opacity: [1, 0.7, 0, 0, 0.7, 1],
          scale: [1, 1.15, 0.5, 0.5, 1.15, 1],
        }}
        transition={{
          duration: SKY_DURATION,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ✦
      </motion.div>

      <motion.div
        className="absolute right-[13%] top-[30%] text-xl text-yellow-100"
        animate={{
          opacity: [1, 0.5, 0, 0, 0.5, 1],
          scale: [1, 1.2, 0.5, 0.5, 1.2, 1],
        }}
        transition={{
          duration: SKY_DURATION,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ✦
      </motion.div>

      {/* =================================================
          BOTTOM ATMOSPHERIC GLOW
      ================================================= */}

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
