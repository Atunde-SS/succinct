import { useState, useEffect } from 'react';
import { Cpu, Database, Zap, Network } from 'lucide-react';
import { MathematicalEngine } from './MathematicalEngine';
import { AlgorithmicVisualizer } from './AlgorithmicVisualizer';
import { ProofRequestInterface } from './ProofRequestInterface';
import { BadgeOfForge } from './BadgeOfForge';

interface ForgeComponent {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  x: number;
  y: number;
  marketRole: string;
  analogy: string;
  tilt: number;
}

export const InteractiveForge = () => {
  const [components, setComponents] = useState<ForgeComponent[]>([
    {
      id: 'sp1',
      name: 'SP1 zkVM (Uma\'s Super-Oven)',
      description: 'Zero-Knowledge Virtual Machine',
      icon: <Cpu className="w-6 h-6 md:w-8 md:h-8" />,
      active: false,
      x: 15,
      y: 25,
      marketRole: 'Super-Oven',
      analogy: 'Uma\'s magical oven that bakes verifiable cakes (proofs) with unique signatures',
      tilt: -15
    },
    {
      id: 'blockchain',
      name: 'Market Board (Blockchain)',
      description: 'Coordination Layer',
      icon: <Database className="w-6 h-6 md:w-8 md:h-8" />,
      active: false,
      x: 75,
      y: 20,
      marketRole: 'Market Board',
      analogy: 'The central bulletin board where 0xCrashout posts orders and Avidaith places bids',
      tilt: 12
    },
    {
      id: 'contests',
      name: 'Baking Contests (Proof Contests)',
      description: 'Economic Mechanism',
      icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
      active: false,
      x: 25,
      y: 70,
      marketRole: 'Contest System',
      analogy: 'All-pay auctions where bakers compete fairly, giving everyone a chance to win',
      tilt: -8
    },
    {
      id: 'network',
      name: 'Bakers Co-op (Prover Network)',
      description: 'Global Computing Cluster',
      icon: <Network className="w-6 h-6 md:w-8 md:h-8" />,
      active: false,
      x: 85,
      y: 75,
      marketRole: 'Co-op Network',
      analogy: 'Mallesh\'s co-op where small bakers like Dan pool resources to compete',
      tilt: 18
    }
  ]);

  const [connections, setConnections] = useState<Array<{ from: string; to: string; active: boolean; dataFlow: number }>>([]);
  const [simulationStep, setSimulationStep] = useState(0);
  const [marketScenario, setMarketScenario] = useState({
    customer: '0xCrashout',
    order: 'Blockchain Rollup Proof',
    fee: 2.5,
    winner: '',
    status: 'Order Posted'
  });
  const [showBadge, setShowBadge] = useState(false);
  const [completedProofs, setCompletedProofs] = useState(0);
  const [userRequests, setUserRequests] = useState<any[]>([]);
  const [hackerTerminal, setHackerTerminal] = useState<string[]>([]);

  useEffect(() => {
    const connectionMap = [
      { from: 'sp1', to: 'blockchain', dataFlow: 0 },
      { from: 'blockchain', to: 'contests', dataFlow: 0 },
      { from: 'contests', to: 'network', dataFlow: 0 },
      { from: 'network', to: 'sp1', dataFlow: 0 }
    ];
    setConnections(connectionMap.map(conn => ({ ...conn, active: false })));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulationStep(prev => (prev + 1) % 8);
      
      const scenarios = [
        { customer: '0xCrashout', order: 'Blockchain Rollup Proof', fee: 2.5, winner: '', status: 'Order Posted' },
        { customer: '0xCrashout', order: 'Blockchain Rollup Proof', fee: 2.5, winner: '', status: 'Kshitij Validates Recipe' },
        { customer: '0xCrashout', order: 'Blockchain Rollup Proof', fee: 2.5, winner: '', status: 'Bakers Place Bids' },
        { customer: '0xCrashout', order: 'Blockchain Rollup Proof', fee: 2.5, winner: 'Avidaith', status: 'Winner Selected' },
        { customer: '0xCrashout', order: 'Blockchain Rollup Proof', fee: 2.5, winner: 'Avidaith', status: 'Proof Generation' },
        { customer: '0xCrashout', order: 'Blockchain Rollup Proof', fee: 2.5, winner: 'Avidaith', status: 'SP1 Processing' },
        { customer: '0xCrashout', order: 'Blockchain Rollup Proof', fee: 2.5, winner: 'Avidaith', status: 'Verification' },
        { customer: '0xCrashout', order: 'Blockchain Rollup Proof', fee: 2.5, winner: 'Avidaith', status: 'Payment Complete' }
      ];
      
      setMarketScenario(scenarios[simulationStep]);
    }, 4000);

    return () => clearInterval(interval);
  }, [simulationStep]);

  useEffect(() => {
    setComponents(prev => prev.map(comp => ({
      ...comp,
      active: simulationStep >= parseInt(comp.id === 'sp1' ? '0' : comp.id === 'blockchain' ? '2' : comp.id === 'contests' ? '4' : '6')
    })));

    setConnections(prev => prev.map((conn, index) => ({
      ...conn,
      active: simulationStep > index * 2 + 1,
      dataFlow: simulationStep > index * 2 + 1 ? Math.random() * 100 : 0
    })));
  }, [simulationStep]);

  const handleUserProofRequest = (request: any) => {
    setUserRequests(prev => [request, ...prev.slice(-5)]);
    
    setHackerTerminal(prev => [
      ...prev.slice(-10),
      `[${new Date().toLocaleTimeString()}] NEW_REQUEST_DETECTED`,
      `USER: ${request.user} | PROGRAM: ${request.program}`,
      `FEE: ${request.fee} $PROVE | COMPLEXITY: ${request.complexity.toLocaleString()}`
    ]);

    setTimeout(() => {
      setCompletedProofs(prev => {
        const newCount = prev + 1;
        if (newCount >= 3) {
          setTimeout(() => setShowBadge(true), 2000);
        }
        return newCount;
      });
      
      setHackerTerminal(prev => [
        ...prev.slice(-10),
        `[${new Date().toLocaleTimeString()}] PROOF_GENERATION_COMPLETE`,
        `REQUEST_ID: ${request.id} | STATUS: VERIFIED ✓`,
        `PAYMENT_PROCESSED: ${request.fee} $PROVE`
      ]);
    }, 35000);
  };

  useEffect(() => {
    const hackerInterval = setInterval(() => {
      const activities = [
        `Network heartbeat: ${Math.floor(Math.random() * 100 + 800)} nodes active`,
        `Proof throughput: ${(Math.random() * 10 + 20).toFixed(1)} proofs/min`,
        `Collateral pool: ${Math.floor(Math.random() * 500 + 1000)} $PROVE locked`,
        `Contest winner: ${['Avidaith', 'Uma', 'Kshitij', 'Mallesh'][Math.floor(Math.random() * 4)]} (ID: 0x${Math.random().toString(16).substr(2, 4)})`,
        `SP1 zkVM efficiency: ${(Math.random() * 15 + 85).toFixed(1)}%`,
        `Cross-shard verification complete`,
        `New baker joined co-op: Mallesh_Node_${Math.floor(Math.random() * 100 + 1)}`,
        `Market depth: ${Math.floor(Math.random() * 20 + 5)} active orders`,
        `Gas optimization: ${(Math.random() * 20 + 15).toFixed(1)}% reduction achieved`
      ];
      
      setHackerTerminal(prev => [
        ...prev.slice(-15),
        `[${new Date().toLocaleTimeString()}] ${activities[Math.floor(Math.random() * activities.length)]}`
      ]);
    }, 3500);

    return () => clearInterval(hackerInterval);
  }, []);

  const getStepDescription = () => {
    const steps = [
      "🍰 0xCrashout posts cake order (proof request) on market board",
      "🔍 Kshitij (relayer) validates recipe and calculates oven time",
      "📊 Market board coordinates and displays order details",
      "💰 Avidaith, Uma, and other bakers place their bids (collateral)",
      "🎯 All-pay auction: P(win) = bid^α / Σ(bids^α) selects Avidaith",
      "⚡ Avidaith wins and starts baking with Uma's SP1 super-oven",
      "🔐 SP1 zkVM generates unique proof with Avidaith's signature",
      "✅ Market board verifies cake and pays Avidaith 2.5 $PROVE"
    ];
    return steps[simulationStep] || "Market simulation running...";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-mono font-bold text-purple-400 mb-4">
          SUCCINCT FORGE CORE
        </h2>
        <p className="text-lg font-mono text-purple-300 mb-2">
          Interactive Zero-Knowledge Proof Technology Core
        </p>
        <p className="text-sm font-mono text-purple-500">
          Experience the Succinct Network where bakers create verifiable cakes using advanced cryptography
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-8 mb-8">
        <div className="text-center">
          <img 
            src="/lovable-uploads/05647ff6-6261-4a92-9dce-8b8d5f11d533.png" 
            alt="Succinct Network Hero" 
            className="w-full max-w-4xl mx-auto rounded-xl shadow-2xl"
          />
          <div className="mt-4">
            <h3 className="font-mono text-2xl text-cyan-400 mb-2">Welcome to the Succinct Network</h3>
            <p className="font-mono text-purple-300">
              Where cryptographic proofs meet decentralized computing power
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black/90 backdrop-blur-sm rounded-2xl border border-green-500/30 p-6 mb-8">
        <h3 className="font-mono text-lg text-green-400 mb-4 flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3" />
          NETWORK_ACTIVITY_MONITOR
        </h3>
        <div className="bg-black/80 rounded-lg p-4 h-32 overflow-y-auto">
          {hackerTerminal.map((line, index) => (
            <div key={index} className="font-mono text-xs text-green-300 mb-1">
              {line}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6 mb-8">
        <h3 className="font-mono text-lg text-purple-300 mb-4">CURRENT NETWORK STATUS</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="font-mono text-sm text-purple-400">Active Customer</div>
            <div className="font-mono text-lg text-green-400">{marketScenario.customer}</div>
          </div>
          <div>
            <div className="font-mono text-sm text-purple-400">Order Type</div>
            <div className="font-mono text-lg text-cyan-400">{marketScenario.order}</div>
          </div>
          <div>
            <div className="font-mono text-sm text-purple-400">Fee Offered</div>
            <div className="font-mono text-lg text-yellow-400">{marketScenario.fee} $PROVE</div>
          </div>
          <div>
            <div className="font-mono text-sm text-purple-400">Status</div>
            <div className="font-mono text-lg text-pink-400">{marketScenario.status}</div>
          </div>
        </div>
      </div>

      <ProofRequestInterface 
        onSubmitRequest={handleUserProofRequest}
        completedProofs={completedProofs}
      />

      <div className="relative bg-black/40 backdrop-blur-sm rounded-3xl border border-purple-500/30 p-4 md:p-8 mb-8">
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <div className="absolute top-4 left-4 w-20 h-20 md:w-24 md:h-24 opacity-80 z-10">
            <img 
              src="/lovable-uploads/8e9fb749-42ba-46bd-8ab4-c98f7a897927.png" 
              alt="Uma's SP1 Super-Oven" 
              className="w-full h-full object-contain filter brightness-110 contrast-110"
            />
            <div className="font-mono text-xs text-purple-300 mt-1 text-center">Uma's Oven</div>
          </div>
          
          <div className="absolute top-4 right-4 w-12 h-12 md:w-16 md:h-16 opacity-80 z-10">
            <img 
              src="/lovable-uploads/e6229e3c-71e1-4b70-893b-595ae6ed3eeb.png" 
              alt="Succinct Market Logo" 
              className="w-full h-full object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-16 w-10 h-10 md:w-12 md:h-12 opacity-80 z-10">
            <img 
              src="/lovable-uploads/78ebb717-8a64-46f5-89ed-74607de6a8cd.png" 
              alt="0xCrashout" 
              className="w-full h-full object-contain rounded-full"
            />
            <div className="font-mono text-xs text-green-300 mt-1 text-center">0xCrashout</div>
          </div>

          {components.map((component) => (
            <div
              key={component.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
                component.active ? 'scale-110' : 'scale-100'
              }`}
              style={{ 
                left: `${component.x}%`, 
                top: `${component.y}%`,
                transform: `translate(-50%, -50%) rotate(${component.active ? component.tilt * 1.5 : component.tilt}deg) ${component.active ? 'scale(1.1)' : 'scale(1)'}`
              }}
            >
              <div className={`relative p-3 md:p-6 rounded-2xl border-2 transition-all duration-500 max-w-48 md:max-w-64 ${
                component.active 
                  ? 'border-purple-400 bg-purple-900/50 shadow-lg shadow-purple-500/50' 
                  : 'border-purple-700/50 bg-purple-900/20'
              }`}>
                <div className={`text-center transition-colors duration-500 ${
                  component.active ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  <div className="flex justify-center mb-2">
                    {component.icon}
                  </div>
                  <h3 className="font-mono text-xs md:text-sm font-bold mb-2">{component.name}</h3>
                  <p className="font-mono text-xs opacity-80 mb-2">{component.description}</p>
                  <div className="font-mono text-xs text-green-400 bg-black/30 rounded px-2 py-1 mb-2">
                    {component.marketRole}
                  </div>
                  <p className="font-mono text-xs text-cyan-400 leading-tight">
                    {component.analogy}
                  </p>
                </div>
                
                {component.active && (
                  <div className="absolute -inset-2 bg-purple-600/20 rounded-2xl blur animate-pulse" />
                )}
              </div>
            </div>
          ))}

          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map((conn, index) => {
              const fromComp = components.find(c => c.id === conn.from);
              const toComp = components.find(c => c.id === conn.to);
              if (!fromComp || !toComp) return null;

              const x1 = (fromComp.x / 100) * 100;
              const y1 = (fromComp.y / 100) * 100;
              const x2 = (toComp.x / 100) * 100;
              const y2 = (toComp.y / 100) * 100;

              return (
                <g key={`${conn.from}-${conn.to}`}>
                  <line
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={conn.active ? '#a855f7' : '#4c1d95'}
                    strokeWidth="2"
                    strokeDasharray={conn.active ? "0" : "5,5"}
                    className="transition-all duration-500"
                    style={{
                      filter: conn.active ? 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.6))' : 'none'
                    }}
                  />
                  {conn.active && conn.dataFlow > 0 && (
                    <circle
                      r="2"
                      fill="#00ff88"
                      className="animate-pulse"
                    >
                      <animateMotion dur="2s" repeatCount="indefinite">
                        <path d={`M ${x1} ${y1} L ${x2} ${y2}`} />
                      </animateMotion>
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          <div className="absolute top-4 right-4 md:right-24 bg-black/80 rounded-lg p-3 w-48 md:w-64 z-10 hidden md:block">
            <div className="font-mono text-xs text-green-400 mb-2">CORE_PROCESS_ACTIVE</div>
            <div className="space-y-1">
              <div className="text-green-300 text-xs">{'>'} zkVM.execute(proof_req)</div>
              <div className="text-cyan-300 text-xs">{'>'} Constraint_gen: ACTIVE</div>
              <div className="text-yellow-300 text-xs">{'>'} Witness_calc: 87%</div>
              <div className="text-purple-300 text-xs">{'>'} Proof_build: PENDING</div>
            </div>
          </div>

          {connections.filter(c => c.active).map((conn, index) => (
            <div
              key={`math-particle-${index}`}
              className="absolute w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse font-mono text-xs text-green-400 flex items-center justify-center"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                animationDelay: `${index * 0.5}s`
              }}
            >
              <span className="text-xs">{Math.floor(conn.dataFlow)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black/60 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-mono text-xl text-purple-400 mb-2">Current Network Process</h3>
            <p className="font-mono text-purple-300 text-sm md:text-base">{getStepDescription()}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="font-mono text-sm text-purple-400">
              Step {simulationStep + 1}/8
            </div>
            <div className="w-32 h-2 bg-purple-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-500"
                style={{ width: `${((simulationStep + 1) / 8) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <MathematicalEngine />
      <AlgorithmicVisualizer />

      <BadgeOfForge 
        isVisible={showBadge} 
        onClose={() => setShowBadge(false)} 
      />
    </div>
  );
};
