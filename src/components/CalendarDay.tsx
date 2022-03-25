import styled from '@emotion/styled';
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todoFormModalOpenState } from '../features/TodoFormModal/atom';
import TodoList from '../features/TodoList';
import { filteredTodoListState, selectedDateState } from '../features/TodoList/atom';
import { todoStatisticsModalOpenState } from '../features/TodoStatisticsModal/atom';
import { isSameDay } from './utils'

interface Props {
    date: Date
}


const Container = styled.div``;

const TableData = styled.td`

  border: 0.2px solid #5e5e5e;
  text-align: center;
  color: #C9C8CC;
  padding: 8px;
  position: relative;
  

`;

const DisplayDate = styled.div<{ isToday?: boolean; isSelected?: boolean; }>`
  color: ${({ isToday }) => isToday && '#F8F7FA'};
  background-color: ${({ isToday, isSelected }) => isSelected ? '#0055a5' : isToday ? '#313133' : ''};
  display: flex;
  justify-content: center;
  border-radius: 50%;
  align-self: center;
  align-items: center;
  position: absolute;
  top: 1px;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
const CalendarDay: React.FC<Props> = ({ date }) => {
    const today = new Date()
    const selectedDate = useRecoilValue(selectedDateState)
    const todoList = useRecoilValue(filteredTodoListState(date))
    const setSelectedDate = useSetRecoilState(selectedDateState)
    const setTodoFormModalOpen = useSetRecoilState(todoFormModalOpenState)
    const setTodoStatisticsModalOpen = useSetRecoilState(todoStatisticsModalOpenState)

    const handleTodoFormModalOpen = (d: number) => {
        setSelectedDate(new Date(selectedDate.setDate(d)))
        setTodoFormModalOpen(true)
    }

    const handleDateSelect = (d: number) => {
        setSelectedDate(new Date(selectedDate.setDate(d)))
    }
    const handleTodoStatisticModalOpen = (event: React.SyntheticEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setTodoStatisticsModalOpen(true)
    }
    return (
        <TableData key={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
            align="center" onDoubleClick={() => handleTodoFormModalOpen(date.getDate())}>
            <Container>
                <DisplayDate
                    isSelected={isSameDay(selectedDate, date)}
                    isToday={isSameDay(today, date)}
                    onClick={() => handleDateSelect(date.getDate())}
                    onDoubleClick={handleTodoStatisticModalOpen}>
                    {date.getDate()}
                </DisplayDate>
                <TodoList items={todoList} />
            </Container>
        </TableData>
    )
}

export default CalendarDay;