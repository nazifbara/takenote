import create from 'zustand'
import axios from 'axios'

import { CategoryStore, CategoryItem } from '@/types'
import { requestCategories } from '@/api'

const isDemo = process.env.DEMO

const _swapCategories = (categories: CategoryItem[], categoryId: number, destinationId: number) => {
  const newCategories = [...categories]
  newCategories.splice(categoryId, 1)
  newCategories.splice(destinationId, 0, categories[categoryId])

  return newCategories
}

export const useCategoryStore = create<CategoryStore>()((set) => ({
  categories: [],
  editingCategory: {
    id: '',
    tempName: '',
  },
  error: '',
  loading: true,

  addCategory: (categoryItem) =>
    set((state) => ({ categories: [...state.categories, categoryItem] })),

  importCategories: (categoriesItems) =>
    set((state) => {
      const categoryNames = new Map<string, string>()
      state.categories.forEach(({ name }) => categoryNames.set(name, name))

      // Make sure duplicate category is not added
      const toAdd = categoriesItems.filter(({ name }) => !categoryNames.has(name))

      return { categories: [...state.categories, ...toAdd] }
    }),

  updateCategory: (categoryItem) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryItem.id ? { ...category, name: categoryItem.name } : category
      ),
    })),

  deleteCategory: (categoryId) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== categoryId),
    })),

  categoryDragEnter: (categoryItem) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryItem.id ? { ...category, draggedOver: true } : category
      ),
    })),

  categoryDragLeave: (categoryItem) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryItem.id ? { ...category, draggedOver: false } : category
      ),
    })),

  swapCategories: (categoryId, destinationId) =>
    set((state) => ({
      categories: _swapCategories(state.categories, categoryId, destinationId),
    })),

  setCategoryEdit: (categoryId, tempName) => set({ editingCategory: { id: categoryId, tempName } }),

  loadCategories: async () => {
    set({ loading: true })
    let data
    try {
      if (isDemo) {
        data = await requestCategories()
      } else {
        data = (await axios('/api/sync/categories')).data
      }
      set({ loading: true, categories: data })
    } catch (error: any) {
      set({ loading: false, error: error.message })
    }
  },
}))
