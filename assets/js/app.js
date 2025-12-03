// Global JavaScript utilities and functions

// Utility functions
const App = {
    // Format currency to Rupiah
    formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number || 0);
    },

    // Format date to Indonesian format
    formatDate(dateString) {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    },

    // Format date with time
    formatDateTime(dateString) {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Copy text to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    },

    // Show notification
    showNotification(message, type = 'success', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 z-50 transform translate-x-full transition-transform duration-300`;
        notification.innerHTML = `
            <div class="bg-${type === 'error' ? 'red' : 'green'}-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
                <i class="fa-solid fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Remove after duration
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    },

    // Show loading spinner
    showLoading(element, message = 'Loading...') {
        element.innerHTML = `
            <div class="flex items-center justify-center p-8">
                <div class="loading-spinner mr-3"></div>
                <span>${message}</span>
            </div>
        `;
    },

    // Hide loading spinner
    hideLoading(element, content = '') {
        element.innerHTML = content;
    },

    // Validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Validate phone number (Indonesia format)
    validatePhone(phone) {
        const re = /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1,13}$/;
        return re.test(phone);
    },

    // Create modal
    createModal(options = {}) {
        const {
            title = 'Modal',
            content = '',
            size = 'md',
            showClose = true,
            backdrop = true
        } = options;

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 hidden';
        modal.id = 'modal-' + App.generateId();

        const sizeClasses = {
            sm: 'max-w-sm',
            md: 'max-w-2xl',
            lg: 'max-w-4xl',
            xl: 'max-w-6xl',
            full: 'max-w-full mx-4'
        };

        modal.innerHTML = `
            ${backdrop ? '<div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onclick="App.closeModal(\'' + modal.id + '\')"></div>' : ''}
            <div class="flex min-h-full items-center justify-center p-4">
                <div class="relative bg-white rounded-xl shadow-xl transition-all ${sizeClasses[size]} w-full">
                    ${showClose ? `
                        <button onclick="App.closeModal('${modal.id}')" class="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition">
                            <i class="fa-solid fa-times text-gray-600"></i>
                        </button>
                    ` : ''}
                    ${title ? `
                        <div class="px-6 py-4 border-b">
                            <h3 class="text-lg font-semibold text-gray-900">${title}</h3>
                        </div>
                    ` : ''}
                    <div class="px-6 py-4">
                        ${content}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Show modal
        setTimeout(() => {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }, 100);

        return modal;
    },

    // Close modal
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    },

    // Create confirm dialog
    confirm(message, title = 'Konfirmasi') {
        return new Promise((resolve) => {
            const modal = App.createModal({
                title: title,
                size: 'sm',
                backdrop: true
            });

            modal.querySelector('.px-6.py-4:last-child').innerHTML = `
                <p class="text-gray-600 mb-4">${message}</p>
                <div class="flex justify-end gap-3">
                    <button onclick="App.closeModal('${modal.id}')" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                        Batal
                    </button>
                    <button onclick="
                        App.closeModal('${modal.id}');
                        resolve(true);
                    " class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                        Hapus
                    </button>
                </div>
            `;
        });
    },

    // Local storage utilities
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('LocalStorage set error:', e);
                return false;
            }
        },

        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.error('LocalStorage get error:', e);
                return defaultValue;
            }
        },

        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('LocalStorage remove error:', e);
                return false;
            }
        },

        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                console.error('LocalStorage clear error:', e);
                return false;
            }
        }
    },

    // Session storage utilities
    session: {
        set(key, value) {
            try {
                sessionStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('SessionStorage set error:', e);
                return false;
            }
        },

        get(key, defaultValue = null) {
            try {
                const item = sessionStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.error('SessionStorage get error:', e);
                return defaultValue;
            }
        },

        remove(key) {
            try {
                sessionStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('SessionStorage remove error:', e);
                return false;
            }
        }
    },

    // Image utilities
    image: {
        // Compress image
        compress(file, quality = 0.8, maxWidth = 1920, maxHeight = 1080) {
            return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();

                img.onload = () => {
                    // Calculate new dimensions
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = (maxWidth / width) * height;
                        width = maxWidth;
                    }

                    if (height > maxHeight) {
                        width = (maxHeight / height) * width;
                        height = maxHeight;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    // Draw and compress
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob(resolve, 'image/jpeg', quality);
                };

                img.src = URL.createObjectURL(file);
            });
        },

        // Get file info
        getInfo(file) {
            return {
                name: file.name,
                size: file.size,
                sizeFormatted: App.formatFileSize(file.size),
                type: file.type,
                lastModified: new Date(file.lastModified)
            };
        },

        // Format file size
        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        // Validate image file
        validate(file, maxSize = 2 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']) {
            const errors = [];

            if (!allowedTypes.includes(file.type)) {
                errors.push('Tipe file tidak didukung. Gunakan JPG, PNG, atau GIF.');
            }

            if (file.size > maxSize) {
                errors.push(`Ukuran file terlalu besar. Maksimal ${App.formatFileSize(maxSize)}.`);
            }

            return {
                valid: errors.length === 0,
                errors: errors
            };
        }
    },

    // Format file size
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // WhatsApp utility
    whatsapp: {
        send(phone, message) {
            // Remove all non-digits and add country code if not present
            let cleanPhone = phone.replace(/\D/g, '');
            if (!cleanPhone.startsWith('62')) {
                cleanPhone = '62' + cleanPhone;
            }

            const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        }
    },

    // Initialize app
    init() {
        // Set global error handler
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            App.showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
        });

        // Set global unhandled rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            App.showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
        });

        // Initialize tooltips if any
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'absolute z-50 px-2 py-1 bg-gray-900 text-white text-sm rounded shadow-lg';
                tooltip.textContent = e.target.getAttribute('data-tooltip');

                const rect = e.target.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';

                document.body.appendChild(tooltip);
                e.target.tooltip = tooltip;
            });

            element.addEventListener('mouseleave', (e) => {
                if (e.target.tooltip) {
                    document.body.removeChild(e.target.tooltip);
                }
            });
        });
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export for use in other modules
window.App = App;