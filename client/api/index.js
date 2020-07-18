import axios from "axios";

// axios cheatsheet: https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index

/* ******** user ******** */

export async function loginUser(username, password) {
    try {
      const { data } = await axios.post("/api/users/login", {
        username,
        password,
      });
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

export async function registerUser(username, password, firstName, lastName, address) {
    try {
      const { data } = await axios.post("/api/users/register", {
          username,
          password,
          firstName,
          lastName,
          address
      });
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
}

/* ******** products ******** */

export async function getAllProducts() {
    try {
      const { data } = await axios.get("/api/products");
      console.log("products:", data);
      return data;
    } catch (error) {
      throw error;
    }
}

export async function searchProducts(searchTerm) {
  try {
    const { data } = await axios.get('/api/search/:searchTerm', {searchTerm});
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

/* ******** cart ******** */

// userId maybe null, productId will get us product info, and quantity (will UI only add one at a time?)
export async function addToCart(userId, productId, quantity) {
  try {
    const { data } = await axios.post('/api/cart', {userId, productId, quantity});
    return data;
  } catch (error) {
    throw error;
  }
}

// what do we need to remove an item? removing from cart is a post or delete request?
export async function removeFromCart(cartId, productId) {
  try {
    const { data } = await axios.post('/api/cart/remove', {cartId, productId});
    return data;
  } catch (error) {
    throw error;
  }
}

/* ******** reviews ******** */

export async function getReviewsByProductId(productId) {
  try {
    const { data } = await axios.get('/api/reviews/:productId', {productId});
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}


export async function getReviewsByUserId(userId) {
  try {
    const { data } = await axios.get('/api/reviews/:userId', {userId});
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

