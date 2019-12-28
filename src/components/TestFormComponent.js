import React, {useRef} from 'react';
//import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router";
import {useStylesTestForm, QontoConnector} from '../commonCss/CommonCss';
import {TEST_DESCRIPTION, SUBMIT_TEXT, FINISH_TEXT, NEXT_TEXT,
        SUBMIT_VOCABULARY_TEST} from '../Constants/Constants';

function TestFormComponent(props) {
  const classes = useStylesTestForm();
  let textInput = useRef(null);
  const [activeStep, setActiveStep] = React.useState(0);  
  const testQuestions=props.testQuestionsdata;
  const steps = props.testQuestionsdata;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }; 

  const handleSubmit = () => {    
    var promise = new Promise(function(resolve, reject) {
        props.handleSubmitTest(testQuestions);            
        resolve();         
    }); 

    promise.then(function () {       
        props.closeModelClick();
        props.history.push('/results');        
      }).catch(function () { 
        console.log("error")
      });
  };  
  const handleTranslateText =(e)=>{    
    let index=e.target.id.split("translateID_")[1];
    let answerValue=e.target.value.trim();    
    testQuestions[index].answerText=answerValue;    
  }
const getStepContent =(stepIndex, listData)=> {  
    let index=stepIndex;
    let EnglishVoc=listData[index].english;
    let foreignLanguage =props.userdata.foreignLanguage;  
    return (
            <div>
              <TextField disabled id={listData[index].english} label="English verb" value={EnglishVoc} variant="outlined"/> 
              <TextField  inputRef={textInput}  label={`${foreignLanguage} verb`} id={"translateID_"+index} variant="outlined" onBlur={handleTranslateText}/>
            </div>
    );
}
  if(textInput.current){
    textInput.current.value = "";
  }
return (
  <div className={"testPageContainer"}>
    <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
      {steps.map(label => (
        <Step key={label}>
          <StepLabel></StepLabel>
        </Step>
      ))}
    </Stepper>
    <div>
      {activeStep === steps.length ? (
        <div style={{textAlign:"center"}}>
          <Typography className={classes.instructions}>{TEST_DESCRIPTION}</Typography>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>{SUBMIT_TEXT}</Button>
        </div>
      ) : (
        <div className={"testContainerDiv"}>
          <div className={classes.instructions}>{getStepContent(activeStep, steps)}</div>
          <div>              
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? FINISH_TEXT : NEXT_TEXT}
            </Button>
          </div>
        </div>
      )}
    </div>
  </div>
);
}
const mapStateToProps=(state)=>{
  return {
    userdata:{ ...state.userdata},
    userVocabularylist : state.userVocabularylist
  }
}

const mapDispachToProps =(dispatch)=>{
  return {
    handleSubmitTest:(results)=>{
      dispatch({ type: SUBMIT_VOCABULARY_TEST, data: results });
    }
  }

}

export default withRouter(connect(mapStateToProps,mapDispachToProps )(TestFormComponent));