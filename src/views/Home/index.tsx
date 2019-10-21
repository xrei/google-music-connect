import React from 'react'
import styled from 'styled-components'
import {
  AppBar, Box,
  Tabs, Tab,
  Typography,
  makeStyles,
  Theme
} from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import {HideOnScroll} from 'components/HideOnScroll'

const tabs = [
  {
    label: 'Queue',
    disabled: false
  },
  {
    label: 'Playlists',
    disabled: true
  },
  {
    label: 'Albums',
    disabled: true
  },
  {
    label: 'Artists',
    disabled: true
  },
  {
    label: 'Songs',
    disabled: true
  }
]

export const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <TabsWrapper />
    </HomeWrapper>
  )
}

const TabsWrapper: React.FC = () => {
  const c = styles()
  const [tab, setTab] = React.useState(0)
  const handleChange = (e: React.ChangeEvent<{}>, v: number): void => {
    setTab(v)
  }
  const handleChangeIndex = (i: number): void => {
    setTab(i)
  }
  return (
  <>
    <HideOnScroll>
      <AppBar elevation={0} className={c.tabBar}>
        <Tabs
          value={tab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Library tabs"
        >
          {tabs.map((v, i) => {
            return <Tab
              label={v.label}
              id={`tab-${i}`}
              aria-controls={`library-tabpanel-${i}`}
              disabled={v.disabled}
            />
          })}
        </Tabs>
      </AppBar>
    </HideOnScroll>

    <SwipeableViews index={tab} onChangeIndex={handleChangeIndex}>
      <TabPanel value={tab} index={0}>
        queue
      </TabPanel>
    </SwipeableViews>
  </>
  )
}

type TabViewProps = {
  children?: React.ReactNode,
  index: number,
  value: number,
}

const TabPanel: React.FC<TabViewProps> = (props) => {
  const {children, value, index, ...rest} = props
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`library-tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...rest}
    >
      <Box p={1}>{children}</Box>
    </Typography>
  )
}

const styles = makeStyles((theme: Theme) => ({
  tabBar: {
    marginTop: 64,
    [theme.breakpoints.down('xs')]: {
      marginTop: 56
    }
  }
}))

const HomeWrapper = styled.div`
  position: relative;
  padding-top: 48px;
`
