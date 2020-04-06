import React, { Component } from "react";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import { Icon, notification, Input, DatePicker,Button } from "antd";
import Table from "../../CommonComponent/Table/Table";
import Buttoncomponent from "../../CommonComponent/Button";
import Header from "../../CommonComponent/Header/index";
import CollectionCreateForm from "./Popups/AddCaptain";
import WrappedComponent from "../../HOC/WithNavSide";
import Deletepopup from "./Popups/DeleteCaptain";
import Editcaptain from './EditCaptain/editCaptain';

import "./style.css";
const { RangePicker } = DatePicker;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class Captains extends Component {
  state = {
    visible: false,
    visibleEdit: false,
    tableData: [],
    captains: [],
    allData: [],
    name: "",
    date: "",
    filteredcaptainsDate: [],
    filteredcaptainsName: [],
    captainsPage: {
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
    }
  };

  componentDidMount() {
    fetch("/api/v1/captains")
      .then(res => res.json())
      .then(result => {
        this.setState({
          captains: result.result,
          allData: result.result
        });
      });
  }
  filterfunction = (date, name, check) => {
    if (check === "date") {
      if (date.length !== 0) {
        if (this.state.name)
          this.dateFilter(date, this.state.filteredcaptainsName, date);
        else this.dateFilter(date, this.state.allData, date);
      } else {
        if (this.state.name) {
          this.nameFilter(this.state.name, this.state.allData);
          this.setState({ date: "", filterCaptainDate: [] });
        } else
          this.setState({
            captains: this.state.allData,
            date: "",
            filterCaptainDate: []
          });
      }
    } else if (check === "name") {
      if (name) {
        if (this.state.date)
          this.nameFilter(name, this.state.filteredcaptainsDate);
        else this.nameFilter(name, this.state.allData);
      } else {
        if (this.state.date) {
          this.dateFilter(this.state.date, this.state.allData);
          this.setState({ name, filterCaptainName: [] });
        } else this.setState({ captains: this.state.allData, name });
      }
    } else this.setState({
       captains: this.state.allData ,
      name:'',
      date:''
      });
  };
  dateFilter = (value, captains) => {
    if (value.length !== 0) {
      const from = value[0]._d.setHours(0, 0, 0, 0);
      const to = value[1]._d.setHours(0, 0, 0, 0);
      let filterCaptain = captains.filter(captain => {
        let createdDate = new Date(captain.dt_create_at).setHours(0, 0, 0, 0);
        if (createdDate >= from && createdDate <= to) return captain;
      });
      this.setState({
        captains: filterCaptain,
        date: value,
        filteredcaptainsDate: filterCaptain
      });
    } else {
      this.setState({
        captains: this.state.allData
      });
    }
  };
  nameFilter = (name, captains) => {
    const value = name.trim();
    let filterCaptainName = captains.filter(captain => {
      if (captain.s_name.includes(value)) return captain;
    });
    this.setState({
      captains: filterCaptainName,
      name,
      filteredcaptainsName: filterCaptainName
    });
  };

  handleVisible = () => {
    this.setState(prev => {
      return { visible: !prev.visible };
    });
  };
  handleVisibleEdit = () => {
    this.setState(prev => {
      return {visibleEdit: !prev.visibleEdit}
    });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        this.openNotificationWithIcon("error", "هناك خطأ في البانات المدخلة");
      } else {
        const {
          IDNumber,
          address,
          email,
          licenceNumber,
          name,
          password,
          phone,
          status,
          file
        } = values;
        const formData = new FormData();
        formData.append("file", file.fileList[0].originFileObj);
        formData.append("IDNumber", IDNumber);
        formData.append("address", address);
        formData.append("email", email);
        formData.append("licenceNumber", licenceNumber);
        formData.append("name", name);
        formData.append("password", password);
        formData.append("phone", phone);
        formData.append("status", status);
        fetch("/api/v1/addCaptain", {
          method: "POST",
          body: formData
        })
          .then(res => res.json())
          .then(res => {
            const { error } = res;
            if (error) {
              this.openNotificationWithIcon("error", error);
            } else {
              this.openNotificationWithIcon("success", "تمت الاضافة بنجاح");
              this.setState(prev => {
                return {
                  captains: this.state.captains.concat(res.result)
                };
              });
            }
          })
          .catch(() => {
            this.openNotificationWithIcon(
              "warning",
              "هناك خطأ ما الرجاء اعادة ارسال البيانات"
            );
          });
        this.handleVisible();
      }
    });
  };

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
      duration: 1.5
    });
  };
  deleteRowCustomer = (id, data) => {
    this.setState(prev => {
      return {
        captains: prev.captains.filter(data => data.pk_i_id !== id)
      };
    });
  };
  handleClick = (value1, value2, value3, information, id) => e => {
    const { captainsPage } = this.state;
    this.setState(prev => {
      return {
        [value1]: {
          ...captainsPage,
          [value2]: {
            [value3]: !prev[value1][value2][value3],
            information,
            id
          }
        }
      };
    });
  };
  updateCaptain = (column) => {
    const {pk_i_id: id} = column;
    this.setState(prev => {
      return {captains: prev.captains.map(captain => {
        if(captain.pk_i_id == id) {
          return column;}
        return captain;
      })}
    })
  }
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  render() {
    if (this.state.captains) {
      return (
        <div className="containercustomers">
          <div className="conatinercustomers__customer">
            <Header title="إدارة الكابتن" Icon={<Icon type="team" />} />
            <div className="addcustomer">
              <Buttoncomponent
                name="إضافة كابتن"
                icon={<Icon type="user" />}
                onClick={this.handleVisible}
              />
              <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleVisible}
                onCreate={this.handleCreate}
              />
              <Deletepopup
                visible={this.state.captainsPage.delete.deleteVisibility}
                changevisibility={this.handleClick}
                id={this.state.captainsPage.delete.id}
                updateState={this.deleteRowCustomer}
              />
               <Editcaptain
               visible={this.state.captainsPage.edit.editVisibility}
                id={this.state.captainsPage.edit.id}
                changevisibility = {this.handleClick}
                information = {this.state.captainsPage.edit.information}
                updateCaptain = {this.updateCaptain}
              />
            
              <div className="filtercontainer">
              <Button onClick={e=>this.filterfunction("","","empty")}>إفراغ الحقول</Button>
                <div classNam="filtercontainer__orderdate">
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
              pageName="captains"
              columns={this.state.captains}
              className="tablecustomer-container"
              handleClick={this.handleClick}
            />
          </div>
        </div>
      );
    } else {
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
    }
  }
}

export default WrappedComponent(Captains);
