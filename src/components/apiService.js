import imageCompression from "browser-image-compression";

const cloudName = "dickevacs"; // Your Cloudinary cloud name
const apiUrl = "https://batch-master-backend.onrender.com/api/v1/students/create";
const apiIsUserExists = "https://batch-master-backend.onrender.com/api/v1/students/getStudentByEmailId?emailId=";
const apiChangeStatus = "https://batch-master-backend.onrender.com/api/v1/students/changeStatus";

export const uploadImageToCloudinary = async (file) => {
  if (!file) return null;

  const options = {
    maxSizeMB: 0.4, // Max size (400 KB)
    maxWidthOrHeight: 1920, // Max dimensions
    useWebWorker: true, // Use web worker for better performance
  };

  try {
    const compressedFile = await imageCompression(file, options);
    const formDataCloudinary = new FormData();
    formDataCloudinary.append("file", compressedFile);
    formDataCloudinary.append("upload_preset", "cagers-forum");
    formDataCloudinary.append("folder", "student_photos");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formDataCloudinary,
      }
    );
    const data = await response.json();
    if (!response.ok) return null;
    return data.secure_url;
  } catch (error) {
    return null;
  }
};

export const changeStudentStatus = async (studentId) => {
  if (!studentId) return;
  try {
    const response = await fetch(`${apiChangeStatus}?studentId=${studentId}`, {
      method: "POST",
    });
    if (!response.ok) return;
    return await response.json();
  } catch (error) {
  }
};

export const submitFormData = async (formData) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (!response.ok) return null;
    return result;
  } catch (error) {
    return null;
  }
};

export const isUserExists = async (email) => {
  try {
    const response = await fetch(`${apiIsUserExists}${encodeURIComponent(email)}`, {
      method: "GET",
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
};

