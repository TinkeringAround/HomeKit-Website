import React, { FC, useState, useEffect } from 'react'
import { Box, Text, Heading, ResponsiveContext } from 'grommet'
import firebase from 'firebase'
import { CircleSpinner } from 'react-spinners-kit'
import ClickNHold from 'react-click-n-hold'
import Line from './Charts/Line'

// Theme
import { theme } from '../theme'

// Types
import { TVariable, TDevice } from '../Types'

// Atoms
import { Icon } from '../Atoms/Icons'

// Custom Components
import Variable from './Variable'
import Overlay from './Overlay'

// Utility
import { deviceIsActive, hexToRGBA } from '../Utility'

//--------------------------------------------
interface Props {
  id: string | null
  data: TDevice | undefined
  onClick?: any
}

const Device: FC<Props> = ({ id, data, onClick = null }) => {
  const [hover, setHover] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [showCharts, setShowCharts] = useState<boolean>(false)
  const [deviceData, setDeviceData] = useState<TDevice | undefined>(data)

  // Life Cycle
  useEffect(() => {
    if (id && deviceData === undefined) {
      firebase
        .database()
        .ref('/devices/' + id)
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
  }, [deviceData])

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShowCharts(true)
      }, 1500)
    } else setShowCharts(false)
  }, [show])

  //#region Content Component
  const type = id && deviceData !== undefined ? deviceData.type : null
  const active = deviceIsActive(
    deviceData !== undefined ? deviceData.type : '',
    deviceData !== undefined ? deviceData.lastUpdated : ''
  )
  const spinnerColor =
    id && active ? theme.global.colors.iconActive : theme.global.colors.iconInactive
  const color = id && active ? theme.global.colors.deviceActive : theme.global.colors.deviceInactive

  const Content: FC = () => {
    return deviceData !== undefined ? (
      <Box width="100%" height="35%" align="center" margin="5% 0 0 0">
        <Box width="90%">
          <Text
            size="medium"
            truncate
            textAlign="center"
            color={active ? 'headingActive' : 'headingInactive'}
          >
            {deviceData.name}
          </Text>
        </Box>
        <Box direction="row" justify="evenly" height="50%" width="90%">
          {deviceData.values.map((variable: TVariable, index: number) => (
            <Variable
              key={'Device-' + id + '-Variable-' + index}
              type={variable.variable}
              value={variable.value}
              active={active}
              count={deviceData.values.length}
              index={index}
            />
          ))}
        </Box>
      </Box>
    ) : (
      <></>
    )
  }

  const Chart: FC = () => (
    <ResponsiveContext.Consumer>
      {(size: string) => {
        const isMobile = size.includes('small')
        return (
          <>
            {deviceData !== undefined && (
              <>
                <Heading level="2" margin="0px" size="3em" color="headingInactive">
                  {deviceData.name}
                </Heading>
                <Box width="100%" height={isMobile ? '90%' : '90%'} justify="center" align="start">
                  {show && !showCharts && (
                    <Box width="100%" height="100%" justify="center" align="center">
                      <CircleSpinner
                        size={isMobile ? 100 : 150}
                        color={theme.global.colors.darkYellow}
                      />
                    </Box>
                  )}
                  {show && showCharts && <Line id={id} isMobile={isMobile} />}
                </Box>
              </>
            )}
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )

  //#endregion

  // Handlers
  const reload = () => setDeviceData(undefined)
  const showDetails = () => setShow(true)

  //--------------------------------------------------------------
  return (
    <>
      <Box
        className="square clickable"
        background={id && active ? 'deviceActive' : 'deviceInactive'}
        style={{
          transition: '0.2s all',
          transform: hover ? 'scale(1.01)' : 'scale(1)',
          boxShadow: hover ? '0px 0px 5px 1px ' + hexToRGBA(color, '0.2') : 'none'
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={() => setHover(true)}
        onTouchEnd={() => setHover(false)}
        onClick={onClick ? onClick : reload}
      >
        <ClickNHold time={0.5} onClickNHold={showDetails}>
          <Box className="square-content" align="center" justify={id ? 'start' : 'center'}>
            {id !== null && deviceData === undefined ? (
              <Box width="100%" height="100%" justify="center" align="center">
                <CircleSpinner color={spinnerColor} />
              </Box>
            ) : (
              <>
                <Box
                  width="30%"
                  height="30%"
                  justify="center"
                  align="center"
                  background={id && active ? 'iconWrapperActive' : 'iconWrapperInactive'}
                  style={{ borderRadius: 10, marginTop: id ? '20%' : '0' }}
                >
                  <Icon
                    type={type}
                    active={active}
                    width={type ? '80%' : '40%'}
                    height={type ? '80%' : '40%'}
                  />
                </Box>
                {id && <Content />}
              </>
            )}
          </Box>
        </ClickNHold>
      </Box>
      <Overlay open={data !== undefined && show} closeDialog={() => setShow(false)}>
        {show && <Chart />}
      </Overlay>
    </>
  )
}

export default Device
