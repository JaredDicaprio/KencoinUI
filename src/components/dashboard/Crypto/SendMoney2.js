import React, {Component} from "react";
import {Table} from "antd";
import Widget from "components/Widget/index";
import {connect} from 'react-redux';

const columns = [
  {
    title: 'participant',
    dataIndex: 'image',
    render: (text, record) => {
      return <div className="gx-flex-row gx-align-items-center">
        <p className="gx-mb-0">{record.participant}</p>
      </div>
    },
  },
  {
    title: 'Hash',
    dataIndex: 'image',
    render: (text, record) => {
      return <div className="gx-flex-row gx-align-items-center">
        <p className="gx-mb-0">{record.transactionHash}</p>
      </div>
    },
  },

  {
    title: 'Time',
    dataIndex: 'time',
    render: (text, record) => {
      return <span className="gx-text-grey">{record.time}</span>
    },

  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    render: (text, record) => {
      return <span className="gx-text-grey">{record.amount}</span>
    },

  },
  {
    title: 'Type',
    dataIndex: 'type',
    render: (text) => {
      return <span className="gx-text-primary gx-pointer">
        <i className="icon icon-forward gx-fs-sm gx-mr-2"/>{text}</span>
    },
  },

];

const nodat = [

  {

  },
];

class SendMoney extends Component {
  render() {
    const {transactions} =  this.props;
    console.log(transactions);
    var data;
    transactions?data = transactions : data = nodat;
    console.log(data);
    return (
      <Widget
        title={
          <h2 className="h4 gx-text-capitalize gx-mb-0">
            Recent Transactions</h2>
        }>
        <div className="gx-table-responsive">
          <Table className="gx-table-no-bordered" columns={columns} dataSource={data} pagination={false}
                 size="small"/>
        </div>
        <p className="gx-text-primary gx-mb-0 gx-pointer gx-d-block gx-d-sm-none gx-mb-0 gx-mt-3">
          <i className="icon icon-add-circle gx-fs-lg gx-d-inline-flex gx-vertical-align-middle"/> Add New Account</p>
      </Widget>
    );
  }
}

const mapStateToProps = ({admin}) => {
  const {transactions} = admin;

  return {transactions}

};

export default connect(mapStateToProps)(SendMoney);
