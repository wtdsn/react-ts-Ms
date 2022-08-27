function join(...paths: string[]): string {

  let res = '', len = paths.length
  /* 仅一个 */
  if (len === 0) {
    return paths[0]
  } else {
    res = paths[0]
    /* 大于 1 个 */
    for (let i = 1; i < len; i++) {
      /* 处理当前 path 的末尾和 新 path 的开头 */
      let curP = paths[i]
      while (res.endsWith('/')) {
        res = res.slice(0, -1)
      }
      while (curP.startsWith('/')) {
        curP = curP.slice(1)
      }
      res += '/' + curP
    }
  }

  return res
}

export default join