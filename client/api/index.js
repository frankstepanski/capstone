import axios from "axios";

// axios cheatsheet: https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index

/* ******** user ******** */


export async function loginUser({username, password}) {
    try {
      const { data }   = await axios.post("/api/users/login", {
        username,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        validateStatus: function (status) {
          return status === 200 || status === 400; // default
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  }
 
export async function registerUser(username, password, firstName, lastName, email, address) {
    try {
      const { data } = await axios.post("/api/users/register", {
          username,
          password,
          email,
          firstName,
          lastName,
          address
      });
      console.log(data);
      localStorage.setItem("token", data.token);
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

export async function createProducts(
    name, 
    description,
    price,
    stock,
    active,
    featured,
    thumbnail,
    image,
    categoryId ){

        try {
        const { data } = await axios.post('/api/products/create',{
          name, 
          description,
          price,
          stock,
          active,
          featured,
          thumbnail,
          image,
          categoryId
        });
        console.log(data);
        return data;
    }   catch (error) {
      throw error;
    }

    //authorization/ bearer token needed... pull from state
}
/* ******** cart ******** */

export async function getCart() {
  try {
    const { data } = await axios.get("/api/cart");
    console.log("cart:", data);
    return data;
  } catch (error) {
    throw error;
  }
}

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

