import { FC, useEffect, useRef, useState } from 'react'

interface propsIn {
  width: number,
  height: number,
  refresh: string | number,  // 父组件 通过修改此参数，可以更新 code
  getCode: Function  // 此组件中调用，传递 code 给父组件
}

const VeriCode: FC<propsIn> = (props) => {
  let { width, height, refresh } = props

  const canvas = useRef<HTMLCanvasElement>(null)
  const [Ctx, setCtx] = useState<CanvasRenderingContext2D>()

  const init = () => {
    if (!Ctx) return

    /* 
      数字范围 ：48 -> 57  len:10 
      小写字母 : 97 -> 122 len:26
      大写字母：65 -> 90   len:26
    */
    let choose = [[48, 9], [97, 25], [65, 25]], _code = ''

    /* 获取 code 中的字母 */
    function _getCode(): string | number {
      let index = Math.floor(Math.random() * 3)
      return String.fromCharCode(choose[index][0] + Math.floor(Math.random() * choose[index][1]))
    }

    let ctx = Ctx as CanvasRenderingContext2D
    ctx.clearRect(0, 0, width, height)
    ctx.font = '20px serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    /* 遍历4此绘画到 canvas */
    for (let i = 0; i < 4; i++) {
      let c = _getCode()
      _code += c

      ctx.beginPath()
      let x = width / 4 * i + width / 8,
        y = height / 2 + Math.random() * 6 - 3,
        ro = Math.random() * 0.3 - 0.15,
        color = `rgb(${Math.floor(Math.random() * 100 + 150)},${Math.floor(Math.random() * 100 + 150)},${Math.floor(Math.random() * 100 + 150)})`

      ctx.save()
      ctx.fillStyle = color;
      ctx.translate(x, y)
      ctx.rotate(ro * Math.PI)
      ctx.fillText(c + '', 0, 0)
      ctx.restore()
    }

    /* 传递给父组件 */
    props.getCode(_code)
  }

  useEffect(() => {
    if (canvas?.current?.getContext) {
      let ctx = canvas.current.getContext('2d') as CanvasRenderingContext2D

      // ctx 的设置是异步的 。因此 init 的调用需要另外的 useEffect 。 否则 Ctx 还是 undefined
      setCtx(ctx)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas])

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Ctx, refresh])

  return (<canvas onClick={() => init()} ref={canvas} width={width} height={height} style={{
    backgroundColor: '#484b72',
    cursor:'pointer'
  }}></canvas>)
}



export default VeriCode



