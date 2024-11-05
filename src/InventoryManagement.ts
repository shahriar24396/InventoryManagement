interface Product {
    id: number,
    name: string,
    price: number,
    tags: string[],
    details: [boolean, number]
}

const inventory: Product[] = [];

function addProduct(product: Product): void {
    inventory.push(product);
}

function updateProductPrice(id: number, newPrice: number): void {
    const product = inventory.find(inventoryProduct => inventoryProduct.id === id);

    if (product) {
        product.price = newPrice;
    } else {
        console.log("Product not found.");
    }
}

function listProducts(fields: any[] = []): void {
    inventory.forEach(product => {
        const { id, name, price, tags, details } = product;
        const [inStock, quantity] = details;

        if (fields.length === 0) {
            console.log(`Product ID: ${id}, Name: ${name}, Price: ${price}, Tags: ${tags.join(",")}, In Stock: ${inStock}, Quantity: ${quantity}`);
        } else {
            const displayInfo = fields.map(field => {
                if (field === "id") return `Product ID: ${id}`;
                if (field === "name") return `Name: ${name}`;
                if (field === "price") return `Price: ${price}`;
                if (field === "tags" && tags) return `Tags: ${tags.join(",")}`;
                if (field === "inStock") return `In Stock: ${inStock}`;
                if (field === "quantity") return `Quantity: ${quantity}`;
                return null;
            });

            console.log(displayInfo.join(", "));
        }
    });
}

function searchProductsByTag(tag: string): Product[] {
    return inventory.filter(product => product.tags.includes(tag));
}

// Sample products
const product1: Product = {
    id: 1,
    name: "Wireless Mouse",
    price: 25.99,
    tags: ["electronics", "accessory"],
    details: [true, 50]
};

const product2: Product = {
    id: 2,
    name: "Bluetooth Headphones",
    price: 49.99,
    tags: ["electronics", "audio"],
    details: [true, 30]
};

const product3: Product = {
    id: 3,
    name: "USB-C Cable",
    price: 9.99,
    tags: ["electronics", "cable"],
    details: [true, 100]
};

// Test addProduct function
addProduct(product1);
addProduct(product2);
addProduct(product3);

// Verify that the products were added
listProducts();

// Test updateProductPrice function
updateProductPrice(1, 19.99);
console.log("After price update:");
listProducts();

// Test updateProductPrice function for a product that is not in the inventory
updateProductPrice(5, 19.99);

console.log(searchProductsByTag("electronics"));

console.log(searchProductsByTag("cable"));

listProducts(["name", "tags"]);
