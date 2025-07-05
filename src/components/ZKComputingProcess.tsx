
import { useState, useEffect } from 'react';
import { Cpu, Zap, Lock, CheckCircle } from 'lucide-react';

interface ZKComputingProcessProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const ZKComputingProcess = ({ isVisible, onComplete }: ZKComputingProcessProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [processLog, setProcessLog] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  const zkSteps = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'Constraint System Generation',
      logs: [
        '> Initializing R1CS constraint matrix...',
        '> Loading arithmetic circuit definitions...',
        '> Parsing witness generation algorithm...',
        '> Allocating memory for constraint evaluation...',
        '> Computing polynomial degree bounds...',
        '> Generating wire assignments for gates...',
        '> Validating constraint satisfaction...',
        '> Optimizing gate layout for efficiency...',
        '> Building variable dependency graph...',
        '> Constraint system: 247,891 gates processed ✓'
      ]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Polynomial Commitment Scheme',
      logs: [
        '> Loading trusted setup parameters...',
        '> Initializing KZG polynomial commitment...',
        '> Computing Lagrange basis polynomials...',
        '> Evaluating polynomials at secret point τ...',
        '> Generating commitment proofs...',
        '> Applying Fiat-Shamir transform...',
        '> Verifying commitment consistency...',
        '> Computing batch opening proofs...',
        '> Optimizing commitment size...',
        '> Commitment verification: PASSED ✓'
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Zero-Knowledge Proof Assembly',
      logs: [
        '> Constructing witness vector w ∈ F^n...',
        '> Sampling randomness for zero-knowledge...',
        '> Computing proof commitments (A, B, C)...',
        '> Applying permutation argument...',
        '> Encoding public inputs...',
        '> Generating non-interactive challenges...',
        '> Computing quotient polynomial...',
        '> Optimizing proof structure...',
        '> Serializing proof to bytes...',
        '> Proof size optimization: 384 bytes ✓'
      ]
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Cryptographic Verification',
      logs: [
        '> Loading verifier key...',
        '> Parsing proof structure...',
        '> Verifying pairing equation e(A,B) = e(C,G)...',
        '> Validating public input encoding...',
        '> Checking proof consistency...',
        '> Verifying zero-knowledge property...',
        '> Running batch verification...',
        '> Finalizing cryptographic checks...',
        '> Updating verification cache...',
        '> Verification complete: PROOF VALID ✓'
      ]
    }
  ];

  useEffect(() => {
    if (!isVisible) {
      // Reset state when modal closes
      setCurrentStep(0);
      setProcessLog([]);
      setIsComplete(false);
      setCurrentLogIndex(0);
      return;
    }

    // Generate random total duration between 30-50 seconds
    const totalDuration = Math.random() * 20000 + 30000; // 30-50 seconds
    const stepDuration = totalDuration / zkSteps.length;

    let stepTimer: NodeJS.Timeout;
    let logTimer: NodeJS.Timeout;

    const processStep = (stepIndex: number) => {
      if (stepIndex >= zkSteps.length) {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 2000);
        return;
      }

      const step = zkSteps[stepIndex];
      const logInterval = stepDuration / step.logs.length;
      let logIndex = 0;

      const processLogs = () => {
        if (logIndex < step.logs.length) {
          setProcessLog(prev => [...prev, step.logs[logIndex]]);
          logIndex++;
          
          // Variable timing for more realistic feel
          const nextLogDelay = logInterval * (0.5 + Math.random());
          logTimer = setTimeout(processLogs, nextLogDelay);
        } else {
          // Move to next step
          if (stepIndex < zkSteps.length - 1) {
            setCurrentStep(stepIndex + 1);
            stepTimer = setTimeout(() => processStep(stepIndex + 1), 500);
          } else {
            setIsComplete(true);
            setTimeout(() => {
              onComplete();
            }, 2000);
          }
        }
      };

      processLogs();
    };

    // Start processing
    processStep(0);

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(logTimer);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="max-w-4xl w-full mx-4">
        <div className="bg-black/95 backdrop-blur-sm rounded-2xl border border-green-500/50 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-mono font-bold text-green-400 mb-4">
              ZK PROOF COMPUTATION ENGINE
            </h2>
            <p className="font-mono text-green-300">
              Advanced cryptographic processing in progress...
            </p>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center space-x-4 md:space-x-8 mb-8">
            {zkSteps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center transition-all duration-500 ${
                  index <= currentStep ? 'text-green-400' : 'text-gray-600'
                }`}
              >
                <div className={`p-2 md:p-3 rounded-full border-2 mb-2 transition-all duration-500 ${
                  index <= currentStep 
                    ? 'bg-green-400/20 border-green-400 scale-110' 
                    : 'bg-gray-800/20 border-gray-600'
                } ${index === currentStep ? 'animate-pulse' : ''}`}>
                  {step.icon}
                </div>
                <span className="font-mono text-xs text-center max-w-20">
                  {step.title.split(' ').slice(0, 2).join(' ')}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-1000 ease-out"
                style={{ 
                  width: `${((currentStep + (currentLogIndex / zkSteps[currentStep]?.logs.length || 1)) / zkSteps.length) * 100}%` 
                }}
              />
            </div>
            <div className="text-center font-mono text-sm text-green-400 mt-2">
              Processing Step {currentStep + 1} of {zkSteps.length} • {processLog.length} operations completed
            </div>
          </div>

          {/* Terminal Output */}
          <div className="bg-black/80 rounded-xl p-6 h-80 overflow-y-auto">
            <div className="font-mono text-sm space-y-1">
              {processLog.map((log, index) => (
                <div
                  key={index}
                  className="text-green-300 opacity-90"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeIn 0.3s ease-out'
                  }}
                >
                  {log}
                </div>
              ))}
              {!isComplete && (
                <div className="text-green-400 animate-pulse flex items-center mt-2">
                  <span className="mr-2">{'>'}</span>
                  <div className="w-2 h-4 bg-green-400 animate-pulse" />
                  <span className="ml-2 text-xs opacity-70">Computing...</span>
                </div>
              )}
            </div>
          </div>

          {isComplete && (
            <div className="mt-6 text-center">
              <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-4 animate-pulse">
                <h3 className="font-mono text-green-400 text-xl mb-2">
                  🎉 ZERO-KNOWLEDGE PROOF GENERATED SUCCESSFULLY!
                </h3>
                <p className="font-mono text-green-300 text-sm">
                  Cryptographic proof verified and ready for deployment...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
