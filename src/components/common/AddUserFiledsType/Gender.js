import React, { Component } from 'react';
import './alltypes.scss'

class Gender extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const allGender = ["Male", "Female"]
        return (
            <div className="select_gender">
                <div className="select_gender_container">
                    {allGender.map(data =>
                        (<div key="" className="single_gender_container">
                            <img src={require(`../../../images/svg/${data}-avatar.svg`)} alt="" />
                            <p>{data}</p>
                        </div>
                        ))}
                </div>
            </div>
        );
    }
}

export default Gender;