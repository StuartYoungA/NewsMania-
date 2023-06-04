
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {BrowserRouter,Routes,Route} from "react-router-dom";

export default class App extends Component {
  
  

  render() {
    return (
      <BrowserRouter>
      <div>
      <Navbar  />
        <Routes>

          <Route exact path='/' element={<News key="general" category={"general"}/>}/>
          <Route exact path='/business' element={<News key="business" category={"business"}/>}/>
          <Route exact path='/entertainment' element={<News key="entertainment" category={"entertainment"}/>}/>
          <Route exact path='/health' element={<News key="health" category={"health"}/>}/>
          <Route exact path='/science' element={<News key="science" category={"science"}/>}/>
          <Route exact path='/sports' element={<News key="sports" category={"sports"}/>}/>
          <Route exact path='/technology' element={<News key="technology" category={"technology"}/>}/>

          {/* if keys are not given then component will not get remount on clicking links */}


        </Routes>
        
      </div>
      </BrowserRouter>
    )
  }
}


// export default App;
