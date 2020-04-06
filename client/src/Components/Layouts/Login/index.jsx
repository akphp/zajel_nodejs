import React, { Component } from "react";
import "./style.css";

export default class Login extends Component {
  state = {
    userName: "",
    password: "",
    error: ""
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value.trim()
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { userName, password } = this.state;
    if(!userName || !password){
      return this.setState({error: 'الرجاء ملىء جميع الحقول'});
    }
    fetch('/api/v1/login', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({password, userName})
    })
    .then(res => res.json())
    .then(res => {
      const { error } = res;
      if (error) {
        this.setState({error});
      } else {
        this.props.history.push('/');
      }
    })
    .catch((e) => {
      this.setState({error: 'هناك خطأ جرب مرة أخرى'});
    });

  };

  render() {
    const { error } = this.state;
    return (
      <div className='login'>
        <h2 className='login__title'>زاجل</h2>
        <div className='login__box'>
        <h3 className="login__box__title">تسجيل الدخول</h3>
        <form onSubmit={this.handleClick}>
          <input type="text" name="userName" id="userName" placeholder="إسم المستخدم" onChange={this.handleChange} className='login__box__input' />
          <input type="password" name="password" id="password" placeholder="كلمة المرور" onChange={this.handleChange} className='login__box__input' />
          <input type="submit" value="تسجيل الدخول" onClick={this.handleClick} className='login__box__button' />
          {error && <p className="login__box__error">{error}</p>}
          </form>
        </div>
      </div>
    );
  }
}
