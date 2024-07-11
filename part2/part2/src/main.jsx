import React from 'react';
import ReactDOM from 'react-dom/client';

//Note to myself:
//since default is imported it can be imported under any name otherwise use: 
// "import {Component as MyNewName} from './Components'" 
//to import the Component component from the Components file under the name MyNewName

import App from './CourseInfo';
//import App from './Unicafe';
//import App from './Anecdotes';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
