import React from 'react';
import ReactDOM from 'react-dom';
import style from './index.css';

const Index = () => {
  return <div className={style.red}>Hello, React! Invoices</div>;
};

ReactDOM.render(<Index />, document.getElementById('index'));
