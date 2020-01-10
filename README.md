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

* **searchLoader**{"boolean"} : Loader for search

* **onSearch** : onChange of Search Input {function(e){}}

* **onClickFirst** : onClick of First Button

* **onClickSecond** : onClick of Second Button 

<p>&nbsp;</p>

**--XX--Use below ones if You Want To Do actions On Users Like {Activate, Deactivate, Delete, Edit} or Using this in `AllUserSelect Component`--XX--**

* **userSelected**{Number} : Pass No. Of User Selected {If valid all below options will get active}

* **onUserActivate** : action on onClick of Activate Button 

* **onUserDeactivate** : action on onClick of Deactivate Button 

* **onUserDelete** : action on onClick of Delete Button 

* **onUserEdit** : action on onClick of Edit Button {Will automatically get disabled when user greater than 1 i.e; if userSelected is greater than 1}


##### below one will change UI{view} of this component according to props given

In all conditions Left Search will come before and after selecting User or Data

Note : Keep only one ( from `onlySelectAndAdd` and `allSelect`)  true at a time 

* **isUserData**{boolean (default : true) } : `default` table will come(with profile pic and after selecting users all four action buttons will be shown)  and if `false` after selecting user  or data from table only `two` action buttons will come{delete and edit}
 
* **onlySelectAndAdd**{boolean (default : false) } : if this `true` (`one` button will come and will be inactive)and after selecting user  or data from table that button will become active with counting in it

* **allSelect**{boolean (default : false) } : if  `true` second `search` will come on right side (this will be with suggestions) and after selecting user  or data from table only `one ` action button{delete} will become active

##### below props will get active if `allSelect` will be `true` (right Side Search)

* **onSearchDropdownChange** : action on onChange of Search Input {function(e){}}

* **searchDropdownPlaceholder** : placeholder of search

* **searchDropdownData**(Array) : will pass array of object with `name` and `_id` key in it

<p>&nbsp;</p>

**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**



<p>&nbsp;</p>
<p>&nbsp;</p>


## `Image Cropper{imageCropper}`


* **uniqueId**  {"string"} : Unique `Id` you will pass And Using Html `Label` you can easily Target this Id to `Open` directory and after selecting image this component will become active

* **onClickApply**  : {function(data)}{data}} //data will be the final image string

<p>&nbsp;</p>

**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**



<p>&nbsp;</p>
<p>&nbsp;</p>


## `Custom Dropdown{customDropdown}`


* **panelDataype**  {"string"} : if you will pass `"circles"` than icon will be circles..{default : "circles"}...otherwise icon will be file 

* **panelData**{Array of objects}  : To populate all the items of dropdown. "name" and "._id" key should be there in each object

* **onSinglePanelClick**(function)  : OnClick of Single item of DropDown {function(data){data}} //you will get the whole object of the selected item

* **onClickSetting**(function)  : OnClick of Setting Icon of items in DropDown {function(data){data}} //you will get the whole object of the selected item

* **onClickDelete**(function)  : OnClick of Delete Icon of items in DropDown {function(data){data}} //you will get the whole object of the selected item {if you want all actions on delete pop up then don't pass this}

* **popUpConfirmButtonName**{Default : "Confirm"} : Confirm Button Name of Delete Pop Up

* **popUpCancelButtonName**{Default : "Cancel"} : Confirm Button Name of Delete Pop Up

* **onDeleteConfirmClick**{funtion} : onClick confirm Button of Delete Pop Up 

* **onDeleteCancelClick**{function} : onClick cancel Button of Delete Pop Up 

<p>&nbsp;</p>

**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX**