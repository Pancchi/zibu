import React, { Component } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { saveImageAction } from "../action/assignmentOneAction";
import {connect} from "react-redux";
 class AssignmentTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageToShow: "",
      imageURL:"",
      images:[]
    };
  }
  componentDidMount(){
   
    if(Object.keys(this.props.saveImage).length>0){
        this.setState({
             
              images:this.props.saveImage.image,
              imageURL:URL.createObjectURL(this.props.saveImage.image[0])

            })

}}
  handleClick = (e, i) => {
    e.preventDefault();
    let imageURL=URL.createObjectURL(i);
    this.setState({
       imageURL
    });
  };

  render() {
    console.log(this.state.images)
    return (
      <>
      <h3 style={{color:"white"}}></h3>
      <div style={{paddingTop:"10%"}}className="row clearfix">
          <div className="col-lg-4 col-md-12"></div>
          <div className="col-lg-6 col-md-12">
         <h4 style={{color:"white"}}>Right click on image to change it</h4>
          <ContextMenuTrigger     id="menu">
          <div>
            <img className="image2" src={this.state.imageURL} />
          </div>
        </ContextMenuTrigger>
      
        <ContextMenu   id="menu" > 
             {this.state.images.map((i,j)=>{
             return <MenuItem key={j}  onClick={(e)=>this.handleClick(e,i)} data={{ item: 'item '+(j+1) }}>
               <h4 style={{color:"white"}} > Image {j+1}</h4></MenuItem>
   
         })}
          </ContextMenu>
        </div>
          <div className="col-lg-3 col-md-12"></div>
      </div>
       
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
export default connect(mapStateToProps, mapDispatchToProps)(AssignmentTwo)