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

  const handleScan = (result: string | { text: string } | null) => {
    if (result) {
      let extractedText = '';
  
      // Check if result is an object with a 'text' property or a string
      if (typeof result === 'string') {
        extractedText = result.trim(); 
      } else if (result.text) {
        extractedText = result.text.trim(); 
      }
  
      console.log("Scanned QR Code Text: ", extractedText); 
  
      // Set the extracted text as barcode
      setScannedData(extractedText); 
      setBarcode(extractedText);
      checkBarcode(extractedText); 
    }
  };


  const handleError = (error: Error) => {
    console.warn("QR Scanner Error: ", error.message);
    setCameraError(true); // Handle missing or inaccessible camera
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcode(e.target.value); // Update the barcode state manually
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value, 10) || 1); // Update quantity state
  };

  const checkBarcode = async (query: string) => {
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
          setModalData(data[0]); // Use the first matching product
          setModalOpen(true); // Open the modal
        } else {
          alert("Product not found!");
        }
      } else {
        alert("Failed to fetch product information.");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = () => {
    checkBarcode(barcode); // Check the barcode when manually submitted
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
      console.error("Error adding to cart:", error);
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
      console.error("Error adding to favorites:", error);
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
    <div id="qrcode">
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
            {modalData.image && (
              <img
                src={modalData.image}
                alt={modalData.name}
                className="product-image-unique"
              />
            )}
            <div className="modal-details-unique">
              <h2>
                {modalData.name}
              </h2>
              <h2>
                <strong>{modalData.price} TL</strong> 
              </h2>
              <p>
                <strong>Stock:</strong> {modalData.stock}
              </p>
              <p>
                <strong>Barcode:</strong> {modalData.barcode}
              </p>
                <div className="quantity-section">
                    <label className="quantity-input"><strong>Quantity:</strong> </label>
                    <input className="quantity-input-area"
                      id="quantity-input"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                </div>
                <button  onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
                <button onClick={handleAddToFavorites} className="remove-from-favorites-button">
                  Add To Favorites
                </button>
              </div>
              
            </div>
          </div>
      )}
    </div>
  </div>
  );
};

export default QRcode;
