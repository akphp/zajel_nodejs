import React, { Component } from "react";
import { withRouter } from "react-router";
import { Table, Divider, Tag, Icon } from "antd";
import PropTypes from "prop-types";
import DropdownMenu from "./dropdownMenu";
import "./style.css";

class TableCmponent extends Component {
  state = {
    pageSize: "10"
  };

  paginationSize = pageSize => {
    this.setState({ pageSize });
  };

  componentWillReceiveProps(props){
    this.setState({pageSize: props.columns.length})
  }
  render() {
    const {
      ViewPopup,
      columns,
      EditPopup,
      DeletePopup
    } = this.props;
    const { pageSize } = this.state;
    const { Column } = Table;
    if (this.props.pageName === "orders") {
      return (
        <div className="table-container">
          <DropdownMenu
            pageSize={pageSize}
            paginationSize={this.paginationSize}
          />
          <Table
            dataSource={columns}
            pagination={{
              pageSize: isNaN(pageSize) ? columns.length : parseInt(pageSize)
            }}
          >
            <Column title="إسم الزبون" dataIndex="customer" key="customer" />
            <Column title="التاريخ" dataIndex="date" key="date" />
            <Column title="إسم الكابتن" dataIndex="captain" key="captain" />
            <Column
              title="الحالة"
              dataIndex="b_status"
              key="b_status"
              render={b_status => (
                <span>
                  <Tag
                    color={
                      b_status == 0
                        ? "volcano"
                        : b_status == 1
                        ? "green"
                        : "blue"
                    }
                    key={b_status}
                  >
                    {b_status == 1
                      ? "تم"
                      : b_status == 0
                      ? "قيد التنفيذ"
                      : b_status}
                  </Tag>
                </span>
              )}
            />
            <Column title="السعر" dataIndex="price" key="price" />
            <Column
              title="خيارات"
              key="options"
              render={(text, record) => (
                <span>
                  <ViewPopup 
                   customerName={record.customer}
                   phoneNumber={record.phone ? record.phone : ""}
                   customerAddress={record.address}
                   itemsArray={record.items}
                   storeId={record.storeid}
                   stores={this.props.stores}
                   orderId={record.key}
                   orderPrice={record.price}
                   captainName={record.captain}
                   orderDate={record.date}
                  />
                  <Divider type="vertical" />
                  <EditPopup
                    customerName={record.customer}
                    phoneNumber={record.phone ? record.phone : ""}
                    customerAddress={record.address}
                    itemsArray={record.items}
                    storeId={record.storeid}
                    stores={this.props.stores}
                    orderId={record.key}
                    updateItemsStateVariable={this.props.updateItemsStateVariable}
                    updateOrdersStateVariable={this.props.updateOrdersStateVariable}
                  />

                  <Divider type="vertical" />

                  <DeletePopup
                    deleteRow={this.props.deleteRow}
                    id={record.key}
                  />
                </span>
              )}
            />
          </Table>
        </div>
      );
    } else if (this.props.pageName === "customers") {
      return (
        <div className="tablecustomer-container">
          <DropdownMenu
            pageSize={pageSize}
            paginationSize={this.paginationSize}
          />
          <Table
            dataSource={columns}
            pagination={{
              pageSize: isNaN(pageSize) ? columns.length : parseInt(pageSize)
            }}
          >
            <Column title="إسم الزبوون" dataIndex="s_name" key="customer" />
            <Column title="البريد الإلكتروني" dataIndex="s_email" key="email" />
            <Column
              title="رقم الجوال"
              dataIndex="s_mobile_number"
              key="mobileNo"
            />
            <Column
              title="الحالة"
              dataIndex="b_status"
              key="status"
              render={status => (
                <span>
                  <Tag
                    color={
                      status === false
                        ? "volcano"
                        : status === true
                        ? "green"
                        : "blue"
                    }
                    key={status}
                  >
                    {status === true
                      ? "فعال"
                      : status === false
                      ? "غير فعال"
                      : status}
                  </Tag>
                </span>
              )}
            />
            <Column
              title="خيارات"
              key="options"
              render={(text, record) => (
                <span>
                  <Icon
                    onClick={() => {
                      this.props.history.push(
                        `/customers/profile/${record.pk_i_id}`
                      );
                    }}
                    style={{
                      fontSize: "1.2rem",
                      color: "rgba(0, 0, 0, 0.65)"
                    }}
                    type="profile"
                  />
                  <Divider type="vertical" />
                  <Icon
                    onClick={this.props.handleClick(
                      "customersPage",
                      "edit",
                      "editVisibility",
                      record,
                      record.pk_i_id
                    )}
                    style={{
                      fontSize: "1.2rem",
                      color: "rgba(0, 0, 0, 0.65)"
                    }}
                    type="edit"
                  />
                  <Divider type="vertical" />
                  <Icon
                    onClick={this.props.handleClick(
                      "customersPage",
                      "delete",
                      "deleteVisibility",
                      record,
                      record.pk_i_id
                    )}
                    style={{
                      fontSize: "1.2rem",
                      color: "rgba(0, 0, 0, 0.65)"
                    }}
                    type="delete"
                  />
                </span>
              )}
            />
          </Table>
        </div>
      );
    } else if (this.props.pageName === "singleCustomer") {
      return (
        <div className="table-container">
          <DropdownMenu
            pageSize={pageSize}
            paginationSize={this.paginationSize}
          />
          <Table
            dataSource={columns}
            pagination={{
              pageSize: isNaN(pageSize) ? columns.length : parseInt(pageSize)
            }}
          >
            <Column title="إسم الكابتن" dataIndex="captain" key="captain" />
            <Column title="التاريخ" dataIndex="date" key="date" />
            <Column
              title="الحالة"
              dataIndex="status"
              key="status"
              render={status => (
                <span>
                  <Tag
                    color={
                      status === "جاري التنفيذ"
                        ? "#FFC700"
                        : status === "تم"
                        ? "green"
                        : "blue"
                    }
                    key={status}
                  >
                    {status}
                  </Tag>
                </span>
              )}
            />
            <Column title="السعر" dataIndex="price" key="price" />
            <Column
              title="خيارات"
              key="options"
              render={(text, record) => (
                <span>
                  <Icon
                    onClick={this.props.viewValues(
                      "singleCustomer",
                      "viewVisibility",
                      record.key,
                      record
                    )}
                    style={{
                      fontSize: "1.2rem",
                      color: "rgba(0, 0, 0, 0.65)"
                    }}
                    type="profile"
                  />
                  <Divider type="vertical" />
                  <EditPopup
                    customerName={record.captain}
                    phoneNumber={record.phone ? record.phone : ""}
                    customerAddress={record.address}
                    itemsArray={record.items}
                    storeId={record.storeId}
                    stores={this.props.stores}
                    orderId={record.key}
                    updateOrdersStateVariable={this.props.updateOrdersStateVariable}
                  />
                  <Divider type="vertical" />
                  <Icon
                    onClick={this.props.viewValues(
                      "singleCustomer",
                      "deleteVisibility",
                      record.key,
                      record
                    )}
                    style={{
                      fontSize: "1.2rem",
                      color: "rgba(0, 0, 0, 0.65)"
                    }}
                    type="delete"
                  />
                </span>
              )}
            />
          </Table>
        </div>
      );
    } else if (this.props.pageName === "captains") {
      return (
        <div className="table-container">
          <DropdownMenu
            pageSize={this.state.pageSize}
            paginationSize={this.paginationSize}
          />
          <Table
            dataSource={columns}
            pagination={{
              pageSize: isNaN(this.state.pageSize)
                ? columns.length
                : parseInt(this.state.pageSize)
            }}
          >
            <Column title="إسم الكابتن" dataIndex="s_name" key="captain" />
            <Column title="البريد الإلكتروني" dataIndex="s_email" key="email" />
            <Column
              title="رقم الجوال"
              dataIndex="s_mobile_number"
              key="mobileNo"
            />
            <Column title="العنوان" dataIndex="s_address" key="address" />
            <Column
              title="الحالة"
              dataIndex="b_status"
              key="status"
              render={status => (
                <span>
                  <Tag
                    color={
                      status === false
                        ? "volcano"
                        : status === true
                        ? "green"
                        : "blue"
                    }
                    key={status}
                  >
                    {status === true
                      ? "فعال"
                      : status === false
                      ? "غير فعال"
                      : status}
                  </Tag>
                </span>
              )}
            />
            <Column
              title="خيارات"
              key="options"
              render={(text, record) => (
                <span>
                  <Icon
                    onClick={() => {
                      this.props.history.push(
                        `/captains/profile/${record.pk_i_id}`
                      );
                    }}
                    style={{
                      fontSize: "1.2rem",
                      color: "rgba(0, 0, 0, 0.65)"
                    }}
                    type="profile"
                  />
                  <Divider type="vertical" />
                  <Icon onClick={this.props.handleClick("captainsPage","edit","editVisibility",record,record.pk_i_id)}
                    style={{
                      fontSize: "1.2rem",
                      color: "rgba(0, 0, 0, 0.65)"
                    }}
                    type="edit"
                  />
                  <Divider type="vertical" />
                  <Icon
                    onClick={this.props.handleClick(
                      "captainsPage",
                      "delete",
                      "deleteVisibility",
                      record,
                      record.pk_i_id
                    )}
                    style={{
                      fontSize: "1.2rem",
                      color: "rgba(0, 0, 0, 0.65)"
                    }}
                    type="delete"
                  />
                </span>
              )}
            />
          </Table>
        </div>
      );
    } else if (this.props.pageName === "singleCaptain") {
      return (
        <div className="table-container">
          <DropdownMenu
            pageSize={pageSize}
            paginationSize={this.paginationSize}
          />
          <Table
            dataSource={columns}
            pagination={{
              pageSize: isNaN(pageSize) ? columns.length : parseInt(pageSize)
            }}
          >
            <Column title="إسم الزبون" dataIndex="customer" key="customer" />
            <Column title="التاريخ" dataIndex="date" key="date" />
            <Column
              title="الحالة"
              dataIndex="status"
              key="status"
              render={status => (
                <span>
                  <Tag
                    color={
                      status === "جاري التنفيذ"
                        ? "#FFC700"
                        : status === "تم"
                        ? "green"
                        : "blue"
                    }
                    key={status}
                  >
                    {status}
                  </Tag>
                </span>
              )}
            />
            <Column title="السعر" dataIndex="price" key="price" />

            <Column
              title="خيارات"
              key="options"
              render={(text, record) => (
                <span>
                  <Icon
                    onClick={this.props.viewValues(
                      "singleCaptain",
                      "viewVisibility",
                      record.key,
                      record
                    )}
                    style={{
                      fontSize: "1.2rem",
                      color: "rgba(0, 0, 0, 0.65)"
                    }}
                    type="profile"
                  />
                  <Divider type="vertical" />
                  <EditPopup
                    customerName={record.customer}
                    phoneNumber={record.phone ? record.phone : ""}
                    customerAddress={record.address}
                    itemsArray={record.items}
                    storeId={record.storeId}
                    stores={this.props.stores}
                    orderId={record.key}
                    updateOrdersStateVariable={this.props.updateOrdersStateVariable}
                  />
                  <Divider type="vertical" />
                  <Icon
                    onClick={this.props.viewValues(
                      "singleCaptain",
                      "deleteVisibility",
                      record.key,
                      record
                    )}
                    style={{
                      fontSize: "1.2rem",
                      color: "rgba(0, 0, 0, 0.65)"
                    }}
                    type="delete"
                    className={record.key}
                  />
                </span>
              )}
            />
          </Table>
        </div>
      );
    }
  }
}

TableCmponent.propTypes = {
  columns: PropTypes.array.isRequired,
  viewPopup: PropTypes.func.isRequired,
  editPopup: PropTypes.func.isRequired,
  deletePopup: PropTypes.func.isRequired
};

const TableComponent = withRouter(TableCmponent);

export default TableComponent;
