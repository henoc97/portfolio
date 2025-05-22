import axios from "axios";
import { data } from "react-router-dom";

const uploadPDF = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio_preset");
    formData.append("resource_type", "raw"); // important pour PDF !

    const response = await axios.post("https://api.cloudinary.com/v1_1/dgybllr0w/raw/upload", formData);
    return response.data.secure_url;

};
