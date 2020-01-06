import React, { FC, useContext } from 'react'
import { ResponsiveContext, Text } from 'grommet'

// Types
import { TDevice } from '../../Types'

// Context
import { DatabaseContext } from '../../Contexts'

// Atoms
import IconButton from '../../Atoms/iconButton'

// Components
import { SColumn, SRow, SNameInput } from '../../Atoms/styled'

// Utilities
import { deviceLastActiveTime, isToday, deviceLastActiveDate } from '../../Utility'

// ===============================================
const DeviceManagement: FC = () => {
  const { devices, renameDevice, deleteDevice } = useContext(DatabaseContext)

  const onRenameDevice = (event: any) => {
    const oldName = event.target.placeholder
    const newName = event.target.value

    if (event.key === 'Enter' && newName !== '') {
      event.target.placeholder = newName
      event.target.value = ''
      renameDevice(oldName, newName)
    }
  }

  // ===============================================
  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')

        return (
          <SColumn margin="1.5rem 0 0">
            {devices.map((device: TDevice, index: number) => (
              <SRow key={'DeviceManagement-' + index} margin="0 0 1rem">
                <SNameInput
                  type="text"
                  fontSize={isMobile ? '0.9em' : '1.2em'}
                  placeholder={device.name}
                  onKeyPress={onRenameDevice}
                />
                <Text
                  size={isMobile ? '0.5em' : '0.65em'}
                  color="medium"
                  textAlign="end"
                  style={{ width: '40%' }}
                >
                  {'Letzte Aktivität'}
                  <br />
                  {isToday(device.lastUpdated) &&
                    'heute, ' + deviceLastActiveTime(device.lastUpdated)}
                  {!isToday(device.lastUpdated) &&
                    deviceLastActiveDate(device.lastUpdated) +
                      ', ' +
                      deviceLastActiveTime(device.lastUpdated)}
                </Text>
                <IconButton iconType="minus" onClick={() => deleteDevice(index)} />
              </SRow>
            ))}
          </SColumn>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default DeviceManagement
