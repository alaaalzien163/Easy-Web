import React, { useState, useRef, useEffect } from "react";


const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editImage, setEditImage] = useState(null);
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Fetch categories from backend
  const fetchCategories = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      console.log("Fetching categories from API...");
      const response = await fetch("http://localhost:8000/api/user/view_categories");
      console.log("Categories API Response Status:", response.status);
      
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      console.log("Categories API Raw Data:", data);
      console.log("Categories API Data Type:", typeof data);
      
      // Handle both array and object response formats
      let categoriesArray = [];
      if (Array.isArray(data)) {
        categoriesArray = data;
      } else if (data && Array.isArray(data.categories)) {
        categoriesArray = data.categories;
      } else if (data && Array.isArray(data.data)) {
        categoriesArray = data.data;
      } else if (data && typeof data === 'object') {
        // If it's an object, try to extract categories from common fields
        categoriesArray = data.categories || data.data || data.items || [];
      }
      
      console.log("Processed Categories Array:", categoriesArray);
      setCategories(categoriesArray);
      
      if (categoriesArray.length === 0) {
        console.log("No categories found - this might be normal if no categories have been created yet");
      }
    } catch (error) {
      console.error("Categories API Error:", error);
      setFetchError(error.message || "Error fetching categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!newCategory.trim()) {
      alert("Please enter a category name.");
      return;
    }
    if (!fileInputRef.current || !fileInputRef.current.files[0]) {
      alert("Please select an image.");
      return;
    }

    try {
      const token = "18|u0nf2yvQFM8FNYg6SQ1aSn233tB8tfhd4z0RXo2C2278efc1";
      const formData = new FormData();
      const imageFile = fileInputRef.current.files[0];

      // Ensure proper field names and data types
      formData.append("category_name", newCategory.trim());
      formData.append("image", imageFile, imageFile.name);

      // Debug logging
      console.log("Sending data:");
      console.log("Category name (as category_name):", newCategory.trim());
      console.log("Image file:", imageFile);
      console.log("Image file name:", imageFile.name);
      console.log("Image file type:", imageFile.type);
      console.log("Image file size:", imageFile.size);

      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await fetch(
        "http://127.0.0.1:8000/api/admin/create_category",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type header - let browser set it with boundary for FormData
          },
          body: formData,
        },
      );

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries()),
      );

      // Get response text first to handle both JSON and non-JSON responses
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (!response.ok) {
        let errorMsg = `Failed to add category (${response.status})`;
        try {
          const errorData = JSON.parse(responseText);
          console.log("Error response data:", errorData);
          if (errorData && errorData.message) {
            errorMsg = errorData.message;
          }
          if (errorData && errorData.errors) {
            console.log("Validation errors:", errorData.errors);
            errorMsg +=
              " - Validation errors: " + JSON.stringify(errorData.errors);
          }
        } catch (parseError) {
          console.log("Could not parse error response as JSON:", parseError);
          errorMsg += " - Raw response: " + responseText;
        }
        throw new Error(errorMsg);
      }

      let successData;
      try {
        successData = JSON.parse(responseText);
      } catch (parseError) {
        console.log("Response is not JSON, treating as success:", responseText);
        successData = { message: "Category added successfully" };
      }

      console.log("Success response:", successData);
      alert("Category added successfully!");
      await fetchCategories(); // Refresh categories from backend
    } catch (error) {
      console.error("Full error:", error);
      alert(error.message || "Error adding category");
    }

    setNewCategory("");
    setNewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = (cat) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  const handleEdit = (cat) => {
    setEditing(cat.name);
    setEditValue(cat.name);
    setEditImage(cat.image);
  };

  const handleSave = async () => {
    if (!editValue.trim()) {
      alert("Please enter a category name.");
      return;
    }

    try {
      const token = "18|u0nf2yvQFM8FNYg6SQ1aSn233tB8tfhd4z0RXo2C2278efc1";
      const formData = new FormData();
      
      // Add category name
      formData.append("category_name", editValue.trim());
      
      // Add image if a new one is selected
      if (editImage && editImage !== editing?.image) {
        // If editImage is a File object (from file input)
        if (editImage instanceof File) {
          formData.append("image", editImage, editImage.name);
        }
        // If editImage is a base64 string (from preview)
        else if (typeof editImage === 'string' && editImage.startsWith('data:')) {
          // Convert base64 to blob
          const response = await fetch(editImage);
          const blob = await response.blob();
          formData.append("image", blob, "image.jpg");
        }
      }

      // Find the category being edited to get its ID
      const categoryToEdit = categories.find(cat => cat.name === editing);
      if (!categoryToEdit || !categoryToEdit.id) {
        throw new Error("Category ID not found");
      }

      console.log("Updating category with ID:", categoryToEdit.id);
      console.log("New category name:", editValue.trim());
      console.log("Has new image:", editImage && editImage !== editing?.image);
      console.log("Edit image type:", editImage ? typeof editImage : 'none');
      console.log("Edit image value:", editImage);

      // Debug FormData contents
      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/categories/${categoryToEdit.id}/update_cat`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      console.log("Update response status:", response.status);
      console.log("Update response headers:", Object.fromEntries(response.headers.entries()));
      
      // Get response text first to handle both JSON and non-JSON responses
      const responseText = await response.text();
      console.log("Raw update response:", responseText);
      
      if (!response.ok) {
        let errorMsg = `Failed to update category (${response.status})`;
        try {
          const errorData = JSON.parse(responseText);
          console.log("Update error response data:", errorData);
          if (errorData && errorData.message) {
            errorMsg = errorData.message;
          }
          if (errorData && errorData.errors) {
            console.log("Update validation errors:", errorData.errors);
            errorMsg += " - Validation errors: " + JSON.stringify(errorData.errors);
          }
        } catch (parseError) {
          console.log("Could not parse update error response as JSON:", parseError);
          errorMsg += " - Raw response: " + responseText;
        }
        throw new Error(errorMsg);
      }

      let successData;
      try {
        successData = JSON.parse(responseText);
      } catch (parseError) {
        console.log("Update response is not JSON, treating as success:", responseText);
        successData = { message: "Category updated successfully" };
      }

      console.log("Update success response:", successData);

      // Update the categories list with the new data
      setCategories(prevCategories => 
        prevCategories.map(cat => 
          cat.name === editing 
            ? { 
                ...cat, 
                name: editValue.trim(),
                image: editImage && editImage !== editing?.image ? editImage : cat.image
              }
            : cat
        )
      );

      alert("Category updated successfully!");
      setEditing(null);
      setEditValue("");
      setEditImage(null);
    } catch (error) {
      console.error("Update category error:", error);
      alert(error.message || "Error updating category");
    }
  };

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin: Manage Categories</h2>

      <div className="flex mb-4 gap-2 items-center">
        <input
          className="border p-2 flex-1"
          placeholder="Add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => handleImageChange(e, setNewImage)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      {newImage && (
        <div className="mb-4">
          <img
            src={newImage}
            alt="Preview"
            className="h-16 w-16 object-cover rounded"
          />
        </div>
      )}

      {fetchError && (
        <div className="text-red-500 mb-4">Error: {fetchError}</div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-500">Loading categories...</span>
          </div>
        </div>
      ) : (
        <>
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500 mb-4">
                <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-600">Create your first category using the form above</p>
              </div>
            </div>
          ) : (
            <ul>
              {categories.map((cat, index) => (
                <li
                  key={cat.name || index}
                  className="flex justify-between items-center border-b py-2 gap-2"
                >
                  {editing === cat.name ? (
                    <>
                      <input
                        className="border p-1 mr-2"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, setEditImage)}
                      />
                      {editImage && (
                        <img
                          src={typeof editImage === 'string' && editImage.startsWith('data:') ? editImage : 
                               editImage.startsWith('http') ? editImage : `http://127.0.0.1:8000${editImage}`}
                          alt="Preview"
                          className="h-10 w-10 object-cover rounded"
                          onError={(e) => {
                            console.log("Edit image failed to load:", editImage);
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      <button className="text-green-600 mr-2" onClick={handleSave}>
                        Save
                      </button>
                      <button
                        className="text-gray-600"
                        onClick={() => setEditing(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        {cat.image && (
                          <img
                            src={cat.image.startsWith('http') ? cat.image : `http://127.0.0.1:8000${cat.image}`}
                            alt={cat.name}
                            className="h-10 w-10 object-cover rounded"
                            onError={(e) => {
                              console.log("Image failed to load:", cat.image);
                              e.target.style.display = 'none';
                            }}
                            onLoad={(e) => {
                              console.log("Image loaded successfully:", cat.image);
                            }}
                          />
                        )}
                        <span>{cat.name || 'Unnamed Category'}</span>
                      </div>
                      <div>
                        <button
                          className="text-blue-600 mr-2"
                          onClick={() => handleEdit(cat)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600"
                          onClick={() => handleDelete(cat)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default AdminCategory;
