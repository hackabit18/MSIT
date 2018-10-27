import React, { Component } from 'react';
import axios from 'axios';

class Articles extends Component {

  constructor(props){
  	super(props);
  	this.state={

  		articles:[],
  	}

  }

   news = () => {

        fetch("https://newsapi.org/v2/everything?q=vaccination&apiKey=416a9d5b39a249978e8438b3df63f958")
      .then(res => res.json())
      .then(
        (response) => {
          console.log(response);
          //this.setState({
          // isLoaded: true,
          //   items: result.items
          //  });

          response.articles.map((article)=>{

           this.setState({
          isLoaded: true,
          articles: [...this.state.articles,article]
          })





          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )


    }




   componentDidMount(){

     this.news();

   }



  render() {
    return (
      <div className="Articles">

         <ul>

            {



               this.state.articles.map((x,index)=>{

               	console.log(x);


                return(

                  <div>
                          <img src={x.urlToImage} />
                          <div className="details">
                            <h1>{x.title}</h1>
                            <h3>By - {x.source.name}</h3>
                            <p key={x.source.id}>{x.content}</p>
                            <a href={x.url}>Read Full Article at :- <br/>{x.url}</a>
                            <br/>
                          </div><br/>
                        </div>


               	);


            	})









            }


         </ul>



      </div>
    );
  }
}

export default Articles;
