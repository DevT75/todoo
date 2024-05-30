/* eslint-disable import/no-anonymous-default-export */

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { fetchTodos, updateTodo } from '../lib/api';
// eslint-disable-next-line react/display-name
export default ({ title, desc, priority, due_date, isCompleted, id, onDelete, onEdit, setTodos }) => {

    const [isModelOpen, setIsModelOpen] = useState(false);
    const toggleModal = () => setIsModelOpen(!isModelOpen);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDesc, setUpdatedDesc] = useState(desc);
    const [updatedDue, setUpdatedDue] = useState(null);
    const [updatedPriority, setUpdatedPriority] = useState(priority);
    const [updatedStatus, setUpdatedStatus] = useState(isCompleted);
    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log({ updatedTitle, updatedDesc });
        await updateTodo(id, { title: updatedTitle, description: updatedDesc, status: updatedStatus, priority: updatedPriority, due_date: updatedDue });
        const data = await fetchTodos();
        setTodos(data);
        toggleModal();
    }
    const colorSelector = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-[#FF0000]';
            case 'Medium':
                return 'bg-[#FFFF00]';
            case 'Low':
                return 'bg-[#00FF00]';
            default:
                return 'bg-gray-500';
        }
    }
    return (
        <div className="relative flex flex-col justify-between items-center border shadow p-4 md:w-[250px] md:h-[250px] rounded-lg bg-white
            w-full h-[100px]">
            <div className="absolute top-1 left-1 flex-1">
                {
                    isCompleted ? (
                        <div className="w-auto h-6 bg-green-500 rounded-md px-2 flex items-center text-sm text-white font-semibold">Done</div>
                    ) : (
                        <div className="w-auto h-6 bg-red-500 rounded-md px-2 flex items-center text-sm text-white font-semibold">Pending</div>
                    )
                }
            </div>
            <div className='flex flex-auto flex-row md:flex-col justify-between items-center w-full'>
                <div className="flex-auto gap-4 flex-col justify-between items-center text-white w-3/4 md:w-full flex-1">
                    <div className=" text-lg md:text-2xl font-medium mt-4 text-black w-full justify-center flex items-center"><span className='text-ellipsis w-full overflow-hidden whitespace-nowrap'>{title}</span></div>
                    <div className="md:block mb-2 text-black h-full w-full hidden"><p className="text-ellipsis w-full overflow-hidden whitespace-nowrap">{desc}</p></div>
                </div>
                <div className="flex flex-auto gap-4 md:gap-4 md:-mb-8 w-1/4 md:w-full justify-end md:justify-center items-center">
                    <button className=" bg-green-500 text-white py-2 md:py-2.5 rounded-md font-semibold" onClick={toggleModal}>
                        <div className="md:hidden px-2">
                            <AiOutlineEdit size={28} />
                        </div>

                        {/* Text for medium and larger screens */}
                        <div className="hidden md:block px-2">
                            {isCompleted ? <AiOutlineEdit size={28} /> : "Mark Done"}
                        </div>
                    </button>
                    <Modal
                        open={isModelOpen}
                        onClose={toggleModal}
                        center
                    >
                        <div className='w-full h-full z-10 flex flex-col justify-start items-center gap-2'>
                            <div className='flex flex-row justify-around w-full mb-8'>
                                <h1 className='font-semibold text-lg'>Update Task</h1>
                            </div>
                            <form className='flex flex-col justify-center items-center gap-5 w-full'
                                onSubmit={handleUpdate}
                            >
                                <div className='relative w-full'>
                                    <label className='text-sm absolute -top-2.5 z-1 px-0.5 left-4 bg-white'>Title</label>
                                    <input type="text" name='title' className='px-3 py-2 w-full border focus:border-2 border-black rounded-md placeholder:text-sm'
                                        onChange={(e) => { setTitle(e.target.value) }}
                                        value={updatedTitle}
                                    />
                                </div>
                                <div className='relative w-full'>
                                    <label className='text-sm absolute -top-2.5 z-1 px-0.5 left-4 bg-white'>Description</label>
                                    <textarea type="textarea" placeholder="" className='p-4 w-full h-28 border focus:border-2 border-black rounded-md placeholder:text-sm'
                                        onChange={(e) => { setUpdatedDesc(e.target.value) }}
                                        value={updatedDesc}
                                    />
                                </div>
                                <div className='relative w-full'>
                                    <label className='text-sm absolute -top-2.5 z-1 px-0.5 left-4 bg-white'>Due</label>
                                    <input type="datetime-local" placeholder="" className='p-4 w-full border focus:border-2 border-black placeholder:text-sm'
                                        onChange={(e) => { setUpdatedDue(e.target.value) }}
                                        onFocus={(e) => (e.target.type = "datetime-local")}
                                        value={updatedDue}
                                    />
                                </div>
                                <div className='relative w-full'>
                                    <label className='text-sm absolute -top-2.5 z-1 px-0.5 left-4 bg-white'>Priority</label>
                                    <input type="text" name='title' className='px-4 py-2 w-full border focus:border-2 border-black rounded-md placeholder:text-sm'
                                        onChange={(e) => { setUpdatedPriority(e.target.value) }}
                                        placeholder='High, Medium, Low'
                                        value={updatedPriority}
                                    />
                                </div>
                                <div className='relative w-full flex flex-row justify-around'>
                                    <div className='flex flex-row gap-2'>
                                        <label className='text-sm' htmlFor='radio-button'>Done</label>
                                        <input
                                            type='radio'
                                            name='status'
                                            onChange={(e) => { setUpdatedStatus(e.target.checked) }}
                                            className='p-2'
                                            defaultChecked={isCompleted}
                                        />
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        <label className='text-sm' htmlFor='radio-button'>Not Done</label>
                                        <input
                                            type='radio'
                                            name='status'
                                            onChange={(e) => { setUpdatedStatus(e.target.checked) }}
                                            className='p-2'
                                            defaultChecked={!isCompleted}
                                        />
                                    </div>

                                </div>
                                <button type="submit" className='mt-6 w-1/2 bg-black text-white font-semibold hover:bg-white hover:border-2 hover:border-black hover:text-black rounded p-4'
                                >Update</button>
                            </form>
                        </div>
                    </Modal>
                    <button className=" bg-red-500 text-white p-2 rounded-md font-semibold flex justify-center items-center" onClick={() => onDelete(id)}><AiOutlineDelete size={28} /></button>
                </div>
            </div>
            <div className={`absolute w-full bottom-0 left-0 h-2 ${colorSelector(priority)} rounded-bl-lg rounded-br-lg`} />
        </div>
    );
}