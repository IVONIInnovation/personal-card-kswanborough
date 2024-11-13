'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone, Globe, Linkedin, Circle, ChevronRight, ChevronDown, ArrowLeft } from 'lucide-react';
import { Plus_Jakarta_Sans, Space_Grotesk, Roboto_Mono } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plus-jakarta-sans',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-space-grotesk',
});

const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-roboto-mono',
});
export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWebsites, setShowWebsites] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const [ukTime, setUkTime] = useState('');
  const [esTime, setEsTime] = useState('');
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
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
  const websites = [
    {
      name: 'kaiswanborough.com',
      description: 'Freelance',
      url: 'https://kaiswanborough.com',
      priority: 1
    },
    {
      name: 'IVONI',
      links: [
        { text: '.org', url: 'https://ivoni.org' },
        { text: '.es', url: 'https://ivoni.es' },
        { text: '.cat', url: 'https://ivoni.cat' }
      ],
      description: 'Company',
      priority: 1
    },
    {
      name: 'agenciamira.es',
      description: 'BCN Agency',
      url: 'https://agenciamira.es',
      priority: 1
    },
    {
      name: 'globaloffset.co',
      description: 'Startup',
      url: 'https://globaloffset.co',
      priority: 1
    },
    {
      name: 'portaldiseno.es',
      description: 'Uni Portfolio',
      url: 'https://portaldiseno.es',
      priority: 2
    },
    {
      name: 'extraccion.net',
      description: 'Scholarship Project',
      url: 'https://extraccion.net',
      priority: 2
    },
    {
      name: 'mirafest.es',
      description: 'Festival',
      url: 'https://mirafest.es',
      priority: 2
    }
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
      // Clear any existing timeout
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }
      // Set timeout to remove spinning class after animation
      spinTimeoutRef.current = setTimeout(() => {
        setIsSpinning(false);
      }, 500); // Match this with the CSS animation duration
    }
  };
  useEffect(() => {
    const updateTimes = () => {
      setUkTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' }));
      setEsTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }));
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
  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[themeIndex]} transition-all duration-1000 flex flex-col items-center justify-center gap-8 p-6 ${plusJakartaSans.variable} ${spaceGrotesk.variable} ${robotoMono.variable}`}>
      <div className="w-80 h-48 [perspective:1000px]">
        <div 
          onClick={handleCardClick}
          className={`relative w-full h-full cursor-pointer transition-transform duration-500 [transform-style:preserve-3d] ${
            isSpinning ? '[transform:rotateY(360deg)]' : '[transform:rotateY(0deg)]'
          }`}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full rounded-xl overflow-hidden ring-2 ring-white/30">
            <div className={`absolute inset-0 ${cardBg} backdrop-blur-xl`} />
            
            <div className="relative h-full p-5">
              <div className="space-y-0.5">
                <h1 className="text-lg font-medium tracking-tight text-white font-['font-plus-jakarta-sans']">
                  Kai Swanborough
                </h1>
                <p className="text-xs font-regular text-white/80 font-['font-roboto-mono'] tracking-tight">
                  Brand Development • Design • Web
                </p>
              </div>

              <div className="mt-5 space-y-1.5 text-xs text-white/90 font-['font-space-grotesk']">
                <div 
                  className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                  onClick={(e) => handleLinkClick(e, 'tel:+447592660717')}
                >
                  <Phone className="w-3 h-3" />
                  <span>UK (+44) 7592 660717</span>
                </div>
                <div 
                  className="flex items-center gap-2 ml-5 cursor-pointer hover:text-white transition-colors"
                  onClick={(e) => handleLinkClick(e, 'tel:+34649058386')}
                >
                  <span>ES (+34) 649 058 386</span>
                </div>
                <div 
                  className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                  onClick={handleWebsitesClick}
                >
                  <Globe className="w-3 h-3" />
                  <span>kaiswanborough.com (see all)</span>
                </div>
                <div 
                  className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                  onClick={(e) => handleLinkClick(e, 'https://linkedin.com/in/kaiswanborough')}
                >
                  <Linkedin className="w-3 h-3" />
                  <span>in/kaiswanborough</span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-white/10" />
            </div>
            {/* Website Grid Overlay */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-2xl rounded-xl transition-all duration-300 ${
                showWebsites ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                ref={websitesRef}
                onScroll={handleScroll}
                className="h-full overflow-y-auto px-5 pt-5 pb-12"
              >
                <div className="space-y-4 relative">
                  {/* Main websites */}
                  <div className="space-y-2.5">
                    {websites.filter(w => w.priority === 1).map((site, i) => (
                      <div key={i} className="group">
                        {site.links ? (
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <Circle className="w-1.5 h-1.5 text-white/40" />
                              <span className="text-sm text-white font-['font-space-grotesk']">{site.name}</span>
                              {site.links.map((link, j) => (
                                <span
                                  key={j}
                                  onClick={(e) => handleLinkClick(e, link.url)}
                                  className="text-sm text-white/70 font-['font-space-grotesk'] hover:text-white/90 transition-colors cursor-pointer"
                                >
                                  {link.text}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-2">
                              <ChevronRight className="w-3 h-3 text-white/30" />
                              <span className="text-xs text-white/50 font-['font-space-grotesk']">{site.description}</span>
                            </div>
                          </div>
                        ) : (
                          <div 
                            className="flex items-center justify-between gap-3 cursor-pointer"
                            onClick={(e) => handleLinkClick(e, site.url)}
                          >
                            <div className="flex items-center gap-3">
                              <Circle className="w-1.5 h-1.5 text-white/40" />
                              <span className="text-sm text-white font-['font-space-grotesk'] group-hover:text-white/80 transition-colors">{site.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-white/50 transition-colors" />
                              <span className="text-xs text-white/50 font-['font-space-grotesk'] group-hover:text-white/70 transition-colors">{site.description}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Border divider */}
                  <div className="border-t border-white/10" />

                  {/* Secondary websites */}
                  <div className="space-y-2.5">
                    {websites.filter(w => w.priority === 2).map((site, i) => (
                      <div 
                        key={i}
                        className="flex items-center justify-between gap-3 group cursor-pointer"
                        onClick={(e) => handleLinkClick(e, site.url)}
                      >
                        <div className="flex items-center gap-3">
                          <Circle className="w-1.5 h-1.5 text-white/20" />
                          <span className="text-sm text-white/70 font-['font-space-grotesk'] group-hover:text-white/90 transition-colors">{site.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-white/20 group-hover:text-white/40 transition-colors" />
                          <span className="text-xs text-white/40 font-['font-space-grotesk'] group-hover:text-white/60 transition-colors">{site.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className={`absolute bottom-0 left-0 right-0 h-8 pointer-events-none transition-opacity duration-300 ${showScrollIndicator ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                  <div className="px-1.5 py-0.5 rounded-full bg-white/5 backdrop-blur-sm flex items-center gap-0.5">
                    <span className="text-[8px] text-white/50">scroll</span>
                    <ChevronDown className="w-1.5 h-1.5 text-white/50" />
                  </div>
                </div>
              </div>

              {/* Back button */}
              <button 
                onClick={() => setShowWebsites(false)}
                className="absolute top-3 left-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Control Panel */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-full px-4 py-2 flex items-center gap-8">
        <div 
          onClick={() => setThemeIndex((prev) => (prev + 1) % themes.length)}
          className={`w-4 h-4 rounded-full transition-all duration-300 bg-gradient-to-br ${themes[themeIndex]} hover:scale-110 cursor-pointer ring-1 ring-black/10 hover:ring-black/20 shadow-sm`}
        />
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <span className="font-['font-roboto-mono'] text-sm font-medium tracking-tight text-gray-800/70">{ukTime}</span>
          </div>
          <div className="w-px h-3 bg-gray-400/20" />
          <div className="flex items-center">
            <span className="font-['font-roboto-mono'] text-sm font-medium tracking-tight text-gray-800/70">{esTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
