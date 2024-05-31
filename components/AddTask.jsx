"use client"
import { useContext, useEffect, useState } from 'react'
// import Modal from 'react-modal'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { AiOutlineClose } from "react-icons/ai";
import { createTodo, fetchTodos } from '../lib/api';
import { useAuth } from '../context/AuthContext';


const AddTask = () => {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const openModal = () => setIsModelOpen(true);
    const closeModal = () => setIsModelOpen(false);
    const afterModalOpen = () => console.log("Modal Open");
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [priority,setPriority] = useState('None');
    const { setTodos } = useAuth();
    const handleCreate = async (e) => {
        e.preventDefault();
        console.log({ title, desc,priority,dueDate });
        await createTodo({ title: title, description: desc, priority: priority, due_date: dueDate });
        const data = await fetchTodos();
        setTodos(data);
        setTitle('');
        setDesc('');
        setDueDate(null)
        setPriority('None');
        closeModal();
    }
    return (
        <div className="flex flex-row justify-center items-center w-full h-full">
            <button className="w-1/2 bg-white text-black px-2 py-4 rounded-md font-semibold"
                onClick={openModal}
            >Add New Task</button>
            <Modal
                open={isModelOpen}
                onClose={closeModal}
                center
            // ariaHideApp={false}
            // style={customStyles}
            // centered
            // className={"flex justify-center items-center w-1/2 h-1/2 border"}
            >
                <div className='w-full h-full z-10 flex flex-col justify-start items-center gap-2'>
                    <div className='flex flex-row justify-around w-full mb-8'>
                        <h1 className='font-semibold text-lg'>Add Task</h1>
                        {/* <button onClick={closeModal} className='-mr-14'><AiOutlineClose size={28}/></button> */}
                    </div>
                    <form className='flex flex-col justify-center items-center gap-4 w-full'
                        onSubmit={handleCreate}
                    >
                        <div className='relative w-full'>
                            <label className='text-sm absolute -top-2.5 z-1 px-0.5 left-4 bg-white'>Title</label>
                            <input type="text" name='title' className='px-3 py-2 w-full border focus:border-2 border-black rounded-md placeholder:text-sm'
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                        </div>
                        <div className='relative w-full'>
                            <label className='text-sm absolute -top-2.5 z-1 px-0.5 left-4 bg-white'>Description</label>
                            <textarea type="textarea" placeholder="" className='p-4 w-full h-28 border focus:border-2 border-black rounded-md placeholder:text-sm'
                                onChange={(e) => { setDesc(e.target.value) }}
                            />
                        </div>
                        <div className='relative w-full'>
                            <label className='text-sm absolute -top-2.5 z-1 px-0.5 left-4 bg-white'>Due</label>
                            <input type="datetime-local" placeholder="" className='p-4 w-full border focus:border-2 border-black placeholder:text-sm'
                                onChange={(e) => { setDueDate(e.target.value) }}
                                onFocus={(e) => (e.target.type = "datetime-local")}
                            />
                        </div>
                        <div className='relative w-full'>
                            <label className='text-sm absolute -top-2.5 z-1 px-0.5 left-4 bg-white'>Priority</label>
                            <input type="text" name='title' className='px-4 py-2 w-full border focus:border-2 border-black rounded-md placeholder:text-sm'
                                onChange={(e) => { setPriority(e.target.value) }}
                                placeholder='High, Medium, Low'
                            />
                        </div>
                        <button type="submit" className='mt-6 w-1/2 bg-black text-white font-semibold hover:bg-white hover:border-2 hover:border-black hover:text-black rounded p-4'
                        >Add Task</button>
                    </form>
                </div>
            </Modal>
        </div>)
}

export default AddTask;