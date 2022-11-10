import { act, renderHook } from '@testing-library/react-hooks'

import { useSettingsStore } from '@/store/settings'
import { NotesSortKey, DirectionText } from '@/utils/enums'

describe('settings store', () => {
  it('should return the initial state on first run', () => {
    const { result } = renderHook(() => useSettingsStore())

    expect(result.current).toBe({
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
    })
  })
})
