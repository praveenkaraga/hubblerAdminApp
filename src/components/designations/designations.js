import React, { Component } from 'react';
import './designations.scss'
import ImageCropper from '../common/ImageCropper/imageCropper'
class Designations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            croppedImage: null
        }

    }


    finalImage = (data) => {
        this.setState({ croppedImage: data })
    }

    onSelectFile = (e) => {
        console.log(e)
    }

    render() {

        const { croppedImage } = this.state

        return (
            <div className="designations_main">
                <label for="uploadPhoto-ImageCropper"><div>Add Photo</div></label>
                <img src={croppedImage} />
                <ImageCropper uniqueId={"uploadPhoto-ImageCropper"} onClickApply={this.finalImage} />
            </div>
        );
    }
}

export default Designations;