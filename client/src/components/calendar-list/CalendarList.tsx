import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { CalendarEvent, Task, Reminder } from '../../interfaces/interfaces';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import './calendar-list.scss'

interface Props {
   events?: CalendarEvent[],
   tasks?: Task[],
   reminders?: Reminder[]
}

const CalendarList = ({ events, tasks, reminders }: Props) => {

   const [selectedOption, setSelectedOption] = useState<string>('Events');
   const [currentList, setCurrentList] = useState<CalendarEvent[] | Task[] | Reminder[] | undefined>(events);

   const options = useMemo<string[]>(() => ['Events', 'Tasks', 'Reminders'], []);

   useEffect(() => {
      switch (selectedOption) {
         case options[1]:
            setCurrentList(tasks);
            break;
         case options[2]:
            setCurrentList(reminders);
            break;
         default:
            setCurrentList(events);
            break;
      }
   }, [selectedOption, events, tasks, reminders, options]);

   function getTime(date: Date): string {
      const hour = date.getHours();
      let amOrPm = 'AM';
      let time = '';
      if (hour >= 13) {
         time += hour - 12;
         amOrPm = 'PM';
      }
      else if (hour === 0) {
         time += 12;
      }
      else {
         time += hour;
      }
      time += `:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${amOrPm}`;
      return time;
   }

   function getBgClassName() {
      switch (selectedOption) {
         case 'Events':
            return 'clc-list-item-bleen';
         case 'Tasks':
            return 'clc-list-item-purple';
         default:
            return 'clc-list-item-green';
      }
   }

   return (
      <div className='calendar-list-container'>
         <div className='clc-options d-flex'>
            {
               options.map((option: string, idx: number) => {
                  const key = `${option}${(idx + 1) * option.length}`;
                  const borderClass = option === selectedOption ? 'clc-option-border' : '';
                  return (
                     <div
                        key={key}
                        className={`d-flex align-items-center clc-option ${borderClass}`}
                        onClick={() => setSelectedOption(option)}
                     >
                        {option}
                     </div>
                  )
               })
            }
         </div>

         <div className='clc-list'>
            {
               currentList &&
               (currentList as any[]).map((value, idx, arr) => {
                  const date = new Date(value.dateTime);
                  const lastItemClassName = idx + 1 === arr.length ? 'clc-item-last' : ''
                  return (
                     <div key={value._id} className={`clc-list-item ${lastItemClassName} ${getBgClassName()}`}>
                        <div className='clc-menu-dots'><BiDotsVerticalRounded /></div>
                        <div className='d-flex'>
                           <div>{date.toDateString()}</div>
                           <div className='p-2'></div>
                           <div>{getTime(date)}</div>
                        </div>
                        <div>{value.name}</div>
                     </div>
                  )
               })
            }
         </div>
      </div>
   )
}

const mapStateToProps = (state: any) => {
   return {
      events: state.events,
      tasks: state.tasks,
      reminders: state.reminders
   }
}

export default connect(mapStateToProps)(CalendarList)
