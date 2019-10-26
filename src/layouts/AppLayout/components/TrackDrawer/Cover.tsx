import React from 'react'
import {makeStyles} from '@material-ui/core'
import {useStore} from 'effector-react'
import {$track} from 'stores/TrackStore/track'

export const Cover: React.FC = (props) => {
  const {albumArt} = useStore($track)
  const c = useStyles()

  const styles = albumArt ? {backgroundImage: `url('${albumArt}')`} : {}

  return (
    <div className={c.fullscreenCover} style={styles}>
    </div>
  )
}

const useStyles = makeStyles({
  fullscreenCover: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }
})
