import { useState, useCallback } from 'react'

const useMergeState = (initialState: any) => {
  const [state, setState] = useState(initialState || {})

  const mergeState = useCallback(newState => {
    setState({
      ...state,
      ...newState,
    })
  }, [state])

  return [state, mergeState]
}

export default useMergeState
