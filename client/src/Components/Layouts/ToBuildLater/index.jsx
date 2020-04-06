import React from 'react';
import './style.css';
import { Spin, Icon } from 'antd';

import WrappedComponent from '../../HOC/WithNavSide';



const InProgress = () => {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
      <section className="onProgress">
        <div className="in-Progress">
          <Spin className="onProgressIcon" indicator={antIcon} />
          <span className="onProgressTitle">قيد الانشاء</span>
        </div>
      </section>
    );
}

export default WrappedComponent(InProgress);
