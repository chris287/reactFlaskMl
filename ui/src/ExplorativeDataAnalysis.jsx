import React, { Component } from 'react'
import * as d3 from 'd3'
import data from './insurance_claims.csv';
import FullWidthTabs from './Tabs'


export default class EDA extends Component {
    constructor(props){
        super(props);
        this.state = {
            features:{
                incidentSeverity:[],
                incidentState:[],
                incidentType:[],
                fraudReported:[]
            } 
        }
    }
    componentDidMount(){
        this.getCsvResponse();
    }

    handleData = () =>{
        var csvData = d3.csv(data,(data) =>{
            return data;
        });
        return csvData;
    }

    getCsvResponse = () =>{
        var incidentSeverity = [];
        var incidentState = [];
        var incidentType = [];
        var fraudReported = [];
        var responseObject = {};
        var objectKeys =[
            "incidentSeverity",
            "incidentState",
            "incidentType",
            "fraudReported"
        ];
        
        var responseObject = {};
        return this.handleData().then(response =>{
            var counter = 0;
            response.forEach(row =>{
                incidentSeverity[counter] = row.incident_severity;
                incidentState[counter] = row.incident_state;
                incidentType[counter] = row.incident_type;
                fraudReported[counter] = row.fraud_reported;
                counter++;
            });
            var objectValues = [
                incidentSeverity,
                incidentState,
                incidentType,
                fraudReported
            ];

            responseObject = Object.assign(
                ...objectKeys.map((key,objectValuesArrayIndex) => ({[key]:objectValues[objectValuesArrayIndex]}))
            );
            var features = responseObject;
            this.setState({
                features
            })
            return responseObject;
        });
    }
    
    render() {
        var features = this.state.features;
        return (
            <div style={{display:"flex",justifyContent:"center",width:"100vw",height:"100%",backgroundColor:"#5CDB95"}}>
                {(this.state.features.incidentSeverity.length)?<FullWidthTabs tabNames={['Bar Charts','Scatter Plots','Heat Maps','Count Plots','Box Plots']} features={features}/>:""}
            </div>
        )
    }
}