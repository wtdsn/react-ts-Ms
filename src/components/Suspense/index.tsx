import { FC, Suspense as ReactSus } from "react";
import { Spin } from 'antd'

interface SusInter {
  children: any
}
const Suspense: FC<SusInter> = (props) => {
  console.log(props)

  return (
    <ReactSus fallback={<Spin style={{
      width: '100%',
      marginTop: '40%'
    }}></Spin>}>
      {props.children}
    </ReactSus>
  )
}

export default Suspense