import { Heart } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="relative bg-background py-16 border-t border-border/50">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
          <Heart className="h-4 w-4 text-primary" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
        
        <h3 className="mt-8 font-serif text-2xl md:text-3xl text-foreground">
          Sofia & Alessandro
        </h3>
        
        <p className="mt-4 text-muted-foreground">
          September 21, 2025 • Florence, Italy
        </p>
        
        <div className="mt-8 flex justify-center gap-8">
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Our Story
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Registry
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </div>
        
        <p className="mt-12 text-xs text-muted-foreground/60">
          Made with love for our special day
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
