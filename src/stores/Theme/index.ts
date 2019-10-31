import {createEvent, createStore} from 'effector'

type ThemeVariant = 'Light' | 'Dark'

export const $theme = createStore<ThemeVariant>('Light')
export const toggleTheme = createEvent<void>()

$theme.on(toggleTheme, (s) => s === 'Light' ? 'Dark' : 'Light')
