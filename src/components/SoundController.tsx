
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const SoundController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = volume;
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  const createAmbientSound = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    // Create multiple oscillators for ambient sound
    const frequencies = [60, 80, 120, 180, 240];
    
    oscillatorsRef.current = frequencies.map((freq, index) => {
      const oscillator = audioContextRef.current!.createOscillator();
      const filterGain = audioContextRef.current!.createGain();
      
      oscillator.type = index % 2 === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = freq;
      
      // Create subtle modulation
      const lfo = audioContextRef.current!.createOscillator();
      const lfoGain = audioContextRef.current!.createGain();
      
      lfo.frequency.value = 0.1 + Math.random() * 0.3;
      lfo.type = 'sine';
      lfoGain.gain.value = 5;
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      
      filterGain.gain.value = 0.1 / frequencies.length;
      
      oscillator.connect(filterGain);
      filterGain.connect(gainNodeRef.current!);
      
      oscillator.start();
      lfo.start();
      
      return oscillator;
    });
  };

  const stopAmbientSound = () => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator might already be stopped
      }
    });
    oscillatorsRef.current = [];
  };

  const toggleSound = async () => {
    if (!audioContextRef.current) return;

    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    if (isPlaying) {
      stopAmbientSound();
      setIsPlaying(false);
    } else {
      createAmbientSound();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full p-3 border border-purple-500/30">
      <button
        onClick={toggleSound}
        className="text-purple-400 hover:text-purple-300 transition-colors p-2"
        title={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
      
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-20 h-2 bg-purple-800/50 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #9333ea 0%, #9333ea ${volume * 100}%, #4c1d95 ${volume * 100}%, #4c1d95 100%)`
        }}
      />
    </div>
  );
};
