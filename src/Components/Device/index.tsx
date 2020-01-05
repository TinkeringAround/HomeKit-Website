import React, { FC, useState, useEffect, Fragment, useCallback } from 'react'
import { Box } from 'grommet'
import firebase from 'firebase'
import { CircleSpinner } from 'react-spinners-kit'
import styled from 'styled-components'

// Theme
import { theme } from '../../Styles'

// Types
import { TVariable, TDevice } from '../../Types'

// Atoms
import Icon from '../../Atoms/icon'

// Components
import Overlay from '../Dialog/overlay'
import Charts from '../Charts'

// Partials
import Battery from './battery'
import Content from './content'

// Utility
import { deviceIsActive, deviceHasLowBattery } from '../../Utility'

// ===============================================
const SDevice = styled(Box)<{ color: string }>`
  position: relative;
  width: 40%;
  height: 0px;

  margin: 0px 15px 15px 0px;
  padding-bottom: 40%;

  background: ${({ color }) => color};
  border: none;
  border-radius: 15px;
  box-shadow: none;

  outline: 0;

  transition: 0.2s all;
  cursor: pointer;

  :hover {
    box-shadow: 0px 0px 5px 1px ${theme.global.colors.hoverBlack};
  }
`

const SDeviceContent = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
`

// ===============================================
interface Props {
  device: TDevice | undefined
  onClick?: any
}

// ===============================================
const Device: FC<Props> = ({ device, onClick = null }) => {
  const [show, setShow] = useState<boolean>(false)
  const [deviceData, setDeviceData] = useState<TDevice | undefined>(device)

  // ===============================================
  const showDetails = useCallback(() => setShow(true), [setShow])

  // ===============================================
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
            Object.keys(tmpDatabase.values).forEach(key => {
              values = [
                ...values,
                {
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

  const type = deviceData !== undefined ? deviceData.type : null
  const active = deviceIsActive(
    deviceData !== undefined ? deviceData.type : '',
    deviceData !== undefined ? deviceData.lastUpdated : ''
  )
  const color = active ? theme.global.colors['yellow'] : theme.global.colors['lightElement']
  const spinnerColor = active
    ? theme.global.colors['darkYellow']
    : theme.global.colors['darkElement']

  // ===============================================
  return (
    <SDevice color={color}>
      <SDeviceContent
        align="center"
        justify={device ? 'start' : 'center'}
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
        <Fragment>
          <Box
            width="30%"
            height="30%"
            justify="center"
            align="center"
            background={active ? 'iconWrapperActive' : 'iconWrapperInactive'}
            style={{ borderRadius: 10, marginTop: device ? '20%' : '0' }}
          >
            <Icon type={type} active={active} size={type ? '80%' : '40%'} />
          </Box>
          {device !== undefined && deviceData && <Content active={active} device={deviceData} />}
        </Fragment>
      </SDeviceContent>

      {/* Dialog */}
      <Overlay open={device !== undefined && show} closeDialog={() => setShow(false)} stagger>
        {deviceData && <Charts device={deviceData} />}
      </Overlay>
    </SDevice>
  )
}

export default Device
