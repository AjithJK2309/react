import React,{ useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { globalContext } from "../helper/globalContext.js";
import { base_url } from "../helper/Constants.js";

export default function FeedbackList(){
    // Getting Data in User Context
    const feedData = React.useContext(globalContext)

    // State management for feedback
    const [modalBool,setBool]=useState({edit:false,delete:false})
    const [feed,setFeed]=useState({})

    // getting all data from json server
    const getAllData=async()=>{
        await fetch(base_url).then((res)=>res.json()).then((data)=>feedData.allFeedback(data));
    }

    // updating data using useEffect life cycle hook
    useEffect(()=>{
        getAllData()        
    },[feed])

    // Static rating values
    const rating = [1,2,3,4,5,6,7,8,9,10]    

    // Feedback modal open
    const modalOpen=(val,data)=>{       
        setBool((prevState)=>({...prevState,[val]:true}))           
        setFeed(data)       
    }

    // Feedback modal close
    const modalClose=(val)=>{
        setBool((prevState)=>({...prevState,[val]:false}))
    }

    // Delete feedback in global array
    const removeFeed=()=>{
        feedData.deleteFeedback(feed.id)     
        setBool((prevState)=>({...prevState,delete:false}))
        setFeed((prevState)=>({...prevState,count:'',message:'',id:''}))
    }

    // Edit feedback in global array
    const feedChange=(e)=>{
        feedData.editFeedback({count:feed.count , message:feed.message},feed.id)
        setBool((prevState)=>({...prevState,edit:false}))
        setFeed((prevState)=>({...prevState,count:'',message:'',id:''}))
    }

    // Storing a rated count
    const countChange=(e)=>{
        setFeed((prevState)=>({...prevState,count:parseInt(e.target.value)}))
    }
    return(
        <React.Fragment>
        { feedData.state.data?.length !==0 && (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 feed-box-2">
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Rated</th>
                                    <th>Message</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>                                
                                    { feedData.state.data?.map((val,index)=>{
                                        return (
                                            <tr key={index}>
                                              <td>{index+1}</td>
                                              <td>{ val.count }</td>
                                              <td><div className="message-word">{ val.message }</div></td>
                                              <td className="action">
                                                    <button className="btn btn-info" onClick={()=>modalOpen('edit',val,index)} data-toggle="modal" data-target="exampleModal">Edit</button>
                                                    <Modal show={modalBool.edit}>
                                                        <Modal.Header>
                                                            Edit Feedback
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <label className="form-label">Rating</label>
                                                            <div>
                                                                <ButtonGroup>
                                                                    {rating.map((radio, idx) => (
                                                                    <ToggleButton
                                                                        key={idx}
                                                                        id={`radio-${idx}`}
                                                                        type="radio"
                                                                        variant={'outline-primary' }
                                                                        name="radio"
                                                                        value={radio}
                                                                        checked={feed.count=== radio}
                                                                        onChange={countChange}
                                                                        className="mx-1"
                                                                        style={{borderRadius:'100px'}}
                                                                    >
                                                                        {radio}
                                                                    </ToggleButton>
                                                                    ))}
                                                                </ButtonGroup>
                                                            </div>
                                                            <label className="form-label">Message</label>
                                                            <input className="form-control" value={feed.message} onChange={(e)=>{setFeed((prevState)=>({...prevState,message:e.target.value}))}} ></input>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="outline-secondary" disabled={feed.message===''} onClick={(e)=>feedChange(e)}>Submit</Button>
                                                            <Button variant="outline-danger" onClick={()=>modalClose('edit')}>Close</Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                    <button onClick={()=>modalOpen('delete',val)} className="btn btn-danger mx-2">Delete</button>
                                                    <Modal show={modalBool.delete}>
                                                        <Modal.Header>
                                                            Delete Feedback
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <p>Are you sure want to delete feedback?</p>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="outline-danger" onClick={removeFeed}>Delete</Button>
                                                            <Button variant="outline-secondary" onClick={()=>modalClose('delete')}>Close</Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                              </td>
                                            </tr>
                                          );
                                    })}                                
                            </tbody>
                        </table>                        
                    </div>
                </div>
            </div>
            )}                       
        </React.Fragment>
    )
}