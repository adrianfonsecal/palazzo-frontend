"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";

const FRAME_COUNT = 180;

export default function CinematicSequence() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Preload Sequence
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = [];
      let loadedCount = 0;

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        // Assuming the file names are ezgif-frame-001.jpg to ezgif-frame-180.jpg
        img.src = `/desscode-sequence/ezgif-frame-${(i + 1).toString().padStart(3, '0')}.jpg`; 
        img.onload = () => {
          loadedCount++;
          setProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
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

  // Canvas Render Loop
  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const render = (val) => {
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(val * FRAME_COUNT));
      const img = images[frameIndex];

      if (img && canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // "Contain" logic with centering
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    const unsubscribe = smoothProgress.on("change", render);
    return () => unsubscribe();
  }, [images, smoothProgress]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-white/40">Manifesting</p>
        </div>
      )}

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        
        {/* Scrollytelling Overlay Components */}
        <ContentBlock 
          progress={smoothProgress} 
          range={[0, 0.2]} 
          title="Código de vestimenta" 
          align="center"
        />
        <ContentBlock 
          progress={smoothProgress} 
          range={[0.25, 0.45]} 
          title="HOMBRES" 
          sub={[ "Saco y pantalón color azul marino o azules oscuros", "Formal con corbata o moño con camisa blanca o de tonos claros" ].join("\n")}
          align="left"
        />
        <ContentBlock 
          progress={smoothProgress} 
          range={[0.5, 0.7]} 
          title="" 
          sub="" 
          align="right"
        />
        <ContentBlock 
          progress={smoothProgress} 
          range={[0.75, 0.95]} 
          title="MUJERES" 
          sub={[ "Vestido largo o de coctel en tonos pasteles, neutros o joya", "Evitar colores muy brillantes o estampados llamativos" ].join("\n")}
          align="right"
        />
      </div>
    </div>
  );
}

function ContentBlock({ progress, range, title, sub, align, cta }) {
  const opacity = useTransform(progress, [range[0], range[0] + 0.1, range[1] - 0.1, range[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[1]], [20, -20]);

  const alignment = {
    center: "items-center text-center",
    left: "items-start text-left pl-10 md:pl-24",
    right: "items-end text-right pr-10 md:pr-24"
  };

  return (
    <motion.div 
      style={{ opacity, y }} 
      className={`absolute inset-0 flex flex-col justify-center pointer-events-none ${alignment[align]}`}
    >
      <h2 className="text-6xl md:text-9xl font-serif-heading tracking-tighter text-sand uppercase">{title}</h2>
      <p className="mt-4 text-sm md:text-lg text-white font-body tracking-widest max-w-lg">{sub}</p>
      {cta && (
        <motion.button className="mt-8 px-10 py-3 border border-white/20 text-white text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all pointer-events-auto">
          Explore Collection
        </motion.button>
      )}
    </motion.div>
  );
}
