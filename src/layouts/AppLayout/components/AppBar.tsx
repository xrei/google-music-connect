import React from 'react'
import {AppBar as MuiAppBar, Toolbar, IconButton, Theme, Typography} from '@material-ui/core'
import {Menu as MenuIcon, Search as SearchIcon} from '@material-ui/icons'
import {makeStyles, createStyles} from '@material-ui/styles'
import {toggle as DrawerToggle} from './SideMenuStore'
import {HideOnScroll} from 'components/HideOnScroll'

type Props = {
  title: string,
}

export const AppBar: React.FC<Props> = ({title}) => {
  const classes = useStyles()

  return (
    <div>
      <HideOnScroll>
      <MuiAppBar className={classes.grow} elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuBtn}
            color="inherit"
            aria-label="open side menu"
            onClick={() => DrawerToggle()}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}
            variant="h6" noWrap
          >
            {title}
          </Typography>
          <div className={classes.grow}></div>
          <IconButton edge="end" color="inherit">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
      </HideOnScroll>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  grow: {
    flexGrow: 1
  },
  menuBtn: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'block'
  }
}))
