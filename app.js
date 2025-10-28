const express = require('express');
const app = express();
const PORT = 8080;

// Middleware para parsear JSON
app.use(express.json());

// Arrays para almacenar datos en memoria
let products = [];
let carts = [];

// Funciones auxiliares para generar IDs únicos
const generateProductId = () => {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
};

const generateCartId = () => {
    return carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1;
};

// Crear objeto global para compartir datos
global.appData = {
    products,
    carts,
    generateProductId,
    generateCartId
};

// Importar las rutas
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

// Usar las rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        message: 'Servidor funcionando correctamente',
        endpoints: {
            products: '/api/products',
            carts: '/api/carts'
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Actualizar referencia global
global.appData.products = products;
global.appData.carts = carts;