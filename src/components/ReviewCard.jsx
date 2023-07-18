import React from "react";
import ReactStars from "react-rating-stars-component";

export default function ReviewCard({ review }) {
  var options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "red",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className="review_card">
      <div className="comment">
      <i class="fa-solid fa-user Usericon"></i>
      <p>{review.name.toUpperCase()}</p>
      </div>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
}
