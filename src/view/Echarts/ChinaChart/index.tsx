import { FC, useState, useEffect, useMemo } from 'react'

import { throttle } from '@/utils/index';
import './index.less'

import geoJson from '@/assets/JSON/china.json'
import areaData from './area'

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


echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer
]);

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | ToolboxComponentOption | TooltipComponentOption | VisualMapComponentOption | GeoComponentOption | MapSeriesOption
>

echarts.registerMap('chinaMap', geoJson as any)

const ChianChart: FC = () => {
  const [Charts, setC] = useState<echarts.ECharts>()
  const [Con, setCon] = useState<HTMLDivElement>()

  const option: EChartsOption = useMemo(() => {
    let data = areaData
    return {
      title: {
        text: "China Map",
        link: 'https://echarts.apache.org/examples/zh/editor.html?c=map-HK',
        subtext: 'use echarts',
        sublink: 'https://echarts.apache.org/zh/index.html'
      },
      series: [{
        type: 'map',
        map: 'chinaMap',
        roam: true,
        scaleLimit: {
          min: 1,
          max: 10
        },
        label: {
          show: true
        },
        data
      }],
      visualMap: {
        min: 0,
        max: 170, calculable: true,
        text: ['High', 'Low'],
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered']
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{c} 万平方公里'
      },
      toolbox: {
        show: true,
        itemSize: 20,
        orient: 'vertical',
        right: '2%',
        top: 'center',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
          // magicType: {
          //   type: ['line', 'bar', 'stack']
          // }
        }
      },
    }
  }, [])

  useEffect(() => {
    if (!Con) {
      setCon(document.querySelector('.c_eachrt') as HTMLDivElement)
    } else {
      if (!Charts) {
        setC(echarts.init(Con))
      } else {
        Charts.setOption(option)
      }
    }


    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option, Charts, Con])

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


  return (
    <div className='china_echart_con'>
      <div className="c_eachrt" style={{
        width: '100%',
        height: '100%'
      }} ></div>
    </div >)
}

export default ChianChart