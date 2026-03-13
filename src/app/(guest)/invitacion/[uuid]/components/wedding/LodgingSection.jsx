'use client'
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { MapPin, Star, ExternalLink } from 'lucide-react';
import hotelImage from '@/assets/images/hotel-lodging.jpg';
import Image from 'next/image';


const HotelCard = ({ name, rating, distance, price, description, delay }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`glass-card group cursor-pointer transition-all duration-700 hover:border-primary/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
            {name}
          </h4>
          <div className="mt-1 flex items-center gap-1">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-primary text-primary" />
            ))}
          </div>
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{description}</p>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{distance} de la ceremonia</span>
        </div>
        <span className="font-medium text-foreground">{price}/noche</span>
      </div>
    </div>
  );
};

const LodgingSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal();

  const hotels = [
    {
      name: 'Hotel Palazzo Vecchio',
      rating: 5,
      distance: '0.5 km',
      price: '$2500 MXN',
      description: 'Un palacio 16 siglo con suites elegantes con vistas al Duomo.'
    },
    {
      name: 'Villa Medici Suites',
      rating: 4,
      distance: '1.2 km',
      price: '$1500 MXN',
      description: 'Un hotel boutique con jardines hermosos y hospitalidad tradicional italiana.'
    },
    {
      name: 'The Florence Grand',
      rating: 5,
      distance: '0.8 km',
      price: '$2000 MXN',
      description: 'Modernidad y elegancia Renaissance en el corazón del centro histórico.'
    }
  ];

  return (
    <section className="relative min-h-screen bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`mb-16 text-center transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">Para nuestros invitados</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">Hospedaje</h2>
          <div className="section-divider mt-8" />
          <p className="mt-8 mx-auto max-w-xl text-muted-foreground">
            Hemos arreglado tarifas especiales en selectos hoteles cerca del lugar para nuestros invitados.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className={`relative h-[400px] overflow-hidden rounded-3xl transition-all duration-1000 ${imageVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <Image
              src={hotelImage}
              alt="Recommended hotel"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          {/* Hotel Cards */}
          <div className="space-y-4">
            {hotels.map((hotel, index) => (
              <HotelCard key={hotel.name} {...hotel} delay={index * 150} />
            ))}

            <p className="text-center text-sm text-muted-foreground pt-4">
              Utiliza el código <span className="font-medium text-primary">SOFIA&ALESSANDRO2025</span> para tarifas especiales
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LodgingSection;
