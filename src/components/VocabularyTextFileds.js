import React from 'react';
import TextField from '@material-ui/core/TextField';
function vocabularyTextFileds (props){
	return (
		   <div>
            <TextField disabled id={props.EnglishVoc} value={props.EnglishVoc} /> 
            <TextField  label="Enter translate text" id={"translateID_"+props.index} variant="outlined" onBlur={props.handleTranslatecallBack}/>
           </div>
		);
}

export default vocabularyTextFileds;