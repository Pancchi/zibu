import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route ,Link} from 'react-router-dom';
import CreateProject from './createProject/CreateProject' ;
import PreviewProject from './previewProject/PreviewProject';
import  AssignmentTwo  from "./AssignmentTwo/AssignmentTwo";
import Assign from './AssignmentTwo/assign';
import AssignThree from "./Assignment3/AssignThree";
import "./App.css";
 class App extends Component {
  constructor(props) {
    super(props);
   
}
state={
  
}



  render() {
    return (
      <div>
        <Router>
        <Link to="/Assignment3">
     <button className="btn btn-outline-primary btnstyle2">
        <p>Assignment 3</p>
     </button>
 </Link>
        <Link to="/Assignment2">
     <button className="btn btn-outline-primary btnstyle2">
        <p>Assignment 2</p>
     </button>
 </Link>
        <Link to="/assignment1">
     <button className="btn btn-outline-primary btnstyle2">
        <p>Assignment 1</p>
     </button>
 </Link>
 
        
              
            
					<Switch>
						<Route path="/assignment1" component={CreateProject} />
            <Route exact={true} path="/" component={CreateProject} />
						<Route path="/Preview" component={PreviewProject} />
            <Route path="/assignment" component={AssignmentTwo} />
            <Route path="/Assignment2" component={Assign} />
            <Route path="/Assignment3" component={AssignThree} />
						
					</Switch>
				</Router>
      </div>
    )
  }
}

const mapStateToProps = state => ({
	
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)