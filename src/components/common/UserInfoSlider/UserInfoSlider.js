import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Drawer} from "antd";
import 'antd/dist/antd.css';
import './userInfoSlider.scss'
import UserInfoSliderContent from '../UserInfoSlider/UserInfoSliderContent'




class UserInfoSlider extends Component {
    componentDidMount() {
    }

    render() {
        const {visible,onCloseFunction,teamUserData,userId} = this.props;

        return (
            <div className={'user-info-slider'}>
                <Drawer
                    className={'user-info-slider-drawer'}
                    placement={'right'}
                    closable={false}
                    onClose={() => onCloseFunction(false)}
                    visible={visible}>
                    <UserInfoSliderContent teamUserData={teamUserData} userId={userId} onCloseFunction={onCloseFunction}/>
                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        teamViewReducer: state.teamViewReducer
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoSlider);
