import {createBrowserHistory} from 'history'
import {Settings} from './views'

export const history = createBrowserHistory()

export default {
  root: {
    path: '/',
    title: 'Library'
  },
  app: {
    // playlists: {
    //   path: '/playlists',
    //   title: 'Playlists',
    //   view: Playlists
    // },
    settings: {
      path: '/settings',
      title: 'Settings',
      view: Settings
    }
  },
  setup: {
    path: '/setup',
    title: 'Setup'
  }
}