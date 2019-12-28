import React from 'react';
import imgLogo from './images/sitejet-logo1.png';
import {AppBar, Toolbar,Typography,CssBaseline, Container, Box} from '@material-ui/core';
import {BrowserRouter as Router,  Switch, Redirect} from 'react-router-dom';
import './App.css';
import {RedirectRoute, RedirectRouteresults, RedirectRouteLoginRegister} from './components/RedirectRoute';
import HomePageContainer from './HomePage/HomePageContainer';
import LoginContainer from './LoginPage/LoginContainer';
import RegisterContainer from './RegisterPage/RegisterContainer';
import ResultsContainer from './ResultsPage/ResultsContainer';
import history from './components/history/history';
import {connect} from 'react-redux';

function App(props) {
  const getFullName = ()=>{
    if(props.userdata && props.userdata.firstName){
      return `Hellow ${props.userdata.firstName}`;
    }else{
      return "";
    }
    
  }
  return (
    <div className="App">
      <CssBaseline />
      <AppBar>
        <div className={"navHeader"}>
          <div style={{width:"80%"}}>
            <Toolbar>
              <a href={'/'} >                 
                <img src={imgLogo} alt="Sitejet" with="50px" height="50px" />
              </a>
              <Typography variant="h6" > Vocabulary Learner </Typography>
            </Toolbar>
          </div>
          <div className={"userProfile"}>
            {getFullName()}
          </div>
        </div>
      </AppBar>
      <Toolbar />      
      <Container>
        <Box my={2}>{                    
              <Router history={history} >
                <div className={"mainContainerDiv"}>
                  <Switch>
                    <RedirectRoute exact path="/" component={HomePageContainer} />
                    <RedirectRoute exact path="/login" component={LoginContainer} />                                    
                    <RedirectRouteLoginRegister path="/register" component={RegisterContainer} />
                    <RedirectRouteresults exact path="/results" component={ResultsContainer} />                  
                    <Redirect from="*" to="/" />
                  </Switch>
                </div>
              </Router>             
          }
        </Box>
    </Container>    
    </div>
  );
}

const mapStateToProps=(state)=>{
  return {
    userdata:{ ...state.userdata}    
  }
}

export default connect(mapStateToProps)(App);
