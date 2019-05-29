import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Card, Checkbox, Form, Icon, Input, message} from "antd";
//
// import {
//   hideMessage,
//   showAuthLoader,
//   userFacebookSignIn,
//   userGithubSignIn,
//   userGoogleSignIn,
//   userSignIn,
//   userTwitterSignIn
// } from "appRedux/actions/Auth";
import "./horizontalLoginForm.less";
import CircularProgress from "components/CircularProgress/index";

const FormItem = Form.Item;

class SendMoneyForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("values", values);
      if (!err) {
        this.props.showAuthLoader();
        this.props.userSignIn(values);
      }
    });
  };

  constructor() {
    super();
    this.state = {
      email: 'demo@example.com',
      password: 'demo#123'
    }
  }

  render() {

    const {getFieldDecorator} = this.props.form;
    const {showMessage, loader, alertMessage} = this.props;

    return (
      <Card className="gx-card" title="Send Money">
        <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
          <FormItem>
            {getFieldDecorator('Reciever', {
              rules: [{required: true, message: 'Please provide a the reciever'}],
            })(
              <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Reciever"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('amount', {
              rules: [{required: true, message: 'Please provide amount to send'}],
            })(
              <Input prefix={<Icon type="transaction" style={{color: 'rgba(0,0,0,.25)'}}/>}
                     placeholder="Amount"/>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Send
            </Button>
          </FormItem>
        </Form>

        {loader &&
        <div className="gx-loader-view">
          <CircularProgress/>
        </div>
        }
        {showMessage &&
        message.error(alertMessage)}
      </Card>
    );
  }

}

const WrappedNormalLoginForm = Form.create()(SendMoneyForm);
const mapStateToProps = ({auth}) => {
  const {loader, alertMessage, showMessage, authUser} = auth;
  return {loader, alertMessage, showMessage, authUser}
};

// export default connect(mapStateToProps, {
//   userSignIn,
//   hideMessage,
//   showAuthLoader,
//   userFacebookSignIn,
//   userGoogleSignIn,
//   userGithubSignIn,
//   userTwitterSignIn
// })(WrappedNormalLoginForm);

export  default  connect()(WrappedNormalLoginForm);
