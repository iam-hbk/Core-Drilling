import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  language: 'en' | 'fr'
  theme: 'light' | 'dark'
  isOffline: boolean
  syncStatus: 'synced' | 'syncing' | 'error'
  setLanguage: (lang: 'en' | 'fr') => void
  setTheme: (theme: 'light' | 'dark') => void
  setOfflineStatus: (status: boolean) => void
  setSyncStatus: (status: 'synced' | 'syncing' | 'error') => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en',
      theme: 'light',
      isOffline: false,
      syncStatus: 'synced',
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      setOfflineStatus: (isOffline) => set({ isOffline }),
      setSyncStatus: (syncStatus) => set({ syncStatus }),
    }),
    {
      name: 'app-store',
    }
  )
)