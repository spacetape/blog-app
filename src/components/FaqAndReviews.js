// FaqAndReviews.js
import React from "react";
import Header from "./Header";
import "../css/faq.css";

const FaqAndReviews = () => {
  return (
    <>
      <Header />
      <div className="faq-and-reviews-container">
        <div className="faq-section">
          <h1 className="page-title">FAQs</h1>
          {/* Add FAQ items as needed */}
          <div className="faq-item">
            <h2>Q: How can I access the web app?</h2>
            <p>A: You can access the web app through our official website.</p>
          </div>
          <div className="faq-item">
            <h2>Q: Is the web app available on mobile devices?</h2>
            <p>
              A: Yes, our web app is accessible on both iOS and Android devices
              through a browser.
            </p>
          </div>
          <div className="faq-item">
            <h2>Q: Can I use the web app offline?</h2>
            <p>
              A: Yes, some features of the web app are available offline. Please
              check the app settings for more information.
            </p>
          </div>
        </div>

        <hr />

        <div className="reviews-section">
          <h1 className="page-title">Magazine Reviews</h1>
          {/* Add fake reviews as needed */}
          <div className="review-capsule-full">
            <h2>Forbes</h2>
            <p>
              "A revolutionary website application that has changed the way we
              approach productivity."
            </p>
            <p className="rating">
              <span className="rating-number">9/10</span>
            </p>
          </div>

          <div className="review-capsule-small">
            <h2>CNN</h2>
            <p>
              "A must-have for anyone looking to stay organized and efficient."
            </p>
            <p className="rating">
              <span className="rating-number">8/10</span>
            </p>
          </div>

          <div className="review-capsule-medium">
            <h2>Euronews</h2>
            <p>
              "This web app by Alimkhan from IT2-2116 that brings a new level of
              productivity to your daily tasks."
            </p>
            <p className="rating">
              <span className="rating-number">10/10</span>
            </p>
          </div>

          <div className="review-capsule-small">
            <h2>The New York Times</h2>
            <p>
              "Effortlessly manage your tasks and boost your productivity with
              this website application. Give him a good exam mark!"
            </p>
            <p className="rating">
              <span className="rating-number">9/10</span>
            </p>
          </div>

          <button className="send-review-button">
            Write Us Your Personal Review
          </button>
        </div>
      </div>
    </>
  );
};

export default FaqAndReviews;
