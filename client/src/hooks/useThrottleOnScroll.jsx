import { useEffect, useMemo } from 'react'
import throttle from 'lodash/throttle'

const noop = () => {}

const useThrottledOnScroll = (target, callback, delay) => {
  const throttledCallback = useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay],
  )

  useEffect(() => {
    if (throttledCallback === noop) {
      return undefined
    }

    target.addEventListener('scroll', throttledCallback)
    return () => {
      target.removeEventListener('scroll', throttledCallback)
      throttledCallback.cancel()
    }
  }, [throttledCallback])
}

export default useThrottledOnScroll
