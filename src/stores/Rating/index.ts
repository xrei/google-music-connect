import {createEvent, createStore} from 'effector'
import {RatingState} from 'api/types'
import {api} from 'api'

export const $rating = createStore<RatingState>({liked: false, disliked: false})

export const setRating = createEvent<RatingState>()
export const toggleThumbsUp = createEvent()
export const toggleThumbsDown = createEvent()

$rating.on(setRating, (_, v) => v)

toggleThumbsUp.watch(() => {
  api.sendToggleThumbsUp()
})
toggleThumbsDown.watch(() => {
  api.sendToggleThumbsDown()
})
