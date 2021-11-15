import { useRef } from 'react'
import isEqual from 'lodash/isEqual'

type SupportedValue = Record<string, unknown> | string | boolean | number | null;

const useDeepCompareMemoize = (value: SupportedValue): SupportedValue => {
  const valueRef = useRef<SupportedValue>(null)

  if (!isEqual(value, valueRef.current)) {
    valueRef.current = value
  }
  return valueRef.current
}

export default useDeepCompareMemoize
