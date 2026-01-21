import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, Edit3 } from 'lucide-react';
import type { Category } from '../data/defaultCategories';
import { useTheme } from '../hooks/use-theme';

interface ThreeDCategoryCardProps {
  category: Category;
  index: number;
  onSubcategoryChange: (
    catIndex: number,
    subIndex: number,
    value: string,
  ) => void;
  onLabelChange: (
    catIndex: number,
    subIndex: number,
    label: string,
  ) => void;
  onAddSubcategory: (catIndex: number) => void;
  onDeleteSubcategory: (catIndex: number, subIndex: number) => void;
  onDeleteCategory: (catIndex: number) => void;
}

const ThreeDCategoryCard: React.FC<ThreeDCategoryCardProps> = ({
  category,
  index,
  onSubcategoryChange,
  onLabelChange,
  onAddSubcategory,
  onDeleteSubcategory,
  onDeleteCategory,
}) => {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(category.title);

  const handleSave = () => {
    // In a real app, you'd update the category title
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(category.title);
    setIsEditing(false);
  };

  // Calculate total for the category
  const categoryTotal = category.subcategories.reduce(
    (sum, sub) => sum + (parseFloat(sub.value) || 0),
    0
  );

  return (
    <motion.div
      className={`relative rounded-2xl p-1 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-indigo-900/30 to-purple-900/30' 
          : 'bg-gradient-to-br from-indigo-100 to-purple-100'
      }`}
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* 3D Card Effect */}
      <div 
        className="relative h-full rounded-2xl bg-white dark:bg-zinc-800/90 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg overflow-hidden"
        style={{
          transform: 'translateZ(10px)',
        }}
      >
        {/* Card Header with 3D Effect */}
        <div className="relative p-4 border-b border-zinc-200/50 dark:border-zinc-700/50">
          <div className="flex justify-between items-center">
            {isEditing ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
                <div className="flex gap-1">
                  <button 
                    onClick={handleSave}
                    className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-full"
                  >
                    <Plus size={16} />
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="p-1 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-full"
                  >
                    <Minus size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
                  {category.title}
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-gray-500 hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-full transition-colors"
                  >
                    <Edit3 size={14} />
                  </button>
                </h3>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-800 dark:text-white">
                    {categoryTotal.toFixed(2)}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>

        {/* Subcategories with 3D Effect */}
        <div className="p-4 space-y-3">
          {category.subcategories.map((subcategory, subIndex) => (
            <motion.div
              key={subIndex}
              className={`p-3 rounded-xl border ${
                theme === 'dark' 
                  ? 'bg-zinc-700/30 border-zinc-600/50' 
                  : 'bg-white border-zinc-200'
              } shadow-sm`}
              whileHover={{ x: 5 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: subIndex * 0.05 }}
              style={{
                transform: 'translateZ(5px)',
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={subcategory.label}
                  onChange={(e) => onLabelChange(index, subIndex, e.target.value)}
                  className={`flex-1 bg-transparent ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  } focus:outline-none`}
                  placeholder="Subcategory name"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={subcategory.value}
                    onChange={(e) => onSubcategoryChange(index, subIndex, e.target.value)}
                    className={`w-20 p-1 rounded text-right ${
                      theme === 'dark' 
                        ? 'bg-zinc-600/50 text-white' 
                        : 'bg-zinc-100 text-gray-800'
                    } border border-zinc-300 dark:border-zinc-600`}
                    placeholder="0.00"
                  />
                  <button
                    onClick={() => onDeleteSubcategory(index, subIndex)}
                    className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add Subcategory Button with 3D Effect */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAddSubcategory(index)}
            className={`w-full py-2 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
              theme === 'dark' 
                ? 'border-zinc-600 text-zinc-400 hover:border-zinc-500 hover:text-zinc-300' 
                : 'border-zinc-300 text-zinc-600 hover:border-zinc-400 hover:text-zinc-800'
            }`}
            style={{
              transform: 'translateZ(5px)',
            }}
          >
            <Plus size={16} />
            Add Subcategory
          </motion.button>
        </div>

        {/* Delete Category Button */}
        <div className="p-3 border-t border-zinc-200/50 dark:border-zinc-700/50">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onDeleteCategory(index)}
            className="w-full py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
            style={{
              transform: 'translateZ(10px)',
            }}
          >
            <Trash2 size={16} />
            Delete Category
          </motion.button>
        </div>
      </div>

      {/* 3D Reflection Effect */}
      <div 
        className={`absolute inset-0 rounded-2xl pointer-events-none ${
          theme === 'dark' ? 'opacity-20' : 'opacity-30'
        }`}
        style={{
          background: `linear-gradient(135deg, transparent 40%, ${
            theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)'
          } 80%)`,
          transform: 'translateZ(-10px)',
        }}
      ></div>
    </motion.div>
  );
};

export default ThreeDCategoryCard;