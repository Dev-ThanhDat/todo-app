import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import TodoItem from './TodoItem';

const FILTERS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Hoàn thành', value: 'completed' },
  { label: 'Chưa hoàn thành', value: 'active' }
];

const TodoList = () => {
  const { todos } = useSelector((state: RootState) => state.todos);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <>
      <div className='flex gap-2 justify-center flex-col md:flex-row mb-4'>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`px-3 py-1 cursor-pointer rounded ${
              filter === f.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setFilter(f.value as 'all' | 'completed' | 'active')}
          >
            {f.label}
          </button>
        ))}
      </div>
      {filteredTodos.length === 0 ? (
        <div className='text-center text-gray-400 py-8'>
          Không có công việc nào.
        </div>
      ) : (
        <ul className='max-h-[500px] h-full overflow-y-auto divide-y'>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default TodoList;
