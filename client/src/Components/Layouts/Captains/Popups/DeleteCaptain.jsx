import React, { Component } from "react";
import { Modal, Button, notification } from "antd";

class Deletepopup extends Component {
  onCancel = e => {
    this.props.changevisibility(
      "captainsPage",
      "delete",
      "deleteVisibility",
      [],
      ""
    )(e);
  };
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
      duration: 2
    });
  };
  onDelete = e => {
    const id = this.props.id;
    fetch(`api/v1/deleteCaptain/${this.props.id}`, {
      method: "delete"
    })
      .then(res => res.json())
      .then(result => {
        if (result.result) {
          this.openNotificationWithIcon("success", result.result);
          this.props.changevisibility(
            "captainsPage",
            "delete",
            "deleteVisibility",
            [],
            ""
          )(e);
          this.props.updateState(id);
        } else this.openNotificationWithIcon("error", result.error);
      });
  };

  render() {
    return (
      <Modal
        title="حذف كابتن"
        visible={this.props.visible}
        onOk={this.onDelete}
        cancelText="الغاء"
        okText="حذف"
        onCancel={this.onCancel}
        closable={false}
        style={{ direction: "rtl" }}
        className="deleteModal"
      >
        <p>هل تريد بالتأكيد حذف هذا الكابتن؟</p>
      </Modal>
    );
  }
}
export default Deletepopup;
