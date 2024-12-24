import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import "./QRcode.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const QRcode: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [barcode, setBarcode] = useState<string>(""); // For manual input
  const [scannedData, setScannedData] = useState<string | null>(null); // For scanned QR code
  const [modalData, setModalData] = useState<any | null>(null); // Data to show in the modal
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [cameraError, setCameraError] = useState(false); // To handle camera absence
  const [quantity, setQuantity] = useState<number>(1); // For quantity input

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleScan = (result: string | null) => {
    if (result) {
      setScannedData(result);
    }
  };

  const handleError = (error: Error) => {
    console.warn("QR Scanner Error: ", error.message);
    setCameraError(true); // Handle missing or inaccessible camera
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcode(e.target.value); // Update the barcode state
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value, 10) || 1); // Update quantity state
  };

  const handleSubmit = async () => {
    const query = scannedData || barcode;
    if (!query) {
      alert("Please enter or scan a barcode!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/product/products/?search=${query}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setModalData(data[0]);
          setModalOpen(true);
        } else {
          alert("Product not found!");
        }
      } else {
        alert("Failed to fetch product information.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  const handleAddToCart = async () => {
    if (!modalData || !modalData.id) {
      alert("Invalid product data.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not logged in.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: modalData.id,
          quantity,
          token,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Product added to cart successfully.");
      } else {
        alert(data.error || "Failed to add product to cart.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  const handleAddToFavorites = async () => {
    if (!modalData || !modalData.id) {
      alert("Invalid product data.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not logged in.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/like-product/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: modalData.id,
          token,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Action completed successfully.");
      } else {
        alert(data.error || "Failed to update favorite status.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div className="qr-wrapper-unique">
      <div className="qr-container-unique">
        <Header toggleSidebar={toggleSidebar} />
        <h1 className="qr-title-unique">QR Code Scanner</h1>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        {!cameraError && (
          <div className="qr-reader-unique">
            <QrScanner
              delay={300}
              style={previewStyle}
              onScan={handleScan}
              onError={handleError}
            />
          </div>
        )}
        {cameraError && (
          <p className="error-message-unique">
            Camera not available. Please use manual entry.
          </p>
        )}
        <div className="qr-manual-input-unique">
          <label htmlFor="barcode-input">Enter Barcode Manually:</label>
          <input
            id="barcode-input"
            type="text"
            placeholder="Enter barcode here"
            value={barcode}
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className="qr-output-unique">
          {scannedData ? (
            <p>Scanned Data: {scannedData}</p>
          ) : (
            <p>No data available yet.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && modalData && (
        <div className="modal-overlay-unique">
          <div className="modal-unique">
            <button className="close-button-unique" onClick={closeModal}>
              ×
            </button>
            <h2>Product Information</h2>
            {modalData.image && (
              <img
                src={modalData.image}
                alt={modalData.name}
                className="product-image-unique"
              />
            )}
            <p>
              <strong>Name:</strong> {modalData.name}
            </p>
            <p>
              <strong>Price:</strong> {modalData.price} TL
            </p>
            <p>
              <strong>Stock:</strong> {modalData.stock}
            </p>
            <p>
              <strong>Barcode:</strong> {modalData.barcode}
            </p>
            <div>
              <label htmlFor="quantity-input">Quantity:</label>
              <input
                id="quantity-input"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button onClick={handleAddToCart}>Add to Cart</button>
              <button onClick={handleAddToFavorites}>Add to Favorites</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRcode;
