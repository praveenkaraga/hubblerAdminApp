This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


<!-- Checkout the code from git and do

## `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p> -->


# Components Documentation :)
<p>&nbsp;</p>


## `User Search Component{userSearch}`


* **firstButtonName**  {"string"} : Name for the First Button

* **secondButtonName** {"string"} : Name for the Second Button

* **searchPlaceHolder** {"string"} : Placeholder for search

* **firstButtonLoader** {"boolean"} : Loader for first button

* **secondButtonLoader** {"boolean"} : Loader for second button

* **searchLoader** {"boolean"} : Loader for search

* **onSearch** : onChange of Search Input {function(e){}}

* **onClickFirst** : onClick of First Button

* **onClickSecond** : onClick of Second Button 

<p>&nbsp;</p>

**--XX--Use below ones if You Want To Do actions On Users Like {Activate, Deactivate, Delete, Edit} or Using this in `AllUserSelect Component`--XX--**

* **userSelected** {Number} : Pass No. Of User Selected {If valid all below options will get active}

* **onUserActivate** : action on onClick of Activate Button 

* **onUserDeactivate** : action on onClick of Deactivate Button 

* **onUserDelete** : action on onClick of Delete Button 

* **onUserEdit** : action on onClick of Edit Button {Will automatically get disabled when user greater than 1 i.e; if userSelected is greater than 1}


##### below one will change UI{view} of this component according to props given  `[all scenarios]`

###### All scenarios of table

In all conditions Left Search will come before and after selecting User or Data

**Note** : Keep only one ( from `onlySelectAndAdd` and `allSelect`)  true at a time 

* **isUserData** {boolean (default : true) } : `default` table will come(with profile pic and after selecting users all four action buttons will be shown)  and if `false` after selecting user  or data from table only `two` action buttons will come{delete and edit}
 
* **onlySelectAndAdd** {boolean (default : false) } : if this `true` (`one` button will come and will be inactive)and after selecting user  or data from table that button will become active with counting in it

* **allSelect**{boolean (default : false) } : if  `true` second `search` will come on right side (this will be with suggestions) and after selecting user  or data from table only `one ` action button{delete} will become active

##### below props will get active if `allSelect` will be `true` (right Side Search with suggestions)

* **onClickAddUserButton** {function}: On click of the Add User Icon which is on the right side of the searchDropdown

All Props of searchDropdown Component (<a name="search-with-dropdown" href="#search-with-dropdownsearchdropdown">Click Here to read about them.</a>)

<br/>

**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**



<p>&nbsp;</p>
<p>&nbsp;</p>


## `Search With Dropdown{searchDropdown}`
(containing propfile pic , name and designations)

* **searchDropdownPlaceholder** {"String"}{default : "Search and Add"} : Name of Second Button

* **onChangeSearchDropdown** {function(data){data}} : onChange of input of the search you can get the data as the first argument of the function you will pass in prop

* **searchDropdownData** {Array of Objects} : Data to be shown in suggestions(name and _id key is compulsory in each object). And for profile pic and designation the normal keys that we get in users data will work

* **onSearchDropdownSelect** {function(data){data}} : onSelect of any one User? data from suggestion. You have to pass a function in which value will come as first argument of that function 

**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**



<p>&nbsp;</p>
<p>&nbsp;</p>


## `Image Cropper{imageCropper}`


* **uniqueId** {string} : Unique `Id` you will pass And Using Html `Label` you can easily Target this Id to `Open` directory and after selecting image this component will become active

* **onClickApply**  : {`function(data)}{data}`} //data will be the final image string<br/>

**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**



<p>&nbsp;</p>
<p>&nbsp;</p>


## `Custom Dropdown{customDropdown}`


* **panelDataype** {string} : if you will pass `"circles"` than icon will be circles..{default : "circles"}...otherwise icon will be file 

* **panelData** {Array of objects}  : To populate all the items of dropdown. "name" and "._id" key should be there in each object

* **onSinglePanelClick** {function}  : OnClick of Single item of DropDown {function(data){data}} //you will get the whole object of the selected item

* **onClickSetting** {function}  : OnClick of Setting Icon of items in DropDown {function(data){data}} //you will get the whole object of the selected item

* **onClickAdd** {function}  : OnClick of Plus Icon of Header of DropDown 

* **onClickDelete** {function}  : OnClick of Delete Icon of items in DropDown {function(data){data}} //you will get the whole object of the selected item {if you want all actions on delete pop up then don't pass this}

