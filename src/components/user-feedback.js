import React,{useState,useEffect} from "react";
import './component.css';
import FeedbackList from './feedback-list';
import { globalContext } from "../helper/globalContext";
import { base_url } from "../helper/Constants";

export default function Feedback(){
    // Getting Data in User Context
    const contextData = React.useContext(globalContext)

    // Static rating values ★★★★★★★★★★
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

    // getting all data from json server
    const getAllData=async()=>{
        await fetch(base_url).then((res)=>res.json()).then((data)=>contextData.allFeedback(data));
    }

    // updating data using useEffect life cycle hook
    useEffect(()=>{
            getAllData();
    },[feed])

    // Storing feedback in context array
    const submitClick=(e)=>{
        e.preventDefault();
        contextData.addFeedback(feed)
        reset(e);
    }

    // reset the feedback form
    const reset=(e)=>{
        e.preventDefault();
        setFeed((prevState)=>({...prevState,count:'',message:''}))
        for(let i=0;i<rating.length;i++){
                var element1 = document.getElementsByClassName('rate-btn')[i]
                element1.classList.remove('active')                         
        }
    }
    return(
        <React.Fragment>
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
                                <button disabled={feed.count===''&& feed.message===''} className="reset-btn btn btn-success px-2" onClick={reset}>RESET</button>
                                <button disabled={feed.count===''|| feed.message===''} className="sub-btn btn btn-primary mx-2 px-2" onClick={submitClick}>SUBMIT</button>
                            </div>
                        </form>                        
                    </div>
                    <div>
                        <FeedbackList></FeedbackList>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}