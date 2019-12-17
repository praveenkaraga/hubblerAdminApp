import React, { Component } from 'react';
import './designations.scss'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class Designations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            croppedImg: "",
            croppedImg2: ""
        }
    }


    croppedImg = () => {
        console.log("croppedImg", this.cropperEle.getCroppedCanvas().toDataURL())
        this.setState({
            croppedImg: this.cropperEle.getCroppedCanvas().toDataURL()
        })
    }

    fileImageChange = (e) => {
        console.log(e.target.value)
        this.setState({
            croppedImg: window.URL.createObjectURL(e.target.value)
        })
    }

    render() {
        return (
            <div className="designations_main">
                Select a file: <input type="file" name="myFile" onChange={this.fileImageChange} />
                <Cropper
                    ref={ele => this.cropperEle = ele}
                    src={require("../../images/svg/Male-avatar.svg")}
                    style={{ height: 400, width: '100%' }}
                    // Cropper.js options
                    aspectRatio={16 / 9}
                    // guides={false}
                    crop={this.croppedImg} />

                <img src={this.state.croppedImg} />

            </div>
        );
    }
}

export default Designations;