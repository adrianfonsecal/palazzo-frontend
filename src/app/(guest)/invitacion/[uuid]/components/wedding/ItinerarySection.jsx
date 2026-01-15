'use client'
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Clock, Church, PartyPopper, UtensilsCrossed } from 'lucide-react';



const ItineraryItem = ({ time, title, description, icon, delay }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <div 
      ref={ref}
      className={`flex gap-6 md:gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className="relative flex flex-col items-center">
        <div className="glass-card flex h-14 w-14 items-center justify-center rounded-full text-primary">
          {icon}
        </div>
        <div className="mt-4 h-full w-px bg-gradient-to-b from-primary/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="pb-16">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{time}</p>
        <h3 className="mt-2 font-serif text-2xl md:text-3xl text-foreground">{title}</h3>
        <p className="mt-3 max-w-md text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const ItinerarySection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  const events = [
    {
      time: '3:00 PM',
      title: 'Wedding Ceremony',
      description: 'Join us at the historic Cathedral of San Lorenzo as we exchange our vows in a traditional ceremony.',
      icon: <Church className="h-6 w-6" />
    },
    {
      time: '5:00 PM',
      title: 'Cocktail Hour',
      description: 'Celebrate with champagne and hors d\'oeuvres in the palazzo gardens while we capture our first moments as newlyweds.',
      icon: <PartyPopper className="h-6 w-6" />
    },
    {
      time: '7:00 PM',
      title: 'Reception Dinner',
      description: 'An elegant five-course Italian dinner in the grand ballroom, followed by music and dancing until midnight.',
      icon: <UtensilsCrossed className="h-6 w-6" />
    },
    {
      time: '11:00 PM',
      title: 'After Party',
      description: 'Continue the celebration with cocktails, desserts, and dancing under the stars in the courtyard.',
      icon: <Clock className="h-6 w-6" />
    }
  ];

  return (
    <section className="relative min-h-screen bg-background py-24 md:py-32">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div 
          ref={titleRef}
          className={`mb-20 text-center transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">The Celebration</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">Our Day</h2>
          <div className="section-divider mt-8" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {events.map((event, index) => (
            <ItineraryItem
              key={event.title}
              {...event}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;
