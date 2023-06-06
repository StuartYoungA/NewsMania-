import React, { Component, useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spin from './Spin';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    // static defaultProps,,   in function based we use News.defaultProps

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

    const [articles, setArticles] = useState([])
    const [Loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalNews, setTotalNews] = useState(0)




    // const str = props.category;
    // const str2 = str.charAt(0).toUpperCase() + str.slice(1);  //this can also give title
    // document.title = str2 + " - NewsMania"


    const updateNews = async () => {
        props.newProgress(10)   //yaha se value is getting passed on parent function
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apikey=${props.akey}&page=${page + 1}`;


        try {
            props.newProgress(30)
            setLoading(true)
            const res = await fetch(url);
            const data = await res.json();
            props.newProgress(70)
            setArticles(data.articles)
            setTotalNews(data.totalResults)
            setLoading(false)

            props.newProgress(100)


        }
        catch (e) {
            console.log("something is not working");
        }
    }


    useEffect(() => {
        document.title = capitalizeFirstLetter(props.category) + " - NewsMania" 
        updateNews()
    }, []);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // handlePrev=async()=>{
    //     let url=`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apikey=${props.key}df94a6d354e746c990dd429b059a963b&pageSize=15&page=${this.state.page-1}`;
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
    //     let url=`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apikey=${props.key}df94a6d354e746c990dd429b059a963b&pageSize=15&page=${this.state.page+1}`;
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
    const fetchMoreData = async () => {

        try {
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apikey=${props.akey}&page=${page + 1}`;
            const res = await fetch(url);
            const data = await res.json();
            setArticles(articles.concat(data.articles))
            setPage(page + 1)

        }
        catch (e) {
            console.log("something is not working");
        }

    }




    return (
        <>

            {/* <div className="container my-2 " > */}
            <h1 className='text-center' style={{marginTop:"65px"}}> NewsMania- Top {(capitalizeFirstLetter(props.category))} Headlines </h1>
            {Loading && <Spin />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalNews}
                loader={<Spin />}
            >
                <div className="container">
                    <div className="row" >
                        {articles.map((element) => {
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

export default News
///note render ke andar state change nhi kr skte, construstor ko hum state intialize krne ke leye use kr rhe