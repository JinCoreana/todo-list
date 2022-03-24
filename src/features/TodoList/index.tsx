import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { selectedTodoState, Todo } from './atom'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todoStatisticsModalOpenState } from '../TodoStatisticsModal/atom';


const TodoItem = styled.li<{ done?: boolean; selected?: boolean }>`
max-width: 100px;
width: 100%;
overflow: hidden;
text-overflow: ellipsis;
background-color: ${({ done, selected }) => selected ? 'rgba(112, 71, 235, 1)' : done ? 'transparent' : 'rgba(112, 71, 245, 0)'};
padding: 2px 4px;
margin: 0;
border-radius: 8px;
font-size: 12px;
text-decoration: ${({ done }) => done && 'line-through'};
cursor: pointer;
`;
const EtcItem = styled.li`
padding: 2px 4px;
margin: 0;
font-size: 12px;
cursor: pointer;`;

const Base = styled.ul`
list-style:none;
margin: 36px 0 0 0;
padding: 0;
width: 100%;
height: 60px;
${TodoItem} + ${TodoItem} {
    margin-top: 1px;
};
${TodoItem} + ${EtcItem} {
    margin-top: 1px;
};`;

interface Props {
    items: Array<Todo>;
}
const TodoList: React.FC<Props> = ({ items }) => {

    const selectedTodo = useRecoilValue(selectedTodoState);
    const setSelectedTodo = useSetRecoilState(selectedTodoState);
    const setTodoStatisticsModalOpen = useSetRecoilState(todoStatisticsModalOpenState);

    const handleClick = (e: React.SyntheticEvent<HTMLLIElement>, todo: Todo) => {
        e.stopPropagation();
        setSelectedTodo(selectedTodo?.id === todo.id && selectedTodo.date === todo.date ? null : todo)
    }

    const handleTodoStatisticsModalOpen = (e: React.SyntheticEvent<HTMLLIElement>) => {
        e.stopPropagation();
        setTodoStatisticsModalOpen(true)
    }
    return (
        <Base>

            {items.slice(0, 3).map((item, idx) => (
                <TodoItem key={item.id} done={item.done} onClick={e => handleClick(e, item)}>
                    {item.content}
                    {item.done}
                    {item.date}
                </TodoItem>
            ))}

            {items.length > 3 && (
                <EtcItem onClick={handleTodoStatisticsModalOpen}>
                    {`See ${items.length - 3} more items`}
                </EtcItem>
            )}

        </Base>
    )
}

export default TodoList;