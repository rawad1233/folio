import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabaseClient';
import type { Category } from './types';

interface CategoryRow {
  id: string;
  name: string;
  color: string;
}

interface CategoriesState {
  items: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  status: 'idle',
  error: null,
};

const mapRow = (row: CategoryRow): Category => ({
  id: row.id,
  name: row.name,
  color: row.color,
});

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, color')
    .order('created_at');
  if (error) throw error;
  return data.map(mapRow);
});

export const addCategory = createAsyncThunk(
  'categories/add',
  async (input: { name: string; color: string }) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) throw new Error('Not signed in.');

    const { data, error } = await supabase
      .from('categories')
      .insert({ name: input.name, color: input.color, user_id: userData.user.id })
      .select('id, name, color')
      .single();
    if (error) throw error;
    return mapRow(data);
  }
);

export const deleteCategory = createAsyncThunk('categories/delete', async (id: string) => {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
  return id;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCategories: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load categories.';
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to add category.';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((category) => category.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to delete category.';
      });
  },
});

export const { resetCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
