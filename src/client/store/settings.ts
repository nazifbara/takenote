import create from 'zustand'

import { SettingsStore } from '@/types'
import { NotesSortKey, DirectionText } from '@/utils/enums'
import { requestSettings } from '@/api'

export const useSettingsStore = create<SettingsStore>()((set) => ({
  previewMarkdown: false,
  darkTheme: false,
  sidebarVisible: true,
  notesSortKey: NotesSortKey.LAST_UPDATED,
  codeMirrorOptions: {
    mode: 'gfm',
    theme: 'base16-light',
    lineNumbers: false,
    lineWrapping: true,
    styleActiveLine: { nonEmpty: true },
    viewportMargin: Infinity,
    keyMap: 'default',
    dragDrop: false,
    direction: DirectionText.LEFT_TO_RIGHT,
    scrollPastEnd: false,
  },
  isOpen: false,
  loading: false,

  toggleSettingsModal: () => set((state) => ({ isOpen: !state.isOpen })),
  updateCodeMirrorOption: (key, value) => set({ codeMirrorOptions: { [key]: value } }),
  togglePreviewMarkdown: () => set((state) => ({ previewMarkdown: !state.previewMarkdown })),
  toggleDarkTheme: () => set((state) => ({ darkTheme: !state.darkTheme })),
  updateNotesSortStrategy: (notesSortKey) => ({ notesSortKey }),
  loadSettings: async () => {
    set({ loading: true })
    try {
      const data = await requestSettings()
      set({ ...data, loading: false })
    } catch (error) {
      set({ loading: false })
    }
  },
}))
