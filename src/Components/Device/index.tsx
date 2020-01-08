import React, { FC, useState, useEffect, useCallback, useContext } from 'react'
import { Box } from 'grommet'
import firebase from 'firebase'
import { CircleSpinner } from 'react-spinners-kit'
import styled from 'styled-components'

// Styles
import { colors } from '../../Styles'

// Types
import { TVariable, TDevice } from '../../Types'

// Context
import { DatabaseContext } from '../../Contexts'

// Atoms
import IconBox from '../../Atoms/iconBox'

// Partials
import Battery from './battery'
import Content from './content'

// Utility
import { deviceIsActive, deviceHasLowBattery } from '../../Utility'

// ===============================================
const SDevice = styled(Box)`
  position: relative;
  width: 40%;
  height: 0px;

  margin: 0px 1rem 1rem 0px;
  padding-bottom: 40%;

  border: none;
  box-shadow: none;
  outline: 0;

  cursor: pointer;
`

const SDeviceContent = styled(Box)<{ color: string }>`
  position: absolute;
  width: 100%;
  height: 100%;

  background: ${colors['white']};
  border-radius: 20px;
  border: 0.5rem solid ${({ color }) => color};
`

// ===============================================
interface Props {
  device: TDevice | undefined
  onClick?: any
}

// ===============================================
const Device: FC<Props> = ({ device, onClick = null }) => {
  const { selectDevice } = useContext(DatabaseContext)
  const [deviceData, setDeviceData] = useState<TDevice | undefined>(device)

  // ===============================================
  const showDetails = useCallback(() => {
    if (deviceData !== undefined) selectDevice(deviceData)
  }, [deviceData, selectDevice])

  useEffect(() => {
    if (device && deviceData === undefined) {
      firebase
        .database()
        .ref('/devices/' + device.id)
        .once('value')
        .then(snapshot => {
          if (snapshot.hasChildren()) {
            const tmpDatabase = snapshot.val()
            var values: Array<TVariable> = []
            Object.keys(tmpDatabase.values).forEach((key: string) => {
              // @ts-ignore
              values = [
                ...values,
                {
                  // @ts-ignore
                  variable: key,
                  value: tmpDatabase.values[key]
                }
              ]
            })

            const newDeviceData: TDevice = {
              id: snapshot.key ? snapshot.key : '',
              name: tmpDatabase.name,
              type: tmpDatabase.type,
              lastUpdated: tmpDatabase.lastUpdated,
              battery: tmpDatabase.battery,
              values: values
            }
            setDeviceData(newDeviceData)
          }
        })
    }
  }, [device, deviceData, setDeviceData])

  const active =
    deviceData === undefined ? false : deviceIsActive(deviceData.type, deviceData.lastUpdated)
  const color = active ? colors['yellow'] : colors['light']
  const spinnerColor = active ? colors['lightYellow'] : colors['medium']

  // ===============================================
  return (
    <SDevice>
      <SDeviceContent
        color={color}
        align="center"
        justify="center"
        onClick={onClick ? onClick : showDetails}
        focusIndicator={false}
      >
        {/* Battery Symbol */}
        {deviceData !== undefined && deviceHasLowBattery(deviceData.battery) && (
          <Battery active={active} />
        )}

        {/* Loading */}
        {device !== undefined && deviceData === undefined && (
          <Box width="100%" height="100%" justify="center" align="center">
            <CircleSpinner color={spinnerColor} />
          </Box>
        )}

        {/* Content */}
        {device !== undefined && deviceData ? (
          <Content active={active} device={deviceData} />
        ) : (
          <IconBox active={false} />
        )}
      </SDeviceContent>
    </SDevice>
  )
}

export default Device
