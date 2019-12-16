import React, { Component } from 'react';
import { Input } from 'antd';


class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        return (<Input {...this.props} />);
    }
}

export default Text;
