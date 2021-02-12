import React, { createRef, useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'

const NoteForm = (props: any) => {

   const [dateTime, setDateTime] = useState({
      year: -1,
      month: -1,
      date: -1,
      hour: -1,
      minute: -1
   });
   const [title, setTitle] = useState('');
   const [textBody, setTextBody] = useState('');
   
   const titleControl = createRef<HTMLInputElement>();
   const textBodyControl = createRef<HTMLTextAreaElement>();

   return (
      <>
         <Form>
            <Form.Row>
               <Col>
                  <Form.Group controlId='title'>
                     <Form.Label>Title</Form.Label>
                     <Form.Control
                        as='input'
                        type='text'
                        ref={titleControl}
                        value={title}
                        onChange={e => setTitle(e.currentTarget.value)}
                     />
                  </Form.Group>
               </Col>
            </Form.Row>

            <Form.Row>
               <Col>
                  <Form.Group controlId='textBody'>
                     <Form.Control
                        as='textarea'
                        ref={textBodyControl}
                        value={textBody}
                        onChange={e => setTextBody(e.currentTarget.value)}
                        placeholder='Write text here...'
                        style={{ height: '50vh' }}
                     />
                  </Form.Group>
               </Col>
            </Form.Row>

            <Button variant="primary" type="submit" disabled={textBody ? false : true}>
               Save {props.type}
            </Button>
         </Form>
      </>
   )
}

export default NoteForm
