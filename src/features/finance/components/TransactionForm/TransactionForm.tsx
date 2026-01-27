import React, { useState, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { useFinance } from '../../hooks/useFinance';
import { TransactionFormData } from '../../types/finance.types';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';

interface TransactionFormProps {
  transaction?: TransactionFormData;
  onSubmit: (data: TransactionFormData) => void;
  onCancel: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  transaction, 
  onSubmit, 
  onCancel 
}) => {
  const { categories } = useFinance();
  const [formData, setFormData] = useState<TransactionFormData>({
    amount: transaction?.amount || 0,
    type: transaction?.type || 'expense',
    category: transaction?.category || '',
    description: transaction?.description || '',
    date: transaction?.date || new Date().toISOString().split('T')[0],
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount || 0,
        type: transaction.type || 'expense',
        category: transaction.category || '',
        description: transaction.description || '',
        date: transaction.date || new Date().toISOString().split('T')[0],
      });
    }
  }, [transaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof TransactionFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Filter categories based on transaction type
  const filteredCategories = categories.filter(cat => cat.type === formData.type);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{transaction ? 'Edit Transaction' : 'Add New Transaction'}</CardTitle>
        <CardDescription>
          {transaction ? 'Update the transaction details' : 'Add a new income or expense'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
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
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map(category => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
              />
              <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add a description (optional)"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            <Plus className="mr-2 h-4 w-4" />
            {transaction ? 'Update Transaction' : 'Add Transaction'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TransactionForm;