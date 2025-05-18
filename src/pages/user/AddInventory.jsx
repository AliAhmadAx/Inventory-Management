import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const AddInventory = () => {
  const [labels, setLabels] = useState([
    {
      name: "",
      quantity: 1,
      value: "",
      packageImage: null,
      labelPdf: null,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    setLabels((prev) => {
      const updated = [...prev];
      if (name === "packageImage" || name === "labelPdf") {
        updated[index][name] = files[0] || null;
      } else if (name === "quantity") {
        updated[index][name] = Number(value);
      } else {
        updated[index][name] = value;
      }
      return updated;
    });
  };

  const addLabel = () => {
    setLabels((prev) => [
      ...prev,
      { name: "", quantity: 1, value: "", packageImage: null, labelPdf: null },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // For now just log the labels array
      console.log("Submitting labels:", labels);

      // TODO: Replace with API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/user/inventory");
    } catch (err) {
      setError("Failed to add package. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Package</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {labels.map((label, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-md bg-gray-50"
          >
            <h2 className="text-lg font-semibold mb-4">Label #{idx + 1}</h2>

            <Input
              label="Package Name"
              name="name"
              value={label.name}
              onChange={(e) => handleChange(idx, e)}
              required
            />

            <Input
              label="Quantity"
              name="quantity"
              type="number"
              min="1"
              value={label.quantity}
              onChange={(e) => handleChange(idx, e)}
              required
            />

            <Input
              label="Estimated Value ($)"
              name="value"
              type="number"
              step="0.01"
              min="0"
              value={label.value}
              onChange={(e) => handleChange(idx, e)}
              required
            />

            <div className="mt-4">
              <label className="block font-medium mb-1" htmlFor={`packageImage-${idx}`}>
                Package Image (optional)
              </label>
              <input
                id={`packageImage-${idx}`}
                type="file"
                name="packageImage"
                accept="image/*"
                onChange={(e) => handleChange(idx, e)}
              />
            </div>

            <div className="mt-4">
              <label className="block font-medium mb-1" htmlFor={`labelPdf-${idx}`}>
                PDF Label (required)
              </label>
              <input
                id={`labelPdf-${idx}`}
                type="file"
                name="labelPdf"
                accept="application/pdf"
                onChange={(e) => handleChange(idx, e)}
                required
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center">
          <Button type="button" variant="outline" onClick={addLabel}>
            Add Label
          </Button>

          <div className="space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/user/inventory")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Package"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddInventory;
