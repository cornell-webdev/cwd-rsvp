import queryString from 'query-string'
import omit from 'lodash/omit'

export const queryStringToObject = (str: string, options = {}) =>
  queryString.parse(str, {
    arrayFormat: 'bracket',
    ...options,
  })

export const objectToQueryString = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    const undef = obj[key] === undefined
    const emptyStr = obj[key] === ''
    if (undef || emptyStr) {
      delete obj[key]
    }
  })
  return new URLSearchParams(obj).toString()
}

export const omitFromQueryString = (str: string, keys: string[]) =>
  objectToQueryString(omit(queryStringToObject(str), keys))

export const addToQueryString = (str: string, fields: any) =>
  objectToQueryString({
    ...queryStringToObject(str),
    ...fields,
  })
