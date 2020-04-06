import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import PropTypes from 'prop-types';

const DropdownMenu = ({ pageSize, paginationSize }) => {
  const handleMenuClick = e => {
    paginationSize(e.key);
  };
  const numberMenu = () => {
    let size = pageSize;
    let total = 0;
    let number = [];
    while (Math.floor(size / 10)) {
      total += 10;
      number.push(total);
      size -= 10;
    }
    return number;
  };
  
  const menu = (
    <Menu onClick={handleMenuClick}>
      {numberMenu().map(number => <Menu.Item key={number}>{number}</Menu.Item>)}
      <Menu.Divider />
      <Menu.Item key="الكل">الكل</Menu.Item>
    </Menu>
  );

  return (
    <div className="table-dropdown">
      {` عرض `}
      <Dropdown overlay={menu} trigger={['click']}>
        <span className="ant-dropdown-link">
          <span>
            {numberMenu().length? numberMenu()[0] : 'الكل'}
          </span>
          <Icon type="down" />
        </span>
      </Dropdown>
      {` عناصر `}
    </div>
  );
};

DropdownMenu.propTypes = {
  pageSize: PropTypes.string.isRequired,
  paginationSize: PropTypes.func.isRequired
};

export default DropdownMenu;
