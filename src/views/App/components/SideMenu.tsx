import React from 'react'
import {SwipeableDrawer, makeStyles} from '@material-ui/core'
import {$drawer, onClose, onOpen} from './SideMenuStore'
import {useStore} from 'effector-react'

const listStyle = {
  width: '250px'
}

export const SideMenu: React.FC = () => {
  return (
    <SwipeableDrawer
      open={useStore($drawer)}
      onClose={() => onClose()}
      onOpen={() => onOpen()}
    >
      <div style={listStyle}>asd</div>
    </SwipeableDrawer>
  )
}