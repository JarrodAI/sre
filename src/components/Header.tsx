import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import VideoFallback from './VideoFallback';

const Header = () => {
  const { scrollY } = useScroll();
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Transform values based on scroll
  const headerBgOpacity = useTransform(scrollY, [0, 200], [0.1, 1]);
  const videoScale = useTransform(scrollY, [0, 200], [1, 1.1]);
  
  // Update scroll position state
  useEffect(() => {
    const updateScrollPosition = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', updateScrollPosition);
    updateScrollPosition(); // Initialize on mount
    
    return () => window.removeEventListener('scroll', updateScrollPosition);
  }, []);
  
  // Determine colors based on scroll position
  const isScrolled = scrollPosition > 100;
  const textColor = 'white';
  const buttonBgColor = 'var(--header-bg)';
  const buttonTextColor = 'white';
  
  // Text shadow for better visibility when not scrolled
  const textShadow = isScrolled ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.5)';
  
  // Make header completely transparent when not scrolled
  const headerInitialBg = isScrolled ? 'transparent' : 'transparent';

  return (
    <div className="relative w-full h-screen overflow-hidden" ref={headerRef}>
      {/* Video Background */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ scale: videoScale }}
      >
        <video 
          id="desktopOnly"
          className="desktopOnly object-cover w-full h-full"
          {...{
            playsinline: "playsinline",
            autoplay: "autoplay",
            muted: "muted",
            loop: "loop"
          } as any}
          width="1920"
          height="1080"
          poster="/test.jpg"
          onError={(e) => {
            // Hide the video element if there's an error loading the video
            const target = e.target as HTMLVideoElement;
            target.style.display = 'none';
            // Show the fallback
            const fallback = document.getElementById('video-fallback');
            if (fallback) fallback.style.display = 'flex';
          }}
        >
          <source src="/videos/header-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Fallback for when video is not available */}
        <div id="video-fallback" style={{ display: 'none' }}>
          <VideoFallback />
        </div>
      </motion.div>
      
      {/* Header Content */}
      <motion.div 
        className="fixed top-0 left-0 w-full z-20"
        style={{ 
          backgroundColor: isScrolled ? 'var(--header-bg)' : headerInitialBg,
          opacity: isScrolled ? headerBgOpacity : 1
        }}
      >
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <motion.img 
              src="https://www.searchrankexperts.com/logo.svg" 
              alt="SearchRankExperts.com Logo"
              width="386"
              height="124"
              style={{
                filter: isScrolled ? 'brightness(1)' : 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5))'
              }}
            />
          </div>
          
          {/* Navigation and Contact Button Container */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <motion.nav 
              className="flex items-center space-x-1 opacity-100 justify-center"
              style={{
                color: textColor,
                textShadow: textShadow
              }}
            >
              <Link href="#services" className="nav-link" style={{color: 'inherit'}}>Services</Link>
              <Link href="#work" className="nav-link" style={{color: 'inherit'}}>Work</Link>
              <Link href="#clients" className="nav-link" style={{color: 'inherit'}}>Clients</Link>
              <Link href="#knowledge" className="nav-link" style={{color: 'inherit'}}>Knowledge</Link>
              <Link href="#about" className="nav-link" style={{color: 'inherit'}}>About</Link>
              <Link href="#blog" className="nav-link" style={{color: 'inherit'}}>Blog</Link>
            </motion.nav>
            
            {/* Contact Button */}
            <motion.div
              className="ml-24" /* 96px (1 inch) = 24 in Tailwind (24 * 4 = 96) */
              style={{
                backgroundColor: buttonBgColor,
                color: buttonTextColor
              }}
            >
              <Link href="#contact" className="contact-btn" style={{
                backgroundColor: 'inherit',
                color: 'inherit',
                display: 'inline-block'
              }}>
                Contact
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-5 text-white">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Boston&apos;s Premier SEO Experts
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Elevate your online presence with data-driven search engine optimization strategies
          </p>
          <button className="bg-green-700 text-white font-medium px-8 py-3 rounded-md hover:opacity-90 transition-all duration-300 shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
