import React from 'react'
import {SwipeableDrawer, makeStyles} from '@material-ui/core'
import {TrackFullScreenView} from './TrackFullView'

export const TrackDrawer: React.FC = (props) => {
  const [isOpen, toggle] = React.useState(false)
  // const [isSwiping, setSwiping] = React.useState(false)

  const handleClose = (): void => {
    toggle(false)
  }
  const handleOpen = (): void => {
    toggle(true)
  }
  const handleClick = (e: React.SyntheticEvent): void => {
    toggle(true)
  }
  const handleMouseTouchMove = (e: React.MouseEvent | React.TouchEvent): void => {
    // setSwiping(true)
  }
  const handleMouseTouchEnd = (e: React.MouseEvent | React.TouchEvent): void => {
    // setSwiping(false)
  }

  return (
    <SwipeableDrawer
      anchor='bottom'
      open={isOpen}
      onMouseMove={handleMouseTouchMove}
      onTouchMove={handleMouseTouchMove}
      onTouchEnd={handleMouseTouchEnd}
      onClick={handleClick}
      onClose={handleClose}
      onOpen={handleOpen}
      swipeAreaWidth={82}
      disableBackdropTransition
      disableBackdropClick
      SwipeAreaProps={{
        onTouchMove: handleMouseTouchMove,
        onMouseMove: handleMouseTouchMove,
        onTouchEnd: handleMouseTouchEnd
      }}
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