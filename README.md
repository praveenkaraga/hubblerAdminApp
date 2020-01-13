This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


Checkout the code from git and do

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
<p>&nbsp;</p>


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

##### below props will get active if `allSelect` will be `true` (right Side Search)

* **onSearchDropdownChange** {function}: action on onChange of Search Input {function(e){}}

* **searchDropdownPlaceholder** : placeholder of search

* **searchDropdownData** {Array} : will pass array of object with `name` and `_id` key in it<br/>

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

* **onChangeCheckBox** {function(data)} : onClick of checkboxes. You will get all data(array of ids selected) as the first argument of the passed function

* **onClickTableRow** {function(rowData)} : onClick of Each full row of table. You will get whole object of that particular clicked column as the first argument.



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