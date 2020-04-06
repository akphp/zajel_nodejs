import React, { Component } from 'react'
import { Modal, Button, notification } from 'antd';

class Deletepopup extends Component {
  state =
    {
      visible: this.props.visible,
      id: this.props.id
    }
  onCancel = e => {
    this.props.changevisibility("customersPage","delete", "deleteVisibility",[], '')(e);
  };
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
      duration: 2
    });
  };
  onDelete = e => {
    const id = this.props.id
    fetch(`api/v1/deleteCustomer/${this.props.id}`,
      {
        method: "delete"
      }).then(res => res.json()).then(result => {
        if (result.result) {
          this.openNotificationWithIcon('success', result.result)
          this.props.changevisibility("customersPage","delete", "deleteVisibility",[], '')(e);
          this.props.updateState(id)

        } else this.openNotificationWithIcon('error', result.error)
      })
  }
  componentWillReceiveProps(props) {
    const { visible, id } = props;
    this.setState({ visible, id });
  }
  render() {

    return (
      <Modal
        title="حذف مستخدم"
        visible={this.props.visible}
        onOk={this.onDelete}
        cancelText="الغاء"
        okText="حذف"
        onCancel={this.onCancel}
        closable={false}
        style={{ direction: "rtl", }}
        className="deleteModal"
      >
        <p>هل تريد بالتأكيد حذف هذا المستخدم؟</p>
      </Modal>
    );
  }
}
export default Deletepopup

