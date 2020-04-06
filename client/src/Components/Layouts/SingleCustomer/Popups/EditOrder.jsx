import React, { Component } from "react";
import axios from "axios";
// import "./style.css";
import { Button, Select, Modal, Form, Input, Cascader, Icon, notification  } from "antd";

const { Option } = Select;
const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message
  });
};
class EditForm extends Component {
  state = {
    visible: false,
    storeNameManual: "",
    storeNameArray: [],
    error: "",
    originalItems: [],
    itemsInputs: [],
    key: 0,
    stores: []
  };
  loadPlacesNames = () => {
    fetch("/api/v1/getPlacesNames")
      .then(res => res.json())
      .then(res => {
        const { error } = res;
        if (error) {
          openNotificationWithIcon("error", error);
        } else {
          this.setState({ stores: res.result });
        }
      })
      .catch(() => {
        openNotificationWithIcon(
          "erro",
          "Something error please refersh the page"
        );
      });
  };
  componentDidMount() {

    this.setState({
      itemsInputs: this.props.itemsArray ?  JSON.parse(JSON.stringify(this.props.itemsArray.map(item => {return {itemid: item.f1, name: item.f2, price: item.f3}}))) : [],
      originalItems: this.props.itemsArray ? JSON.parse(JSON.stringify(this.props.itemsArray.map(item => {return {itemid: item.f1, name: item.f2, price: item.f3}}))) : []
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (error, values) => {
      await this.setState({ storeNameArray: values.storeName });
      let storeId = "";
      let storeName = "";
      for (let i = 0; i < this.props.stores.length; i++) {
        if (this.props.stores[i].value == values.storeName) {
          storeId = this.props.stores[i].id;
          storeName = this.props.stores[i].value;
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
              ).title +
              "-" +
              values.phone,
            address: values.address,
            items: { deleted: deletedItems, edited: newItems },
            storeID: storeId
          })
          .then(res => {
            let x = [...this.state.itemsInputs.filter(e => e.itemid), ...res.data]
              this.props.updateOrdersStateVariable(
                storeId,
                storeName,
                document.querySelector(
                  ".popupModal .ant-select-selection-selected-value"
                ).title + values.phone,
                values.address,
                x,
                this.props.orderId
              );
              this.setState({ visible: false });
              this.props.form.resetFields();
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
      error: ""
    });
  };

  handleCancel = () => {
    this.props.form.resetFields();
    this.setState({
      visible: false,
      itemsInputs: JSON.parse(JSON.stringify(this.state.originalItems))
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
    if (value) {
      callback();
    } else {
      callback("يرجى إدخال السعر !");
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
    this.setState({itemsInputs: this.state.originalItems})
  }
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
                        الكابتن
                      </span>
                    }
                  >
                    <Input readOnly defaultValue={customerName} />
                  </Form.Item>
                </div>
                <div className="popupModal_form-items-container">
                  <Form.Item label="رقم الهاتف">
                    {getFieldDecorator("phone", {
                      initialValue: phoneNumber,
                      rules: [
                        { required: true, message: "يرجى إدخال رقم الهاتف !" }
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
                            <Form.Item>
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
                              <Form.Item>
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
                  <Icon
                    onClick={this.appendInput}
                    className="popupModal_add-item-icon"
                    type="plus-circle"
                  />
                </div>
              </div>
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

const EditPopup = Form.create()(EditForm);

export default EditPopup;