import React, {Component} from 'react';
import {Area, AreaChart, ResponsiveContainer, Tooltip} from "recharts";
import ChartCard from "../../components/dashboard/Crypto/ChartCard";
import {incrementData} from "../Dashboard/data";

class AmountChart extends Component{
  render() {
    return(
      <ChartCard prize="KSh. 7,831"
                 children={<ResponsiveContainer width="100%" height={75}>
                   <AreaChart data={incrementData}
                              margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                     <Tooltip/>
                     <defs>
                       <linearGradient id="color4" x1="0" y1="0" x2="1" y2="0">
                         <stop offset="5%" stopColor="#4ECDE4" stopOpacity={0.9}/>
                         <stop offset="95%" stopColor="#06BB8A" stopOpacity={0.9}/>
                       </linearGradient>
                     </defs>
                     <Area dataKey='price' type='monotone' strokeWidth={0} stackId="2" stroke='#4D95F3'
                           fill="url(#color4)"
                           fillOpacity={1}/>
                   </AreaChart>
                 </ResponsiveContainer>}
                 styleName="up" desc="Current Balance"/>
    );
  }
}

export  default  AmountChart;
