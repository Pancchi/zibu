import React, {Component} from "react";
import RegionSelect from "react-region-select";
import {ValidatorForm} from "react-material-ui-form-validator";

import {connect} from "react-redux";
import {withRouter} from 'react-router';
import ReactRegionSelect from 'react-region-select';
import {Button} from "@material-ui/core";

import CsvDownload from 'react-json-to-csv';

export default class AssignThree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
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
        const {name, value} = e.target;
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
    enterInput = (e, index) => {
        e.preventDefault();
        const regions = this.state.regions;

        for (let i of regions) {
            if (i.data.index === index) {
                i.regionName = e.target.value;
            }
        }
        this.setState({regions});

    }
    createTextFile = () => {
        let data = []
        for (let i of this.state.regions) {
            let a = {};
            if (i.regionName) {
                a.Name = i.regionName;
                a.TopLeft = Math.round(i.x) + "," + Math.round(i.y);
                a.BottomRight = Math.round((i.x + i.width)) + "," + Math.round((i.y + i.height));
                data.push(a);
            }

        }
        this.setState({
            data: data, disableDownloadButton: false,
        })
     if(data.length==0){
       alert("please select a region first and enter a name in the input")
     }
     else  alert("Data generated!!! Click on Download data to generate a text file with data")
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
                        <Button variant="contained" color="secondary"
                                onClick={() => this.actionDeleteRegion(regionProps.data.index)}
                        >
                            X
                        </Button>
                    </div>
                    <input autoFocus onChange={(e) => this.enterInput(e, regionProps.data.index)}
                           placeholder={"Enter label"} className={"hiddeninput"}/>
                </div>
            );
        }
    };

  


    render() {
        const regionStyle = {
            background: "rgba(0, 255, 0, 0.0)"
        };
        
        return (
            <React.Fragment>
              <br/>
              <br/>
                <br/>
                <div style={{color: "white"}}>
                    <h4>
                       1. Select region on the image below, an input field will appear.
                        <br/>
                        2. click on generate data
                        <br/>
                        3. Click on download data, a text file with the name and co-ordiantes will get downloaded
                        <br/>
                       4. You can close this field with the cross button.
                        <br/>
                       5. Cross button disappears if you hover out of image.
                       <br/>
                       
                        <br/>
                    </h4>
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
                <CsvDownload
                    disabled={this.state.data.length > 0 === true ? false : true}
                    data={this.state.data}
                    filename={"dataInCsv"}
                    className="btn btn-outline-primary btnstyle2">
                    Download Data
                </CsvDownload>

                <button
                    type="submit"
                    className="btn btn-outline-primary btnstyle2"
                    onClick={() => this.createTextFile()}
                >Generate Data
                </button>
                <br/>
                <br/> <br/>
            </React.Fragment>
        );
    }
}