import React from 'react'
import {NavLink as Link} from 'react-router-dom'
import {makeStyles, List, ListItem, ListItemIcon, ListItemText, Divider} from '@material-ui/core'
import {Home as HomeIcn, LibraryMusic as MusicIcn, Settings as SettingsIcn} from '@material-ui/icons'
import {toggle as ToggleDrawer} from './SideMenuStore'

const styles = makeStyles({
  list: {
    width: 250
  },
  active: {
    color: '#ff0557'
  }
})

export const MenuList: React.FC = () => {
  const classess = styles()
  return (
    <div
      className={classess.list}
      role="presentation"
      onClick={() => ToggleDrawer()}
    >
      <List>
        <ListItem button
          component={Link}
          to="/"
          exact
          activeClassName={classess.active}
        >
          <ListItemIcon><HomeIcn /></ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>

        <ListItem button
          component={Link} 
          to="/playlists"
          activeClassName={classess.active}
        >
          <ListItemIcon><MusicIcn /></ListItemIcon>
          <ListItemText>Playlists</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button
          component={Link}
          to="/settings"
          activeClassName={classess.active}
        >
          <ListItemIcon><SettingsIcn /></ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </ListItem>
      </List>
    </div>
  )
}