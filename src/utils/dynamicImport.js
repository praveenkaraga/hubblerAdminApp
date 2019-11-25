import React, { Component } from 'react';
import UAParser from 'ua-parser-js'

export class DynamicImport extends Component {
    state = {
        component: null
    };

    componentDidMount() {
        let _this = this
        let parser = new UAParser();
        let OS = parser.getOS()

        this.props.load()
            .then((component) => {
                this.setState(() => ({
                    component: component.default ? component.default : component
                }));
                document.body.className = '';
                document.body.classList.add(_this.props.params.view);
                if (OS) {
                    if (OS.name) {
                        if (OS.name.includes('Mac')) {
                            document.body.classList.add('hide-scroll-os');
                        } else {
                            document.body.classList.add('show-scroll-os');
                        }
                    }
                }
            });
    }

    render() {
        return this.props.children(this.state.component);
    }
}

// export const CustomerAndContactProfile = (props) => {
//     return <DynamicImport params={{view:"customer-and-contact"}} load={() => import('../pages/CustomerAndContactProfile')}>
//         {(Component) => Component === null
//             ? <LoadingAnimation />
//             : <Component {...props} params={props.match.params} />}
//     </DynamicImport>
// }

