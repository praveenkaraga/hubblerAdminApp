import React,{Component} from 'react';
import './App.css';
import './tableView.css'
import {connect} from 'react-redux'
import UsersTableView from './pages/UsersTableView'
import UserDetailsView from './pages/UserDetailsView'
import {fetchPostsWithRedux} from './actions'
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';


class App extends Component{
    state = {
        displayItems: [{name: 'First Name', id: 'first_name'}, {name: 'Last Name', id: 'last_name'},
            {name: 'Company Name', id: 'company_name'}, {name: 'City', id: 'city'}, {name: 'State', id: 'state'},
            {name: 'Zip', id: 'zip'}, {name: 'Email', id: 'email'}, {name: 'Web', id: 'web',link:true},
            {name: 'Age', id: 'age'}],
    }

    componentDidMount(){
        this.props.fetchPostsWithRedux()
    }

    render(){
        if(this.props.loading){
            return <div className={'loading'}>
                LOADING...
            </div>
        }
        return (
            <div className="App">
                <Router>
                    <div className={'page-content'}>
                        <Switch>
                            <Route exact path="/" render={props => <UsersTableView displayItems={this.state.displayItems} users={this.props.users} {...props} />}  />
                            <Route exact path="/user/:userId" render={props => <UserDetailsView displayItems={this.state.displayItems}  {...props} />}  />
                        </Switch>
                    </div>
                </Router>
            </div>

        );
    }
}

function mapStateToProps(state){
    return {
        users: state.users,
        loading:state.loading
    }
}

export default connect(mapStateToProps,{fetchPostsWithRedux})(App);
