import React from 'react';

function QuestionFieldComponent(props) {
    return (<>
        <div className="question-section">
            <div className="question--text__section">
                <div className="question-count">
                    <span>Вопрос {props.currentQuestion + 1}</span>/
                    {props.questionList.length}
                </div>
                <div className="question-text">
                    {props.questionList[props.currentQuestion].questionText}
                </div>
            </div>
            <div className="question--time__section">
                <p>
                    <span id="seconds">{`${props.currMin}`}</span>:
                    <span id="tens">{`${props.currSec}`}</span>
                </p>
            </div>
        </div>
        <div className="answer-section">
            {props.questionList[props.currentQuestion].answerOptions.map(
                props.callbackfn
            )}
        </div>
    </>);
}

export default QuestionFieldComponent;
