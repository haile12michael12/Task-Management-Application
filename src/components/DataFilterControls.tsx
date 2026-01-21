import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Calendar,
  DollarSign,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '../hooks/use-theme';
import { cn } from '../utils/cn';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface SortOption {
  id: string;
  label: string;
  value: 'asc' | 'desc';
}

interface DataFilterControlsProps {
  onFilterChange: (filters: any) => void;
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  availableFilters?: FilterOption[];
  availableSortOptions?: SortOption[];
  className?: string;
}

const DataFilterControls: React.FC<DataFilterControlsProps> = ({
  onFilterChange,
  onSortChange,
  availableFilters = [],
  availableSortOptions = [],
  className
}) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Handle search term change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onFilterChange({ ...getActiveFilterObject(), searchTerm: value });
  };

  // Get active filter object
  const getActiveFilterObject = () => {
    return {
      searchTerm,
      activeFilters,
      sortBy,
      sortOrder
    };
  };

  // Toggle filter
  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId]
    );
    
    onFilterChange(getActiveFilterObject());
  };

  // Handle sort change
  const handleSortChange = (field: string, order: 'asc' | 'desc') => {
    setSortBy(field);
    setSortOrder(order);
    onSortChange(field, order);
    setShowSortDropdown(false);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setActiveFilters([]);
    onFilterChange({});
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Search and Primary Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search transactions, categories, amounts..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-10 w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
          
          {(searchTerm || activeFilters.length > 0) && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="flex items-center gap-2"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map(filterId => {
            const filter = availableFilters.find(f => f.id === filterId);
            return filter ? (
              <Badge 
                key={filterId} 
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => toggleFilter(filterId)}
              >
                {filter.label}
                <span className="ml-1">×</span>
              </Badge>
            ) : null;
          })}
        </div>
      )}

      {/* Filter Dropdown */}
      {showFilterDropdown && (
        <div 
          className={cn(
            "absolute z-10 mt-1 w-64 rounded-md border shadow-lg p-4",
            theme === 'dark' 
              ? 'bg-zinc-800 border-zinc-700' 
              : 'bg-white border-gray-200'
          )}
        >
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter Options
          </h4>
          <div className="space-y-2">
            {availableFilters.map(filter => (
              <div 
                key={filter.id} 
                className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-accent"
                onClick={() => toggleFilter(filter.id)}
              >
                <input
                  type="checkbox"
                  checked={activeFilters.includes(filter.id)}
                  readOnly
                  className="cursor-pointer"
                />
                <span className="text-sm">{filter.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sort Dropdown */}
      {showSortDropdown && (
        <div 
          className={cn(
            "absolute z-10 mt-1 w-64 rounded-md border shadow-lg p-4",
            theme === 'dark' 
              ? 'bg-zinc-800 border-zinc-700' 
              : 'bg-white border-gray-200'
          )}
        >
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort By
          </h4>
          <div className="space-y-2">
            {availableSortOptions.map(option => (
              <div 
                key={option.id} 
                className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-accent"
                onClick={() => handleSortChange(option.id, option.value)}
              >
                <span className="text-sm">{option.label}</span>
                {sortBy === option.id && (
                  option.value === 'asc' ? 
                    <ArrowUp className="h-4 w-4" /> : 
                    <ArrowDown className="h-4 w-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataFilterControls;