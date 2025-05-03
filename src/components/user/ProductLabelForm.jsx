import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ProductLabelForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    trackingNumber: "",
    imageUrl: "",
    quantity: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    deliveryChannel: "",
  });

  const [labels, setLabels] = useState([]);
  const pdfRef = useRef();

  const deliveryChannels = ["Courier", "Postal Service", "In-Person Pickup"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLabel = () => {
    if (!formData.productName || !formData.trackingNumber) {
      alert("Product name and tracking number are required.");
      return;
    }

    setLabels((prev) => [formData, ...prev]);
    setFormData({
      productName: "",
      trackingNumber: "",
      imageUrl: "",
      quantity: "",
      length: "",
      width: "",
      height: "",
      weight: "",
      deliveryChannel: "",
    });
  };

  const generatePDF = async () => {
    const input = pdfRef.current;
    if (!input) return;

    const pdf = new jsPDF();

    const elements = input.querySelectorAll(".pdf-label-card");

    for (let i = 0; i < elements.length; i++) {
      const canvas = await html2canvas(elements[i]);
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (i !== 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save("product-labels.pdf");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      {/* Labels display */}
      {labels.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Added Product Labels</h3>
          {labels.map((label, index) => (
            <div
              key={index}
              className="p-3 border rounded shadow-sm bg-gray-100 flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{label.productName}</p>
                <p className="text-sm">Tracking: {label.trackingNumber}</p>
                <p className="text-sm">Qty: {label.quantity} | {label.weight}kg</p>
                <p className="text-sm">Delivery: {label.deliveryChannel}</p>
              </div>
              {label.imageUrl && (
                <img
                  src={label.imageUrl}
                  alt="Product"
                  className="w-12 h-12 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Product label form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white p-6 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-xl font-semibold">Add Product Label</h2>

        <input
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          name="trackingNumber"
          value={formData.trackingNumber}
          onChange={handleChange}
          placeholder="Tracking Number"
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border border-gray-300 p-2 rounded"
        />

        <input
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Product Quantity"
          className="w-full border border-gray-300 p-2 rounded"
          min="1"
        />

        <div className="grid grid-cols-3 gap-2">
          <input
            name="length"
            value={formData.length}
            onChange={handleChange}
            placeholder="Length (cm)"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            name="width"
            value={formData.width}
            onChange={handleChange}
            placeholder="Width (cm)"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Height (cm)"
            className="border border-gray-300 p-2 rounded"
          />
        </div>

        <input
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
          className="w-full border border-gray-300 p-2 rounded"
        />

        <select
          name="deliveryChannel"
          value={formData.deliveryChannel}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">Select Delivery Channel</option>
          {deliveryChannels.map((channel) => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleAddLabel}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Product Label
        </button>
      </form>

      {/* Send to Manager */}
      {labels.length > 0 && (
        <button
          onClick={generatePDF}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Send to Manager
        </button>
      )}

      {/* Hidden renderable PDF layout */}
      <div ref={pdfRef} className="hidden">
        {labels.map((label, index) => (
          <div
            key={index}
            className="pdf-label-card p-4 border mb-2 w-[600px] mx-auto"
            style={{ fontSize: "12px" }}
          >
            <h3>Product Label</h3>
            <p><strong>Name:</strong> {label.productName}</p>
            <p><strong>Tracking #:</strong> {label.trackingNumber}</p>
            <p><strong>Quantity:</strong> {label.quantity}</p>
            <p><strong>Dimensions:</strong> {label.length} x {label.width} x {label.height} cm</p>
            <p><strong>Weight:</strong> {label.weight} kg</p>
            <p><strong>Delivery:</strong> {label.deliveryChannel}</p>
            {label.imageUrl && (
              <img
                src={label.imageUrl}
                alt="Product"
                style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductLabelForm;
