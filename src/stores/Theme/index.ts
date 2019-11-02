import {createEvent, createStore} from 'effector'
import Cookies from 'js-cookie'

type ThemeVariant = 'Light' | 'Dark'

export const $theme = createStore<ThemeVariant>(Cookies.get('Theme') as ThemeVariant)
export const toggleTheme = createEvent<void>()
export const setTheme = createEvent<ThemeVariant>()

$theme.on(toggleTheme, (s) => s === 'Light' ? 'Dark' : 'Light')
$theme.on(setTheme, (_, v) => v)

$theme.watch(theme => {
  Cookies.set('Theme', theme, {expires: 365})
})
