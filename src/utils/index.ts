export class throttle {
  public use(cb: Function, wait: number) {
    let timer: NodeJS.Timeout, stop = false

    return function (this: any, ...p: any[]) {
      clearTimeout(timer)
      if (stop) {
        timer = setTimeout(() => {
          cb.apply(this, p)
        }, wait)
      } else {
        stop = true
        cb.apply(this, p)
        setTimeout(() => {
          stop = false
        }, wait)
      }
    }
  }
}