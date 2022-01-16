import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

let alertInitial = true;

function reducer2(state = alertInitial, action){
  if(action.type === 'alert닫기'){
    state = false;
    return state;
  }
  else {
    return state;
  }
}

let initialState = [
  { id: 0, name: '빨간 신발', quan: 2}, 
      { id: 1, name: '파란 신발', quan: 3},
      { id: 2, name: '노란 신발', quan: 0} 
];

function reducer(state = initialState, action){  //  default 파라미터 문법
  if( action.type === '항목추가'){
    
    let found = state.findIndex((a)=>{return a.id === action.데이터.id});

    if (found >= 0) {
      let copy = [...state];
      copy[found].quan++;
      return copy;
    } 
    else {
      let copy = [...state];
      copy.push(action.데이터);
      return copy;
    }
  }
  else if(action.type === '수량증가'){
    let copy = [...state];
    copy[action.데이터].quan++;
    return copy;
  }
  else if(action.type === '수량감소'){
    let copy = [...state];
    copy[action.데이터].quan--;
    return copy;
  }
  else{
    return state;
  }
}

let store = createStore(combineReducers({reducer, reducer2}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
