import React, {Component} from "react";
import QRCode from 'qrcode.react';
import {Button, Card, Col, Divider, Modal, Row} from "antd";
import EcommerceStatus from "../../components/Metrics/EcommerceStatus";
import SendMoney from "../../components/dashboard/Crypto/SendMoney";
import HorizontalLoginForm from "../components/SendMoneyForm";
import DealsClosedCard from "../../components/dashboard/Listing/DealsClosedCard";
import {connect} from "react-redux";
import {getUserData} from "../../appRedux/actions/User";
import DepositForm from "./DepositForm";
import FireBaze from "../../constants/config/FireBaze";

class DashboardPage extends Component {

  state = {visible: false, phone: "+2547xxxxxxx"};
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentWillMount() {
    getUserData();

    function listenUserChange(user){
      if (user){
        console.log("user Defined")
        this.setState({
          phone: user.phoneNumber
        })
        console.log(this.state)
      }else{
        console.log("No user");
        console.log(this.state.phone)
      }
    }

    FireBaze.auth().onAuthStateChanged(
      listenUserChange.bind(this)
    )

  }


  render() {

    var uid = this.props.uid;

    return (
      <div>
        <Row type="flex" gutter={12}>
          <Col xl={10} lg={20} md={15} sm={12} xs={24}>
            <center>
              <HorizontalLoginForm/>
            </center>
            <br/>
            <center>
              <div style={{background: '#ECECEC',}}>
                <Card title="Your Qr Code ">
                  <QRCode value={this.props.address? this.props.address : "Hello"} size={250}/>
                  <Divider/>
                  <center> {this.props.address? this.props.address : "Hello"}</center>
                </Card>
              </div>
            </center>
          </Col>
          <Col xl={14} lg={20} md={2} sm={12} xs={24}>
            <Row type="flex" gutter={16}>
              <Col span={7}>
                <EcommerceStatus color="geekblue" icon="revenue-new" title={this.props.balance} colorTitle="primary"
                                 subTitle="Your Current Balance" colorSubTitle="grey"/>

              </Col>
              <br/>
              <Col span={7} lg={17} md={15} sm={12} xs={24}>
                <DealsClosedCard/>
              </Col>
            </Row>
            <br/>
            <SendMoney/>

            <br/>

            <Button type="primary" onClick={this.showModal}>
              Deposit
            </Button>

            <Modal
              title="Deposit Tokens"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Return
                </Button>
              ]}
            >
              <center>
                <DepositForm finish={this.handleCancel} account={this.state.phone}/>
              </center>
            </Modal>


          </Col>

        </Row>
      </div>
    );
  };
}

const mapStateToProps = ({user}) => {
  const {uid, address, balance} = user;

  return {uid, address, balance}
};
export default connect(mapStateToProps)(DashboardPage);
