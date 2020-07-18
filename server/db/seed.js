const { 
    createUser,
    createCategory,
    createProduct,
    createReview,

} = require('./index');

//Creates seed data of initial users
async function createInitialUsers() {

    try {
    
        const user1 = await createUser({
            username: 'fsjay', 
            password: 'password1',
            "firstName": 'Frank',
            "lastName": 'Stepanski',
            email: 'frank.stepanski@gamil.com',
            address: "125 E Fake St Apt B San Luis Obispo CA 93405",
            admin: false,
            active: true
        });

        const user2 = await createUser({
            username: 'adubs', 
            password: 'password1',
            "firstName": 'Aidan',
            "lastName": 'Weber',
            email: 'aidanweber37@gmail.com',
            address: "123 E Fake St Apt C San Luis Obispo CA 93405",
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
              thumbnail: 'testpath',
              image: 'testpath',
              "categoryId": 2
        });

        const shirt1 = await createProduct({
            name: 'Shirt 1',
            description: 'A cool t-shirt...',
            price: 29.99,
            stock: 5,
            rating: 4.4,
            thumbnail: 'testpath',
            image: 'testpath',
            "categoryId": 1
        });

        const wheels1 = await createProduct({
            name: 'Skateboard wheels',
            description: 'A cool set of wheels...',
            price: 89.99,
            stock: 16,
            rating: 4.0,
            thumbnail: 'testpath',
            image: 'testpath',
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

const seed = async (FORCE = false) => {
    
    if (FORCE) {

        try {
        
        await createInitialUsers();
        await createInitialCategories();
        await createInitialProducts();
        await createInitialReviews();
        //await createInitialCarts();
        //await createInitialOrders();
        
        } catch(error) {
            console.error("Error seeding. Error: ", error);
            throw error;
        }
    }
}

module.exports = { seed };