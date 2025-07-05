import { useState, useEffect } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ProofRequestInterface } from './ProofRequestInterface';
import { BadgeOfForge } from './BadgeOfForge';

interface ProofRequest {
  id: string;
  user: string;
  program: string;
  fee: number;
  status: 'pending' | 'bidding' | 'proving' | 'complete';
  progress: number;
  complexity: number;
  cycleCount: number;
  marketAnalogy: string;
}

interface NetworkMetrics {
  timestamp: number;
  throughput: number;
  efficiency: number;
  costPerProof: number;
  activeBakers: number;
  contestCount: number;
}

export const ProofSimulation = () => {
  const [requests, setRequests] = useState<ProofRequest[]>([]);
  const [totalProofs, setTotalProofs] = useState(0);
  const [activeProvers, setActiveProvers] = useState(0);
  const [networkMetrics, setNetworkMetrics] = useState<NetworkMetrics[]>([]);
  const [marketStats, setMarketStats] = useState({
    totalRevenue: 0,
    avgBidSize: 0,
    winRate: 0,
    collateralPool: 0
  });
  const [showBadge, setShowBadge] = useState(false);
  const [completedProofs, setCompletedProofs] = useState(0);
  const [hackerFeed, setHackerFeed] = useState<string[]>([]);

  useEffect(() => {
    // Initialize with sophisticated demo requests
    const initialRequests: ProofRequest[] = [
      {
        id: '0x1a2b',
        user: '0xCrashout',
        program: 'Rollup State Transition',
        fee: 2.5,
        status: 'proving',
        progress: 65,
        complexity: 245000,
        cycleCount: 1500000,
        marketAnalogy: '🍰 Complex wedding cake with multiple layers - requires Uma\'s premium oven time'
      },
      {
        id: '0x3c4d',
        user: 'Avidaith', 
        program: 'Private Identity Proof',
        fee: 1.8,
        status: 'bidding',
        progress: 25,
        complexity: 180000,
        cycleCount: 900000,
        marketAnalogy: '🎂 Birthday cake - medium complexity, Kshitij validated recipe looks good'
      },
      {
        id: '0x5e6f',
        user: 'Uma',
        program: 'AI Inference Verification',
        fee: 4.2,
        status: 'pending',
        progress: 0,
        complexity: 580000,
        cycleCount: 3200000,
        marketAnalogy: '🏰 Grand castle cake - massive order, will need Mallesh\'s entire co-op'
      }
    ];
    
    setRequests(initialRequests);
    setActiveProvers(Math.floor(Math.random() * 20) + 15);
    setTotalProofs(147); // Starting count
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      
      // Update requests with sophisticated progress simulation
      setRequests(prev => prev.map(req => {
        let newStatus = req.status;
        let newProgress = req.progress;

        switch (req.status) {
          case 'pending':
            if (Math.random() > 0.7) {
              newStatus = 'bidding';
              newProgress = 10;
            }
            break;
          case 'bidding':
            // Simulate bidding process with market dynamics
            const biddingIncrement = (Math.random() * 20) * (req.fee / 2.5); // Fee influences bidding speed
            newProgress = Math.min(req.progress + biddingIncrement, 35);
            if (newProgress >= 35) {
              newStatus = 'proving';
            }
            break;
          case 'proving':
            // Progress based on complexity (O(n²) for ZK proofs)
            const complexityFactor = Math.sqrt(req.complexity / 100000);
            const increment = (Math.random() * 15) / complexityFactor;
            newProgress = Math.min(req.progress + increment, 100);
            if (newProgress >= 100) {
              newStatus = 'complete';
              setTotalProofs(prev => prev + 1);
              setMarketStats(prev => ({
                ...prev,
                totalRevenue: prev.totalRevenue + req.fee,
                avgBidSize: (prev.avgBidSize + req.fee * 0.4) / 2 // Bids are ~40% of fee
              }));
            }
            break;
        }

        return { ...req, status: newStatus, progress: newProgress };
      }));

      // Add sophisticated network metrics
      setNetworkMetrics(prev => {
        const newMetric: NetworkMetrics = {
          timestamp: currentTime,
          throughput: 25 + Math.sin(currentTime / 10000) * 15 + Math.random() * 10,
          efficiency: 88 + Math.cos(currentTime / 8000) * 8,
          costPerProof: 1.8 + Math.sin(currentTime / 12000) * 0.5,
          activeBakers: activeProvers,
          contestCount: Math.floor(Math.random() * 8) + 3
        };
        return [...prev.slice(-30), newMetric];
      });

      // Occasionally add new sophisticated requests
      if (Math.random() > 0.92) {
        const users = ['0xCrashout', 'Avidaith', 'Uma', 'Kshitij', 'Mallesh'];
        const programs = [
          { name: 'ZK Rollup Batch', complexity: 320000, cycles: 2100000, analogy: '🎯 Precision archery cake - requires exact measurements' },
          { name: 'Private Voting Proof', complexity: 180000, cycles: 950000, analogy: '🗳️ Secret ballot cake - privacy is key ingredient' },
          { name: 'Cross-chain Bridge', complexity: 420000, cycles: 2800000, analogy: '🌉 Bridge cake connecting two worlds' },
          { name: 'AI Model Verification', complexity: 680000, cycles: 4200000, analogy: '🧠 Brain cake - most complex recipe in the market' },
          { name: 'Identity Credential', complexity: 150000, cycles: 800000, analogy: '🆔 ID card cake - simple but essential' }
        ];
        
        const selectedProgram = programs[Math.floor(Math.random() * programs.length)];
        const newRequest: ProofRequest = {
          id: `0x${Math.random().toString(16).substr(2, 4)}`,
          user: users[Math.floor(Math.random() * users.length)],
          program: selectedProgram.name,
          fee: Math.random() * 3 + 1.2, // 1.2-4.2 $PROVE
          status: 'pending',
          progress: 0,
          complexity: selectedProgram.complexity,
          cycleCount: selectedProgram.cycles,
          marketAnalogy: selectedProgram.analogy
        };
        
        setRequests(prev => [...prev.slice(-5), newRequest]); // Keep last 6 requests
      }

      // Update active provers (market participants)
      setActiveProvers(prev => Math.max(12, Math.min(35, prev + (Math.random() > 0.5 ? 1 : -1))));
      
      // Update market statistics
      setMarketStats(prev => ({
        ...prev,
        winRate: 15 + Math.sin(currentTime / 15000) * 10,
        collateralPool: 250 + Math.cos(currentTime / 20000) * 50
      }));
    }, 2500);

    // Enhanced hacker feed with more dynamic content
    const hackerInterval = setInterval(() => {
      const dynamicFeed = [
        `NETWORK_SCAN: ${activeProvers} active bakers detected`,
        `PROOF_CONTEST: Winner selection algorithm running`,
        `COLLATERAL_LOCK: ${(Math.random() * 200 + 50).toFixed(1)} $PROVE secured`,
        `SP1_CORE: Constraint generation at ${(Math.random() * 20 + 80).toFixed(0)}% efficiency`,
        `VERIFICATION_KEY: Cryptographic seal validated`,
        `PAYMENT_CHANNEL: Fee distribution executed`,
        `ANTI_SPAM: Sybil resistance protocols active`,
        `THROUGHPUT: ${(Math.random() * 20 + 20).toFixed(1)} proofs/min`,
        `MARKET_DEPTH: ${Math.floor(Math.random() * 15 + 5)} pending orders`,
        `CONTEST_POOL: ${Math.floor(Math.random() * 8 + 3)} active competitions`,
        `NODE_SYNC: Block height ${Math.floor(Math.random() * 1000000 + 5000000)}`,
        `BAKER_REWARD: ${(Math.random() * 5 + 1).toFixed(2)} $PROVE distributed`
      ];
      
      setHackerFeed(prev => [
        ...prev.slice(-5),
        `[${new Date().toLocaleTimeString()}] ${dynamicFeed[Math.floor(Math.random() * dynamicFeed.length)]}`
      ]);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(hackerInterval);
    };
  }, [activeProvers]);

  const handleUserRequest = (request: any) => {
    const newRequest = {
      ...request,
      marketAnalogy: '🔧 Custom user order - direct from hacker terminal'
    };
    
    setRequests(prev => [newRequest, ...prev.slice(-5)]);
    
    // Simulate proof completion and increment counter
    setTimeout(() => {
      setCompletedProofs(prev => {
        const newCount = prev + 1;
        // Only show badge after 3 completed proofs
        if (newCount >= 3) {
          setTimeout(() => setShowBadge(true), 2000);
        }
        return newCount;
      });
      
      setTotalProofs(prev => prev + 1);
      setMarketStats(prev => ({
        ...prev,
        totalRevenue: prev.totalRevenue + request.fee,
        avgBidSize: (prev.avgBidSize + request.fee * 0.4) / 2
      }));
    }, 8000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 border-yellow-400';
      case 'bidding': return 'text-blue-400 border-blue-400';
      case 'proving': return 'text-purple-400 border-purple-400';
      case 'complete': return 'text-green-400 border-green-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const chartConfig = {
    throughput: { label: "Proofs/min", color: "#8b5cf6" },
    efficiency: { label: "Network Efficiency %", color: "#06b6d4" },
    costPerProof: { label: "Avg Cost ($PROVE)", color: "#f59e0b" }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-mono font-bold text-purple-400 mb-4">
          LIVE SUCCINCT NETWORK CORE
        </h2>
        <p className="text-lg font-mono text-purple-300 mb-2">
          Live zero-knowledge proof generation with cryptographic modeling
        </p>
        <p className="text-sm font-mono text-purple-500">
          Watch the Succinct Network's baking contests and proof generation cores
        </p>
      </div>

      {/* Interactive Proof Request Terminal */}
      <ProofRequestInterface 
        onSubmitRequest={handleUserRequest} 
        completedProofs={completedProofs}
      />

      {/* Enhanced Hacker Feed */}
      <div className="bg-black/90 backdrop-blur-sm rounded-2xl border border-green-500/30 p-6">
        <h3 className="font-mono text-lg text-green-400 mb-4 flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3" />
          NETWORK_SECURITY_FEED
        </h3>
        <div className="bg-black/80 rounded-lg p-4 h-24 overflow-y-auto">
          {hackerFeed.map((line, index) => (
            <div key={index} className="font-mono text-xs text-green-300 mb-1">
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Network Statistics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-black/60 backdrop-blur-sm rounded-2xl border border-green-500/30 p-6 text-center">
          <div className="font-mono text-3xl font-bold text-green-400 mb-2">
            {totalProofs}
          </div>
          <div className="font-mono text-purple-300 mb-1">Cakes Baked</div>
          <div className="font-mono text-xs text-green-600">
            Revenue: {marketStats.totalRevenue.toFixed(1)} $PROVE
          </div>
        </div>
        
        <div className="bg-black/60 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6 text-center">
          <div className="font-mono text-3xl font-bold text-blue-400 mb-2">
            {activeProvers}
          </div>
          <div className="font-mono text-purple-300 mb-1">Active Bakers</div>
          <div className="font-mono text-xs text-blue-600">
            Win Rate: {marketStats.winRate.toFixed(1)}%
          </div>
        </div>
        
        <div className="bg-black/60 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6 text-center">
          <div className="font-mono text-3xl font-bold text-purple-400 mb-2">
            {requests.filter(r => r.status !== 'complete').length}
          </div>
          <div className="font-mono text-purple-300 mb-1">Active Orders</div>
          <div className="font-mono text-xs text-purple-600">
            Avg Bid: {marketStats.avgBidSize.toFixed(2)} $PROVE
          </div>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-2xl border border-orange-500/30 p-6 text-center">
          <div className="font-mono text-3xl font-bold text-orange-400 mb-2">
            {marketStats.collateralPool.toFixed(0)}
          </div>
          <div className="font-mono text-purple-300 mb-1">Collateral Pool</div>
          <div className="font-mono text-xs text-orange-600">
            Security: $PROVE
          </div>
        </div>
      </div>

      {/* Real-time Performance Chart */}
      <div className="bg-black/60 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6 mb-8">
        <h3 className="font-mono text-xl text-purple-400 mb-4">REAL-TIME MARKET PERFORMANCE</h3>
        
        <ChartContainer config={chartConfig} className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={networkMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
              <XAxis dataKey="timestamp" stroke="#8b5cf6" />
              <YAxis stroke="#8b5cf6" />
              <ChartTooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-black/90 border border-purple-500/50 rounded-lg p-3">
                        <p className="font-mono text-purple-300 text-sm">Market Metrics</p>
                        {payload.map((entry, index) => (
                          <p key={index} className="font-mono text-sm" style={{ color: entry.color }}>
                            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="throughput"
                stackId="1"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="efficiency"
                stackId="2"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Enhanced Proof Requests */}
      <div className="space-y-4">
        <h3 className="font-mono text-xl text-purple-400 mb-4">CURRENT NETWORK ORDERS (Proof Requests)</h3>
        
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-mono text-lg font-bold text-purple-300 mb-1">
                  {request.program}
                </h4>
                <p className="font-mono text-sm text-purple-500 mb-2">
                  Ordered by {request.user} • Fee: {request.fee.toFixed(2)} $PROVE
                </p>
                <div className="font-mono text-xs text-cyan-400 bg-black/30 rounded px-2 py-1 inline-block mb-2">
                  {request.marketAnalogy}
                </div>
                <div className="flex space-x-4 text-xs font-mono">
                  <span className="text-yellow-400">Complexity: {request.complexity.toLocaleString()}</span>
                  <span className="text-green-400">Cycles: {request.cycleCount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className={`px-4 py-2 rounded-full border-2 font-mono text-sm uppercase ${getStatusColor(request.status)}`}>
                {request.status}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="w-full h-3 bg-purple-900/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-1000"
                    style={{ width: `${request.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="font-mono text-sm text-purple-400 min-w-[3rem]">
                {Math.round(request.progress)}%
              </div>
              
              <div className="font-mono text-xs text-purple-500">
                ID: {request.id}
              </div>
            </div>

            {/* Enhanced Status Messages */}
            {request.status === 'proving' && (
              <div className="mt-4 bg-black/60 rounded p-3">
                <div className="flex items-center space-x-2 text-purple-400 mb-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="font-mono text-sm">
                    Uma's SP1 super-oven baking proof with {Math.floor(request.complexity / 1000)}K cryptographic operations...
                  </span>
                </div>
                <div className="font-mono text-xs text-green-400 space-y-1">
                  <div>{'>'} Constraint_system: R1CS generation active</div>
                  <div>{'>'} Witness_computation: Field arithmetic in progress</div>
                  <div>{'>'} Proof_assembly: Polynomial commitments building</div>
                </div>
              </div>
            )}

            {request.status === 'bidding' && (
              <div className="mt-4 bg-black/60 rounded p-3">
                <div className="flex items-center space-x-2 text-blue-400 mb-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="font-mono text-sm">
                    Bakers competing: P(win) = bid^α / Σ(bids^α) | Collateral required: {(request.fee * 2).toFixed(1)} $PROVE
                  </span>
                </div>
                <div className="font-mono text-xs text-cyan-400 space-y-1">
                  <div>{'>'} All-pay auction mechanism: ACTIVE</div>
                  <div>{'>'} Sybil resistance: Collateral verification</div>
                  <div>{'>'} Winner selection: Cryptographic randomness</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Badge of Forge Modal */}
      <BadgeOfForge 
        isVisible={showBadge} 
        onClose={() => setShowBadge(false)} 
      />
    </div>
  );
};
