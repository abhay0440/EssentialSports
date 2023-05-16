import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  
  const updateNews = async () => {
    props.setProgress(10);
    const url = 'http://localhost:3001/rss';
    setLoading(true);
    props.setProgress(30);
  
    try {
      const response = await fetch(url);
      const xmlData = await response.text();
  
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
  
      const items = xmlDoc.getElementsByTagName('item');
      const parsedData = [];
  
      for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName('title')[0].textContent;
        const description = items[i].getElementsByTagName('description')[0].textContent.replace(/<\/?p>/g, "").slice(0,100);
        const mediaContent = items[i].getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'content')[0];
        const imgUrl = mediaContent?.getAttribute('url');
          const url = items[i].getElementsByTagName('link')[0].textContent;
        const author = items[i].getElementsByTagName('author')[0]?.textContent;
        const publishedAt = items[i].getElementsByTagName('pubDate')[0]?.textContent;
        const name = items[i].getElementsByTagName('source')[0]?.getElementsByTagName('name')[0]?.textContent;
  
        parsedData.push({
          title,
          description,
          imgUrl,
          url,
          author,
          publishedAt,
          name,
        });
      }
  
      console.log(parsedData, '====parsedData===');
      props.setProgress(70);
      setArticles(parsedData);
      setTotalResults(parsedData.length);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };
  
  
  
  
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsHub`;
    updateNews();
  }, []);

  return (
    <div>
      <h1 className="text-center" style={{ marginTop: "90px" ,color:"white" }}>
      EssentiallySports - Top Headlines - {capitalizeFirstLetter(props.category)}
      </h1>
      {loading && <Loading />}
      <InfiniteScroll dataLength={articles.length}  hasMore={articles.length !== totalResults} loader={<Loading />}>
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewsItem title={element.title} description={element.description} imgUrl={element.imgUrl} url={element.url} author={element.author} publishedAt={element.publishedAt}  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pagesize: 5,
  category: "genereal",
};
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
