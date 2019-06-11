import {Button, Form, Icon, Input} from 'antd';
import React from 'react';
import axios from 'axios';

class NormalLoginForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values["account"]);
        axios.post("http://127.0.0.1:4000/coin/deposit", {
          phoneNumber: values["phoneNumber"],
          account: values["account"],
          amount: values["amount"]
        })
          .then(console.log("Done Depositing"))
          .catch(console.log("error Depositing"))
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('phoneNumber', {
            rules: [{required: true, message: 'Please input your username!'}],
          })(
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Phone to charge"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('account', {
            rules: [{required: true, message: 'Please input your Password!'}],
          })(
            <Input
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Account Phone Number"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('amount', {
            rules: [{required: true, message: 'Please input your Password!'}],
          })(
            <Input
              prefix={<Icon type="wallet" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Amount"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Deposit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const DepositForm = Form.create({name: 'normal_login'})(NormalLoginForm);

export default DepositForm
