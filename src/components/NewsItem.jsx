import React from "react";

const NewsItem = (props) => {
  const { title, description, url, imgUrl, author, publishedAt, name } = props;
  return (
    <div className="my-4">
      <div className="card" style={{ height: "610px", width: "100%" }}>
        <img src={imgUrl} className="card-img-top news-item-image" alt="..."  style={{ height: "300px", width: "100%" }} />
        <div className="card-body">
          <span className="badge bg-danger">{name}</span>
          <h5 className="card-title">{title}</h5>

          <p className="card-text">{description}</p>
          <a href={url} target="_blank" className="btn btn-primary">
            Read More
          </a>
          <p className="card-text">
            <small className="text-muted">
               updated at {new Date(publishedAt).toGMTString()}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
