import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

const EditInventory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 1,
    size: "Small",
    category: "",
    value: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Replace with API call
      console.log("Submitting:", formData);
      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/user/inventory");
    } catch (err) {
      setError("Failed to add inventory. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Inventory</h1>
        <p className="text-gray-600">
          Fill in the details of your inventory item
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Item Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          as="textarea"
          rows={3}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Quantity"
            name="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <Select
            label="Size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            options={[
              { value: "Small", label: "Small" },
              { value: "Medium", label: "Medium" },
              { value: "Large", label: "Large" },
              { value: "Extra Large", label: "Extra Large" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />

          <Input
            label="Estimated Value ($)"
            name="value"
            type="number"
            step="0.01"
            min="0"
            value={formData.value}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/user/inventory")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Inventory"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditInventory;
