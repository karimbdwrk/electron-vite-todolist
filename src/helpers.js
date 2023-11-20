export const getToken = () => {
	return localStorage.getItem("jwt");
};

export const setToken = (token) => {
	if (token) {
		localStorage.setItem("jwt", token);
	}
};

export const removeToken = () => {
	localStorage.removeItem("jwt");
};
