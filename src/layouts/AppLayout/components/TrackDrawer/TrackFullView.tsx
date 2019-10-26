import React from 'react'
import {makeStyles} from '@material-ui/core'
import {TopBar} from './TopBar'
import {Cover} from './Cover'
import {Controls} from './Controls/'


export const TrackFullScreenView: React.FC = (props) => {
  const c = useStyles()

  return (
    <div className={c.trackView}>
      <TopBar />
      <Cover />
      <EmptySpace />
      <Controls />
    </div>
  )
}

const useStyles = makeStyles({
  trackView: {
    height: '100vh',
    position: 'relative',
    display: 'flex',
    flexFlow: 'column'
  }
})

const EmptySpace: React.FC = () => <div style={{flex: 1}}></div>