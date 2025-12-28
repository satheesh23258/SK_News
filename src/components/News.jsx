import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 6,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
      loading: false,
      error: null,
    };
  }

  fetchNews = async () => {
    this.setState({ loading: true, error: null });

    const { country, category, pageSize } = this.props;
    const { page } = this.state;

    const url = `https://corsproxy.io/?https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=748d105a27ca446c842ebad05822233b&page=${page}&pageSize=${pageSize}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== "ok") {
        this.setState({ loading: false, error: data.message });
        return;
      }

      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: "Network error. Try again later.",
      });
    }
  };

  componentDidMount() {
    this.fetchNews();
  }

  handleNext = () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState(
        (prev) => ({ page: prev.page + 1 }),
        this.fetchNews
      );
    }
  };

  handlePrevious = () => {
    if (this.state.page > 1) {
      this.setState(
        (prev) => ({ page: prev.page - 1 }),
        this.fetchNews
      );
    }
  };

  render() {
    return (
      <>
        <h2 className="text-center text-danger my-3">
          Live News – {this.props.category.toUpperCase()}
        </h2>

        {this.state.loading && <Spinner />}
        {this.state.error && <p className="text-center text-danger">{this.state.error}</p>}

        <div className="container">
          <div className="row">
            {!this.state.loading &&
              !this.state.error &&
              this.state.articles.map((article) => (
                <div className="col-md-4 my-3" key={article.url}>
                  <Newsitems
                    title={article.title}
                    description={article.description}
                    url={article.urlToImage}
                    linkUrl={article.url}
                    author={article.author || "Unknown"}
                    date={article.publishedAt}
                    source={article.source?.name || "News"}
                  />
                </div>
              ))}
          </div>

          <div className="d-flex justify-content-between my-4">
            <button
              disabled={this.state.page <= 1}
              className="btn btn-danger"
              onClick={this.handlePrevious}
            >
              « Previous
            </button>

            <button
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
              className="btn btn-danger"
              onClick={this.handleNext}
            >
              Next »
            </button>
          </div>
        </div>
      </>
    );
  }
}
