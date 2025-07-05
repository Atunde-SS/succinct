
import { useState, useEffect } from 'react';
import { Cpu, Database, Network, Zap } from 'lucide-react';

interface AlgorithmStep {
  id: string;
  name: string;
  status: 'idle' | 'processing' | 'complete';
  progress: number;
  complexity: string;
  description: string;
}

export const AlgorithmicVisualizer = () => {
  const [algorithms, setAlgorithms] = useState<AlgorithmStep[]>([
    {
      id: 'sp1_compilation',
      name: 'SP1 RISC-V Compilation',
      status: 'idle',
      progress: 0,
      complexity: 'O(n log n)',
      description: 'Converting Rust code to RISC-V bytecode for zkVM execution'
    },
    {
      id: 'proof_generation',
      name: 'Zero-Knowledge Proof Generation',
      status: 'idle',
      progress: 0,
      complexity: 'O(n²)',
      description: 'Creating cryptographic proof using STARK/SNARK protocols'
    },
    {
      id: 'contest_resolution',
      name: 'Proof Contest Resolution',
      status: 'idle',
      progress: 0,
      complexity: 'O(m log m)',
      description: 'All-pay auction mechanism with probabilistic winner selection'
    },
    {
      id: 'verification',
      name: 'Onchain Verification',
      status: 'idle',
      progress: 0,
      complexity: 'O(1)',
      description: 'Constant-time proof verification using verification key'
    }
  ]);

  const [codeExecution, setCodeExecution] = useState({
    currentLine: 0,
    totalLines: 150,
    executionSpeed: 0,
    memoryUsage: 0
  });

  const [hackingLog, setHackingLog] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAlgorithms = prev => 
        prev.map(algo => {
          let newStatus = algo.status;
          let newProgress = algo.progress;

          if (algo.status === 'idle' && Math.random() > 0.8) {
            newStatus = 'processing';
            newProgress = 5;
          } else if (algo.status === 'processing') {
            // Simulate different processing complexities
            let increment = 0;
            switch (algo.complexity) {
              case 'O(1)':
                increment = Math.random() * 40; // Constant time - fast
                break;
              case 'O(n log n)':
                increment = Math.random() * 15; // Efficient sorting
                break;
              case 'O(m log m)':
                increment = Math.random() * 20; // Contest resolution
                break;
              case 'O(n²)':
                increment = Math.random() * 8; // Proof generation - intensive
                break;
            }
            
            newProgress = Math.min(100, algo.progress + increment);
            
            if (newProgress >= 100) {
              newStatus = 'complete';
              setTimeout(() => {
                setAlgorithms(current => 
                  current.map(a => 
                    a.id === algo.id ? { ...a, status: 'idle', progress: 0 } : a
                  )
                );
              }, 3000);
            }
          }

          return { ...algo, status: newStatus, progress: newProgress };
        });

      // Add hacker-style logs
      const hackingMessages = [
        '{\'>\'}  Injecting RISC-V bytecode into zkVM...',
        '{\'>\'}  Constraint system initialized: R1CS',
        '{\'>\'}  Witness generation: EXECUTING',
        '{\'>\'}  Fiat-Shamir transform: APPLIED',
        '{\'>\'}  Polynomial commitment: COMPUTED',
        '{\'>\'}  Proof verification: CRYPTOGRAPHIC_SEAL',
        '{\'>\'}  Network consensus: ACHIEVED',
        '{\'>\'}  Collateral slash detected: PREVENTING'
      ];

      setHackingLog(prev => [
        ...prev.slice(-6),
        hackingMessages[Math.floor(Math.random() * hackingMessages.length)]
      ]);

      setAlgorithms(newAlgorithms);
      
      // Update code execution simulation
      setCodeExecution(prev => ({
        currentLine: (prev.currentLine + Math.floor(Math.random() * 5) + 1) % prev.totalLines,
        totalLines: prev.totalLines,
        executionSpeed: 800 + Math.random() * 400, // Instructions per second
        memoryUsage: 45 + Math.sin(Date.now() / 5000) * 15 // Oscillating memory usage
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-yellow-400 border-yellow-400';
      case 'complete': return 'text-green-400 border-green-400';
      default: return 'text-purple-400 border-purple-400';
    }
  };

  const getStatusIcon = (id: string) => {
    switch (id) {
      case 'sp1_compilation': return <Cpu className="w-5 h-5" />;
      case 'proof_generation': return <Zap className="w-5 h-5" />;
      case 'contest_resolution': return <Network className="w-5 h-5" />;
      case 'verification': return <Database className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Core Process Execution Pipeline */}
      <div className="bg-black/60 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
        <h3 className="font-mono text-xl text-purple-400 mb-6">CORE PROCESS EXECUTION PIPELINE</h3>
        
        <div className="space-y-4">
          {algorithms.map((algo, index) => (
            <div key={algo.id} className="relative">
              <div className={`bg-black/40 rounded-xl border-2 p-4 transition-all duration-300 ${getStatusColor(algo.status)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-purple-900/30 ${getStatusColor(algo.status)}`}>
                      {getStatusIcon(algo.id)}
                    </div>
                    <div>
                      <h4 className="font-mono text-lg font-bold text-purple-300">{algo.name}</h4>
                      <p className="font-mono text-sm text-purple-500">{algo.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-mono text-sm ${getStatusColor(algo.status)}`}>
                      {algo.status.toUpperCase()}
                    </div>
                    <div className="font-mono text-xs text-purple-400">
                      Complexity: {algo.complexity}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="w-full h-3 bg-purple-900/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          algo.status === 'complete' 
                            ? 'bg-gradient-to-r from-green-600 to-green-400' 
                            : 'bg-gradient-to-r from-purple-600 to-pink-500'
                        }`}
                        style={{ width: `${algo.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="font-mono text-sm text-purple-400 min-w-[3rem]">
                    {Math.round(algo.progress)}%
                  </div>
                </div>

                {/* Live Code Output */}
                {algo.status === 'processing' && (
                  <div className="mt-3 bg-black/80 rounded p-2">
                    <div className="font-mono text-xs text-green-400">
                      {hackingLog[index % hackingLog.length] || 'Processing...'}
                    </div>
                  </div>
                )}

                {algo.status === 'processing' && (
                  <div className="absolute -inset-1 bg-purple-600/20 rounded-xl blur animate-pulse" />
                )}
              </div>
              
              {/* Connection Line to Next Step */}
              {index < algorithms.length - 1 && (
                <div className="flex justify-center my-2">
                  <div className="w-px h-6 bg-purple-500/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RISC-V Execution Monitor */}
      <div className="bg-black/60 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
        <h3 className="font-mono text-xl text-purple-400 mb-4">RISC-V EXECUTION CORE</h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-900/20 rounded-xl p-4 text-center">
            <div className="font-mono text-2xl text-green-400 mb-1">
              {codeExecution.currentLine}
            </div>
            <div className="font-mono text-sm text-green-600">Current Instruction</div>
          </div>
          
          <div className="bg-blue-900/20 rounded-xl p-4 text-center">
            <div className="font-mono text-2xl text-blue-400 mb-1">
              {Math.round(codeExecution.executionSpeed)}
            </div>
            <div className="font-mono text-sm text-blue-600">Instructions/sec</div>
          </div>
          
          <div className="bg-orange-900/20 rounded-xl p-4 text-center">
            <div className="font-mono text-2xl text-orange-400 mb-1">
              {Math.round(codeExecution.memoryUsage)}%
            </div>
            <div className="font-mono text-sm text-orange-600">Memory Usage</div>
          </div>
        </div>

        {/* Enhanced Code Execution */}
        <div className="bg-black/80 rounded-xl p-4 font-mono text-sm">
          <div className="text-green-400 mb-2">// SP1 zkVM RISC-V Execution Trace</div>
          <div className="mb-2 text-cyan-400">// Live Core Process Monitor</div>
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={`py-1 px-2 rounded ${
                i === 2 ? 'bg-yellow-600/20 text-yellow-300' : 'text-gray-400'
              }`}
            >
              <span className="text-purple-400">{String(codeExecution.currentLine + i).padStart(4, '0')}:</span>
              <span className="ml-2">
                {i === 2 ? '→ ' : '  '}
                {[
                  'add x1, x2, x3     // Arithmetic constraint',
                  'mul x4, x5, x6     // Field multiplication', 
                  'load x7, 0(sp)     // Memory witness',
                  'store x8, 8(sp)    // Commitment update',
                  'jmp 0x1000         // Circuit branching',
                  'call prove_fn      // Proof generation',
                  'ret                // Verification complete',
                  'nop                // Padding constraint'
                ][i]}
              </span>
            </div>
          ))}
          
          {/* Live Hacking Log */}
          <div className="mt-4 border-t border-green-500/30 pt-2">
            <div className="text-green-400 text-xs mb-1">LIVE_CORE_LOG:</div>
            {hackingLog.slice(-3).map((log, index) => (
              <div key={index} className="text-green-300 text-xs animate-pulse">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
