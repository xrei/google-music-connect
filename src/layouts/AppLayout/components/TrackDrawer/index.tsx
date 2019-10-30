import React from 'react'
import {SwipeableDrawer, makeStyles} from '@material-ui/core'
import {TrackFullScreenView} from './TrackFullView'

export const TrackDrawer: React.FC = (props) => {
  const [isOpen, toggle] = React.useState(false)

  const handleClose = (): void => {
    toggle(false)
  }
  const handleOpen = (): void => {
    toggle(true)
  }
  const handleClick = (e: React.SyntheticEvent): void => {
    toggle(true)
  }

  return (
    <SwipeableDrawer
      anchor='bottom'
      open={isOpen}
      onClick={handleClick}
      onClose={handleClose}
      onOpen={handleOpen}
      swipeAreaWidth={82}
      disableBackdropTransition
      disableBackdropClick
    >
      <SwiperBlock>
        <TrackFullScreenView />
      </SwiperBlock>
    </SwipeableDrawer>
  )
}

const SwiperBlock: React.FC = ({children}) => {
  const c = useStyles()
  return (
    <div className={c.swiper}>{children}</div>
  )
}

const useStyles = makeStyles({
  swiper: {
    display: 'block',
    width: '100%',
    height: '100vh',
    backgroundColor: '#eee'
  }
})