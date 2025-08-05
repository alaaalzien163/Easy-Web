import React, { useState } from "react";
import { Upload, Save, MapPin, Clock, Phone, Mail, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StoreSettings = () => {
  const [storeData, setStoreData] = useState({
    name: "TechHub Damascus",
    description: "Premium electronics and gaming equipment store in Damascus",
    address: "Damascus, Al-Mazzeh, Technology Street 15",
    phone: "+963 11 123 4567",
    email: "info@techhubdamascus.com",
    openingHours: {
      monday: { open: "09:00", close: "22:00", closed: false },
      tuesday: { open: "09:00", close: "22:00", closed: false },
      wednesday: { open: "09:00", close: "22:00", closed: false },
      thursday: { open: "09:00", close: "22:00", closed: false },
      friday: { open: "09:00", close: "22:00", closed: false },
      saturday: { open: "10:00", close: "23:00", closed: false },
      sunday: { open: "10:00", close: "21:00", closed: false },
    },
    logo: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    categories: ["Electronics", "Gaming", "Accessories", "Software"],
  });

  const [logoPreview, setLogoPreview] = useState(storeData.logo);
  const [coverPreview, setCoverPreview] = useState(storeData.coverImage);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const daysOfWeek = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  const handleInputChange = (field, value) => {
    setStoreData((prev) => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const handleHoursChange = (day, field, value) => {
    setStoreData((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value,
        },
      },
    }));
    setUnsavedChanges(true);
  };

  const handleImageUpload = (type, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        if (type === "logo") {
          setLogoPreview(imageUrl);
          handleInputChange("logo", imageUrl);
        } else {
          setCoverPreview(imageUrl);
          handleInputChange("coverImage", imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {

    console.log("Saving store settings:", storeData);
    setUnsavedChanges(false);
    alert("Store settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Store Settings</h2>
          <p className="text-gray-600">
            Manage your store information and preferences
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={!unsavedChanges}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </Button>
      </div>

      {/* Store Images */}
      <Card>
        <CardHeader>
          <CardTitle>Store Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Logo
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload("logo", e.target.files[0])}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 200x200px, PNG or JPG
                </p>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <div className="space-y-4">
              <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {coverPreview ? (
                  <img
                    src={coverPreview}
                    alt="Cover Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload("cover", e.target.files[0])
                  }
                  className="hidden"
                  id="cover-upload"
                />
                <label
                  htmlFor="cover-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Cover Image
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 800x400px, PNG or JPG
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Name
            </label>
            <Input
              value={storeData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter store name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              value={storeData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your store"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline h-4 w-4 mr-1" />
                Phone Number
              </label>
              <Input
                value={storeData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                Email Address
              </label>
              <Input
                value={storeData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Address
            </label>
            <Textarea
              value={storeData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter store address"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Opening Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Opening Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {daysOfWeek.map((day) => (
              <div key={day.key} className="flex items-center space-x-4">
                <div className="w-24">
                  <span className="text-sm font-medium text-gray-700">
                    {day.label}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={!storeData.openingHours[day.key].closed}
                    onChange={(e) =>
                      handleHoursChange(day.key, "closed", !e.target.checked)
                    }
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">Open</span>
                </div>
                {!storeData.openingHours[day.key].closed && (
                  <>
                    <Input
                      type="time"
                      value={storeData.openingHours[day.key].open}
                      onChange={(e) =>
                        handleHoursChange(day.key, "open", e.target.value)
                      }
                      className="w-32"
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="time"
                      value={storeData.openingHours[day.key].close}
                      onChange={(e) =>
                        handleHoursChange(day.key, "close", e.target.value)
                      }
                      className="w-32"
                    />
                  </>
                )}
                {storeData.openingHours[day.key].closed && (
                  <span className="text-sm text-gray-500 italic">Closed</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Product Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Categories (comma-separated)
            </label>
            <Input
              value={storeData.categories.join(", ")}
              onChange={(e) =>
                handleInputChange(
                  "categories",
                  e.target.value.split(",").map((cat) => cat.trim()),
                )
              }
              placeholder="Electronics, Gaming, Accessories"
            />
            <p className="text-xs text-gray-500">
              Enter the categories of products you sell, separated by commas
            </p>
          </div>
        </CardContent>
      </Card>

      {unsavedChanges && (
        <div className="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg">
          <p className="text-sm text-yellow-800">
            You have unsaved changes. Don't forget to save!
          </p>
        </div>
      )}
    </div>
  );
};

export default StoreSettings;
