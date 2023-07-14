import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

const baseQueryWithToken = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('serviceToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});
const baseQueryWithTokenWrapper: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQueryWithToken(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    window.location.pathname = '/login';
    return Promise.reject((result.error && result.error.data) || 'Wrong Services');
  }
  return result;
};

export default baseQueryWithTokenWrapper;
