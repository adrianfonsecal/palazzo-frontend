'use client'

import { useRef } from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import dressCodeImage from '@/assets/images/dress-code.jpg';
import Image from 'next/image';

const DressCodeSection = () => {
  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);
  const { ref: contentRef, isVisible } = useScrollReveal({ threshold: 0.3 });

  // Parallax effect for image
  const translateY = (0.5 - progress) * 100;
  const scale = 0.9 + progress * 0.1;

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[150vh] bg-background"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          {/* Image */}
          <div 
            className="relative h-[70vh] max-h-[600px] overflow-hidden rounded-3xl order-2 lg:order-1"
            style={{
              transform: `translateY(${translateY}px) scale(${scale})`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <Image
              src={dressCodeImage}
              alt="Black tie attire"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div 
            ref={contentRef}
            className={`text-center lg:text-left order-1 lg:order-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">Attire</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
              Dress Code
            </h2>
            <div className="section-divider mt-8 lg:mx-0" />
            
            <div className="mt-8 space-y-6">
              <div className="glass-card">
                <h4 className="font-serif text-xl text-foreground">Black Tie Optional</h4>
                <p className="mt-2 text-muted-foreground">
                  We invite you to dress in your finest evening attire for this special celebration.
                </p>
              </div>

              <div className="space-y-4 text-left">
                <div>
                  <h5 className="font-medium text-foreground">Gentlemen</h5>
                  <p className="text-sm text-muted-foreground">
                    Tuxedo or dark formal suit with tie or bow tie
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-foreground">Ladies</h5>
                  <p className="text-sm text-muted-foreground">
                    Floor-length evening gown or elegant cocktail dress
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground italic">
                Please note: The ceremony will be held in a historic cathedral. 
                We kindly ask guests to cover shoulders during the ceremony.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressCodeSection;
