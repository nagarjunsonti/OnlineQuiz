import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ReasultsComponent from '../components/ReasultsComponent';
import SidebarComponent from '../Sidebar/SidebarComponent';
import {connect} from 'react-redux';
import {FOOTER_DESCRIPTION_TEST, TEST_RESULT_TEST } from '../Constants/Constants';
function ResultsContainer(props){
	let sideBarTitle=TEST_RESULT_TEST;
	let foreignLanguage=props.userdata.foreignLanguage;	
	const footerDescription=FOOTER_DESCRIPTION_TEST;
	return (
		<Container  maxWidth="lg">
      		<CssBaseline />
      		<div className={"resultsContainerDiv"}>       			
		      	<Grid container spacing={3}>
		      		<Grid item xs={6} sm={8}>
		      			<div>		      				
		      				<ReasultsComponent 
		      					currentTestAnswersList={props.currentTestAnswersList}	
		      					selectedLanguage={foreignLanguage}
		      				/>
		      			</div>
		      		</Grid>
		      		<CssBaseline />
		      		<Grid item xs={6} sm={4}>
		      			<div className={"sidebarContainer"}>
		      				<SidebarComponent 
		      					title={sideBarTitle}
		      					titleDescription={false}     					
		      					userVocabularylist={props.userVocabularylist}
		      					donutTitle={TEST_RESULT_TEST}
		      					footerDescription={footerDescription}
		      					donutDat={props.currentTestresults}
		      					/>
		      			</div>
		      		</Grid>
		      	</Grid>
	      	</div>
      	</Container>
      )
}

const mapStateToProps=(state)=>{
  return {
  	userdata:{ ...state.userdata},  	
  	userVocabularylist:state.userVocabularylist,
  	currentTestAnswersList:state.currentTestAnswersList,    
    currentTestresults : state.currentTestresults
  }
}

export default connect(mapStateToProps)(ResultsContainer);