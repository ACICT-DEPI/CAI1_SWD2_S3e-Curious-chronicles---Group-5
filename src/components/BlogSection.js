import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { excerpt } from "../utility"; // Importing the excerpt function
import { Link } from "react-router-dom";

const BlogSection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  userId,
  author,
  timestamp,
  user,
  handleDelete,
}) => {
  return (
    <div>
      <div className="row pb-4" key={id}>
        <div className="col-md-5">
          <div className="hover-blogs-img">
            <div className="blogs-img">
              <img src={imgUrl} alt={title} />
              <div></div>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="text-start">
            <h6 className="category catg-color">{category}</h6>
            <span className="title py-2">{title}</span>
            <span className="meta-info">
              <p className="author">{author}</p> -&nbsp;
              {timestamp.toDate().toDateString()}
            </span>
          </div>
          
          {/* Using dangerouslySetInnerHTML with excerpt limited to 25 words */}
          <div
            className="short-description text-start"
            dangerouslySetInnerHTML={{ __html: excerpt(description, 25) }}  // Render the excerpt (25 words)
          />

          <Link to={`/detail/${id}`}>
            <button className="btn btn-read">Read More</button>
          </Link>
          {user && user.uid === userId && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                style={{
                  fontSize: "18px",
                  marginRight: "10px",
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={() => handleDelete(id)}
              />
              <Link to={`/update/${id}`}>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{
                    fontSize: "18px",
                    cursor: "pointer",
                    color: "green",
                  }}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
