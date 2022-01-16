import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { Nav } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

// let box = styled.div`
//   padding: 20px;
// `;


function Detail(props){
  let [show, setShow] = useState(true);
  let [input, setInput] = useState('');
  let [tab, setTab] = useState(0);
  let [aniSwitch, setAniSwitch] = useState(false);

  let remainCopy = [...props.remain];
  console.log(remainCopy);

  useEffect(()=>{
    let timer = setTimeout(()=>{ setShow(false) } , 2000);
    return () => { clearTimeout(timer) }; 
  }, [show])

  let history = useHistory();
  let { id } = useParams();
  
  let Box = styled.div`
    padding: 20px;
  `;

  let Title = styled.h4`
    font-size: 25px;
  `;


  return(
    <div className="container">
      <Box><Title className="red">Detail</Title></Box>

      {input}

      <input onChange={(e)=>{
        setInput(e.target.value);
      }} />
      
      { show ? ( <div className="myAlert">
        <p>재고가 얼마 남지 않았습니다.</p>
      </div> ) : null}
      
      <div className="row">

        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>

        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>

          <Remain remain={ props.remain }/>

          <button className="btn btn-danger" onClick={()=>{
            remainCopy[0]--;
            props.setRemain([remainCopy[0]]);
            props.dispatch({type : '항목추가', 데이터 : {id: props.shoes[id].id, name:props.shoes[id].title, quan:1}});
            history.push('/cart');
          }}>주문하기</button>
          

          <button className="btn btn-danger" onClick={() => {
            history.goBack();
          }}>뒤로가기</button> 

        </div>

      </div>

      <Nav className='mt-5' variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{
            setAniSwitch(false);
            setTab(0);
          }}>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{
            setAniSwitch(false); 
            setTab(1 );
          }}>Option 2</Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={aniSwitch} classNames="wow" timeout={500}>
        <TabContent tab={tab} setAniSwitch={setAniSwitch } />
      </CSSTransition>

    </div> 
  );
}

function TabContent({ tab, setAniSwitch }){
  
  useEffect(()=>{
    setAniSwitch(true);
  });

  if (tab === 0) {
    return <div>0번째</div>
  }  
  else if (tab === 1) {
    return <div>1번째</div>
  }
  else {
    return <div>2번째</div>
  }
  
}

function Remain({ remain }){
  return(
    <div>
      <p>재고 : {remain[0]}</p>
    </div>
  );
}

function 함수명(state){
  return {
    state : state.reducer,
    alertOpen : state.reducer2
  }
}
export default connect(함수명)(Detail);
