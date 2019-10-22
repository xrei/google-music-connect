import React from 'react'
import {makeStyles} from '@material-ui/styles'
import clsx from 'clsx'

const useStyles = makeStyles({
  root: {
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    textAlign: 'center'
  },
  trackIndex: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

type Props = {
  image?: string,
  index?: number,
  className?: string,
}

export const TrackImg: React.FC<Props> = (props) => {
  const c = useStyles()
  const {image, index, className} = props

  const styles = image ? {backgroundImage: `url('${image}')`} : {}
  return (
    <div
      className={clsx(c.root, className)}
      style={styles}
    >
      { index && <div className={c.trackIndex}>{index}</div>}
    </div>
  )
}