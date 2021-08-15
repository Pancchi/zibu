import React, { Component } from "react";

import { ValidatorForm} from "react-material-ui-form-validator";
import { DropzoneArea } from "material-ui-dropzone";
import { saveImageAction } from "../action/assignmentOneAction";
import {connect} from "react-redux";
import { withRouter } from 'react-router';



 class Assign extends Component {


  constructor(props) {
    super(props);
    this.state = {
      files: [],
     
    };
  }

  handleChangeFile = (files) => {
    this.setState({
      files: files,
    });
  };
 


  
  handleSubmit=(e)=>{
      e.preventDefault();
      let request={
          image:this.state.files,
          
      };
this.props.saveImageAction(request);
this.props.history.push("/assignment")
  }

  render() {
      console.log(this.props.reduxState);
    return (
      <>
        <br />
        <br />
        <h1 style={{color:"white"}}>Add your images here...</h1>
        <br />
        <div className="row clearfix">
          <div className="col-lg-3 col-md-12"></div>
          <div className="col-lg-5 col-md-12">
            <ValidatorForm
              className="form1"
              noValidate
              onSubmit={this.handleSubmit}
            >
              <div className="row clearfix">
                <div className="col-lg-2 col-md-12"></div>
                <div className="col-lg-8 col-md-12">
                  <br />
                  <DropzoneArea
                    onChange={this.handleChangeFile}
                    acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                    maxFileSize={5000000}
                    filesLimit={10}
                  />
                  <br />
                </div>
                <div className="col-lg-2 col-md-12"></div>
               
                <div className="col-lg-2 col-md-12"></div>
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary btnstyle2"
             
              >
                Submit
              </button><br />
        <br />  <br />
        <br />
            </ValidatorForm>
          </div>
          <div className="col-lg-3 col-md-12"></div>
        </div>
        <br />
        <br />
        <br />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
   reduxState:state

})
const mapDispatchToProps = dispatch => ({
  
    saveImageAction: (e) => dispatch(saveImageAction(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Assign))