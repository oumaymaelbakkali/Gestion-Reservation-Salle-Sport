
import Form from 'react-bootstrap/Form';
import Header from './Header'
import App from '../App.css'
import Button from 'react-bootstrap/Button';
import Login from './Login.css'
import { Link } from 'react-router-dom';

import axios from 'axios';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function FormDisabledInputExample() {
  
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }
  const handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:5000/login', values)
    .then(res => {
      if (res.data.Admin) {
        
        alert('Admin');
        navigate('/Admin');
     
      } else if (res.data.Etudiant) {
        alert('User');
        
        navigate('/User');
       
      } else {

        alert('try again,your password or your username incorret!');
      }
    })
    .catch(err => {
      console.error(err);
    });
  }
  return (
    < >
    <div className='login-container'> 
    <Header />
  
    <Form className='login'  onSubmit={handleSubmit}>
    
      <Form.Group className='padd' >
     <Form.Label style={{padding:"13px"}}>Username</Form.Label>

    <Form.Control style={{opacity:"50%"}} type="text" name="username" onChange={handleChange} 
                  value={values.username}/>
        
      </Form.Group>

      <Form.Group className='padd' controlId="formBasicPassword">
        <Form.Label style={{padding:"13px"}}>Password</Form.Label>
        <Form.Control   style={{opacity:"50%"}}type="password" name="password" onChange={handleChange} 
        value={values.password} />
      </Form.Group>
     
      <Button class="btn btn-lg btn-primary" type="submit" style={{margin:"13px",marginLeft:"5rem",marginBottom:"1rem",marginTop:"3rem",width:"13rem",fontSize:"x-large"}} >
        login
      </Button>
      <Form.Group  >
      
      </Form.Group>
      
    </Form>
    
    </div>
    </>
  );
}

export default FormDisabledInputExample;
