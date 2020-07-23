const { 
    createUser,
    createCategory,
    createProduct,
    createReview,
    createOrder
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
        const user3 = await createUser({
            username: 'chrisfyi', 
            password: 'password1',
            "firstName": 'Chris',
            "lastName": 'Jones',
            email: 'chrisfyi@hotmail.com',
            address: "123 E Fake St Apt C San Luis Obispo CA 93405",
            admin: true,
            active: true
        });
        // create a few more:
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
        const shoes = await createCategory({name: 'shoes'});
    }
    catch(error) {
        console.error("Error creating initial categories. Error: ", error);
        throw error;
    }
}
async function createInitialProducts() {
    try {
        const shirt1 = await createProduct({
              name: 'The Hundreds Malibu Long Sleeve',
              description: 'Light Blue and Purple 100% Cotton Long Sleeve Shirt',
              price: 45.00,
              stock: 10,
              thumbnail: src = "/assets/images/Clothing/hundredsMalibuThumb.jpg",
              image: 'testpath',
              featured: true,
              "categoryId": 1
        });
        const skateboard1 = await createProduct({
            name: 'Santa Cruz Fabiana Hand Skateboard',
            description: 'Retro-Styled Skateboard',
            price: 59.99,
            stock: 7,
            thumbnail: src="/assets/images/Skateboards/SC_FabianaHand.jpg ",
            image: 'testpath',
            featured: true,
            "categoryId": 2
        });
        const shirt2 = await createProduct({
            name: 'Stüssy Sprout Tee',
            description: 'Orange 100% Cotton Shirt',
            price: 29.99,
            stock: 16,
            thumbnail: src= "/assets/images/Clothing/stussySproutTeeThumb2.jpg",
            image: 'testpath',
            featured:true,
            "categoryId": 1,
        });
        const shoes1 = await createProduct({
            name: 'Vans Retro Stripes Authentic SF',
            description: 'Navy Blue White Sole',
            price: 49.99,
            stock: 10,
            thumbnail: src="/assets/images/Shoes/Vans.jpg",
            image: 'testpath',
            featured: true,
            "categoryId": 3
        });
        const shirt3 = await createProduct({
            name: 'The Hundreds Heights Tee',
            description: 'White,Blue,Yellow,Teal,Magenta Knit Shirt 100% Cotton',
            price: 49.99,
            stock: 12,
            thumbnail: src= "/assets/images/Clothing/hundredsHeights.jpg",
            image: 'testpath',
            featured: false,
            "categoryId": 1,
        });
        const shirt4 = await createProduct({
            name: 'Obey Buggs Tee',
            description: 'White, Light Blue,Yellow, Knit Shirt 100% Cotton',
            price: 39.99,
            stock: 19,
            thumbnail: src= "/assets/images/Clothing/buggsTee.jpg",
            image: 'testpath',
            featured: false,
            "categoryId": 1,
        });
        const shirt5 = await createProduct({
            name: 'Stüssy Italic Collage Tee',
            description: 'Light Yellow Shirt 100% Cotton',
            price: 29.99,
            stock: 8,
            thumbnail: src= "/assets/images/Clothing/stussyItalicTee.jpg",
            image: 'testpath',
            featured: false,
            "categoryId": 1,
        });
        const shirt6 = await createProduct({
            name: ' Vans Classic Stripe Long Sleeve',
            description: 'White and Black Knit Long Sleeve Shirt 100% Cotton',
            price: 49.99,
            stock: 14,
            thumbnail: src= "/assets/images/Clothing/classicStripeLongSleeveFull.jpg",
            image: 'testpath',
            featured: false,
            "categoryId": 1,
        });
        const skateboard2 = await createProduct({
            name: 'Believe Full Red',
            description: 'Alien Workshop 8.5',
            price: 59.99,
            stock: 12,
            thumbnail: src= "/assets/images/Skateboards/believeFullRed.jpg",
            image: 'testpath',
            featured: true,
            "categoryId": 2
        });
        const skateboard3 = await createProduct({
            name: 'BAKER Classic',
            description: 'Baker Logo 8.5',
            price: 49.99,
            stock: 3,
            thumbnail: src="/assets/images/Skateboards/BK_BRAND_LOGO_WHITE_.png ",
            image: 'testpath',
            featured: false,
            "categoryId": 2
        });
        const skateboard4 = await createProduct({
            name: 'Sammy Rolling Shutter',
            description: 'Alien Workshop 8.5',
            price: 54.99,
            stock: 6,
            thumbnail: src="/assets/images/Skateboards/SAMMY_ROLLING_SHUTTER_1000x.jpg ",
            image: 'testpath',
            featured: false,
            "categoryId": 2
        });
        const skateboard5 = await createProduct({
            name: 'TFThoughts Deck',
            description: 'Baker Skateboard 8.5',
            price: 62.99,
            stock: 9,
            thumbnail: src="/assets/images/Skateboards/TFThoughtsDeck.png ",
            image: 'testpath',
            featured: false,
            "categoryId": 2
        });
        const shoes2 = await createProduct({
            name: 'Addidas Busenitz Pros',
            description: 'Black, White, Gum Sole',
            price: 69.99,
            stock: 10,
            thumbnail: src="/assets/images/Shoes/Busenitz_Pro_Shoes_Black.jpg",
            image: 'testpath',
            featured: false,
            "categoryId": 3
        });
        const shoes3 = await createProduct({
            name: 'Addidas Busenitz Classics',
            description: 'Blue, White, Red, Gum Sole',
            price: 59.99,
            stock: 5,
            thumbnail: src="/assets/images/Shoes/BusenitzShoesBlue2.jpg",
            image: 'testpath',
            featured: false,
            "categoryId": 3
        });
        const shoes4 = await createProduct({
            name: 'Lakai Cambridge',
            description: 'White, Burgundy, Gum Sole',
            price: 64.99,
            stock: 13,
            thumbnail: src="/assets/images/Shoes/cambridge.jpg",
            image: 'testpath',
            featured: true,
            "categoryId": 3
        });
        const shoes5 = await createProduct({
            name: 'Vans SK8 Lows',
            description: 'Mustard, Royal Purple, White Sole',
            price: 74.99,
            stock: 13,
            thumbnail: src="/assets/images/Shoes/VansSK8Low.jpg",
            image: 'testpath',
            featured: false,
            "categoryId": 3
        });
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
        const review3 = await createReview({
            "productId": 3,
            "userId": 1,
            title: "Love my wheels!",
            rating: 5,
            comment: "I love the wheels from your store! They look great and ride smooth!"
        })
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
// commenting out due to ongoing schema changes
/* async function createInitialOrders() {
    try {
        const order1 = await createOrder({
            "userId": 1,
            products: [1, 2],
            "orderDate": '2020-07-01',
            "orderTotal": 580.56,
            "shippingAddress": '12345 Street., City, ST, 12345'
        });
        const order2 = await createOrder({
            "userId": 2,
            products: [2, 3],
            "orderDate": '2020-06-25',
            "orderTotal": 120.87,
            "shippingAddress": '12345 Street., City, ST, 12345'
        });
        console.log('>>>>>>>',createOrder())
    }
    catch(error) {
        console.error("Error creating initial orders. Error: ", error);
        throw error;
    }
} */
const seed = async (FORCE = false) => {
    if (FORCE) {
        try {
        console.log(`Seeding DB`);
        await createInitialUsers();
        console.log(`>Users Created`);
        await createInitialCategories();
        console.log(`>>Categories created`);
        await createInitialProducts();
        console.log(`>>>products created`);
        await createInitialReviews();
        console.log(`>>>>Reviews created`);
        //await createInitialCarts();
        //await createInitialOrders();
        } catch(error) {
            console.error("Error seeding. Error: ", error);
            throw error;
        }
    }
}
module.exports = { seed };