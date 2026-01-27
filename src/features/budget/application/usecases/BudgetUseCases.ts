import { BudgetCategory, BudgetSubcategory } from '../../domain/models/BudgetModels';
import { BudgetRepository } from '../../domain/repositories/BudgetRepositoryInterface';

export interface GetBudgetCategoriesUseCase {
  execute(): Promise<BudgetCategory[]>;
}

export interface AddBudgetCategoryUseCase {
  execute(category: Omit<BudgetCategory, 'id'>): Promise<BudgetCategory>;
}

export interface UpdateBudgetCategoryUseCase {
  execute(category: BudgetCategory): Promise<BudgetCategory>;
}

export interface DeleteBudgetCategoryUseCase {
  execute(id: string): Promise<void>;
}

export interface AddBudgetSubcategoryUseCase {
  execute(categoryId: string, subcategory: Omit<BudgetSubcategory, 'id'>): Promise<BudgetCategory>;
}

export class GetBudgetCategoriesUseCaseImpl implements GetBudgetCategoriesUseCase {
  constructor(private budgetRepository: BudgetRepository) {}
  
  async execute(): Promise<BudgetCategory[]> {
    return await this.budgetRepository.getBudgetCategories();
  }
}

export class AddBudgetCategoryUseCaseImpl implements AddBudgetCategoryUseCase {
  constructor(private budgetRepository: BudgetRepository) {}
  
  async execute(category: Omit<BudgetCategory, 'id'>): Promise<BudgetCategory> {
    return await this.budgetRepository.addCategory(category);
  }
}

export class UpdateBudgetCategoryUseCaseImpl implements UpdateBudgetCategoryUseCase {
  constructor(private budgetRepository: BudgetRepository) {}
  
  async execute(category: BudgetCategory): Promise<BudgetCategory> {
    return await this.budgetRepository.updateCategory(category);
  }
}

export class DeleteBudgetCategoryUseCaseImpl implements DeleteBudgetCategoryUseCase {
  constructor(private budgetRepository: BudgetRepository) {}
  
  async execute(id: string): Promise<void> {
    return await this.budgetRepository.deleteCategory(id);
  }
}

export class AddBudgetSubcategoryUseCaseImpl implements AddBudgetSubcategoryUseCase {
  constructor(private budgetRepository: BudgetRepository) {}
  
  async execute(categoryId: string, subcategory: Omit<BudgetSubcategory, 'id'>): Promise<BudgetCategory> {
    const categories = await this.budgetRepository.getBudgetCategories();
    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
    
    if (categoryIndex === -1) {
      throw new Error(`Category with id ${categoryId} not found`);
    }
    
    const updatedCategory: BudgetCategory = {
      ...categories[categoryIndex],
      subcategories: [
        ...categories[categoryIndex].subcategories,
        { ...subcategory, id: `subcat_${Date.now()}` }
      ]
    };
    
    return await this.budgetRepository.updateCategory(updatedCategory);
  }
}