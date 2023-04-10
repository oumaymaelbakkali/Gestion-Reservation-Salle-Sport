import React from 'react'

import Table from 'react-bootstrap/Table';
 
import axios from 'axios';
import Header from './Header'
import { Link } from 'react-router-dom';

class Admin extends React.Component {
    
  state = {
    reservations: []
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/Admin')
      .then(res => {
        this.setState({
          reservations: res.data
         
        });
       
      })
      .catch(err => {
        console.error(err);
      });
  }
  

  render() {
    const handleDelete = async (reservation) => {
    
        try {
         
          const res = await axios.delete(`http://localhost:5000/${reservation[0]}`);
          // navigate to some other page or show a success message
         
          if (res.data.message === "Reservation deleted successfully") {
            console.log("delete")
            alert("Successful, reservation deleted")     
            
          
          }
        
       } catch (err) {
       
           console.error(err);
       }
      }
    return (
    <div className='login-container2'> 
    <Header />
      <Table style={{margin: '20px'}} >
        <thead style={{margin: '20px'}}>
          <tr style={{color:"white"}}>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Matricule</th>
            
            <th>Date de Reservation</th>
          </tr>
        </thead>
        <tbody>
          {this.state.reservations.map((reservation, index) => (
            
            <tr key={index} style={{color:"white"}}>
              <td>{reservation[4]}</td>
              
              <td>{reservation[5]}</td>
              <td>{reservation[1]}</td>
              <td>{reservation[3]}</td>
              <button  onClick={() => handleDelete(reservation)} style={{width:'10rem',height:'2rem',borderRadius:'10px',fontSize:'15px',backgroundColor:'rgba(25, 60, 86, 0.388)',color:'white',borderColor:'rgba(25, 59, 86, 0.388)'}}> DELETE </button>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    );
  }
}
export default Admin;
