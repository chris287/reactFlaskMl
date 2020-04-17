import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormControl from '@material-ui/core/FormControl'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import './common.scss' 
import CustomDialog from './Dialog.jsx';


export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading : false,
            formData : {
                policyNumber : '',
                gender : '',
                incidentSeverity : '',
                incidentState : '',
                authoritiesContacted : '',
                monthsAsCustomer : '',
                vehicleClaim : '',
                totalClaim : '',
                incidentType : '',
                incidentDate : '02/28/2020',
                umbrellaLimit : '',
            },
            result : '',
            open:false
        }
        
    }

    handleChange = (event) =>{
        const value = event.target.value;
        const name = event.target.name;
        var formData = this.state.formData;
        formData[name] = value;
        this.setState({
            formData
        });
    }
    handleCancelClick = (event) =>{
        var formData ={
                policyNumber : '',
                gender : 'female',
                incidentSeverity : '',
                incidentState : '',
                authoritiesContacted : '',
                monthsAsCustomer : '',
                vehicleClaim : '',
                totalClaim : '',
                incidentType : '',
                incidentDate : '02/28/2020',
                umbrellaLimit : '',
        }
        this.setState({
            formData
        });
    }

    handlePredictClick = (event) =>{
        const formData = this.state.formData;
        var apiData = {
            incidentSeverity:parseFloat(formData.incidentSeverity),
            incidentState:parseFloat(formData.incidentState),
            monthsAsCustomer:parseFloat(formData.monthsAsCustomer),
            vehicleClaim:parseFloat(formData.vehicleClaim),
            totalClaim:parseFloat(formData.totalClaim),
            incidentType:parseFloat(formData.incidentType)
        }

        this.setState({isLoading : true});
        fetch('http://127.0.0.1:5000/prediction/',{
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          method:'POST',
          body:JSON.stringify(apiData)
        })
        .then(response => response.json())
        .then(response => {
          this.setState({
            result: response.result,
            isLoading:false,
            open:true 
          });
          
        });
        
    }
    
    openDialog() {
        this.setState({ open: true });
    }
    closeDialog = () =>{
        this.setState({open:false})
    }
    

    render() {
        const isLoading = this.state.isLoading;
        const formData = this.state.formData;
        return (
            <div style={{
                display:"flex",
                height:"100%",
                width:"100vw",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"#5CDB95",
                flexDirection:"column"
            }}>
                <div className="formContainer">
                       <div style={{width:"50%"}}>
                            <TextField
                                 variant="outlined"
                                 label="Policy Number"
                                 style={{marginTop:"5%",width:"100%"}}
                                 name = "policyNumber"
                                 value = {formData.policyNumber}
                                 onChange = {this.handleChange}
                                 
                           />
                            <div>
                                <FormControl variant="outlined" style={{marginTop:"5%"}}>
                                <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" row color="primary" name="gender" value={formData.gender} onChange={this.handleChange}>
                                            <FormControlLabel value="female" control={<Radio />} label="Female" color="primary"/>
                                            <FormControlLabel value="male" control={<Radio />} label="Male" color="primary"/>    
                                    </RadioGroup>
                                
                                </FormControl>
                            </div>
                       </div>
                           

                            <TextField
                                 variant="outlined"
                                 label="Incident Severity"
                                 style={{marginTop:"1%",width:"50%"}}
                                 name = "incidentSeverity"
                                 value={formData.incidentSeverity}
                                 onChange={this.handleChange}
                                 required={true}
                           />

                            <TextField
                                 variant="outlined"
                                 label="Incident State"
                                 style={{marginTop:"1%",width:"50%"}}
                                 name = "incidentState"
                                 value={formData.incidentState}
                                 onChange={this.handleChange}
                                 required={true}
                           />
                            
                            <FormControl variant="outlined" style={{marginTop:"1%",width:"50%"}}>
                                <InputLabel>
                                    Authorities Contacted
                                </InputLabel>
                                    
                
                                <Select
                                    labelWidth="100%"
                                    name = "authoritiesContacted"
                                    value = {formData.authoritiesContacted}
                                    onChange = {this.handleChange}
                                >
                                    <MenuItem value="None"><em>None</em></MenuItem>
                                    <MenuItem value="Police">Police</MenuItem>
                                    <MenuItem value="Fire">Fire</MenuItem>
                                    <MenuItem value="Ambulance">Ambulance</MenuItem>
                                    <MenuItem value="Others">Others</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                 variant="outlined"
                                 label="Months As Customers"
                                 style={{marginTop:"1%",width:"50%"}}
                                 name = "monthsAsCustomer"
                                 value={formData.monthsAsCustomer}
                                 onChange={this.handleChange}
                                 required={true}
                           />

                            <TextField
                                 variant="outlined"
                                 label="Vehicle Claim"
                                 style={{marginTop:"1%",width:"50%"}}
                                 name = "vehicleClaim"
                                 value={formData.vehicleClaim}
                                 onChange={this.handleChange}
                                 required={true}
                           />

                          <TextField
                                 variant="outlined"
                                 label="Total Claim"
                                 style={{marginTop:"1%",width:"50%"}}
                                 name = "totalClaim"
                                 value={formData.totalClaim}
                                 onChange={this.handleChange}
                                 required={true}
                           />

                           <TextField
                                 variant="outlined"
                                 label="Incident Type"
                                 style={{marginTop:"1%",width:"50%"}}
                                 name = "incidentType"
                                 value={formData.incidentType}
                                 onChange={this.handleChange}
                                 required={true}
                           />  

                            <MuiPickersUtilsProvider utils={DateFnsUtils} style={{marginTop:"1%"}}>
                            <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Incident Date"
                                        format="MM/dd/yyyy"
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        style={{width:"50%"}}
                                        name = "incidentDate"
                                        value={formData.incidentDate}
                                        onChange={this.handleChange}
                                />
                            </MuiPickersUtilsProvider>
                                
                            <TextField
                                 variant="outlined"
                                 label="Umbrella Limit"
                                 style={{marginTop:"1%",width:"50%"}}
                                 name = "umbrellaLimit"
                                 value={formData.umbrellaLimit}
                                 onChange={this.handleChange}
                            />

                            <div style={{
                                display:"flex",
                                width:"50%",
                                justifyContent:"center",
                                alignItems:"center"
                            }}>
                                <Button color="primary" style={{
                                    width:"50%"
                                }}
                                disabled={isLoading}
                                onClick={!isLoading? this.handlePredictClick : null}
                                >
                                    {isLoading? 'Predicting' : 'Predict'}
                                </Button>
                                <Button color="secondary" style={{
                                    width:"50%"
                                }}
                                disabled={isLoading}
                                onClick={this.handleCancelClick}>
                                    Reset
                                </Button>
                            </div>
                            {(this.state.open==true)?<CustomDialog 
                                                        open={this.state.open} 
                                                        title={"Prediction Result"} 
                                                        content={this.state.result} 
                                                        buttonText1={"Download Report"} 
                                                        buttonText2={"Cancel"} 
                                                        handleClose={this.closeDialog}/>
                                                    :""
                            }
                   </div>   
            </div>
        )
    }
}
