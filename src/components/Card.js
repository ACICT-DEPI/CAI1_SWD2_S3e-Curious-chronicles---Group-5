import React from "react";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";

const Card = ({ title, description, imgUrl, id, likes, comments }) => {
  return (
    <div className="col-sm-6 col-lg-4 mb-5">
      <div className="related-content card text-decoration-none overflow-hidden h-100">
        <img className="related-img card-img-top" src={imgUrl} alt={title} />
        <div className="related-body card-body p-4">
          <h5 className="title text-start py-2">{title}</h5>

          {/* Using dangerouslySetInnerHTML with truncated description */}
          <div
            className="short-description text-start"
            dangerouslySetInnerHTML={{ __html: excerpt(description, 25) }} // Truncated HTML description
          />

          <div className="d-flex justify-content-between">
            <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
              <span className="text-primary">Read More</span>
            </Link>
            <div>
              <i className="bi bi-hand-thumbs-up m-2" />
              {likes.length}
              <i className="bi bi-chat-left m-2" />
              {comments.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
