import {SITEJET_USER,GET_USER_DATA, SET_USER_DATA, IMPORT_DEFAULT_DATA,
			DELETE_USER_VOCABULARY, SUBMIT_VOCABULARY_TEST,	ADD_VOCABULARY_DATA } from '../Constants/Constants';

const localUserdata=JSON.parse(localStorage.getItem(SITEJET_USER));
const initialState = {
  userdata:(localUserdata)?localUserdata.userdata:{},
  defaultVocabularyimportedFlag:(localUserdata)?localUserdata.defaultVocabularyimportedFlag:false,
  userVocabularylist:(localUserdata)?localUserdata.userVocabularylist:[],  
  testAttmptsCount:(localUserdata)?localUserdata.testAttmptsCount:0,
  overallTestresuls:(localUserdata)?{ ...localUserdata.overallTestresuls}:{currectCount:0, inCurrectCount:0, notAttemptedCount:0},
  currentTestAnswersList:(localUserdata)?{ ...localUserdata.currentTestAnswersList}:[],  
  currentTestresults:(localUserdata)?{ ...localUserdata.currentTestresults}:{currectCount:0, inCurrectCount:0, notAttemptedCount:0}
}
const setLocalStorage = (data)=>{
	localStorage.clear()
	localStorage.setItem(SITEJET_USER, JSON.stringify(data));
}
const getPercentages = (count, totalaNumber)=>{
	if(parseInt(count) === 0){
		return count
	}
	let percentage = (parseInt(count)/parseInt(totalaNumber))*100;
  	return Math.round(percentage);
}
const caluculateCurrentTesteRsults =(resultsData, foreignLanguage)=>{
	let currectCount=0;
	let inCurrectCount=0
	let notAttempted=0
	resultsData.forEach((values)=>{
		if(typeof(values.answerText) === "undefined"){
			notAttempted=notAttempted+1;
		}else if(values.answerText.toLowerCase() === values[foreignLanguage].toLowerCase()){
			currectCount=currectCount+1;
		}else{
			inCurrectCount = inCurrectCount+1;
		}

	});
	  currectCount=getPercentages(currectCount, 20);
	  inCurrectCount=getPercentages(inCurrectCount, 20);
	  notAttempted=getPercentages(notAttempted, 20);
	return {"currectCount":currectCount, "inCurrectCount":inCurrectCount, "notAttemptedCount" : notAttempted};
}
const caluculateOverallTesteRsults = (current, overall, testCount)=>{
	let currectAvg=parseFloat(current.currectCount + overall.currectCount)/2;
	let inCurrectAvg=parseFloat(current.inCurrectCount + overall.inCurrectCount)/2;
	let notAttemptedAvg=parseFloat(current.notAttemptedCount + overall.notAttemptedCount)/2;
	return {"currectCount":Math.round(currectAvg), "inCurrectCount":Math.round(inCurrectAvg), "notAttemptedCount" : Math.round(notAttemptedAvg)};
}
const Reducer =(state = initialState, action)=>{
	let newState = { ...state };
	switch(action.type){
		case GET_USER_DATA :
		return  newState;

		case SET_USER_DATA :			
			newState.userdata={
				firstName:action.data.firstName.value,
				lastName:action.data.lastName.value, 
				foreignLanguage:action.data.foreignLanguage.value,
				email:action.data.email.value, 
				password:action.data.password.value
			}
			setLocalStorage(newState);			
			return  newState;

		case IMPORT_DEFAULT_DATA :
			let importData = action.data;			
			let currentdata = newState.userVocabularylist;
			let currentdataLength = importData.length;
			importData.forEach((element, i)=>{
				currentdata.push({...element, index:currentdataLength + i});
			});
			newState.userVocabularylist = currentdata;
			//newState.userVocabularylist.push(...action.data);
			newState.defaultVocabularyimportedFlag = true;
			setLocalStorage(newState);			
			return  newState;

		case DELETE_USER_VOCABULARY :			
			let vocabularyList=newState.userVocabularylist;
			vocabularyList = vocabularyList.filter((value) => {
		        return (!action.data.includes(value.index));
		      });
			newState.userVocabularylist= vocabularyList;
			if(vocabularyList.length <= 0){
				newState.defaultVocabularyimportedFlag= false;
			}
			setLocalStorage(newState);			
			return  newState;

		case SUBMIT_VOCABULARY_TEST :

			let testresults = action.data;
			let currentTextResultObj=caluculateCurrentTesteRsults(testresults, newState.userdata.foreignLanguage);
			newState.currentTestresults={
					currectCount:currentTextResultObj.currectCount, 
					inCurrectCount:currentTextResultObj.inCurrectCount, 
					notAttemptedCount:currentTextResultObj.notAttemptedCount
			}			
			newState.testAttmptsCount=newState.testAttmptsCount+1;

			newState.currentTestAnswersList=testresults;

			let overallTextResultObj = newState.overallTestresuls;
			newState.overallTestresuls=caluculateOverallTesteRsults(currentTextResultObj, overallTextResultObj, newState.testAttmptsCount);
			setLocalStorage(newState);			
			return  newState;

		case ADD_VOCABULARY_DATA :			
			let addedVocabularyList = action.data;
			let vocabularArray = newState.userVocabularylist;
			let vocabularyListLength= vocabularArray.length;
			let selectedLanguage= newState.userdata.foreignLanguage;

			addedVocabularyList.forEach((item, i)=>{
				vocabularArray.push({
					_id: Math.random().toString(36).slice(2),
					index:vocabularyListLength+i,
					english:item.english,
					[selectedLanguage]:item[selectedLanguage]
				})
			})
			newState.userVocabularylist=[...vocabularArray];			
			setLocalStorage(newState);			
			return  newState;		

		default :
		return  newState;
	}

}

export default Reducer;