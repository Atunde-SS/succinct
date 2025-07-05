
import { useState, useEffect } from 'react';
import { Terminal, Database, Cpu, Network } from 'lucide-react';

export const HolographicInterface = () => {
  const [activeTerminal, setActiveTerminal] = useState(0);
  const [terminalText, setTerminalText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const terminals = [
    {
      id: 'sp1',
      title: 'SP1 zkVM Console',
      icon: <Cpu className="w-5 h-5" />,
      commands: [
        '> Initializing SP1 zkVM...',
        '> Loading RISC-V program...',
        '> Generating CORE proof...',
        '> Proof generation complete!',
        '> Verification: PASSED ✓'
      ]
    },
    {
      id: 'blockchain',
      title: 'Blockchain Monitor',
      icon: <Database className="w-5 h-5" />,
      commands: [
        '> Listening for proof requests...',
        '> New request received: 0x1a2b3c4d',
        '> Proof contest initiated',
        '> Winner selected: Avidaith',
        '> Payment processed: 0.5 ETH'
      ]
    },
    {
      id: 'network',
      title: 'Network Statistics',
      icon: <Network className="w-5 h-5" />,
      commands: [
        '> Active provers: 47',
        '> Pending requests: 12',
        '> Average proof time: 2.3s',
        '> Network utilization: 78%',
        '> Total proofs today: 1,247'
      ]
    },
    {
      id: 'terminal',
      title: 'System Terminal',
      icon: <Terminal className="w-5 h-5" />,
      commands: [
        '> succinct-forge --status',
        '> All systems operational',
        '> GPU utilization: 85%',
        '> Memory usage: 4.2GB/8GB',
        '> Ready for proof generation'
      ]
    }
  ];

  useEffect(() => {
    const typeText = async (text: string) => {
      setIsTyping(true);
      setTerminalText('');
      
      for (let i = 0; i <= text.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setTerminalText(text.slice(0, i));
      }
      
      setIsTyping(false);
    };

    const currentTerminal = terminals[activeTerminal];
    const fullText = currentTerminal.commands.join('\n');
    typeText(fullText);
  }, [activeTerminal]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTerminal(prev => (prev + 1) % terminals.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-mono font-bold text-purple-400 mb-4">
          HOLOGRAPHIC INTERFACE
        </h2>
        <p className="text-lg font-mono text-purple-300">
          Real-time system monitoring and control panels
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Terminal Selection */}
        <div className="space-y-4">
          <h3 className="font-mono text-xl text-purple-400 mb-4">System Monitors</h3>
          
          {terminals.map((terminal, index) => (
            <button
              key={terminal.id}
              onClick={() => setActiveTerminal(index)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                activeTerminal === index
                  ? 'border-purple-400 bg-purple-900/50 shadow-lg shadow-purple-500/50'
                  : 'border-purple-700/50 bg-purple-900/20 hover:border-purple-500'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`${activeTerminal === index ? 'text-purple-300' : 'text-purple-600'}`}>
                  {terminal.icon}
                </div>
                <span className={`font-mono text-sm font-bold ${
                  activeTerminal === index ? 'text-purple-300' : 'text-purple-500'
                }`}>
                  {terminal.title}
                </span>
                {activeTerminal === index && (
                  <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Active Terminal */}
        <div className="bg-black/80 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-purple-400">
                {terminals[activeTerminal].icon}
              </div>
              <h4 className="font-mono text-lg font-bold text-purple-300">
                {terminals[activeTerminal].title}
              </h4>
            </div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
          </div>
          
          <div className="bg-black/60 rounded-lg p-4 min-h-[200px] font-mono text-sm">
            <pre className="text-green-400 whitespace-pre-wrap">
              {terminalText}
              {isTyping && <span className="animate-pulse">█</span>}
            </pre>
          </div>
        </div>
      </div>

      {/* Holographic Display */}
      <div className="bg-black/40 backdrop-blur-sm rounded-3xl border border-purple-500/30 p-8">
        <div className="relative h-64 overflow-hidden">
          {/* GPU Asset */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-48 h-32 opacity-80">
            <img 
              src="/lovable-uploads/8e9fb749-42ba-46bd-8ab4-c98f7a897927.png" 
              alt="Succinct GPU" 
              className="w-full h-full object-contain filter brightness-110 contrast-110"
            />
            <div className="absolute inset-0 bg-purple-600/20 rounded-lg blur animate-pulse" />
          </div>

          {/* Floating Data Points */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-bounce"
              style={{
                left: `${20 + (i * 5)}%`,
                top: `${30 + Math.sin(i) * 20}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            />
          ))}

          {/* Holographic Grid */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent bg-[length:50px_50px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent bg-[length:50px_50px]" />
          </div>

          {/* Character Assets Floating */}
          <div className="absolute bottom-4 left-4 w-16 h-16 opacity-70 animate-bounce">
            <img 
              src="/lovable-uploads/29015540-b096-457f-b15a-a2487cff435b.png" 
              alt="Uma" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          
          <div className="absolute bottom-4 right-4 w-16 h-16 opacity-70 animate-bounce" style={{ animationDelay: '1s' }}>
            <img 
              src="/lovable-uploads/9208e9c1-1892-41a8-9e30-c586e78ef9ed.png" 
              alt="Avidaith" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
