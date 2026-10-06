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
  const [loadedCount, setLoadedCount] = useState(0)

  // --------------------------------------------------
  // PRELOAD ALL PHOTOS
  // --------------------------------------------------
  useEffect(() => {
    let mounted = true
    let completed = 0

    const preloadImages = () => {
      photos.forEach((src) => {
        const img = new Image()

        const done = () => {
          completed += 1

          if (mounted) {
            setLoadedCount(completed)

            if (completed === photos.length) {
              setImagesReady(true)
            }
          }
        }

        img.onload = done
        img.onerror = done
        img.src = src
      })
    }

    preloadImages()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 w-screen min-h-screen overflow-hidden"
      initial={{
        backgroundColor: "#070b2b",
      }}
      animate={{
        backgroundColor: [
          "#070b2b", // deep night
          "#172451", // late night
          "#705b7d", // dawn
          "#f2b47d", // sunrise
          "#9ed9e8", // morning
          "#f5e4b5", // daylight
          "#f3b47d", // sunset
          "#8b5270", // evening
          "#070b2b", // night
        ],
      }}
      transition={{
        duration: 28,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* =================================================
          FULL SCREEN SKY
      ================================================= */}
      <Sky />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}
      <div className="relative z-30 w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">

        {/* Title */}
        <motion.div
          className="text-center mb-5"
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-semibold"
            animate={{
              color: [
                "#ffd6e7",
                "#fff1bd",
                "#ffffff",
                "#ffe0c4",
                "#ffd6e7",
              ],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Some Sweet Moments
          </motion.h2>

          <motion.p
            className="text-sm mt-1"
            animate={{
              color: [
                "rgba(255,255,255,0.65)",
                "rgba(60,60,60,0.65)",
                "rgba(60,60,60,0.65)",
                "rgba(255,255,255,0.65)",
              ],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Swipe for more 💕
          </motion.p>
        </motion.div>

        {/* =================================================
            PHOTO CARD
        ================================================= */}
        <motion.div
          className="
            relative
            w-full
            max-w-[430px]
            p-5
            md:p-7
            rounded-[40px]
            overflow-hidden
          "
          animate={{
            backgroundColor: [
              "rgba(18,25,70,0.72)",
              "rgba(255,255,255,0.50)",
              "rgba(255,255,255,0.65)",
              "rgba(25,25,65,0.70)",
            ],

            boxShadow: [
              "0 0 40px rgba(80,100,255,0.22)",
              "0 0 40px rgba(255,200,120,0.22)",
              "0 0 35px rgba(255,255,255,0.25)",
              "0 0 45px rgba(80,70,180,0.28)",
            ],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >

          {/* Inner glow */}
          <div className="absolute inset-0 rounded-[40px] pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.22),transparent_60%)]" />

          {/* =================================================
              IMAGE LOADING
          ================================================= */}
          <AnimatePresence mode="wait">

            {!imagesReady ? (
              <motion.div
                key="loader"
                className="
                  relative
                  z-10
                  h-[350px]
                  w-full
                  rounded-[30px]
                  flex
                  flex-col
                  items-center
                  justify-center
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
                  scale: 0.95,
                }}
              >
                <Loader2
                  size={32}
                  className="animate-spin text-white"
                />

                <p className="mt-4 text-white text-sm">
                  Preparing your memories...
                </p>

                <p className="mt-1 text-white/60 text-xs">
                  {loadedCount} / {photos.length}
                </p>
              </motion.div>
            ) : (

              /* =================================================
                  SWIPER
              ================================================= */
              <motion.div
                key="gallery"
                className="relative z-10"
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
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                  }}
                  speed={1200}
                  loop={true}
                  allowTouchMove={true}
                  className="w-[250px] h-[330px] md:w-[285px] md:h-[375px] rounded-[28px]"
                >
                  {photos.map((src, i) => (
                    <SwiperSlide key={src}>
                      <motion.div
                        className="
                          relative
                          h-full
                          w-full
                          overflow-hidden
                          rounded-[28px]
                          bg-black/10
                        "
                      >
                        <img
                          src={src}
                          alt={`Memory ${i + 1}`}
                          draggable="false"
                          decoding="async"
                          fetchPriority={i === 0 ? "high" : "auto"}
                          className="
                            h-full
                            w-full
                            object-contain
                            rounded-[28px]
                            select-none
                          "
                        />

                        {/* Soft image overlay */}
                        <div className="absolute inset-0 pointer-events-none rounded-[28px] shadow-[inset_0_0_35px_rgba(0,0,0,0.12)]" />
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>

        {/* =================================================
            OPEN MESSAGE BUTTON
        ================================================= */}
        <motion.div
          className="relative z-40 mt-6"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
            duration: 0.8,
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
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

      {/* Signature */}
      <motion.div
        className="fixed bottom-3 right-4 z-[100] text-sm pointer-events-none"
        animate={{
          color: [
            "rgba(255,255,255,0.45)",
            "rgba(80,80,80,0.45)",
            "rgba(80,80,80,0.45)",
            "rgba(255,255,255,0.45)",
          ],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        @Rafee🫶protiva
      </motion.div>
    </motion.div>
  )
}


/* =========================================================
   SKY / DAY-NIGHT ANIMATION
========================================================= */

function Sky() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

      {/* -------------------------------------------------
          MOON
      ------------------------------------------------- */}
      <motion.div
        className="
          absolute
          w-20
          h-20
          md:w-28
          md:h-28
          rounded-full
          bg-white
          shadow-[0_0_45px_rgba(255,255,255,0.75)]
        "
        animate={{
          left: [
            "70%",
            "58%",
            "48%",
            "38%",
            "28%",
            "18%",
            "8%",
          ],
          top: [
            "10%",
            "12%",
            "15%",
            "18%",
            "20%",
            "18%",
            "12%",
          ],
          opacity: [
            1,
            0.9,
            0.55,
            0.1,
            0,
            0,
            0,
          ],
          scale: [
            1,
            1.05,
            1,
            0.95,
            0.8,
            0.6,
            0.5,
          ],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* -------------------------------------------------
          SUN
      ------------------------------------------------- */}
      <motion.div
        className="
          absolute
          w-20
          h-20
          md:w-28
          md:h-28
          rounded-full
          bg-[#fff3a6]
          shadow-[0_0_70px_rgba(255,210,90,0.75)]
        "
        animate={{
          left: [
            "8%",
            "18%",
            "30%",
            "45%",
            "60%",
            "72%",
            "84%",
          ],
          top: [
            "15%",
            "18%",
            "14%",
            "9%",
            "12%",
            "18%",
            "25%",
          ],
          opacity: [
            0,
            0,
            0.1,
            0.65,
            1,
            0.7,
            0,
          ],
          scale: [
            0.5,
            0.65,
            0.85,
            1,
            1.05,
            1,
            0.7,
          ],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* -------------------------------------------------
          SUNLIGHT
      ------------------------------------------------- */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 70% 15%, rgba(80,100,255,0.12), transparent 45%)",
            "radial-gradient(circle at 50% 10%, rgba(255,210,120,0.22), transparent 55%)",
            "radial-gradient(circle at 50% 30%, rgba(255,245,180,0.32), transparent 60%)",
            "radial-gradient(circle at 70% 20%, rgba(255,130,100,0.20), transparent 55%)",
            "radial-gradient(circle at 50% 10%, rgba(80,60,180,0.18), transparent 60%)",
          ],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* -------------------------------------------------
          STARS
      ------------------------------------------------- */}
      {Array.from({ length: 35 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute w-1 h-1 rounded-full bg-white"
          style={{
            left: `${(index * 31) % 100}%`,
            top: `${(index * 17) % 70}%`,
          }}
          animate={{
            opacity: [
              0.8,
              0.2,
              0,
              0,
              0.2,
              0.8,
            ],
          }}
          transition={{
            duration: 14,
            delay: (index % 7) * 0.3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* -------------------------------------------------
          BIG DECORATIVE STARS
      ------------------------------------------------- */}
      <motion.div
        className="absolute left-[12%] top-[25%] text-yellow-200 text-2xl"
        animate={{
          opacity: [1, 0.2, 0, 0, 0.2, 1],
          scale: [1, 0.8, 0.5, 0.5, 0.8, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        ✦
      </motion.div>

      <motion.div
        className="absolute right-[15%] top-[32%] text-yellow-100 text-xl"
        animate={{
          opacity: [1, 0.2, 0, 0, 0.2, 1],
          scale: [1, 0.8, 0.5, 0.5, 0.8, 1],
        }}
        transition={{
          duration: 14,
          delay: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        ✦
      </motion.div>

      {/* Bottom atmospheric glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-48"
        animate={{
          background: [
            "linear-gradient(to top, rgba(20,25,80,0.55), transparent)",
            "linear-gradient(to top, rgba(255,180,100,0.18), transparent)",
            "linear-gradient(to top, rgba(255,235,170,0.12), transparent)",
            "linear-gradient(to top, rgba(60,30,100,0.5), transparent)",
          ],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