* **popUpConfirmButtonName** {Default : "Confirm"} : Confirm Button Name of Delete Pop Up

* **popUpCancelButtonName** {Default : "Cancel"} : Confirm Button Name of Delete Pop Up

* **onDeleteConfirmClick** {function} : onClick confirm Button of Delete Pop Up 

* **onDeleteCancelClick** {function} : onClick cancel Button of Delete Pop Up <br/>

**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**


<p>&nbsp;</p>
<p>&nbsp;</p>


## `All User Select{allUserSelect}` 

### Header/Top Part {Search And Button} (This is basically __UserSearch__ Component But props are different)

#### --> Left Side{ In all cases this will be visible }

* **searchPlaceHolder** {"String"} : Place holder for this search

* **searchLoader** {"boolean"}{default : false} : loader inside search

* **onSearch** {function(e)}() : will get all the searched data Onchange



#### --> Right Side Search{ Search with suggestions} (Will be visible when `allSelect` set to `true` and no users has been selected) 

* **searchDropdownPlaceholder** {"String"}{default : "Search and Add"} : Name of Second Button

* **onChangeSearchDropdown** {function(data){data}} : onChange of input of the search you can get the data as the first argument of the function you will pass in prop

* **searchDropdownData** {Array of Objects} : Data to be shown in suggestions(name and _id key is compulsory in each object)

* **onSearchDropdownSelect** {function(data){data}} : onSelect of any one User? data from suggestion. You have to pass a function in which value will come as first argument of that function 


#### --> Right Side{ which options to show here will be changed according to different scenarios }

##### ** When No Table Data has been selected **

* **searchFirstButtonName** {"String"}{default : "IMPORT"} : Name of first Button

* **searchSecondButtonName** {"String"}{default : "ADD"} : Name of Second Button

* **searchFirstButtonLoader** {"boolean"}{default : false} : loader inside search

* **searchSecondButtonLoader** {"boolean"}{default : false} : loader inside search

* **searchFirstButtonClick** {function} : onClick of first Button

* **searchSecondButtonClick** {function} : onClick of second Button


##### ** When one or more Table Data has been selected **
Actions that has to be done on user or users will get activated {and based on few scenarios visible action buttons will change}(all scenarios has been covered in `UserSearch` Component Doc Above)

* **showHeaderButtons** {Array of Objects} : How many Buttons you want from the given Options. 
Options are(ids ) : "activate", "deactivate", "delete", "edit", "duplicate"

Data example of `showHeaderButtons`

```javascript
    [
        { 
            id: "activate", // to change this from the above given options
            label: "Activate User" // Text you want to show on tooltip of the button
         },

        { 
            id: "deactivate", 
            label: "Deactivate User" 
        }
    ]

```
* **disableButtonNames** {Array of texts} : array of is of buttons you want to disable. Disable means this buttons will be shown but will be in deactivated mode User cant do anything.
Options are(ids ) : "activate", "deactivate", "delete", "edit", "duplicate"

Example of `disableButtonNames`
```javascript
//suppose you want to disable edit and delete button
["edit", "delete"]
```


According to above configurations only you will be able to use below props:
* **onClickUserActivate** {function} : onClick of Activate Button

* **onClickUserDeactivate** {function} : onClick of Deactivate Button

* **onClickUserDelete** {function} : onClick of Delete Button

* **onClickUserEdit** {function} : onClick of Edit User Button (If selected more than one than one user this will get disabled)


<p>&nbsp;</p>

### Main Table/Middle Part

##### ** Column Heading **
* **allHeadingsData** {Array} : Array of objects will be passed...{below is sample example}

```javascript
[

    {
        "title": "Name",                            //compulsory
        "dataIndex": "name",                        //compulsory(will be same as _id)
        "_id": "name",                              //compulsory
        "lbl": "Name",
        "type": "text",                             //compulsory
        "sorter": true,                             //true if you want sorting in table
        "sortDirections": ["descend", "ascend"],    //type of sorting you want
        "ellipsis": true                            //true if you want sorting in a particular row
    },
    {
        "title": "Emp ID",
        "dataIndex": "employee_id",
        "_id": "employee_id",
        "lbl": "Emp ID",
        "type": "text",
        "sorter": true,
        "sortDirections": ["descend", "ascend"],
        "ellipsis": true
    }
]   
```

