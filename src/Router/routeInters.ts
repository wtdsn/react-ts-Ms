import { FC } from 'react'

export interface routeInter {
  path: string,
  name?: string,
  icon?: string | JSX.Element,
  redirect?: string,
  index?: boolean,
  component: FC<any>,
  children?: routeInter[]
} 