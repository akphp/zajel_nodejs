import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Header from "../../CommonComponent/Header";
import Table from "../../CommonComponent/Table/Table";
import DeletePopup from "./Popups/deletePopup";
import View from "./Popups/viewPopUp";
import WrappedComponent from "../../HOC/WithNavSide";
import EditOrder from "./Popups/EditOrder";

import { notification, Icon } from "antd";

class Viewcaptain extends Component {
  state = {
    columns: [],
    name: "",
    email: "",
    id_number: "",
    phone_number: "",
    status: "",
    address: "",
    licience_number: "",
    avatar: "",
    visible: false,
    singleCaptain: {
      editVisibilty: false,
      deleteVisibility: false,
      viewVisibility: false,
      id: "",
      information: null
    },
    stores: []
  };

  openNotification(message, description) {
    notification.open({
      message: message,
      description,
      icon: <Icon type="meh" style={{ color: "#108ee9" }} />
    });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`/api/v1/getCaptainDetails/${id}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        if (res.notFound) {
          this.props.history.push("/not-found");
        } else if (res.result) {
          const rows = res.result[0];
          fetch(`/api/v1/image/${rows.s_image}`)
            .then(res => res.arrayBuffer())
            .then(response => {
              const {
                s_name,
                s_email,
                s_id_number,
                s_mobile_number,
                status,
                s_address,
                s_driver_licence_number
              } = rows;
              let typeArray = new Uint8Array(response);
              const stringChar = String.fromCharCode.apply(null, typeArray);
              this.setState({
                name: s_name,
                email: s_email,
                id_number: s_id_number,
                phone_number: s_mobile_number,
                status,
                address: s_address,
                licience_number: s_driver_licence_number,
                avatar: stringChar
              });
            });
        } else {
          this.openNotification("يتعذر", res.error);
        }
      });
    fetch(`/api/v1/getCaptainOrders/${id}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        if (res.result) {
          const rows = res.result;
          this.convertToObjectForTable(rows);
        } else {
          this.openNotification("يتعذر", res.error);
        }
      })

      .catch(err => {
        this.openNotification("يتعذر", "هناك خطأ ما الرجاء اعادة المحاولة");
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
      obj.customer = result[key][0].name;
      obj.price = result[key][0].total + "$";
      obj.place = result[key][0].place_name;
      obj.items = result[key][0].items_names;
      obj.phone = result[key][0].phone;
      obj.address = result[key][0].address;
      return obj;
    });
    this.setState({ columns: table });
  };

  deleteRow = id => {
    this.setState(prev => {
      return { columns: prev.columns.filter(data => data.key !== id) };
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
      const columns = prev.columns.map(column => {
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
      return {columns}
    });
  };

  render() {
    const {
      columns,
      avatar,
      name,
      email,
      address,
      id_number,
      licience_number,
      phone_number,
      status,
      singleCaptain
    } = this.state;
    return (
      <div>
        <Header Icon={<img src={avatar} className="avatar" />} title={name} />

        <div className="view-captain">
          <div className="profile">
            <div className="profile__info">
              <h3 className="profile__info__title">المعلومات الشخصية</h3>
              <div className="profile__box">
                <p className="profile__box__title">الاسم</p>
                <p className="profile__value">{name}</p>
              </div>
              <div className="profile__box">
                <p className="profile__box__title">الهاتف المحمول</p>
                <p className="profile__value">{phone_number}</p>
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
              <div className="profile__box">
                <p className="profile__box__title">رقم الرخصة</p>
                <p className="profile__value">{licience_number}</p>
              </div>
              <div className="profile__box">
                <p className="profile__box__title">رقم الهوية</p>
                <p className="profile__value">{id_number}</p>
              </div>
            </div>
          </div>

          <div className="view-captain-orders">
            <h2 className="view-captain-orders-title">
              الطلبات الخاصة بالكابتن
            </h2>
            <div className="order-table">
              <Table
                pageName="singleCaptain"
                columns={columns}
                viewValues={this.handleClick}
                EditPopup={EditOrder}
                stores={this.state.stores}
                updateOrdersStateVariable={this.updateOrdersStateVariable}
              />
              <DeletePopup
                visible={singleCaptain.deleteVisibility}
                visibleFun={this.handleClick}
                id={singleCaptain.id}
                updateState={this.deleteRow}
              />
              <View
                visible={singleCaptain.viewVisibility}
                visibleFun={this.handleClick}
                id={singleCaptain.id}
                information={singleCaptain.information}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WrappedComponent(withRouter(Viewcaptain));
