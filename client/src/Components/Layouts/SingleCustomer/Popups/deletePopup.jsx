import React, { Component } from "react";
import { Modal, notification } from "antd";

class Popup extends Component {
  state = {
    visible: this.props.visible,
    id: this.props.id
  };

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
      duration: 1.5
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
          this.props.updateState(this.state.id);
          this.openNotificationWithIcon("success", "Delete Done");
        }
        this.props.visibleFun("singleCustomer", "deleteVisibility")(e);
      })
      .catch(() => {
        this.openNotificationWithIcon('warning', 'Something error please try again');
        this.props.visibleFun("singleCustomer", "deleteVisibility")(e);
      });
  };

  handleCancel = e => {
    this.props.visibleFun("singleCustomer", "deleteVisibility")(e);
  };
  componentWillReceiveProps(props) {
    const { visible, id } = props;
    this.setState({ visible, id });
  }

  render() {
    return (
      <Modal
        title="حذف الطلب"
        visible={this.state.visible}
        onOk={this.handleOk}
        cancelText="الغاء"
        okText="حذف"
        onCancel={this.handleCancel}
        style={{ direction: "rtl", }}
        className="deleteModal"
      >
        <p>هل تريد بالتأكيد حذف الطلب ؟</p>
      </Modal>
    );
  }
}

export default Popup;
