import React, {Component} from "react";
import QRCode from 'qrcode.react';
import {Card, Col, Divider, Row} from "antd";
import Auxiliary from "util/Auxiliary";
import EcommerceStatus from "../../components/Metrics/EcommerceStatus";
import SendMoney from "../../components/dashboard/Crypto/SendMoney";
import HorizontalLoginForm from "../components/SendMoneyForm";
import DealsClosedCard from "../../components/dashboard/Listing/DealsClosedCard";
import {connect} from "react-redux";

class DashboardPage extends Component {

  render() {

    var uid = this.props.uid;

    return (
      <Auxiliary>
        <Row>
          <Col xl={10} lg={20} md={15} sm={12} xs={24}>
            <center>
              <HorizontalLoginForm/>
            </center>
            <center>
              <div style={{background: '#ECECEC',}}>
                <Card title="Your Qr Code ">
                  <QRCode value={""+this.props.uid} size={250}/>
                  <Divider/>
                  <center> {this.props.uid} </center>
                </Card>
              </div>
            </center>
          </Col>
          <Col xl={14} lg={20} md={15} sm={12} xs={24}>
            <Row gutter={12}>
              <Col span={7}>
                <EcommerceStatus color="geekblue" icon="revenue-new" title="KSh. 7,831" colorTitle="primary"
                                 subTitle="Your Current Balance" colorSubTitle="grey"/>

              </Col>
              <Col span={7} lg={17} md={15} sm={12} xs={24}>
                <DealsClosedCard/>
              </Col>
            </Row>
            <SendMoney/>
          </Col>

        </Row>
      </Auxiliary>
    );
  };
}

const mapStateToProps = ({user}) => {
  const {uid} = user;

  return {uid}
};
export default connect(mapStateToProps)(DashboardPage);

