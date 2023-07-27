import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

const baseQueryWithToken = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_API_URL,
  prepareHeaders: (headers) => {
    return headers;
  }
});
const baseQueryWithTokenWrapper: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQueryWithToken(args, api, extraOptions);
  return result;
};

export default baseQueryWithTokenWrapper;
