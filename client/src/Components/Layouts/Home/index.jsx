import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { Icon } from "antd";

import CountBox from "../../CommonComponent/CountBox";
import Header from '../../CommonComponent/Header';
import WrappedComponent from '../../HOC/WithNavSide';

import "./style.css";

class Home extends Component {
  state = {
    counts: {
      captains: '',
      customers: '',
      orders: ''
    },
    error: ''
  };
  componentDidMount() {
    fetch('/api/v1/counts')
    .then(res => res.json())
    .then((res) => {
      const { error, result} = res;
      if(error === 'unauthorized'){
        this.props.history.push('/login');
      } else if (result) {
        this.setState({counts: result})
      } else {
        this.setState({error});
      }
    })
    .catch(() => {
      this.setState({error: 'Something error please try again'});
    })
  }
  render() {
    const {error, counts: {captains, customers, orders}} = this.state;
    return (
      <>
      <Header title = "الصفحة الرئيسية" Icon = {<Icon type="home" />} />
      <div className="box">
        <div className="box__container">
          <CountBox
            title="الزبائن"
            number={customers}
            color="#156FE9"
            icon={<Icon type="team" />}
          />
        </div>
        <div className="box__container">
          <CountBox
            title="الكباتن"
            number={captains}
            color="#F86363"
            icon={<Icon type="car" />}
          />
        </div>
        <div className="box__container">
          <CountBox
            title="الطلبات"
            number={orders}
            color="#55B690"
            icon={<Icon type="shopping-cart" />}
          />
        </div>
        <div className="box__error">{error}</div>
      </div>
      </>
    );
  }
}

export default WrappedComponent(withRouter(Home));
