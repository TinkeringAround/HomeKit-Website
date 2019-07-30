import React from 'react'
import { Box, Text } from 'grommet'
import { Sensor } from './icons'

//--------------------------------------------
type DataProps = {
  name: string
  values: Array<object>
  // Ergänzen
}

interface Props {
  isSensor: boolean
  data?: DataProps
}

const IoT: React.FC<Props> = ({ isSensor = true, data }) => {
  const style = {
    margin: '0px 10px 10px 0px',
    borderRadius: '25px',
    paddingBottom: '40%'
  }

  const active = data && data.values.length > 0

  return (
    <>
      {isSensor && data ? (
        <Box
          background={active ? 'iotActive' : 'iotInactive'}
          style={style}
          className="hover square"
          width="40%"
          height="0px"
        >
          <Box className="square-content" justify="center" align="center">
            <Box
              width="30%"
              height="30%"
              justify="center"
              align="center"
              background={active ? 'iconWrapperActive' : 'iconWrapperInactive'}
              style={{ borderRadius: 10 }}
            >
              <Sensor color={'red'} />
            </Box>
            <Text size="medium" color="paragraph">
              {data && data.name}
            </Text>
          </Box>
        </Box>
      ) : (
        <Box background="inactive" style={style} className="hover square" width="40%" height="0px">
          <Box className="square-content" justify="center" align="center" />
        </Box>
      )}
    </>
  )
}

export default IoT
