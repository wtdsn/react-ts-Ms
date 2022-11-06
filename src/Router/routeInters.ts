import { FC } from 'react'

export interface routeInter {
  path: string,
  element: FC<any>,
  icon?: JSX.Element,
  redirect?: string,
  index?: boolean,
  meta?: any,
  children?: routeInter[]
}