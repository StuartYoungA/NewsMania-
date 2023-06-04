import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spin from './Spin';

export class News extends Component {
    // static defaultProps

    // let y=67;   inside class data type is not given y=67 is correct directly

    // constructor(){
    //     super();
    //     // console.log("hi")
    //     this. state={
    //         articles : [ ],   //its very imp to initialize with like this
    //         Loading: false,
    //         page:1
    //     }
    //   }
    
    constructor(props){
        super(props);
        // console.log("hi")
        this. state={
            articles : [ ],   //its very imp to initialize with like this
            Loading: false,
            page:1
        }
        const str = this.props.category;
        const str2 = str.charAt(0).toUpperCase() + str.slice(1);
        document.title=str2+" - NewsMania"
      }
    
    async componentDidMount(){
            let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=df94a6d354e746c990dd429b059a963b&pageSize=15`;
            
            // let data=await fetch(url);
            // let parsedData=await data.json()
           
            // this.setState=({articles:parsedData.articles})
            try{    
                this.setState({Loading:true})    
                const res = await fetch(url);
                const data = await res.json();
                this.setState({
                    articles: data.articles,
                    totalNews:data.totalResults,
                    Loading:false
                    
                });
                
            }
            catch(e) {
                console.log("something is not working");
            }

    }

    handlePrev=async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=df94a6d354e746c990dd429b059a963b&pageSize=15&page=${this.state.page-1}`;
        try{ 
            this.setState({Loading:true})           
            const res = await fetch(url);
            const data = await res.json();
            this.setState({
                articles: data.articles,
                page:this.state.page -1,  //we are setting to prev page, because prev button will use that for disabling
                Loading:false
            })
        }
        catch(e) {
            console.log("something is not working");
        }
        
    }
    handleNext=async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=df94a6d354e746c990dd429b059a963b&pageSize=15&page=${this.state.page+1}`;
        try{  
            this.setState({Loading:true})        
            const res = await fetch(url);
            const data = await res.json();
            this.setState({
                articles: data.articles,
                page:this.state.page +1,  //we are setting to next page, because prev and next  button will use that updated state
                Loading:false
            })
        }
        catch(e) {
            console.log("something is not working");
        }
    }
    
    
   
    render() {
        
        return (
            <>
            
            <div className="container my-2 " >
                <h1 className='text-center'>NewsMania- Top {(this.props.category)} Headlines </h1>
                {this.state.Loading&&<Spin/>}
                <div className="row" >
                    {/* here below line means if loading is true then only render spinner component */}
                    
                
                {/* basically we are forming an array similar to article array by using map function of javascript  and from that array named elemnt we are pne by one rendering it */}
                {/* {this.state.articles.map((element)=>{   
                    return <div className="col-md-4 my-2 " key={element.url}>
                    <NewsItem url={element.url}title={element.title} imageUrl={element.urlToImage} description={element.description}  />
                    </div>
                    
                    
                    
                })}  
                </div> */}
                

                {!this.state.Loading&& this.state.articles.map((element)=>{   
                    return <div className="col-md-4 my-2 " key={element.url}>
                    <NewsItem url={element.url}title={element.title} imageUrl={element.urlToImage} description={element.description}  />
                    </div>
                    
                   
                    
                })}  
                </div>    
                
          
           {!this.state.Loading&&<div className="container d-flex justify-content-between">
           <button disabled={this.state.page<=1}type="button" class="btn btn-dark" onClick={this.handlePrev}>	&larr; Prev</button>
           <button disabled={this.state.page>=(Math.ceil(this.state.totalNews/15))}type="button" class="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
           </div>}
           </div>
                

             </>

        )
    }
}

export default News
///note render ke andar state change nhi kr skte, construstor ko hum state intialize krne ke leye use kr rhe