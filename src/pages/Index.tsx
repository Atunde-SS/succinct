
import { useState, useEffect } from 'react';
import { TechGrid } from '@/components/TechGrid';
import { InteractiveForge } from '@/components/InteractiveForge';
import { SoundController } from '@/components/SoundController';
import { CharacterGuides } from '@/components/CharacterGuides';
import { HolographicInterface } from '@/components/HolographicInterface';
import { ProofSimulation } from '@/components/ProofSimulation';

const Index = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeSection, setActiveSection] = useState('forge');

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Sound Controller */}
      <SoundController />

      {/* Main Content */}
      <div className={`relative z-10 transition-all duration-1000 ${isInitialized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <header className="text-center py-8 px-4">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl font-mono font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              SUCCINCT FORGE
            </h1>
            <div className="absolute -inset-4 bg-purple-600/20 blur-xl rounded-lg animate-pulse" />
          </div>
          <p className="text-xl md:text-2xl font-mono text-purple-300 mt-4 max-w-4xl mx-auto">
            Interactive Zero-Knowledge Proof Technology Simulator
          </p>
          
          {/* Glitch effect overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-cyan-400 opacity-20 animate-pulse" />
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex justify-center mb-8 px-4">
          <div className="flex space-x-4 bg-black/50 backdrop-blur-sm rounded-full p-2 border border-purple-500/30">
            {['forge', 'simulation', 'guides', 'interface'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeSection === section
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/50'
                    : 'text-purple-300 hover:text-white hover:bg-purple-600/20'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </nav>

        {/* Dynamic Content Sections */}
        <div className="px-4 pb-8">
          {activeSection === 'forge' && <InteractiveForge />}
          {activeSection === 'simulation' && <ProofSimulation />}
          {activeSection === 'guides' && <CharacterGuides />}
          {activeSection === 'interface' && <HolographicInterface />}
        </div>

        {/* Tech Grid Background */}
        <TechGrid />
      </div>

      {/* Scanlines effect */}
      <div className="fixed inset-0 pointer-events-none z-20 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent bg-[length:100%_4px] animate-pulse" />
      </div>
    </div>
  );
};

export default Index;
