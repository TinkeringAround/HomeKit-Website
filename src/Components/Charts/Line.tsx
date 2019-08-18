import React, { FC, useState, useEffect } from 'react'
import { ResponsiveLine } from '@nivo/line'
import firebase from 'firebase'
import { Box, ResponsiveContext, Heading } from 'grommet'

// Types
import { TMeasurement, TChartData, TDataStream, TLine } from '../../Types'

// Utility
import {
  timestampToTime,
  valueCountToSteps,
  typeToScale,
  parseMeasurement,
  typeToColor,
  typeToLegend
} from '../../Utility'

//--------------------------------------------------------------
export interface Props {
  id: string | null
}

const LineChart: FC<Props> = ({ id }) => {
  const [data, setData] = useState<TDataStream | null>(null)

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
            lines: []
          }

          // Parse Data
          const keys = Object.keys(measurements)
          keys.forEach((key: string) => {
            const data: Array<TChartData> = []
            measurements[key].forEach((measurement: TMeasurement) => {
              data.push({
                x: timestampToTime(measurement.timestamp),
                y: parseMeasurement(key, measurement.value)
              })
            })

            const line: TLine = {
              id: typeToLegend(key),
              color: typeToColor(key),
              scale: typeToScale(key),
              data: data
            }
            newData.lines.push(line)
          })

          // Adjust Steps
          const elements: Array<TMeasurement> = measurements[keys[0]]
          newData = {
            ...newData,
            steps: valueCountToSteps(elements.length)
          }

          console.log('Lines: ', newData)
          setData(newData)
        })
    }
  })

  return (
    <ResponsiveContext.Consumer>
      {(size: string) => {
        const isMobile = size.includes('small')

        return (
          <>
            {data !== null ? (
              data.lines.map((line: TLine, index: number) => {
                const height = 100 / data.lines.length
                const headingMargin = isMobile ? '20px 0px -20px 20px' : '30px 0px -40px 40px'
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
                        format: '%H.%M',
                        precision: 'minute'
                      }}
                      xFormat="time:%H.%M"
                      yScale={{
                        type: 'linear',
                        stacked: false,
                        min: line.scale.min,
                        max: line.scale.max
                      }}
                      axisBottom={{
                        format: '%H:%M',
                        tickValues: data.steps,
                        tickSize: 2
                      }}
                      axisLeft={{
                        orient: 'left',
                        legend: '',
                        tickSize: 2,
                        tickPadding: 5,
                        tickValues: 3
                      }}
                      lineWidth={3}
                      colors={{ scheme: line.color, size: 9 }}
                      pointSize={5}
                      pointColor={{ theme: 'background' }}
                      pointBorderWidth={2}
                      pointBorderColor={{ from: 'serieColor' }}
                      useMesh={true}
                    />
                  </Box>
                )
              })
            ) : (
              <></>
            )}
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default LineChart
