
import axios from "axios";

axios.defaults.proxy = true;

//getting CSRF token
function getCSRFTokenFromCookie() {
	let cookieValue = null;
	let name = "csrftoken2";
	if (document.cookie && document.cookie !== "") {
		const cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i];
			cookie = cookie.trim();
			if (cookie.substring(0, name.length + 1) === name + "=") {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

let axiosConfig = {
	headers: {
		"X-CSRFToken": getCSRFTokenFromCookie(),
		"Content-Type": "application/json; charset=utf-8",
		"X-Requested-With": "XMLHttpRequest"
	},
	cache: "no-cache",
	credentials: "same-origin",
	referrer: "no-referrer",
	redirect: "follows" // manual, *follow, error
};


export const getUsers = () => {
	return axios.get("/rest/users/?start=1&offset=20&sortKey=_id&sortOrder=dsc&filterKey=&filterQuery=", axiosConfig);
};

export const getTeamViewUsers = () => {
	return axios.get("/reportees/orgchart//?sortKey=name&sortOrder=asc&filterKey=id&filterQuery=", axiosConfig);
};

export const getClickedTeamViewUser = (id) => {
	return axios.get(`/rest/users/${id}/?page=`, axiosConfig);
};

export const getClickedTeamViewOrgData = (id) => {
	return axios.get(`/reportees/organization/${id}/?start=1&offset=100&sortKey=name&sortOrder=dsc&filterKey=_id&filterQuery=`, axiosConfig);
};

export const getTableColumns = () => {
	return axios.get("https://demo1025512.mockable.io/user-table-details")
}