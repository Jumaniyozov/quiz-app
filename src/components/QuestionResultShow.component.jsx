import React from 'react';

function QuestionResultShowComponent(props) {
    return <div className="score-section">
        Вы ответили правильно на {props.score} вопросов из {props.questionList.length}
        <button onClick={props.onClick}>На главную страницу</button>
    </div>;
}

export default QuestionResultShowComponent;

