import React from 'react'
import { Box } from 'grommet'

//--------------------------------------------
interface Props {
  isSensor: boolean
  active?: boolean
}

const Sensor: React.FC<Props> = ({ isSensor = true, active }) => {
  const style = {
    display: 'inline-block',
    height: '0px',
    width: '40%',
    paddingTop: '40%',
    margin: '10px 20px 10px 0px',
    borderRadius: '25px'
  }

  return (
    <>
      {isSensor ? (
        <Box background={active ? 'active' : 'inactive'} style={style} className="Hover" />
      ) : (
        <Box background="inactive" style={style} className="Hover" />
      )}
    </>
  )
}

export default Sensor
