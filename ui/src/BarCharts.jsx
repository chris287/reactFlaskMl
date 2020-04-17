import React, { Component } from 'react'
import Chart from 'react-apexcharts'

export default class BarCharts extends Component {
  
    render() {
        return (
            <div style={{width:"40%",height:"80%",boxShadow:"#544a4a 0px 1px 5px "}}>
                <Chart
                options={{
                  chart: {
                    type: 'bar',
                    height: 500
                  },
                  plotOptions: {
                    bar: {
                      horizontal:true,
                      dataLabels: {
                        position: 'top',
                        
                      },
                    }
                  },
                  dataLabels: {
                    enabled: true,
                    offsetX: -6,
                    style: {
                      fontSize: '8px',
                      colors: ['#000000']
                    }
                  },
                  stroke: {
                    show: true,
                    width: 1,
                    colors: ['#fff']
                  },
                  title:{
                    text:(this.props.title)?this.props.title:"",
                  },
                  xaxis: {
                    categories: (this.props.categories[0])?this.props.categories:[],
                  },
                }
                }
                series={[{
                  name:"Non-Fraudlent",
                  data: (this.props.data2[0])?this.props.data2:[]
                }, {
                  name:"Fraudlent",
                  data: (this.props.data1[0])?this.props.data1:[]
                }]}
                type="bar"
                style={{backgroundColor:"white",borderRadius:"5px"}}
            />
            </div>
            
        )
    }
}