* **headingClickData** {function(activeheading, sortingType)} : onClick of any Column Heading. You will get two datas as arguments of the passed function . First argument will give the clicked heading `_id` and Second argument will give type of sorting when clicked (for ex. `asc` for ascending, `dsc` for descending and will give nothing when your again it comes in normal mode)


##### ** Column Settings/Configuration **
* **columnConfigurable** {Boolean}{default: false} : If `true` column settings button will display and below two props can be used 

* **onClickColumnSetting** {function} : onClick of column setting icon

* **columnSettingData** {Object} : pass data of column settings... Should be Object

columnSettingData example :-

```javascript
//all keys in Capital will be shown as type of Data like heading

{
         "basic fields": [
        {
            "_id": "name",          //compulsory
            "lbl": "Name",          //compulsory
            "type" : "text",        //optional
            "isDraggable" : false   //if true it will be draggable
        },
        {
            "_id": "email",
            "lbl": "Email",
            "type" : "text",
            "isDraggable" : true
        }
    ],

    "category" : [
        {
            "_id": "location",
            "lbl": "Location",
            "type" : "string",
            "isDraggable" : true
        },
        {
            "_id": "mobile",
            "lbl": "Mobile",
            "type" : "number",
            "isDraggable" : true
        }
    ]

}
```

##### ** Main other Props of Table **

* **userData** {Array of Objects} : will pass an Array with the datas to be populated according to headingData

* **onChangeCheckBox** {function(selectedRowsKeys, selectedRows)} : onClick of checkboxes you will get two data data. First argument will give array of keys of all selectd data and Second Argument will give the data of the selected rows on that particular view.

* **onSelectRow** {function(record, selected, selectedRows)} : onClick of Checkboxes of each row you will get three arguments. First will give the data of the current selected row. Second will give boolean(true if selected and false if unselected) of the current selected row. Third will give you the Data of all selected rows on that particular view. 

* **onSelectAll** {function(selected, selectedRows)} : onClick of Slect All CheckBox. First argument will give boolean(true if selected and false if unselected). Second argument will give data of all the selectd and unselected of that view page

* **onClickTableRow** {function(rowData)} : onClick of Each full row of table. You will get whole object of that particular clicked column as the first argument.

* **selectedDataCount** {Number} : Number of Data selected. It is compulsory to pass this props if you wants to show header for different actions. And also can unselect all the selected data just by passing 0 in this props. 


Below three props scenarios has been explaned above in UserSearch Comp. 
<a name="all-scenarios-of-table" href="#all-scenarios-of-table">Click Here to read about them.</a>

* **isUserData** {Boolean}{default : true} 

* **allSelect** {Boolean}{default : false} 

* **onlySelectAndAdd** {Boolean}{default : false}


<p>&nbsp;</p>

### Table Bottom/Pagination Part

* **totalUsers** {Number}{default : 0} :  Total No. of Users or Data in the table

* **currentPageNumber** {Number}{default : 0} : Current Page No. of the table. 

* **typeOfData** {"String"}{default : "Total Data"} : text to be shown in side of total No.

* **goPrevPage** {function} : onClick of previous arrow icon

* **goNextPage** {function}{default : true} : onClick of next arrow icon

* **onChangeRowsPerPage** {function(rowsPerPage)}{default : 30} :  OnChange of the Selection of rows per page. You will pass a function and will get no. of per page selected as first argument.


**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**

<p>&nbsp;</p>
<p>&nbsp;</p>

## `Creation Popup {CreationPopUp}`

* **creationPopUpVisibility** {Boolean}{default : false} : sets the visibility of the popup.

* **creationPopUpTitle** {"String"} {Default : "Add New Department"} : sets the title of the popup.

* **fieldHeader** {"String"} : sets the name of the header of the First field.

* **fieldPlaceHolder** {"String"} : sets the placeholder for the First field.

* **creationPopFirstButtonName** {"String"} {Default : "Cancel"}  : sets the Name of the first button.  

* **creationPopSecondButtonName** {"String"} {Default : "Create"}  : sets the Name of the second button.  

* **creationPopFirstButtonHandler** {function} : onClick of First button.

* **creationPopSecondButtonHandler** {function} : onClick of Second button.

* **creationPopUpFirstFieldChangeHandler** {function(event)} : onChange of First field of the popup you can get the data that's been typed in. (assign the event.target.value to the `inputValue` prop)

* **secondButtonDisable** {Boolean} : to disble or enable the second button

* **inputValue** {"String"} : value to be sent for the input field. (you need pass this prop to see the value that has been obtained from `creationPopUpFirstFieldChangeHandler` function)

