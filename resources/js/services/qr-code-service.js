import http from "../services/http";
export default {
    generate(id) {
        return http.get("qr-generate/" + id);
    }
};
