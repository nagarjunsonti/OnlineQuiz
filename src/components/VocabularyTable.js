import React, {useState, useEffect} from 'react';
import TableWidget from '../widgets/TableWidget';
import {connect} from 'react-redux';

function VocabularyTable (props){	
	let foreignLanguage=props.userdata.foreignLanguage;
	const [stateTableData, setStateTableDate]=useState({	    
	    searchFilterValue:"",
	    tableRows: props.userVocabularylist,
	    importFlag:props.defaultVocabularyimportedFlag
    });  
	const getLanguage = ()=>{
		let foreignLanguage=props.userdata.foreignLanguage;
		return foreignLanguage;
	}
	const columns = [
	  { key_id: 'english', numeric: false, disablePadding: true, label: 'English', sortFlag: true },
	  { key_id: foreignLanguage, numeric: false, disablePadding: true, label: getLanguage(), sortFlag: true }	  
	];
	useEffect(()=>{
		setStateTableDate({...stateTableData, 
			tableRows:props.userVocabularylist,
			importFlag:props.defaultVocabularyimportedFlag
		});
	},[props.userVocabularylist])
	
  	const handleTableSearch = (string)=>{
  		let searcheddata=string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
  		let regex = new RegExp(searcheddata, 'gi');
  		let userFilterData=[];
  		let vocabularyList=stateTableData.tableRows;
  		if(string){
  			userFilterData = vocabularyList.filter((value) => {
				return value.english.match(regex)
				
			});
  		}else{
  			userFilterData=props.userVocabularylist;
  		}
  		
  		setStateTableDate({...stateTableData, tableRows:userFilterData});  		
  	}
   return (
   		<TableWidget
	        rows={stateTableData.tableRows}
	        defaultSort='nativeL'
	        columns={columns}
	        tableTitle={props.tabletitle}	        
	        handleToolBarAction={props.deleteSelectedRows}	        
	        handleTableSearch={handleTableSearch} 
	        searchPlaceholder="Search By English"
	        searchFilterValue={stateTableData.searchFilterValue} 
	        importVocabularyList={props.importVocabularyList}
	        importFlag={props.defaultVocabularyimportedFlag}
      />

   	);
}
const mapStateToProps=(state)=>{
  return {    
    defaultVocabularyimportedFlag : state.defaultVocabularyimportedFlag 
  }
}
export default connect(mapStateToProps)(VocabularyTable)
