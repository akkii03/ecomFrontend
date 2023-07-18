const server = `https://ecombackenddeploy.onrender.com`;

// all product api
export const allproductAPi = `${server}/products`;

//stripe key
export const stripeKeyApi = `${server}/stripe/key`;

// create order api
export const createOrderApi = `${server}/createorder`;

// CREATE PRODUCT ADMIN API

export const createProductApi = `${server}/createProduct`

export const GETSINGLEUSER = (id)=>`${server}/user/${id}`



// CREATE PRODUCT ADMIN API

export const UpdateProduct = (id)=>`${server}/product/${id}`

export const DELETEPRODUCT = (id)=> `${server}/product/${id}`


//my order api 
export const myOrdersApi = (id)=>`${server}/myorders/${id}`;

export const singleOrder = (id)=>`${server}/singleorder/${id}`;

export const OrderDelivered = (id)=>`${server}/updateorder/${id}`;


// product detail by id

export const product_Id_Api =(id)=> `${server}/product/${id}`;
export const SubmitReviewApi = `${server}/review`;


// get all products admin
export const AllProducts = `${server}/allproducts`;


// get all Users admin
export const AllUsersADMIN = `${server}/allusers`;

// user edit 

export const EDITUSERADMIN = (id)=> `${server}/edituser/${id}`


//delete user

export const DELETEUSERADMIN =(id)=> `${server}/deleteUser/${id}`


// get all orders admin
export const AllOrdersADMIN = `${server}/allorders`;


// login api

export const loginApi = `${server}/login`;

export const logoutApi = `${server}/logout`;

export const register = `${server}/register`;
export const updateProfile = `${server}/updateprofile`
export const updatepassword = `${server}/updatepassword`

export const serverApi = server

