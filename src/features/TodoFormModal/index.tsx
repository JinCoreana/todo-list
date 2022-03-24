import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import Modal from '../../components/Modal';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { selectedDateState, todoListState } from '../TodoList/atom';
import { todoFormModalOpenState } from './atom';
import { v4 as uuid4 } from 'uuid';
import { getSimpleDateFormat } from '../../components/utils';

const ModalBody = styled.div`
width: 100vw;
max-width: 386px;
padding: 8px;`;
const Date = styled.small`
display: block;
color: #C9C8CC;
`;
const InputTodo = styled.input`
padding: 16px 24px;
border:none;
width: 100%;
box-sizing: border-box;
background-color: transparent;
color: #C9C8CC;
caret-color:#eb0014;`;


const Card = styled.div`
width: 100vw;
max-width: 370px;
border-radius: 16px;
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
padding:24px;
box-sizing: border-box;
background-color:#19181a;
${Date} + ${InputTodo} {
    margin-top: 24px;;
}`;


const TodoFormModal: React.FC = () => {
    const [todo, setTodo] = useState<string>('');
    const selectedDate = useRecoilValue(selectedDateState)
    const todoList = useRecoilValue(todoListState);

    const [isOpen, setIsOpen] = useRecoilState(todoFormModalOpenState)
    const handleClose = () => setIsOpen(false)

    const addTodo = useRecoilCallback(({ snapshot, set }) => () => {
        const todoList = snapshot.getLoadable(todoListState).getValue()
        const newTodo = { id: uuid4(), content: 'todo', done: false, date: selectedDate }
        set(todoListState, [...todoList, newTodo])
    }, [todo, selectedDate, todoList])

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        addTodo()
        setTodo('')
        handleClose()
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value)
    }
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalBody>
                <Card>
                    <Date>{getSimpleDateFormat(selectedDate)} </Date>
                    <InputTodo placeholder="Add new event" onKeyPress={handleKeyPress} value={todo} onChange={handleChange} />
                </Card>
            </ModalBody>
        </Modal>
    )
}

export default TodoFormModal;