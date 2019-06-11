import React from "react";
import {Table} from "antd";
import Widget from "components/Widget/index";

const columns = [
  {
    title: 'Party Involved',
    dataIndex: 'image',
    render: (text, record) => {
      return <div className="gx-flex-row gx-align-items-center">
        <img className="gx-rounded-circle gx-size-30 gx-mr-2" src={text} alt=""/>
        <p className="gx-mb-0">{record.name}</p>
      </div>
    },
  },
  {
    title: 'Transfer Time',
    dataIndex: 'transfer',
    render: (text, record) => {
      return <span className="gx-text-grey">{record.transfer}</span>
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
    dataIndex: 'status',
    render: (text) => {
      return <span className="gx-text-primary gx-pointer">
        <i className="icon icon-forward gx-fs-sm gx-mr-2"/>{text}</span>
    },
  },

];

const data = [

  {
    key: '1',
    name: 'Jeniffer L.',
    transfer: '2 hrs. ago',
    image: 'https://via.placeholder.com/150x150',
    amount: 200,
    status: 'Recieved'
  },
  {
    key: '2',
    name: 'Jim Green',
    transfer: '17 days ago',
    image: 'https://via.placeholder.com/150x150',
    amount: 150,
    status: 'Pay'
  },
  {
    key: '3',
    name: 'Joe Black',
    transfer: '1 month ago',
    image: 'https://via.placeholder.com/150x150',
    amount: 245,
    status: 'Pay'
  },
  {
    key: '4',
    name: 'Mila Alba',
    transfer: '1 month ago',
    image: 'https://via.placeholder.com/150x150',
    amount: 175,
    status: 'Recieved'
  },
  {
    key: '5',
    name: 'Innocent Kithinji',
    transfer: '1 month ago',
    image: 'https://via.placeholder.com/150x150',
    amount: 255,
    status: 'Pay'
  },
  {
    key: '4',
    name: 'Kithinji Innocent',
    transfer: '1 month ago',
    image: 'https://via.placeholder.com/150x150',
    amount: 450,
    status: 'Recieved'
  }
];

const SendMoney = () => {
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
};

export default SendMoney;
