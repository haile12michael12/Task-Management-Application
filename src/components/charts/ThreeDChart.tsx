import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { GradientCardCompact as MainMenusCompactCard } from '@/components';
import { cn } from '@/utils/cn';

interface ThreeDChartProps {
  data: {
    label: string;
    value: number;
    color?: string;
  }[];
  title?: string;
  className?: string;
}

const ThreeDChart: React.FC<ThreeDChartProps> = ({ 
  data, 
  title = '3D Budget Visualization',
  className 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set dimensions
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    // Calculate total for percentage calculations
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return;

    // Define base colors for different categories
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

    // Draw 3D pie chart effect
    let currentAngle = -Math.PI / 2; // Start from top
    
    // Draw the "3D" effect by drawing the segments twice with offset
    const depth = 15; // Depth of the 3D effect
    
    // Draw the "back" part of the 3D segments
    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * Math.PI * 2;
      
      // Apply theme-specific styling
      const color = item.color || baseColors[index % baseColors.length];
      const darkerColor = shadeColor(color, -20); // Darker for 3D effect
      
      // Draw the segment shifted down for 3D effect
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + depth);
      ctx.arc(centerX, centerY + depth, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = darkerColor;
      ctx.fill();
      
      currentAngle += sliceAngle;
    });

    // Reset angle for front parts
    currentAngle = -Math.PI / 2;
    
    // Draw the "front" part of the 3D segments
    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * Math.PI * 2;
      
      const color = item.color || baseColors[index % baseColors.length];
      
      // Draw the front segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      
      // Draw border for better definition
      ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      currentAngle += sliceAngle;
    });

    // Draw connecting lines for 3D effect
    currentAngle = -Math.PI / 2;
    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * Math.PI * 2;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      
      const color = item.color || baseColors[index % baseColors.length];
      const darkerColor = shadeColor(color, -20);
      
      // Draw connector from front to back
      const startX = centerX + radius * Math.cos(startAngle);
      const startY = centerY + radius * Math.sin(startAngle);
      const startBackX = centerX + radius * Math.cos(startAngle);
      const startBackY = centerY + depth + radius * Math.sin(startAngle);
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startBackX, startBackY);
      ctx.strokeStyle = darkerColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      const endX = centerX + radius * Math.cos(endAngle);
      const endY = centerY + radius * Math.sin(endAngle);
      const endBackX = centerX + radius * Math.cos(endAngle);
      const endBackY = centerY + depth + radius * Math.sin(endAngle);
      
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(endBackX, endBackY);
      ctx.stroke();
      
      currentAngle += sliceAngle;
    });

    // Draw center hole for donut effect
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.4, 0, Math.PI * 2);
    ctx.fill();
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    
    // Draw center hole for back part too
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(centerX, centerY + depth, radius * 0.4, 0, Math.PI * 2);
    ctx.fill();
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    
    // Draw center text
    ctx.fillStyle = theme === 'dark' ? '#e5e7eb' : '#374151';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Budget', centerX, centerY + depth / 2);
    
  }, [data, theme]);

  // Helper function to adjust color brightness
  function shadeColor(color: string, percent: number): string {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = Math.min(255, Math.max(0, R + R * percent / 100));
    G = Math.min(255, Math.max(0, G + G * percent / 100));
    B = Math.min(255, Math.max(0, B + B * percent / 100));

    const RR = Math.round(R).toString(16).padStart(2, '0');
    const GG = Math.round(G).toString(16).padStart(2, '0');
    const BB = Math.round(B).toString(16).padStart(2, '0');

    return `#${RR}${GG}${BB}`;
  }

  return (
    <MainMenusCompactCard
      className={cn("w-full h-[350px]", className)}
      header={
        <div className="text-center py-2">
          <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {title}
          </h3>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={250}
          className="w-full h-full"
        />
      </div>
    </MainMenusCompactCard>
  );
};

export default ThreeDChart;
