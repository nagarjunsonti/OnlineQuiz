import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { CssBaseline, Container, Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {useStylesTestModel} from '../commonCss/CommonCss';
import { connect } from 'react-redux';
import TestFormComponent from '../components/TestFormComponent';
import {START_THE_TEST} from '../Constants/Constants';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TestModelComponent(props) {
  const { modelOpen, closeModelClick } = props;
  const classes = useStylesTestModel(); 
 
  const getTestQuestions=(userVocabularylist)=> {
    userVocabularylist=JSON.parse(userVocabularylist);
    if(userVocabularylist){        
        const shuffledList = userVocabularylist.sort(() => 0.5 - Math.random());
        let randamVocabularyList=shuffledList.slice(0, 20);
        return randamVocabularyList;
    }else{
      return [];
    }
  }
  const testQuestions= getTestQuestions(JSON.stringify(props.userVocabularylist));
  return (
    <div>
      <Dialog fullScreen open={modelOpen} onClose={closeModelClick} TransitionComponent={Transition}>
        <div className={'sidebarHeaderDiv'}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <div className={'sideBarTitleDiv'}><h2>{START_THE_TEST}</h2></div>
              <div className={"closeButtonDiv"}>
                <IconButton edge="start" color="inherit" onClick={closeModelClick} aria-label="close">
                  <CloseIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <CssBaseline />
        <Container>
          <Box my={2}>
            <div>
              <TestFormComponent testQuestionsdata={testQuestions} closeModelClick = {props.closeModelClick}/>
            </div>
          </Box>          
        </Container>
      </Dialog>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    usersList: state.usersList,
    userVocabularylist : state.userVocabularylist
  }
}
export default connect(mapStateToProps)(TestModelComponent);