import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { GradientCardCompact as MainMenusCompactCard } from '@/components';
import { BarChart3, TrendingUp, TrendingDown, RotateCcw } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SpendingDataPoint {
  name: string;
  value: number;
  color?: string;
}

interface InteractiveSpendingChartProps {
  data: SpendingDataPoint[];
  title?: string;
  className?: string;
}

const InteractiveSpendingChart: React.FC<InteractiveSpendingChartProps> = ({ 
  data, 
  title = 'Interactive Spending Analysis',
  className 
}) => {
  const { theme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Colors for different categories
  const baseColors = [
    '#3BC4F2', // Light blue
    '#7A69F9', // Purple
    '#F26378', // Pink
    '#F5833F', // Orange
    '#4ADE80', // Green
    '#A78BFA', // Light purple
    '#FB923C', // Amber
    '#F472B6', // Rose
    '#818CF8', // Indigo
    '#FCD34D', // Yellow
  ];

  // Calculate max value for scaling
  const maxValue = Math.max(...data.map(item => item.value), 1);

  // Handle animation completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleReset = () => {
    setSelectedIndex(null);
    setHoveredIndex(null);
  };

  return (
    <MainMenusCompactCard
      className={cn("w-full h-[400px]", className)}
      header={
        <div className="flex justify-between items-center py-2 px-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
            <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {title}
            </h3>
          </div>
          <button 
            onClick={handleReset}
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Reset selection"
          >
            <RotateCcw size={14} className="text-neutral-700 dark:text-neutral-300" />
          </button>
        </div>
      }
    >
      <div 
        ref={containerRef}
        className="w-full h-full p-4 flex flex-col"
      >
        <div className="flex-1 flex items-end justify-between gap-2">
          {data.map((item, index) => {
            const isSelected = selectedIndex === index;
            const isHovered = hoveredIndex === index;
            const isFiltered = selectedIndex !== null && !isSelected;
            
            // Calculate bar height as percentage of max value
            const heightPercentage = (item.value / maxValue) * 100;
            const finalHeight = Math.max(heightPercentage, 5); // Minimum height for visibility
            
            // Get color for this item
            const color = item.color || baseColors[index % baseColors.length];
            const bgColor = isSelected 
              ? color 
              : isHovered 
                ? `${color}CC` // Slightly transparent when hovered
                : isFiltered 
                  ? theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  : color;
            
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center w-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  height: animationComplete ? `${finalHeight}%` : '5%' 
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 50
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedIndex(isSelected ? null : index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Bar */}
                <div 
                  className={cn(
                    "w-3/4 rounded-t-lg transition-all duration-300",
                    isFiltered ? "opacity-30" : "opacity-100"
                  )}
                  style={{ 
                    backgroundColor: bgColor,
                    height: '100%',
                    minHeight: '10px'
                  }}
                />
                
                {/* Label */}
                <motion.div
                  className="mt-2 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <div className={cn(
                    "text-xs font-medium truncate max-w-[80px]",
                    isFiltered 
                      ? theme === 'dark' ? 'text-gray-500' : 'text-gray-400' 
                      : theme === 'dark' ? 'text-white' : 'text-gray-800'
                  )}>
                    {item.name}
                  </div>
                  <div className={cn(
                    "text-xs mt-1",
                    isFiltered 
                      ? theme === 'dark' ? 'text-gray-600' : 'text-gray-500' 
                      : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    ${item.value.toFixed(2)}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Selected Item Details */}
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mt-4 p-3 rounded-lg border",
              theme === 'dark' 
                ? 'bg-zinc-800/50 border-zinc-700' 
                : 'bg-white border-zinc-200'
            )}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-lg">
                  {data[selectedIndex].name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Detailed breakdown
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">
                  ${data[selectedIndex].value.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                  {data[selectedIndex].value > maxValue * 0.7 ? (
                    <>
                      <TrendingUp className="h-3 w-3 text-red-500" /> High spending
                    </>
                  ) : data[selectedIndex].value < maxValue * 0.3 ? (
                    <>
                      <TrendingDown className="h-3 w-3 text-green-500" /> Low spending
                    </>
                  ) : (
                    "Normal"
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </MainMenusCompactCard>
  );
};

export default InteractiveSpendingChart;
