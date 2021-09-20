import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../store";

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
      <div className="app2">
        <h3>Таблица лидеров</h3>
        <div>
          <table>
            <tr>
              <th>№</th>
              <th>Имя</th>
              <th>Очки</th>
              <th>Время</th>
            </tr>
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
                  <tr>
                    <th>{`${index + 1}`}</th>
                    <th>{`${user.name}`}</th>
                    <th>{`${user.score}`}</th>
                    <th>{`${user.time}`}</th>
                  </tr>
                );
              })}
          </table>
          <ol></ol>
        </div>
      </div>

      <div className="app3">
        <h3>Пожалуйста введите ваше имя</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Имя Пользователя:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}
