import axios from 'axios';
// axios.defaults.baseURL = apiUrl.API_URL;
axios.defaults.headers.common = {
    "X-Requested-With": "XMLHttpRequest",
    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
};
console.log(axios.defaults.headers);
export default {
    get(url) {
        return axios.get(url);
    },
    post(url, data) {
        return axios.post(url, data);
    },
    delete(url) {
        return axios.delete(url);
    },
    uploadFile(url, files, data) {
        let formData = new FormData();
        for (let i = 0; i < files.length; i++)
            formData.append("files[" + i + "]", files[i]);
        for (let p in data) {
            formData.append(p, data[p]);
        }
        return axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
}