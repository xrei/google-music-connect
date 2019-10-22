import React from 'react'
import {Track} from 'components/Track'

export const QueueView: React.FC = () => {

  return (
    <>
      <Track menuItems={mockMenuItems} track={mockTrack} isPlaying/>
      <Track menuItems={mockMenuItems} track={mockTrack} />
      <Track menuItems={mockMenuItems} track={mockTrack} />
      <Track menuItems={mockMenuItems} track={mockTrack} />
      <Track menuItems={mockMenuItems} track={mockTrack} />
      <Track menuItems={mockMenuItems} track={mockTrack} />
      <Track menuItems={mockMenuItems} track={mockTrack} />
      <Track menuItems={mockMenuItems} track={mockTrack} />
      <Track menuItems={mockMenuItems} track={mockTrack} />
      <Track menuItems={mockMenuItems} track={mockTrack} />
      <Track menuItems={mockMenuItems} track={mockTrack} />
      <Track menuItems={mockMenuItems} track={mockTrack} />
      <Track menuItems={mockMenuItems} track={mockTrack} />
    </>
  )
}

const mockTrack = {
  album: "Claustrophobic",
  albumArt: "https://lh3.googleusercontent.com/nFAGWk7nftxI4nyTqVsmgE3mCVXKMt5i1x6YVWiVpm86MvHQAlNYXuJ1dA8ZNfjVf_g3aEeNaA",
  albumArtist: "Before I Turn",
  albumId: "B7cdmpxxwvvn5lyz2reeefaq3ve",
  artist: "Before I Turn",
  artistId: "A7d2kakrwhmnfchjhznpgehauf4",
  artistImage: "https://lh3.googleusercontent.com/QZzRhFRB4sQWimcEENnTq1lRBmEczLsmJehkTFPVeHshfvCz0_yzvhtZHznjSABisaMGt-SK",
  duration: 287000,
  id: "ebd32dc8-7053-3dcd-852d-8ba84fcf859c",
  index: 2,
  playCount: 60,
  title: "Aglæca",
}

const mockMenuItems = [
  {
    name: 'Add to queue',
    onClick: (track: any): void => {
      console.log(track)
    }
  }
]
