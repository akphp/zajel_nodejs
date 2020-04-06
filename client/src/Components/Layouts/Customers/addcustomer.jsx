import antd, { Icon } from 'antd';
import React, { Component } from 'react'
import validator from 'validator'
import './style.css'

const { Modal, Form, Input, Select } = antd;
const { Option } = Select;
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {
    handelEmail = (rule, value, cb) => {
      if (value) {
        if (!validator.isEmail(value)) cb('الرجاء ادخال قيمة صحيحة')
        else cb()
      } else cb('يرجى ادخال البريد الالكتروني')
    }
    handelName = (rule, value, cb) => {
      if (!value && !(/^([أ-يa-zA-Z0-9]|\s)+$/.test(value))) cb('يرجى ادخال الاسم')
      else cb()
    }
    handlePhone = (rule, value, cb) => {
      if (value) {

        if (!value.match(/^[0-9]{9}$/)) {
          cb(' رقم الهاتف يجب ان يكون 9 ارقام فقط ')
        }
        else cb()
      } else cb('يرجى ادخال رقم الهاتف')
    }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title={(
            <div>
              <Icon type="user-add" className="modeltitle" />
              إضافة مستخدم
              {' '}
            </div>
          )}
          okText="إضافة"
          cancelText="إالغاء"
          onCancel={onCancel}
          onOk={onCreate}
          className="modalcontainer"
        >
          <Form className='modalform'>
            <div className='modalform__right-container'>
              <Form.Item label="الاسم" layout="horizontal" className='modalform_formitem'>
                {getFieldDecorator('name', {
                  rules: [{ required: true, validator: this.handelName }],
                })(
                  <Input />

                )}
              </Form.Item>
              <div className='modalform phone-container'>
                <Form.Item label="الهاتف" layout="horizontal" className='modalform_phone'>
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        required: true,
                        message: '',
                        validator: this.handlePhone
                      }],
                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item layout="horizontal"
                  className='modalform_formitem'
                >
                  {getFieldDecorator('prefixPhone', { initialValue: '970' })(
                    <Select
                      className='modalform_formitem-select'
                    >
                      <Option value="970">+970</Option>
                      <Option value="972">+972</Option>
                    </Select>)}
                </Form.Item>
              </div>
              <Form.Item label="الحالة" layout="horizontal" className='modalform_formitem'>
                {getFieldDecorator('status', {
                  rules: [{ required: true, message: 'يرجى ادخال حالة المستخدم' }],
                })(<Select>
                  <Option value="true">فعال</Option>
                  <Option value="false">غير فعال</Option>
                </Select>)}
              </Form.Item>
            </div>
            <div className='modalform__left-container'>
              <Form.Item label="البريدالالكتروني" layout="horizontal" className='modalform_formitem'>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: '', validator: this.handelEmail }],
                })(<Input className='emailinput-add' />)}
              </Form.Item>
              <Form.Item className="addressInput"
                label="العنوان"
              >
                {getFieldDecorator('address', {
                  rules: [{ required: true, message: 'يرجى ادخال العنوان' }],
                })(<Input className='addressinput-add' />)}
              </Form.Item>
              <Form.Item
                label={<span>كلمة المرور</span>}
              >
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'يرجى ادخال كلمة المرور' }],
                })(
                  <Input className='passwordinput' type='password' />)}
              </Form.Item>
            </div>
          </Form>
        </Modal>
      )
    }

  },
)
export default CollectionCreateForm;