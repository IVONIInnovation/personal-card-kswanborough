'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Globe, 
  Linkedin, 
  Circle, 
  ChevronRight, 
  ChevronDown, 
  ArrowLeft, 
  MapPin,
  Menu,
  Share2,
  Info,
  X,
  ExternalLink 
} from 'lucide-react';
import { Plus_Jakarta_Sans, Space_Grotesk, Roboto_Mono } from 'next/font/google';
import QRCode from 'qrcode.react';

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-plus-jakarta-sans',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-space-grotesk',
});

const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-roboto-mono',
});
type View = 'home' | 'about' | 'share' | 'contact';
type Location = 'UK' | 'ES' | null;
type Language = 'en' | 'es' | 'cat';

interface MenuProps {
  isOpen: boolean;
  currentView: View;
  onClose: () => void;
  onViewChange: (view: View) => void;
}

interface ShareViewProps {
  onClose: () => void;
  currentLanguage: Language;
}

interface AboutViewProps {
  onClose: () => void;
  currentLanguage: Language;
}
export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWebsites, setShowWebsites] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const [ukTime, setUkTime] = useState('');
  const [esTime, setEsTime] = useState('');
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [showLocation, setShowLocation] = useState<Location>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<View>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const websitesRef = useRef(null);
  const spinTimeoutRef = useRef(null);
  const themes = [
    'from-gray-200 via-gray-100 to-gray-200',
    'from-zinc-800 to-zinc-900',
    'from-indigo-500 to-violet-500',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-amber-500'
  ];

  const cardBg = themeIndex === 0 
    ? 'bg-gradient-to-br from-gray-600/80 to-gray-700/80' 
    : 'bg-gradient-to-br from-white/10 to-white/20';

  const translations = {
    en: {
      title: 'Brand Development • Design • Web',
      seeAll: 'see all',
      scroll: 'scroll',
      about: 'About',
      share: 'Share',
      contact: 'Contact',
      copyLink: 'Copy Link',
      linkCopied: 'Link Copied!',
      location: {
        uk: 'York, UK',
        es: 'Barcelona, Spain'
      }
    },
    es: {
      title: 'Desarrollo de Marca • Diseño • Web',
      seeAll: 'ver todo',
      scroll: 'desplazar',
      about: 'Sobre mí',
      share: 'Compartir',
      contact: 'Contacto',
      copyLink: 'Copiar enlace',
      linkCopied: '¡Enlace copiado!',
      location: {
        uk: 'York, Reino Unido',
        es: 'Barcelona, España'
      }
    },
    cat: {
      title: 'Desenvolupament de Marca • Disseny • Web',
      seeAll: 'veure tot',
      scroll: 'desplaçar',
      about: 'Sobre mi',
      share: 'Compartir',
      contact: 'Contacte',
      copyLink: 'Copiar enllaç',
      linkCopied: 'Enllaç copiat!',
      location: {
        uk: 'York, Regne Unit',
        es: 'Barcelona, Espanya'
      }
    }
  };
  const websites = [
    // ... (keep your existing websites array)
  ];

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  const handleWebsitesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowWebsites(!showWebsites);
  };

  const handleScroll = () => {
    if (websitesRef.current) {
      const { scrollTop } = websitesRef.current;
      if (scrollTop > 20) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    }
  };

  const handleCardClick = () => {
    if (!showWebsites && !isSpinning) {
      setIsSpinning(true);
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }
      spinTimeoutRef.current = setTimeout(() => {
        setIsSpinning(false);
      }, 300);
    }
  };

  const handleViewChange = (view: View) => {
    setIsSpinning(true);
    setTimeout(() => {
      setCurrentView(view);
      setIsSpinning(false);
    }, 300);
  };

  const handleTimeClick = (location: Location) => {
    setShowLocation(prev => prev === location ? null : location);
    setTimeout(() => setShowLocation(null), 2000);
  };

  const handleLanguageChange = () => {
    setCurrentLanguage(prev => {
      if (prev === 'en') return 'es';
      if (prev === 'es') return 'cat';
      return 'en';
    });
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };
  useEffect(() => {
    const updateTimes = () => {
      setUkTime(new Date().toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit', 
        timeZone: 'Europe/London' 
      }));
      setEsTime(new Date().toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit', 
        timeZone: 'Europe/Madrid' 
      }));
    };
    updateTimes();
    const interval = setInterval(updateTimes, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }
    };
  }, []);
  const MenuPanel: React.FC<MenuProps> = ({ isOpen, currentView, onClose, onViewChange }) => {
  return (
    <div 
      className={`absolute inset-y-0 right-0 flex items-center transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 flex items-center gap-4">
        {['about', 'share', 'contact'].map((view) => (
          <button
            key={view}
            onClick={() => onViewChange(view as View)}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              currentView === view ? 'bg-black/10' : 'hover:bg-black/5'
            }`}
          >
            <span className="text-sm font-medium text-gray-800">
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
  const ShareView: React.FC<ShareViewProps> = ({ onClose, currentLanguage }) => {
  return (
    <div className="h-full p-5 flex flex-col items-center justify-center space-y-4">
      <button 
        onClick={onClose}
        className="absolute top-3 left-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-white/70" />
      </button>
      
      <div className="bg-white p-4 rounded-lg">
        <QRCode 
          value={window.location.href}
          size={160}
          level="H"
          includeMargin={true}
        />
      </div>
      
      <button
        onClick={handleShareLink}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
      >
        <ExternalLink className="w-4 h-4 text-white/70" />
        <span className="text-sm text-white/90">
          {translations[currentLanguage].copyLink}
        </span>
      </button>
    </div>
  );
};
  const AboutView: React.FC<AboutViewProps> = ({ onClose, currentLanguage }) => {
  return (
    <div className="h-full p-5">
      <button 
        onClick={onClose}
        className="absolute top-3 left-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-white/70" />
      </button>

      <div className="flex justify-between">
        <div className="space-y-4">
          <div className="space-y-0.5">
            <h1 className="text-lg font-medium tracking-tight text-white font-plus-jakarta-sans">
              Kai Swanborough
            </h1>
            <p className="text-xs font-regular text-white/80 font-roboto-mono tracking-tight">
              {translations[currentLanguage].title}
            </p>
          </div>

          <div className="space-y-2 text-xs text-white/90 font-space-grotesk">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span>{translations[currentLanguage].location.uk}</span>
            </div>
            <div className="flex items-center gap-2 ml-5">
              <span>{translations[currentLanguage].location.es}</span>
            </div>
            
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/70">BeVisioneers: Mercedes-Benz Fellowship</span>
                <span className="text-white/50">Fellow 24/25</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">ADG-FAD</span>
                <span className="text-white/50">Member</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-24 h-24 rounded-xl overflow-hidden">
          <img
            src="/profile-image.jpg"
            alt="Kai Swanborough"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[themeIndex]} transition-all duration-1000 flex flex-col items-center justify-center gap-8 p-6 ${plusJakartaSans.variable} ${spaceGrotesk.variable} ${robotoMono.variable} font-sans`}>
      <div className="w-80 h-48 [perspective:1000px]">
        <div 
          onClick={handleCardClick}
          className={`relative w-full h-full cursor-pointer transition-all duration-300 ease-in-out [transform-style:preserve-3d] ${
            isSpinning ? '[transform:rotateY(360deg)]' : '[transform:rotateY(0deg)]'
          }`}
        >
          {/* Card Content */}
          <div className="absolute w-full h-full rounded-xl overflow-hidden ring-2 ring-white/30">
            <div className={`absolute inset-0 ${cardBg} backdrop-blur-xl`} />
            
            <div className="relative h-full">
              {currentView === 'home' && (
                // Your existing home view content
                <div className="relative h-full p-5">
                  {/* ... (keep your existing home view JSX) ... */}
                </div>
              )}

              {currentView === 'about' && (
                <AboutView 
                  onClose={() => handleViewChange('home')}
                  currentLanguage={currentLanguage}
                />
              )}

              {currentView === 'share' && (
                <ShareView
                  onClose={() => handleViewChange('home')}
                  currentLanguage={currentLanguage}
                />
              )}

              {currentView === 'contact' && (
                // Contact view just redirects to home
                <div className="relative h-full p-5">
                  {/* ... (keep your existing home view JSX) ... */}
                </div>
              )}
              {/* Control Panel */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-8">
        {!isMenuOpen && (
          <>
            <div 
              onClick={() => setThemeIndex((prev) => (prev + 1) % themes.length)}
              className={`w-4 h-4 rounded-full transition-all duration-300 bg-gradient-to-br ${themes[themeIndex]} hover:scale-110 cursor-pointer ring-1 ring-black/10 hover:ring-black/20 shadow-sm`}
            />
            <div className="flex items-center gap-6">
              <div 
                className="flex items-center cursor-pointer relative"
                onClick={() => handleTimeClick('UK')}
              >
                <span className="font-roboto-mono text-sm font-medium tracking-tight text-gray-800/70">{ukTime}</span>
                {showLocation === 'UK' && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded-md whitespace-nowrap flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{translations[currentLanguage].location.uk}</span>
                  </div>
                )}
              </div>
              <div className="w-px h-3 bg-gray-400/20" />
              <div 
                className="flex items-center cursor-pointer relative"
                onClick={() => handleTimeClick('ES')}
              >
                <span className="font-roboto-mono text-sm font-medium tracking-tight text-gray-800/70">{esTime}</span>
                {showLocation === 'ES' && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded-md whitespace-nowrap flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{translations[currentLanguage].location.es}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <MenuPanel
          isOpen={isMenuOpen}
          currentView={currentView}
          onClose={() => setIsMenuOpen(false)}
          onViewChange={handleViewChange}
        />

        <button
          onClick={handleMenuToggle}
          className={`flex items-center justify-center w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 transition-colors ${
            isMenuOpen ? 'ml-auto' : ''
          }`}
        >
          {isMenuOpen ? (
            <X className="w-3 h-3 text-gray-800/70" />
          ) : (
            <Menu className="w-3 h-3 text-gray-800/70" />
          )}
        </button>

        {!isMenuOpen && (
          <button
            onClick={handleLanguageChange}
            className="text-xs font-medium text-gray-800/70 hover:text-gray-800 transition-colors"
          >
            {currentLanguage.toUpperCase()}
          </button>
        )}
      </div>
    </div>
  );
}
