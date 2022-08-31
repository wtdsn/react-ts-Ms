// 全屏方法封装
class FullScr {
  public ele: HTMLElement

  constructor(selector: string) {
    this.ele = document.querySelector(selector) as HTMLElement
    // 拦截 f11 和 esc(when fullscreen)
    this.preventF11()
  }

  // check canFullScreen
  canFullScreen() {
    const canFS = document.fullscreenEnabled
    if (!canFS) console.log('全屏不可用')
    return canFS
  }

  // check isFullScreen
  isFullScreen() {
    if (!document.fullscreenElement) return false
    else return true
  }

  // get fullScreen Ele
  getFSEle() {
    return document.fullscreenElement
  }

  // toFullScreen
  toFullScreen() {
    if (!this.canFullScreen()) {
      console.log('游览器不支持全屏!')
    }
    this.ele.requestFullscreen()
  }

  // exit FullScreen
  exitFullScreen() {
    if (!this.isFullScreen()) {
      console.log('当前未处于全屏状态！')
    }
    document.exitFullscreen()
  }

  // toggleFullscreen
  toggleFullscreen() {
    if (this.isFullScreen()) {
      document.exitFullscreen()
    } else this.toFullScreen()
  }

  _preVentF11 = (event: any) => {
    const e = event || window.event
    if (e.key === 'F11') {
      e.preventDefault()
      this.toggleFullscreen()
    }
  }

  // preventF11
  preventF11() {
    document.addEventListener(
      'keydown',
      this._preVentF11
    )
  }

  scrrenStateChange(handleChange: any) {
    this.ele.onfullscreenchange = handleChange
  }

  desyory() {
    this.ele.onfullscreenchange = null
    document.removeEventListener('keydown', this._preVentF11)
  }
}

export default FullScr
