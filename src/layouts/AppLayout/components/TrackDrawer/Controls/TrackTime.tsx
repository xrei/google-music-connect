import React from 'react'
import {makeStyles} from '@material-ui/core'
import {useStore} from 'effector-react'
import {$fmtTime} from 'stores/TrackStore/trackTime'

export const TrackTime: React.FC = () => {
  const c = useStyles()
  const {current, total} = useStore($fmtTime)

  return (
    <div className={c.root}>
      <span>{current}</span>
      <span>{total}</span>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '12px 16px 0'
  }
})
