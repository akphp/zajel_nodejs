import React, { Component } from "react";
import axios from "axios";
import { DatePicker, Input, Button, Icon } from "antd";
import moment, { isValid } from "moment";
import Header from "../../CommonComponent/Header/index";
import TableComponent from "../../CommonComponent/Table/Table";
import {
  EditPopup,
  DeletePopup,
  ViewPopup
} from "../../CommonComponent/Table/Popups";
import CollectionsPage from "../Order/addOrder";
import WrappedComponent from "../../HOC/WithNavSide";
import "./style.css";

class OrdersManagement extends Component {
  state = {
    orders: [],
    filteredOrders: [],
    date: "",
    status: "",
    name: "",
    error: "",
    filter: false,
    stores: [],
    refresh: true
  };

  componentDidMount() {
    axios
      .get("/api/v1//viewOrders")
      .then(res => {
        if (res.status === 204) {
          let error = [...this.state.error];
          error.response = res;
          error.response.data = "Error, No orders yet.";
          this.setState({ error });
        } else {
          this.setState({ orders: res.data });
        }
      })
      .catch(error => {
        this.setState({
          error
        });
      });
    axios
      .get("/api/v1/getStores")
      .then(res => {
        if (res) {
          this.setState({ stores: res.data });
        }
      })
      .catch(error => this.setState({ error }));
  }

  dateFilter = object => {
    if (object) {
      const { date } = this.state;
      if (date.length) {
        if (date[0] && date[1]) {
          if (date[0].isValid() && date[1].isValid()) {
            const fromDate = date[0].toDate().setHours(0, 0, 0, 0);
            const toDate = date[1].toDate().setHours(0, 0, 0, 0);
            let filtered = object.filter(order => {
              if (
                moment(order.date)
                  .toDate()
                  .setHours(0, 0, 0, 0) >= fromDate &&
                moment(order.date)
                  .toDate()
                  .setHours(0, 0, 0, 0) <= toDate
              ) {
                return true;
              }
            });
            return filtered;
          }
        }
      }
      return object;
    }
  };

  statusFilter = object => {
    if (object) {
      const { status } = this.state;
      if (status) {
        let filtered = [];
        const regex1 = new RegExp(/^[(ت)]/);
        const regex2 = new RegExp(/^[(ق)]/);
        filtered = object.filter(order => {
          if (
            (order.b_status === 1 &&
              regex1.test(status) &&
              "تم".indexOf(status) != -1) ||
            (order.b_status === 0 &&
              regex2.test(status) &&
              "قيد التنفيذ".indexOf(status) != -1)
          ) {
            return true;
          } else if (order.b_status == status) {
            return true;
          }
        });
        return filtered;
      } else {
        return object;
      }
    }
  };

  nameFilter = object => {
    if (object) {
      const { name } = this.state;
      if (name) {
        let filtered = [];
        filtered = object.filter(order => {
          if (order.captain.indexOf(name) != -1) {
            return true;
          }
        });
        return filtered;
      } else {
        return object;
      }
    }
  };

  filter = async (type, value) => {
    const { date, status, name, orders } = this.state;
    let filtered = [];
    if (type === "date") {
      await this.setState({ date: value });
      if (status) {
        filtered = this.statusFilter(orders);
        if (name) {
          filtered = this.nameFilter(filtered);
        }
        filtered = this.dateFilter(filtered);
        this.setState({ filteredOrders: filtered, filter: true });
      } else if (name) {
        filtered = this.nameFilter(orders);
        filtered = this.dateFilter(filtered);
        this.setState({ filteredOrders: filtered, filter: true });
      } else if (value.length > 0) {
        filtered = this.dateFilter(orders);
        this.setState({ filteredOrders: filtered, filter: true });
      } else {
        this.setState({ filteredOrders: [], filter: false });
      }
    } else if (type === "status") {
      await this.setState({ status: value });
      if (date) {
        filtered = this.dateFilter(orders);
        if (name) {
          filtered = this.nameFilter(filtered);
        }
        filtered = this.statusFilter(filtered);
        this.setState({ filteredOrders: filtered, filter: true });
      } else if (name) {
        filtered = this.nameFilter(orders);
        filtered = this.statusFilter(filtered);
        this.setState({ filteredOrders: filtered, filter: true });
      } else if (value.length > 0) {
        filtered = this.statusFilter(orders);
        this.setState({ filteredOrders: filtered, filter: true });
      } else {
        this.setState({ filteredOrders: [], filter: false });
      }
    } else if (type === "name") {
      await this.setState({ name: value });
      if (date) {
        filtered = this.dateFilter(orders);
        if (status) {
          filtered = this.statusFilter(filtered);
        }
        filtered = this.nameFilter(filtered);
        this.setState({ filteredOrders: filtered, filter: true });
      } else if (status) {
        filtered = this.statusFilter(orders);
        filtered = this.nameFilter(filtered);
        this.setState({ filteredOrders: filtered, filter: true });
      } else if (value.length > 0) {
        filtered = this.nameFilter(orders);
        this.setState({ filteredOrders: filtered, filter: true });
      } else {
        this.setState({ filteredOrders: [], filter: false });
      }
    }
  };

