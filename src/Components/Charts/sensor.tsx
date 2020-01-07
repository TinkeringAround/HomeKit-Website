import React, { FC, useState, useEffect, Fragment } from 'react'
import { ResponsiveLine } from '@nivo/line'
import firebase from 'firebase'
import { Box, Heading, Text, ResponsiveContext } from 'grommet'

// Types
import { TMeasurement, TChartData, TDataStream, TLine } from '../../Types'

// Styles
import { colors } from '../../Styles'

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
        stroke: colors['light']
      }
    },
    ticks: {
      line: {
        stroke: colors['light']
      },
      text: {
        fill: colors['medium']
      }
    }
  },
  grid: {
    line: {
      stroke: colors['light'],
      strokeWidth: 1
    }
  },
  tooltip: {
    basic: {
      color: colors['medium']
    }
  }
}

// ===============================================
interface Props {
  id: string | null
  isMobile: boolean
}

// ===============================================
const Sensor: FC<Props> = ({ id, isMobile }) => {
  const [data, setData] = useState<TDataStream | null>(null)
  const [error, setError] = useState<string | null>(null)

  // ===============================================
  useEffect(() => {
    if (!data) {
      firebase
        .database()
        .ref('/data/' + id)
        .once('value')
        .then(snapshot => {
          try {
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
          } catch (error) {
            setError('Keine Daten für dieses Gerät gefunden.')
            console.error('No Data for this Device found.', error)
          }
        })
    }
  })

  // ===============================================
  return (
    <Fragment>
      {/* Data */}
      {data !== null &&
        data.lines.map((line: TLine, index: number) => {
          const height = 100 / data.lines.length
          const headingMargin = isMobile ? '1rem 0px -1rem 2rem' : '2rem 0px -2.5rem 3rem'
          const margin = isMobile ? 30 : 50

          return (
            <Box
              key={'Device-' + id + '-Line-' + line.id + '-Index-' + index}
              width="100%"
              height={height.toString() + '%'}
            >
              <Heading level="3" margin={headingMargin} size="1em" color="medium">
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
        })}

      {/* Error */}
      {error && (
        <Box height="100%" pad="1.5rem .25rem" style={{ cursor: 'default' }}>
          <ResponsiveContext.Consumer>
            {size => (
              <Text size={size.includes('small') ? '1rem' : '1.5rem'} color="medium">
                {error}
              </Text>
            )}
          </ResponsiveContext.Consumer>
        </Box>
      )}
    </Fragment>
  )
}

export default Sensor
