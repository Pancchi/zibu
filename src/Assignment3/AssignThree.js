import React, {Component} from "react";
import RegionSelect from "react-region-select";
import {ValidatorForm} from "react-material-ui-form-validator";

import {connect} from "react-redux";
import {withRouter} from 'react-router';
import ReactRegionSelect from 'react-region-select';
import {Button} from "@material-ui/core";
import {
  JsonToCsv,
  useJsonToCsv
} from 'react-json-csv';
import CsvDownload from 'react-json-to-csv'

function CsvConverter (data){
  const filename = 'Image-Data',
  fields = {
    "Name": "Name",
    "TopLeft": "Top Left",
    "BottomRight": "Bottom Right"
  };
  useJsonToCsv({data,fields,filename});
  console.log(data,filename,fields)

}
export default class AssignThree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            regions: [],
           
           hideCancelButton: true,
         
        };
    }


    showCancelButton = () => {
        this.setState({
            hideCancelButton: false
        })
    }
 handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
    hideCancelButton = () => {
        this.setState({
            hideCancelButton: true
        })
    }


    onChange = regions => {
      
        this.setState({
            regions: regions,
            
        });
    };
    enterInput=(e,index)=>{
      e.preventDefault();
     const regions=this.state.regions;

     for(let i of regions ){
         if(i.data.index===index){
           i.regionName=e.target.value;
         }
     }
    this.setState({regions});
    
    }
    createTextFile=()=>{
    let data=[]
    for(let i of this.state.regions){
      let a={};
      if(i.regionName){
        a.Name=i.regionName;
        a.TopLeft=Math.round(i.x)+","+Math.round(i.y);
        a.BottomRight=Math.round(i.x+i.width)+","+Math.round(i.y+i.height);
        data.push(a);
      }
      CsvConverter(data);
    }
    
    }
  

    actionDeleteRegion = regionIdx => {
        console.log("regionIdx", regionIdx);
        const filteredRegion = this.state.regions.filter(
            reg => reg.data.index !== regionIdx
        );
        this.setState({regions: filteredRegion});
    };


    regionRenderer = regionProps => {
        if (!regionProps.isChanging) {
            return (
                <div>
                    <div style={{position: "absolute", right: 0, top: "-25px"}} hidden={this.state.hideCancelButton}>
                        <Button  variant="contained" color="secondary"
                            onClick={() => this.actionDeleteRegion(regionProps.data.index)}
                        >
                            X
                        </Button>
                    </div>
                    <input autoFocus onChange={(e)=>this.enterInput(e,regionProps.data.index)} placeholder={"Enter label"} className={"hiddeninput"}/>
                </div>
            );
        }
    };

    actionAddRegion = () => {
        alert("actionAddRegion");
    };

   

    render() {
        const regionStyle = {
            background: "rgba(0, 255, 0, 0.0)"
        };
console.log(this.state.regions)
        return (
            <React.Fragment>
                <div style={{ color: "white" }}>
                  <h2>
                    Select region on the image below and input field will appear.
                  <br/>
                  You can close this field with the cross button.
                      <br/>
                  Cross button disappears if you hover out of image.
                  </h2>
                </div>
                <br/>
                <br/>
                <div style={{display: "flex"}}>
                    <div onMouseEnter={this.showCancelButton} onMouseLeave={this.hideCancelButton}
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

                            >
                            <img
                                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                                width="100%"
                            />
                            {/* {this.renderClickableRegions()} */}
                        </RegionSelect>
                    </div>
                </div>
                <button
                type="submit"
                className="btn btn-outline-primary btnstyle2"
               onClick={()=>this.createTextFile()}
              >
                Submit
              </button><br />
        <br />  <br />
            </React.Fragment>
        );
    }
}
