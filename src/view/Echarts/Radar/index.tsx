import { FC, useState, useEffect, useMemo } from 'react'

import { throttle } from '@/utils/index';

/* echarts */
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import {
  RadarChart,
  RadarSeriesOption
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';

echarts.use(
  [TitleComponent, LegendComponent, RadarChart, CanvasRenderer]
);

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | LegendComponentOption | RadarSeriesOption
>


const Echarts: FC = () => {
  const [Charts, setC] = useState<echarts.ECharts>()
  const [Con, setCon] = useState<HTMLDivElement>()

  const option: EChartsOption = useMemo(() => {
    return {
      title: {
        text: 'Basic Radar Chart'
      },
      legend: {
        bottom: '0',
        orient: 'vertical',
        data: ['月均消费次数', '消费水平']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'A', },
          { name: 'B', },
          { name: 'C', },
          { name: 'D', },
          { name: 'E', }
        ]
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 15000, 40000, 18000],
              name: '月均消费次数'
            }
          ]
        },
        {
          type: 'radar',
          data: [
            {
              value: [4000, 2000, 25000, 22000, 11000],
              name: '消费水平'
            }
          ]
        }
      ]
    };
  }, [])

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