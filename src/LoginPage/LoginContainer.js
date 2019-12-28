import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {connect} from 'react-redux';
import useStyles from '../commonCss/CommonCss';
import {LOGIN_ERROR_TEXT, SIGN_IN_TEXT, EMAIL_ADDRESS_TEXT, VAIDATE_TEXT,
        EMAIL_ERROR, PASSWORD_TEXT} from '../Constants/Constants';

function LoginContainer(props) {
  const classes = useStyles();
  const [formData, setFordata]=useState({  	
  	email:{value:"", error:false},
  	password:{value:"", error:false},
  	loginFailed:false	
  });

  const handleFieldChange =(e)=>{  	
  	e.preventDefault();
  	let errorFlag=false;;
  	const { name} = e.target;
  	if(e.target.value ===""){
  		errorFlag=true;
  	}
  	setFordata({...formData, [name]:{value:e.target.value.trim(),error: errorFlag}});
  }
  const validateUserLogin =()=>{  	
  	let flag=(formData.email.value === props.userdate.email && formData.password.value === props.userdate.password)?true:false;
  	return flag;
  }
  const handleFormSubmit =(e)=>{
  	e.preventDefault();
  	var promise = new Promise(function(resolve, reject) {
  			let flag = validateUserLogin();
  			if(flag)		
				resolve();
			else
				reject();		
		}); 

	promise.then(function () {			
			props.history.push('/')
		}).catch(function () { 
			setFordata({...formData, loginFailed:true});
		});  	
  } 

  return (
    <Container component="main" maxWidth="xs">    
      <CssBaseline />
      <div className={classes.paper}>
      	{formData.loginFailed &&
            <div className={'alert alert-danger'}>{LOGIN_ERROR_TEXT}</div>
        }
      
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {SIGN_IN_TEXT}
        </Typography>
        <ValidatorForm className={classes.form} noValidate autoComplete="off" onSubmit={handleFormSubmit} name="loginform">
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={EMAIL_ADDRESS_TEXT}
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email.value || ""}
            validators={['required', 'isEmail']}
            errorMessages={[VAIDATE_TEXT, EMAIL_ERROR]}
            error = {formData.email.error || false }
            onChange={handleFieldChange}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={PASSWORD_TEXT}
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password.value || ""}
            validators={['required']}
            errorMessages={[VAIDATE_TEXT]}
            error = {formData.password.error || false }
            onChange={handleFieldChange}
      />          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {SIGN_IN_TEXT}
          </Button>
          <Grid container>
            <Grid item xs>
              <span className={'disableLink'}>
                Forgot password?
              </span>
            </Grid>            
          </Grid>
        </ValidatorForm>
      </div>      
    </Container>
  );
}
const mapSTateToProps = (state)=>{
	return {
		userdate:state.userdata
	}
}

export default connect(mapSTateToProps) (LoginContainer)