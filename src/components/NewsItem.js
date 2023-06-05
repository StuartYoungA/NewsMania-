import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {imageUrl,title,description}=this.props;
    return (
      <div className='my-3'>
        
        <div className="card">
        
          <img className="card-img-top" src={imageUrl?imageUrl:"https://png.pngtree.com/template/20220505/ourmid/pngtree-breaking-news-logo-flat-vector-banner-image_1335485.jpg"} alt="Card image cap"/>
          
          <div className="card-body">
          

              <h5 className="card-title">{title?title.slice(0,40)+"...":"NewsMania"}</h5>
              <p className="card-text">{description?description.slice(0,80)+"...":""}</p>
              <a rel="noreferrer" href={this.props.url} target="_blank" className="btn btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
