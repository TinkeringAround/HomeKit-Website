import React, { FC } from 'react'
import { Heading, ResponsiveContext } from 'grommet'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

// Types
import { TDevice } from '../Types'

// Custom Components
import { Column, Container, NameInput } from '../Atoms/StyledComponents'

//----------------------------------------------
interface Props {
  devices: Array<TDevice>
  updateDeviceName: any
  deleteDevice: any
  reorderDevices: any
}

const DeviceManagement: FC<Props> = ({
  devices,
  updateDeviceName,
  deleteDevice,
  reorderDevices
}) => {
  const onDragEnd = (result: DropResult) => {
    if (devices.length === 0) deleteDevice(result.source.index)
    else {
      if (!result.destination) {
        deleteDevice(result.source.index)
      } else {
        if (result.destination.index !== result.source.index)
          reorderDevices(result.source.index, result.destination.index)
      }
    }
  }

  const onDeviceNameChanged = (event: any) => {
    const oldName = event.target.placeholder
    const newName = event.target.value
    if (event.key === 'Enter' && newName !== '') {
      event.target.placeholder = newName
      event.target.value = ''
      updateDeviceName(oldName, newName)
    }
  }

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMobile = size.includes('small')
        return (
          <>
            <Heading level="3" size="2em" color="headingInactive" margin="50px 0px 10px 0px">
              Geräte und Sensoren
            </Heading>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="Column">
                {provided => (
                  <Column {...provided.droppableProps} ref={provided.innerRef}>
                    {devices.map((device: TDevice, index: number) => (
                      <Draggable
                        key={'DraggableDevice-' + index}
                        draggableId={device.name}
                        index={index}
                      >
                        {provided => (
                          <Container
                            margin="20px 0px 0px 0px"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <NameInput
                              fontSize={isMobile ? '1em' : '1.5em'}
                              placeholder={device.name}
                              onKeyPress={onDeviceNameChanged}
                            />
                          </Container>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Column>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default DeviceManagement
