import { BudgetRepositoryImpl } from '../domain/repositories/BudgetRepositoryImpl';
import { 
  GetBudgetCategoriesUseCaseImpl, 
  AddBudgetCategoryUseCaseImpl, 
  UpdateBudgetCategoryUseCaseImpl,
  DeleteBudgetCategoryUseCaseImpl,
  AddBudgetSubcategoryUseCaseImpl
} from '../application/usecases/BudgetUseCases';
import { BudgetService } from '../application/services/BudgetService';

export class BudgetServiceFactory {
  static createBudgetService(): BudgetService {
    // Create repositories
    const budgetRepository = new BudgetRepositoryImpl();

    // Create use cases
    const getBudgetCategoriesUseCase = new GetBudgetCategoriesUseCaseImpl(budgetRepository);
    const addBudgetCategoryUseCase = new AddBudgetCategoryUseCaseImpl(budgetRepository);
    const updateBudgetCategoryUseCase = new UpdateBudgetCategoryUseCaseImpl(budgetRepository);
    const deleteBudgetCategoryUseCase = new DeleteBudgetCategoryUseCaseImpl(budgetRepository);
    const addBudgetSubcategoryUseCase = new AddBudgetSubcategoryUseCaseImpl(budgetRepository);

    // Create and return service
    return new BudgetService(
      getBudgetCategoriesUseCase,
      addBudgetCategoryUseCase,
      updateBudgetCategoryUseCase,
      deleteBudgetCategoryUseCase,
      addBudgetSubcategoryUseCase
    );
  }
}