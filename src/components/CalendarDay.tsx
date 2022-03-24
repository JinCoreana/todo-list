import styled from '@emotion/styled';
import React from 'reacti'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todoFormModalOpenState } from '../features/TodoFormModal/atom';
import { selectedDateState } from '../features/TodoList/atom';
import { isSameDay } from './utils'

interface Props {
    date: Date
}


const TableData = styled.td`
  column-count: 7;
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
const CalendarDay: React.FC<Props> = (date: Date) => {
    const today = new Date()
    const selectedDate = useRecoilValue(selectedDateState)
    const setTodoFormModalProps = useSetRecoilState(todoFormModalOpenState)

    const handleTodoFormModalOpen = (d: number) => setSelectedData(new Date(selectedDate.setDate(d)))
    const
    return (
        <TableData key={d} onClick={() => selectedDate(thisDay)}>
            )
}

            export default CalendarDay;