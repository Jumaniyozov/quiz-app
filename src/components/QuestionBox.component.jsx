import React, {useEffect, useState} from "react";
import {questions} from "../data/tempData";
import {shuffle} from "../helpers/shuffler";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store";
import QuestionResultShowComponent from "./QuestionResultShow.component";
import QuestionFieldComponent from "./QuestionField.component";

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
        AC.updateUserList({
            name: userState.name,
            score: score,
            time: `${currMin < 10 ? `0${currMin}` : `${currMin}`}:${currSec < 10 ? `0${currSec}` : `${currSec}`}`,
        });
        props.history.push("/");
    };

    useEffect(() => {
        setInterval(() => {
            setCurrSec((prevState) => prevState + 1);
        }, 1000);
    }, []);

    useEffect(() => {
        console.log(currSec);
        if (currSec === 60) {
            setCurrMin((prevState) => prevState + 1);
            setCurrSec(0);
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
        <div className="question--box">
            {loading ? (
                <>
                    <h2>Загрузка...</h2>
                </>
            ) : (
                <>
                    {showScore ? (
                        <QuestionResultShowComponent score={score} questionList={questionList} onClick={handleClick}/>
                    ) : (
                        <QuestionFieldComponent currentQuestion={currentQuestion} questionList={questionList} currMin={currMin}
                                       currSec={currSec} callbackfn={(answerOption, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    handleAnswerOptionClick(answerOption.isCorrect)
                                }
                            >
                                {answerOption.answerText}
                            </button>
                        )}/>
                    )}
                </>
            )}
        </div>
    );
}
