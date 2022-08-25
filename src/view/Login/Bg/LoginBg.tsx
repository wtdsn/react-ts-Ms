import { useEffect } from 'react';
import DotsBg from './LoginBgC'

function LoginBg() {
  useEffect(() => {
    let dotsBg: DotsBg = new DotsBg('.dots_bg', '#canvas')
    dotsBg.init()

    return () => {
      dotsBg.destroy()
    }
  }, [])

  return <canvas id="canvas"></canvas>
}


export default LoginBg