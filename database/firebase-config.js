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

// Auto-initialize Firebase when config loads
if (typeof firebase !== 'undefined') {
    // Wait a bit to ensure Firebase is fully loaded
    setTimeout(() => {
        initFirebase();
    }, 100);
}

// Firebase Product Management Class
class FirebaseProductManager {
    constructor() {
        this.initialized = false;
        this.database = null;
        this.productsRef = null;
        this.settingsRef = null;
        this.init();
    }

    async init() {
        // Wait for Firebase to be available
        let attempts = 0;
        while (!this.initialized && attempts < 100) {
            try {
                if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
                    this.initialized = true;
                    this.database = firebase.database();
                    this.productsRef = this.database.ref('products');
                    this.settingsRef = this.database.ref('settings');

                    console.log('FirebaseProductManager: Database initialized successfully');

                    // Initialize with default data if needed
                    await this.initializeDefaultData();
                    return true;
                }
            } catch (error) {
                console.error('FirebaseProductManager: Error during init:', error);
            }
            await new Promise(resolve => setTimeout(resolve, 50));
            attempts++;
        }

        if (!this.initialized) {
            console.error('FirebaseProductManager: Failed to initialize after 100 attempts');
            throw new Error('Firebase initialization failed');
        }
    }

    async initializeDefaultData() {
        // No automatic data initialization
        // All data should be added through admin panel only
        console.log('Firebase initialized - no automatic data loading');
    }

    // Get all products
    async getAllProducts() {
        if (!this.initialized) await this.init();
        const snapshot = await this.productsRef.once('value');
        const data = snapshot.val();

        if (!data) return [];

        // Convert object to array and include Firebase ID
        return Object.entries(data).map(([key, value]) => ({
            ...value,
            firebaseId: key
        }));
    }

    // Get single product
    async getProduct(id) {
        if (!this.initialized) await this.init();
        const snapshot = await this.productsRef.child(id).once('value');
        return snapshot.val();
    }

    // Add new product
    async addProduct(product) {
        try {
            console.log('FirebaseProductManager: Adding product:', product);

            if (!this.initialized) {
                console.log('FirebaseProductManager: Not initialized, initializing...');
                await this.init();
            }

            if (!this.productsRef) {
                throw new Error('productsRef is undefined');
            }

            console.log('FirebaseProductManager: productsRef available, creating new product...');
            const newProductRef = this.productsRef.push();
            const productId = newProductRef.key;

            console.log('FirebaseProductManager: Setting product data with ID:', productId);
            await newProductRef.set({
                ...product,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });

            console.log('FirebaseProductManager: Product added successfully with ID:', productId);
            return productId;
        } catch (error) {
            console.error('FirebaseProductManager: Error adding product:', error);
            throw error;
        }
    }

    // Update product
    async updateProduct(id, updates) {
        if (!this.initialized) await this.init();
        await this.productsRef.child(id).update({
            ...updates,
            updated_at: new Date().toISOString()
        });
        return true;
    }

    // Delete product
    async deleteProduct(id) {
        if (!this.initialized) await this.init();
        await this.productsRef.child(id).remove();
        return true;
    }

    // Get setting
    async getSetting(key) {
        if (!this.initialized) await this.init();
        const snapshot = await this.settingsRef.child(key).once('value');
        return snapshot.val();
    }

    // Set setting
    async setSetting(key, value) {
        if (!this.initialized) await this.init();
        await this.settingsRef.child(key).set(value);
        return true;
    }

    // Listen for real-time updates
    onProductsChanged(callback) {
        if (!this.initialized) {
            setTimeout(() => this.onProductsChanged(callback), 100);
            return;
        }
        this.productsRef.on('value', (snapshot) => {
            const data = snapshot.val();

            if (!data) {
                callback([]);
                return;
            }

            // Convert object to array and include Firebase ID
            const products = Object.entries(data).map(([key, value]) => ({
                ...value,
                firebaseId: key
            }));
            callback(products);
        });
    }
}

// Create global instance
const productDB = new FirebaseProductManager();