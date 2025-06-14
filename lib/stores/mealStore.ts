import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CaloriesResponse } from '@/lib/api';

// Types
interface MealState {
  meals: CaloriesResponse[];
}

// Action Types
type MealAction = 
  | { type: 'ADD_MEAL'; payload: CaloriesResponse }
  | { type: 'REMOVE_MEAL'; payload: number }
  | { type: 'CLEAR_MEALS' };

// Initial State
const initialState: MealState = {
  meals: []
};

// Reducer
const mealReducer = (state: MealState, action: MealAction): MealState => {
  switch (action.type) {
    case 'ADD_MEAL':
      return {
        ...state,
        meals: [...state.meals, action.payload]
      };
    case 'REMOVE_MEAL':
      return {
        ...state,
        meals: state.meals.filter((_, i) => i !== action.payload)
      };
    case 'CLEAR_MEALS':
      return {
        ...state,
        meals: []
      };
    default:
      return state;
  }
};

// Store
export const useMealStore = create<MealState & {
  addMeal: (meal: CaloriesResponse) => void;
  removeMeal: (index: number) => void;
  clearMeals: () => void;
}>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Actions that dispatch to reducer
      addMeal: (meal) => set((state) => 
        mealReducer(state, { type: 'ADD_MEAL', payload: meal })
      ),
      removeMeal: (index) => set((state) => 
        mealReducer(state, { type: 'REMOVE_MEAL', payload: index })
      ),
      clearMeals: () => set((state) => 
        mealReducer(state, { type: 'CLEAR_MEALS' })
      ),
    }),
    {
      name: 'meal-storage',
    }
  )
); 