import React, { useState, useEffect } from "react";
import { apiService } from "../services/api";
import "./HairRegrowthCard.css";

// Import stage images
import mildMenImage from "../assets/mild_men.webp";
import advanceMenImage from "../assets/advance_men.webp";
import advancePlusMenImage from "../assets/advance_plus_men.webp";
import mildWomenImage from "../assets/women_mild.webp";
import advanceWomenImage from "../assets/women_advance.webp";
import advancePlusWomenImage from "../assets/women_advance_plus.webp";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  rating: number;
  description: string;
}

interface HairLossStage {
  id: string;
  name: string;
  image: string;
  symptoms: string;
  solution: string;
}

const HairRegrowthCard: React.FC = () => {
  const [gender, setGender] = useState<"men" | "women">("men");
  const [selectedStage, setSelectedStage] = useState("mild");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"symptoms" | "solution">(
    "symptoms"
  );

  const hairLossStages: HairLossStage[] = [
    {
      id: "mild",
      name: "MILD",
      image: gender === "men" ? mildMenImage : mildWomenImage,
      symptoms:
        'In Mild Stage, you lose between 50-100 strands a day with no visible hairline recession yet. This is the "control stage". You can easily reverse your hair loss with proper care and products.',
      solution:
        "Use gentle hair care products, maintain a healthy diet, and consider hair growth supplements.",
    },
    {
      id: "advance",
      name: "ADVANCE",
      image: gender === "men" ? advanceMenImage : advanceWomenImage,
      symptoms:
        "In Advance Stage, you experience noticeable hair thinning at temples and crown with increased daily hair fall.",
      solution:
        "Use targeted hair growth serums, DHT blockers, and consult a dermatologist for personalized treatment.",
    },
    {
      id: "advance-plus",
      name: "ADVANCE PLUS",
      image: gender === "men" ? advancePlusMenImage : advancePlusWomenImage,
      symptoms:
        "In Advance Plus Stage, you have extensive hair loss with large bald areas requiring intensive treatment.",
      solution:
        "Consider medical treatments, hair transplant consultation, and comprehensive hair care regimen.",
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, [gender, selectedStage]);



  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await apiService.getHairProducts({
        plt: 2,
        st: 42,
      });

      // mapping data as per required formate
      if (data.results && data.results.variants) {
        const mappedProducts = data.results.variants.map((variant) => ({
          id: variant.id,
          name: variant.spName || "Hair Growth Product",
          image: variant.m_img?.m_link || "https://via.placeholder.com/200x150",
          price: variant.vrnt_lp || 0,
          discount: variant.discount || 0,
          rating: variant.rating || 0,
          description:
            variant.supp_info || "Hair growth supplement",
        }));
        setProducts(mappedProducts);
        // console.log(mappedProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to fetch products. Please try again later.";
      setError(errorMessage);

      // Ading Fallback data
      setProducts([
        {
          id: 1,
          name: "Hair Product",
          image: "https://via.placeholder.com/200x150",
          price: 999,
          discount: 15,
          rating: 4.5,
          description: "Good  for hair growth",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const currentStage = hairLossStages.find(
    (stage) => stage.id === selectedStage
  );

  return (
    <div className="hair-regrowth-card">
      <div className="card-header">
        <h1 className="card-title">
          {gender === "men" ? "Men's" : "Women's"} Hair Regrowth Solution Kit
        </h1>

        <div className="gender-toggle">
          <div className="gender-icons">
            <div
              className={`gender-icon ${gender === "men" ? "active" : ""}`}
              onClick={() => setGender("men")}
            >
              <span className="icon">👨</span>
              <span className="label">Men</span>
            </div>
            <div
              className={`gender-icon ${gender === "women" ? "active" : ""}`}
              onClick={() => setGender("women")}
            >
              <span className="icon">👩</span>
              <span className="label">Women</span>
            </div>
          </div>
          <button className="switch-button">
            Switch for {gender === "men" ? "women" : "men"} →
          </button>
        </div>
      </div>

      <div className="card-content">
        <div className="stages-sidebar">
          <div className="stages-header">
            <h3>Hair Loss Stages</h3>
            <p>Select your current stage</p>
          </div>
          {hairLossStages.map((stage) => (
            <div
              key={stage.id}
              className={`stage-item ${
                selectedStage === stage.id ? "active" : ""
              }`}
              onClick={() => setSelectedStage(stage.id)}
            >
              <div className="stage-image-container">
                <img
                  src={stage.image}
                  alt={`${stage.name} stage hair loss`}
                  className="stage-image"
                />
                {selectedStage === stage.id && (
                  <div className="stage-selected-indicator">
                    <span>✓</span>
                  </div>
                )}
              </div>
              <span className="stage-name">{stage.name}</span>
            </div>
          ))}
        </div>

        <div className="product-content">
          <div className="product-image-container">
            {loading ? (
              <div className="loading-spinner">Loading...</div>
            ) : error ? (
              <div className="error-message">
                <p>{error}</p>
                <button onClick={fetchProducts} className="retry-button">
                  Retry
                </button>
              </div>
            ) : (
              <img
                src={
                  products[0]?.image || "https://via.placeholder.com/200x150"
                }
                alt="Hair Growth Products"
                className="product-image"
              />
            )}
          </div>

          <div className="product-info">
            <h3 className="recommended-title">Recommended Product</h3>
            <h4 className="product-name">
              {loading
                ? "Loading..."
                : products[0]?.name ||
                  "Hair Multivitamin | Headful Growth Serum"}
            </h4>

            <div className="info-tabs">
              <div
                onClick={() => setActiveTab("symptoms")}
                className={`tab ${activeTab === "symptoms" ? "active" : ""}`}
              >
                Symptoms
              </div>
              <div
                onClick={() => setActiveTab("solution")}
                className={`tab ${activeTab === "solution" ? "active" : ""}`}
              >
                Solution
              </div>
            </div>
            <div className="tab-content">
              {activeTab === "symptoms" ? (
                <div className="symptoms-content">
                  <p className="stage-description">
                    <strong>{currentStage?.name} Stage:</strong>{" "}
                    {currentStage?.symptoms}
                  </p>
                  <button className="read-more">Read More</button>
                </div>
              ) : (
                <div className="solution-content">
                  <p className="stage-description">
                    <strong>{currentStage?.name} Stage Solution:</strong>{" "}
                    {currentStage?.solution}
                  </p>
                  <button className="read-more">Learn More</button>
                </div>
              )}
            </div>

            <div className="action-buttons">
              <button className="btn btn-secondary">ADD TO CART</button>
              <button className="btn btn-primary">BUY NOW</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HairRegrowthCard;
