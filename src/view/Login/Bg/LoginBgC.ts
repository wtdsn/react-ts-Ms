import { throttle } from '@/utils/index'
class DotsBg {
  constructor(public containerId: string, public canvasId: string) { }

  public Con = document.querySelector(this.containerId) as HTMLElement
  public CoW = 1200
  public CoH = 900
  public Ca = document.querySelector(this.canvasId) as HTMLCanvasElement
  public Ctx = this.Ca.getContext('2d') as CanvasRenderingContext2D
  public Dots: Dot[] = []
  public distance = 50; // 最大连接距离
  public dotNum = 100   // 点数量
  public preP = {    // 鼠标原位置
    x: this.CoW / 2,
    y: this.CoH / 2
  }
  public offset = {  // 鼠标移动偏移
    x: 0,
    y: 0
  }
  public lineWidth = 0.3
  public stopDraw = false


  init() {
    this.Ca.style.background = 'rgb(31, 36, 50)'
    this.Con.style.overflow = 'hidden'

    window.addEventListener("resize", this.resize)
    this.resize()

    let { CoW, CoH, } = this
    this.Dots = []
    for (let i = 0; i < this.dotNum; i++) {
      this.Dots.push(new Dot(Math.floor(Math.random() * CoW), Math.floor(Math.random() * CoH)))
    }

    window.requestAnimationFrame(this.Drwa.bind(this))

    window.addEventListener('mousemove', this.mouseFollow)
  }

  /* 根据两个点的 r b g 取平均值 */
  createLineColor(C1: Color, R1: number, C2: Color, R2: number) {
    let r = (C1.r * R1 + C2.r * R2) / (R1 + R2)
    let g = (C1.g * R1 + C2.g * R2) / (R1 + R2)
    let b = (C1.b * R1 + C2.b * R2) / (R1 + R2)

    return `rgb(${r},${g},${b})`
  }


  /* 描绘函数 */
  Drwa() {
    this.Ctx.beginPath()
    this.Ctx.clearRect(0, 0, this.CoW, this.CoH)

    for (const d of this.Dots) {
      this.Ctx.beginPath()
      this.Ctx.fillStyle = d.C.color

      this.Ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI)
      this.Ctx.fill()
    }
    if (!this.stopDraw) {
      this.connectDots()
      this.Move()
      window.requestAnimationFrame(this.Drwa.bind(this))
    }
  }

  /* 移动每一个点 */
  Move() {
    for (const d of this.Dots) {
      /* 
        是否越界，反弹
      */
      if (d.x > this.CoW) {
        d.x = this.CoW
        if (d.vx > 0)
          d.vx = -d.vx
      }
      if (d.x < 0) {
        d.x = 0
        if (d.vx < 0)
          d.vx = -d.vx
      }
      if (d.y > this.CoH) {
        d.y = this.CoH
        if (d.vy > 0)
          d.vy = -d.vy
      }
      if (d.y < 0) {
        d.y = 0
        if (d.vy < 0)
          d.vy = -d.vy
      }

      /* 更新位置 */
      d.x += d.vx + this.offset.x * d.fm
      d.y += d.vy + this.offset.y * d.fm
    }

    this.offset.x = 0
    this.offset.y = 0
  }

  /* 连接点 */
  connectDots() {
    for (const d of this.Dots) {
      for (const d2 of this.Dots) {
        if (d !== d2) {
          if (Math.abs(d.x - d2.x) < this.distance && Math.abs(d.y - d2.y) < this.distance) {
            this.Ctx.beginPath()
            this.Ctx.strokeStyle = this.createLineColor(d.C, d.r, d2.C, d2.r)
            this.Ctx.moveTo(d.x, d.y)
            this.Ctx.lineTo(d2.x, d2.y)
            this.Ctx.closePath()
            this.Ctx.stroke();
          }
        }
      }
    }
  }

  mouseFollow = new throttle().use((e: MouseEvent) => {
    // console.log(e);

    let {
      screenX,
      screenY
    } = e

    this.offset.x = Math.floor(screenX - this.preP.x)
    this.offset.y = Math.floor(screenY - this.preP.y)

    this.preP.x = screenX
    this.preP.y = screenY
  }, 20)

  resize = new throttle().use(() => {
    let { offsetWidth, offsetHeight } = this.Con


    this.CoW = offsetWidth
    this.CoH = offsetHeight

    if (offsetWidth < 500 || offsetHeight < 400) {
      this.distance = 50
    } else {
      this.distance = 80
    }

    this.Ca.width = offsetWidth
    this.Ca.height = offsetHeight

    this.Ctx.lineWidth = this.lineWidth


    this.Move()
  }, 100)


  destroy() {
    window.removeEventListener("resize", this.resize)
    window.removeEventListener('mousemove', this.mouseFollow)
    this.stopDraw = true
  }
}

class Color {
  public r = Math.floor(Math.random() * 255);
  public g = Math.floor(Math.random() * 255);
  public b = Math.floor(Math.random() * 255);
  public color = `rgb(${this.r},${this.g},${this.b})`
}

/* 点对象，记录位置，大小，颜色 ，移动速度 */
class Dot {
  public vx
  public vy
  public r = Math.floor(Math.random() * 3) + 2  // 半径

  constructor(public x: number, public y: number) {
    this.vx = Math.random() - 0.5
    this.vy = Math.random() - 0.5

    if (this.vx === 0) {
      this.vx = Math.random() * 0.3 + 0.2
    }

    if (this.vy === 0) {
      this.vy = Math.random() * 0.3 + 0.2
    }
  }

  public C = new Color() // 颜色对象

  /* 跟随鼠标移动比例 */
  public fm = [0, 0.05, 0.1, 0.1, 0.2, 0.2][Math.ceil(Math.random() * 4)]
}

export default DotsBg