import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Sidebar from '../CommonComponent/Sidebar';
import Navbar from '../CommonComponent/Navbar';
import { notification, Spin } from 'antd'
import Login from '../Layouts/Login';

import './style.css';

export default WrappedComponent =>
  class WrappedComponentWithNavSide extends Component {
    state = {
      login: false,
      fetch : false
    }
    componentDidMount(){
      fetch ('/api/v1/checkCookie')
      .then(res => res.json())
      .then(({result}) => {
        this.setState({login: result, fetch: true});
      })
      .catch(() => {
        notification.error({message: 'هناك خطأ ما الرجاء المحاولة مرة اخرى'});
      })
    }

    render() {
      const { login, fetch } = this.state;
      if(fetch && login){
        return (
          <div className="app-side-and-nav">
            <Sidebar />
            <div className="app-nav-and-components">
            <Navbar />
            <WrappedComponent {...this.props} />
            </div>
          </div>
        );
      } 
      if( fetch && !login) {
        return <Redirect to='/login' />
      }
      return <div className="loader__hoc">
      <Spin size="large" tip="Loading..."/>
      </div>
    }
  };
