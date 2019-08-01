import React, { FC, Fragment } from 'react'
import { Box, Text } from 'grommet'

// Atoms
import { Temperature, Humidity } from '../Atoms/icons'

//---------------------------------------------
interface Props {
  variable: string
  value: string
  active?: boolean
  count?: number
}

const Variable: React.FC<Props> = ({ variable, value, active = true, count = 1 }) => {
  const Icon: FC = () => {
    switch (variable) {
      case 'temperature':
        return <Temperature active={active} mini width={100.0 / count + '%'} height="60%" />
      case 'humidity':
        return <Humidity active={active} mini width={100.0 / count + '%'} height="60%" />
    }
    return <Fragment />
  }

  return (
    <>
      <Icon />
      <Text size="xsmall">{value}</Text>
    </>
  )
}

export default Variable

/*
    <Box width={100.0 / count + '%'} height="100%" direction="row" justify="center" align="center">
      <Icon />
      <Text size="xsmall">{value}</Text>
    </Box>
    */
