import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App = ()=> {
  const pageSize = 100;
  const apiKey = "14da4bb951c8446fb23bc24be12a73bc"
  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
          <NavBar/> 
          <LoadingBar
          height={3}
          color='#f11946'
          progress={progress} 
          />
          <Routes>
              <Route path="/entertainment" element = {<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize = {pageSize} country = "in" category = "entertainment"/>}/>
              <Route path="/health" element = {<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize = {pageSize} country = "in" category = "health"/>}/>
              <Route path="/general" element = {<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize = {pageSize} country = "in" category = "general"/>}/>
              <Route path="/business" element = {<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize = {pageSize} country = "in" category = "business"/>}/>
              <Route path="/sports" element = {<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize = {pageSize} country = "in" category = "sports"/>}/>
              <Route path="/science" element = {<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize = {pageSize} country = "in" category = "science"/>}/>
              <Route path="/technology" element = {<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize = {pageSize} country = "in" category = "technology"/>}/>
              <Route path='/' element={<News setProgress={setProgress} key="general" apiKey={apiKey} pageSize={pageSize} country="in" category="general"/>} />
          </Routes>
        </Router>
      </div>
    
    )
 
}

export default App;





