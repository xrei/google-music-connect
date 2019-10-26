import React from 'react'
import {SwipeableDrawer} from '@material-ui/core'
import {$drawer, onClose, onOpen} from './SideMenuStore'
import {useStore} from 'effector-react'
import {MenuList} from './MenuList'

export const SideMenu: React.FC = () => {
  return (
    <SwipeableDrawer
      open={useStore($drawer)}
      onClose={() => onClose()}
      onOpen={() => onOpen()}
      disableBackdropTransition={true}
    >
      <MenuList />
    </SwipeableDrawer>
  )
}
