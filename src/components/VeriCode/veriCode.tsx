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

  function getColor(): string {
    return `rgb(${Math.floor(Math.random() * 100 + 150)},${Math.floor(Math.random() * 100 + 150)},${Math.floor(Math.random() * 100 + 150)})`
  }

  function getBgC(): string {
    return `rgb(${Math.floor(Math.random() * 20 + 20)},${Math.floor(Math.random() * 20 + 20)},${Math.floor(Math.random() * 20 + 50)})`
  }

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

    /* 清楚画布 */
    ctx.clearRect(0, 0, width, height)

    /* 渲染背景 */
    ctx.fillStyle = getBgC()
    ctx.fillRect(0, 0, width, height)

    /* 设置文字样式 */
    ctx.font = '20px serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'


    /* 模糊化 */
    let dotNum = Math.ceil(Math.random() * 5) + 5

    ctx.globalAlpha = 0.4
    for (let i = 0; i < dotNum; i++) {
      ctx.beginPath()
      let x = Math.random() * width, y = Math.random() * height
      ctx.arc(x, y, 2, 0, 2 * Math.PI, false)
      ctx.fillStyle = getColor()
      ctx.fill()
    }

    /* 渲染字符 */
    ctx.globalAlpha = 1
    for (let i = 0; i < 4; i++) {
      let c = _getCode()
      _code += c

      let x = width / 4 * i + width / 8,
        y = height / 2 + Math.random() * 6 - 3,
        ro = Math.random() * 0.3 - 0.15


      ctx.save()
      ctx.fillStyle = getColor();
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
    cursor: 'pointer'
  }}></canvas>)
}



export default VeriCode



