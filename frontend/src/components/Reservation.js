import React from 'react'
import { Form } from 'react-bootstrap';
import Header from './Header'
import './Login.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
 
class DatepickerComponent extends React.Component{
    state = {
        NOM: '',
        PRENOM: '',
        MATRICULE: '',
        HEURE: '',
        DATE: ''
    }
    handleHEUREChange = (e) => {
        let HEURE = e.target.value;
        if(HEURE >= "09:00" && HEURE <= "20:00"){
            this.setState({HEURE: e.target.value});
        }else{
            alert("Please select a time between 9:00 AM and 8:00 PM");
        }}
    handleNOMChange = (e) => {
        this.setState({
            NOM: e.target.value
        });
    }
    handlePRENOMChange = (e) => {
        this.setState({
            PRENOM: e.target.value
        });
    }
    handleMATRICULEChange = (e) => {
        this.setState({
            MATRICULE: e.target.value
        });
    }
    handleDATEChange = (e) => {
        this.setState({
            DATE: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
 
        const reservation = {
            NOM: this.state.NOM,
            PRENOM: this.state.PRENOM,
            MATRICULE: this.state.MATRICULE,
            HEURE: this.state.HEURE,
            DATE: this.state.DATE
        }
        axios.post('http://localhost:5000/Reservation', reservation)
        .then(res => {
           
                if (res.data.ok) {
                  
                  alert('Your Reservation is added successfully');
               
                }else{
                    alert('Try again !Something wrong');
                }
            console.log(res);
            console.log(res.reservation);
        })
        this.setState({
            NOM: '',
            PRENOM: '',
            MATRICULE: '',
            HEURE: '',
            DATE: ''
        });
    }
    render(){
 
        return(
            < >
            <div className='login-container1'> 
            <Header />
            
            <Form className='login'  onSubmit={this.handleSubmit} >
                         <h4 style={{marginLeft: "42px"}}>GYM RESERVATION FORM </h4>
                         <div className="row" style={{marginTop: "20px"}}>
                         <div className="col-md-6">
                         <Form.Group controlId="NOM">
                           
                            <Form.Control 
                                 type="text" 
                                 name="NOM" 
                                 
                                 placeholder="Last Name" 
                                 onChange={(e) => this.handleNOMChange(e)} />
                                 
                        </Form.Group>
                        </div>
                        <div className="col-md-6">
                         <Form.Group controlId="PRENOM">
                            
                            <Form.Control 
                                 type="text" 
                                 name="PRENOM" 
                                
                                 placeholder="First Name" 
                                 onChange={(e) => this.handlePRENOMChange(e)} />
                        </Form.Group>
                        </div>
                        </div>
                        <div className="row" style={{marginTop: "20px"}}>
                        <div className="col-md-12">
                         <Form.Group controlId="MATRICULE">
                           
                            <Form.Control type="text" 
                                 name="MATRICULE" 
                                 defaultValue={this.props.selectedName} 
                                 placeholder="Matricule" 
                                 onChange={(e) => this.handleMATRICULEChange(e)} />
                                 
                        </Form.Group>
                        </div>

                        </div>
                        <div className="row" style={{marginTop: "20px"}}>
                        <div className="col-md-6">
                        <Form.Group controlId="DATE">
                           
                            <Form.Control 
                                 type="date" 
                                 name="DATE" 
                                 defaultValue={this.props.selectedValue} 
                                 placeholder="Date" 
                                 onChange={(e) => this.handleDATEChange(e)} />
                        </Form.Group>
                        </div>
                    
                        <div className="col-md-6">
                        <Form.Group controlId="HEURE">
                           
                            <Form.Control 
                                 type="time" 
                                 name="HEURE" 
                                 min="09:00" 
                                
                                 max="20:00"
                                 defaultValue={this.props.selectedStartTime} 
                                 placeholder="Start Time" 
                                 onChange={(e) => this.handleHEUREChange(e)} />
                                
                        </Form.Group>
                        </div>
                        </div>
                        <Button class="btn btn-lg btn-primary" type="submit" style={{margin:"13px",marginLeft:"5rem",marginBottom:"1rem",marginTop:"3rem",width:"13rem",fontSize:"x-large"}} >
                          Reserve
                         </Button>
                
                       
                        </Form>
                    </div>
                 
              </>
           
        )
    }
     
}
 
export default DatepickerComponent;
