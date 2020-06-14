import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, NavLink as Link, Switch } from 'react-router-dom'
import Home from './pages/home/home'
import Edit from './pages/edit/edit'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';


function App() {
  return (
    <Router>
      <ConfigProvider locale={zhCN}>
        <div className="App">
          <nav className="tabs">
            <Link className="tab" to="/home">首页</Link>
            <Link className="tab" to="/edit">编辑</Link>
          </nav>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/edit" component={Edit} />
          </Switch>
        </div>
      </ConfigProvider>
    </Router>
  );
}

export default App;
