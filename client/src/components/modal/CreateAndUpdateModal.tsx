import React from 'react'
import ReactDOM from 'react-dom'
import { VscClose } from 'react-icons/vsc'
import { createPostEventAction } from '../../redux/actions/eventActions'
import { createPostTaskAction } from '../../redux/actions/taskActions'
import { createPostReminderAction } from '../../redux/actions/reminderActions'
// import { createPostNoteAction } from '../../redux/actions/notesActions'
import { useDispatch } from 'react-redux'
import { UnsavedCalendarEvent, UnsavedNote, UnsavedReminder, UnsavedTask, DateTime } from '../../interfaces/interfaces'
import EventForm from './EventForm'
import TaskForm from './TaskForm'
import ReminderForm from './ReminderForm'
import NoteForm from './NoteForm'

import './portal.scss'

interface Props {
   type: string,
   isOpen: boolean,
   closePortal: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>, ignoreTarget?: boolean | undefined) => void,
   closeWhenComplete: () => void
}

const EVENT = 'Event';
const TASK = 'Task';
const REMINDER = 'Reminder';
const NOTE = 'Note';

const CreateAndUpdateModal = ({
   type,
   isOpen,
   closePortal,
   closeWhenComplete
}: Props) => {

   const dispatch = useDispatch();

   function dateInputValue(dateTime: DateTime): string {
      const month = dateTime.month >= 10 ? dateTime.month + 1 : `0${dateTime.month + 1}`;
      const date = dateTime.day >= 10 ? dateTime.day : `0${dateTime.day}`;
      return `${dateTime.year}-${month}-${date}`;
   }


   function timeInputValue(dateTime: DateTime): string {
      const hour = dateTime.hour >= 10 ? dateTime.hour : `0${dateTime.hour}`;
      const minute = dateTime.minute >= 10 ? dateTime.minute : `0${dateTime.minute}`;
      return `${hour}:${minute}`;
   }


   function onSetDate(
      dateTime: DateTime,
      setDateTime: React.Dispatch<React.SetStateAction<DateTime>>,
      dateControl: React.RefObject<HTMLInputElement>
   ): void {
      const arr = dateControl.current?.value.split('-');
      const dateArr = arr?.map(val => Number(val));
      if (dateArr?.length) {
         const newDate = {
            year: dateArr[0],
            month: dateArr[1] - 1,
            day: dateArr[2]
         }
         setDateTime({ ...dateTime, ...newDate });
      }
   }


   function onSetTime(
      dateTime: DateTime,
      setDateTime: React.Dispatch<React.SetStateAction<DateTime>>,
      timeControl: React.RefObject<HTMLInputElement>
   ): void {
      const arr = timeControl.current?.value.split(':');
      const timeArr = arr?.map(val => Number(val));
      if (timeArr?.length) {
         const newTime = {
            hour: timeArr[0],
            minute: timeArr[1]
         }
         setDateTime({ ...dateTime, ...newTime })
      }
   }


   function isDateValid(date: DateTime) {
      if (date.year) {
         if (date.month >= 0 && date.month <= 11) {
            if (date.day >= 1 && date.day <= 31) return true;
         }
      }

      return false;
   }

   function isTimeValid(time: DateTime) {
      const { hour, minute } = time;
      if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) return true;

      return false;
   }

   function saveToDatabase(data: UnsavedCalendarEvent | UnsavedTask | UnsavedReminder | UnsavedNote) {
      if (type === EVENT) dispatch(createPostEventAction(data as UnsavedCalendarEvent));
      if (type === TASK) dispatch(createPostTaskAction(data as UnsavedTask));
      if (type === REMINDER) dispatch(createPostReminderAction(data as UnsavedReminder));
   }

   return isOpen ? ReactDOM.createPortal(
      <div
         id='modal-container'
         className='d-flex justify-content-center align-items-center'
         onClick={ev => closePortal(ev)}
      >
         <div className='add-new-portal'>
            <div className='form'>
               <div
                  className='form-close d-flex justify-content-center align-items-center'
                  onClick={ev => closePortal(ev, true)}
               >
                  <VscClose />
               </div>

               <div className='form-header'>
                  <h3>New {type}</h3>
               </div>

               {
                  type === EVENT &&
                  <EventForm
                     type={type}
                     dateInputValue={dateInputValue}
                     onSetDate={onSetDate}
                     timeInputValue={timeInputValue}
                     onSetTime={onSetTime}
                     isDateValid={isDateValid}
                     isTimeValid={isTimeValid}
                     saveToDatabase={saveToDatabase}
                     closeWhenComplete={closeWhenComplete}
                  />
               }

               {
                  type === TASK &&
                  <TaskForm
                     type={type}
                     dateInputValue={dateInputValue}
                     onSetDate={onSetDate}
                     timeInputValue={timeInputValue}
                     onSetTime={onSetTime}
                     isDateValid={isDateValid}
                     isTimeValid={isTimeValid}
                     saveToDatabase={saveToDatabase}
                     closeWhenComplete={closeWhenComplete}
                  />
               }

               {
                  type === REMINDER &&
                  <ReminderForm
                     type={type}
                     dateInputValue={dateInputValue}
                     onSetDate={onSetDate}
                     timeInputValue={timeInputValue}
                     onSetTime={onSetTime}
                     isDateValid={isDateValid}
                     isTimeValid={isTimeValid}
                     saveToDatabase={saveToDatabase}
                     closeWhenComplete={closeWhenComplete}
                  />
               }

               {
                  type === NOTE &&
                  <NoteForm
                     type={type}
                  />
               }

            </div>
         </div>
      </div>,
      document.getElementById('portal') as Element
   ) : null
}

export default CreateAndUpdateModal
