

import React, { Component } from "react";
import "../css/site.min.css";
import { saveImageAction } from "../action/assignmentOneAction";
import {connect} from "react-redux";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';


  
 class PreviewProject extends Component {


  constructor(props) {
    super(props);
    this.state = {
     data:{},
     name:"",description:"",images:[]
    };
  }

componentDidMount(){
   
    if(Object.keys(this.props.saveImage).length>0){
        this.setState({
              name:this.props.saveImage.projectName,
              description:this.props.saveImage.projectDescription,
              images:this.props.saveImage.image,
            })

}

}

  render() {
    
    return (
      <><br/>
      <h2 style={{color:"white"}}>Congratulations!!! You have successfully created a project named {this.state.name}</h2>
      <h4 style={{color:"GrayText"}}>Description: {this.state.description}</h4>
       {this.state.images.map((i,j)=>{
           return <>
            <div className="row clearfix">
          <div className="col-lg-3 col-md-12"></div>
          <div className="col-lg-6 col-md-12">
             <Card key={j} style={{width:"700px",height:"500px"}}>
             <h3>
              {" "+"Image "+(j+1)}
              </h3>
           <CardActionArea>
             {/* <CardMedia
               
               image={URL.createObjectURL(i)}
               title="Contemplative Reptile"
             /> */}
             <img className="image" src={URL.createObjectURL(i)} /> 
           
           </CardActionArea>
          
         </Card><br/></div></div></>
       })}
      
      </>
    );
  }
}
const mapStateToProps = (state) => ({
    saveImage:state.saveImageReducer.saveImage,

})
const mapDispatchToProps = dispatch => ({
  
    saveImageAction: (e) => dispatch(saveImageAction(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PreviewProject)