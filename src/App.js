/*eslint-disable*/

import './App.css';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import React, { useState, useParams, useContext } from 'react'
import Data from './data.js';
import { Link, Route, Switch, useHistory } from 'react-router-dom'; 
import Detail from './Detail';
import axios from 'axios';
import Cart from './Cart';

let remainContext = React.createContext();

function App() {
  let [shoes, setShoes] = useState(Data);
  let [loading, setLoading] = useState(true);
  let [remain, setRemain] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    <Switch>
      <Route exact path="/">

        <div className="jumboTron">
          <h1>20% Seasons Off</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
          <Button variant="primary">Primary</Button>{' '}
        </div>

        <div className="container">

          <remainContext.Provider value={remain}>

          <div className="row">
            {
              shoes.map((a, i)=>{
                return <Item key={i} shoes={shoes[i]} i={i} />
              })
            }
          </div>

          </remainContext.Provider>
          
          <button className="btn btn-primary" onClick={()=>{
            {
              loading ? <div>Loading...</div> : null;
            }

            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result)=>{
              setLoading(false);
              setShoes([...shoes, ...result.data]);
            })
            .catch(()=>{
              setLoading(false);
            })

          }}>더보기</button>
        </div>

    
      </Route>

      <Route path="/detail/:id">
        <Detail shoes={shoes} remain={remain} setRemain={setRemain}/>
      </Route>

      <Route path="/cart">
        <Cart />
      </Route>

      <Route path="/:id">
        <div>아무거나 적었을 때 이거 보여주셈</div>
      </Route>

    </Switch> 

    </div>
  );
}

function Item({ shoes, i }){
  let remain = useContext(remainContext);
  let history = useHistory();

  return(
    <div className="col-md-4" onClick={()=>{
      history.push('/detail/' + shoes.id);
    }}>
      <img src={ "https://codingapple1.github.io/shop/shoes" + (i+1) + ".jpg" } width="100%"></img>
      <h4>{ shoes.title }</h4>
      <p>{ shoes.content } & { shoes.price }</p>
    </div>    
  );
}


export default App;
