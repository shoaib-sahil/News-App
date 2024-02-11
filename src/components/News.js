import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const updateNews = async () => {
    setError(null);
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();

    if (parsedData.status !== "error") {
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      props.setProgress(100);
    } else {
      props.setProgress(0);
      setError("Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - World-News`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container my-3" >
      <h1 style={{ margin: "35px 0px", marginTop: "90px" }}>
        World-News - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      {error && error}
      <InfiniteScroll
        dataLength={articles.length}
        hasMore={articles.length !== totalResults}
      >
        <div className="row">
        {articles.map((element) => {
          return (
            
                <div className="col-md-3">
              <NewsItem
                title={element.title ? element.title.slice(0,45) : ""}
                description={element.description ? element.description.slice(0,88) : ""}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
              </div>
              
            
          );
        })}
        </div>
      </InfiniteScroll>
      </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general"
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
};

export default News;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
