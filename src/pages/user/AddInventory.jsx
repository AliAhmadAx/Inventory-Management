import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
// import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const AddInventory = () => {
  const [packages, setPackages] = useState([
    { name: "", quantity: 1, value: "", image: null, pdf: null },
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    setPackages((prev) =>
      prev.map((pkg, i) =>
        i === index ? { ...pkg, [name]: files ? files[0] : value } : pkg
      )
    );
  };

  const addLabel = () => {
    setPackages([
      ...packages,
      { name: "", quantity: 1, value: "", image: null, pdf: null },
    ]);
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let textContent = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      textContent += strings.join(" ") + "\n";
    }
    return textContent;
  };

  const mergePDFs = async (pdfFiles) => {
    const mergedPdf = await PDFDocument.create();

    for (const file of pdfFiles) {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "merged-labels.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const allTexts = [];
      const pdfFiles = [];

      for (const pkg of packages) {
        if (!pkg.pdf) continue;
        const text = await extractTextFromPDF(pkg.pdf);
        allTexts.push({ name: pkg.name, text });
        pdfFiles.push(pkg.pdf);
      }

      console.log("Extracted Text:", allTexts);

      await mergePDFs(pdfFiles);
    } catch (error) {
      console.error("Error processing PDFs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Add Inventory Package</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {packages.map((pkg, index) => (
          <div key={index} className="space-y-4 p-4 border rounded bg-gray-50">
            <Input
              label="Package Name"
              name="name"
              value={pkg.name}
              onChange={(e) => handleChange(index, e)}
              required
            />

            <Input
              label="Quantity"
              name="quantity"
              type="number"
              min="1"
              value={pkg.quantity}
              onChange={(e) => handleChange(index, e)}
              required
            />

            <Input
              label="Estimated Value ($)"
              name="value"
              type="number"
              step="0.01"
              value={pkg.value}
              onChange={(e) => handleChange(index, e)}
              required
            />

            <Input
              label="Package Image (optional)"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(index, e)}
            />

            <Input
              label="Label PDF (required)"
              name="pdf"
              type="file"
              accept="application/pdf"
              onChange={(e) => handleChange(index, e)}
              required
            />
          </div>
        ))}

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={addLabel}>
            + Add Label
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Save Packages"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddInventory;
