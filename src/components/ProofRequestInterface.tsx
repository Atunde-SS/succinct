import { useState } from 'react';
import { Terminal, Zap, Clock, DollarSign, Award } from 'lucide-react';
import { ZKComputingProcess } from './ZKComputingProcess';

interface ProofRequestInterfaceProps {
  onSubmitRequest: (request: any) => void;
  completedProofs?: number;
}

export const ProofRequestInterface = ({ onSubmitRequest, completedProofs = 0 }: ProofRequestInterfaceProps) => {
  const [program, setProgram] = useState('');
  const [inputs, setInputs] = useState('');
  const [fee, setFee] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showZKProcess, setShowZKProcess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program || !inputs || !fee) return;

    setIsSubmitting(true);
    
    const request = {
      id: `0x${Math.random().toString(16).substr(2, 4)}`,
      user: 'Anonymous_Hacker',
      program: program,
      inputs: inputs,
      fee: parseFloat(fee),
      deadline: deadline || '24h',
      status: 'pending',
      progress: 0,
      complexity: Math.floor(Math.random() * 500000) + 100000,
      cycleCount: Math.floor(Math.random() * 2000000) + 500000,
      timestamp: Date.now()
    };

    // Simulate network delay then ALWAYS show ZK process for every request
    setTimeout(() => {
      onSubmitRequest(request);
      setIsSubmitting(false);
      setShowZKProcess(true); // Always show ZK process for every proof request
      
      // Reset form
      setProgram('');
      setInputs('');
      setFee('');
      setDeadline('');
    }, 1200);
  };

  const handleZKProcessComplete = () => {
    setShowZKProcess(false);
  };

  const programTemplates = [
    'Blockchain State Verification',
    'Private Identity Proof',
    'AI Model Inference',
    'Cross-chain Bridge Validation',
    'Encrypted Data Processing',
    'Smart Contract Execution'
  ];

  const remainingProofs = Math.max(0, 3 - completedProofs);

  return (
    <>
      <div className="bg-black/80 backdrop-blur-sm rounded-2xl border border-green-500/30 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Terminal className="w-6 h-6 text-green-400" />
          <h3 className="font-mono text-xl text-green-400">PROOF REQUEST TERMINAL</h3>
          <div className="flex space-x-1 ml-auto">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Badge Progress Indicator */}
        <div className="mb-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span className="font-mono text-purple-300 text-sm">Badge Progress</span>
            </div>
            <span className="font-mono text-cyan-400 text-sm">{completedProofs}/3 proofs</span>
          </div>
          <div className="w-full h-2 bg-purple-900/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-1000"
              style={{ width: `${(completedProofs / 3) * 100}%` }}
            />
          </div>
          <p className="font-mono text-purple-400 text-xs mt-2">
            {remainingProofs > 0 
              ? `Complete ${remainingProofs} more proof${remainingProofs > 1 ? 's' : ''} to unlock the Badge of Forge!`
              : 'Badge of Forge unlocked! 🎉'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-green-300 mb-2 text-sm">
              {'>'} PROGRAM_TYPE:
            </label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full bg-black/60 border border-green-500/50 rounded px-3 py-2 font-mono text-green-400 text-sm focus:border-green-400 focus:outline-none"
            >
              <option value="">SELECT_PROGRAM_TYPE</option>
              {programTemplates.map((template, index) => (
                <option key={index} value={template}>{template}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-mono text-green-300 mb-2 text-sm">
              {'>'} INPUT_DATA:
            </label>
            <textarea
              value={inputs}
              onChange={(e) => setInputs(e.target.value)}
              placeholder="0x1a2b3c4d5e6f..."
              rows={3}
              className="w-full bg-black/60 border border-green-500/50 rounded px-3 py-2 font-mono text-green-400 text-sm placeholder-green-600 focus:border-green-400 focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-green-300 mb-2 text-sm">
                {'>'} FEE_AMOUNT ($PROVE):
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                <input
                  type="number"
                  step="0.1"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  placeholder="2.5"
                  className="w-full bg-black/60 border border-green-500/50 rounded px-8 py-2 font-mono text-green-400 text-sm placeholder-green-600 focus:border-green-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-green-300 mb-2 text-sm">
                {'>'} DEADLINE:
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="24h"
                  className="w-full bg-black/60 border border-green-500/50 rounded px-8 py-2 font-mono text-green-400 text-sm placeholder-green-600 focus:border-green-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!program || !inputs || !fee || isSubmitting}
            className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-black font-mono py-3 rounded font-bold transition-all duration-300 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                <span>INJECTING_REQUEST...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>EXECUTE_PROOF_REQUEST</span>
              </>
            )}
          </button>
        </form>

        {isSubmitting && (
          <div className="mt-4 bg-black/60 rounded p-3">
            <div className="font-mono text-xs text-green-400 space-y-1">
              <div className="animate-pulse">{'>'} Encrypting request payload...</div>
              <div className="animate-pulse" style={{ animationDelay: '0.5s' }}>{'>'} Broadcasting to network nodes...</div>
              <div className="animate-pulse" style={{ animationDelay: '1s' }}>{'>'} Awaiting miner validation...</div>
            </div>
          </div>
        )}
      </div>

      {/* ZK Computing Process Modal - Now shows for every proof request */}
      <ZKComputingProcess 
        isVisible={showZKProcess} 
        onComplete={handleZKProcessComplete} 
      />
    </>
  );
};
