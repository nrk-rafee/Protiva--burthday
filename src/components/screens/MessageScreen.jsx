"use client"

import { motion } from "framer-motion"

export default function MessageScreen() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="
        bg-[#fff8fc]
        p-7
        rounded-[60px]
        drop-shadow-2xl
        min-w-48
        w-full
        max-w-[440px]
        relative
        flex
        flex-col
        items-center
        gap-5
        my-10
      "
    >
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary">
          A Special Message 💌
        </h2>

        <p className="mt-1 text-primary/70 text-sm">
          Just for you, Cutiepie 💗
        </p>
      </div>

      {/* LETTER */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.25,
          duration: 0.5,
        }}
        className="
          relative
          w-full
          rounded-[40px]
          bg-gradient-to-b
          from-white
          to-pink-100
          p-6
          shadow-inner
          border
          border-pink-100
        "
      >
        <div className="absolute top-4 left-5 text-pink-300 text-xl">
          💗
        </div>

        <div className="absolute top-4 right-5 text-pink-300 text-xl">
          💗
        </div>

        <div className="pt-5 text-center">
          <p className="text-[15px] leading-7 text-gray-700">
            Happy Birthday, Cutiepie! 💗
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            You deserve all the happiness, love, and smiles
            in the world today and always.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            You have this special way of making everything
            around you brighter — your smile, your kindness,
            and the way you make people feel truly cared for.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            I hope your day is filled with laughter,
            surprises, and beautiful moments that make
            your heart happy.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            You’re truly one of a kind, and I just want you
            to know how special you are.
          </p>

          <p className="mt-5 text-sm leading-7 font-medium text-pink-500">
            Wishing you endless happiness, success,
            and all the sweet things life has to offer. 💗
          </p>

          <p className="mt-5 text-lg">
            With lots of love 🫶
          </p>
        </div>

        <div className="absolute bottom-4 left-5 text-pink-300 text-xl">
          🌸
        </div>

        <div className="absolute bottom-4 right-5 text-pink-300 text-xl">
          🌸
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xs text-gray-400"
      >
        Made specially for you 💕
      </motion.div>
    </motion.div>
  )
}
