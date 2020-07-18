const { client } = require("./client");

const sync = async (FORCE = false) => {

    try {

    if (FORCE) {
        console.log('Dropping tables')
        await client.query(`
            DROP TABLE IF EXISTS posts;
            DROP TABLE IF EXISTS messages;
            DROP TABLE IF EXISTS product_reviews;
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS user_orders;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS cart_products;
            DROP TABLE IF EXISTS carts;
            DROP TABLE IF EXISTS product_images;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS categories;
            DROP TABLE IF EXISTS users;
        `);
        console.log(`Tables Dropped`)
    }

        await client.query(
        `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) UNIQUE NOT NULL,
            "firstName" VARCHAR(255) NOT NULL,
            "lastName" VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
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
                active BOOLEAN DEFAULT TRUE,
                thumbnail VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
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
    
    
        // Carts will be accessible by the userId
        await client.query(`
        CREATE TABLE IF NOT EXISTS cart_products(
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id) NOT NULL,
            "productId" INTEGER REFERENCES products(id) NOT NULL,
            quantity INTEGER NOT NULL
            );`
        );
    
        // an order will have many products (1:M)
        // products column will have multiple productIDs
        // join table
        await client.query(
            `CREATE TABLE IF NOT EXISTS orders (
                id serial PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                products  VARCHAR(255)[] NOT NULL,
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
                date DATE DEFAULT CURRENT_DATE,
                title VARCHAR(50),
                "blogText" TEXT
            );`
        );

         // messages from contact form:
         await client.query(`
         CREATE TABLE IF NOT EXISTS messages (
             id SERIAL PRIMARY KEY,
             name VARCHAR(255) NOT NULL,
             email VARCHAR(255) NOT NULL,
             message TEXT
         );`
     );

        console.log(`Tables successfully created`)
    }

    catch (error) {
        throw error;
    }
};

module.exports = { sync };
