import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabaseClient';
import type { Expense } from './types';

interface ExpenseRow {
  id: string;
  category_id: string;
  title: string;
  amount: number;
  date: string;
  note: string | null;
}

interface ExpensesState {
  items: Expense[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ExpensesState = {
  items: [],
  status: 'idle',
  error: null,
};

const mapRow = (row: ExpenseRow): Expense => ({
  id: row.id,
  categoryId: row.category_id,
  title: row.title,
  amount: Number(row.amount),
  date: row.date,
  note: row.note ?? undefined,
});

export const fetchExpenses = createAsyncThunk('expenses/fetch', async () => {
  const { data, error } = await supabase
    .from('expenses')
    .select('id, category_id, title, amount, date, note')
    .order('date', { ascending: false });
  if (error) throw error;
  return data.map(mapRow);
});

export const addExpense = createAsyncThunk(
  'expenses/add',
  async (input: { categoryId: string; title: string; amount: number; date: string; note?: string }) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) throw new Error('Not signed in.');

    const { data, error } = await supabase
      .from('expenses')
      .insert({
        category_id: input.categoryId,
        title: input.title,
        amount: input.amount,
        date: input.date,
        note: input.note ?? null,
        user_id: userData.user.id,
      })
      .select('id, category_id, title, amount, date, note')
      .single();
    if (error) throw error;
    return mapRow(data);
  }
);

export const deleteExpense = createAsyncThunk('expenses/delete', async (id: string) => {
  const { error } = await supabase.from('expenses').delete().eq('id', id);
  if (error) throw error;
  return id;
});

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    resetExpenses: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load expenses.';
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to add expense.';
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter((expense) => expense.id !== action.payload);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to delete expense.';
      });
  },
});

export const { resetExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;
