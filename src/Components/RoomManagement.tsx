import React, { FC } from 'react'
import { Box, TextInput, Text } from 'grommet'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

// Theme
import { theme } from '../theme'

// Types
import { TRoom } from '../Types/'

// Custom Components
const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  font-size: 2vw;
  border: none;
  border-radius: 10px;
  width: 100%;
  height: 50px;
  padding: 0px;
  color: ${theme.global.colors.headingInactive};
  background-color: ${theme.global.colors.background};

  ::placeholder {
    color: ${theme.global.colors.iconWrapperInactive};
  }

  :focus {
    outline: none;
  }
`

const Column = styled.div`
  width: 100%;
  height: auto;
  overflow-y: auto;
`

const Container = styled.div`
  height: 60px;
  margin: 20px 0px;
  padding: 10px 30px;
  border-radius: 10px;
  background-color: ${theme.global.colors.deviceInactive};

  display: flex;
  justify-content: space-between;
  align-items: center;
`

//----------------------------------------------
interface Props {
  updateRooms: any
  rooms: Array<TRoom>
}

const RoomManagement: FC<Props> = ({ updateRooms, rooms }) => {
  const onDragEnd = (result: DropResult) => {
    console.log('Drag Ended: ', result)
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
