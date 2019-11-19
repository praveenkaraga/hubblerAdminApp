import React from 'react';
import _ from 'lodash';



const requestConfigs = {
	getUsers:{
        url:'/rest/users/?start=1&offset=20&sortKey=_id&sortOrder=dsc&filterKey=&filterQuery=',
        options:{
            method:'get'
        }
	}
};

const generateGetUrl = (url, data) => {
	if (!data) {
		return url;
	}
	_.each(data, (value, index) => {
		url = url.replace(':' + index, value);
	});

	return url;
}


const optionDefaults = {
	cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	credentials: 'same-origin', // include, same-origin, *omit
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'X-Requested-With': 'XMLHttpRequest',
		// "Content-Type": "application/x-www-form-urlencoded",
		'Access-Control-Allow-Origin':'*'
	},
	redirect: 'follow', // manual, *follow, error
	referrer: 'no-referrer', // no-referrer, *client
	method: 'get'
};
const formDataHeader = {
    'X-Requested-With': 'XMLHttpRequest',
}
_.each(requestConfigs, (requestConfig) => {
	let options = requestConfig.options || {};
	options = _.extend({}, optionDefaults, options);
	requestConfig.options = options;
});

export default function (requestId, urlParams = {}, postParams) {
	const requestConfig = requestConfigs[requestId];
	let {url} = requestConfig;
	url = generateGetUrl(url, urlParams)
	let options = {...requestConfig.options};
	if(options.method === 'post' || options.method === 'put' || options.method === 'PATCH'){
	    if(options.formData === true){
            options.body = postParams
            options.headers = formDataHeader
        }else{
            options.body = JSON.stringify(postParams)
        }
	}
	return fetch(url, options)
		.then(resp => {
            let response = resp.json()
            return response
		});
}