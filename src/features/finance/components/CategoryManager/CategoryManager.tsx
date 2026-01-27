import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFinance } from '../../hooks/useFinance';
import { CategoryFormData } from '../../types/finance.types';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface CategoryManagerProps {
  categories: any[]; // Using any for simplicity, should be Category[]
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories }) => {
  const { createCategory, updateCategory, deleteCategory } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    type: 'expense',
    color: '#3b82f6',
    icon: '',
    budget: undefined,
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && currentCategory) {
        await updateCategory(currentCategory.id, formData);
      } else {
        await createCategory(formData);
      }
      
      // Reset form
      setFormData({
        name: '',
        type: 'expense',
        color: '#3b82f6',
        icon: '',
        budget: undefined,
      });
      setShowForm(false);
      setIsEditing(false);
      setCurrentCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleEdit = (category: any) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      type: category.type,
      color: category.color,
      icon: category.icon || '',
      budget: category.budget,
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleChange = (field: keyof CategoryFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Categories</h3>
        <Button onClick={() => {
          setShowForm(true);
          setIsEditing(false);
          setCurrentCategory(null);
          setFormData({
            name: '',
            type: 'expense',
            color: '#3b82f6',
            icon: '',
            budget: undefined,
          });
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Category Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Category' : 'Add New Category'}</CardTitle>
            <CardDescription>
              {isEditing ? 'Update the category details' : 'Add a new income or expense category'}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleFormSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value: 'income' | 'expense') => handleChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => handleChange('color', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Monthly Budget Limit ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00 (optional)"
                  value={formData.budget || ''}
                  onChange={(e) => handleChange('budget', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                  setCurrentCategory(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Plus className="mr-2 h-4 w-4" />
                {isEditing ? 'Update Category' : 'Add Category'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {/* Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="border rounded-lg p-4 flex justify-between items-start"
          >
            <div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="font-medium">{category.name}</span>
              </div>
              <Badge variant="secondary" className="mt-2">
                {category.type}
              </Badge>
              {category.budget && (
                <p className="text-sm text-gray-600 mt-1">
                  Budget: ${category.budget.toFixed(2)}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(category)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(category.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;