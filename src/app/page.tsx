"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Header from '../components/Header';

// Dynamically import the 3D scene component with SSR disabled
const Scene3D = dynamic(() => import('../components/Scene3D'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-blue-100 flex items-center justify-center">Loading 3D Scene...</div>
});

// Services section component
const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-700">Our SEO Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Technical SEO',
              description: 'We optimize your website structure, speed, and technical elements to improve search engine crawling and indexing.'
            },
            {
              title: 'Content Strategy',
              description: 'Our data-driven content strategies help you create valuable content that ranks well and engages your audience.'
            },
            {
              title: 'Local SEO',
              description: 'Boost your visibility in local search results to attract more customers from your area.'
            }
          ].map((service, index) => (
            <div key={index} className="bg-blue-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-green-700">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About section component
const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl font-bold mb-6 text-green-700">About SearchRankExperts</h2>
            <p className="text-lg mb-6">
              Based in Boston, SearchRankExperts.com is a leading SEO agency dedicated to helping businesses 
              improve their online visibility and drive organic traffic through data-driven strategies.
            </p>
            <p className="text-lg">
              Our team of experienced SEO professionals combines technical expertise with creative thinking 
              to deliver customized solutions that generate real results for our clients.
            </p>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <Suspense fallback={<div>Loading 3D visualization...</div>}>
              <Scene3D />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact section component
const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-green-700 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea 
                id="message" 
                rows={5} 
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <div className="text-center">
              <button 
                type="submit" 
                className="bg-white text-green-700 font-medium px-8 py-3 rounded-md hover:opacity-90 transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main className="font-barlow">
      <Header />
      <Services />
      <About />
      <Contact />
    </main>
  );
}
