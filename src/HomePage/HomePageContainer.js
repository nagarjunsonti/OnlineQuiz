import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import VocubularyTable from '../components/VocabularyTable';
import SidebarComponent from '../Sidebar/SidebarComponent';
import {connect} from 'react-redux';
import defaultVocabularyList from '../data/defaultVocabulary';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddTextFields from '../components/AddTextFields';
import {OVERALL_PERFORMANCE,TABLE_TITLE, 
		FOOTER_DESCRIPTION, FOOTER_DESCRIPTION_NO_DATA, 
		TABLE_TITLE_NO_DATA, IMPORT_DEFAULT_DATA, DELETE_USER_VOCABULARY, ADD_VOCABULARY_TEXT } from '../Constants/Constants';

function HomeContainer(props){
	const [addFieldFlag, setAddFieldFlag] = useState(false);
	let sideBarTitle=OVERALL_PERFORMANCE;
	let tabletitle = TABLE_TITLE;
	let foreignLanguage=props.userdata.foreignLanguage;
	let vocabularydataLength=props.userVocabularylist.length;
	let footerDescription = FOOTER_DESCRIPTION;
	if(vocabularydataLength <= 0){
		footerDescription = FOOTER_DESCRIPTION_NO_DATA;
		tabletitle = TABLE_TITLE_NO_DATA;
	}
	const importVocabularyList=()=>{
		props.importDefaltVocabularyList(defaultVocabularyList[foreignLanguage]);		
  	}
  	const handleAddbuttonClick = ()=>{
  		setAddFieldFlag({addFieldFlag:true});
  	}  	
	return (
		<Container  maxWidth="lg">
      		<CssBaseline />
      		<div >       			
		      	<Grid container spacing={3}>
		      		<Grid item xs={6} sm={8}>
		      			<div className={"homeContainerDiv"}>
		      				<VocubularyTable 
		      					importVocabularyList={importVocabularyList}
		      					userVocabularylist={props.userVocabularylist}
		      					userdata={props.userdata}
		      					deleteSelectedRows={props.deleteSelectedRows}
		      					tabletitle={tabletitle}
		      				/>
		      				<div className={"addButtonDiv"}>
		      					<div className={"addiConTitle"}>{ADD_VOCABULARY_TEXT} </div>
		      					<div>
				      				<Fab color="primary" aria-label="add" onClick={handleAddbuttonClick}>
		        							<AddIcon />
		      						</Fab>
	      						</div>
      						</div>
      						<div>
      							{(addFieldFlag) && <AddTextFields foreignLanguage={foreignLanguage} addFieldFlag={addFieldFlag}/>}
      						</div>      						
		      			</div>
		      		</Grid>
		      		<CssBaseline />
		      		<Grid item xs={6} sm={4}>
		      			<div className={"sidebarContainer"}>
		      				<SidebarComponent 
		      					title={sideBarTitle} 
		      					testAttmptsCount={props.testAttmptsCount}
		      					userVocabularylist={props.userVocabularylist}
		      					donutTitle={OVERALL_PERFORMANCE}
		      					donutDat={props.overallTestresuls}
		      					footerDescription={footerDescription}
		      					titleDescription={true} 
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
    testAttmptsCount:state.testAttmptsCount,
    overallTestresuls : state.overallTestresuls
  }
}
const mapDispachToProps = (dispatch) => {
	return {		
		importDefaltVocabularyList: (data) => {
			dispatch({ type: IMPORT_DEFAULT_DATA, data: data })
		},		
		deleteSelectedRows: (seletedRowIds) => {
			dispatch({ type: DELETE_USER_VOCABULARY, data: seletedRowIds });
		}
	}
}

export default connect(mapStateToProps, mapDispachToProps)(HomeContainer);