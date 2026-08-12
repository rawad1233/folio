import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import expensesReducer from './expensesSlice';
import budgetsReducer from './budgetsSlice';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  expenses: expensesReducer,
  budgets: budgetsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
