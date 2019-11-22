import React, { Component } from 'react';
import './App.css';
import UserConsoleView from './container/UserConsoleView/UserConsoleView'
import AdminNav from './container/AdminNav/AdminNav'
//import './tableView.css'
//import {connect} from 'react-redux'
//import UsersTableView from './pages/UsersTableView'
//import UserDetailsView from './pages/UserDetailsView'
//import {fetchPostsWithRedux} from './actions'
//import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';


class App extends Component {
    // state = {
    //     displayItems: [{name: 'First Name', id: 'firstname'}, {name: 'Last Name', id: 'lastname'},
    //         {name: 'Mobile', id: 'mobile'}, {name: 'Email', id: 'email'}],
    // }

    // componentDidMount(){
    //     this.props.fetchPostsWithRedux()
    // }

    render() {
        // if(this.props.loading){
        //     return <div className={'loading'}>
        //         LOADING...
        //     </div>
        // }
        return (
            <div className="App">
                {/* <Router>
                    <div className={'page-content'}>
                        <Switch>
                            <Route exact path="/" render={props => <UsersTableView displayItems={this.state.displayItems} users={this.props.users} {...props} />}  />
                            <Route exact path="/user/:userId" render={props => <UserDetailsView displayItems={this.state.displayItems}  {...props} />}  />
                        </Switch>
                    </div>
                </Router> */}
                <AdminNav />
            </div>

        );
    }
}

// function mapStateToProps(state){
//     return {
//         users: state.users,
//         loading:state.loading
//     }
// }

//export default connect(mapStateToProps,{fetchPostsWithRedux})(App);
export default App
