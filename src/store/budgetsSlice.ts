import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabaseClient';
import type { Budget } from './types';

interface BudgetRow {
  id: string;
  category_id: string;
  limit: number;
  month: string;
}

interface BudgetsState {
  items: Budget[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BudgetsState = {
  items: [],
  status: 'idle',
  error: null,
};

const mapRow = (row: BudgetRow): Budget => ({
  id: row.id,
  categoryId: row.category_id,
  limit: Number(row.limit),
  month: row.month,
});

export const fetchBudgets = createAsyncThunk('budgets/fetch', async () => {
  const { data, error } = await supabase
    .from('budgets')
    .select('id, category_id, limit, month')
    .order('month', { ascending: false });
  if (error) throw error;
  return data.map(mapRow);
});

export const addBudget = createAsyncThunk(
  'budgets/add',
  async (input: { categoryId: string; limit: number; month: string }) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) throw new Error('Not signed in.');

    const { data, error } = await supabase
      .from('budgets')
      .insert({
        category_id: input.categoryId,
        limit: input.limit,
        month: input.month,
        user_id: userData.user.id,
      })
      .select('id, category_id, limit, month')
      .single();
    if (error) throw error;
    return mapRow(data);
  }
);

export const deleteBudget = createAsyncThunk('budgets/delete', async (id: string) => {
  const { error } = await supabase.from('budgets').delete().eq('id', id);
  if (error) throw error;
  return id;
});

const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    resetBudgets: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load budgets.';
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addBudget.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to add budget.';
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.items = state.items.filter((budget) => budget.id !== action.payload);
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to delete budget.';
      });
  },
});

export const { resetBudgets } = budgetsSlice.actions;
export default budgetsSlice.reducer;
