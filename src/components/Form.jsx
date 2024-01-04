// // src/components/Form.js
// import { useState } from "react";

// const Form = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobile: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: Implement form submission to MongoDB
//     console.log("Form submitted:", formData);
//   };

//   return (
//     <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
//       <div className="mb-4">
//         <label
//           htmlFor="firstName"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           First Name<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           id="firstName"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label
//           htmlFor="lastName"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           Last Name<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           id="lastName"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label
//           htmlFor="email"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           Email<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label
//           htmlFor="mobile"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           Mobile<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="tel"
//           id="mobile"
//           name="mobile"
//           value={formData.mobile}
//           onChange={handleChange}
//           pattern="[0-9]{10}"
//           className="w-full p-2 border rounded-md"
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default Form;

// src/components/Form.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
  });

  const [formDataList, setFormDataList] = useState([]);
  console.log('formDataList:', formDataList);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const backendURL = 'http://localhost:3005/users';
      await axios.post(backendURL, formData);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
      });

      // After successful submission, fetch and update the data list
      fetchData();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const fetchData = async () => {
    try {
      // Fetch the registered data from the server
      const response = await axios.get('http://localhost:3005/get/users');
      console.log('Response data:', response.data);
      setFormDataList(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Delete data based on ID
      await axios.delete(`http://localhost:3005/users/${id}`);

      // After successful deletion, fetch and update the data list
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEdit = (data) => {
    // Set the form data for editing
    setFormData(data);
  };

  return (
    <div>
      <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
      <div className="mb-4">
         <label
           htmlFor="firstName"
           className="block text-gray-700 text-sm font-bold mb-2"
         >
         First Name<span className="text-red-500">*</span>
         </label>
         <input
           type="text"
           id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
           className="w-full p-2 border rounded-md"
           required
         />
       </div>

       <div className="mb-4">
         <label
           htmlFor="lastName"
           className="block text-gray-700 text-sm font-bold mb-2"
         >
           Last Name<span className="text-red-500">*</span>
         </label>
         <input
           type="text"
          id="lastName"
           name="lastName"
           value={formData.lastName}
           onChange={handleChange}
           className="w-full p-2 border rounded-md"
           required
         />
       </div>

      <div className="mb-4">
         <label
           htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="mobile"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Mobile<span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          pattern="[0-9]{10}"
           className="w-full p-2 border rounded-md"
          required
         />
       </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>

      <h2 className="text-xl font-bold mt-4">Registered Data</h2>
      <ul>
        {formDataList.map((data) => (
          <li key={data._id}>
            {data.firstName} {data.lastName} - {data.email} - {data.mobile}
            <button onClick={() => handleDelete(data._id)} className="ml-2 text-red-500">
              Delete
            </button>
            <button onClick={() => handleEdit(data)} className="ml-2 text-blue-500">
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
