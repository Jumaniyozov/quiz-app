import React, { useEffect, useState } from "react";
import { questions } from "../data/tempData";
import { shuffle } from "../helpers/shuffler";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../store";

export default function MainBox(props) {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const AC = bindActionCreators(actionCreators, dispatch);


  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [currSec, setCurrSec] = useState(0);
  const [currMin, setCurrMin] = useState(0);


  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionList.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleClick = () => {
    AC.updateUserList({name: userState.name, score: score, time: `${currMin}:${currSec}`});
    props.history.push("/")
  }

  

  useEffect( () => {
    setInterval(() => { setCurrSec(prevState => (prevState + 1));}, 1000);
    }, []);
    
  useEffect( () => {
     console.log(currSec)
    if(currSec === 60) {
      setCurrMin(prevState => (prevState + 1));
      setCurrSec(0)
    }
  }, [currSec]);

  useEffect(() => {
    const get5RandomQuestions = async () => {
      const shuffled = shuffle(questions);
      return shuffled.slice(0, 5);
    };

    get5RandomQuestions().then((data) => {
      setQuestionList(data);
    });
  }, []);

  useEffect(() => {
    if (questionList.length >= 5) {
      setLoading(false);
    }
  }, [questionList]);

  return (
    <div className="app">
      {loading ? (
        <>
          <h2>Загрузка...</h2>
        </>
      ) : (
        <>
          {showScore ? (
            <div className="score-section">
              Вы ответили правильно на {score} вопросов из {questionList.length}
              {/* <Link to="/">Home</Link> */}
              <button onClick={handleClick}>На главную страницу</button>
            </div>
          ) : (
            <>
              <div class="wrapper">
                <p>
                  <span id="seconds">{`${currMin}`}</span>:<span id="tens">{`${currSec}`}</span>
                </p>
              </div>
              <div className="question-section">
                <div className="question-count">
                  <span>Вопрос {currentQuestion + 1}</span>/
                  {questionList.length}
                </div>
                <div className="question-text">
                  {questionList[currentQuestion].questionText}
                </div>
              </div>
              <div className="answer-section">
                {questionList[currentQuestion].answerOptions.map(
                  (answerOption, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleAnswerOptionClick(answerOption.isCorrect)
                      }
                    >
                      {answerOption.answerText}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
