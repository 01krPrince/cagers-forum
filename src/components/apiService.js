// apiService.js

import imageCompression from 'browser-image-compression';

const cloudName = 'dickevacs'; // Your Cloudinary cloud name
const apiUrl = 'https://batch-master-backend.onrender.com/api/v1/students/create';

export const uploadImageToCloudinary = async (file) => {
  if (!file) {
    throw new Error("No file selected for upload");
  }

  // Compress the image
  const options = {
    maxSizeMB: 0.4, // Maximum size in MB (400 KB)
    maxWidthOrHeight: 1920, // Maximum width or height
    useWebWorker: true, // Use web worker for better performance
  };

  try {
    const compressedFile = await imageCompression(file, options);
    const formDataCloudinary = new FormData();
    formDataCloudinary.append('file', compressedFile);
    formDataCloudinary.append('upload_preset', 'cagers-forum'); // Your upload preset
    formDataCloudinary.append('folder', 'student_photos'); // Specify the folder name here

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formDataCloudinary,
    });

    const data = await response.json();
    if (data.secure_url) {
        console.log(data.secure_url)
      return data.secure_url; // Return the image URL
    } else {
      throw new Error("Error uploading image: " + JSON.stringify(data));
    }
  } catch (error) {
    throw new Error("Error uploading image: " + error.message);
  }
};


export const submitFormData = async (formData) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
  
      // Check for user already exists error
      if (response.status === 400 && result.error && result.error.includes("already exists")) {
        throw new Error("A student with this email already exists.");
      }
  
      // Check for other errors
      if (result.error) {
        throw new Error(result.error);
      }
  
      return result; // Return the result if no errors
    } catch (error) {
      throw new Error('Error submitting form data: ' + error.message);
    }
  };