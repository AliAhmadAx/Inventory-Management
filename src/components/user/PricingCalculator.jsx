import { useState } from "react";
import Button from "../ui/Button";

const sizePrices = {
  Small: { base: 5, perItem: 0.5 },
  Medium: { base: 10, perItem: 1 },
  Large: { base: 15, perItem: 1.5 },
  "Extra Large": { base: 25, perItem: 2 },
};

const PricingCalculator = () => {
  const [size, setSize] = useState("Medium");
  const [quantity, setQuantity] = useState(1);
  const [duration, setDuration] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(null);

  const calculatePrice = () => {
    const { base, perItem } = sizePrices[size];
    const price = (base + perItem * quantity) * duration;
    setCalculatedPrice(price.toFixed(2));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium mb-4">Storage Pricing Calculator</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Size
          </label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.keys(sizePrices).map((sizeOption) => (
              <option key={sizeOption} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (months)
            </label>
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <Button onClick={calculatePrice} className="w-full">
          Calculate Price
        </Button>

        {calculatedPrice && (
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-center">
              Estimated cost:{" "}
              <span className="font-bold">${calculatedPrice}</span>
              <br />
              <span className="text-sm text-gray-600">
                ({quantity} {size} items for {duration} month
                {duration > 1 ? "s" : ""})
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingCalculator;
