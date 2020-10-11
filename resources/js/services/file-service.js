import http from './http';
export default {
    getAllProducts() {
        return http.get('/get-all-products');
    },
    sendFile(files, productName) {
        return http.uploadFile('/sendfile', files, { productName });
    },
    removeProduct(id) {
        return http.delete(`/remove-product/${id}`)
    }
}