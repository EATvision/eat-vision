import React, { forwardRef } from 'react'
import update from 'immutability-helper'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import {
  List,
  styled,
  IconButton,
  ListItem as MuiListItem,
} from '@mui/material'
import { Close } from '@mui/icons-material'

const ListItem = styled(MuiListItem)(({ theme }) => ({
  border: '1px solid',
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(0.5),
  borderColor: theme.palette.divider,
}))

// eslint-disable-next-line react/display-name
const CategoryItem = forwardRef(({ category, onClickRemove, ...rest }, ref) => {
  if (!category) return null

  return (
    <ListItem
      {...rest}
      ref={ref}
      secondaryAction={
        <IconButton
          size="small"
          edge="end"
          aria-label="delete"
          onClick={onClickRemove}
        >
          <Close />
        </IconButton>
      }
    >
      {category.name}
    </ListItem>
  )
})

const CategoriesList = ({ categories = [], onChange }) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const reorderdItems = update(categories, {
      $splice: [
        [result.source.index, 1],
        [result.destination.index, 0, categories[result.source.index]],
      ],
    })

    onChange(reorderdItems)
  }

  const handleClickRemove = (index) => () => {
    const updatedItems = update(categories, {
      $splice: [[index, 1]],
    })

    onChange(updatedItems)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            {categories.map((category, index) => (
              <Draggable
                key={category.id}
                draggableId={category.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <CategoryItem
                    category={category}
                    onClickRemove={handleClickRemove(index)}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default CategoriesList
