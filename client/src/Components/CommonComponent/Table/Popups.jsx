import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import {
  Button,
  Select,
  Modal,
  Form,
  Input,
  Cascader,
  Icon,
  notification,
  Table
} from "antd";

const { Option } = Select;
class EditForm extends React.Component {
  state = {
    visible: false,
    storeNameManual: "",
    storeNameArray: [],
    error: "",
    originalItems: [],
    itemsInputs: [],
    key: 0
  };

  componentDidMount() {
    this.setState({
      itemsInputs: this.props.itemsArray
        ? JSON.parse(JSON.stringify(this.props.itemsArray))
        : [],
      originalItems: this.props.itemsArray
        ? JSON.parse(JSON.stringify(this.props.itemsArray))
        : []
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (error, values) => {
      await this.setState({ storeNameArray: values.storeName });
      let storeId = "";
      for (let i = 0; i < this.props.stores.length; i++) {
        if (this.props.stores[i].value == values.storeName) {
          storeId = this.props.stores[i].id;
        }
      }
      let deletedItems = [],
        newItems = [];
      for (let i = 0; i < this.state.originalItems.length; i++) {
        let exist = false;
        for (let j = 0; j < this.state.itemsInputs.length; j++) {
          if (
            JSON.stringify(this.state.originalItems[i]) ===
            JSON.stringify(this.state.itemsInputs[j])
          ) {
            exist = true;
          }
        }
        if (!exist) {
          deletedItems.push(this.state.originalItems[i]);
        }
      }
      for (let j in this.state.itemsInputs) {
        let edited = true;
        for (let i in this.state.originalItems) {
          if (
            JSON.stringify(this.state.originalItems[i]) ===
            JSON.stringify(this.state.itemsInputs[j])
          ) {
            edited = false;
          }
        }
        if (edited) {
          newItems.push(this.state.itemsInputs[j]);
        }
      }
      if (!error) {
        axios
          .put(`/api/v1/editOrder/${this.props.orderId}`, {
            phone:
              document.querySelector(
                ".popupModal .ant-select-selection-selected-value"
              ).title + values.phone,
            address: values.address,
            items: { deleted: deletedItems, edited: newItems },
            storeID: storeId
          })
          .then(res => {
            if (res.status == 200) {
              let x = [...this.state.itemsInputs.filter(e => e.itemid), ...res.data]
              this.props.updateOrdersStateVariable(
                storeId,
                document.querySelector(
                  ".popupModal .ant-select-selection-selected-value"
                ).title + values.phone,
                values.address,
                x,
                this.props.orderId
              );
              this.setState({ visible: false });
              this.props.form.resetFields();
            } else {
              this.setState({ error: "Try again please" });
            }
          })
          .catch(err => {
            this.setState({
              error: err,
              itemsInputs: JSON.parse(JSON.stringify(this.state.originalItems))
            });
          });
      }
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
      error: "",
      itemsInputs: this.props.itemsArray
        ? JSON.parse(JSON.stringify(this.props.itemsArray))
        : [],
      originalItems: this.props.itemsArray
        ? JSON.parse(JSON.stringify(this.props.itemsArray))
        : []
    });
  };

  handleCancel = () => {
    this.props.form.resetFields();
    this.setState({
      visible: false
    });
  };

  storeNameInput = async e => {
    await this.setState({
      storeNameManual: e.target.value
    });
  };

  validateStoreName = async (rule, value, callback) => {
    await this.setState({ storeNameArray: value });
    const { storeNameArray, storeNameManual } = this.state;
    if (
      (storeNameArray && storeNameArray.length >= 1) ||
      (storeNameManual && storeNameManual.length >= 3)
    ) {
      callback();
    } else {
      callback("يرجى إدخال المتجر !");
    }
  };

  validateStoreNameManual = (rule, value, callback) => {
    const { storeNameArray, storeNameManual } = this.state;
    if (
      (storeNameArray && storeNameArray.length >= 1) ||
      (storeNameManual && storeNameManual.length >= 3)
    ) {
      callback();
    } else {
      callback("يرجى إدخال المتجر !");
    }
  };
  validateItem = (rule, value, callback) => {
    if (value && value.length >= 3) {
      callback();
    } else {
      callback("يرجى إدخال عنصر !");
    }
  };
  validateItemPrice = (rule, value, callback) => {
    if (value && /^[-+]?\d*$/.test(value)) {
      callback();
    } else {
      callback("يرجى إدخال السعر !");
    }
  };
  validatePhone = (rule, value, callback) => {
    if (/^[-+]?\d*$/.test(value) && value.length === 9) {
      callback();
    } else {
      callback("يرجى إدخال رقم الهاتف");
    }
  };
  appendInput = () => {
    this.setState({
      itemsInputs: this.state.itemsInputs.concat([{ name: "", price: "" }])
    });
  };
  removeInput = index => {
    let stateItems = this.state.itemsInputs;
    stateItems.splice(index, 1);
    this.props.form.resetFields();
    this.setState({
      itemsInputs: stateItems
    });
  };
  setNewItem = async (key, val, index) => {
    let newItem = [...this.state.itemsInputs];
    delete newItem[index].itemid;
    if (key == "name") {
      newItem[index].name = val.target.value;
      this.setState({
        itemsInputs: newItem
      });
    } else if (key == "price") {
      newItem[index].price = val.target.value;
      this.setState({
        itemsInputs: newItem
      });
    }
  };
  resetEverything = () => {
    this.props.form.resetFields();
    this.setState({ itemsInputs: this.state.originalItems });
  };
  render() {
    const { customerName, phoneNumber, customerAddress } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "970"
    })(
      <Select style={{ width: 70 }}>
        <Option value="970">+970</Option>
        <Option value="972">+972</Option>
      </Select>
    );
    if (!this.state.error) {
      return (
        <React.Fragment>
          <Icon
            type="edit"
            style={{
              fontSize: "1.2rem",
              color: "rgba(0, 0, 0, 0.65)"
            }}
            onClick={this.showModal}
          />
          <Modal
            className="popupModal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            destroyOnClose={true}
          >
            <div className="modalHeader">
              <Icon type="down-square" />
              <h2>تعديل الطلب</h2>
            </div>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <div style={{ display: "block" }}>
                <div className="popupModal_form-items-container">
                  <Form.Item
                    label={
                      <span>
                        <span className="popupModal_storeName-label">*</span>إسم
                        الزبون
                      </span>
                    }
                  >
                    <Input readOnly defaultValue={customerName} />
                  </Form.Item>
                </div>
                <div className="popupModal_form-items-container">
                  <Form.Item label="رقم الهاتف">
                    {getFieldDecorator("phone", {
                      initialValue: phoneNumber ? phoneNumber.substring(4) : "",
                      rules: [
                        { required: true, message: " " },
                        {
                          validator: this.validatePhone
                        }
                      ]
                    })(
                      <Input
                        addonBefore={prefixSelector}
                        style={{ width: "100%" }}
                      />
                    )}
                  </Form.Item>
                </div>
                <div className="popupModal_form-items-container">
                  <Form.Item label="العنوان">
                    {getFieldDecorator("address", {
                      initialValue: customerAddress,
                      rules: [
                        {
                          required: true,
                          message: "يرجى إدخال العنوان !"
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </div>
                <div className="popupModal_form-items-container">
                  <Form.Item
                    className="popupModal_formItem-item-price-container"
                    label="إضافة عنصر"
                  >
                    {getFieldDecorator("item", {
                      initialValue: this.state.itemsInputs[0]
                        ? this.state.itemsInputs[0].name
                        : "",
                      rules: [
                        {
                          required: true,
                          message: " "
                        },
                        {
                          validator: this.validateItem
                        }
                      ]
                    })(
                      <Input
                        onChange={e => this.setNewItem("name", e, 0)}
                        placeholder="أدخل العنصر"
                      />
                    )}
                    <Form.Item>
                      {getFieldDecorator("itemPrice", {
                        initialValue: this.state.itemsInputs[0]
                          ? this.state.itemsInputs[0].price
                          : "",
                        rules: [
                          {
                            required: true,
                            message: " "
                          },
                          {
                            validator: this.validateItemPrice
                          }
                        ]
                      })(
                        <Input
                          onChange={e => this.setNewItem("price", e, 0)}
                          className="popupModal_item-price-input"
                          placeholder="$"
                        />
                      )}
                    </Form.Item>
                  </Form.Item>
                  <div className="popupModal_form-extra-items-container">
                    <div style={{ "margin-bottom": "24px" }}>
                      {this.state.itemsInputs.slice(1).map((field, index) => {
                        return (
                          <React.Fragment>
                            <Form.Item className="main-extra-items-wrapper">
                              <Form.Item>
                                {getFieldDecorator(index.toString(), {
                                  initialValue: field.name,
                                  rules: [
                                    {
                                      required: true,
                                      message: " "
                                    },
                                    {
                                      validator: this.validateItem
                                    }
                                  ]
                                })(
                                  <Input
                                    className="popupModal_item-extra-input"
                                    placeholder="أدخل العنصر"
                                    onChange={e =>
                                      this.setNewItem("name", e, index + 1)
                                    }
                                  />
                                )}
                              </Form.Item>
                              <Form.Item className="extra-item-price">
                                {getFieldDecorator(index.toString() + "*", {
                                  initialValue: field.price,
                                  rules: [
                                    {
                                      required: true,
                                      message: " "
                                    },
                                    {
                                      validator: this.validateItemPrice
                                    }
                                  ]
                                })(
                                  <Input
                                    className="popupModal_item-price-input"
                                    placeholder="$"
                                    onChange={e =>
                                      this.setNewItem("price", e, index + 1)
                                    }
                                  />
                                )}
                              </Form.Item>
                            </Form.Item>
                            <Icon
                              onClick={() => this.removeInput(index + 1)}
                              className="popupModal_remove-item-icon"
                              type="minus-circle"
                            />
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <Icon
                onClick={this.appendInput}
                className="popupModal_add-item-icon"
                type="plus-circle"
              />
              <div className="marketAndButtonsDiv">
                <Form.Item
                  label={
                    <span>
                      <span className="popupModal_storeName-label">*</span> إختر
                      المتجر
                    </span>
                  }
                >
                  {getFieldDecorator("storeName", {
                    rules: [
                      {
                        type: "array"
                      },
                      {
                        validator: this.validateStoreName
                      }
                    ]
                  })(<Cascader options={this.props.stores} />)}
                </Form.Item>
                <p className="popupModal_storeName-manualInput">
                  أو أدخل إسم المتجر
                </p>
                <Form.Item>
                  {getFieldDecorator("storeNameManual", {
                    rules: [
                      {
                        message: " "
                      },
                      {
                        validator: this.validateStoreNameManual
                      }
                    ]
                  })(<Input readOnly onChange={this.storeNameInput} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    حفظ
                  </Button>
                  <Button
                    className="cancelButton"
                    type="default"
                    onClick={this.handleCancel}
                  >
                    إلغاء
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Icon
            type="edit"
            style={{
              fontSize: "1.2rem",
              color: "rgba(0, 0, 0, 0.65)"
            }}
            onClick={this.showModal}
          />
          <Modal
            className="ErrorPopupModal popupModal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            destroyOnClose={{ disabled: false }}
          >
            <div className="popupModal_error-class">
              <h1>
                {this.state.error.response
                  ? this.state.error.response.status
                  : "Error"}{" "}
                {this.state.error.response
                  ? this.state.error.response.data
                  : "try again later"}{" "}
              </h1>
            </div>
            {this.resetEverything}
          </Modal>
        </React.Fragment>
      );
    }
  }
}

class ViewForm extends React.Component {
  state = {
    visible: false,
    storeNameArray: [],
    itemsInputs: [],
    key: 0,
    storeName: ""
  };

  componentDidMount() {
    this.setState({
      itemsInputs: this.props.itemsArray
        ? JSON.parse(JSON.stringify(this.props.itemsArray))
        : []
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      itemsInputs: this.props.itemsArray
        ? JSON.parse(JSON.stringify(this.props.itemsArray))
        : []
    });
    this.getStoreName();
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  getStoreName = () => {
    let storeName = "";
    for (let i = 0; i < this.props.stores.length; i++) {
      if (this.props.stores[i].id == this.props.storeId) {
        storeName = this.props.stores[i].value;
      }
    }
    this.setState({ storeName });
  };

  render() {
    const {
      customerName,
      phoneNumber,
      customerAddress,
      orderStatus,
      captainName,
      orderPrice
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      { title: "اسم الطلبية", dataIndex: "name" },
      { title: "السعر", dataIndex: "price" }
    ];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: phoneNumber.substring(0, 4)
    })(
      <Select style={{ width: 70 }}>
        <Option value="970">{phoneNumber.substring(0, 4)}</Option>
      </Select>
    );
    return (
      <React.Fragment>
        <Icon
          type="profile"
          style={{
            fontSize: "1.2rem",
            color: "rgba(0, 0, 0, 0.65)"
          }}
          onClick={this.showModal}
        />
        <Modal
          title=" عرض الطلب"
          className="viewModal"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          cancelText="إالغاء"
          destroyOnClose={true}
          style={{ direction: "rtl", width: "575" }}
          closable={false}
        >
          <div className="view__captain">
            <div className="view__captain-box">
              <p className="view__captain__paragraph">اسم الزبون : </p>
              <p className="view__captain-value">{customerName}</p>
            </div>
            <div className="view__captain-box">
              <p className="view__captain__paragraph">تاريخ الطلبية : </p>
              <p className="view__captain-value">{this.props.orderDate}</p>
            </div>

            <div className="view__captain-box">
              <p className="view__captain__paragraph">اسم المكان : </p>
              <p className="view__captain-value">{customerAddress}</p>
            </div>

            <div className="view__captain-box">
              <p className="view__captain__paragraph">حالة الطلب : </p>
              <p className="view__captain-value">
                {this.props.orderStatus ? "تم" : "قيد التنفيذ"}
              </p>
            </div>
            <div className="view__captain-box">
              <p className="view__captain__paragraph">اسم الكابتن : </p>
              <p className="view__captain-value">{captainName}</p>
            </div>
            <Table
              dataSource={this.state.itemsInputs}
              columns={columns}
              className="view__captain-table"
            />
            <div className="view__captain-box">
              <p>السعر الكلي : </p>
              <p className="view__captain-value">{orderPrice} NIS</p>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

const EditPopup = Form.create()(EditForm);
const ViewPopup = Form.create()(ViewForm);

class DeletePopup extends Component {
  state = {
    visible: false,
    id: this.props.id
  };
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
      duration: 1.5
    });
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    fetch(`/api/v1/deleteOrder/${this.props.id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(res => {
        const { error } = res;
        if (error) {
          this.openNotificationWithIcon("error", error);
        } else {
          this.props.deleteRow(this.props.id);
          this.openNotificationWithIcon("success", "Delete Done");
        }
      })
      .catch(() => {
        this.openNotificationWithIcon("warning", "Error, please try again");
      });
  };
  handleCancel = e => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <React.Fragment>
        <Icon
          type="delete"
          style={{
            fontSize: "1.2rem",
            color: "rgba(0, 0, 0, 0.65)"
          }}
          onClick={this.showModal}
        />
        <Modal
          title="حذف الطلب"
          visible={this.state.visible}
          onOk={this.handleOk}
          cancelText="الغاء"
          okText="حذف"
          onCancel={this.handleCancel}
          style={{ direction: "rtl" }}
          className="deleteModal"
        >
          <p>هل تريد بالتأكيد حذف الطلب ؟</p>
        </Modal>
      </React.Fragment>
    );
  }
}

export { EditPopup, DeletePopup, ViewPopup };
