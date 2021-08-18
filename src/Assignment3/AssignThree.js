import React, { Component } from "react";
import RegionSelect from "react-region-select";
import { ValidatorForm} from "react-material-ui-form-validator";
import { DropzoneArea } from "material-ui-dropzone";
import { saveImageAction } from "../action/assignmentOneAction";
import {connect} from "react-redux";
import { withRouter } from 'react-router';
import ReactRegionSelect from 'react-region-select';



 export default class AssignThree extends Component {

    constructor(props) {
        super(props);
        this.state = {
          regions: [
            {
              x: 9.565217391304348,
              y: 34.195402298850574,
              width: 81.30434782608695,
              height: 6.3218390804597675,
              new: false,
              data: { index: 0 },
              isChanging: false
            }
          ],
          clickableRegions: [
            {
              x: 9.565217391304348,
              y: 34.195402298850574,
              width: 81.30434782608695,
              height: 6.3218390804597675,
              new: false,
              data: { index: 0 },
              isChanging: false
            }
          ]
        };
      }
      onChange = regions => {
        console.log("​App -> onChange -> regions", regions);
    
        this.setState({
          regions: regions
        });
      };
      changeRegionData(index, event) {
        console.log("​App -> changeRegionData -> index", index);
        const region = this.state.regions[index];
        console.log(
          "​App -> changeRegionData -> this.state.regions",
          this.state.regions
        );
        let color;
        switch (event.target.value) {
          case "1":
            color = "rgba(0, 255, 0, 0.5)";
            break;
          case "2":
            color = "rgba(0, 0, 255, 0.5)";
            break;
          case "3":
            color = "rgba(255, 0, 0, 0.5)";
            break;
          default:
            color = "rgba(0, 0, 0, 0.5)";
        }
    
        region.data.regionStyle = {
          background: color
        };
        this.onChange([
          ...this.state.regions.slice(0, index),
          Object.assign({}, region, {
            data: Object.assign({}, region.data, { dataType: event.target.value })
          }),
          ...this.state.regions.slice(index + 1)
        ]);
      }
      actionDeleteRegion = regionIdx => {
        console.log("​regionIdx", regionIdx);
        const filteredRegion = this.state.regions.filter(
          reg => reg.data.index !== regionIdx
        );
        this.setState({ regions: filteredRegion });
      };
      regionRenderer = regionProps => {
        if (!regionProps.isChanging) {
          console.log("​regionRenderer -> regionProps", regionProps);
          return (
            <div>
              <div style={{ position: "absolute", right: 0, top: "-25px" }}>
                <button
                  onClick={() => this.actionDeleteRegion(regionProps.data.index)}
                >
                  Cancel
                </button>
              </div>
              <div style={{ position: "absolute", right: 0, bottom: "-30px" }}>
                <select
                  onChange={event =>
                    this.changeRegionData(regionProps.index, event)
                  }
                  value={regionProps.data.dataType}
                >
                  <option value="1">Green</option>
                  <option value="2">Blue</option>
                  <option value="3">Red</option>
                </select>
                <button onClick={this.actionAddRegion}>Save</button>
              </div>
            </div>
          );
        }
      };
      actionAddRegion = () => {
        alert("actionAddRegion");
      };
    
      renderClickableRegions() {
        const { regions } = this.state;
        return regions.map(c => (
          <a href="https://www.danaruma.com">
            <div
              style={{
                position: "absolute",
                width: `${c.width}%`,
                height: `${c.height}%`,
                top: `${c.y}%`,
                left: `${c.x}%`,
                background: "rgba(0, 255, 255, 0.5)"
              }}
            />
          </a>
        ));
      }
    
      renderLiveDemo = () => (
        <React.Fragment>
          <img
            src="https://f1-styx.imgix.net/danaruma/homepage/benefit.jpg?w=1000&h=1500&fit=crop&crop=top"
            width="100%"
          />
          {this.renderClickableRegions()}
        </React.Fragment>
      );
    
      render() {
        const regionStyle = {
          background: "rgba(0, 255, 0, 0.5)"
        };
    
        return (
          <React.Fragment>
            <div style={{ backgroundColor: "red" }}>
              <h1>
                *select region on the left side and it will become link region on
                the right side
              </h1>
            </div>
            <br />
            <br />
            <div style={{ display: "flex" }}>
              <div
                style={{
                  flexGrow: 1,
                  flexShrink: 1,
                  width: "50%",
                  left: "0",
                  // padding: 15,
                  position: "absolute",
                  display: "inline-block"
                }}
              >
                <RegionSelect
                  regions={this.state.regions}
                  regionStyle={regionStyle}
                  constraint
                  onChange={this.onChange}
                  regionRenderer={this.regionRenderer}
                  // style={{ width: "50%" }}
                >
                  <img
                    src="https://f1-styx.imgix.net/danaruma/homepage/benefit.jpg?w=1000&h=1500&fit=crop&crop=top"
                    width="100%"
                  />
                  {/* {this.renderClickableRegions()} */}
                </RegionSelect>
              </div>
              <div
                style={{
                  flexGrow: 1,
                  flexShrink: 1,
                  width: "50%",
                  left: "50%",
                  // padding: 15,
                  position: "absolute",
                  display: "inline-block"
                }}
              >
                {this.renderLiveDemo()}
                {/* Select something with your mouse on the left side
                <br />
                {JSON.stringify(this.state.regions, null, 2)} */}
              </div>
            </div>
          </React.Fragment>
        );
      }
    }
//   constructor(props) {
//     super(props);
//     this.state = {
//       files: [],
     
//     };
//   }

//   handleChangeFile = (files) => {
//     this.setState({
//       files: files,
//     });
//   };
 


  
//   handleSubmit=(e)=>{
//       e.preventDefault();
//       let request={
//           image:this.state.files,
          
//       };
// this.props.saveImageAction(request);
// this.props.history.push("/assignment")
//   }

//   render() {
//       console.log(this.props.reduxState);
//     return (
//       <>
//         <br />
//         <br />
//         <h1 style={{color:"white"}}>Add your images here...</h1>
//         <br />
//         <div className="row clearfix">
//           <div className="col-lg-3 col-md-12"></div>
//           <div className="col-lg-5 col-md-12">
//             <ValidatorForm
//               className="form1"
//               noValidate
//               onSubmit={this.handleSubmit}
//             >
//              <RegionSelect
//     maxRegions={5}
//     regions={this.state.regions}
//     onChange={this.onChange}
//     regionRenderer={this.regionRenderer}>
//         <img src='/static/example-doc.jpg' width='700px'/>
// </RegionSelect>
//             </ValidatorForm>
//           </div>
//           <div className="col-lg-3 col-md-12"></div>
//         </div>
//         <br />
//         <br />
//         <br />
//       </>
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//    reduxState:state

// })
// const mapDispatchToProps = dispatch => ({
  
//     saveImageAction: (e) => dispatch(saveImageAction(e)),
// })
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AssignThree))