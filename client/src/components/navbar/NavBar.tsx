import React, { useState } from 'react'
import { Navbar } from 'react-bootstrap';
import { IoIosAdd } from 'react-icons/io';
import AddNewModal from '../modal/CreateEventModal';

import './navbar.scss';

const NavBar = () => {

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isAddOpen, setIsAddOpen] = useState(false);
   const [addType, setAddType] = useState('Event');

   function openModal(type: string) {
      setAddType(type);
      setIsModalOpen(true);
   }

   function closePortal(ev: React.MouseEvent<HTMLDivElement, MouseEvent>, ignoreTarget?: boolean) {
      if (ev.target === ev.currentTarget)
      setIsModalOpen(false);
      
      else if (ignoreTarget)
      setIsModalOpen(false);
   }

   return (
      <Navbar bg="light" expand="lg">

         <AddNewModal type={addType} isOpen={isModalOpen} closePortal={closePortal} closeWhenComplete={() => setIsModalOpen(false)}/>

         <div
            className='plus-button d-flex justify-content-center align-items-center'
            onClick={() => setIsAddOpen(!isAddOpen)}
         >
            <IoIosAdd />
            {isAddOpen &&
               <div className='plus-button-options'>
                  <div className='arrow-up'></div>
                  <div
                     className='pb-option d-flex align-items-center top-option'
                     onClick={() => openModal('Event')}
                  >
                     New Event
                  </div>

                  <div
                     className='pb-option d-flex align-items-center'
                     onClick={() => openModal('Task')}
                  >
                     New Task
                  </div>

                  <div
                     className='pb-option d-flex align-items-center'
                     onClick={() => openModal('Reminder')}
                  >
                     New Reminder
                  </div>

                  <div
                     className='pb-option d-flex align-items-center bottom-option'
                     onClick={() => openModal('Note')}
                  >
                     New Note
                  </div>
               </div>
            }
         </div>

         <Navbar.Brand href="#home">Schedular</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
   )
}

export default NavBar
