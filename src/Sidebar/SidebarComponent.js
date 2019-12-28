import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import DonutChartComponent from '../components/DonutChartComponent';
import TestModelComponent from '../components/TestModelComponent';
import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';

function SidebarComponent(props){
	const [modelData, setModelData]=useState({
	    modelOpen:false	    
  	});

	const handleStartbuttonClick =()=>{
		setModelData({modelOpen:true});
	}
	const handleClickModelClose = (data) => {
    	setModelData({modelOpen:false});
  	}
	return (
	    <Paper>
	      <SidebarHeader title={props.title} testAttmptsCount={props.testAttmptsCount} 
	      				titleDescription={props.titleDescription}
	      	/>
	      <div className={'donutChartDive'}>
	      		<DonutChartComponent 
		      		donutTitle={props.donutTitle}
			      	donutDat={props.donutDat}
		      	/>
	      </div>
	      <SidebarFooter 
	      		handleStartbuttonClick={handleStartbuttonClick}
	      		userVocabularylist={props.userVocabularylist} 
	      		footerDescription={props.footerDescription}
	      />     
	      <TestModelComponent
	      		closeModelClick={handleClickModelClose}
                modelOpen={modelData.modelOpen}                                        
            />
	    </Paper>
  	);

}

export default SidebarComponent;