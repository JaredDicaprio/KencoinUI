import React from 'react'
import {Row, Col, Card} from 'antd'
import Auxiliary from "../../util/Auxiliary";
import ChartCard from "components/dashboard/Listing/ChartCard";
import {Area, AreaChart, ResponsiveContainer, Tooltip} from "recharts";
import EcommerceStatus from "../../components/Metrics/EcommerceStatus";
import SendMoney2 from "../../components/dashboard/Crypto/SendMoney2";
import {connect} from "react-redux";
import {getAdminData} from "../../appRedux/actions/Admin";


class AboutUs extends React.Component{
    componentWillMount() {
      this.props.getAdminData();
    }

  render(){
        return(
          <Auxiliary>
            <Row>
              <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                <EcommerceStatus color="geekblue" icon="revenue-new" title={this.props.totalSupply} colorTitle="primary"
                                 subTitle="The Total Tokens in Supply" colorSubTitle="grey"/>

              </Col>
              <br/>
            </Row>
            <SendMoney2 transaction={this.props.transactions}/>
          </Auxiliary>
        );
    }
}

const  mapStateToProps = ({admin}) => {
  const {transactions, totalSupply} = admin;

  return {transactions, totalSupply}
}

export default connect(mapStateToProps, {getAdminData})(AboutUs)
