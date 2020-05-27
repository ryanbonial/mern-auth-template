let _token = '';

export const setAuthToken = (token) => {
  _token = token;
};

export const getAuthToken = () => {
  return _token;
};