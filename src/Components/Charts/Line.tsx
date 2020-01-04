import React, { FC, useState, useEffect } from 'react'
import { ResponsiveLine } from '@nivo/line'
import firebase from 'firebase'
import { Box, Heading } from 'grommet'

// Types
import { TMeasurement, TChartData, TDataStream, TLine } from '../../Types'

// Theme
import { theme } from '../../Styles'

// Utility
import {
  timestampToTime,
  valueCountToSteps,
  typeToScale,
  typeToMeasurement,
  typeToColor,
  typeToLegend
} from '../../Utility'

// Consts
const MAX_MEASUREMENTS_MOBILE = 100
const MAX_MEASUREMENTS = 300
const chartTheme = {
  axis: {
    domain: {
      line: {
        stroke: theme.global.colors.headingInactive
      }
    },
    ticks: {
      line: {
        stroke: theme.global.colors.headingInactive
      },
      text: {
        fill: theme.global.colors.headingInactive
      }
    }
  },
  grid: {
    line: {
      stroke: theme.global.colors.iconWrapperInactive,
      strokeWidth: 1
    }
  },
  tooltip: {
    basic: {
      color: theme.global.colors.dark
    }
  }
}

// ===============================================
interface Props {
  id: string | null
  isMobile: boolean
}

// ===============================================
const LineChart: FC<Props> = ({ id, isMobile }) => {
  const [data, setData] = useState<TDataStream | null>(null)

  // ===============================================
  useEffect(() => {
    if (!data) {
      firebase
        .database()
        .ref('/data/' + id)
        .once('value')
        .then(snapshot => {
          const measurements = snapshot.val()

          let newData: TDataStream = {
            steps: '',
            lines: [],
            format: '',
            axisBottom: ''
          }

          // Parse Data
          const keys = Object.keys(measurements)
          keys.forEach((key: string) => {
            const data: Array<TChartData> = []
            const measurementsForKey: Array<TMeasurement> = measurements[key]

            if (isMobile && measurementsForKey.length > MAX_MEASUREMENTS_MOBILE) {
              measurementsForKey.splice(0, measurementsForKey.length - MAX_MEASUREMENTS_MOBILE)
            } else if (!isMobile && measurementsForKey.length > MAX_MEASUREMENTS)
              measurementsForKey.splice(0, measurementsForKey.length - MAX_MEASUREMENTS)

            measurementsForKey.forEach((measurement: TMeasurement) => {
              data.push({
                x: timestampToTime(measurement.timestamp),
                y: typeToMeasurement(key, measurement.value)
              })
            })

            newData.lines.push({
              id: typeToLegend(key),
              color: typeToColor(key),
              scale: typeToScale(key),
              data: data
            })
          })

          // Adjust Steps
          newData = {
            ...newData,
            steps: valueCountToSteps(measurements[keys[0]].length, isMobile),
            format: '%H.%M %d.%m.%Y',
            axisBottom: '%H.%M Uhr, %d.%m.%Y'
          }

          console.log('Count: ', measurements[keys[0]].length)
          console.log('Lines: ', newData)
          setData(newData)
        })
    }
  })

  // ===============================================
  return (
    <>
      {data !== null ? (
        data.lines.map((line: TLine, index: number) => {
          const height = 100 / data.lines.length
          const headingMargin = isMobile ? '20px 0px -20px 30px' : '30px 0px -40px 50px'
          const margin = isMobile ? 30 : 50

          return (
            <Box
              key={'Device-' + id + '-Line-' + line.id + '-Index-' + index}
              width="100%"
              height={height.toString() + '%'}
            >
              <Heading level="3" margin={headingMargin} size="1em" color="headingInactive">
                {line.id}
              </Heading>
              <ResponsiveLine
                data={[line]}
                curve="monotoneX"
                margin={{ top: margin, right: margin, bottom: margin, left: margin }}
                xScale={{
                  type: 'time',
                  format: data.format,
                  precision: 'minute'
                }}
                xFormat={'time:' + data.format}
                yScale={{
                  type: 'linear',
                  stacked: false,
                  min: line.scale.min,
                  max: line.scale.max
                }}
                axisBottom={{
                  format: data.axisBottom,
                  tickValues: data.steps,
                  tickSize: 2
                }}
                axisLeft={{
                  orient: 'left',
                  tickSize: 2,
                  tickPadding: 5,
                  tickValues: 3
                }}
                lineWidth={3}
                colors={{ scheme: line.color, size: 9 }}
                pointSize={1}
                useMesh={true}
                theme={chartTheme}
              />
            </Box>
          )
        })
      ) : (
        <></>
      )}
    </>
  )
}

export default LineChart
