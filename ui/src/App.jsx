import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import HomeIcon from '@material-ui/icons/Home'
import {BrowserRouter as Router,Route,Switch,Link,NavLink} from 'react-router-dom'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'
import FaceBookIcon from '@material-ui/icons/Facebook'
import './common.scss' 

import Main from './Main'
import Notifications from './Notifications'
import Account from './Account'
import DataSets from './DataSets'
import Contribute from './Contribute'
import EDA from './ExplorativeDataAnalysis'

export default class App extends Component {
    render = () => {
        return (
            <div className="ficds-main-container">
                <Router>
                <div className="ficds-header-container">
                    <AppBar position="static" id="appBar">
                            <Toolbar>
                                <div className="toolBarContainer">
                                    <IconButton>
                                        <MenuIcon color="#05386B"/>
                                    </IconButton>
                                    
                                    <Typography variant="h6" id="toolBarContainer-typography">
                                        False Automobile Insurance Claim Prediction System
                                    </Typography>

                                    <div className="headerIconButtons-container">
                                        <Link to= '/'>
                                            <IconButton>
                                                <HomeIcon id='headerIcons'/>
                                            </IconButton>
                                        </Link>
                                        
                                        <Link to='/notifications'>
                                            <IconButton>
                                                <NotificationsActiveIcon id='headerIcons'/>
                                            </IconButton>
                                        </Link>
                                        
                                        <Link to='/account'>
                                            <IconButton>
                                                <Avatar id='headerIcons-Avatar'>A</Avatar>
                                            </IconButton>
                                        </Link>  
                                    </div>
                                </div>
                            </Toolbar>
                        </AppBar>
                </div>

                <div className="ficds-content-container">
                    <Switch>
                        <Route exact path="/">
                            <Main />
                        </Route>
                        <Route path='/notifications'>
                            <Notifications />
                        </Route>
                        <Route path='/account' >
                            <Account/>
                        </Route>
                        <Route path="/datasets">
                            <DataSets/>
                        </Route>
                        <Route path="/contribute">
                            <Contribute/>
                        </Route>
                        <Route path='/explorativeDataAnalysis'>
                            <EDA/>
                        </Route>
                    </Switch>
                </div>
                
                <div className="ficds-footer-container">
                    <div className="copyright-container">
                        &copy; 2020 sacaim2k19.ac.in
                    </div>
                    <div className="footer-links-container">
                        <NavLink to='/datasets' style={{textDecoration:"none",color:"black"}}><span>&#8226;&nbsp;&nbsp;Datasets</span></NavLink>
                        <NavLink to='/contribute' style={{textDecoration:"none",color:"black"}}><span >&nbsp;&nbsp;&nbsp;&#8226;&nbsp;&nbsp;Contribute</span></NavLink>
                        <NavLink to='/explorativeDataAnalysis' style={{textDecoration:"none",color:"black"}}><span>&nbsp;&#8226;&nbsp;&nbsp;Explorative Data Analysis</span></NavLink>
                    </div>
                    <div className="footer-socialmedia-icons-container">
                        <IconButton style={{color:"black"}}><TwitterIcon/></IconButton>
                        <IconButton style={{color:"black"}}><LinkedInIcon/></IconButton>
                        <IconButton style={{color:"black"}}><FaceBookIcon/></IconButton>
                        
                    </div>
                </div>
                </Router>
            </div>
            
            
        )
    }
}
