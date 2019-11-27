import React, {Component} from 'react'
import AppsProfileTemplate from './AppsProfileTemplate'
import map from 'lodash/map'

class Apps extends Component {
    render() {
        const {teamUserData} = this.props
        return (
            <div className={'apps-information'}>
                <div className={'division-header'}>Essential Apps</div>
                <div className={'app-profile-wrap'}>
                    {map(teamUserData ? teamUserData.apps : [], ele =>
                        <AppsProfileTemplate data={ele}/>)}
                </div>
            </div>
        )
    }
}

export default Apps