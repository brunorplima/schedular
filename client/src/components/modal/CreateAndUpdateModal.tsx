import React, { useState, createRef } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { VscClose } from 'react-icons/vsc'
import { createPostEventAction } from '../../redux/actions/eventActions'
import { useDispatch } from 'react-redux'
import { BiError } from 'react-icons/bi'

import './portal.scss'
import { UnsavedCalendarEvent } from '../../interfaces/interfaces'

const CreateAndUpdateModal = (props: any) => {

   const [dateTime, setDateTime] = useState({
      year: -1,
      month: -1,
      date: -1,
      hour: -1,
      minute: -1
   });
   const [name, setName] = useState('');
   const [location, setLocation] = useState('');
   const [guests, setGuests] = useState('');
   const [description, setDescription] = useState('');
   const [errorList, setErrorList] = useState<string[]>([]);

   const dateControl = createRef<HTMLInputElement>();
   const timeControl = createRef<HTMLInputElement>();
   const nameControl = createRef<HTMLInputElement>();
   const locationControl = createRef<HTMLInputElement>();
   const guestsControl = createRef<HTMLInputElement>();
   const descriptionControl = createRef<HTMLTextAreaElement>();

   const dispatch = useDispatch();


   function dateInputValue(): string {
      const month = dateTime.month >= 10 ? dateTime.month + 1 : `0${dateTime.month + 1}`;
      const date = dateTime.date >= 10 ? dateTime.date : `0${dateTime.date}`;
      return `${dateTime.year}-${month}-${date}`;
   }


   function timeInputValue(): string {
      const hour = dateTime.hour >= 10 ? dateTime.hour : `0${dateTime.hour}`;
      const minute = dateTime.minute >= 10 ? dateTime.minute : `0${dateTime.minute}`;
      return `${hour}:${minute}`;
   }


   function onSetDate(): void {
      const arr = dateControl.current?.value.split('-');
      const dateArr = arr?.map(val => Number(val));
      if (dateArr?.length) {
         const newDate = {
            year: dateArr[0],
            month: dateArr[1] - 1,
            date: dateArr[2]
         }
         setDateTime({ ...dateTime, ...newDate });
      }
   }


   function onSetTime(): void {
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


   function onSetName(): void {
      const name = nameControl.current?.value;
      if (typeof name === 'string') setName(name);
   }


   function onSetLocation(): void {
      const loc = locationControl.current?.value;
      if (typeof loc === 'string') setLocation(loc);
   }


   function onSetGuests(): void {
      const gts = guestsControl.current?.value;
      if (typeof gts === 'string') setGuests(gts);
   }


   function onSetDescription(): void {
      const desc = descriptionControl.current?.value;
      if (typeof desc === 'string') setDescription(desc);
   }


   function addToDatabase(ev: React.MouseEvent<HTMLElement>): void {
      ev.preventDefault();
      const errors: string[] = [];
      const allTrue: boolean[] = [];
      if (dateTime.year >= 2000 && (dateTime.month >= 0 && dateTime.month <= 11) && (dateTime.date >= 1 && dateTime.date <= 31)) {
         allTrue.push(true);
      } else {
         errors.push('Date is required. Make sure its value is valid.');
         allTrue.push(false);
      }

      if (dateTime.hour >= 0 && dateTime.hour <= 23 && dateTime.minute >= 0 && dateTime.minute <= 59) {
         allTrue.push(true);
      } else {
         errors.push('Time is required. Make sure its value is valid.');
         allTrue.push(false);
      }

      if (name) {
         allTrue.push(true);
      }
      else {
         errors.push('Name is required.');
         allTrue.push(false);
      }

      if (!allTrue.includes(false)) {
         const newEvent: UnsavedCalendarEvent = {
            dateTime: new Date(dateTime.year, dateTime.month, dateTime.date, dateTime.hour, dateTime.minute),
            name,
         }
         if (location) newEvent.location = location;
         if (guests) newEvent.guests = guests;
         if (description) newEvent.description = description;
         dispatch(createPostEventAction(newEvent));
         props.closeWhenComplete();
      } else {
         setErrorList(errors);
      }
   }

   return props.isOpen ? ReactDOM.createPortal(
      <div
         id='modal-container'
         className='d-flex justify-content-center align-items-center'
         onClick={ev => props.closePortal(ev)}
      >
         <div className='add-new-portal'>
            <div className='form'>
               <div
                  className='form-close d-flex justify-content-center align-items-center'
                  onClick={ev => props.closePortal(ev, true)}
               >
                  <VscClose />
               </div>

               <div className='form-header'>
                  <h3>New {props.type}</h3>
               </div>

               {
                  <div className='error-list'>
                     {
                        errorList.map((error, idx) => {
                           if (idx + 1 === errorList.length) return <div key={idx} className='el-error'><div><BiError/></div> {error}</div>
                           return <div key={idx} className='el-error' style={{marginBottom: 10}}><div><BiError/></div> {error}</div>
                        })
                     }
                  </div>
               }

               <Form>
                  <Form.Row>
                     <Col>
                        <Form.Group controlId='date'>
                           <Form.Label>Date</Form.Label>
                           <Form.Control 
                              as='input' 
                              type='date' 
                              ref={dateControl} 
                              onChange={onSetDate}
                              value={dateInputValue()}
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId='time'>
                           <Form.Label>Time</Form.Label>
                           <Form.Control 
                              type='time'
                              ref={timeControl}
                              onChange={onSetTime}
                              value={timeInputValue()}   
                           ></Form.Control>
                        </Form.Group>
                     </Col>
                  </Form.Row>

                  <Form.Row>
                     <Col>
                        <Form.Group controlId='name'>
                           <Form.Label>Name</Form.Label>
                           <Form.Control
                              as='input'
                              type='text'
                              ref={nameControl}
                              onChange={onSetName}
                              value={name}
                           />
                        </Form.Group>
                     </Col>
                  </Form.Row>

                  <Form.Row>
                     <Col>
                        <Form.Group controlId='location'>
                           <Form.Label>Location</Form.Label>
                           <Form.Control
                              as='input'
                              type='text'
                              ref={locationControl}
                              onChange={onSetLocation}
                              value={location}
                           />
                        </Form.Group>
                     </Col>
                  </Form.Row>

                  <Form.Row>
                     <Col>
                        <Form.Group controlId='guests'>
                           <Form.Label>Guests</Form.Label>
                           <Form.Control
                              as='input'
                              type='text'
                              ref={guestsControl}
                              onChange={onSetGuests}
                              value={guests}
                           />
                        </Form.Group>
                     </Col>
                  </Form.Row>

                  <Form.Row>
                     <Col>
                        <Form.Group controlId='description'>
                           <Form.Label>Description</Form.Label>
                           <Form.Control
                              as='textarea'
                              type='text'
                              ref={descriptionControl}
                              onChange={onSetDescription}
                              value={description}
                           />
                        </Form.Group>
                     </Col>
                  </Form.Row>

                  <Button as='button' type='submit' onClick={ev => addToDatabase(ev)}>
                     Create {props.type}
                  </Button>
               </Form>
            </div>
         </div>
      </div>,
      document.getElementById('portal') as Element
   ) : null
}

export default CreateAndUpdateModal
