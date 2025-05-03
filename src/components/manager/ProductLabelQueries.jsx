import { useEffect, useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import { jsPDF } from "jspdf";




const ProductLabelQueries = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    // TODO: Replace with real API
    const mockQueries = [
        {
          id: "query-1",
          user: { name: "Ali Ahmad", email: "ali@example.com" },
          submittedAt: "2025-05-03T15:30:00Z",
          productLabels: [
            { name: "Product A", sku: "SKU-001", quantity: 10, description: "Test label A" },
            { name: "Product B", sku: "SKU-002", quantity: 5, description: "Test label B" },
          ],
        },
      ];
    setQueries(mockQueries);
  }, []);

  const generatePDF = (query) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Product Labels", 14, 20);
  
    doc.setFontSize(12);
    doc.text(`Submitted by: ${query.user.name}`, 14, 30);
    doc.text(`Email: ${query.user.email}`, 14, 38);
    doc.text(`Submitted at: ${new Date(query.submittedAt).toLocaleString()}`, 14, 46);
  
    const startY = 60;
    let y = startY;
  
    query.productLabels.forEach((label, index) => {
      doc.setFont(undefined, "bold");
      doc.text(`Label #${index + 1}`, 14, y);
      doc.setFont(undefined, "normal");
      y += 8;
      doc.text(`Name: ${label.name}`, 14, y);
      y += 6;
      doc.text(`SKU: ${label.sku}`, 14, y);
      y += 6;
      doc.text(`Quantity: ${label.quantity}`, 14, y);
      y += 6;
      doc.text(`Description: ${label.description}`, 14, y);
      y += 12;
  
      // Auto-paginate if needed
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
  
    doc.save(`product-labels-${query.user.name.replace(/\s+/g, "-").toLowerCase()}.pdf`);
  };
  

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Product Label Requests</h2>
      {queries.length === 0 ? (
        <p className="text-gray-500">No label queries found.</p>
      ) : (
        <ul className="space-y-4">
          {queries.map((query) => (
            <li key={query.id} className="border p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">
                    {query.user.name} ({query.user.email})
                  </p>
                  <p className="text-sm text-gray-500">
                    Submitted on {new Date(query.submittedAt).toLocaleString()}
                  </p>
                </div>
                <a href={query.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm" onClick={() => generatePDF(query)} className="flex items-center gap-2">
  <ArrowDownTrayIcon className="h-4 w-4" />
  Download PDF
</Button>
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductLabelQueries;
