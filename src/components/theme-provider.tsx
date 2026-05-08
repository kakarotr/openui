/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'

type Theme = 'dark' | 'light' | 'system'
type ResolvedTheme = 'dark' | 'light'

interface ThemeColor {
  main: string
  foreground: string
}

interface SidebarColor {
  main?: string
  foreground?: string
  primary?: ThemeColor
  accent?: ThemeColor
  border?: string
  ring?: string
}

interface DesignTheme {
  primary?: ThemeColor
  secondary?: ThemeColor
  muted?: ThemeColor
  accent?: ThemeColor
  card?: ThemeColor
  popover?: ThemeColor
  background?: string
  foreground?: string
  destructive?: string
  border?: string
  input?: string
  ring?: string
  radius?: string
  sidebar?: SidebarColor
}

type ThemeProviderProps = {
  children: React.ReactNode
  designTheme?: DesignTheme
  defaultTheme?: Theme
  storageKey?: string
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'
const THEME_VALUES: Theme[] = ['dark', 'light', 'system']

const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined)

function isTheme(value: string | null): value is Theme {
  if (value === null) {
    return false
  }

  return THEME_VALUES.includes(value as Theme)
}

function getSystemTheme(): ResolvedTheme {
  if (window.matchMedia(COLOR_SCHEME_QUERY).matches) {
    return 'dark'
  }

  return 'light'
}

function disableTransitionsTemporarily() {
  const style = document.createElement('style')
  style.appendChild(
    document.createTextNode(
      '*,*::before,*::after{-webkit-transition:none!important;transition:none!important}'
    )
  )
  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        style.remove()
      })
    })
  }
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable) {
    return true
  }

  const editableParent = target.closest(
    "input, textarea, select, [contenteditable='true']"
  )
  if (editableParent) {
    return true
  }

  return false
}

export function ThemeProvider({
  children,
  designTheme,
  defaultTheme = 'system',
  storageKey = 'theme',
  disableTransitionOnChange = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey)
    if (isTheme(storedTheme)) {
      return storedTheme
    }

    return defaultTheme
  })

  const serialized = JSON.stringify(designTheme)

  const filteredStyle = React.useMemo(() => {
    if (!designTheme) return undefined

    const raw: Record<string, string | undefined> = {
      '--background': designTheme.background,
      '--foreground': designTheme.foreground,

      '--card': designTheme.card?.main,
      '--card-foreground': designTheme.card?.foreground,

      '--popover': designTheme.popover?.main,
      '--popover-foreground': designTheme.popover?.foreground,

      '--primary': designTheme.primary?.main,
      '--primary-foreground': designTheme.primary?.foreground,

      '--secondary': designTheme.secondary?.main,
      '--secondary-foreground': designTheme.secondary?.foreground,

      '--muted': designTheme.muted?.main,
      '--muted-foreground': designTheme.muted?.foreground,

      '--accent': designTheme.accent?.main,
      '--accent-foreground': designTheme.accent?.foreground,

      '--destructive': designTheme.destructive,
      '--border': designTheme.border,
      '--input': designTheme.input,
      '--ring': designTheme.ring,
      '--radius': designTheme.radius,

      '--sidebar': designTheme.sidebar?.main,
      '--sidebar-foreground': designTheme.sidebar?.foreground,
      '--sidebar-primary': designTheme.sidebar?.primary?.main,
      '--sidebar-primary-foreground': designTheme.sidebar?.primary?.foreground,
      '--sidebar-accent': designTheme.sidebar?.accent?.main,
      '--sidebar-accent-foreground': designTheme.sidebar?.accent?.foreground,
      '--sidebar-border': designTheme.sidebar?.border,
      '--sidebar-ring': designTheme.sidebar?.ring,
    }
    
    return Object.fromEntries(
      Object.entries(raw).filter(([, v]) => v !== undefined)
    ) as React.CSSProperties
  }, [serialized])

  
  React.useEffect(() => {
    if (!filteredStyle) return

    const root = document.documentElement
    const entries = Object.entries(filteredStyle)

      entries.forEach(([key, value]) => {
      root.style.setProperty(key, value as string)
    })

    return () => {
      entries.forEach(([key]) => {
        root.style.removeProperty(key)
      })
    }
  }, [filteredStyle])

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      localStorage.setItem(storageKey, nextTheme)
      setThemeState(nextTheme)
    },
    [storageKey]
  )

  const applyTheme = React.useCallback(
    (nextTheme: Theme) => {
      const root = document.documentElement
      const resolvedTheme =
        nextTheme === 'system' ? getSystemTheme() : nextTheme
      const restoreTransitions = disableTransitionOnChange
        ? disableTransitionsTemporarily()
        : null

      root.classList.remove('light', 'dark')
      root.classList.add(resolvedTheme)

      if (restoreTransitions) {
        restoreTransitions()
      }
    },
    [disableTransitionOnChange]
  )

  React.useEffect(() => {
    applyTheme(theme)

    if (theme !== 'system') {
      return undefined
    }

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY)
    const handleChange = () => {
      applyTheme('system')
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme, applyTheme])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (isEditableTarget(event.target)) {
        return
      }

      if (event.key.toLowerCase() !== 'd') {
        return
      }

      setThemeState((currentTheme) => {
        const nextTheme =
          currentTheme === 'dark'
            ? 'light'
            : currentTheme === 'light'
              ? 'dark'
              : getSystemTheme() === 'dark'
                ? 'light'
                : 'dark'

        localStorage.setItem(storageKey, nextTheme)
        return nextTheme
      })
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [storageKey])

  React.useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea !== localStorage) {
        return
      }

      if (event.key !== storageKey) {
        return
      }

      if (isTheme(event.newValue)) {
        setThemeState(event.newValue)
        return
      }

      setThemeState(defaultTheme)
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [defaultTheme, storageKey])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme]
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
