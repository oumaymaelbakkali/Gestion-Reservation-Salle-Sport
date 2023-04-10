import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Header from '../components/Header'
import './Login.css'
import { Link } from 'react-router-dom';
     
function NoTransitionExample() {
  
  return (
  <>
    <Header/>
    <Carousel slide={false}>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="./img/picture6.jpg"
          alt="Second slide"
         
        />
         <Carousel.Caption className='ButtonCarr'>
        <h2>UEMF GYM</h2>
        <p style={{fontSize:'20px'}}>
          Your health account, your bank account, they’re the same thing. The more you put in, the more you can take out.
          </p>
          <Link to = {`/Reservation`} > <button style={{width:'10rem',height:'3rem',borderRadius:'15px',fontSize:'20px',backgroundColor:'rgba(25, 60, 86, 0.388)',color:'white',borderColor:'rgba(25, 59, 86, 0.388)'}}> Reserve </button></Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./img/picture2.jpg"
          alt="Second slide"
         
        />

      <Carousel.Caption className='ButtonCarr'>
        <h2>UEMF GYM</h2>
        <p style={{fontSize:'20px'}}>
          Your health account, your bank account, they’re the same thing. The more you put in, the more you can take out.
          </p>
          <Link to = {`/Reservation`} > <button style={{width:'10rem',height:'3rem',borderRadius:'15px',fontSize:'20px',backgroundColor:'#95621066',color:'white',borderColor:'#95621066'}}> Reserve </button></Link>
      </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  >
      <img
          className="d-block w-100"
          src="./img/picture4.jpg"
          alt="Second slide"
         
        />

        <Carousel.Caption className='ButtonCarr'>
        <h2>UEMF GYM</h2>
        <p style={{fontSize:'20px'}}>
          Your health account, your bank account, they’re the same thing. The more you put in, the more you can take out.
          </p>
          <Link to = {`/Reservation`} > <button style={{width:'10rem',height:'3rem',borderRadius:'15px',fontSize:'20px',backgroundColor:'#95621066',color:'white',borderColor:'#95621066'}}> Reserve </button></Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  );
}

export default NoTransitionExample;