import React, { Component } from "react";
import { Button, Modal, Form, Select, Input } from "antd";
import { Upload, Icon } from "antd";

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  class extends Component {
    state = {
      loading: false,
      imageUrl: null
    };

    handleReuest = e => {
      this.setState({ imageUrl: e.file });
    };

    render() {
      const uploadButton = (
        <Button className="btn--upload">
          <Icon type='upload' />
          أرفق صورة
        </Button>
      );
      const imageUrl = this.state.imageUrl;

      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const { Option } = Select;

      return (
        <Modal
          visible={visible}
          title="إضافة كابتن"
          okText="اضافة"
          onCancel={onCancel}
          onOk={onCreate}
          cancelText="إلغاء"
          className="add-captain__popup"
        >
          <Form className="add-captain__form">
            <div className="add-captain-container-left">
            <Form.Item label="العنوان"
             >
                {getFieldDecorator("address", {
                  rules: [
                    {
                      required: true,
                      message: "يرجى ملئ الحقل بحروف ",
                      pattern: /^[أ-يA-Za-z0-9.-_\s]*$/
                    }
                  ]
                })(<Input type="text" id="address" />)}
              </Form.Item>
              <Form.Item label="رقم الهوية">
                {getFieldDecorator("IDNumber", {
                  rules: [
                    {
                      required: true,
                      message: "يرجى ملئ الحقل تسع ارقام ",
                      pattern: /^[0-9]{9}$/
                    }
                  ]
                })(<Input type="text" id="IDNumber" />)}
              </Form.Item>
              <Form.Item label="رقم الرخصة">
                {getFieldDecorator("licenceNumber", {
                  rules: [
                    {
                      required: true,
                      message: "رقم الرخصة يجب أن تكون سبعة أرقام",
                      pattern: /^[0-9]{7}$/
                    }
                  ]
                })(<Input type="text" id="licenceNumber" />)}
              </Form.Item>
              <Form.Item label="الحالة">
                {getFieldDecorator("status", {
                  rules: [{ required: true, message: "يرجى اختيار حالة" }]
                })(
                  <Select id="licenceNumber" style={{ width: 80 }}>
                    <Option value="false">غير فعال</Option>
                    <Option value="true">فعال </Option>
                  </Select>
                )}
              </Form.Item>
              
            </div>
            <div className="add-captain-container-right">
              <Form.Item label="الاسم">
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "يرجى ملئ الحقل بحروف ",
                      pattern: /^([أ-يa-zA-Z0-9]|\s)+$/
                    }
                  ]
                })(<Input type="text" id="name" />)}
              </Form.Item>
              <Form.Item label="البريد">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: "يرجى ملئ الحقل بريد الكتروني",
                      pattern: /.+\@.+\..+/
                    }
                  ]
                })(<Input type="email" id="email" />)}
              </Form.Item>
              <Form.Item label="كلمة المرور">
                {getFieldDecorator("password", {
                  rules: [
                    {
                      message: "الرجاء ملئ الحقل",
                      required: true
                    }
                  ]
                })(<Input type="password" id="password" />)}
              </Form.Item>
              <Form.Item label="الهاتف">
                {getFieldDecorator("phone", {
                  rules: [
                    {
                      required: true,
                      message: "الرجاء ملئ الحقل بارقام",
                      pattern: /^\+?[0-9]{10,12}$/
                    }
                  ]
                })(<Input type="text" id="phone" />)}
              </Form.Item>
              <Form.Item label="صورة الهوية">
                {getFieldDecorator("file", {
                  rules: [
                    {
                      required: true,
                      message: "ىرجى رفع صورة هوية الكابتن"
                    }
                  ]
                })(
                  <Upload
                    accept=".jpg , .png, .jpeg, .JPG , .PNG, .JPEG"
                    name="file"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={this.handleReuest}
                    multiple= {false}
                  >
                     {uploadButton}
                     <div className="image__name">
                     {imageUrl &&<><Icon type="check-circle" />{imageUrl.name}</>}
                     </div>
                  </Upload>
                )}
              </Form.Item>
            </div>
          </Form>
        </Modal>
      );
    }
  }
);
export default CollectionCreateForm;
