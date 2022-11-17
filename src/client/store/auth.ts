import create from 'zustand'
import axios from 'axios'

import { AuthStore } from '@/types'

const isDemo = process.env.DEMO

export const useAuthStore = create<AuthStore>()((set) => ({
  currentUser: {},
  isAuthenticated: false,
  error: '',
  loading: true,
  login: async () => {
    set({ loading: true })
    try {
      if (isDemo) {
        set({ currentUser: { name: 'Demo User' }, isAuthenticated: true, loading: false })
      } else {
        const { data } = await axios('/api/auth/login')
        set({ currentUser: data, loading: false, isAuthenticated: true })
      }
    } catch (error: any) {
      set({ loading: false, error: error.message, isAuthenticated: false })
    }
  },
  logout: async () => {
    set({ loading: true })
    try {
      if (!isDemo) {
        await axios('/api/auth/logout')
      }
    } finally {
      set({ loading: false, isAuthenticated: false, currentUser: {}, error: '' })
    }
  },
}))
