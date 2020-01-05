import React, { FC, Fragment, useState, useEffect } from 'react'
import { Box, Heading, ResponsiveContext } from 'grommet'
import { CircleSpinner } from 'react-spinners-kit'

// Types
import { TDevice } from '../../Types'

// Styles
import { theme } from '../../Styles'

// Partials
import Sensor from './sensor'

// Utility
import { deviceIsActive } from '../../Utility'

// ===============================================
interface Props {
  device: TDevice
}

// ===============================================
const Chart: FC<Props> = ({ device }) => {
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
        const color = active
          ? theme.global.colors['darkYellow']
          : theme.global.colors['lightElement']

        return (
          <Fragment>
            <Heading level="2" margin="0px" size="2em" color="headingInactive">
              {device.name}
            </Heading>
            <Box width="100%" height="90%" justify="center" align={loading ? 'center' : 'start'}>
              {/* Loading */}
              {loading && <CircleSpinner size={75} color={color} />}

              {/* Content */}
              {!loading && device.type === 'sensor' && (
                <Sensor id={device.id} isMobile={isMobile} />
              )}
            </Box>
          </Fragment>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Chart
