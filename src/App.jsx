import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Container, Row } from 'react-bootstrap';

function App() {

  return (
    <Container>
      <Row className="justify-content-md-center">
    <Form.Select aria-label="Default select example">
      <option>Open this select menu</option>
      <option value="1">Market</option>
      <option value="2">Kategori</option>
    </Form.Select>
    
    <Form>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check className='col-6'
            inline
            label="1"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />
          <Form.Check className='col-6'
            inline
            label="2"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
          />
         <Form.Check className='col-6'
            inline
            label="3"
            name="group1"
            type={type}
            id={`inline-${type}-3`}
          />
        </div>
      ))}
    </Form>
    </Row>
    </Container>
  )
}

export default App
