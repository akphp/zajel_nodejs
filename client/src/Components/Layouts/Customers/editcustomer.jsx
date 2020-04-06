import antd, { Icon, notification } from "antd";
import React, { Component } from "react";
import validator from "validator";
import "./style.css";

const { Modal, Form, Input, Select } = antd;
const { Option } = Select;

const EditCustomer = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    openNotificationWithIcon = (type, message) => {
      notification[type]({
        message: message,
        duration: 2
      });
    };
    onCancel = e => {
      this.props.changevisibility(
        "customersPage",
        "edit",
        "editVisibility",
        [],
        ""
      )(e);
    };
    onEdit = e => {
      const form = this.props.form;
      form.validateFields((error, values) => {
        if (error) {
          this.openNotificationWithIcon("error", 'الرجاء التاكد من البيانات المدخلة');
        } else {
          let editCustomer = {
            id: this.props.id,
            name: values.name,
            email: values.email,
            phone:values.prefixPhone + values.phone,
            status: values.status === "true" ? true : false,
            address: values.address,
            password: values.newpassword
          };
          fetch(`api/v1/editCustomer/${this.props.id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(editCustomer)
          })
            .then(res => res.json())
            .then(result => {
              if (result.result) {
                this.openNotificationWithIcon("success", "تم التعديل بنجاح");
                this.props.updateState(this.props.id, result.result);
                this.props.changevisibility(
                  "customersPage",
                  "edit",
                  "editVisibility",
                  [],
                  ""
                )(e);
              } else {
                this.openNotificationWithIcon("error", result.error);
              }
            });
        }
      });
    };

    handelEmail = (rule, value, cb) => {
      if (value.length) {
        if (!validator.isEmail(value)) cb("يرجى ادخال قيمة صحيحة");
        else cb();
      } else cb("يرجى ادخال البريد الالكتروني");
    };
    handelName = (rule, value, cb) => {
      if (!value && !(/^([أ-يa-zA-Z0-9]|\s)+$/.test(value))) {
        cb("يرجى ادخال الاسم");
      } else {
        cb();
      }
    };
    handlePhone = (rule, value, cb) => {
      if (value) {
        if (!value.match(/^[0-9]{9}$/)) {
          cb(" رقم الهاتف يجب ان يكون ارقام فقط وعددها 9 خانات");
        } else cb();
      } else cb("يرجى ادخال رقم الهاتف");
    };
    handelState = value => {
      if (value === true) return "true";
      else return "false";
    };
    render() {
      const { getFieldDecorator } = this.props.form;
      const { visible, information } = this.props;
      if (this.props.information.length !== 0) {
        return (
          <Modal
            className="editModal"
            visible={visible}
            title={
              <div>
                <Icon type="edit" className="modeltitle" />
                تعديل المستخدم{" "}
              </div>
            }
            okText="تعديل"
            cancelText="إالغاء"
            onCancel={this.onCancel}
            onOk={this.onEdit}
            className="modalcontainer"
            closable={false}
          >
            <Form className="modalform">
              <div className="modalform__right-container">
                <Form.Item
                  label="الاسم"
                  layout="horizontal"
                  className="modalform_formitem"
                >
                  {getFieldDecorator("name", {
                    initialValue: information.s_name,
                    rules: [{ required: true, message: "يرجى ملئ الحقل  " }]
                  })(<Input />)}
                </Form.Item>
                <div className="modalform">
                  <Form.Item
                    label="الهاتف"
                    layout="horizontal"
                    className="modalform_phone"
                  >
                    {getFieldDecorator("phone", {
                      initialValue: this.props.information.s_mobile_number
                        ? this.props.information.s_mobile_number.substr(3)
                        : "",
                      rules: [
                        {
                          required: true,
                          validator: this.handlePhone
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item layout="horizontal" className="modalform_formitem">
                    {getFieldDecorator("prefixPhone", { initialValue: "970" })(
                      <Select className="modalform_formitem-select">
                        <Option value="970">+970</Option>
                        <Option value="972">+972</Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>
                <Form.Item
                  label="الحالة"
                  layout="horizontal"
                  className="modalform_formitem"
                >
                  {getFieldDecorator("status", {
                    initialValue: this.handelState(information.b_status),
                    rules: [
                      { required: true, message: "يرجى ادخال حالة المستخدم" }
                    ]
                  })(
                    <Select>
                      <Option value="true">فعال</Option>
                      <Option value="false">غير فعال</Option>
                    </Select>
                  )}
                </Form.Item>
              </div>
              <div className="modalform__left-container">
                <Form.Item
                  label="البريدالالكتروني:"
                  layout="horizontal"
                  className="modalform_formitem"
                >
                  {getFieldDecorator("email", {
                    initialValue: information.s_email,
                    rules: [
                      {
                        required: true,
                        message: "",
                        validator: this.handelEmail
                      }
                    ]
                  })(<Input className="emailinput" />)}
                </Form.Item>
                <Form.Item className="addressInput" label="العنوان">
                  {getFieldDecorator("address", {
                    initialValue: information.s_address,
                    rules: [{ required: true, message: "يرجى ادخال العنوان" }]
                  })(<Input className="addressinput" />)}
                </Form.Item>
                <Form.Item label={<span>كلمة المرور الجديدة</span>}>
                  {getFieldDecorator("newpassword", {
                    initialValue: ""
                  })(<Input className="passwordinput" type="password" />)}
                </Form.Item>
              </div>
            </Form>
          </Modal>
        );
      } else {
        return "";
      }
    }
  }
);
export default EditCustomer;
