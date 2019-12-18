import React, { Component } from 'react';
import './alltypes.scss'

class Gender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGender: "Female"
        }
    }

    selectGender = (data) => {
        this.setState({ selectedGender: data })
    }

    render() {
        const allGender = ["Male", "Female", "Others"]
        const { selectedGender } = this.state
        return (
            <div className="select_gender">
                <div className="select_gender_container">
                    {allGender.map(data =>
                        (<div key={data} className={`single_gender_container ${selectedGender == data ? "selected-gender" : "not-selected-gender"}`} onClick={() => this.selectGender(data)}>
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