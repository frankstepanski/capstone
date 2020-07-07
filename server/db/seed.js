const { client } = require('./client');
const { 
    createUser,
    createCategory,
    createProduct,
    createReview,

        } = require('./index');



const createTables = async () => {

    // note: admin users will be created in admin screen only
    await client.query(
        `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) UNIQUE NOT NULL,
            "firstName" VARCHAR(255) NOT NULL,
            "lastName" VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            addresses TEXT [],
            "paymentInfo" TEXT [],
            admin BOOLEAN DEFAULT false,
            active BOOLEAN DEFAULT true
        ); `
    );

    // each product belongs to only one category (1:1)
    // lookup table
    await client.query(
        `CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        );`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            price FLOAT(2) NOT NULL,
            stock INTEGER NOT NULL,
            rating FLOAT(1),
            "categoryId" INTEGER REFERENCES categories(id) NOT NULL
        );`
    );

    await client.query(
        `CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            "productId" INTEGER REFERENCES products(id) NOT NULL,
            "userId" INTEGER REFERENCES users(id) NOT NULL,
            title VARCHAR(255),
            rating INTEGER NOT NULL,
            comment TEXT NOT NULL
        );`
    );

    // product has many reviews (1:M)
    // join table
    await client.query(`
        CREATE TABLE IF NOT EXISTS product_reviews (
            id SERIAL PRIMARY KEY,
            "productId" INTEGER REFERENCES products(id) NOT NULL,
            "reviewId" INTEGER REFERENCES reviews(id) NOT NULL
        );`
    );

    // note: cart availabe only if user created; otherwise will in localstate
    // need another column???
    await client.query(
        `CREATE TABLE IF NOT EXISTS carts (
            id serial PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            quantity INTEGER NOT NULL
        );`
    );

    // cart has many products (1:M)
    // join table
    await client.query(`
    CREATE TABLE IF NOT EXISTS cart_products(
        id SERIAL PRIMARY KEY,
        "cartId" INTEGER REFERENCES carts(id) NOT NULL,
        "productId" INTEGER REFERENCES products(id) NOT NULL
        );`
    );

    // an order will have many products (1:M)
    // products column will have multiple productIDs
    // join table
    await client.query(
        `CREATE TABLE IF NOT EXISTS orders (
            id serial PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            products INTEGER [] NOT NULL,
            quantity INTEGER NOT NULL,
            "orderDate" DATE NOT NULL,
            "orderTotal" FLOAT(2) NOT NULL,
            "shippingAddress" VARCHAR(255) NOT NULL            
        );`
    );

    // user has many orders (1:M)
    // join table
    await client.query(
        `CREATE TABLE IF NOT EXISTS user_orders (
            id serial PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id) NOT NULL,
            "orderId" INTEGER REFERENCES orders(id) NOT NULL
        );`
    );

    // blog posts:
    await client.query(`
        CREATE TABLE IF NOT EXISTS posts(
            id SERIAL PRIMARY KEY,
            title VARCHAR(50),
            "postBody" TEXT,
            comments INTEGER []
        );`

    );
}

async function dropTables() {
    
    try {

        console.log("Starting to drop tables...")

        await client.query(`
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS product_reviews;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS user_orders;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS cart_products;
        DROP TABLE IF EXISTS carts;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS categories;
        DROP TABLE IF EXISTS users;
        `);

       console.log(">>>>>Finished dropping tables")

    }
    catch(error) {
        console.error("Error dropping tables. Error: ", error);
        throw error;
    }
}

//Creates seed data of initial users
async function createInitialUsers() {

    try {
    
        const user1 = await createUser({
            username: 'fsjay', 
            password: 'password1',
            "firstName": 'Frank',
            "lastName": 'Stepanski',
            email: 'frank.stepanski@gamil.com',
            addresses: [],
            admin: false,
            active: true
        });

        const user2 = await createUser({
            username: 'adubs', 
            password: 'password1',
            "firstName": 'Aidan',
            "lastName": 'Weber',
            email: 'aidanweber37@gmail.com',
            addresses: [],
            admin: true,
            active: true
        });

        // create a few more:

        console.log(">>>>>Finished creating initial users");

     } catch(error) {
            console.error("Error creating initial. Error: ", error);
            throw error;
        }

}

async function createInitialCategories() {

    // create a few more categories

    try {

        const clothing = await createCategory({name: 'clothing'});
        const boards = await createCategory({name: 'boards'});
        const accessories = await createCategory({name: 'accessories'});

        console.log(">>>>>Finished creating initial categories!");

    }
    catch(error) {
        console.error("Error creating initial categories. Error: ", error);
        throw error;
    }

}

async function createInitialProducts() {

    //note: Chris can make these real skareboard products:

    /*
        table schema:

        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price FLOAT(2) NOT NULL,
        stock INTEGER NOT NULL,
        rating FLOAT(1),
        "categoryID" INTEGER REFERENCES categories(id) NOT NULL

    */

    try {

        const skateboard1 = await createProduct({
              name: 'Skateboard 1',
              description: 'A cool skateboard...',
              price: 549.99,
              stock: 10,
              rating: 4.7,
              "categoryId": 2
        });

        const shirt1 = await createProduct({
            name: 'Shirt 1',
            description: 'A cool t-shirt...',
            price: 29.99,
            stock: 5,
            rating: 4.4,
            "categoryId": 1
        });

        const wheels1 = await createProduct({
            name: 'Skateboard wheels',
            description: 'A cool set of wheels...',
            price: 89.99,
            stock: 16,
            rating: 4.0,
            "categoryId": 3
        });

        console.log(">>>>>Finished creating initial products");

    }

    catch(error) {
        console.error("Error creating initial products. Error: ", error);
        throw error;
    }

}    

async function createInitialReviews() {

    /*
        table schema:

        "productId" INTEGER REFERENCES products(id) NOT NULL,
        "userId" INTEGER REFERENCES users(id) NOT NULL,
        title VARCHAR(255),
        rating INTEGER NOT NULL,
        comment TEXT NOT NULL

    */

    try {

        // create more initial reviews:

        const review1 = await createReview({
            "productId": 1,
            "userId": 1,
            title: 'I love it!',
            rating: 5,
            comment: "I love this skateboard. It is the best I have ever had!!!"
        });

        const review2 = await createReview({
            "productId": 2,
            "userId": 2,
            title: "Very solid t-shirt",
            rating: 4,
            comment: "I got his t-shirt for my younger brother. He loves the fit and the colors look great!"
        });

        console.log(">>>>> Finished creating initial reviews!");
    }
    catch(error) {
        console.error("Error creating initial reviews @ db/seed.js createInitialReviews()! Error: ", error);
        throw error;
    }
}

// are we creating multiple carts or just one?
async function createInitialCarts() {

    try {

        // under construction...

        console.log(">>>>>Finished creating initial carts!");
    }
    catch(error) {
        console.error("Error creating initial carts. Error: ", error);
        throw error;
    }

}

async function createInitialOrders() {

    /*
        table schema:

        "userId" INTEGER REFERENCES users(id),
        products INTEGER [] NOT NULL,
        quantity INTEGER NOT NULL,
        "orderDate" DATE NOT NULL,
        "orderTotal" FLOAT(2) NOT NULL,
        "shippingAddress" VARCHAR(255) NOT NULL    
    */

    try {

        const order1 = await createOrder({
            "userId": 1,
            products: '{1,2}',
            "orderDate": '2020-07-01',
            "orderTotal": 580.56,
            "shippingAddress": '12345 Street., City, ST, 12345'
        });

        const order2 = await createOrder({
            "userId": 2,
            products: '{2, 3}',
            "orderDate": '2020-06-25',
            "orderTotal": 120.87,
            "shippingAddress": '12345 Street., City, ST, 12345'
        });

        console.log(">>>>>Finished creating initial orders!");
    }
    catch(error) {
        console.error("Error creating initial orders. Error: ", error);
        throw error;
    }

}

async function bootstrap() {

    try {
        
        // note: seed.js is only run once, without a server
        client.connect();
        console.log("Connected to DB")

        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialCategories();
        await createInitialProducts();
        await createInitialReviews();
        //await createInitialCarts();
        //await createInitialOrders();
        

    } catch(error) {
        console.error("Error bootstrapping. Error: ", error);
        throw error;
    }
}

bootstrap()
//.then(testDB)
.catch(console.error)
.finally(() => client.end());