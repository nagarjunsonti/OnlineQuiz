import React, {Fragment} from "react";
import Button from '@material-ui/core/Button';
import SendSharpIcon from '@material-ui/icons/SendSharp';
import {useStylesSidebarFooter} from '../commonCss/CommonCss';
import {START_YOUR_TEST, START_TEXT } from '../Constants/Constants';
function SidebarFooter(props){
	let vocabularydataLength=props.userVocabularylist.length;	
	const classes = useStylesSidebarFooter();
	return (
			<Fragment>
				 <div className={'sidebarTitleDescription'}>
	        		{props.footerDescription}
	      		</div>
			     <div className={"testButtonDiv"}>
			        <span>{START_YOUR_TEST}</span>
			        <span>
			         	<Button
					        variant="contained"
					        color="primary"
					        className={classes.button}
					        endIcon={<SendSharpIcon />}
					        onClick= {props.handleStartbuttonClick}
					        disabled={(vocabularydataLength >= 20?false:true)}
					      >
					        {START_TEXT}
					      </Button>
			        </span>
			      </div>
			</Fragment>
		)
}

export default SidebarFooter;
