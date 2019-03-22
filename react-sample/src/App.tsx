import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppBar, Toolbar, LinearProgress } from '@material-ui/core'

import './App.css';
import logo from './logo.svg';

import SearchPage from './page/Search-page'
import QuestionPage from './page/Question-page'

interface IState {
  loading: boolean
}

class App extends React.Component<{}, IState> {

  constructor(props:any){
    super(props);
    this.state = {
      loading: false
    }
  }

  public handlePageLoading = (status: boolean)=>{
    this.setState({
      loading: status
    })
  }

  public render() {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React stackoverflow crawler</h1>
          </Toolbar>
        </AppBar>

        <LinearProgress className={this.state.loading ? "" : "hidden"} variant="indeterminate" />

        <main>
          <BrowserRouter>
            <React.Fragment>
              <Route path="/" render={()=>(<SearchPage pageLoading={this.handlePageLoading}/>)} />
              <Route path="/question/:question_id" render={() => (<QuestionPage pageLoading={this.handlePageLoading}/>) }/>
            </React.Fragment>
          </BrowserRouter>  
        </main>  
      </React.Fragment>
    );
  }
}

export default App;
