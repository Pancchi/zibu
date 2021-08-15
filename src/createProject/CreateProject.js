import React, { Component } from "react";
import "../css/site.min.css";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { DropzoneArea } from "material-ui-dropzone";
import { saveImageAction } from "../action/assignmentOneAction";
import {connect} from "react-redux";
import { withRouter } from 'react-router';

 class createProject extends Component {


  constructor(props) {
    super(props);
    this.state = {
      files: [],
      name: "",
      description: "",
    };
  }

  handleChangeFile = (files) => {
    this.setState({
      files: files,
    });
  };
  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };


  
  handleSubmit=(e)=>{
      e.preventDefault();
      let request={
          image:this.state.files,
          projectName:this.state.name,
          projectDescription:this.state.description
      };
this.props.saveImageAction(request);
this.props.history.push("/Preview")
  }

  render() {
      console.log(this.props.reduxState);
    return (
      <>
        <br />
        <br />
        <h1 style={{color:"white"}}>Create a new project here...</h1>
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
                <div className="col-lg-8 col-md-12">
                  <br />
                  <TextValidator
                    id="name"
                    name="name"
                    value={this.state.name}
                    label="Project Name"
                    fullWidth={true}
                    onChange={this.handleChange}
                    variant="standard"
                    required
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <br />
                </div>
                <div className="col-lg-2 col-md-12"></div>
                <div className="col-lg-2 col-md-12"></div>
                <div className="col-lg-8 col-md-12">
                  <br />
                  <TextValidator
                    id="description"
                    name="description"
                    value={this.state.description}
                    label="Project Description"
                    fullWidth={true}
                    onChange={this.handleChange}
                    variant="standard"
                    required
                    multiline
                    rows={5}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <br />
                </div>
                <div className="col-lg-2 col-md-12"></div>
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary btnstyle2"
               
              >
                Upload
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(createProject))