'use client'
import { useRef } from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import churchImage from '@/assets/images/church-ceremony.jpg';
import Image from 'next/image';

const CeremonySection = ({weddingLocation}) => {
  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);
  const { ref: textRef, isVisible } = useScrollReveal({ threshold: 0.3 });

  // Scale and opacity based on scroll progress
  const scale = 0.8 + progress * 0.2;
  const imageOpacity = 0.3 + progress * 0.7;
  const translateY = (1 - progress) * 100;

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[150vh] bg-background"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Image Container */}
        <div 
          className="relative h-[80vh] w-full max-w-md mx-6 overflow-hidden rounded-3xl"
          style={{
            transform: `scale(${scale}) translateY(${translateY}px)`,
            opacity: imageOpacity,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <Image
            src={churchImage}
            alt="Cathedral ceremony"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          {/* Overlay Content */}
          <div 
            ref={textRef}
            className={`absolute inset-x-0 bottom-0 p-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">The Ceremony</p>
            <h3 className="mt-3 font-serif text-3xl md:text-4xl text-foreground">{weddingLocation}</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Via San Lorenzo, 16<br />
              Florence, Italy
            </p>
            <button className="glass-button mt-6 text-foreground text-sm">
              View on Map
            </button>
          </div>
        </div>

        {/* Side decorative text */}
        <div 
          className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block"
          style={{ opacity: progress }}
        >
          <p className="font-serif text-8xl text-primary/10 [writing-mode:vertical-rl] rotate-180">
            Ceremony
          </p>
        </div>
      </div>
    </section>
  );
};

export default CeremonySection;
