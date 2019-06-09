import React, {Component} from 'react';
import orderBy from 'lodash/orderBy'
import filter from 'lodash/filter'

class PaginationItem extends Component{
    render(){
        const {item,selectionDisplay} = this.props
        return <li onClick={this.props.displayPageData.bind(this,item - 1)} className={`${selectionDisplay === item ? 'active' : ''}`}>
            {item}
        </li>
    }
}

class Pagination extends Component{
    state = {
        displayFrom:0,
        displayOffset:10
    }

    componentDidUpdate(prevProps){
        if(this.props.start !== prevProps.start){
            const {offSet,start} = this.props
            const {displayFrom,displayOffset} = this.state
            const selectionDisplay = start / offSet
            if((displayFrom+displayOffset) === selectionDisplay){
               this.setState({
                   displayFrom:displayFrom+displayOffset
               })
            }else if(selectionDisplay < displayFrom) {
                this.setState({
                    displayFrom:displayFrom - displayOffset
                })
            }
        }
    }

    pageNumberDisplay(selectionDisplay,pageCount){
        let pageCountArray = []
        for(let i = 1; i < pageCount + 1; i++){
            pageCountArray.push(i)
        }
        return pageCountArray
    }

    bumpPage(diff){
        const {displayFrom, displayOffset} = this.state;
        this.setState({
            displayFrom: displayFrom + (diff * displayOffset)
        });
    }

    nextRow() {
        this.bumpPage(1);
        this.props.displayPageData(this.state.displayFrom + 10)
    }

    prevRow() {
        this.bumpPage(-1);
        this.props.displayPageData(this.state.displayFrom - 10)
    }


    computeOtherConfigs() {
        const computed = {};
        const {rowLength,offSet,start} = this.props
        computed['end'] = Math.min(start + offSet, rowLength);
        computed['hasNext'] = computed['end'] < rowLength;
        computed['hasPrev'] = start > 1;
        computed['showPagination'] = rowLength > offSet;
        computed['pageCount'] = Math.ceil(rowLength / offSet);
        computed['curPage'] = Math.ceil(start / offSet);
        return computed
    }

    render(){
        const {rowLength,offSet,start} = this.props
        const pageCount = rowLength / offSet
        const selectionDisplay = start / offSet + 1
        const pageCountArray = this.pageNumberDisplay(selectionDisplay,pageCount)
        const displayCountArray = pageCountArray.slice(this.state.displayFrom, this.state.displayOffset + this.state.displayFrom)
        const details = this.computeOtherConfigs()
        return <div className={'pagination-part'}>
            <div className={'page-change-buttons'}>
            {details.hasPrev ? <div className={'pre button-round'} onClick={this.props.prevPage.bind(this)}>Previous</div> : <div className={'pre button-round'}>Previous</div>}
            {details.hasNext ? <div className={'next button-round'} onClick={this.props.nextPage.bind(this)}>Next</div> : <div className={'next button-round'}>Next</div>}
            </div>
            <div className={'page-change-number'}>
                <div className={`number-arrow-display pre ${this.state.displayFrom > 0 ? '' : 'disabled'}`} onClick={this.prevRow.bind(this)}>Previous</div>
                <ul className={'selection-page-display'}>
                    {displayCountArray.map((item,index) =>{
                        return <PaginationItem selectionDisplay={selectionDisplay} displayPageData={this.props.displayPageData} key={index} item={item} index={index} />
                    })}
                </ul>
                <div className={`number-arrow-display next ${((this.state.displayFrom + 20) - this.state.displayOffset) < pageCount ? '' : 'disabled'}`} onClick={this.nextRow.bind(this)}>Next</div>
            </div>
        </div>
    }
}

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
        offSet:5,
        start:0,
        sortKey:'',
        sortOrder:'',
        search:''
    }

    bumpPage(diff){
        const {start, offSet} = this.state;
        this.setState({
            start: start + (diff * offSet)
        });
    }

    displayPageData(page){
        const {offSet} = this.state;
        this.setState({
            start: page * offSet
        });
    }

    nextPage() {
        this.bumpPage(1);
    }

    prevPage() {
        this.bumpPage(-1);
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
            return item.first_name.toLowerCase().indexOf(searchString) > -1;
        })
    }

    searchUsers = (event)=>{
        this.setState({
            search: event.target.value
        })
    }

    rowSelection(row){
        this.props.history.push(`/user/${row.id}`)
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
            <Pagination prevPage={this.prevPage.bind(this)} displayPageData={this.displayPageData.bind(this)} nextPage={this.nextPage.bind(this)} rowLength={users.length} {...this.state}>

            </Pagination>
        </div>
    }
}

export default UsersTableView;
