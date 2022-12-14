import { FC, useState, useEffect, useMemo } from 'react'

import { throttle } from '@/utils/index';
// import './index.less'

/* echarts */
import * as echarts from 'echarts/core';
import {
  GridComponent,
  GridComponentOption,
  LegendComponent,
  TooltipComponent
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
  [GridComponent, TooltipComponent, LegendComponent, LineChart, CanvasRenderer, UniversalTransition]
);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | LineSeriesOption
>


const Echarts: FC = () => {
  const [xData, setXData] = useState(["2020.1", "2020.2", "2020.3", "2020.4"])
  const [Charts, setC] = useState<echarts.ECharts>()
  const [Con, setCon] = useState<HTMLDivElement>()

  const option: EChartsOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: '0',
        right: '0',
        data: ['双喜', '中华', '软中华']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '双喜',
          data: [100, 200, 300, 100],
          type: 'line'
        }, {
          name: '中华',
          data: [200, 100, 30, 200],
          type: 'line'
        }, {
          name: '软中华',
          data: [120, 20, 100, 50],
          type: 'line'
        }
      ]
    }
  }, [xData])

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