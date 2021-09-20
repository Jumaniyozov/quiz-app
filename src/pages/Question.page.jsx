import React from 'react';
import MainBox from "../components/QuestionBox.component";

function QuestionPage(props) {
    return (
        <MainBox history={props.history}/>
    );
}

export default QuestionPage;