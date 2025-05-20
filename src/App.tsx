import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  return (
    <>
      <div className='w-full md:max-w-[60%] mx-auto p-4'>
        <h1 className='text-2xl text-center font-bold mb-4'>Todo App</h1>
        <TodoInput />
        <TodoList />
      </div>
    </>
  );
}

export default App;
