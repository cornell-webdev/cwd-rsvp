export const isObjShallowEqual = (obj1: any, obj2: any) => {
  return (
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every((key) => obj1[key] === obj2[key])
  )
}
