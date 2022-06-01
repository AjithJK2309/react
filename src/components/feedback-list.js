import React,{useState} from "react";
import Modal from "react-bootstrap/Modal";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { globalContext } from "../helper/globalContext.js";

export default function FeedbackList(){
    // Getting Data in User Context
    const feedData = React.useContext(globalContext)

    // Static rating values
    const rating = [1,2,3,4,5,6,7,8,9,10]

    // State management for feedback
    const [modalBool,setBool]=useState({edit:false,delete:false})
    const [feed,setFeed]=useState({count:'',message:'',index:''})

    // Feedback modal open
    const modalOpen=(val,data,i)=>{
        setFeed((prevState)=>({...prevState,count:data.count,message:data.message,index:i}))
        val==='edit'?setBool((prevState)=>({...prevState,edit:true})):setBool((prevState)=>({...prevState,delete:true}))
    }

    // Feedback modal close
    const modalClose=(val)=>{
        val==='edit'?setBool((prevState)=>({...prevState,edit:false})):setBool((prevState)=>({...prevState,delete:false}))
        setFeed((prevState)=>({...prevState,message:''}))
    }

    // Delete feedback in global array
    const removeFeed=()=>{
        feedData.deleteFeedback(feed.index)
        setBool((prevState)=>({...prevState,delete:false}))
    }

    // Edit feedback in global array
    const feedChange=(e)=>{
        feedData.editFeedback({count:feed.count , message:feed.message},feed.index)
        e.preventDefault();
        setBool((prevState)=>({...prevState,edit:false}))
    }

    // Storing a rated count
    const countChange=(e)=>{
        setFeed((prevState)=>({...prevState,count:parseInt(e.target.value)}))
    }
    return(
        <React.Fragment>
        {feedData.state.data.length !==0 && (
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
                                    {feedData.state.data.map((val,index)=>{
                                        return (
                                            <tr key={index}>
                                              <td>{index+1}</td>
                                              <td>{ val.count }</td>
                                              <td>{ val.message }</td>
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
                                                    <button onClick={()=>modalOpen('delete',val,index)} className="btn btn-danger mx-2">Delete</button>
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