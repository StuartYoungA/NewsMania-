import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spin from './Spin';
import InfiniteScroll from 'react-infinite-scroll-component';

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

    constructor(props) {
        super(props);
        // console.log("hi")
        this.state = {
            articles: [],   //its very imp to initialize with like this
            Loading: true,
            page: 1,
            totalNews:0
        }
        const str = this.props.category;
        const str2 = str.charAt(0).toUpperCase() + str.slice(1);
        document.title = str2 + " - NewsMania"
    }

    async componentDidMount() {
        this.props.newProgress(10)   //yaha se value is getting passed on parent function
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=${this.props.akey}&page=${this.state.page+1}`;

        // let data=await fetch(url);
        // let parsedData=await data.json()

        // this.setState=({articles:parsedData.articles})
        try {
            this.props.newProgress(30)
            const res = await fetch(url);
            const data = await res.json();
            this.props.newProgress(70)
            this.setState({
                articles: data.articles,
                totalNews: data.totalResults,
                Loading: false

            });
            this.props.newProgress(100)

        }
        catch (e) {
            console.log("something is not working");
        }

    }

    // handlePrev=async()=>{
    //     let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=${this.props.key}df94a6d354e746c990dd429b059a963b&pageSize=15&page=${this.state.page-1}`;
    //     try{ 
    //         this.setState({Loading:true})           
    //         const res = await fetch(url);
    //         const data = await res.json();
    //         this.setState({
    //             articles: data.articles,
    //             page:this.state.page -1,  //we are setting to prev page, because prev button will use that for disabling
    //             Loading:false
    //         })
    //     }
    //     catch(e) {
    //         console.log("something is not working");
    //     }

    // }
    // handleNext=async()=>{
    //     let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=${this.props.key}df94a6d354e746c990dd429b059a963b&pageSize=15&page=${this.state.page+1}`;
    //     try{  
    //         this.setState({Loading:true})        
    //         const res = await fetch(url);
    //         const data = await res.json();
    //         this.setState({
    //             articles: data.articles,
    //             page:this.state.page +1,  //we are setting to next page, because prev and next  button will use that updated state
    //             Loading:false
    //         })
    //     }
    //     catch(e) {
    //         console.log("something is not working");
    //     }
    // }
    fetchMoreData = async () => {
        // this.setState({
        //     page: this.state.page + 1

        // })
        try {
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=${this.props.akey}&page=${this.state.page+1}`;
            const res = await fetch(url);
            const data = await res.json();
            this.setState({
                articles: this.state.articles.concat(data.articles),
                // totalNews: data.totalResults,
                page:this.state.page +1
                // Loading: false

            });

        }
        catch (e) {
            console.log("something is not working");
        }

    }


    render() {

        return (
            <>

                {/* <div className="container my-2 " > */}
                <h1 className='text-center'>NewsMania- Top {(this.props.category)} Headlines </h1>
                {/* {this.state.Loading && <Spin />} */}
                
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalNews}
                    loader={<Spin />}
                >
                    <div className="container">
                        <div className="row" >
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-2 " key={element.url}>
                                        
                                    <NewsItem url={element.url} title={element.title} imageUrl={element.urlToImage} description={element.description} />
                                </div>



                            })}
                        </div>
                    </div>

                </InfiniteScroll>


                {/* {!this.state.Loading&&<div className="container d-flex justify-content-between">
           <button disabled={this.state.page<=1}type="button" class="btn btn-dark" onClick={this.handlePrev}>	&larr; Prev</button>
           <button disabled={this.state.page>=(Math.ceil(this.state.totalNews/15))}type="button" class="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
           </div>} */}

                {/* </div> */}


            </>

        )
    }
}

export default News
///note render ke andar state change nhi kr skte, construstor ko hum state intialize krne ke leye use kr rhe