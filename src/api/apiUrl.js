// Auth URL
export const ADMIN_LOGIN = '/admin/adminLogin';
export const ADMIN_REGISTER = '/admin/adminRegister';
export const ADMIN_FORGOT_PASSWORD = '/admin/adminForgotPassword';
export const ADMIN_RESET_PASSWORD = ( token ) => `/admin/adminResetPassword?token=${token}`; 

export const USER_REGISTER = `/admin/userRegister`; 
export const USER_INVITATION =`/admin/emailInvitaion`; 
export const GET_USER_EMAIL = (token) => `/admin/get-email?token=${token}`; 
export const GET_ALL_USERS = `/admin/all-users`; 
export const GET_ALL_USERS_BY_PAGGINATION = (page, search, column, order, searchBycolumn) => `/admin/user-records?pageNumber=${page}&search=${search}&column=${column}&order=${order}&searchBycolumn=${searchBycolumn}`; 


export const CHANGE_PASSWORDS = `/admin/users-change-password`; 
export const GET_USER_DETAILS = (id) => `/admin/get-user?id=${id}`; 
export const UPDATE_PROFILE = `/admin/updateProfile`; 

export const GET_ALL_CATEGORIES = '/category/get/all';
export const GET_ALL_CATEGORIES_BY_PAGINATION =(page, search, column, order, searchBycolumn)=>`/category/get-all?pageNumber=${page}&search=${search}&column=${column}&order=${order}&searchBycolumn=${searchBycolumn}`;
export const GET_CATEGORY = (id) => `/category/get?id=${id}`; 
export const ADD_CATEGORY = `/category/add`; 
export const UPDATE_CATEGORY = `/category/update`; 
export const DELETE_CATEGORY = (id) => `/category/delete?id=${id}`; 

export const GET_ALL_SUBCATEGORIES = '/category/sub-get-all';
export const GET_ALL_SUBCATEGORIES_BY_PAGINATION =(page, search, column, order, searchBycolumn)=>`/category/sub-all?pageNumber=${page}&search=${search}&column=${column}&order=${order}&searchBycolumn=${searchBycolumn}`;
export const GET_SUBCATEGORIES = (id) => `/category/sub-get?id=${id}`; 
export const ADD_SUBCATEGORIES = `/category/sub-add`; 
export const UPDATE_SUBCATEGORIES = `/category/sub-update`; 
export const DELETE_SUBCATEGORIES = (id) => `/category/sub-delete?id=${id}`; 

export const GET_ALL_MEASUREMENT = '/category/measurement-get-all';
export const GET_ALL_MEASUREMENT_BY_PAGINATION =(page, search, column, order, searchBycolumn)=>`/category/all-measurements?pageNumber=${page}&search=${search}&column=${column}&order=${order}&searchBycolumn=${searchBycolumn}`;
export const GET_MEASUREMENT = (id) => `/category/measurement-get?id=${id}`; 
export const ADD_MEASUREMENT = `/category/measurement-add`; 
export const UPDATE_MEASUREMENT = `/category/measurement-update`; 
export const DELETE_MEASUREMENT = (id) => `/category/measurement-delete?id=${id}`; 

export const ADMIN_ADD_USER = `/admin/add-user`; 
export const ADMIN_UPDATE_USER = `/admin/update-user`; 
export const DELETE_USER = (id) => `/admin/delete-user?id=${id}`; 

export const GET_ALL_PRODUCTS_BY_PAGINATION =(page, search, column, order, searchBycolumn)=>`/product/all-product?pageNumber=${page}&search=${search}&column=${column}&order=${order}&searchBycolumn=${searchBycolumn}`;
export const GET_ALL_ARCHIVE_PRODUCTS_BY_PAGINATION =(page, search, column, order, searchBycolumn)=>`/product/get-archive-product?pageNumber=${page}&search=${search}&column=${column}&order=${order}&searchBycolumn=${searchBycolumn}`;

export const GET_PRODUCTS = (id) => `/product/measurement-get?id=${id}`; 
export const ADD_PRODUCTS = `/product/add-product`; 
export const UPDATE_PRODUCTS = `/product/update-product`; 
export const DELETE_PRODUCTS = (id, note) => `/product/delete-product?id=${id}&note=${note}`; 
export const REVERT_TO_ACTIVE_PRODUCTS = (id) => `/product/unarchive-product?id=${id}`; 
export const UPDATE_INVENTORY = `/product/update-inventory`; 
export const GENRATE_REPORTS = `/admin/reports`; 
export const GET_ALL_PRODUCTS = `/product/get-all-product`; 
export const GET_ALL_PRODUCTS_FOR_EXPORT = `/admin/get-all-products`; 
export const REMOVE_PRODUCTS = (id) => `/product/remove-products?id=${id}`; 


export const GET_ALL_ACTIVITIES_BY_PAGINATION =(page,search)=>`/product/activities?pageNumber=${page}&search=${search}`;

export const UPLOAD_IMAGE_ON_CLOUD = `/product/uploadImageOnCloud`;
export const UPDATE_SETTING = `/product/update-setting`;
export const UPDATE_DYMO_SETTING = `/admin/update-dymo-setting`;
export const GET_SETTING = `/product/get-setting`;
export const GET_DASHBOARD_DATA = (search,period) => `/admin/dashboard?search=${search}&period=${period}`;

export const PRINT_TO_DYMO = `/admin/dymo`;
export const UPDATE_LANGUAGE = `/admin/update-language`;



















