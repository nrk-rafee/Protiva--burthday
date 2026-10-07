"use client"

import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import { Puzzle } from "lucide-react"

import "swiper/css"
import "swiper/css/effect-cards"

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
  return (
    <div
      className="
        bg-[#fff8fc]
        p-7
        rounded-[60px]
        drop-shadow-2xl
        min-w-48
        w-full
        max-w-110
        relative
        flex
        flex-col
        items-center
        gap-4
        my-10
      "
    >
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-accent">
          Some Sweet Moments
        </h2>

        <p className="text-sm text-accent/70 mt-1">
          (Swipe for more) 💕
        </p>
      </div>

      {/* Photo area */}
      <div
        className="
          relative
          p-6
          bg-linear-to-b
          from-white/80
          to-violet-200
          w-full
          rounded-[40px]
          flex
          items-end
          justify-center
          shadow-inner
        "
      >
        <div>
          <Swiper
            effect="fade"
            modules={[EffectFade, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="w-53.75 h-70 md:w-59.25 md:h-77.5"
          >
            {photos.map((src, i) => (
              <SwiperSlide key={i}>
                <motion.div className="h-full w-full rounded-3xl">
                  <div className="relative h-full w-full rounded-2xl overflow-hidden">
                    <img
                      loading="lazy"
                      src={src}
                      alt={`Memory ${i + 1}`}
                      className="
                        h-full
                        w-full
                        rounded-2xl
                        object-contain
                      "
                    />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Puzzle button */}
      <div className="mt-4 flex justify-center">
        <Button
          onClick={onNext}
          className="
            bg-gradient-to-r
            from-pink-400
            to-fuchsia-500
            text-white
            shadow-[0_8px_25px_rgba(236,72,153,0.25)]
          "
        >
          <Puzzle size={18} />
          Let's Play a Puzzle 🧩
        </Button>
      </div>
    </div>
  )
}
