import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import './style.css';

export default class Sidebar extends Component {
  state = {
    accounts: {
      display: 'hidden',
      arrow: 'down'
    },
    reports: {
      display: 'hidden',
      arrow: 'down'
    },
    msg: {
      display: 'hidden',
      arrow: 'down'
    },
    settings: {
      display: 'hidden',
      arrow: 'down'
    },
  }
  handleClick = (value) => (e) => {
    this.setState(prev => {
      let display = '';
      let arrow = '';
      if (prev[value].display === 'hidden') {
        display = 'block';
        arrow = 'up';
      } else {
        display = 'hidden';
        arrow = 'down';
      }
      if (value === 'accounts')
        return {
          [value]: { display, arrow, }, 
          reports: {
            display: 'hidden',
            arrow: 'down'
          },
          msg: {
            display: 'hidden',
            arrow: 'down'
          },
          settings: {
            display: 'hidden',
            arrow: 'down'
          },
        }
        if (value === 'reports')
        return {
          [value]: { display, arrow, }, 
          accounts: {
            display: 'hidden',
            arrow: 'down'
          },
          msg: {
            display: 'hidden',
            arrow: 'down'
          },
          settings: {
            display: 'hidden',
            arrow: 'down'
          },
        }
        if (value === 'msg')
        return {
          [value]: { display, arrow, }, 
          accounts: {
            display: 'hidden',
            arrow: 'down'
          },
          reports: {
            display: 'hidden',
            arrow: 'down'
          },
          settings: {
            display: 'hidden',
            arrow: 'down'
          },
        }
        if (value === 'settings')
        return {
          [value]: { display, arrow, }, 
          accounts: {
            display: 'hidden',
            arrow: 'down'
          },
          reports: {
            display: 'hidden',
            arrow: 'down'
          },
          msg: {
            display: 'hidden',
            arrow: 'down'
          },
        }
        
    });
  }
  render() {

    const { accounts, reports, msg, settings } = this.state;
    return (
      <div className="container">

        <div className="sidebar">
          <h1 className="sidebar__header">زاجل</h1>
          <div className="sidebar__bar">
            <div className='home'>
              <Link to="/" className="sidebar__links ">
                <span>
                  الرئيسية
            <Icon type="home" className='icon-style' />
                </span>

              </Link>
            </div>
            <div className='home'>
              <Link to="/orders" className="sidebar__links" >
                <span>
                  إدارة الطلبات
            {' '}
                  <Icon type="menu-unfold" className='icons-style' />
                </span>

              </Link>
            </div>


            <div className="sidebar__dropdown lists" onClick={this.handleClick('accounts')}>
              إدارة الحسابات
          {' '}

              <Icon type="tool" className='iconstyle' />
              {' '}
              <Icon type={accounts.arrow} style={{ marginLeft: '1.2rem', fontSize: '15px' }} />
            </div>
            <div className={`sidebar__dropdowncontainer ${accounts.display}`}>
              <Link to="/customers" className="sidebar__links ">
                <span>
                  المستخدمين
              <Icon type="team" className='icon-style' />
                </span>
              </Link>
              <Link to="/captains" className="sidebar__links">
                <span>
                  الكابتن
              <Icon type="car" className='icon-style' />
                </span>

              </Link>
              <Link to="/in-progress" className="sidebar__links">
                <span>
                  المشرفين
              <Icon type="star" className='icon-style' />
                </span>

              </Link>
            </div>

            <div onClick={this.handleClick('reports')} className="sidebar__dropdown lists" >

              إدارة التقارير
          {' '}
              <Icon type="profile" className='iconstyle' />
              <Icon type={reports.arrow} style={{ marginLeft: '1.3rem', fontSize: '15px' }} />

            </div>
            <div className={`sidebar__dropdowncontainer ${reports.display}`}>
              <Link to="/in-progress" className="sidebar__links ">
                <span>
                  تقارير الكابتن
              <Icon type="profile" className='icon-style' />
                </span>

              </Link>
              <Link to="/in-progress" className="sidebar__links">
                <span>
                  تقارير المستخدم
              <Icon type="profile" className='icon-style' />
                </span>

              </Link>
              <Link to="/in-progress" className="sidebar__links ">
                <span>
                  تقارير عامة
              {' '}
                  <Icon type="profile" className='icon-style' />
                </span>

              </Link>
            </div>

            <div onClick={this.handleClick('msg')} className="sidebar__dropdown lists" >

              إدارة الرسائل
          <Icon type="mail" className='icons-style' />
              <Icon type={msg.arrow} style={{ marginLeft: '1.3rem', fontSize: '15px' }} />
            </div>
            <div className={`sidebar__dropdowncontainer ${msg.display}`}>
              <Link to="/in-progress" className="sidebar__links ">
                <span>
                  رسائل قصيرة
              {' '}
                  <Icon type="mail" className='icon-style' />
                </span>

              </Link>
              <Link to="/in-progress" className="sidebar__links">
                <span>
                  اشعارات
              {' '}
                  <Icon type="bell" className='icon-style' />
                </span>

              </Link>
            </div>
            <div className='home'>

              <Link to="/in-progress" className="sidebar__links">
                <span>
                  إدارة الاستفسارات
            {' '}
                  <Icon type="wechat" className='icon-style' />
                </span>

              </Link>
            </div>
            <div className='home'>
              <Link to="/in-progress" className="sidebar__links">
                <span>
                  إدارة البروموكود
            {' '}
                  <Icon type="setting" className='icon-style' />
                </span>

              </Link>
            </div>


            <div onClick={this.handleClick('settings')} className="sidebar__dropdown lists" >

              الإعدادات
          {' '}
              <Icon type="setting" className='iconstyle' />
              <Icon type={settings.arrow} style={{ marginLeft: '1.3rem', fontSize: '15px' }} />
            </div>
            <div className={`sidebar__dropdowncontainer ${settings.display}`}>
              <Link to="/in-progress" className="sidebar__links">
                <span>
                  ثوابت النظام
              {' '}
                  {' '}
                  <Icon type="setting" className='icon-style' />
                </span>

              </Link>
              <Link to="/in-progress" className="sidebar__links">
                <span>
                  ثوابت لوحة التحكم
              {' '}
                  {' '}
                  <Icon type="control" className='icon-style' />
                </span>

              </Link>
              <Link to="/in-progress" className="sidebar__links">
                <span>
                  إدارة الاماكن العامة
              {' '}
                  {' '}
                  <Icon type="environment" className='icon-style' />
                </span>

              </Link>
            </div>
            <div className='home'>
              <Link to="/in-progress" className="sidebar__links">
                <span>
                  إتصل بنا
            {' '}
                  <Icon type="phone" className='icon-style' />
                </span>

              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
