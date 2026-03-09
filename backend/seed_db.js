const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/product');

const DB = process.env.DB;

const productData = {
    men: [
        { name: "Men's Blue Inter Galactic Party Graphic Printed T-shirt", price: 549, image: "https://images.bewakoof.com/t1080/men-s-blue-inter-galactic-party-graphic-printed-t-shirt-617004-1734005273-1.jpg", brand: "Bewakoof", desc: "T-Shirt" },
        { name: "Men's Jet Black Oversized Shorts", price: 699, image: "https://images.bewakoof.com/t1080/men-s-jet-black-oversized-shorts-657413-1761917279-1.jpg", brand: "Bewakoof", desc: "Shorts" },
        { name: "Men's Jet Black Vest", price: 399, image: "https://images.bewakoof.com/t1080/men-s-jet-black-vest-210687-1755589153-1.jpg", brand: "Bewakoof", desc: "Vest" },
        { name: "Men's Chocolate Brown Wise Man Typography Oversized T-shirt", price: 649, image: "https://images.bewakoof.com/t1080/685504_2026-02-11t12-26-32_1.jpg", brand: "Bewakoof", desc: "T-Shirt" },
        { name: "Men's Ginger Root Brown Dynamic Dosti Graphic Printed Oversized T-shirt", price: 649, image: "https://images.bewakoof.com/t1080/686603_2026-02-11t12-26-32_1.jpg", brand: "Bewakoof", desc: "T-Shirt" },
        { name: "Men's Aventurine Green Good Vibes Graphic Printed T-shirt", price: 499, image: "https://images.bewakoof.com/t1080/685503_2026-02-11t12-26-32_1.jpg", brand: "Bewakoof", desc: "T-Shirt" },
        { name: "Men's Indigo Blue Slim Fit Jeans", price: 1299, image: "https://images.bewakoof.com/t1080/men-s-indigo-blue-slim-fit-jeans-581616-1696327389-1.jpg", brand: "Bewakoof", desc: "Jeans" },
        { name: "Men's Olive Green Cargo Pants", price: 1499, image: "https://images.bewakoof.com/t1080/men-s-olive-green-cargo-pants-581617-1696327389-1.jpg", brand: "Bewakoof", desc: "Cargo" },
        { name: "Men's Black Typography Hoodie", price: 999, image: "https://images.bewakoof.com/t1080/men-s-black-typography-hoodie-581618-1696327389-1.jpg", brand: "Bewakoof", desc: "Hoodie" },
        { name: "Men's Maroon Solid T-shirt", price: 499, image: "https://images.bewakoof.com/t1080/men-s-maroon-solid-t-shirt-685505-1734005315-1.jpg", brand: "Bewakoof", desc: "T-Shirt" }
    ],
    women: [
        { name: "Women's Blue It's a Deal Graphic Printed Boyfriend T-shirt", price: 499, image: "https://images.bewakoof.com/t1080/women-s-blue-it-s-a-deal-graphic-printed-boyfriend-t-shirt-617012-1734005315-1.jpg", brand: "Bewakoof", desc: "T-Shirt" },
        { name: "Women's Pink No Worries Graphic Printed Oversized T-shirt", price: 649, image: "https://images.bewakoof.com/t1080/women-s-pink-no-worries-graphic-printed-oversized-t-shirt-628410-1704285422-1.jpg", brand: "Bewakoof", desc: "T-Shirt" },
        { name: "Women's Grey Typography T-shirt", price: 599, image: "https://images.bewakoof.com/t1080/women-s-grey-typography-t-shirt-617015-1734005334-1.jpg", brand: "Bewakoof", desc: "T-Shirt" },
        { name: "Women's Lavender Dreamy Graphic T-shirt", price: 499, image: "https://images.bewakoof.com/t1080/women-s-lavender-dreamy-graphic-t-shirt-617019-1734005414-1.jpg", brand: "Bewakoof", desc: "T-Shirt" },
        { name: "Women's Yellow Sunny Vibe Cargo Pants", price: 1199, image: "https://images.bewakoof.com/t1080/women-s-yellow-sunny-vibe-cargo-pants-617020-1734005434-1.jpg", brand: "Bewakoof", desc: "Pants" },
        { name: "Women's Black Solid Oversized T-shirt", price: 549, image: "https://images.bewakoof.com/t1080/women-s-black-solid-oversized-t-shirt-617017-1734005374-1.jpg", brand: "Bewakoof", desc: "T-Shirt" },
        { name: "Women's Maroon V-Neck T-shirt", price: 399, image: "https://images.bewakoof.com/t1080/women-s-maroon-v-neck-t-shirt-617018-1734005394-1.jpg", brand: "Bewakoof", desc: "T-Shirt" },
        { name: "Women's Green Forest Graphic Hoodie", price: 949, image: "https://images.bewakoof.com/t1080/women-s-green-forest-graphic-hoodie-617022-1734005474-1.jpg", brand: "Bewakoof", desc: "Hoodie" },
        { name: "Women's Orange Boyfriend T-shirt", price: 429, image: "https://images.bewakoof.com/t1080/women-s-orange-boyfriend-t-shirt-617016-1734005354-1.jpg", brand: "Bewakoof", desc: "T-Shirt" },
        { name: "Women's Peach Sleepy Cat Night Dress", price: 699, image: "https://images.bewakoof.com/t1080/women-s-peach-sleepy-cat-night-dress-617024-1734005514-1.jpg", brand: "Bewakoof", desc: "Nightwear" }
    ],
    children: [
        { name: "Doodle Poodle 100% Cotton Knit Briefs (Pack of 5)", price: 435, image: "https://cdn.fcglcdn.com/fcgms/pdtimg/product/21613721/218x266/1.jpg", brand: "Doodle Poodle", desc: "Innerwear" },
        { name: "Babyhug 100% Cotton Wash Cloth (Pack of 8)", price: 238, image: "https://cdn.fcglcdn.com/fcgms/pdtimg/product/12158558/218x266/1.jpg", brand: "Babyhug", desc: "Essential" },
        { name: "Pine Kids Velcro Closure Mojaris - Brown", price: 621, image: "https://cdn.fcglcdn.com/fcgms/pdtimg/product/20720366/218x266/1.jpg", brand: "Pine Kids", desc: "Footwear" },
        { name: "Mark & Mia Raglan Swimsuit With Cap - Blue", price: 927, image: "https://cdn.fcglcdn.com/fcgms/pdtimg/product/21374847/218x266/1.jpg", brand: "Mark & Mia", desc: "Swimwear" },
        { name: "Kookie Kids Denim Woven Washed Jeans - Blue", price: 484, image: "https://cdn.fcglcdn.com/fcgms/pdtimg/product/21455310/218x266/1.jpg", brand: "Kookie Kids", desc: "Jeans" },
        { name: "Simply Interlock Knit Bloomer (Pack of 3)", price: 204, image: "https://cdn.fcglcdn.com/fcgms/pdtimg/product/22044595/218x266/1.jpg", brand: "Simply", desc: "Innerwear" },
        { name: "Pine Kids Cotton Lycra Cycling Shorts", price: 491, image: "https://cdn.fcglcdn.com/fcgms/pdtimg/product/21496945/218x266/1.jpg", brand: "Pine Kids", desc: "Shorts" },
        { name: "ZOE Wash Cloth 100% Cotton (Set of 8)", price: 126, image: "https://cdn.fcglcdn.com/fcgms/pdtimg/product/3493810/218x266/1.jpg", brand: "ZOE", desc: "Essential" },
        { name: "Babyhug 100% Cotton Wash Cloth (Pack of 8) - Pink", price: 317, image: "https://cdn.fcglcdn.com/fcgms/pdtimg/product/12158556/218x266/1.jpg", brand: "Babyhug", desc: "Essential" },
        { name: "Pine Kids Woven Full Length Jeans - Blue", price: 614, image: "https://cdn.fcglcdn.com/fcgms/pdtimg/product/21455312/218x266/1.jpg", brand: "Pine Kids", desc: "Jeans" }
    ],
    footwear: [
        { name: "Adidas Men VL COURT 3.0 Sneakers", price: 3639, image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/DECEMBER/2/dVahRup7_35efeb452f9648ec88264fa534593898.jpg", brand: "Adidas", desc: "Sneakers" },
        { name: "Adidas Men Breaknet 3.0 IKD Sneakers", price: 3359, image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/NOVEMBER/24/L506UdBv_bb668c559c894de68f89dfd2a8a12bf0.jpg", brand: "Adidas", desc: "Sneakers" },
        { name: "Adidas Men VS PACE 2.0 IKD Sneakers", price: 3000, image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/OCTOBER/6/J2IcPizz_71b9c9f2f96748349c843294d715fc04.jpg", brand: "Adidas", desc: "Sneakers" },
        { name: "Adidas Originals Men SL 72 RS Suede Sneakers", price: 5199, image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/NOVEMBER/11/cCwUVf9S_6b3fd79fab634de7bf36eafc112e12f5.jpg", brand: "Adidas", desc: "Sneakers" },
        { name: "Puma Alfarun Metallic Women Sneaker", price: 2114, image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/21485280/2023/2/28/3d54fd76-f053-4a34-8deb-cab13c4578bb1677575382187PumaWomenAlfarunMetallicStripedSneakers1.jpg", brand: "Puma", desc: "Sneakers" },
        { name: "Puma Smashic Comfort Sneakers", price: 2339, image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/OCTOBER/8/lurnrSfB_5b6fdf2aa3024f32ab635c610d60a690.jpg", brand: "Puma", desc: "Sneakers" },
        { name: "Puma Women SMASH V1 Sneakers", price: 2599, image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/25785616/2023/11/6/723a04fc-a88f-4c4b-81c7-6aa108b404bb1699282001543PUMASMASHV1WomensSneakers1.jpg", brand: "Puma", desc: "Sneakers" },
        { name: "Puma Women Solid Sneakers", price: 2079, image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/19103746/2022/10/20/6beb5702-7a42-4493-8266-6c888ad644a51666266597717-Ivana-Womens-Shoes-271666266597486-1.jpg", brand: "Puma", desc: "Sneakers" }
    ],
    accessories: [
        { name: "Fossil Men Chronograph Watch Black Dial", price: 9096, image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/21670/2023/2/23/e75f393c-fc0d-4bde-9147-3458fea0f42e1677151124075FossilMenBlackDialChronographWatchCH26001.jpg", brand: "Fossil", desc: "Watch" },
        { name: "Fossil Women Analogue Watch Rose Gold", price: 11995, image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/15149286/2023/2/23/2c07303a-2eeb-4b72-a6d1-7b0fd238f7611677148030638FossilWomenRoseGold-TonedEmbellishedAnalogueWatchBQ33771.jpg", brand: "Fossil", desc: "Watch" },
        { name: "Fossil Men Leather Straps Watch Brown", price: 7197, image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/20259260/2024/6/22/58f36f81-243c-4ad4-a552-66e73ff515bd1719038464457FossilMenGreenDialBrownLeatherStrapsAnalogueWatchFS59461.jpg", brand: "Fossil", desc: "Watch" },
        { name: "Fossil Women Bracelet Analogue Watch", price: 13495, image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/27600704/2024/2/14/39df1e95-23ce-4767-b20a-020c0f2e10f11707907101379FossilWomenPrintedDialStainlessSteelBraceletStyleStrapsAnalo1.jpg", brand: "Fossil", desc: "Watch" },
        { name: "Fossil Women Watch Mother of Pearl", price: 13495, image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2063626/2023/12/8/ec0e79c3-1843-4ef3-89f6-1ae4f72bc0a01702013275781FossilWomenCream-ColouredMotherofPearlDialMulticolouredBrace1.jpg", brand: "Fossil", desc: "Watch" }
    ]
};

const generateProducts = () => {
    const products = [];

    // Custom Ultra-Premium "Hero" Products
    const featuredProducts = [
        {
            productName: "L’Aura Essence de Parfum",
            productImage: "/assets/featured/luxury_perfume.png",
            brand: "Maison de Elite",
            description: "A symphony of golden nectar and ethereal oud. The ultimate expression of luxury in a bottle. Limited 2025 release.",
            price: 18500,
            category: "accessories",
            subCategory: "Fragrances",
            productType: "popular",
            seller: "ShopBuzz Elite",
            sellerId: "FEAT-001"
        },
        {
            productName: "Couture Gilded Leather Handbag",
            productImage: "/assets/featured/designer_handbag.png",
            brand: "Vogue Heritage",
            description: "Hand-stitched full-grain Italian leather with carbon fiber internal frame. A masterpiece of structure and grace.",
            price: 42000,
            category: "accessories",
            subCategory: "Leather Goods",
            productType: "popular",
            seller: "ShopBuzz Elite",
            sellerId: "FEAT-002"
        },
        {
            productName: "Hyperion Elite Carbon Sneakers",
            productImage: "/assets/featured/elite_sneakers.png",
            brand: "Soleil Kinetic",
            description: "Aerospace-grade materials meet high-fashion silhouette. The lightest, most advanced sneaker ever crafted.",
            price: 24900,
            category: "footwear",
            subCategory: "Performance",
            productType: "popular",
            seller: "ShopBuzz Elite",
            sellerId: "FEAT-003"
        },
        {
            productName: "The Vintage Aura 2025 Timepiece",
            productImage: "/assets/luxury_watch_feature.png",
            brand: "Aura Chronograph",
            description: "A limited-run masterpiece of heritage movements and celestial design. Precision engineered for the timeless curator.",
            price: 85000,
            category: "accessories",
            subCategory: "Watch",
            productType: "popular",
            seller: "ShopBuzz Elite",
            sellerId: "FEAT-004"
        }
    ];

    products.push(...featuredProducts);

    const types = ['popular', 'bestseller', 'new', 'normal'];

    Object.keys(productData).forEach(cat => {
        productData[cat].forEach((item, i) => {
            products.push({
                productName: item.name,
                productImage: item.image,
                brand: item.brand,
                description: `Premium ${item.desc} from ${item.brand}. Crafted with high-quality materials for superior comfort and style. Perfect for your elevated lifestyle. This ${cat} essential combines a modern aesthetic with reliable performance.`,
                price: item.price,
                category: cat,
                subCategory: i % 2 === 0 ? "Bestsellers" : "New arrivals",
                productType: types[i % types.length],
                seller: "ShopBuzz Elite",
                sellerId: `SB-ELITE-${cat.toUpperCase()}-${i}`
            });
        });
    });

    return products;
};

async function seed() {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(DB);
        console.log("Connected!");

        console.log("Cleaning Products collection...");
        await Product.deleteMany({});
        console.log("Products cleared.");

        const allProducts = generateProducts();
        console.log(`Generating ${allProducts.length} REAL premium products from Bewakoof, Myntra, and FirstCry...`);

        await Product.insertMany(allProducts);

        console.log("\u2728 Database Refreshed with REAL premium fashion data!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seed();
