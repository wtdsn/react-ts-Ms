import { FC } from 'react'

export interface routeInter {
  path: string,
  icon?: string | JSX.Element,
  redirect?: string,
  index?: boolean,
  element: FC<any>,
  meta?: any,
  children?: routeInter[]
} 