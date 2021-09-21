import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store";

export default function HomePage(props) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const AC = bindActionCreators(actionCreators, dispatch);
    const [userName, setUserName] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (userName.length > 0 && userName.trim() !== "") {
            AC.setUserName(userName);
            props.history.push("/questions");
        }
    };

    return (
        <>
            <div className="app--secondary">
                <h1>Таблица лидеров</h1>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Имя</th>
                            <th>Очки</th>
                            <th>Время</th>
                        </tr>
                        </thead>
                        <tbody>
                        {state.user.userList
                            .sort((first, second) => {
                                if (first.score > second.score) {
                                    return -1;
                                }
                                if (first.score < second.score) {
                                    return 1;
                                }
                                return 0;
                            })
                            .slice(0, 5)
                            .map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{`${index + 1}`}</td>
                                        <td>{`${user.name}`}</td>
                                        <td>{`${user.score}`}</td>
                                        <td>{`${user.time}`}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <ol></ol>
                </div>
            </div>

            <div className="app">
                <div className="app--header__section">
                    <h3>Пожалуйста введите ваше имя</h3>
                </div>

                <div className="app--form__section">
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p className="user--text__name">Имя Пользователя:</p>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </label>
                        <button type="submit">Начать</button>
                    </form>
                </div>
            </div>
        </>
    );
}
