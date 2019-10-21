import React from 'react'
import {useScrollTrigger, Slide} from '@material-ui/core'

export const HideOnScroll: React.FC = (props) => {
  const {children} = props
  const trigger = useScrollTrigger({target: window ? window : undefined});

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}