* **afterClose** {function} : function that gets triggered when popup is closed (you can sent `inputValue` to an empty string)

* **customField** {"String"} {Default : "default"} :  if you pass as the string **"add"**  or  **"edit"**.

##### UI{view} of this component will change according to 'customField' type that's provided, following are the props that has to be passed  

* **secondFieldHeader** : {"String"} : sets the name of the header of the Second field.

* **thirdFieldHeader** : {"String"} : sets the name of the header of the Third field.

* **creationPopUpSecondFieldChangeHandler** {function(value)} : onChange of Second field of the popup you can get the data that's been chosen.

* **creationPopUpThirdFieldChangeHandler** {function(checked)} : onChange of Third field of the popup you can get the data that's been chosen.

* **inputMaxLength** {Number} {Default : 50} : maximum number of charecters a user can enter in the input field.

**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**

<p>&nbsp;</p>

## `Common Creation View {CommonCreationView}` 
_This the view that opens when an user:_
* creates an new department or designation or circle or custom field.
* clicks on the any of the created department or designation.
* clicks on of the created circle or custom field.

 - - - -
 _Props:_
* **commonCreationViewHeaderName** {"String"} : sets the name for the header, this is the name of the clicked collection entry or the newly created one.

* **backButton** {Boolean} {Default : "true"}  : value will decide whether the back button will be visible or not.

* **commonCreationViewBackButtonClick** {function} : function that triggers on click of the back button.

* **viewDecider** {Boolean} {Default : 0} : if the value passed is 

   #####--> `0 or false` : opens addUsersCard view where new users can be added .
   #####--> `1 or true` : opens AllSelectedUsers view where you can see the added users.
   
* **addUsersCommonCardButtonClick** {function} : function that triggers on click of the button.

* **commonViewLoader** {Boolean} {Default : "false"}: Loader appears while changing views.

* **allSelectedUsersHeadingsData** {Array} : Array of objects will be passed...{below is sample example}

```javascript
[

    {
        "title": "Name",                            //compulsory
        "dataIndex": "name",                        //compulsory(will be same as _id)
        "_id": "name",                              //compulsory
        "lbl": "Name",
        "type": "text",                             //compulsory
        "sorter": true,                             //true if you want sorting in table
        "sortDirections": ["descend", "ascend"],    //type of sorting you want
        "ellipsis": true                            //true if you want sorting in a particular row
    },
    {
        "title": "Emp ID",
        "dataIndex": "employee_id",
        "_id": "employee_id",
        "lbl": "Emp ID",
        "type": "text",
        "sorter": true,
        "sortDirections": ["descend", "ascend"],
        "ellipsis": true
    }
]   
```

