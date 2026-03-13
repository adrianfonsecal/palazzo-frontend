"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";


const FRAME_COUNT = 192;

export default function WeddingSequence({ coupleNames, eventDate }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = [];
      let loadedCount = 0;

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        //const frameNumber = String(i + 1).padStart(3, '0');
        img.src = `/sequence/${i + 1}.webp`;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
          if (loadedCount === FRAME_COUNT) {
            setImages(loadedImages);
            setIsLoading(false);
          }
        };
        loadedImages[i] = img;
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const render = (progress) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(progress * FRAME_COUNT)
      );

      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (context && images[frameIndex]) {
        const img = images[frameIndex];

        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
        const x = canvasWidth / 2 - (img.width / 2) * scale;
        const y = canvasHeight / 2 - (img.height / 2) * scale;

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (progress >= 0.8) {
          context.shadowBlur = 20;
          context.shadowColor = "rgba(212, 175, 55, 0.2)";
        } else {
          context.shadowBlur = 0;
          context.shadowColor = "transparent";
        }

        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    const unsubscribe = smoothProgress.on("change", (latest) => {
      render(latest);
    });

    return () => unsubscribe();
  }, [images, smoothProgress]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress}%` }}
            className="h-[1px] bg-white w-full mb-4"
          />
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">
            Developing Memories {loadingProgress}%
          </p>
        </div>
      )}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        <canvas ref={canvasRef} className="max-w-full max-h-full" />

        {/* Gradient Overlay for Smooth Transition */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background via-background/60 to-transparent z-10 pointer-events-none" />

        <SceneText
          progress={smoothProgress}
          range={[0, 0.2]}
          title={coupleNames || "Nuestra Boda"}
          sub="Nos encantaría que formaran parte de este día tan especial."
          position="center"
        />
        <SceneText
          progress={smoothProgress}
          range={[0.25, 0.45]}
          title={eventDate || "Fecha por definirse"}
          sub="Save the date"
          position="left"
        />
        <SceneText
          progress={smoothProgress}
          range={[0.5, 0.7]}
          title="Los Votos"
          sub="Dos vidas, entrelazadas en un tapiz cinematográfico."
          position="right"
        />
        <SceneText
          progress={smoothProgress}
          range={[0.75, 0.95]}
          title="Siempre"
          sub="Revive el día que nunca termina."
          position="center"
          isCTA
        />
      </div>
    </div>
  );
}

function SceneText({ progress, range, title, sub, position, isCTA = false }) {
  const handleSubmit = () => {
    // dirígelo al componente RSVPSection
    const rsvpSection = document.getElementById('rsvp-section');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' });
    }

  }
  const opacity = useTransform(
    progress,
    [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [range[0], range[1]], [40, -40]);

  const alignmentClasses = {
    center: "items-center text-center",
    left: "items-start text-left pl-12 md:pl-24",
    right: "items-end text-right pr-12 md:pr-24",
  };

  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center pointer-events-none ${alignmentClasses[position]
        }`}
    >
      <h2 className="mb-4 font-serif-heading text-5xl tracking-[0.2em] md:tracking-[0.4em] uppercase text-sand md:text-9xl leading-none" >
        {title}
      </h2>
      <div className={`px-8 py-4 rounded-3xl backdrop-blur-md bg-white/30 border border-white/20 shadow-2xl transition-all duration-1000`}>
        <p className="mt-4 text-xlg md:text-base font-body uppercase tracking-widest text-carbonblack max-w-md ">
          {sub}
        </p>
      </div>
      {isCTA && (
        <button className="mt-8 px-8 py-3 bg-white text-black text-xs uppercase tracking-widest hover:bg-[#D4AF37] transition-colors pointer-events-auto" onClick={handleSubmit}>
          Confirmar Invitación
        </button>
      )}
    </motion.div>
  );
}
