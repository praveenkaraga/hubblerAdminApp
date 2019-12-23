import React, { Component } from 'react';
import { Button } from 'antd';
import './imageCropper.scss'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class Designations extends Component {
    state = {
        src: null,
        crop: {
            unit: '%',
            width: 30,
            aspect: 16 / 9,
        },
    };

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
        }

    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    cropeerButtonActions = (action) => {
        if (action === "Apply") {
            this.props.onClickApply(this.state.croppedImageUrl)
        }
        this.setState({ src: null })
        this.cropperInput.value = null
    }

    render() {
        const { crop, croppedImageUrl, src } = this.state;
        const { uniqueId } = this.props
        const allButtons = ["Cancel", "Apply"]
        return (
            <>
                <input className="imageCropper_input" id={uniqueId} type="file" accept="image/*" onChange={this.onSelectFile} ref={ele => this.cropperInput = ele} />

                {src ? <div className="imageCropper_main">

                    <div className="imageCropper_blur_div"> </div>
                    <div className="imageCropper_container">
                        <div className="imageCropper_container_child">
                            <div className="crop_img_container">
                                {src && (
                                    <ReactCrop
                                        src={src}
                                        crop={crop}
                                        ruleOfThirds
                                        onImageLoaded={this.onImageLoaded}
                                        onComplete={this.onCropComplete}
                                        onChange={this.onCropChange}
                                    />
                                )}

                            </div>

                            <div className="final_image">
                                {croppedImageUrl && (
                                    <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                                )}
                            </div>
                        </div>

                        <div className="bottom_buttons">
                            {allButtons.map(buttonType => (<Button type="primary" onClick={() => this.cropeerButtonActions(buttonType)}>{buttonType}</Button>))}
                        </div>
                    </div>

                </div> : ""}
            </>
        );
    }
}

export default Designations;