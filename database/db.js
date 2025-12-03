// Database Configuration and Management
class ProductDatabase {
    constructor() {
        this.dbName = 'KatalogLelangDB';
        this.dbVersion = 1;
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = (event) => {
                console.error('Database error:', event.target.error);
                reject(event.target.error);
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('Database initialized successfully');
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create products store
                if (!db.objectStoreNames.contains('products')) {
                    const productStore = db.createObjectStore('products', {
                        keyPath: 'id',
                        autoIncrement: true
                    });

                    // Create indexes
                    productStore.createIndex('type', 'type', { unique: false });
                    productStore.createIndex('model', 'model', { unique: false });
                    productStore.createIndex('status', 'status', { unique: false });
                    productStore.createIndex('created_at', 'created_at', { unique: false });
                }

                // Create settings store
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings', { keyPath: 'key' });
                }

                // Initialize with default data if empty
                this.initDefaultData(db);
            };
        });
    }

    async initDefaultData(db) {
        const transaction = db.transaction(['products'], 'readwrite');
        const store = transaction.objectStore('products');

        // Check if store is empty
        const getAllRequest = store.getAll();
        getAllRequest.onsuccess = () => {
            if (getAllRequest.result.length === 0) {
                // Add initial data
                const initialData = [
                    {
                        id: 1,
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
                        id: 2,
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
                        id: 3,
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
                        id: 4,
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
                        id: 5,
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
                        id: 6,
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
                        id: 7,
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
                        id: 8,
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
                        id: 9,
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
                        id: 10,
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
                        id: 11,
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
                        id: 12,
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
                        id: 13,
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

                initialData.forEach(item => {
                    store.add(item);
                });
            }
        };
    }

    // Product CRUD Operations
    async getAllProducts() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['products'], 'readonly');
            const store = transaction.objectStore('products');
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getProduct(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['products'], 'readonly');
            const store = transaction.objectStore('products');
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async addProduct(product) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['products'], 'readwrite');
            const store = transaction.objectStore('products');

            // Get next ID
            const getAllRequest = store.getAll();
            getAllRequest.onsuccess = () => {
                const existingProducts = getAllRequest.result;
                let nextId = 1;

                if (existingProducts.length > 0) {
                    // Find the highest existing ID
                    const maxId = Math.max(...existingProducts.map(p => p.id || 0));
                    nextId = maxId + 1;
                }

                const request = store.add({
                    ...product,
                    id: nextId,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                });

                request.onsuccess = () => resolve(nextId);
                request.onerror = () => reject(request.error);
            };

            getAllRequest.onerror = () => reject(getAllRequest.error);
        });
    }

    async updateProduct(id, updates) {
        return new Promise(async (resolve, reject) => {
            try {
                const product = await this.getProduct(id);
                if (!product) {
                    reject(new Error('Product not found'));
                    return;
                }

                const transaction = this.db.transaction(['products'], 'readwrite');
                const store = transaction.objectStore('products');

                const updatedProduct = {
                    ...product,
                    ...updates,
                    id: id,
                    updated_at: new Date().toISOString()
                };

                const request = store.put(updatedProduct);
                request.onsuccess = () => resolve(updatedProduct);
                request.onerror = () => reject(request.error);
            } catch (error) {
                reject(error);
            }
        });
    }

    async deleteProduct(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['products'], 'readwrite');
            const store = transaction.objectStore('products');
            const request = store.delete(id);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

    // Settings Operations
    async getSetting(key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['settings'], 'readonly');
            const store = transaction.objectStore('settings');
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result ? request.result.value : null);
            request.onerror = () => reject(request.error);
        });
    }

    async setSetting(key, value) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['settings'], 'readwrite');
            const store = transaction.objectStore('settings');
            const request = store.put({ key, value });

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }
}

// Initialize database instance
const productDB = new ProductDatabase();