* **allSelectedUsersOnClickHeadingColumn** {function(activeHeading, sortingType)} : onClick of any Column Heading. You will get two datas as arguments of the passed function . First argument will give the clicked heading `_id` and Second argument will give type of sorting when clicked (for ex. `asc` for ascending, `dsc` for descending and will reset when it comes back to normal mode(when you don't pass anything).

* **allSelectedUsersUsersData** {Array of Objects} : will pass an Array of data to be populated according to allSelectedUsersHeadingsData.

* **allSelectedUsersTotalUsers** {Number}{Default : 0} : Total No. of Users or Data in the table.

* **allSelectedUsersPlaceHolder** {"string"} : Placeholder for search.

* **allSelectedUsersFirstButtonName** {"String"}: Name of first Button.

* **allSelectedUsersIsUserData** :  {boolean (default : true) } : `default` table will come(with profile pic and after selecting users all four action buttons will be shown)  and if `false` after selecting user  or data from table only `two` action buttons will come{delete and edit}

* **allSelectedUsersAllSelect** {boolean (default : false) } : if  `true` second `search` will come on right side (this will be with suggestions) and after selecting user  or data from table only `one ` action button{delete} will become active. 

* **allSelectedUsersOnChangeCheckBox** {function(data)} : onClick of checkboxes. You will get all data(array of ids selected) as the first argument of the passed function.

* **allSelectedUsersFirstButtonClick** {function} : onClick of first Button.

* **allSelectedUsersOnChangeRowsPerPage** {function(rowsPerPage)}{default : 30} :  OnChange of the Selection of rows per page. You will pass a function and will get no. of per page selected as first argument.

* **allSelectedUsersChangePage** {function} : onClick of previous or next arrow icon passing -1 or 1 respectively as arguments.

* **allSelectedUsersSearchData**  {function(e){}} : onChange of Search Input.

* **allSelectedUsersCurrentPageNumber** {Number}{default : 0} : Current Page No. of the table.

* **allSelectedUsersOnSearchDropdownSelect** {function(data){data}} : onSelect of any one User data from suggestion. this function will be triggered with value as the first argument of that function.

* **allSelectedUsersSearchDropdownPlaceholder** {"String"}{default : "Search and Add"} : Placeholder for the search dropdown.

* **allSelectedUsersSearchDropdownData** {Array of Objects} : Data to be shown in suggestions(name and _id key is compulsory in each object).

* **allSelectedUsersOnChangeSearchDropdown** {function(data){data}} : onChange of input of the search you can get the data as the first argument of the function you will pass in prop.

* **allSelectedUsersSearchLoader** {"boolean"} : Loader for search.

_Along with the above props add the props of Add Users Popup{AddUsersPopUp}_.

* **_AddUsersPopUp_** : <a name="add-users-popup" href="#add-users-popup">Click Here to read about the props of add users popup.</a>

**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**

<p>&nbsp;</p>

## `Add Users Popup {AddUsersPopUp}`

###### Add users popup 

***_This component is a popup that contains users of the organization who could be added to different collections._***

___

_Props :_

* **showAddUsersPopUp** {Boolean} {Default : 'false'}: boolean value decides the visibility of the popup.

* **addUsersPopUpTitle** {"String"} : Name of the popup.

* **addUsersPopUpClose** {function} : function to close the popup.

* **addUsersPopUpPlaceHolder** {"String"} : Placeholder for search.

* **addUsersPopUpFirstButtonName** {"String"} : Name for the First Button.

* **addUsersPopUpFirstButtonClick** {function} : onClick of first Button.

* **addUsersPopUpOnChangeCheckBox** {function(data)} : onClick of checkboxes. You will get all data(array of ids selected) as the first argument of the passed function.

* **addUsersPopUpTableColumnsData** {Array} : Array of objects will be passed...{below is sample example}

```javascript
[

    {
        "title": "Name",                            //compulsory
        "dataIndex": "name",                        //compulsory(will be same as _id)
        "_id": "name",                              //compulsory
        "lbl": "Name",
        "type": "text",                             //compulsory
        "sorter": true,                             //true if you want sorting in table
        "sortDirections": ["descend", "ascend"],    //type of sorting you want
        "ellipsis": true                            //true if you want sorting in a particular row
    },
    {
        "title": "Emp ID",
        "dataIndex": "employee_id",
        "_id": "employee_id",
        "lbl": "Emp ID",
        "type": "text",
        "sorter": true,
        "sortDirections": ["descend", "ascend"],
        "ellipsis": true
    }
]   
```
* **addUsersOnClickHeadingColumn** {function(activeHeading, sortingType)} : onClick of any Column Heading. You will get two datas as arguments of the passed function . First argument will give the clicked heading `_id` and Second argument will give type of sorting when clicked (for ex. `asc` for ascending, `dsc` for descending and will reset when it comes back to normal mode(when you don't pass anything).

* **addUsersPopUpUsersData** {Array of Objects} : will pass an Array of data to be populated according to addUsersPopUpTableColumnsData.

* **addUsersPopUpTotalUsers** {Number}{Default : 0} : Total No. of Users or Data in the table.

* **addUsersPopUpIsUserData** :  {boolean (default : true) } : `default` table will come(with profile pic and after selecting users all four action buttons will be shown)  and if `false` after selecting user  or data from table only `two` action buttons will come{delete and edit}

* **addUsersPopUpOnlySelectAndAdd** {boolean (default : false) } : if this `true` (`one` button will appear and will be inactive)and after selecting a user or data from table that button will become active along with the count of the selected users.

* **addUsersOnChangeRowsPerPage** {function(rowsPerPage)}{default : 30} :  OnChange of the Selection of rows per page. You will pass a function and will get no. of per page selected as first argument.

* **addUsersChangePage** : {function} : onClick of previous or next arrow icon passing -1 or 1 respectively as arguments. 

* **addUsersSearchData** {function(e){}} : onChange of Search Input.

* **addUsersCurrentPageNumber** {Number}{default : 0} : Current Page No. of the table.

* **addUsersSearchLoader** {"boolean"} : Loader for search.

**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**

<p>&nbsp;</p>

## `Add Users Common Card {AddUsersCommonCard}`

***_This component appears like a card that will let you add users through the AddUsersPopUp component._***
___

_Props :_

* **addUsersCardTitle** {"String"} {Default : "Add Users"}: Title of the card.

* **addUsersCardSubText** {"String"} {Default : "You don't have any Users here. Please add from the Users list"}: Subtext of the card.

* **buttonName** {"String"} {Default : "Add from Users List"} : Name of the button.

* **addUsersCommonCardButtonClick** {function} : function that triggers on click of the button. 
 
**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**

<p>&nbsp;</p>

## `Import Users Popup {ImportUsersPopUp}`

***_This component is a popup that facilitates the bulk upload of users._***
___

_Props :_

* **visible** {Boolean} {Default : "false"} : sets the visibility of the popup.

* **modalClose** {function} : function that triggers for close. 

* **firstButtonName** {"String"} {Default : "Select File"} : Name of the First Button.

* **secondButtonName** {"String"} {Default : "Download Sample Excel"} : Name of the Second Button.

* **secondButtonClickHandler** {function} : onClick of second button

* **thirdButtonName** {"String"} {Default : "Cancel"} : Name of the Third Button.

* **thirdButtonClickHandler** {function} :  onClick of third button

* **fourthButtonName** {"String"} {Default : "Start Upload"} : Name of the Fourth Button.

* **fourthButtonOnLoadingText** {"String"} {Default : "Uploading"} : pass the text that you want to see when the loader is loading. 

* **fourthButtonClickHandler** {function} : on click of fourth button.

* **fourthButtonLoaderStatus** {Boolean} {Default : "false"} : value determines the loader visibility.

* **sampleExcelFile** :  pass the sample excel file. (_sample file that has been downloaded on click of secondButton_) (accept type : ".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel")

    example : "https://s3-ap-southeast-1.amazonaws.com/hubbler-tmp/55b79cc2872ef87c1824f0b6/5e293cbf2b6f453e9ebde856/Users-Bulk-Upload-Sample-Sheet.xlsx"
    
* **importUsersUploadPopUpVisibility** {Boolean} {Default : "false"} :  value determines the ImportUsers popup  visibility.

* **uploadPopUpData** {Object} : data that has to be fed for the ImportUsersUploadPopUp, as shown in the below example.

    ###### example
```javascript
{
    _id: "5e1dc89f2b6f451066d0a4c4"
    file_path: "55b79cc2872ef87c1824f0b6/5e1dc89e2b6f451066d0a3cf.xlsx"
    created_on: "14-01-2020 19:26:47"
    fields: (123) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
    sheet_columns_original: (121) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
    sheet_columns: (121) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
    rows: 10
    type: "users"
    at: "14-01-2020 19:26:47"
    mappings: (123) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
    mapping_names: {First Name: "First Name", Last Name: "Last Name", Country Code (Default Is +91): "Country Code (Default Is +91)", Mobile: "Mobile", Email: "Email", …}
    created: 0
    error_path: "https://s3-ap-southeast-1.amazonaws.com/hubbler-bulk-uploads/55b79cc2872ef87c1824f0b6/5e2038b92b6f45074115006a/Failed_Records.xls"
    new_users: []
    not_created: 10
}
```

* **importUsersPopUpCloseHandler** {function} : function to close the popup.

* **patchImportUsersDataHandler** {function(id, mappings, skipFirstRow, uploadType){}} : the function that you pass for this props must take 4 params, 

* **importUsersUploadResponseData** {Object} : data to be passed for the response pop up , as shown in the below example.

    ###### example object 
```javascript
{
    success: true
    result: [
        {
            lbl: "Users",
            created: 0,
            invalid: 10,
        }] 
    error_file: "https://s3-ap-southeast-1.amazonaws.com/hubbler-bulk-uploads/55b79cc2872ef87c1824f0b6/5e294f742b6f4562971eb545/Failed_Records.xls"
}
```
* **uploadFileLoadingStatus** {Boolean} {Default : "false"} : value determines the visibility of the upload file loader.

* **isFileUploaded** {Boolean} {Default : "false"} : decides the visibility of the response popup . set this prop value to `true` on success of the patched data.

**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**

<p>&nbsp;</p>

## `Import Users Upload Popup {ImportUsersUploadPopUp}`

***_This component is a popup that shows the data you can manipulate before the bulk upload of users._***
___

_Props :_

* **importUsersUploadPopUpVisibility** {Boolean} {Default : "false"} :  value determines the ImportUsers popup  visibility.

* **importUsersUploadPopUpTitle** {"String"} {Default : "IMPORT USERS"} : Title of the Popup.

* **uploadPopUpData** {Object} : data that has to be fed for the ImportUsersUploadPopUp. Refer this <a name="example" href="#example">Example.</a>

* **fileName** : Name of the file that has been uploaded

* **importUsersUploadResponseData** {Object} : data to be passed for the response pop up , Refer this <a name="example-object" href="#example-object">Example.</a>

* **uploadFileLoadingStatus** {Boolean} {Default : "false"} : value determines the visibility of the upload file loader.

* **isFileUploaded** {Boolean} {Default : "false"} : decides the visibility of the response popup . set this prop value to `true` on success of the patched data.

    **_These are the other props that can be added if required:_**
    
#####-->  Main Upload Popup
    
* **importUsersUploadPopUpHeaderFirstButtonName** {"String"} {Default : "Import Another File"} : Name of the Button.
 (_**Location** : This is present on the top-right corner of the popup : **`headerFirstButton`**._) 
 
* **importUsersUploadPopUpHeaderFirstButtonHandler** {function} : on click of the button, (pass this prop only if you want to add an extra functionality upon the already existing functionality)
 
* **importUsersUploadPopUpFooterFirstButtonName** {"String"} {Default : "Cancel"} : Name of the Button.
 (_**Location** : This is the first button present on the bottom-right corner of the popup : **`footerFirstButton`**._) 

* **importUsersUploadPopUpFooterFirstButtonHandler** {function} : on click of the button, (pass this prop only if you want to add an extra functionality upon the already existing functionality)

* **importUsersUploadPopUpFooterSecondButtonName** {"String"} {Default : "Process"} : Name of the Button.
  (_**Location** : This is the second button  present on the bottom-right corner of the popup : **`footerSecondButton`**._)

* **importUsersUploadPopUpFooterSecondButtonHandler** {function} : on click of the button, (pass this prop only if you want to add an extra functionality upon the already existing functionality)

* **uploadingStatusText** {"String"} {Default : "Processing"} : Text when the file is being uploaded.
 (_**Location** : This is the second button  present on the bottom-right corner of the popup._)
 
#####-->  Response Popup (this pop up opens when the action on the `footerSecondButton` is processed)

* **footerSecondButtonPopUpTitle** {"String"} {Default : "Import Status"} : Title of the Popup.

* **footerSecondButtonPopUpPrimaryButtonName** {"String"} {Default : "Download Error Log"} : Name of the Button.
 (_**Location** : This is present on the bottom-left corner of the popup._)
 
* **footerSecondButtonPopUpSecondaryButtonName** {"String"} {Default : "Done"} : Name of the Button.
 (_**Location** : This is present on the bottom-right corner of the popup._)
 
 
#####-->  Confirmation Popup :

**_a) To Close/Cancel the Upload Popup (this pop up opens when the action on the `footerFirstButton` is processed)_**

* **footerFirstButtonConfirmationPopUpTitle** {"String"} {Default : "Cancel Excel Upload"} : Title of the Popup.

* **confirmationPopUpPrimaryButtonName** {"String"} {Default : "Cancel"} : Name of the Button.

* **footerFirstButtonConfirmationPopUpSecondaryButtonName** {"String"} {Default : "Ok"} : Name of the Button.

* **footerFirstButtonConfirmationPopUpBodyText** {"String"} {Default : "Are you sure you want to cancel the Excel Upload?"} : pass the reqiured text as body of the popup.


 
**_b) To Import a different file (this pop up opens when the action on the `headerFirstButton` is processed)_**  

* **headerFirstButtonConfirmationPopUpTitle** {"String"} {Default : "Import Another File"} : Title of the Popup.

* **confirmationPopUpPrimaryButtonName** {"String"} {Default : "Cancel"} : Name of the Button.

* **headerFirstButtonConfirmationPopUpSecondaryButtonName** {"String"} {Default : "Import"} : Name of the Button.

* **headerFirstButtonConfirmationPopUpBodyText** {"String"} {Default : "Are you sure you want to cancel the Excel Upload and Import another file ?"} : pass the reqiured text as body of the popup.

**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**

<p>&nbsp;</p>

## `User Information Slider {UserInfoSlider}`

***_This component is a slider that provides the information of the user in the organization._***
___

_Props :_

* **visible** {Boolean} {Default : "false"} : sets the visibility of the slider.

* **onCloseFunction** {function} : function to close the slider.

* **teamUserData** {Object} : data that needs to be fed to the slider, as shown below.

```javascript
{
   _id: "59d7421ac20a6b32e29570f9"
   alias: null
   dob: "03-04-2009"
   58e73e44d517f0042015120f: {_id: "58e73e51d517f00420151214", 58e73e44d517f00420151210: "ios1"}
   country_code: "IN"
   firstname: "_Redmi"
   email: "hubbler.redmi4a@gmail.com"
   name: "_redmi 4a"
   departments: []
   workaddress: {state: "", country: "", city: "", address1: null, address2: null}
   officephone: [""]
   pic_color: "#00bcd4"
   apps: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
   mobile: "9999999990"
   employee_id: "Doofus01"
   58f47003d517f05f471f47cb: [{…}]
   doj: null
   homephone: [""]
   lastname: "4A"
   workphone: [""]
   gender: "male"
   designations: []
   tracking_profiles: [{…}]
   mobile_country_code: {international_dialing: "91", country_code: "IN", country_name: "India", _id: "59880a4e13fd8efe651edc0d"}
   profile_image: {thumbnail: "https://d3r7nc1vxzqj4i.cloudfront.net/55b79cc2872e…1ac20a6b32e29570f9/t/59d7435cc20a6b32e2957156.jpg", original: "https://d3r7nc1vxzqj4i.cloudfront.net/None"}
   reportee_count: 0
   profiles: (5) [{…}, {…}, {…}, {…}, {…}]
   node_data: (2) [{…}, {…}] 
}
```
* **userId** {"String"} : user's Id , for example: ""59d7421ac20a6b32e29570f9"".

* **url** {"String"} : url to fetch the organizational information of the user. for example: `/reportees/organization/${userId}/?start=1&offset=100&sortKey=name&sortOrder=dsc&filterKey=_id&filterQuery=`

* **contentLoader** {Boolean} :  boolean for the loader before the content loads.

* **clickedMemberData** {Object} : data of the user that you clicked, as shown below.

```javascript
{
    _id: "59d7421ac20a6b32e29570f9"
    firstname: "_Redmi"
    name: "_redmi 4a"
    departments: []
    workaddress: {city: ""}
    employee_id: "Doofus01"
    lastname: "4A"
    gender: "male"
    designations: []
    type: "user"
    profile_image: {thumbnail: "https://d3r7nc1vxzqj4i.cloudfront.net/55b79cc2872e…1ac20a6b32e29570f9/t/59d7435cc20a6b32e2957156.jpg", original: "https://d3r7nc1vxzqj4i.cloudfront.net/55b79cc2872e…1ac20a6b32e29570f9/o/59d7435cc20a6b32e2957156.jpg"}

}
```
* **UserInfoSliderContent** : component used inside UserInfoSlider. Click <a name="user-info-slider-content" href="#user-info-slider-content">here</a>  to know about the props of this component.  

**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**

<p>&nbsp;</p>

## `User Information Slider Content {UserInfoSliderContent}`

 ###### User Information Slider Content


***_This component is a slider that provides the information of the user in the organization._***
___

_Props :_

* **onCloseFunction** {function} : function to close the slider.

* **teamUserData** {Object} : data that needs to be fed to the slider, as shown below.

* **userId** {"String"} : user's Id , for example: ""59d7421ac20a6b32e29570f9"".

* **url** {"String"} : url to fetch the organizational information of the user. for example: `/reportees/organization/${userId}/?start=1&offset=100&sortKey=name&sortOrder=dsc&filterKey=_id&filterQuery=`

* **contentLoader** {Boolean} :  boolean for the loader before the content loads.

* **clickedMemberData** {Object} : data of the user that you clicked, as shown below.

* **clickedUserOrgData** {Object} : organization data object.

```javascript
{
    success: true
    manager: {_id: "56ea93dfd517f047cbd6836b", designations: Array(1), gender: "male", workaddress: {…}, firstname: "Vinay", …}
    reportees: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    total_count: 9
}
```

* **getTeamViewOrgData** : {function (url) {}} : function that accepts an url as a parameter to fetch the organization data.

* **clickedUserOrgManagerData** {Object} : manager data object.

* **clickedUserOrgReporteesData** {Object} : reportees data object.

* **total_Count** {Number} : count of the reportees.

**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**
