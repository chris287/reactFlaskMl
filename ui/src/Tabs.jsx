import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BarCharts from './BarCharts'
import _ from 'underscore'
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function FullWidthTabs(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [data1,setData1] = React.useState([]);
  const [data2,setData2] = React.useState([]);
  const [exportFeattureVariable,setExportFeatureVariable] = React.useState({})
  const [incidentSeverityLabels,setIncidentSeverityLabels] = React.useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };
  React.useEffect(()=>{

  
  var incidentSeverityLabels = _.unique(props.features.incidentSeverity)
  incidentSeverityLabels.filter((value,index)=>{incidentSeverityLabels[index]=value.replace(" ","_")})
  var fraudDetectedLabels = _.unique(props.features.fraudReported)
  var incidentSeverityAgainstFraudValues = {[incidentSeverityLabels[0]+"DetectedYes"]:0,
                                              [incidentSeverityLabels[1]+"DetectedYes"]:0,
                                              [incidentSeverityLabels[2]+"DetectedYes"]:0,
                                              [incidentSeverityLabels[3]+"DetectedYes"]:0,
                                              [incidentSeverityLabels[0]+"DetectedNo"]:0,
                                              [incidentSeverityLabels[1]+"DetectedNo"]:0,
                                              [incidentSeverityLabels[2]+"DetectedNo"]:0,
                                              [incidentSeverityLabels[3]+"DetectedNo"]:0,
                                          };
var promise = new Promise((resolve,reject)=>{
    
    resolve(
       props.features.incidentSeverity.map((value,index)=>{
            var fraudValue = props.features.fraudReported[index];
            if(value.replace(" ","_") == incidentSeverityLabels[0]){
                if(fraudValue=="Y"){
                    incidentSeverityAgainstFraudValues.Major_DamageDetectedYes+=1
                }else{
                    incidentSeverityAgainstFraudValues.Major_DamageDetectedNo+=1
                }
            }else if(value.replace(" ","_") == incidentSeverityLabels[1]){
                if(fraudValue=="Y"){
                    incidentSeverityAgainstFraudValues.Minor_DamageDetectedYes+=1
                }else{
                    incidentSeverityAgainstFraudValues.Minor_DamageDetectedNo+=1
                }
            }else if(value.replace(" ","_") == incidentSeverityLabels[2]){
                if(fraudValue=="Y"){
                    incidentSeverityAgainstFraudValues.Total_LossDetectedYes+=1
                }else{
                    incidentSeverityAgainstFraudValues.Total_LossDetectedNo+=1
                }
            }else{
                if(fraudValue=="Y"){
                    incidentSeverityAgainstFraudValues.Trivial_DamageDetectedYes+=1
                }else{
                    incidentSeverityAgainstFraudValues.Trivial_DamageDetectedNo+=1
                }
            }
            
        })
        
    )
}).then((response)=>{
    setExportFeatureVariable(incidentSeverityAgainstFraudValues)
    setIncidentSeverityLabels(incidentSeverityLabels)
})
},[])



  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",width:"100%"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{style:{background:"#05386B",boxShadow:"0px 0px 20px #05386B"}}}
          variant="fullWidth"
          style={{color:"#05386B"}}
          aria-label="full width tabs example"
        >
          {props.tabNames.map((value,index)=>{
              return <Tab label={value}/>
          })}
        </Tabs>

<SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        
        onChangeIndex={handleChangeIndex}
      >
          {
              props.tabNames.map((item,index)=>{
                  if(index==0){
                    return <TabPanel value={value} index={index} dir={theme.direction} >
                            {<BarCharts 
                                data1={[
                                    exportFeattureVariable.Major_DamageDetectedYes,
                                    exportFeattureVariable.Minor_DamageDetectedYes,
                                    exportFeattureVariable.Total_LossDetectedYes,
                                    exportFeattureVariable.Trivial_DamageDetectedYes
                                ]}
                                data2={[
                                    exportFeattureVariable.Major_DamageDetectedNo,
                                    exportFeattureVariable.Minor_DamageDetectedNo,
                                    exportFeattureVariable.Total_LossDetectedNo,
                                    exportFeattureVariable.Trivial_DamageDetectedNo
                                ]}
                                categories={incidentSeverityLabels}
                                title={"Incident Severity v/s Class Variable"}
                            />}
                        </TabPanel>
                  }else{
                      return ""
                  }
                  
              })
          }
      </SwipeableViews>

      
    </div>
  );
}