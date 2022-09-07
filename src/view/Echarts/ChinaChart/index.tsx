import { FC, useState, useEffect, useMemo } from 'react'
import { message } from 'antd';

import { throttle } from '@/utils/index';
import './index.less'

/* MAP data */
import geoJson from '@/assets/JSON/china.json'
import areaData from './area'

/* API */
import { getMap } from '@/Api/map'

/* echarts 按需导入 */
import * as echarts from 'echarts/core';

/* 导入相关的 component 比如 title , toolbox 等 */
/* 同时导入相关的 option */
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  VisualMapComponent,
  VisualMapComponentOption,
  GeoComponent,
  GeoComponentOption
} from 'echarts/components';


import {
  MapChart,
  MapSeriesOption
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';

/* 注册相关组件 */
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer
]);

/* 设置 option 的类型 */
type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | ToolboxComponentOption | TooltipComponentOption | VisualMapComponentOption | GeoComponentOption | MapSeriesOption
>

/* 注册 chinaMap 地图 */
echarts.registerMap('chinaMap', geoJson as any)

const ChianChart: FC = () => {
  /* 保存 charts 和 容器 Con */
  const [Charts, setC] = useState<echarts.ECharts>()
  const [Con, setCon] = useState<HTMLDivElement>()

  /* 地图相关信息 */
  const [title, setTitle] = useState<string>("China Map")
  // regitserMap 注册时 地图的名字
  const [map, setMap] = useState('chinaMap')
  // 地图加载栈 ，方便在地图中进行 return
  const [mapStack, setMapStack] = useState([{
    map: 'chinaMap',
    title: 'China Map',
    mapData: geoJson
  }])

  /* 使用 memeo 记录 option */
  const option: EChartsOption = useMemo(() => {
    let isFull = mapStack.length === 1

    return {
      // 配置 title
      title: {
        text: title,
        link: 'https://echarts.apache.org/examples/zh/editor.html?c=map-HK',
        subtext: "data from 'DataV.GeoAtlas'",
        sublink: 'http://datav.aliyun.com/portal/school/atlas/area_selector#&lat=30.332329214580188&lng=106.72278672066881&zoom=3.5'
      },
      // series 配置图例
      series: [{
        type: 'map',
        map: map,
        // 可缩小，移动
        roam: true,
        scaleLimit: {
          min: 1,
          max: 10
        },
        label: {
          show: true
        },
        data: areaData
      }],
      visualMap: {
        show: isFull,
        min: 0,
        max: 170, calculable: true,
        text: ['High', 'Low'],
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered']
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (e: any) => {
          if (isFull) return `${e.name}<br/>${e.value} 万平方公里`
          return `${mapStack[mapStack.length - 1].title}<br/>${e.name}`
        }
      },
      toolbox: {
        show: true,
        itemSize: 20,
        orient: 'vertical',
        right: '2%',
        top: 'center',
        itemGap: 20,
        // 自定义 tool
        feature: {
          myToolReturn: {
            show: true,
            title: 'Back',
            icon: 'm43.85654,14.58217l0,-11.37882l-43.81347,35.24406l43.81347,35.24437l0,-12.20967c11.88903,-0.00775 32.76105,1.40782 32.76105,11.44035c0,14.01778 -21.79837,21.49585 -21.79837,21.49585l0,10.74781c0,0 48.96727,2.33107 48.96727,-49.53121c0,-40.74509 -41.93863,-42.27618 -59.92995,-41.05274z',
            onclick: () => {
              // 显示完整的中国地图时不需要 return
              if (mapStack.length > 1) {
                let cur = mapStack[mapStack.length - 2]
                setTitle(cur.title)
                setMap(cur.map)
                mapStack.pop()
                setMapStack(mapStack)
              }
            }
          },
          restore: {},
          saveAsImage: {}
        }
      },
    }
  }, [title, map, mapStack])

  useEffect(() => {
    if (!Con) {
      setCon(document.querySelector('.c_eachrt') as HTMLDivElement)
    } else {
      if (!Charts) {
        setC(echarts.init(Con))
      } else {
        Charts.setOption(option)
        Charts.on("click", handleClick)
        Charts.on("restore", restore)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      Charts?.off("click", handleClick)
      Charts?.off("restore", restore)
      window.removeEventListener('resize', handleResize)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option, Charts, Con])

  /* 获取 map 数据，并注册到 echarts 中和显示 */
  let getMapData = async (adcode: string | number, provice: string) => {
    try {
      let res = await getMap(adcode)

      Charts?.hideLoading()

      await echarts.registerMap(provice, res as any)
      setTitle(provice)
      setMap(provice)
      Charts?.dispatchAction({
        type: 'restore',
        center: true
      })
      mapStack.push({
        map: provice,
        title: provice,
        mapData: res as any
      })
      setMapStack(mapStack)
    } catch (err) {
      Charts?.hideLoading()
      console.log(err)
    }
  }

  /* 点击加载具体地图 */
  let handleClick = (e: any) => {
    let adcode: number | string = '',
      provice: string = ''

    mapStack[mapStack.length - 1].mapData.features.some((v, i) => {
      if (v.properties.name === e.name) {
        adcode = v.properties.adcode
        provice = e.name
        return true
      } return false
    })

    if (adcode && provice) {
      if (mapStack.length >= 3 || (Number(adcode) === 710000 && mapStack.length === 2)) {
        message.warning("世界的尽头了！")
        return
      }
      Charts?.showLoading()
      getMapData(adcode, provice)
    }
  }

  let handleResize = useMemo(() =>
    (new throttle()).use(() => {
      if (Con) {
        let { offsetWidth, offsetHeight } = Con as HTMLDivElement
        if (offsetWidth < 200) {
          offsetWidth = 200
        }

        Charts?.resize({
          width: offsetWidth,
          height: offsetHeight
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 100), [Con, Charts])

  /* 通过 restore 恢复完整中国地图 ，或者实现移动后居中 */
  let restore = (e: any) => {
    if (e?.center) return
    mapStack.splice(1)
    setMapStack(mapStack)
    setTitle("China Map")
    setMap('chinaMap')
  }

  return (
    <div className='china_echart_con'>
      <div className="c_eachrt" style={{
        width: '100%',
        height: '100%'
      }} ></div>
    </div >)
}

export default ChianChart