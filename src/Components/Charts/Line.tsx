import React, { FC, useState, useEffect } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { LegendProps } from '@nivo/legends'
import firebase from 'firebase'
import { ResponsiveContext } from 'grommet'

// Types
import { TMeasurement, TChartData, THistory } from '../../Types'

// Utility
import { timestampToTime, timestampsToArea, valueCountToSteps } from '../../Utility'

//--------------------------------------------------------------
export interface Props {
  id: string | null
}

const Line: FC<Props> = ({ id }) => {
  const [history, setHistory] = useState<THistory | null>(null)

  useEffect(() => {
    if (!history) {
      firebase
        .database()
        .ref('/history/' + id)
        .once('value')
        .then(snapshot => {
          const measurements = snapshot.val()
          let newHistory: THistory = {
            legend: '',
            steps: '',
            lines: []
          }

          // Parse Data
          const keys = Object.keys(measurements)
          keys.forEach((key: string) => {
            const data: Array<TChartData> = []
            measurements[key].forEach((measurement: TMeasurement) =>
              data.push({ x: timestampToTime(measurement.timestamp), y: measurement.value })
            )

            const line = {
              id: key, //Capitalize first letter
              color: 'hsl(351, 70%, 50%)',
              data: data
            }
            newHistory.lines.push(line)
          })

          // Adjust Legend
          const elements: Array<TMeasurement> = measurements[keys[0]]
          newHistory = {
            ...newHistory,
            legend: timestampsToArea(
              elements[0].timestamp,
              elements[elements.length - 1].timestamp
            ),
            steps: valueCountToSteps(elements.length)
          }

          console.log('Lines: ', newHistory)
          setHistory(newHistory)
        })
    }
  })

  return (
    <ResponsiveContext.Consumer>
      {(size: string) => {
        const isMobile = size.includes('small')
        const legendsProps: LegendProps[] = [
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 10,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 15,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]

        return (
          <>
            {history !== null && (
              <ResponsiveLine
                data={history.lines}
                curve="monotoneX"
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{
                  type: 'time',
                  format: '%H.%M',
                  precision: 'minute'
                }}
                xFormat="time:%H.%M"
                yScale={{ type: 'linear', stacked: false, min: 0, max: 'auto' }}
                axisBottom={{
                  format: '%H:%M',
                  tickValues: history.steps,
                  legend: history.legend,
                  legendPosition: 'middle',
                  legendOffset: 46
                }}
                axisLeft={{
                  orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'percent',
                  legendOffset: -40,
                  legendPosition: 'middle'
                }}
                colors={{ scheme: 'nivo' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                //legends={isMobile ? undefined : legendsProps}
              />
            )}
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Line