  clearFields = async () => {
    await this.setState({
      date: "",
      status: "",
      name: "",
      filter: false
    });
  };

  deleteRow = id => {
    this.setState(prev => {
      return { orders: prev.orders.filter(data => data.key !== id) };
    });
  };
  updateNewOrdersStateVariable = (storeId, phone, address, itms, orderId, customer, captain) => {
          let x = {};
          x.key = orderId;
          x.customer = customer;
          x.captain = captain;
          x.storeid = storeId;
          x.address = address;
          x.phone = phone;
          x.items = itms;
          x.b_status = 0;
          x.date = new Date(Date.now()).toLocaleString('br-BR').split(' ')[0];
          if (itms.length > 1) {
            x.price = itms.reduce((acc, nxt) => {
              return acc + Number(nxt.price);
            }, 0);
          } else if(itms[0].price) {
            x.price = parseInt(itms[0].price);
          }else {
            x.price = 0;
          }
      this.setState({ orders: this.state.orders.concat([x]) });
  }
  updateOrdersStateVariable = (storeId, phone, address, itms, orderId) => {
    this.setState(prev => {
      prev.orders.forEach(element => {
        if (element.key === orderId) {
          let x = element;
          x.storeId = storeId;
          x.address = address;
          x.phone = phone;
          x.items = itms;
          if (itms.length > 1) {
            x.price = itms.reduce((acc, nxt) => {
              return acc + Number(nxt.price);
            }, 0);
          } else {
            x.price = parseInt(itms[0].price);
          }
          return { element: x };
        }
      });
      this.setState({ refresh: !this.state.refresh });
    });
  };
  updateItemsStateVariable = (itms, orderId) => {
    let x = this.state.orders;
    x.forEach(element => {
      if (element.key === orderId) {
        element.items = itms;
        if (itms.length > 1) {
          element.price = itms.reduce((acc, nxt) => {
            return parseInt(acc.price) + parseInt(nxt.price);
          });
        } else {
          element.price = itms[0].price;
        }
      }
    });
    this.setState({ orders: x });
  };

  render() {
    const { RangePicker } = DatePicker;
    const dateFormat = "DD-MM-YYYY";
    if (!this.state.error) {
      return (
        <div className="ordersManagement-bars-container">
          <div className="ordersManagement-main-container">
            <Header title={"إدارة الطلبات"} Icon={<Icon type="carry-out" />} />
            <div className="ordersManagement_sub-container">
              <div>
                <CollectionsPage
                  updateNewOrdersStateVariable={this.updateNewOrdersStateVariable}
                />
                <div className="ordersManagement_filters-container">
                  <div className="ordersManagement_filters-container-timeFilter">
                    <p
                      style={{ textAlign: "right" }}
                      className="ordersManagemet_timePicker-lable"
                    >
                      إختر الفترة
                    </p>
                    <RangePicker
                      placeholder={["من", "إلى"]}
                      format={dateFormat}
                      onChange={e => this.filter("date", e)}
                      value={this.state.date}
                    />
                  </div>
                  <Input
                    id="statusInput"
                    onChange={e => this.filter("status", e.target.value)}
                    className="ordersManagement_status-filter-input"
                    placeholder="الفلترة حسب الحالة :"
                    value={this.state.status}
                  />
                  <Input
                    value={this.state.name}
                    onChange={e => this.filter("name", e.target.value)}
                    className="ordersManagement_status-filter-input"
                    placeholder="الفلترة حسب اسم الكابتن :"
                  />
                  <Button
                    className="ordersManagement_filter-button"
                    type="primary"
                    onClick={this.clearFields}
                  >
                    إفراغ الحقول
                  </Button>
                </div>
                <TableComponent
                  stores={this.state.stores}
                  pageName="orders"
                  ViewPopup={ViewPopup}
                  EditPopup={EditPopup}
                  DeletePopup={DeletePopup}
                  updateOrdersStateVariable={this.updateOrdersStateVariable}
                  updateItemsStateVariable={this.updateItemsStateVariable}
                  deleteRow={this.deleteRow}
                  columns={
                    this.state.filter === true
                      ? this.state.filteredOrders
                      : this.state.orders
                  }
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ordersManagement_error-class">
          <h1>
            {this.state.error.response
              ? this.state.error.response.status
              : "Error"}{" "}
            {this.state.error.response ? "Error" : ""},
            {this.state.error.response.data
              ? this.state.error.response.data
              : "try again later"}{" "}
          </h1>
        </div>
      );
    }
  }
}

export default WrappedComponent(OrdersManagement);
