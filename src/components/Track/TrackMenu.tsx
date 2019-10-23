import React, {SyntheticEvent} from 'react'
import {makeStyles, Menu, MenuItem, IconButton} from '@material-ui/core'
import {MoreVert as MoreVertIcn} from '@material-ui/icons'
import {ExtTrack} from 'api/types'

export type MenuItem = {
  name: string,
  onClick: (track: ExtTrack) => void,
}
type Props = {menuItems: MenuItem[], track: ExtTrack}

export const TrackMenu: React.FC<Props> = ({menuItems, track}) => {
  const c = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleItemClick = (item: MenuItem) => (e: SyntheticEvent): void => {
    e.stopPropagation()
    setAnchorEl(null)
    item.onClick(track)
  }

  const containerClick = (e: SyntheticEvent): void => {
    e.stopPropagation()
  }

  const items = menuItems.map((v, i) => {
    return (
      <MenuItem key={i} onClick={handleItemClick(v)} className={c.menuItem}>
        {v.name}
      </MenuItem>
    )
  })

  return (
    <div onClick={containerClick}>
      <IconButton
        aria-label="more"
        aria-controls="track-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcn />
      </IconButton>
      <Menu
        id="track-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          style: {padding: 0},
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        {items}
      </Menu>
    </div>
  )
}

const useStyles = makeStyles({
  menuItem: {
    borderBottom: '1px solid #eee',
    '&:last-child': {
      border: 'none'
    }
  }
})
