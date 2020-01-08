import React, { FC, useState, useEffect } from 'react'
import { Box, Heading, ResponsiveContext, Text } from 'grommet'
import { CircleSpinner } from 'react-spinners-kit'

// Types
import { TDevice } from '../../Types'

// Styles
import { colors } from '../../Styles'

// Atoms
import IconBox from '../../Atoms/iconBox'

// Partials
import Sensor from './sensor'

// Utility
import {
  deviceIsActive,
  deviceTypeToName,
  isToday,
  deviceLastActiveTime,
  deviceLastActiveDate
} from '../../Utility'

// ===============================================
interface Props {
  device: TDevice
}

// ===============================================
const Charts: FC<Props> = ({ device }) => {
  const [loading, setLoading] = useState(true)

  // ===============================================
  useEffect(() => {
    if (device && loading) setTimeout(() => setLoading(false), 1500)
  }, [device, loading])

  // ===============================================
  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')
        const active = deviceIsActive(
          device !== undefined ? device.type : '',
          device !== undefined ? device.lastUpdated : ''
        )
        const color = active ? colors['yellow'] : colors['medium']

        return (
          <Box width="100%" height="100%">
            <Box
              width="100%"
              direction="row"
              align="center"
              pad="1rem"
              background={active ? 'yellow' : 'medium'}
              round="10px"
              justify="between"
              style={{ cursor: 'default' }}
            >
              <Box direction="row" align="center">
                <IconBox
                  type={device.type}
                  active={active}
                  size="3rem"
                  margin="0 1rem 0 0"
                  tooltip={deviceTypeToName(device.type)}
                />
                <Heading level="2" margin="0px" size="2em" color="white">
                  {device.name}
                </Heading>
              </Box>
              {!isMobile && (
                <Box>
                  <Text size="1rem" color="white" textAlign="end">
                    <strong>Letzte Aktivität</strong>
                    <br />
                    {isToday(device.lastUpdated) &&
                      'heute, ' + deviceLastActiveTime(device.lastUpdated)}
                    {!isToday(device.lastUpdated) &&
                      deviceLastActiveDate(device.lastUpdated) +
                        ', ' +
                        deviceLastActiveTime(device.lastUpdated)}
                  </Text>
                </Box>
              )}
            </Box>
            <Box
              width="100%"
              height="calc(100% - 5rem)"
              justify="center"
              align={loading ? 'center' : 'start'}
            >
              {/* Loading */}
              {loading && <CircleSpinner size={75} color={color} />}

              {/* Content */}
              {!loading && device.type === 'sensor' && (
                <Sensor id={device.id} isMobile={isMobile} />
              )}
            </Box>
          </Box>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Charts
