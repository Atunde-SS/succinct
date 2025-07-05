
import { useEffect, useState } from 'react';

export const TechGrid = () => {
  const [gridLines, setGridLines] = useState<Array<{ id: number; active: boolean }>>([]);

  useEffect(() => {
    const lines = Array.from({ length: 20 }, (_, i) => ({ id: i, active: false }));
    setGridLines(lines);

    const interval = setInterval(() => {
      setGridLines(prev => 
        prev.map(line => ({
          ...line,
          active: Math.random() > 0.7
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Vertical lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className={`absolute h-full w-px transition-all duration-1000 ${
              gridLines[i]?.active 
                ? 'bg-purple-400/30 shadow-purple-400/20 shadow-sm' 
                : 'bg-purple-800/10'
            }`}
            style={{ left: `${(i * 5)}%` }}
          />
        ))}
      </div>
      
      {/* Horizontal lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className={`absolute w-full h-px transition-all duration-1000 ${
              gridLines[i]?.active 
                ? 'bg-purple-400/30 shadow-purple-400/20 shadow-sm' 
                : 'bg-purple-800/10'
            }`}
            style={{ top: `${(i * 7)}%` }}
          />
        ))}
      </div>
    </div>
  );
};
