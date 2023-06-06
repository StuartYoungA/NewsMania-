
import './App.css';

import React, { Component,useEffect,useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter,Routes,Route} from "react-router-dom";

const pikey=process.env.REACT_APP_NEWSAPP

const App=(props)=> {
  
  const[progress,setProgress]=useState(0) //initially line zero pe hai top loading wali
  
  //since we dont have setprogress function in class based so we make it  (in docs they are using setprogress) 
  //visit videos web d projct and must see the class based implementation

  
  
 

  

 //comment of class based-- now we will take the value of progress from news component from props. ulta ho rha yha.. child se parent ko prop mil rha
  

  


    return (
      <BrowserRouter>
      <div>
      <Navbar  />
      <LoadingBar
        color='#f11946'
        progress={progress}
        
      />
        <Routes>

          <Route exact path='/' element={<News akey={pikey} newProgress={setProgress} key="general" category={"general"}/>}/>
          <Route exact path='/business' element={<News akey={pikey} newProgress={setProgress} key="business" category={"business"}/>}/>
          <Route exact path='/entertainment' element={<News akey={pikey} newProgress={setProgress} key="entertainment" category={"entertainment"}/>}/>
          <Route exact path='/health' element={<News akey={pikey} newProgress={setProgress} key="health" category={"health"}/>}/>
          <Route exact path='/science' element={<News akey={pikey} newProgress={setProgress} key="science" category={"science"}/>}/>
          <Route exact path='/sports' element={<News akey={pikey} newProgress={setProgress} key="sports" category={"sports"}/>}/>
          <Route exact path='/technology' element={<News akey={pikey} newProgress={setProgress} key="technology" category={"technology"}/>}/>

          {/* if keys are not given then component will not get remount on clicking links since passed for same component therefore need some distinctness */}


        </Routes>
        
      </div>
      </BrowserRouter>
    )
  
}


export default App;


// arrow uplabdh nhi hoga if arrow function nhi bnaaya...... setprogress ko for ex