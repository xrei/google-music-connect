import {Playlists, Settings} from './views'

export default {
  root: {
    path: '/',
    title: 'Home'
  },
  app: {
    playlists: {
      path: '/playlists',
      title: 'Playlists',
      view: Playlists
    },
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