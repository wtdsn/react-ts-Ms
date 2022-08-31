import { FC, useState, createElement, useCallback, useEffect } from 'react'
import {
  FullscreenExitOutlined, FullscreenOutlined
} from '@ant-design/icons'

import FullScr from '@/utils/fullscreen'
import './index.less'

const fs = new FullScr('body')
const FullScreen: FC = () => {

  const [isFullScreen, setFS] = useState(false)

  const toggleFS = () => {
    fs.toggleFullscreen()
  }

  let onFSChange = useCallback(() => {
    setFS(fs.isFullScreen())
  }, [])

  useEffect(() => {
    fs.scrrenStateChange(onFSChange)
  }, [onFSChange])


  return createElement(isFullScreen ? FullscreenExitOutlined : FullscreenOutlined, {
    className: 'full_screen_box',
    onClick: () => toggleFS()
  })
}

export default FullScreen