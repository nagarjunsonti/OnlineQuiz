import React, {Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import NotInterestedRoundedIcon from '@material-ui/icons/NotInterestedRounded';
import {CORRECT_ANSWER_TEXT, INCORRECT_ANSWER_TEXT, NOT_ATTEMPTED_TEXT } from '../Constants/Constants';

function ReasultsComponent(props){	
	const {selectedLanguage} = props
	let correct=0;
	let inCorrect=0;
	let notAttempeted =0;
	let answerList = props.currentTestAnswersList;

	const getIcon = (answer)=>{
		if(typeof(answer.answerText) === "undefined"){
			notAttempeted = notAttempeted + 1;
			return <NotInterestedRoundedIcon className={"notAttempeted"} />;
			
		}else if(answer.answerText.toLowerCase() === answer[selectedLanguage].toLowerCase()){
			correct = correct+1;
			return <CheckCircleRoundedIcon className={"correct"}/>;
			
		}else{
			inCorrect = inCorrect + 1;
			return <CancelRoundedIcon className="inCorrect"/>;
			
		}
	}
		
	return (
		<Fragment>
		<div className={'resultsContainer'}>
			{Object.values(answerList).map((item, indx)=>{				
			    return (
			    	<div className={"resultsDiv"} key={"id_"+ Math.random()}>
						<div className={'resultTextField'}>
							<TextField disabled label="English" defaultValue={item.english} />
						</div>
						<div className={'resultTextField'}>
							<TextField disabled label={selectedLanguage} defaultValue={item[selectedLanguage]} />
						</div>
						<div className={'resultTextField'}>
							<TextField disabled label="Your Answer" defaultValue={(item.answerText)?item.answerText:"not answered"} />
						</div>

						<div>
							{getIcon(item)}
						</div>
					</div>
				)
			})}
		</div>
		<div className={"legendsDiv"}> 
					<div><CheckCircleRoundedIcon className={"correct"}/> </div>
					<div className={"testLegends"}>{CORRECT_ANSWER_TEXT}: {correct}</div> 
					<div><CancelRoundedIcon className="inCorrect"/></div>
					<div className={"testLegends"}> {INCORRECT_ANSWER_TEXT}: {inCorrect}</div> 
					<div><NotInterestedRoundedIcon className={"notAttempeted"} /></div>
					<div className={"testLegends"}> {NOT_ATTEMPTED_TEXT}: {notAttempeted} </div>
		</div>
	</Fragment>
	);
 
}
export default ReasultsComponent;