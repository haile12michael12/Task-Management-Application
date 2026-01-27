import { BudgetCategory, BudgetSubcategory } from '../../domain/models/BudgetModels';
import { 
  GetBudgetCategoriesUseCase, 
  AddBudgetCategoryUseCase, 
  UpdateBudgetCategoryUseCase,
  DeleteBudgetCategoryUseCase,
  AddBudgetSubcategoryUseCase
} from '../usecases/BudgetUseCases';

export class BudgetService {
  constructor(
    private getBudgetCategoriesUseCase: GetBudgetCategoriesUseCase,
    private addBudgetCategoryUseCase: AddBudgetCategoryUseCase,
    private updateBudgetCategoryUseCase: UpdateBudgetCategoryUseCase,
    private deleteBudgetCategoryUseCase: DeleteBudgetCategoryUseCase,
    private addBudgetSubcategoryUseCase: AddBudgetSubcategoryUseCase
  ) {}

  async getAllCategories(): Promise<BudgetCategory[]> {
    return await this.getBudgetCategoriesUseCase.execute();
  }

  async createCategory(category: Omit<BudgetCategory, 'id'>): Promise<BudgetCategory> {
    // Validate category before creating
    if (!category.title || category.title.trim() === '') {
      throw new Error('Category title is required');
    }
    
    if (category.subcategories.some(sub => !sub.label || sub.value === undefined)) {
      throw new Error('All subcategories must have a label and value');
    }
    
    return await this.addBudgetCategoryUseCase.execute(category);
  }

  async updateCategory(category: BudgetCategory): Promise<BudgetCategory> {
    // Validate category before updating
    if (!category.id) {
      throw new Error('Category ID is required for update');
    }
    
    if (!category.title || category.title.trim() === '') {
      throw new Error('Category title is required');
    }
    
    return await this.updateBudgetCategoryUseCase.execute(category);
  }

  async removeCategory(id: string): Promise<void> {
    if (!id) {
      throw new Error('Category ID is required for deletion');
    }
    
    return await this.deleteBudgetCategoryUseCase.execute(id);
  }

  async addSubcategoryToCategory(categoryId: string, subcategory: Omit<BudgetSubcategory, 'id'>): Promise<BudgetCategory> {
    if (!categoryId) {
      throw new Error('Category ID is required');
    }
    
    if (!subcategory.label || subcategory.value === undefined) {
      throw new Error('Subcategory must have a label and value');
    }
    
    return await this.addBudgetSubcategoryUseCase.execute(categoryId, subcategory);
  }
}