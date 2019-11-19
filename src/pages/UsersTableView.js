import React, {Component} from 'react';
import orderBy from 'lodash/orderBy'
import filter from 'lodash/filter'


class CustomTable extends Component {
    render() {
        const {displayItems,users,offSet,start,rowSelection,sortKey,sortOrder,search} = this.props
        const displayUsers = users.slice(start, offSet + start)
        if(displayUsers.length){
            return <table>
                <thead>
                <tr>
                    {displayItems.map((item, index) => {
                        return <CustomTh sortKey={sortKey} sortOrder={sortOrder} sort={this.props.sort} key={index} item={item} />
                    })}
                </tr>
                </thead>
                <tbody>
                {displayUsers.map((item,index) => {
                    return <CustomTbodyRow rowSelection={rowSelection} key={index} item={item} displayItems={displayItems} />
                })}
                </tbody>
            </table>
        }else {
            return <div className={'no-data'}>
                <div className={'empty-icon'}></div>
                <p>
                    No Records Found {search ? <span>With Search Key <span className={'search-key'}>{search}</span></span> : ''}
                </p>
            </div>
        }
    }
}

class CustomTd extends Component{
    render(){
        const {item,dataKey,type} = this.props
        return <td>
            {type.link ? <a href={item[dataKey]} target={'_blank'}> {item[dataKey]}</a> :  item[dataKey]}
        </td>
    }
}

class CustomTbodyRow extends Component{
    rowSelection(item){
        if(this.props.rowSelection){
            this.props.rowSelection(item)
        }
    }
    render(){
        const {displayItems,item} = this.props
        return <tr onClick={this.rowSelection.bind(this,item)}>
            {displayItems.map((listItem, index) => {
                return <CustomTd key={index} type={listItem} dataKey={listItem.id} item={item} />
            })}
        </tr>
    }
}

class CustomTh extends Component {
    render() {
        const {name,id} = this.props.item
        return <th onClick={this.props.sort.bind(this,id)} className={`${this.props.sortKey === id ? `active ${this.props.sortOrder}` : ''}`}>
            {name}
        </th>
    }
}

class UsersTableView extends Component {
    state = {
        offSet:20,
        start:0,
        sortKey:'',
        sortOrder:'',
        search:''
    }

    sort = (key) => {
        const {sortOrder, sortKey} = this.state
        if(sortKey === key){
            this.setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc',key)
        }else {
            this.setSortOrder('asc',key)
        }
    }

    setSortOrder = (order,key)=>{
        this.setState({
            sortOrder:order,
            sortKey:key
        })
    }

    sortData(users){
        let {sortOrder,sortKey} = this.state
        if(sortOrder && sortKey){
            users = orderBy(users,[sortKey],[sortOrder])
        }
        return users
    }

    searchData(users){
        const searchString = this.state.search.toLowerCase();
        return filter(users, (item) => {
            return item.firstname.toLowerCase().indexOf(searchString) > -1;
        })
    }

    searchUsers = (event)=>{
        this.setState({
            search: event.target.value
        })
    }

    rowSelection(row){
        this.props.history.push(`/user/${row._id}`)
    }

    render() {
        let users = this.sortData(this.props.users)
        users = this.searchData(users)
        return <div className={'table-display'}>
            <div className={'page-name'}>
                Users
            </div>

            <div className={'table-part'}>
                <div className={'table-header'}>
                    <span className={'search-icon'}></span>
                    <input onChange={this.searchUsers} placeholder={'Search Users By First Name'}/>
                </div>
                <div className={'table-body'}>
                    <CustomTable sort={this.sort.bind(this)} displayItems={this.props.displayItems} {...this.state} rowSelection={this.rowSelection.bind(this)} users={users}>

                    </CustomTable>
                </div>
            </div>
        </div>
    }
}

export default UsersTableView;
