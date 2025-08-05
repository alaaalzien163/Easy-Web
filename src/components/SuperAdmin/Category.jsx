import React, { useState, useRef } from "react";

const SuperAdminCategory = () => {
  const [categories, setCategories] = useState([
    { name: "Electronics", image: null },
    { name: "Clothing", image: null },
    { name: "Books", image: null },
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editImage, setEditImage] = useState(null);
  const fileInputRef = useRef();

  const handleAdd = () => {
    if (
      newCategory.trim() &&
      !categories.some((c) => c.name === newCategory.trim())
    ) {
      setCategories([
        ...categories,
        { name: newCategory.trim(), image: newImage },
      ]);
      setNewCategory("");
      setNewImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = (cat) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  const handleEdit = (cat) => {
    setEditing(cat.name);
    setEditValue(cat.name);
    setEditImage(cat.image);
  };

  const handleSave = () => {
    setCategories(
      categories.map((c) =>
        c.name === editing ? { name: editValue, image: editImage } : c,
      ),
    );
    setEditing(null);
    setEditValue("");
    setEditImage(null);
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
      <h2 className="text-xl font-bold mb-4">SuperAdmin: Manage Categories</h2>
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
          className="bg-yellow-600 text-white px-4 py-2 rounded"
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
      <ul>
        {categories.map((cat) => (
          <li
            key={cat.name}
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
                    src={editImage}
                    alt="Preview"
                    className="h-10 w-10 object-cover rounded"
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
                      src={cat.image}
                      alt={cat.name}
                      className="h-10 w-10 object-cover rounded"
                    />
                  )}
                  <span>{cat.name}</span>
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
    </div>
  );
};

export default SuperAdminCategory;
