import React, {Component} from 'react';
import {connect} from "react-redux";
import '../teamView.scss'
import {bindActionCreators} from "redux";
import {} from "../../../store/actions/actions";
import TeamViewUserCard from './TeamViewUserCard'
import map from 'lodash/map'


class OrgChart extends Component {
    componentDidMount() {
    }

    render() {
        const {orgChartUsers} = this.props.teamViewReducer

        return (
            <div className={'org-chart'}>
                <div className={'manager-hold'}>
                    <div className={'user-hold'}>Root User</div>
                </div>
                <div className={'users-section'}>
                    <div className={'left-area'}>
                        <div className={'icon-search'}></div>
                        <div>Add</div>
                    </div>
                    <div className={'search'}>
                        Nush
                    </div>
                    <div className={'users-display-section'}>
                        <div className={'display-cards-wrap'}>
                            {map(orgChartUsers, (member, index) => (
                                    <TeamViewUserCard member={member} index={index}/>
                                )
                            )}
                        </div>

                    </div>
                </div>
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
        {},
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrgChart);

