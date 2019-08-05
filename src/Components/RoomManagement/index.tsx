import React, { FC } from 'react'
import { Text } from 'grommet'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

// Types
import { TRoom } from '../../Types'

// Custom Components
import { Input, Column, Container } from './components'

//----------------------------------------------
interface Props {
  updateRooms: any
  rooms: Array<TRoom>
}

const RoomManagement: FC<Props> = ({ updateRooms, rooms }) => {
  const onDragEnd = (result: DropResult) => {
    console.log('Drag Ended: ', result)
    // TODO: Handle Drag n Drop
  }

  return (
    <>
      <Input type="text" placeholder="Raum hinzufügen..." onKeyPress={updateRooms} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="Column">
          {provided => (
            <Column {...provided.droppableProps} ref={provided.innerRef}>
              {rooms.map((room: TRoom, index: number) => (
                <Draggable draggableId={room.name} index={index}>
                  {provided => (
                    <Container
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Text size="large" weight="bold" color="iconInactive">
                        {room.name}
                      </Text>
                      <Text size="small" color="iconInactive">
                        {room.devices.length + ' Devices angeschlossen'}
                      </Text>
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
}

export default RoomManagement
