import React, { Component } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import './style.css';
import { Input, notification, Icon, DatePicker,Button } from 'antd';
import Table from '../../CommonComponent/Table/Table';
import Buttoncomponent from '../../CommonComponent/Button';
import Header from "../../CommonComponent/Header/index";
import CollectionCreateForm from "./addcustomer";
import Deletepopup from "./deletecustomer";
import EditCustomer from "./editcustomer";
import WrappedComponent from '../../HOC/WithNavSide';


const { RangePicker } = DatePicker;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
 class Customers extends Component {
  state = {
    customers: [],
    title: " إدارةالمستخدمين ",
    allData: [],
    name: "",
    date: "",
    filteredcustomersDate: [],
    filteredcustomersName: [],
    visible: false,
    loading: true,
    customersPage: {
      delete: {
        deleteVisibility: false,
        information: [],
        id: ""
      },
      edit: {
        editVisibility: false,
        id: "",
        information: []
      }
    },
    error: ""
  };
  componentDidMount() {
    fetch("/api/v1/customers")
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          this.setState({ error: res });
        }
      })
      .then(result => {
        this.setState({
          customers: result ? result.result : [],
          allData: result ? result.result : []
        });
      })
      .catch(e => this.setState({ error: e }));
  }
  filterfunction = (date, name, check) => {
    if (check === "date") {
      if (date.length !== 0) {
        if (this.state.name)
          this.dateFilter(date, this.state.filteredcustomersName, date);
        else this.dateFilter(date, this.state.allData, date);
      } else {
        if (this.state.name) {
          this.nameFilter(this.state.name, this.state.allData);
          this.setState({ date: "", filterCustomerDate: [] });
        } else
          this.setState({
            customers: this.state.allData,
            date: "",
            filterCustomerDate: []
          });
      }
    } else if (check === "name") {
      if (name) {
        if (this.state.date)
          this.nameFilter(name, this.state.filteredcustomersDate);
        else this.nameFilter(name, this.state.allData);
      } else {
        if (this.state.date) {
          this.dateFilter(this.state.date, this.state.allData);
          this.setState({ name, filterCustomerName: [] });
        } else this.setState({ customers: this.state.allData, name });
      }
    } else {
      
      this.setState(
        { customers: this.state.allData ,
          name:'',
          date:''
        });}
  };
  dateFilter = (value, customers) => {
    if (value.length !== 0) {
      const from = value[0]._d.setHours(0, 0, 0, 0);
      const to = value[1]._d.setHours(0, 0, 0, 0);
      let filterCustomer = customers.filter(customer => {
        let createdDate = new Date(customer.dt_create_at).setHours(0, 0, 0, 0);
        if (createdDate >= from && createdDate <= to) return customer;
      });
      this.setState({
        customers: filterCustomer,
        date: value,
        filteredcustomersDate: filterCustomer
      });
    } else {
      this.setState({
        customers: this.state.allData
      });
    }
  };
  nameFilter = (name, customers) => {
    const value = name.trim();
    let filterCustomerName = customers.filter(customer => {
      if (customer.s_name.includes(value)) return customer;
    });
    this.setState({
      customers: filterCustomerName,
      name,
      filteredcustomersName: filterCustomerName
    });
  };
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
      duration: 2
    });
  };

  showModal = () => {
    this.setState(prev => {
      return { visible: !prev.visible };
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        this.openNotificationWithIcon("error", err);
      } else if (values) {
        let addCustomer = {
          name: values.name,
          email: values.email,
          phone: values.prefixPhone + values.phone,
          status: values.status ==="true" ? true:false,
          address: values.address,
          password: values.password
        };
        fetch("api/v1/addcustomer", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(addCustomer)
        })
          .then(res => res.json())
          .then(result => {
            if (result.result) {
              let newcustomer = [...this.state.customers];
              newcustomer.push(result.result[0]);
              let newallData = [...this.state.allData];
              newallData.push(result.result[0]);
              this.setState({
                customers: newcustomer,
                allData: newallData
              });
              this.openNotificationWithIcon("success", "تمت الاضافة بنجاح");
              form.resetFields();
              this.setState({ visible: false });
            } else this.openNotificationWithIcon("error", result.error);
          })
          .catch(() =>
            this.openNotificationWithIcon("error", "خطأ في ارسال البيانات")
          );
      }
    });
  };
  handleClick = (value1, value2, value3, information, id) => e => {
    const { customersPage } = this.state;
    this.setState(prev => {
      return {
        [value1]: {
          ...customersPage,
          [value2]: {
            [value3]: !prev[value1][value2][value3],
            information,
            id
          }
        }
      };
    });
  };
  deleteRowCustomer = (id, data) => {
    this.setState(prev => {
      return {
        customers: prev.customers.filter(data => data.pk_i_id !== id)
      };
    });
  };
  updateState = (id, editedCustomer) => {
    let editcustomer = this.state.customers.map(customer => {
      if (customer.pk_i_id === id) {
        return editedCustomer[0];
      }
      return customer;
    });
    this.setState({
      customers: editcustomer
    });
  };
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  editFormRef = formEdit => {
    this.formEdit = formEdit;
  };
  render() {
    if (this.state.customers && !this.state.error) {
      return (
        <div className="containercustomers">
          <div className="conatinercustomers__customer">
            <Header title="إدارة المستخدمين" Icon={<Icon type="team" />} />
            <div className="addcustomer">
              <Buttoncomponent
                name="إضافة مستخدم"
                icon={<Icon type="user" />}
                onClick={this.showModal}
              />
              <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
                onchange={this.onchange}
              />
              <Deletepopup
                visible={this.state.customersPage.delete.deleteVisibility}
                changevisibility={this.handleClick}
                id={this.state.customersPage.delete.id}
                updateState={this.deleteRowCustomer}
              />

              <EditCustomer
                visible={this.state.customersPage.edit.editVisibility}
                information={this.state.customersPage.edit.information}
                changevisibility={this.handleClick}
                wrappedComponentRef={this.editFormRef}
                id={this.state.customersPage.edit.id}
                updateState={this.updateState}
              />
              <div className="filtercontainer">
              <Button onClick={e=>this.filterfunction("","","empty")}>إفراغ الحقول</Button>
                <div className="filtercontainer__orderdate">
                  <RangePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={["من", "الى"]}
                    onChange={e => this.filterfunction(e, "", "date")}
                    className="containercustomers__customer-rangpicker"
                    value={this.state.date}
                  />
                  <span className="filtercontainer__orderdate-date">
                    فلترة حسب الوقت
                  </span>
                </div>
                <Input
                  size="defaul"
                  placeholder="فلترة حسب الاسم"
                  className="filtercontainer__ordername"
                  onChange={e =>
                    this.filterfunction("", e.target.value, "name")
                  }
                  value={this.state.name}
                />
              </div>
            </div>
            <Table
              pageName="customers"
              columns={this.state.customers}
              classname="tablecustomer-container"
              className="table"
              handleClick={this.handleClick}
            />
          </div>
        </div>
      );
    } else if (!this.state.error) {
      return (
        <div className="sweet-loading">
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
    } else {
      return (
        <h1 className="customer-error">
          {this.state.error.status} {this.state.error.statusText}
        </h1>
      );
    }
  }
}

export default WrappedComponent(Customers);
