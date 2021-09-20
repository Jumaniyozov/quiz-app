import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import HomePage from './pages/Home.page';
import QuestionPage from './pages/Question.page';
import './App.scss';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './store';

function App() {

  

  return (
    <div className="App">
         <>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/questions" component={QuestionPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </>
    </div>
  );
}

export default App;
