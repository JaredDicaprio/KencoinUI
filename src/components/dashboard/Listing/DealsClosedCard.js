import React from "react";
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import Widget from "components/Widget/index";
import {Badge} from "antd";

const data = [
  {name: 'JAN', DepositedCash: 200, SentCash: 600,ReceivedCash: 300,},
  {name: 'FEB', DepositedCash: 500, SentCash: 900,ReceivedCash: 450,},
  {name: 'MAR', DepositedCash: 700, SentCash: 1200,ReceivedCash: 3000,},
  {name: 'APR', DepositedCash: 800, SentCash: 1300,ReceivedCash: 1200,},
  {name: 'MAY', DepositedCash: 700, SentCash: 1200,ReceivedCash: 800,},
  {name: 'JUN', DepositedCash: 500, SentCash: 900,ReceivedCash: 300,},
  {name: 'JUL', DepositedCash: 600, SentCash: 200,ReceivedCash: 260,},
  {name: 'AUG', DepositedCash: 200, SentCash: 800,ReceivedCash: 457,},
  {name: 'SEP', DepositedCash: 400, SentCash: 400,ReceivedCash: 655,},
  {name: 'OCT', DepositedCash: 400, SentCash: 500,ReceivedCash: 120,},
  {name: 'NOV', DepositedCash: 400, SentCash: 1200,ReceivedCash: 800,},
  {name: 'DEC', DepositedCash: 200, SentCash: 800,ReceivedCash: 900,},
];

const DealsClosedCard = () => {

  return (
    <Widget>
      <div className="gx-dealclose-header">
        <div>
          <h2 className="h4 gx-mb-2">Transactions</h2>
          <p className="gx-text-grey">This year</p>
        </div>
        <div className="gx-dealclose-header-right">
          <p className="gx-mb-2"><Badge className="gx-mb-0" color="#FE9E15"/>SentCash</p>
          <p className="gx-ml-2 gx-mb-2"><Badge className="gx-mb-0"  color="#038FDE"/>Deposits</p>
          <p className="gx-ml-2 gx-mb-2"><Badge className="gx-mb-0"    color= "#01579B"/>Recieved</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={114}>
        <BarChart data={data}
                  margin={{top: 0, right: 0, left: 0, bottom: 0}}>
          <Tooltip/>
          <XAxis dataKey="name"/>
          <Bar dataKey="DepositedCash" stackId="a" fill="#038FDE" barSize={8}/>
          <Bar dataKey="SentCash" stackId="a" fill="#FE9E15" barSize={8}/>
          <Bar dataKey="ReceivedCash" stackId="a" fill="#01579B" barSize={8}/>
        </BarChart>
      </ResponsiveContainer>
    </Widget>
  );
};

export default DealsClosedCard;
