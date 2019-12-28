import React, {useState, useEffect } from "react";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {useStylesAddText} from '../commonCss/CommonCss';
import {VOCABULARY_ADDED_TEXT, ENGLISH_TEXT, REMOVE_TEXT, VAIDATE_TEXT,
        SUBMIT_TEXT, ADD_VOCABULARY_DATA} from '../Constants/Constants';
function AddTextFields(props){
	const classes = useStylesAddText();	
	const [addFieldState, setAddFieldState]=useState([]);
	useEffect(()=>{		
		setAddFieldState(addFieldState => [...addFieldState, [{english:"", [props.foreignLanguage]:""}]])
	},[props.addFieldFlag]);

	const removeHandler = (i)=>{
		let textFieldslist = [...addFieldState];
     	textFieldslist.splice(i, 1);
     	setAddFieldState(addFieldState =>[...textFieldslist]);

	}
	const handleFieldChange = (i, e)=>{
	 const { name, value } = e.target;
     let textFieldslist = [...addFieldState];
     textFieldslist[i] = {...addFieldState[i], [name]: value.trim() };
     setAddFieldState(addFieldState =>[...textFieldslist]);

	}
	const handleFormSubmit = (event)=>{		
    	event.preventDefault();
    	props.updateVocabularyList(addFieldState);
    	setAddFieldState(addFieldState =>[]);
    	alert(VOCABULARY_ADDED_TEXT);    	
	}
	const getTextFields = ()=>{
		console.log(addFieldState);
		let itemsList= addFieldState.map((element, index)=>(

			<div  className={classes.root} style={{display:"flex"}} key={index}>				
				<TextValidator
		            variant="outlined"
		            margin="normal"
		            required
		            fullWidth		            
		            label={ENGLISH_TEXT}
		            name="english"
		            autoComplete="English"
		            autoFocus
		            value={element.english || ""}
		            validators={['required']}
		            errorMessages={[VAIDATE_TEXT]}		            
		            onChange={(e)=>{handleFieldChange(index, e);}}
          		/>
          		<TextValidator
		            variant="outlined"
		            margin="normal"
		            required
		            fullWidth		            
		            label={props.foreignLanguage}
		            name={props.foreignLanguage}
		            autoComplete={props.foreignLanguage}		            
		            value={element[props.foreignLanguage] || ""}
		            validators={['required']}
		            errorMessages={[VAIDATE_TEXT]}		            
		            onChange={(e)=>{handleFieldChange(index, e);}}
          		/>
          		<Button
		            type="button"
		            fullWidth
		            variant="contained"
		            color="secondary"
		            onClick={()=>{removeHandler(index);}}	
		            className={"submitButton"}            
		          >
	             	{REMOVE_TEXT}	
	          	</Button>
	         </div>
			));	

			return itemsList		
	}
	let textFieldsLength=addFieldState.length;
	return (
			<ValidatorForm  noValidate autoComplete="off" onSubmit={handleFormSubmit} name="addVocabulary">
				{getTextFields()}
				{textFieldsLength >0 && <Button
		            type="submit"
		            fullWidth
		            variant="contained"
		            color="primary"	            
		          >
	             {SUBMIT_TEXT}
	          	</Button>}
      		</ValidatorForm>
		)

}

const mapDispachToProps = (dispatch) => {
	return {		
		updateVocabularyList: (data) => {
			dispatch({ type: ADD_VOCABULARY_DATA, data: data })
		}
	}
}
export default connect(null, mapDispachToProps)(AddTextFields);