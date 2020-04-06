import React, {Component} from "react";
import { withRouter } from 'react-router-dom'
import { notification } from 'antd'
import "./style.css";

class NavBar extends Component {
  state = {
    name: '',
    error: ''
  };
  componentDidMount(){
    fetch('/api/v1/getName')
    .then(res => res.json())
    .then(res => {
      const { result, error} = res;
      if( error === 'unauthorized') {
        this.props.history.push('/login');
      } else if (result) {
        this.setState({name: result[0].toUpperCase()});
      } else {
        this.setState({error});
      }
    })
    .catch(() => {
      this.setState({error: 'هناك خطأ'});
    }) 
  }
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
      duration: 1.5
    });
  };

  handleClick = () => {
    fetch('/api/v1/logout')
    .then(res => res.json())
    .then((res) => {
      if(res.result) {
        this.props.history.push('/login');
      } else {
        this.openNotificationWithIcon('error', 'هناك خطأ الرجاء المحاولة مرة اخرى')
      }
    }).catch((error) => {
      this.openNotificationWithIcon('error', 'هناك خطأ الرجاء المحاولة مرة اخرى')
    })
  }
  render() {
    const {name, error} = this.state;
    return (
      <div className="navbar">
        <h3 className="control-board">لوحة التحكم</h3>
        <div className="navbar__container">
          <div className="circle">{name || error}</div>
          <p className="logout" onClick={this.handleClick}>
            تسجيل الخروج
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
