import axios from "axios";

export const handleUpload = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "portfolio_preset");

    const res = await axios.post("https://api.cloudinary.com/v1_1/dgybllr0w/image/upload", formData);
    return res.data.secure_url;
};


export const handleDelete = async (imageUrl: string) => {
    const publicId = imageUrl.split("/").pop()?.split(".")[0];
    await axios.delete(`https://api.cloudinary.com/v1_1/dgybllr0w/image/destroy`, {
        data: {
            public_id: publicId
        }
    });
};

export const handleUpdate = async (newImage: File) => {
    const imageUrl = await handleUpload(newImage);
    await handleDelete(imageUrl);
    return imageUrl;
};
