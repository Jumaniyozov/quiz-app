import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import HomePage from './pages/Home.page';
import QuestionPage from './pages/Question.page';
import './App.scss';

function App() {

  

  return (
    <div className="App">
         <>
            <BrowserRouter>
                <>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/questions" component={QuestionPage}/>
                    </Switch>
                </>
            </BrowserRouter>
        </>
    </div>
  );
}

export default App;
