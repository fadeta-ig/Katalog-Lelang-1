// Firebase Configuration
const firebaseConfig = {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  apiKey: "AIzaSyBLvY4uhXf81G0lFR0LmpKmZCjajubRpRs",
  authDomain: "katalog-lelang-aset.firebaseapp.com",
  databaseURL: "https://katalog-lelang-aset-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "katalog-lelang-aset",
  storageBucket: "katalog-lelang-aset.firebasestorage.app",
  messagingSenderId: "139807373486",
  appId: "1:139807373486:web:593657b916e56a6db3d53f",
  measurementId: "G-SN9TH94YS2"
};

// Initialize Firebase (loaded from CDN)
let database;
let productsRef;
let settingsRef;

// Initialize Firebase when the script loads
function initFirebase() {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        database = firebase.database();
        productsRef = database.ref('products');
        settingsRef = database.ref('settings');
        console.log('Firebase initialized successfully');
        return true;
    }
    return false;
}

// Firebase Product Management Class
class FirebaseProductManager {
    constructor() {
        this.initialized = false;
        this.init();
    }

    async init() {
        // Wait for Firebase to be available
        let attempts = 0;
        while (!this.initialized && attempts < 50) {
            if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
                this.initialized = true;
                database = firebase.database();
                productsRef = database.ref('products');
                settingsRef = database.ref('settings');

                // Initialize with default data if needed
                await this.initializeDefaultData();
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
    }

    async initializeDefaultData() {
        const snapshot = await productsRef.once('value');
        const data = snapshot.val();

        // If no data exists, add initial data
        if (!data || Object.keys(data).length === 0) {
            const initialData = [
                {
                    type: "Macbook",
                    model: "Macbook Pro 13\" 2017 Grayspace",
                    spec: "Intel Core i5 2,5 GHz | RAM 8GB | SSD 256GB",
                    condition: "Normal",
                    user: "Ex Yunus",
                    pic: "GA (Brankas)",
                    status: "Lelang",
                    priceOriginal: 7200000,
                    priceAuction: 5250000,
                    images: [],
                    created_at: new Date().toISOString()
                },
                {
                    type: "Macbook",
                    model: "Macbook Pro 13\" 2017 Grayspace",
                    spec: "Intel Core i5 2,5 GHz | RAM 8GB | SSD 256GB",
                    condition: "SSD Issue",
                    user: "Febrian (Plan)",
                    pic: "GA (Brankas)",
                    status: "Lelang",
                    priceOriginal: 7682000,
                    priceAuction: 4802000,
                    images: [],
                    created_at: new Date().toISOString()
                },
                {
                    type: "Laptop",
                    model: "Lenovo Ideapad Slim 1 Gray",
                    spec: "AMD Athlon Silver | RAM 8GB | SSD 256GB",
                    condition: "Butuh Install Ulang",
                    user: "Lilin Indah",
                    pic: "Lilin Indah (Used)",
                    status: "Lelang",
                    priceOriginal: 5600000,
                    priceAuction: 2800000,
                    images: [],
                    created_at: new Date().toISOString()
                },
                {
                    type: "Laptop",
                    model: "Lenovo Ideapad Slim 1 Gray",
                    spec: "AMD Athlon Silver | RAM 8GB | SSD 256GB",
                    condition: "Butuh Install Ulang",
                    user: "Ratri Yuliana",
                    pic: "Ratri Yuliana (Used)",
                    status: "Peremajaan",
                    priceOriginal: 5600000,
                    priceAuction: 2800000,
                    images: [],
                    created_at: new Date().toISOString()
                },
                {
                    type: "Laptop",
                    model: "Lenovo Ideapad Slim 1 Gray",
                    spec: "AMD Athlon Silver | RAM 8GB | SSD 256GB",
                    condition: "Butuh Install Ulang",
                    user: "Ricky P",
                    pic: "Ricky P (Used)",
                    status: "Peremajaan",
                    priceOriginal: 5600000,
                    priceAuction: 2800000,
                    images: [],
                    created_at: new Date().toISOString()
                },
                {
                    type: "Laptop",
                    model: "Lenovo Ideapad Slim 1 Gray",
                    spec: "AMD Athlon Silver | RAM 8GB | SSD 256GB",
                    condition: "Keyboard Rusak",
                    user: "Aryo",
                    pic: "GA (Brankas)",
                    status: "Peremajaan",
                    priceOriginal: 5600000,
                    priceAuction: 2800000,
                    images: [],
                    created_at: new Date().toISOString()
                },
                {
                    type: "Laptop",
                    model: "Lenovo Ideapad Slim 1 Gray",
                    spec: "AMD Athlon Silver | RAM 8GB | SSD 256GB",
                    condition: "Butuh Install Ulang",
                    user: "Ex Pak Syahril",
                    pic: "Syahril (Used)",
                    status: "Lelang",
                    priceOriginal: 5600000,
                    priceAuction: 2500000,
                    images: [],
                    created_at: new Date().toISOString()
                },
                {
                    type: "Laptop",
                    model: "Acer Aspire 3 Gray",
                    spec: "AMD Athlon Silver | RAM 12GB | SSD 256GB",
                    condition: "Normal",
                    user: "Aryo",
                    pic: "Aryo (Used)",
                    status: "Lelang",
                    priceOriginal: 3702000,
                    priceAuction: 2082375,
                    images: [],
                    created_at: new Date().toISOString()
                },
                {
                    type: "Laptop",
                    model: "Acer Aspire 3 Gray",
                    spec: "AMD Athlon Silver | RAM 12GB | SSD 256GB",
                    condition: "Normal",
                    user: "Rafel Sutan N",
                    pic: "Rafel Sutan (Used)",
                    status: "Peremajaan",
                    priceOriginal: 3702000,
                    priceAuction: 2082375,
                    images: [],
                    created_at: new Date().toISOString()
                },
                {
                    type: "Laptop",
                    model: "Acer Aspire 3 Gray",
                    spec: "AMD Radeon A4 | RAM 8GB | SSD 256GB",
                    condition: "Body lecet, Normal",
                    user: "Ex Aisyah Qurota",
                    pic: "Admin Marketplace (Used)",
                    status: "Lelang",
                    priceOriginal: 3784000,
                    priceAuction: 2128500,
                    images: [],
                    created_at: new Date().toISOString()
                },
                {
                    type: "Laptop",
                    model: "Thinkpad T460 Black",
                    spec: "Intel Core i5 | RAM 8GB | SSD 256GB",
                    condition: "Baterai Rusak, Trackpad Rusak, LCD Berkedip",
                    user: "Ex Regina",
                    pic: "GA (Brankas)",
                    status: "Lelang",
                    priceOriginal: 3780000,
                    priceAuction: 2205000,
                    images: [],
                    created_at: new Date().toISOString()
                },
                {
                    type: "Laptop",
                    model: "Thinkpad T470 Black",
                    spec: "Intel Core i5 | RAM 8GB | SSD 256GB",
                    condition: "Frame Renggang, Baterai Rusak, Keyboard ada yang hilang",
                    user: "Ex Doni",
                    pic: "GA (Brankas)",
                    status: "Lelang",
                    priceOriginal: 4030000,
                    priceAuction: 2350833,
                    images: [],
                    created_at: new Date().toISOString()
                },
                {
                    type: "Laptop",
                    model: "Thinkpad X270 Black",
                    spec: "Intel Core i5 | RAM 8GB | SSD 256GB",
                    condition: "Baterai Rusak, Butuh Install Ulang",
                    user: "Ex Jihan Luluk",
                    pic: "GA (Brankas)",
                    status: "Lelang",
                    priceOriginal: 3700000,
                    priceAuction: 2158333,
                    images: [],
                    created_at: new Date().toISOString()
                }
            ];

            // Add initial data to Firebase
            initialData.forEach(async (product, index) => {
                await productsRef.child(`product_${index + 1}`).set(product);
            });

            console.log('Initial data loaded to Firebase');
        }
    }

    // Get all products
    async getAllProducts() {
        if (!this.initialized) await this.init();
        const snapshot = await productsRef.once('value');
        const data = snapshot.val();
        return data ? Object.values(data) : [];
    }

    // Get single product
    async getProduct(id) {
        if (!this.initialized) await this.init();
        const snapshot = await productsRef.child(id).once('value');
        return snapshot.val();
    }

    // Add new product
    async addProduct(product) {
        if (!this.initialized) await this.init();
        const newProductRef = productsRef.push();
        const productId = newProductRef.key;
        await newProductRef.set({
            ...product,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
        return productId;
    }

    // Update product
    async updateProduct(id, updates) {
        if (!this.initialized) await this.init();
        await productsRef.child(id).update({
            ...updates,
            updated_at: new Date().toISOString()
        });
        return true;
    }

    // Delete product
    async deleteProduct(id) {
        if (!this.initialized) await this.init();
        await productsRef.child(id).remove();
        return true;
    }

    // Get setting
    async getSetting(key) {
        if (!this.initialized) await this.init();
        const snapshot = await settingsRef.child(key).once('value');
        return snapshot.val();
    }

    // Set setting
    async setSetting(key, value) {
        if (!this.initialized) await this.init();
        await settingsRef.child(key).set(value);
        return true;
    }

    // Listen for real-time updates
    onProductsChanged(callback) {
        if (!this.initialized) {
            setTimeout(() => this.onProductsChanged(callback), 100);
            return;
        }
        productsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            callback(data ? Object.values(data) : []);
        });
    }
}

// Create global instance
const productDB = new FirebaseProductManager();