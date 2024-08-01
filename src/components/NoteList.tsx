import { Col, Row, Stack, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const NoteList = () => {
  return (
    <>
      <Row>
        <Col>
          <h2>Notes</h2>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
            <Button variant='primary'>Create</Button>
            </Link>
            <Button variant="outline-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
         <Row className='mb-4'>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
         </Row>
      </Form>
    </>
  )
}

export default NoteList
