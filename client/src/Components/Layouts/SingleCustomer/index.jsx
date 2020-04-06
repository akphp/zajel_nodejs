import React, { Component } from "react";
import { Icon } from "antd";
import axios from "axios";
import { withRouter } from "react-router-dom";

import Header from "../../CommonComponent/Header";
import Table from "../../CommonComponent/Table/Table";
import EditOrder from "./Popups/EditOrder";
import DeletePopup from "./Popups/deletePopup";
import View from "./Popups/viewPopUp";
import WrappedComponent from "../../HOC/WithNavSide";

import "./style.css";

class Profile extends Component {
  state = {
    personalInformation: {
      name: "",
      phone: "",
      status: "",
      email: "",
      address: "",
      avatar: ""
    },
    visible: false,
    stores: [],
    error: "",
    tableInfo: [],
    singleCustomer: {
      editVisibilty: false,
      deleteVisibility: false,
      viewVisibility: false,
      id: "",
      information: null
    }
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    let customerInformation;
    fetch(`/api/v1/getCustomerDetails/${id}`)
      .then(res => res.json())
      .then(res => {
        const { error, result } = res;
        if (res.notFound) {
          this.props.history.push("/not-found");
        } else if (error === "unauthorized") {
          this.props.history.push("/login");
        } else if (result) {
          customerInformation = result[0];
          return fetch(`/api/v1/image/${result[0].s_image}`);
        } else {
          this.setState({ error });
        }
      })
      .then(res => res.arrayBuffer())
      .then(response => {
        const {
          s_name,
          s_mobile_number,
          s_email,
          status,
          s_address
        } = customerInformation;
        let typeArray = new Uint8Array(response);
        const stringChar = String.fromCharCode.apply(null, typeArray);
        this.setState({
          personalInformation: {
            name: s_name,
            phone: s_mobile_number,
            email: s_email,
            status,
            address: s_address,
            avatar: stringChar
          }
        });
        return fetch(`/api/v1/getCustomerOrders/${id}`);
      })
      .then(res => res.json())
      .then(res => {
        const { error } = res;
        if (error) this.setState({ error });
        else {
          this.convertToObjectForTable(res.result);
        }
      })
      .catch(() => {
        this.setState({ error: "Something error please try again" });
      });

    axios
      .get("/api/v1/getStores")
      .then(res => {
        if (res) {
          this.setState({ stores: res.data });
        }
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  convertToObjectForTable = results => {
    const table = results.map(result => {
      const obj = {};
      const key = Object.keys(result)[0];
      obj.key = key;
      obj.date = result[key][0].date.split("T")[0];
      obj.status = result[key][0].status;
      obj.captain = result[key][0].name;
      obj.price = result[key][0].total + "$";
      obj.place = result[key][0].place_name;
      obj.items = result[key][0].items_names;
      obj.phone = result[key][0].phone;
      obj.address = result[key][0].address;
      return obj;
    });
    this.setState({ tableInfo: table });
  };
  deleteRow = id => {
    this.setState(prev => {
      return { tableInfo: prev.tableInfo.filter(data => data.key !== id) };
    });
  };
  handleClick = (value1, value2, id, information) => e => {
    this.setState(prev => {
      return {
        [value1]: {
          [value2]: !prev[value1][value2],
          id,
          information
        }
      };
    });
  };

  updateOrdersStateVariable = (
    storeId,
    storeName,
    phone,
    address,
    itms,
    orderId
  ) => {
    this.setState(prev => {
      const columns = prev.tableInfo.map(column => {
        if (column.key === orderId) {
          column.address = address;
          column.items = itms.map(itm => {
            return { f1: itm.itemid, f2: itm.name, f3: itm.price };
          });
          column.phone = phone;
          column.place = storeName;
          column.price = itms.reduce((acc, ele) => (acc += ele.price), 0);
        }
        return column;
      });
      return {tableInfo: columns}
    });
  };
  render() {
    const {
      personalInformation: { name, phone, status, email, address, avatar },
      tableInfo,
      singleCustomer: { id, information }
    } = this.state;
    return (
      <div>
        <Header Icon={<img src={avatar} className="avatar" />} title={name} />
        <div className="profile">
          <div className="profile__info">
            <h3 className="profile__info__title">المعلومات الشخصية</h3>
            <div className="profile__box">
              <p className="profile__box__title">الاسم</p>
              <p className="profile__value">{name}</p>
            </div>
            <div className="profile__box">
              <p className="profile__box__title">الهاتف المحمول</p>
              <p className="profile__value">{phone}</p>
            </div>
            <div className="profile__box">
              <p className="profile__box__title">الحالة</p>
              <p className="profile__value">{status}</p>
            </div>
            <div className="profile__box">
              <p className="profile__box__title">البريد الالكتروني</p>
              <p className="profile__value">{email}</p>
            </div>
            <div className="profile__box">
              <p className="profile__box__title">العنوان</p>
              <p className="profile__value">{address}</p>
            </div>
          </div>
          <div className="profile__orders">
          <h2 className="view-captain-orders-title">
              الطلبات الخاصة بالكابتن
            </h2>
            <Table
              pageName="singleCustomer"
              columns={tableInfo}
              viewValues={this.handleClick}
              EditPopup={EditOrder}
              stores={this.state.stores}
              updateOrdersStateVariable={this.updateOrdersStateVariable}
            />
            <DeletePopup
              visible={this.state.singleCustomer.deleteVisibility}
              visibleFun={this.handleClick}
              id={id}
              updateState={this.deleteRow}
            />
            <View
              visible={this.state.singleCustomer.viewVisibility}
              visibleFun={this.handleClick}
              id={id}
              information={information}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WrappedComponent(withRouter(Profile));
