import { FC, useState, useEffect, useMemo } from 'react'

import { throttle } from '@/utils/index';
import './index.less'

/* echarts */
import * as echarts from 'echarts/core';
import {
  GridComponent,
  GridComponentOption
} from 'echarts/components';
import {
  LineChart,
  LineSeriesOption
} from 'echarts/charts';
import {
  UniversalTransition
} from 'echarts/features';
import {
  CanvasRenderer
} from 'echarts/renderers';

echarts.use(
  [GridComponent, LineChart, CanvasRenderer, UniversalTransition]
);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | LineSeriesOption
>


const Echarts: FC = () => {
  const [xData, setXData] = useState(["A", "B"])
  const [seData, setSeData] = useState([12, 21])
  const [Charts, setC] = useState<echarts.ECharts>()
  const [Con, setCon] = useState<HTMLDivElement>()

  const option: EChartsOption = useMemo(() => {
    return {
      xAxis: {
        type: 'category',
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: seData,
          type: 'line'
        }
      ]
    }
  }, [xData, seData])

  useEffect(() => {
    if (!Con) {
      setCon(document.querySelector('.eachrts') as HTMLDivElement)
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
    <div className='echarts_con'>
      <div className="eachrts" style={{
        width: '100%',
        height: '80vh'
      }} ></div>
    </div >)
}

export default Echarts