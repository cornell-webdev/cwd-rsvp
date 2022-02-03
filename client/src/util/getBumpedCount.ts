import { IEvent } from 'src/types/event.type'

const getBumpedCount = (event: IEvent, variant: 'LIKES' | 'VIEWS'): number => {
  const ONE_DAY = 24 * 60 * 60 * 1000

  const datesSinceCreation = Math.round(
    Math.abs((new Date().getTime() - new Date(event.createdAt).getTime()) / ONE_DAY)
  )

  // base bump
  const mod = datesSinceCreation % 2
  const multiValues = variant === 'LIKES' ? [0.5, 1] : [6, 7]
  const multiplier = mod === 0 ? multiValues[0] : multiValues[1]
  const trueCount = variant === 'LIKES' ? event.likedUserIds?.length : event.views
  const baseBumped = trueCount + Math.floor(datesSinceCreation * multiplier)

  // exponential bump
  let expBumpbed = baseBumped
  const expBumpBoundary = variant === 'LIKES' ? [20, 40] : [100, 200]

  if (baseBumped >= expBumpBoundary[0] && baseBumped < expBumpBoundary[1]) {
    expBumpbed = baseBumped * 1.1
  } else if (baseBumped >= expBumpBoundary[1]) {
    expBumpbed = baseBumped * 1.3
  }

  // increment value by event name length
  // this value is stable, yet random, so that different events don't have the same bumped value
  const randValue = datesSinceCreation > 0 ? event.title?.length % 8 : 0
  const finalCount = expBumpbed + randValue

  return finalCount
}

export default getBumpedCount
