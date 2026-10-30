
export default function IntroScreen({ onNext }) {
    const [step, setStep] = useState(0)

    const [remaining, setRemaining] = useState(10)
    const [showStartButton, setShowStartButton] = useState(false)
    const [showSecondGif, setShowSecondGif] = useState(false)
    const [showCurtainVideo, setShowCurtainVideo] = useState(false)

    const buttonShownRef = useRef(false)
    const audioRef = useRef(null)

    const CURTAIN_REVEAL_TIME = 5.0

    // Midnight countdown: 11:59:50 থেকে 12:00:00
    useEffect(() => {
        if (step !== 0) return

        const endTime = Date.now() + 10000

        const timer = setInterval(() => {
            const left = Math.max(0, Math.ceil((endTime - Date.now()) / 1000))

            setRemaining(left)

            if (left <= 0) {
                clearInterval(timer)
                setShowStartButton(true)

                if (audioRef.current) {
                    audioRef.current.play().catch(() => {
                        console.log("Audio playback needs user interaction.")
                    })
                }
            }
        }, 100)

        return () => clearInterval(timer)
    }, [step])

    const handleCurtainVideoTime = (event) => {
        const video = event.currentTarget

        if (
            video.currentTime >= CURTAIN_REVEAL_TIME &&
            !buttonShownRef.current
        ) {
            buttonShownRef.current = true
            setShowStartButton(true)
        }
    }

    const formatTime = (seconds) => {
        const total = 10 - seconds
        const minute = 59
        const second = 50 + total

        if (second >= 60) {
            return `12:00:${String(second - 60).padStart(2, "0")}`
        }

        return `11:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`
    }

    return (
        <AnimatePresence mode="wait">
            {/* STEP 0 — MIDNIGHT SURPRISE */}

            {step === 0 && (
                <motion.div
                    key="step0"
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.015 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 overflow-hidden bg-black"
                >
                    <audio
                        ref={audioRef}
                        src="/images/birthdaysong.mp3"
                        preload="auto"
                    />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(190,145,65,0.12),transparent_60%)]" />

                    <TopDecoration />

                    <div className="relative z-20 flex min-h-screen w-full items-center justify-center px-4 py-8">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="
                                relative mx-auto w-full max-w-[440px]
                                overflow-hidden rounded-[42px]
                                border border-[#d8b879]/30
                                bg-black/80 p-6
                                shadow-[0_20px_80px_rgba(0,0,0,0.7),0_0_35px_rgba(218,170,95,0.12)]
                                backdrop-blur-xl md:p-8
                            "
                        >
                            <div className="pointer-events-none absolute inset-0 rounded-[42px] border border-[#e7c58b]/10" />

                            {/* MIDNIGHT CLOCK */}

                            <div className="relative z-10 mb-7 text-center">
                                <p className="mb-3 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#d9b875]">
                                    <span>◷</span>
                                    Midnight Surprise
                                </p>

                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            "0 0 10px rgba(218,170,95,0.08)",
                                            "0 0 28px rgba(218,170,95,0.22)",
                                            "0 0 10px rgba(218,170,95,0.08)",
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                    className="
                                        inline-flex items-center justify-center
                                        rounded-2xl border border-[#d8b879]/30
                                        bg-[#100e09] px-7 py-4
                                    "
                                >
                                    <span className="font-mono text-3xl font-bold tracking-[0.12em] text-[#f8d98e] sm:text-4xl">
                                        {showStartButton ? "12:00:00" : formatTime(remaining)}
                                    </span>
                                </motion.div>
                            </div>

                            {/* ANIME VIDEO */}

                            <div className="
                                relative z-10 flex h-[260px] w-full
                                items-center justify-center overflow-hidden
                                rounded-[30px] border border-[#d8b879]/20
                                bg-[radial-gradient(circle,rgba(120,90,45,0.13),#050505_70%)]
                                sm:h-[300px]
                            ">
                                <motion.img
                                    src="/gifs/intro.gif"
                                    alt="Birthday surprise"
                                    className="h-full w-full object-contain"
                                    animate={{ scale: [1, 1.025, 1] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />

                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
                            </div>

                            {/* TITLE */}

                            <div className="relative z-10 mt-7 text-center">
                                <motion.h1
                                    animate={{
                                        textShadow: [
                                            "0 0 8px rgba(255,150,220,0.15)",
                                            "0 0 22px rgba(255,150,220,0.4)",
                                            "0 0 8px rgba(255,150,220,0.15)",
                                        ],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                    }}
                                    className="text-3xl font-semibold italic leading-tight text-pink-200 sm:text-4xl"
                                >
                                    Something special
                                    <br />
                                    is waiting...
                                </motion.h1>

                                <p className="mt-5 text-sm text-white/75 sm:text-base">
                                    {showStartButton
                                        ? "The beautiful moment has arrived ✨"
                                        : "A beautiful moment is coming ✨"}
                                </p>

                                <p className="mt-7 text-[10px] uppercase tracking-[0.38em] text-[#b99b65]/75">
                                    {showStartButton
                                        ? "Your surprise is ready"
                                        : "Get ready to celebrate"}
                                </p>
                            </div>

                            {/* LOADING BAR */}

                            <div className="relative z-10 mx-auto mt-5 h-[7px] w-[85%] overflow-hidden rounded-full bg-white/15">
                                <motion.div
                                    className="h-full rounded-full bg-gradient-to-r from-amber-400 via-pink-400 to-fuchsia-500"
                                    initial={{ width: "0%" }}
                                    animate={{
                                        width: showStartButton ? "100%" : `${((10 - remaining) / 10) * 100}%`,
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>

                            {/* OPEN BUTTON */}

                            <AnimatePresence>
                                {showStartButton && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                            scale: 0.9,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: "backOut",
                                        }}
                                        className="relative z-20 mt-7 flex justify-center"
                                    >
                                        <Button
                                            onClick={() => setStep(1)}
                                            className="
                                                w-full max-w-[320px]
                                                justify-center rounded-full
                                                border border-[#f8d98e]/40
                                                bg-gradient-to-r
                                                from-[#c58b37] via-[#f0c878]
                                                to-[#c58b37]
                                                text-black
                                                shadow-[0_8px_35px_rgba(218,170,95,0.3)]
                                                transition-transform hover:scale-[1.03]
                                            "
                                        >
                                            <Gift size={21} />
                                            <span>Open It!</span>
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    <BottomBalloons />

                    <div className="fixed bottom-5 right-5 z-40 text-sm text-white/35">
                        @Rafee🫶protiva
                    </div>
                </motion.div>
            )}

            {/* STEP 1 — ORIGINAL BIRTHDAY FIREWORK SHOW */}

            {step === 1 && (
                <motion.div
                    key="step1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 overflow-hidden bg-[#03050f]"
                >
                    <div className="absolute inset-0 bg-[#03050f]" />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(80,50,180,0.27),transparent_62%)]" />

                    <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(circle_at_50%_100%,rgba(255,70,180,0.15),transparent_65%)]" />

                    <BackgroundFireworks />

                    {showCurtainVideo && (
                        <motion.video
                            key="curtain-video"
                            src="/curtain.mp4"
                            autoPlay
                            muted
                            playsInline
                            preload="auto"
                            onTimeUpdate={handleCurtainVideoTime}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="
                                pointer-events-none absolute inset-0 z-20
                                h-full w-full object-contain mix-blend-screen
                            "
                        />
                    )}

                    {/* Birthday card */}

                    <div className="absolute inset-x-0 top-[5%] z-30 flex justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="
                                relative w-full max-w-[420px]
                                rounded-[42px] border border-white/25
                                bg-white/[0.90] p-5
                                shadow-[0_25px_80px_rgba(0,0,0,0.45)]
                                backdrop-blur-xl
                            "
                        >
                            <div className="pointer-events-none absolute inset-0 rounded-[42px] bg-gradient-to-b from-white/50 to-transparent" />

                            <div className="
                                relative z-10 flex h-[105px] w-full
                                items-center justify-center overflow-hidden
                                rounded-[30px] bg-gradient-to-b
                                from-pink-100 to-pink-200 shadow-inner
                            ">
                                <motion.img
                                    key={showSecondGif ? "gif-5" : "gif-121"}
                                    src={showSecondGif ? "/gifs/5.webp" : "/gifs/121.webp"}
                                    alt="Birthday animation"
                                    className="h-full w-full object-contain"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.35 }}
                                />
                            </div>

                            <div className="relative z-10 mt-5 text-center">
                                <h1 className="text-2xl font-semibold leading-tight text-primary md:text-3xl">
                                    Happy Birthday,
                                    <br />
                                    Cutie ❤️
                                </h1>

                                <p className="mt-2 text-sm text-primary/65 md:text-base">
                                    Today is all about you ✨
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <BirthdayFireworkShow
                        onAllLettersShown={() => setShowSecondGif(true)}
                        onBalloonPhase={() => setShowCurtainVideo(true)}
                    />

                    <motion.div
                        className="absolute left-1/2 top-[27%] z-30 -translate-x-1/2 whitespace-nowrap"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">
                            A little surprise
                        </p>
                    </motion.div>

                    <AnimatePresence>
                        {showStartButton && (
                            <motion.div
                                initial={{ opacity: 0, y: 35, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, ease: "backOut" }}
                                className="fixed bottom-8 left-1/2 z-[200] -translate-x-1/2 px-4"
                            >
                                <Button
                                    onClick={() => onNext?.()}
                                    className="
                                        min-w-[230px] justify-center
                                        bg-[#f1caeb] text-primary
                                        shadow-[0_10px_40px_rgba(255,120,210,0.35)]
                                    "
                                >
                                    <Heart size={20} />
                                    <span>Start the surprise</span>
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="fixed bottom-4 right-4 z-[150] text-sm text-white/30">
                        @Rafee🫶protiva
                    </div>
                </motion.div>
            )}

            {/* STEP 2 — ORIGINAL CUTIEPIE SCREEN */}

            {step === 2 && (
                <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="
                        fixed inset-0 flex min-h-screen
                        items-center justify-center overflow-y-auto
                        px-4 py-6
                    "
                >
                    <div className="
                        mx-auto flex w-full max-w-[440px]
                        flex-col items-center gap-4
                        rounded-[60px] bg-[#fff8fc] p-7 drop-shadow-2xl
                    ">
                        <div className="
                            relative flex h-44 w-full items-end
                            justify-center overflow-hidden rounded-[40px]
                            bg-gradient-to-b from-white/80 to-pink-200
                            shadow-inner md:h-52
                        ">
                            <img
                                loading="lazy"
                                src="/gifs/intro.gif"
                                alt="Cute"
                                className="w-26 md:w-32"
                            />
                        </div>

                        <div className="text-center">
                            <h1 className="
                                text-2xl font-semibold leading-tight
                                text-primary drop-shadow md:text-3xl
                            ">
                                A Cutiepie was born today,
                                <br />
                                16 years ago!
                            </h1>

                            <p className="mt-4 text-foreground">
                                Yes, it’s YOU! A little surprise awaits...
                            </p>
                        </div>

                        <div className="mt-4">
                            <Button
                                onClick={() => onNext?.()}
                                className="justify-center bg-[#f1caeb] text-primary"
                            >
                                <Gift size={20} />
                                <span>Start the surprise</span>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
