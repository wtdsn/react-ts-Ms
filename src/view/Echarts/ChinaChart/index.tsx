import { FC, useState, useEffect, useMemo } from 'react'

import { throttle } from '@/utils/index';
import './index.less'

import JSONDATA from '@/assets/JSON/6.json'

/* echarts */
import * as echarts from 'echarts/core';

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

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | ToolboxComponentOption | TooltipComponentOption | VisualMapComponentOption | GeoComponentOption | MapSeriesOption
>

echarts.use(
  [TitleComponent, ToolboxComponent, TooltipComponent, VisualMapComponent, GeoComponent, MapChart, CanvasRenderer]
);

echarts.registerMap('chinaChart', JSONDATA as any)

const ChianChart: FC = () => {
  const [Charts, setC] = useState<echarts.ECharts>()
  const [Con, setCon] = useState<HTMLDivElement>()

  const option: EChartsOption = useMemo(() => {
    return {
      title: {
        text: "chinaChart",
        series: [{
          type: 'map',
          mapType: 'chinaChart', // 需要与注册时设置的名称相同
        }]
      }
    }
  }, [])

  /*  const MapData: any = useMemo(() => {
     let features: any = [], res = { "type": "FeatureCollection", features }
     JSONDATA.features.forEach((v, i) => {
       features.push({
 
       })
     })
     return res
   }, []) */

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
        height: '80vh'
      }} ></div>
    </div >)
}

export default ChianChart