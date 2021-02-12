import React, { createRef, useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { BiError } from 'react-icons/bi';
import { DateTime, UnsavedReminder } from '../../interfaces/interfaces';

import './portal.scss';

interface Props {
   type: string,
   onSetDate: (dateTime: DateTime, setDateTime: React.Dispatch<React.SetStateAction<DateTime>>, dateControl: React.RefObject<HTMLInputElement>) => void,
   dateInputValue: (dateTime: DateTime) => string,
   onSetTime: (dateTime: DateTime, setDateTime: React.Dispatch<React.SetStateAction<DateTime>>, timeControl: React.RefObject<HTMLInputElement>) => void,
   timeInputValue: (dateTime: DateTime) => string,
   isDateValid: (date: DateTime) => boolean,
   isTimeValid: (time: DateTime) => boolean,
   saveToDatabase: (data: UnsavedReminder) => void,
   closeWhenComplete: () => void
}

const ReminderForm = ({
   type,
   onSetDate,
   dateInputValue,
   onSetTime,
   timeInputValue,
   isDateValid,
   isTimeValid,
   saveToDatabase,
   closeWhenComplete
}: Props) => {

   const [dateTime, setDateTime] = useState({
      year: -1,
      month: -1,
      day: -1,
      hour: -1,
      minute: -1
   });
   const [subject, setSubject] = useState('');
   const [description, setDescription] = useState('');
   const [repeat, setRepeat] = useState('');
   const [errorList, setErrorList] = useState<string[]>([]);


   const dateControl = createRef<HTMLInputElement>();
   const timeControl = createRef<HTMLInputElement>();


   function validateInput() {
      const errors: string[] = []
      if (!isDateValid(dateTime)) errors.push('Date is required. Make sure its value is valid.');

      if (!isTimeValid(dateTime)) errors.push('Time is required. Make sure its value is valid.');

      if (!subject) errors.push('Subject is required.')

      if (JSON.stringify(errors) !== JSON.stringify(errorList)) setErrorList(errors);

      if (!errors.length) return true;
      else return false;
   }


   function proceedToSave(e: React.MouseEvent<HTMLElement>) {
      e.preventDefault();
      const { year, month, day, hour, minute } = dateTime;
      const newReminder: UnsavedReminder = {
         dateTime: new Date(year, month, day, hour, minute),
         subject
      }
      if (description) newReminder.description = description;
      if (repeat) newReminder.repeat = [repeat];

      if (validateInput()) {
         saveToDatabase(newReminder);
         closeWhenComplete();
      }
   }


   return (
      <>
         <div className='error-list'>
            {
               errorList.map((error, idx) => {
                  if (idx + 1 === errorList.length) return <div key={idx} className='el-error'><div><BiError /></div> {error}</div>
                  return <div key={idx} className='el-error' style={{ marginBottom: 10 }}><div><BiError /></div> {error}</div>
               })
            }
         </div>
         
         <Form>
            <Form.Row>
               <Col>
                  <Form.Group controlId='date'>
                     <Form.Label>Date</Form.Label>
                     <Form.Control
                        as='input'
                        type='date'
                        ref={dateControl}
                        onChange={() => onSetDate(dateTime, setDateTime, dateControl)}
                        value={dateInputValue(dateTime)}
                     />
                  </Form.Group>
               </Col>
               <Col>
                  <Form.Group controlId='time'>
                     <Form.Label>Time</Form.Label>
                     <Form.Control
                        type='time'
                        ref={timeControl}
                        onChange={() => onSetTime(dateTime, setDateTime, timeControl)}
                        value={timeInputValue(dateTime)}
                     ></Form.Control>
                  </Form.Group>
               </Col>
            </Form.Row>

            <Form.Row>
               <Col>
                  <Form.Group controlId='subject'>
                     <Form.Label>Subject</Form.Label>
                     <Form.Control
                        as='input'
                        type='text'
                        onChange={e => setSubject(e.currentTarget.value)}
                        value={subject}
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
                        onChange={(e) => setDescription(e.currentTarget.value)}
                        value={description}
                     />
                  </Form.Group>
               </Col>
            </Form.Row>

            <Form.Row>
               <Col>
                  <Form.Group controlId='repeat'>
                     <Form.Label>Repeat</Form.Label>
                     <Form.Control
                        as='select'
                        value={repeat}
                        onChange={(e) => setRepeat(e.currentTarget.value)}
                        custom
                     >
                        <option>Weekends</option>
                        <option>Weekdays</option>
                        <option>Everyday</option>
                        <option>Sunday</option>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                     </Form.Control>
                  </Form.Group>
               </Col>
            </Form.Row>

            <Button variant="primary" type="submit" onClick={e => proceedToSave(e)}>
               Save {type}
            </Button>
         </Form>
      </>
   )
}

export default ReminderForm
