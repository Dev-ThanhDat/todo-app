import { useEffect, useRef, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';
import { MdDeleteSweep } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo, toggleTodo } from '../redux/TodoSlice';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditSave = () => {
    const value = editValue;
    if (value && value !== todo.title) {
      dispatch(editTodo({ id: todo.id, title: value }));
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditValue(todo.title);
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEditSave();
  };

  return (
    <li className='flex items-center justify-between gap-2 p-2 border-b'>
      <div className='flex items-center gap-2 flex-1'>
        <button
          onClick={handleToggle}
          className='text-blue-500 cursor-pointer focus:outline-none'
          aria-label={todo.completed ? 'Bỏ hoàn thành' : 'Đánh dấu hoàn thành'}
        >
          {todo.completed ? (
            <FaRegCheckSquare size={20} />
          ) : (
            <FaRegSquare size={20} />
          )}
        </button>
        {isEditing ? (
          <input
            ref={inputRef}
            className='flex-1 border outline-none rounded px-2 py-1'
            value={editValue}
            onChange={handleEditChange}
            onKeyDown={handleEditKeyDown}
            maxLength={100}
          />
        ) : (
          <>
            <span
              className={`flex-1 truncate ${
                todo.completed ? 'line-through text-gray-500' : ''
              }`}
              title={todo.title}
            >
              {todo.title}
            </span>
            <span className='text-xs text-gray-400 ml-2'>
              {new Date(todo.createdAt).toLocaleString('vi-VN')}
            </span>
          </>
        )}
      </div>
      <div className='flex items-center flex-col md:flex-row gap-2'>
        {isEditing ? (
          <>
            <button
              className='text-green-600 cursor-pointer px-2 py-1 rounded hover:bg-green-100'
              onClick={handleEditSave}
              disabled={!editValue.trim() || editValue.trim() === todo.title}
            >
              Lưu
            </button>
            <button
              className='text-gray-500 px-2 py-1 cursor-pointer rounded hover:bg-gray-100'
              onClick={handleEditCancel}
            >
              Hủy
            </button>
          </>
        ) : (
          <>
            <button
              className='ml-2 text-cyan-500 cursor-pointer'
              onClick={handleEdit}
            >
              <CiEdit size={20} />
            </button>
            <button
              className='ml-2 text-red-500 cursor-pointer'
              onClick={handleDelete}
            >
              <MdDeleteSweep size={20} />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
