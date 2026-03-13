import { Heart } from 'lucide-react';

const FooterSection = ({ weddingName, weddingDate, weddingLocation }) => {
  return (
    <footer className="relative bg-background py-16 border-t border-border/50">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
          <Heart className="h-4 w-4 text-primary" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        <h3 className="mt-8 font-serif text-2xl md:text-3xl text-foreground">
          {weddingName}
        </h3>

        <p className="mt-4 text-muted-foreground">
          {weddingDate}
        </p>
        <p className="mt-4 text-muted-foreground">{weddingLocation}</p>

        <p className="mt-12 text-xs text-muted-foreground/60">
          Hecho con amor por:
        </p>
        {/* CENTER the image */}
        <a href="https://palazzoinvites.com" target="_blank" rel="noopener noreferrer">
          <img src="/WebsiteLogoDark.png" className="w-24 h-24 mx-auto" alt="WebsiteLogoDark" />
        </a>

      </div>
    </footer>
  );
};

export default FooterSection;
