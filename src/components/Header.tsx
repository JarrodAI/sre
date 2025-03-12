import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import VideoFallback from './VideoFallback';

const Header = () => {
  const { scrollY } = useScroll();
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Transform values based on scroll
  const headerBgOpacity = useTransform(scrollY, [0, 200], [0.1, 1]);
  const videoScale = useTransform(scrollY, [0, 200], [1, 1.1]);

  return (
    <div className="relative w-full h-screen overflow-hidden" ref={headerRef}>
      {/* Video Background */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ scale: videoScale }}
      >
        <video 
          autoPlay 
          muted 
          loop 
          className="object-cover w-full h-full"
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
          backgroundColor: '#2c8769',
          opacity: headerBgOpacity 
        }}
      >
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <svg width="200" height="40" viewBox="0 0 200 40" className="text-white">
              <text x="0" y="25" fontFamily="Barlow" fontSize="20" fontWeight="600" fill="currentColor">
                SearchRankExperts.com
              </text>
              <g transform="translate(170, 10)">
                <rect x="0" y="0" width="4" height="20" fill="currentColor" />
                <rect x="8" y="5" width="4" height="15" fill="currentColor" />
                <rect x="16" y="10" width="4" height="10" fill="currentColor" />
              </g>
            </svg>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="#services" className="nav-link">Services</Link>
            <Link href="#work" className="nav-link">Work</Link>
            <Link href="#clients" className="nav-link">Clients</Link>
            <Link href="#knowledge" className="nav-link">Knowledge</Link>
            <Link href="#about" className="nav-link">About</Link>
            <Link href="#blog" className="nav-link">Blog</Link>
            <Link href="#careers" className="nav-link">Careers</Link>
          </nav>
          
          {/* Contact Button */}
          <Link href="#contact" className="contact-btn">
            Contact
          </Link>
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
