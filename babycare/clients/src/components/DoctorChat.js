import React, { Component } from 'react';
import classes from "../bot.css";
import one from './doctor.jpeg';
import two from './patient.jpeg';
import axios from 'axios';

class DoctorChat extends Component {

  constructor(props){
       super(props);
       this.state={

        idarray:[],

       	friendarray:[
       	],

       	messagearray:[

       	],
        selfobjectarray:[
        ],

       	message:""
       }


     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);
  }

   handleChange=(event)=> {
         this.setState({message: event.target.value});

      }


     handleSubmit = (event) => {
   	 event.preventDefault();


       this.setState({
       messagearray: [...this.state.messagearray,event.target.querySelector('input').value]
})



         event.target.querySelector('input').value =""

         axios.post('https://api.telegram.org/bot707987196:AAERev5cFpWmeT5agS5TzrN79m6Lrh7JoZ0/sendMessage', {
             chat_id:"723810894",
             text:this.state.message
           })
            .then(function (response) {
              console.log(response);

               console.log(response.data.result);


           this.setState({
           selfobjectarray:[...this.state.selfobjectarray,response.data.result]
           })

            console.log(this.state.selfobjectarray);



            })
            .catch(function (error) {
               console.log(error);
             });
        }


      tick = () => {

        fetch("https://api.telegram.org/bot707987196:AAERev5cFpWmeT5agS5TzrN79m6Lrh7JoZ0/getUpdates")
      .then(res => res.json())
      .then(
        (response) => {
          //this.setState({
          // isLoaded: true,
          //   items: result.items
          //  });

          response.result.map((chatmessage)=>{

          var x;
          var i=0;



          if(this.state.idarray.includes(chatmessage.message.message_id)){

          }else{


          this.setState({
          isLoaded: true,
          idarray: [...this.state.idarray,chatmessage.message.message_id],
          friendarray: [...this.state.friendarray,chatmessage.message.text]
          })

          }




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


     componentDidMount() {


     this.interval = setInterval(() => this.tick(), 1000);


  }


     componentWillUnmount() {
            clearInterval(this.interval);
          }


   //  componentDidMount(){

  //     axios.get('https://api.telegram.org/bot732473259:AAFPW9aqOzAuVR120fADJmKxyOMNg2AK0ug/getUpdates')
  //      .then(function (response) {
    // handle success
     //     console.log(response);
      //    console.log(response.data.result[0].message.text);
     //     console.log(response.data.result[1].message.text);

     //     console.log(response.data.result);

        //   response.data.result.map((chatmessage)=>{
        //   this.setState({

        //   messagearray: [...this.state.messagearray,chatmessage.text]
      //     })
      //    })


     //    })
      //  .catch(function (error) {
    // handle error
     //   console.log(error);
    //   })

      //  }


  render() {

    return (
  
  <div className="chatbox">

   <div className="chatheader">

   <div className="row">
    <div className="col-sm-2">
    <img className="headerpic" src={one} alt=""></img>
    <h1 className="name">Doctor</h1>
    </div>
    <div className="col-sm-3"></div>
    <div className="col-sm-7"></div>
   </div>

   </div>


    <div className="chatlogs">


      {this.state.friendarray.map((msg,index)=>{

         return (


      <div className="chat friend" key={index}>
      	 <div className="user-photo"><img src={one} alt=""></img></div>
      	 	<p className="chat-message">
      	 		{msg}
       	 	</p>
       </div>
         	);
      })
      }


      {this.state.messagearray.map((msg,index)=>{

         return (


      <div className="chat self" key={index}>
      	 <div className="user-photo"><img src={two} alt=""></img></div>
      	 	<p className="chat-message">
      	 		{msg}
       	 	</p>
       </div>
         	);
      })
      }




      {/*  <div className="chat self">
      	 <div className="user-photo"><img src={one} alt=""></img></div>
      	 	<p className="chat-message">
      	 		whats up bro
      	 	</p>
      </div>  */}

  </div>

     <form className="chat-form" onSubmit={this.handleSubmit}>
     	<input onChange={this.handleChange} style={{borderColor: "#FD"+6+"E"+1+"B"}}></input>
     	<button type="submit" style={{position:"relative",fontSize:24+"px"}}>Send</button>
     </form>
  </div>


         );

  }
}

export default DoctorChat;
