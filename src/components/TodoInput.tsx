import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addTodo } from '../redux/TodoSlice';

const TodoInput = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    const value = inputValue.trim();
    if (!value) return;
    dispatch(
      addTodo({
        id: uuidv4(),
        title: value,
        completed: false,
        createdAt: new Date().toISOString()
      })
    );
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddTodo();
  };

  return (
    <section className='flex items-center flex-col md:flex-row mb-10 gap-3'>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder='Thêm công việc mới'
        className='border w-full flex-1 outline-none rounded p-2'
        autoFocus
      />
      <button
        onClick={handleAddTodo}
        className='bg-blue-500 w-full md:w-fit cursor-pointer hover:opacity-85 transition-all text-white rounded px-10 py-2'
        disabled={!inputValue.trim()}
      >
        Thêm
      </button>
    </section>
  );
};

export default TodoInput;
