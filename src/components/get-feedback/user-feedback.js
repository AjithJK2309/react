import React,{useState,useEffect} from "react";
import '../component.css';
import FeedbackList from '../feedback-list/feedback-list';
import { globalContext } from "../../helper/globalContext";
import { base_url } from "../../helper/Constants";
import { FeedBox,Header,Rating,Label,RatingButton,SubmitButton,ResetButton } from "./StyleComponent";

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
            <FeedBox>
                <div className="row">                    
                        <div className="col-md-8">                        
                                <Header>Feedback</Header>
                                <form>
                                    <Rating>
                                        <Label>Rating</Label>
                                        <span> 
                                            <fieldset className="d-flex mt-1">                                  
                                                {rating.map((val,index)=><RatingButton key={index} className="rate-btn" onClick={(e)=>ratedValue(val,e)}>{val}</RatingButton>)} 
                                            </fieldset>                                         
                                        </span>
                                        <Label>Message</Label>
                                        <textarea className='form-control' value={feed.message} onChange={(e)=>{setFeed((previousState)=>({...previousState,message:e.target.value}))}}  />
                                        <br />
                                        <ResetButton disabled={feed.count===''&& feed.message===''} onClick={reset}>RESET</ResetButton>
                                        <SubmitButton disabled={feed.count===''|| feed.message===''} onClick={submitClick}>SUBMIT</SubmitButton>
                                    </Rating>
                                </form>                                                
                        </div>                    
                    <div>
                        <FeedbackList></FeedbackList>
                    </div>
                </div>
                </FeedBox>
            </div>
        </React.Fragment>
    )
}