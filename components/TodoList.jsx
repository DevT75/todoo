import { useState, useEffect } from 'react';
import { fetchTodos, updateTodo, deleteTodo } from '../lib/api';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useAuth } from '../context/AuthContext';
import Todo from './Todo';

const TodoList = () => {
    const { todos, setTodos } = useAuth();
    const [openToolKit, setOpenToolkit] = useState(false);
    const toggleToolkit = () => setOpenToolkit(!openToolKit);
    const [localTodos, setLocalTodos] = useState(new Array(todos));
    let arr = new Array();
    const loadTodos = async () => {
        const data = await fetchTodos();
        setTodos(data);
        setLocalTodos(data);
    };
    useEffect(() => {
        loadTodos();
    }, []);

    useEffect(() => {
        getAll();
    }, [todos])
    useEffect(() => {
        console.log(localTodos);
    }, [localTodos])
    const handleUpdateTodo = async (id, done) => {
        await updateTodo(id, { done }, token);
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, done } : todo)));
        getAll();
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo.todo_id !== id));
        getAll()
    };
    const sortByCompleted = async () => {
        setLocalTodos(todos.filter(todo => todo.status === true));
    };

    const sortByPending = async () => {
        setLocalTodos(todos.filter(todo => todo.status === false));
    };
    const priorityValue = (priority) => {
        switch (priority) {
            case 'High':
                return 3;
            case 'Medium':
                return 2;
            case 'Low':
                return 1;
            default:
                return 0;
        }
    };
    const sortByPriority = () => {
        setLocalTodos(() => {
            const arr = [...todos];
            arr.sort((a, b) => {
                return priorityValue(b.priority) - priorityValue(a.priority);
            });
            return arr;
        });
    };
    const sortByDueDate = () => {
        setLocalTodos(() => {
            const arr = [...todos];
            arr.sort((a, b) => {
                if (a.due_date && b.due_date) {
                    return new Date(a.due_date) - new Date(b.due_date);
                } else if (a.due_date && !b.due_date) {
                    return -1; // a comes before b
                } else if (!a.due_date && b.due_date) {
                    return 1; // b comes before a
                } else {
                    return 0; // Both due dates are null
                }
            });
            return arr;
        });
    };
    const getAll = () => {
        setLocalTodos(todos);
    }

    return (
        <div className=''>
            <div className='w-full h-full flex flex-row justify-center items-center md:gap-2 gap-1'>
                <button className='rounded-2xl bg-white text-sm text-black border-2 py-1 md:px-3 px-2 border-white' onClick={getAll}>All</button>
                <div
                    className="h-[2em] w-[2px] self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 mt-2 dark:via-white lg:block" />
                <button className='rounded-2xl bg-white text-sm text-black border-2 py-1 px-2 border-white' onClick={sortByCompleted}>Completed</button>
                <div
                    className="h-[2em] w-[2px] self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 mt-2 dark:via-white lg:block" />

                <button className='rounded-2xl bg-white text-sm text-black border-2 py-1 px-2 border-white' onClick={sortByPending}>Pending</button>
                <div
                    className="h-[2em] w-[2px] self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 mt-2 dark:via-white lg:block" />
                <div className='relative rounded-2xl bg-white text-sm text-black border-2 py-1 pl-2 border-white flex flex-row items-center gap-1' onClick={toggleToolkit}>
                    <span className=''>Sort By</span>
                    {
                        openToolKit ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />
                    }

                    {
                        openToolKit &&
                        <div className='absolute flex flex-col w-[100px] bg-white rounded left-[-8px] top-[35px] z-10 shadow-lg border border-black'>
                            <div className='p-2 text-black hover:bg-black hover:text-white hover:font-semibold' onClick={sortByDueDate}>Due Date</div>
                            <div className='p-2 text-black hover:bg-black hover:text-white hover:font-semibold' onClick={sortByPriority}>Priority</div>
                        </div>
                    }
                </div>
            </div>
            <div className='mt-4 w-full h-full flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center'>
                {localTodos.map((todo) => (
                    <Todo key={todo.todo_id}
                        title={todo.title}
                        desc={todo.description}
                        isCompleted={todo.status}
                        id={todo.todo_id}
                        onDelete={handleDeleteTodo}
                        onEdit={handleUpdateTodo}
                        setTodos={setTodos}
                        priority={todo.priority}
                        due_date={todo.due_date}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;