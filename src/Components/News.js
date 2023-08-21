import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';

export class News extends Component {
 
  static defaultProps = {
    country: 'in',
    pageSize : 8,
    category : 'general'
  }
 
  static propTypes = {
    country: PropTypes.string,
    pageSize: Number,
    category :PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page :1
    };
  }
   
  async updateNews(){

    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4865f21392424a0f837ec077c3924a69&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
     let parsedData = await data.json()
 
     

     this.setState({
        
        articles: parsedData.articles
     })
  }
   async componentDidMount(){
     
         this.updateNews();
   }
    
    handleNext= async ()=>{
      
   
       this.setState({page : this.state.page+1 })
       this.updateNews();
      }
    handlePrev = async ()=> {
      this.setState({page : this.state.page-1 })
       this.updateNews();
    }
  
  render() {
    return (
      <div className="container">
       <h1 className="text-center" style={{margin: '35px 0px'}}>NewsShot-Top Headlines</h1>
     
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title: ""}
                  description={element.description?element.description:""}
                  imageUrl={element.urlToImage?element.urlToImage:""}
                  newsUrl={element.url?element.url:""}
                  source={element.source.name}
                />
              </div>
            );
          })}

        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<1} type="button" className="btn btn-dark" onClick={this.handlePrev}>Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNext}>Next</button>
        </div>
      </div>
    );
  }
}

export default News;
