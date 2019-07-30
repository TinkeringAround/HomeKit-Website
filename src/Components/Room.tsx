import React from 'react'
import { Box, Heading } from 'grommet'

//-------------------------------------------
interface Props {
  name?: string
}

const Room: React.FC<Props> = ({ name }) => {
  return (
    <Box width="400px" height="100%" margin="0px 0px 0px 30px" style={{ flex: '0 0 auto' }}>
      <Heading level="2" responsive size="medium" truncate color="heading">
        {name}
      </Heading>
      <Box flex="grow" background="yellow" />
    </Box>
  )
}

export default Room
