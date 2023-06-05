
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter,Routes,Route} from "react-router-dom";

export default class App extends Component {
  
  constructor(){
    super()
    this.state={
      progress:0 //initially line zero pe hai top loading wali
    }
    
  }
  //since we dont have setprogress function in class based so we make it  (in docs they are using setprogress)
  setProgress=(chaipeelo)=>{
    this.setState({
      progress:chaipeelo
    })
  }

  

  //now we will take the value of progress from news component from props. ulta ho rha yha.. child se parent ko prop mil rha
  

  apikey=process.env.REACT_APP_NEWSAPP
  

  render() {
    return (
      <BrowserRouter>
      <div>
      <Navbar  />
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
        <Routes>

          <Route exact path='/' element={<News akey={this.apikey} newProgress={this.setProgress} key="general" category={"general"}/>}/>
          <Route exact path='/business' element={<News akey={this.apikey} newProgress={this.setProgress} key="business" category={"business"}/>}/>
          <Route exact path='/entertainment' element={<News akey={this.apikey} newProgress={this.setProgress} key="entertainment" category={"entertainment"}/>}/>
          <Route exact path='/health' element={<News akey={this.apikey} newProgress={this.setProgress} key="health" category={"health"}/>}/>
          <Route exact path='/science' element={<News akey={this.apikey} newProgress={this.setProgress} key="science" category={"science"}/>}/>
          <Route exact path='/sports' element={<News akey={this.apikey} newProgress={this.setProgress} key="sports" category={"sports"}/>}/>
          <Route exact path='/technology' element={<News akey={this.apikey} newProgress={this.setProgress} key="technology" category={"technology"}/>}/>

          {/* if keys are not given then component will not get remount on clicking links */}


        </Routes>
        
      </div>
      </BrowserRouter>
    )
  }
}


// export default App;


// arrow uplabdh nhi hoga if arrow function nhi bnaaya...... setprogress ko for ex