'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import churchImage from "@/assets/images/hero-wedding.jpg"


const HeroSection = ( { weddingName, weddingDate }) => {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;
  const opacity = Math.max(1 - scrollY / 600, 0);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-100"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <Image
          src={churchImage}
          alt="Wedding celebration"
          className="h-[120%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      {/* Content */}
      <div 
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ opacity }}
      >
        <div className={`px-8 py-4 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="mb-4 font-serif text-lg tracking-[0.4em] text-primary uppercase text-white">
            Nos encantaría que formaran parte de:
          </p>
        </div>
        
        <h1 
          className={`font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-foreground transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {weddingName}
        </h1>
        
        <div className={`mt-8 transition-all duration-1000 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground tracking-widest">
            {weddingDate}
          </p>
        </div>

        <div className={`mt-12 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button className="glass-button text-foreground">
            View Our Story
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
            <div className="h-12 w-px bg-gradient-to-b from-primary to-transparent animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
