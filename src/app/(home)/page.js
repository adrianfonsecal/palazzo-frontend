import Image from "next/image";
import dashboardImg from '@/assets/images/dashboard-screenshot.png';
//import InvitationPage from "./(guest)/invitacion/[uuid]/page";
import palazzoLogo from '../../../public/WebsiteLogoLight.png';
import Link from 'next/link';
import { CheckCircle2, LayoutDashboard, Users, Mail, HeartHandshake, ArrowUpRight } from 'lucide-react';

// Componentes de UI sencillos para mantener el código limpio dentro del archivo
const ButtonPrimary = ({ children, className, ...props }) => (
  <button
    className={`bg-carbonblack text-white px-8 py-3 rounded-lg font-sans-body font-medium transition-all hover:bg-sand hover:shadow-lg hover:-translate-y-1 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const ButtonOutline = ({ children, className, ...props }) => (
  <button
    className={`border border-charcoal text-carbonblack px-8 py-3 rounded-lg font-sans-body font-medium transition-all hover:bg-ashgrey/20 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const FeatureCard = ({ icon: Icon, title, description, imageSrc, url }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white border border-ashgrey/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
    <div className="p-8 flex flex-col h-full z-10">
      <div className="w-12 h-12 bg-sand/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sand/20 transition-colors">
        <Icon className="w-6 h-6 text-sand" />
      </div>
      <h3 className="font-serif-heading text-2xl text-carbonblack mb-3">{title}</h3>
      <p className="font-sans-body text-charcoal/80 text-sm leading-relaxed flex-grow">
        {description}
      </p>
      <Link href={`${url}#paquetes`}>
      
        <div className="mt-6 flex items-center text-sand font-medium text-sm group-hover:translate-x-2 transition-transform cursor-pointer">
          Conocer más <ArrowUpRight className="w-4 h-4 ml-2" />
        </div>
      </Link>
    </div>

    {/* Decoración de fondo sutil */}
    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-dustgrey/10 rounded-full blur-2xl group-hover:bg-sand/10 transition-colors"></div>
  </div>
);

export default function Home() { 
  const palazzoUrl = "https://palazzoinvites.com";
  return (
    <div className="min-h-screen bg-[#F5F5F7]"> {/* Fondo Dust Grey muy suave tipo Office */}

      {/* --- NAVBAR ESTILO OFFICE --- */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-ashgrey/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logotipo Texto */}
            <Image src={palazzoLogo} alt="Palazzo Invites Logo" width={200} />
          </div>

          <div className="hidden md:flex items-center gap-8 font-sans-body text-sm font-medium text-charcoal">
            <Link href={`${palazzoUrl}#beneficios`} className="hover:text-sand transition-colors" target="_blank" rel="noopener noreferrer">Funcionalidades</Link>
            <Link href={`${palazzoUrl}#ejemplos`} className="hover:text-sand transition-colors" target="_blank" rel="noopener noreferrer">Diseños</Link>
            <Link href={`${palazzoUrl}#planes`} className="hover:text-sand transition-colors" target="_blank" rel="noopener noreferrer">Planes</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/register" className="font-sans-body text-sm font-medium text-carbonblack hover:underline hidden sm:block">
              Registrarse
            </Link>
            <Link href="/login">
              <ButtonPrimary className="px-5 py-2 text-sm">
                Iniciar Sesión
              </ButtonPrimary>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (Split Layout) --- */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Copy */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/10 border border-sand/20 text-sand text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-sand animate-pulse"></span>
              Nuevo CRM 2.0
            </div>

            <h1 className="font-serif-heading text-5xl lg:text-7xl text-carbonblack leading-[1.1]">
              Tu boda, gestionada con <span className="italic font-script text-sand pr-2">maestría</span> digital.
            </h1>

            <p className="font-sans-body text-lg text-charcoal max-w-lg leading-relaxed">
              La plataforma integral para wedding planners y novios que buscan perfección.
              Controla invitados, RSVPs y diseños de lujo en un solo lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/login" className="w-full sm:w-auto">
                <ButtonPrimary className="w-full sm:w-auto text-lg px-10">
                  Iniciar Sesión
                </ButtonPrimary>
              </Link>
              <Link href={`${palazzoUrl}#contacto`} className="w-full sm:w-auto" target="_blank" rel="noopener noreferrer">
                <ButtonOutline className="w-full sm:w-auto text-lg px-10 border-ashgrey inline-flex items-center justify-center">
                  Obtener más información <ArrowUpRight className="w-4 h-4 ml-2" />
                </ButtonOutline>
              </Link>
            </div>

            <p className="text-xs text-ashgrey font-sans-body pt-2">
              * No requiere tarjeta de crédito para visualizar demos.
            </p>
          </div>

          {/* Right Column: Visual Mockup (Office Style) */}
          <div className="relative lg:h-[600px] w-full flex items-center justify-center animate-fade-up delay-200">
            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 bg-gradient-to-tr from-ashgrey/20 to-sand/10 rounded-[3rem] transform rotate-3 scale-95"></div>

            {/* Main Image Container - Glassmorphism */}
            <div className="relative w-full h-full max-h-[500px] bg-white rounded-2xl shadow-2xl border border-white/40 overflow-hidden transform -rotate-1 hover:rotate-0 transition-all duration-700">
              {/* Aquí iría una imagen real de tu Dashboard */}
              <div className="absolute inset-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={dashboardImg}
                  alt="Dashboard Preview"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Floating Element 1: RSVP Notification */}
              <div className="absolute top-10 right-10 bg-white p-4 rounded-xl shadow-lg border border-ashgrey/20 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-xs text-charcoal font-bold">Nueva Confirmación</p>
                  <p className="text-xs text-ashgrey">Familia Montiel aceptó</p>
                </div>
              </div>

              {/* Floating Element 2: Guest Count */}
              <div className="absolute bottom-10 left-10 bg-carbonblack p-4 rounded-xl shadow-lg border border-charcoal flex items-center gap-3 animate-float delay-500">
                <div className="w-10 h-10 rounded-full bg-sand/20 flex items-center justify-center text-sand">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xs text-white font-bold">Invitados Totales</p>
                  <p className="text-lg text-sand font-serif-heading leading-none">245</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID FEATURES (Microsoft Style) --- */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif-heading text-4xl text-carbonblack mb-4">Todo lo que necesitas para decir "Sí"</h2>
            <p className="font-sans-body text-charcoal max-w-2xl mx-auto">
              Herramientas poderosas diseñadas con la simplicidad en mente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card 1: Invitaciones */}
            <FeatureCard
              icon={Mail}
              title="Invitaciones Inteligentes"
              description="Diseños web que cautivan. Genera enlaces únicos por familia, controla pases y evita invitados no deseados automáticamente."
            />

            {/* Card 2: Gestión de Invitados */}
            <FeatureCard
              icon={Users}
              title="Lista de Invitados en Tiempo Real"
              description="Olvídate de Excel. Visualiza quién ha confirmado, quién falta y gestiona mesas desde un panel intuitivo y elegante."
            />

            {/* Card 3: Dashboard */}
            <FeatureCard
              icon={LayoutDashboard}
              title="Dashboard Ejecutivo"
              description="Métricas claras de tu evento. Porcentajes de asistencia, restricciones alimentarias y logística en un solo vistazo."
            />

            {/* Card 4 (Span 2 cols): Branding */}
            <div className="md:col-span-2 lg:col-span-2 bg-carbonblack rounded-2xl p-8 md:p-12 relative overflow-hidden group shadow-xl">
              <div className="relative z-10 max-w-lg">
                <h3 className="font-serif-heading text-3xl text-white mb-4">La distinción está en los detalles</h3>
                <p className="font-sans-body text-ashgrey mb-8 leading-relaxed">
                  Nuestras plantillas no son simples correos. Son experiencias inmersivas diseñadas por artistas,
                  con tipografías como <span className="text-sand font-script text-xl">Great Vibes</span> y <span className="text-sand font-serif-heading">Playfair Display</span>.
                </p>
                <Link href={`${palazzoUrl}#ejemplos`} target="_blank" rel="noopener noreferrer">
                  <ButtonOutline className="border-sand text-sand hover:bg-sand hover:text-carbonblack inline-flex items-center justify-center">
                    Ver Galería de Diseños <ArrowUpRight className="w-4 h-4 ml-2" />
                  </ButtonOutline>
                </Link>
              </div>
              {/* Decorative Gradient Background */}
              <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-sand/20 to-transparent"></div>
            </div>

            {/* Card 5: Collaboration */}
            <FeatureCard
              icon={HeartHandshake}
              title="Colaboración Novios & Planner"
              description="Un espacio compartido donde las decisiones se toman en conjunto y la información fluye sin caos."
            />

          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-24 bg-dustgrey/30 border-t border-ashgrey/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif-heading text-4xl md:text-5xl text-carbonblack mb-6">
            Comienza a diseñar la experiencia.
          </h2>
          <p className="font-sans-body text-lg text-charcoal mb-10">
            Únete a las parejas y planners que han elevado el estándar de sus eventos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <ButtonPrimary className="w-full sm:w-auto text-lg px-12 shadow-xl shadow-sand/20">
                Crear mi cuenta
              </ButtonPrimary>
            </Link>
            <Link href="https://app.palazzoinvites.com/invitacion/1ee0208b-58aa-4327-b0fd-de019e0340c3" target="_blank" rel="noopener noreferrer">
              <span className="text-charcoal hover:text-carbonblack font-medium underline underline-offset-4 cursor-pointer inline-flex items-center justify-center">
                Ver una invitación de ejemplo <ArrowUpRight className="w-4 h-4 inline-block ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER SIMPLIFICADO --- */}
      <footer className="bg-white border-t border-ashgrey/30 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            {/* Logotipo Texto */}
            <Image src={palazzoLogo} alt="Palazzo Invites Logo" width={200} />
          </div>
          <div className="text-ashgrey text-sm font-sans-body">
            © 2026 Palazzo Invites. Todos los derechos reservados.
          </div>
          <div className="flex gap-6 text-charcoal">
            {/* Social Icons Placeholders */}
            <div className="w-5 h-5 bg-dustgrey rounded-full hover:bg-sand cursor-pointer transition-colors"></div>
            <div className="w-5 h-5 bg-dustgrey rounded-full hover:bg-sand cursor-pointer transition-colors"></div>
            <div className="w-5 h-5 bg-dustgrey rounded-full hover:bg-sand cursor-pointer transition-colors"></div>
          </div>
        </div>
      </footer>

    </div>
  );
}