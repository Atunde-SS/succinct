import { useState, useEffect, useRef } from 'react';
import { X, Download } from 'lucide-react';

interface BadgeProps {
  isVisible: boolean;
  onClose: () => void;
}

export const BadgeOfForge = ({ isVisible, onClose }: BadgeProps) => {
  const [xUsername, setXUsername] = useState('');
  const [discordUsername, setDiscordUsername] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [processLog, setProcessLog] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeImageRef = useRef<HTMLImageElement>(null);

  const processingSteps = [
    '> Initializing Badge Genesis Protocol...',
    '> Encrypting forge credentials...',
    '> Generating quantum signature hash...',
    '> Validating proof completion matrix...',
    '> Injecting user identity vectors...',
    '> Compiling badge metadata...',
    '> Forging galactic authenticity seal...',
    '> Badge of Forge successfully minted!'
  ];

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        if (processingStep < processingSteps.length) {
          setProcessLog(prev => [...prev, processingSteps[processingStep]]);
          setProcessingStep(prev => prev + 1);
        } else {
          setIsComplete(true);
          setIsProcessing(false);
          clearInterval(interval);
        }
      }, 400);

      return () => clearInterval(interval);
    }
  }, [isProcessing, processingStep]);

  const handleForge = () => {
    if (!xUsername || !discordUsername) return;
    
    setIsProcessing(true);
    setProcessLog([]);
    setProcessingStep(0);
    setIsComplete(false);
  };

  const generateBadgeWithUsernames = async (): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const badgeImg = badgeImageRef.current;
      
      if (!canvas || !ctx || !badgeImg) {
        resolve('');
        return;
      }

      canvas.width = 600;
      canvas.height = 800;

      // Draw the badge image
      ctx.drawImage(badgeImg, 0, 0, 600, 800);

      // Configure text styling to match the futuristic badge aesthetic
      ctx.font = 'bold 24px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Create gradient for blue-pink text color
      const gradient = ctx.createLinearGradient(0, 0, 400, 0);
      gradient.addColorStop(0, '#3b82f6'); // Blue
      gradient.addColorStop(1, '#ec4899'); // Pink

      // Add usernames with proper positioning and styling - moved up by 1.5x and removed borders
      if (xUsername) {
        const xText = `@${xUsername}`;
        
        // Add background for better readability - moved up by 1.5x (from 650 to 590)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(150, 590, 300, 40);
        
        // Add text without border - moved up by 1.5x (from 670 to 610)
        ctx.fillStyle = gradient;
        ctx.fillText(xText, 300, 610);
      }

      if (discordUsername) {
        const discordText = discordUsername;
        
        // Add background for better readability - moved up by 1.5x (from 700 to 640)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(150, 640, 300, 40);
        
        // Add text without border - moved up by 1.5x (from 720 to 660)
        ctx.fillStyle = gradient;
        ctx.fillText(discordText, 300, 660);
      }

      resolve(canvas.toDataURL('image/png'));
    });
  };

  const handleDownload = async () => {
    const imageData = await generateBadgeWithUsernames();
    if (imageData) {
      const link = document.createElement('a');
      link.download = `succinct-forge-badge-${xUsername || 'anonymous'}.png`;
      link.href = imageData;
      link.click();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full mx-4">
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 rounded-3xl blur-xl animate-pulse" />
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-2xl blur animate-pulse" />
        
        <div className="relative bg-black/90 backdrop-blur-sm rounded-2xl border border-purple-500/50 p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-purple-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-4 bg-purple-600/30 rounded-full blur-xl animate-pulse" />
              <div className="relative">
                <img 
                  ref={badgeImageRef}
                  src="/lovable-uploads/9e77b887-7599-4832-8e23-6ee9386c314d.png" 
                  alt="Succinct Forge Badge" 
                  className="w-48 h-64 object-contain relative z-10 drop-shadow-2xl"
                  crossOrigin="anonymous"
                />
                {(xUsername || discordUsername) && (
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none space-y-2">
                    {xUsername && (
                      <div className="bg-black/70 text-blue-400 px-3 py-1 rounded text-sm font-mono font-bold">
                        @{xUsername}
                      </div>
                    )}
                    {discordUsername && (
                      <div className="bg-black/70 text-pink-400 px-3 py-1 rounded text-sm font-mono font-bold">
                        {discordUsername}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-cyan-600/40 rounded-full blur animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            
            <h2 className="text-3xl font-mono font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              SUCCINCT FORGE BADGE
            </h2>
            <p className="font-mono text-purple-300 text-lg">Proof of Forge Mastery</p>
            <p className="font-mono text-purple-500 text-sm mt-2">
              Galactic Recognition for Zero-Knowledge Pioneers
            </p>
          </div>

          {!isProcessing && !isComplete && (
            <div className="space-y-6">
              <div>
                <label className="block font-mono text-purple-300 mb-2">X Username</label>
                <input
                  type="text"
                  value={xUsername}
                  onChange={(e) => setXUsername(e.target.value)}
                  placeholder="your_x_handle"
                  className="w-full bg-black/60 border border-purple-500/50 rounded-lg px-4 py-3 font-mono text-white placeholder-purple-500/70 focus:border-purple-400 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block font-mono text-purple-300 mb-2">Discord Username</label>
                <input
                  type="text"
                  value={discordUsername}
                  onChange={(e) => setDiscordUsername(e.target.value)}
                  placeholder="your_discord#1234"
                  className="w-full bg-black/60 border border-purple-500/50 rounded-lg px-4 py-3 font-mono text-white placeholder-purple-500/70 focus:border-purple-400 focus:outline-none transition-colors"
                />
              </div>

              <button
                onClick={handleForge}
                disabled={!xUsername || !discordUsername}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-mono py-3 rounded-lg transition-all text-lg font-bold"
              >
                FORGE BADGE
              </button>
            </div>
          )}

          {isProcessing && (
            <div className="bg-black/80 rounded-xl p-6">
              <h3 className="font-mono text-green-400 mb-4">FORGING IN PROGRESS...</h3>
              <div className="space-y-2">
                {processLog.map((log, index) => (
                  <div key={index} className="font-mono text-sm text-green-300">
                    {log}
                  </div>
                ))}
              </div>
              <div className="mt-4 w-full h-2 bg-purple-900/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-500"
                  style={{ width: `${(processingStep / processingSteps.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {isComplete && (
            <div className="text-center space-y-6">
              <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                <h3 className="font-mono text-green-400 text-xl mb-2">BADGE FORGED SUCCESSFULLY!</h3>
                <p className="font-mono text-green-300 text-sm">
                  Your proof of forge mastery has been sealed in the galactic ledger
                </p>
              </div>
              
              <div className="bg-black/60 rounded-xl p-4">
                <div className="font-mono text-purple-300 text-sm space-y-1">
                  <div>Timestamp: <span className="text-green-400">{new Date().toISOString()}</span></div>
                  <div>Status: <span className="text-cyan-400">AUTHENTICATED</span></div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-mono py-3 rounded-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Personalized Badge</span>
                </button>
                
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                  <p className="font-mono text-blue-300 text-sm">
                    🎉 Share your achievement! Download your personalized badge and post it on X (Twitter) to show your Succinct Forge mastery!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};
