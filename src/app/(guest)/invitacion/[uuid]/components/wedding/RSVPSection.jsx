'use client'
import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Check, X, Heart, Users } from 'lucide-react';
import { updateInvitationByUuid } from '@/lib/api';

const RSVPSection = ({ guestList, familyName, invitationUuid }) => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: formRef, isVisible: formVisible } = useScrollReveal();

  const [response, setResponse] = useState(null);
  const [companions, setCompanions] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [guestListState, setGuestList] = useState(guestList);

  // Función para manejar la respuesta del invitado
  const handleGuestResponse = (guestId, status) => {
    // 1. Actualizamos la lista localmente para que la UI reaccione rápido
    const updatedList = guestList.map((guest) => {
      if (guest.id === guestId) {
        return { ...guest, attendance: status };
      }
      return guest;
    });

    setGuestList(updatedList); // Actualizamos el estado de la lista

    // 2. Lógica del contador y API
    if (status === 'ACCEPTED') {
      setCompanions((prev) => prev + 1); // Aumenta contador
      console.log(`API Call: Enviar ID ${guestId} con status 'ACCEPTED'`);
      // aquí llamarías a tu función: updateGuestStatus(guestId, 'ACCEPTED');
    } else {
      console.log(`API Call: Enviar ID ${guestId} con status 'DECLINED'`);
      // aquí llamarías a tu función: updateGuestStatus(guestId, 'DECLINED');
    }
  };

  if (submitted) {
    return (
      <section className="relative min-h-screen bg-background py-24 md:py-32 flex items-center">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="glass-card py-16">
            <Heart className="mx-auto h-16 w-16 text-primary animate-float" />
            <h3 className="mt-8 font-serif text-3xl md:text-4xl text-foreground">
              {response === 'attending' ? 'We Can\'t Wait to See You!' : 'We\'ll Miss You!'}
            </h3>
            <p className="mt-4 text-muted-foreground">
              {response === 'attending'
                ? `Thank you for confirming! We've noted ${companions} guest${companions > 1 ? 's' : ''}.`
                : 'Thank you for letting us know. You\'ll be in our thoughts on our special day.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-background py-24 md:py-32">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-64 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-64 bottom-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`mb-16 text-center transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Nos encantaría contar con tu presencia</p>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">Querido</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">{familyName}</h2>
          <div className="section-divider mt-8" />
          <p className="mt-8 text-muted-foreground">
            Kindly respond by August 15, 2025
          </p>
        </div>

        {/* RSVP Form */}
        <div
          ref={formRef}
          className={`transition-all duration-1000 delay-200 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="glass-card space-y-8">
            {/* Attendance Buttons */}
            <div>
              <p className="text-center text-foreground mb-6 font-serif text-lg">¿Nos acompañas a este evento tan especial?</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setResponse('attending')}
                  className={`flex-1 flex items-center justify-center gap-3 rounded-2xl border-2 p-6 transition-all duration-300 ${response === 'attending'
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                    }`}
                >
                  <Check className={`h-6 w-6 ${response === 'attending' ? 'text-primary' : ''}`} />
                  <span className="font-medium">Joyfully Accept</span>
                </button>

                <button
                  onClick={() => setResponse('not-attending')}
                  className={`flex-1 flex items-center justify-center gap-3 rounded-2xl border-2 p-6 transition-all duration-300 ${response === 'not-attending'
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                    }`}
                >
                  <X className={`h-6 w-6 ${response === 'not-attending' ? 'text-primary' : ''}`} />
                  <span className="font-medium">Regretfully Decline</span>
                </button>
              </div>
            </div>

            {/* Companion Count */}
            {response === 'attending' && (
              // <div className="space-y-4 animate-fade-up">
              //   <div className="flex items-center justify-center gap-2 text-muted-foreground">
              //     <Users className="h-5 w-5" />
              //     <span>Number of guests attending</span>
              //   </div>
              //   <div className="flex items-center justify-center gap-6">
              //     <button
              //       onClick={() => setCompanions(Math.max(1, companions - 1))}
              //       className="h-12 w-12 rounded-full border border-border hover:border-primary/50 text-foreground transition-colors text-xl"
              //     >
              //       −
              //     </button>
              //     <span className="font-serif text-4xl text-foreground w-12 text-center">{companions}</span>
              //     <button
              //       onClick={() => setCompanions(Math.min(4, companions + 1))}
              //       className="h-12 w-12 rounded-full border border-border hover:border-primary/50 text-foreground transition-colors text-xl"
              //     >
              //       +
              //     </button>
              //   </div>
              // </div>
              <div className="glass-card w-full max-w-xl mx-auto p-6 animate-fade-up">
                {/* Título en Serif elegante y color Primario (Dorado/Sand) */}
                <h3 className="font-serif text-2xl text-primary text-center mb-6 tracking-wide border-b border-primary/20 pb-4">
                  Lista de Invitados
                </h3>

                <div className="space-y-3">
                  {guestList.map((guest, index) => (
                    <div
                      key={guest.id}
                      className="flex flex-row items-center justify-between gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors border-b border-primary/10 last:border-0 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="font-sans text-foreground/90 text-lg font-light truncate">
                        {guest.full_name}
                      </span>

                      <div className="flex items-center gap-2 shrink-0">


                        {guest.attendance === 'PENDING' ? (
                          <>
                            <button
                              onClick={() => handleGuestResponse(guest.id, 'ACCEPTED')}
                              className="glass-button px-4 py-1.5 text-xs bg-primary/10 hover:bg-primary/30 text-primary-foreground border-primary/20 hover:scale-105"
                            >
                              CONFIRMAR
                            </button>
                            <button
                              onClick={() => handleGuestResponse(guest.id, 'DECLINED')}
                              className="glass-button px-4 py-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20 hover:scale-105"
                            >
                              DECLINAR
                            </button>
                          </>
                        ) : (
                          /* CASO 2: Si YA RESPONDIÓ, mostramos el BADGE (Botones desaparecen) */
                          <span className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider border shadow-sm ${guest.attendance === 'ACCEPTED'
                              ? 'bg-primary/20 text-primary-foreground border-primary/30'
                              : 'bg-destructive/10 text-destructive border-destructive/20'
                            }`}>
                            {guest.attendance === 'ACCEPTED' ? 'ASISTIRÁ' : 'NO ASISTIRÁ'}
                          </span>
                        )}

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {response && (
              <button
                onClick={handleGuestResponse}
                className="glass-button w-full text-foreground animate-fade-up"
              >
                Confirmar {companions} invitados
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
