import React,{useState} from "react";
import './component.css';
import FeedbackList from './feedback-list';
import { globalContext } from "../helper/globalContext";

export default function Feedback(){
    // Getting Data in User Context
    const datas = React.useContext(globalContext)

    // Static rating values
    const rating = [1,2,3,4,5,6,7,8,9,10]

    // State management for user feedback
    const [feed,setFeed]=useState({count:'',message:''})

    // Getting user given feedback information
    const ratedValue=(val,e)=>{
        e.preventDefault()
        if(feed.count!==''){
            for(let i=0;i<rating.length;i++){
                if(val<=i){
                    var element1 = document.getElementsByClassName('rate-btn')[i]
                    element1.classList.remove('active')
                }                
            }
        }
        setFeed(prevState => ({
            ...prevState,
            count: val
        }));
        for(let i=0;i<val;i++){
            var element = document.getElementsByClassName('rate-btn')[i]
            element.classList.add('active')
        }
    }

    // Storing feedback in context array
    const submitClick=(e)=>{
        e.preventDefault()
        datas.addFeedback(feed)
        setFeed((prevState)=>({...prevState,count:'',message:''}))
        for(let i=0;i<rating.length;i++){
                var element1 = document.getElementsByClassName('rate-btn')[i]
                element1.classList.remove('active')                         
        }
    }
    return(
        <>
            <div className="container">
                <div className="row feed-box">
                    <div className="col-md-8">
                        <h1 className="head">Feedback</h1>
                        <form>
                            <div className="rating mt-4">
                                <label className="rate-head mt-2">Rating</label>
                                <span> 
                                    <fieldset className="values mt-1">                                  
                                        {rating.map((val,index)=><h3 key={index} className="rate-btn btn btn-secondary btn-sm px-3 mx-1 mt-2" onClick={(e)=>ratedValue(val,e)}>{val}</h3>)} 
                                    </fieldset>                                         
                                </span>
                                <label className="rate-head mt-2 mb-2">Message</label>
                                <textarea className='form-control' value={feed.message} onChange={(e)=>{setFeed((previousState)=>({...previousState,message:e.target.value}))}}  />
                                <br />
                                <button disabled={feed.count===''|| feed.message===''} className="sub-btn btn btn-primary" onClick={submitClick}>SUBMIT</button>
                            </div>
                        </form>                        
                    </div>
                    <div>
                        <FeedbackList></FeedbackList>
                    </div>
                </div>
            </div>
        </>
    )
}