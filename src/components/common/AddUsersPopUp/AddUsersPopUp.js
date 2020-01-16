import React, {Component} from "react";
import AllUserSelect from "../../allUserSelect/allUserSelect";
import {Modal} from "antd";
import './addUsersPopUP.scss'

class AddUsersPopUp extends Component {
    render() {
        const {showAddUsersPopUp = false, addUsersPopUpTitle = `Add Users`, addUsersPopUpClose,addUsersPopUpPlaceHolder = `Search Department`,addUsersPopUpFirstButtonName = `Add Selected`,addUsersPopUpFirstButtonClick,addUsersPopUpOnChangeCheckBox, addUsersPopUpTableColumnsData, addUsersPopUpUsersData, addUsersPopUpTotalUsers,addUsersPopUpIsUserData = true,addUsersPopUpOnlySelectAndAdd = true,addUsersOnClickHeadingColumn,addUsersOnChangeRowsPerPage,addUsersChangePage,addUsersSearchData,addUsersCurrentPageNumber,} = this.props;
        return (
            <Modal
                visible={showAddUsersPopUp}
                centered={true}
                title={addUsersPopUpTitle}
                footer={null} className={'add-users-pop-up-model'}
                onCancel={addUsersPopUpClose}>
                <AllUserSelect allHeadingsData={addUsersPopUpTableColumnsData} userData={addUsersPopUpUsersData}
                               searchPlaceHolder={addUsersPopUpPlaceHolder}
                               searchFirstButtonName={addUsersPopUpFirstButtonName}
                               totalUsers={addUsersPopUpTotalUsers}
                               isUserData={addUsersPopUpIsUserData}
                               onChangeCheckBox={addUsersPopUpOnChangeCheckBox} onlySelectAndAdd={addUsersPopUpOnlySelectAndAdd}
                               searchFirstButtonClick={addUsersPopUpFirstButtonClick}
                               onChangeRowsPerPage={addUsersOnChangeRowsPerPage}
                               headingClickData={addUsersOnClickHeadingColumn}
                               goPrevPage={() => addUsersChangePage(-1)}
                               goNextPage={() => addUsersChangePage(1)}
                               onSearch={addUsersSearchData}
                               currentPageNumber={addUsersCurrentPageNumber}/>
            </Modal>
        )
    }
}

export default AddUsersPopUp