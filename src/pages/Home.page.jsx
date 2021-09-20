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
      AC.updateUserList(userName);
      props.history.push("/questions");
    }
  };

  return (
    <>
      <div className="app2">
        <h3>Таблица лидеров</h3>
        <div>
          <ol>
            {state.user.userList.sort().slice(0, 5).map(user => {
              return (<li>{`${user}`}</li>)
            })}
          </ol>
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
