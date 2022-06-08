import React,{ useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { globalContext } from "../../helper/globalContext.js";
import { base_url } from "../../helper/Constants.js";
import { FeedBox2,Table,Tr,THead,Th,Td,TBody,EditButton,DeleteButton,Labels,BreakWord } from "./StyleComponent.js";

export default function FeedbackList(){
    // Getting Data in User Context
    const contextData = React.useContext(globalContext)

    // State management for feedback
    const [modalBool,setBool]=useState({edit:false,delete:false})
    const [feed,setFeed]=useState({})

    // getting all data from json server
    const getAllData=async()=>{
        await fetch(base_url).then((res)=>res.json()).then((data)=>contextData.allFeedback(data));
    }

    // updating data using useEffect life cycle hook
    useEffect(()=>{
        getAllData()        
    },[modalBool])

    // Static rating values ★★★★★★★★★★
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
        contextData.deleteFeedback(feed.id)     
        setBool((prevState)=>({...prevState,delete:false}))
        setFeed((prevState)=>({...prevState,count:'',message:'',id:''}))
    }

    // Edit feedback in global array
    const feedChange=(e)=>{
        contextData.editFeedback({count:feed.count , message:feed.message},feed.id)
        setBool((prevState)=>({...prevState,edit:false}))
        setFeed((prevState)=>({...prevState,count:'',message:'',id:''}))
    }

    // Storing a rated count
    const countChange=(e)=>{
        setFeed((prevState)=>({...prevState,count:parseInt(e.target.value)}))
    }
    return(
        <React.Fragment>
        { contextData.state.data?.length !==0 && (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <FeedBox2>
                            <Table>
                                <THead>
                                    <Tr>
                                        <Th>S.No</Th>
                                        <Th>Rated</Th>
                                        <Th>Message</Th>
                                        <Th>Action</Th>
                                    </Tr>
                                </THead>
                                <TBody>                                
                                        { contextData.state.data?.map((val,index)=>{
                                            return (
                                                <Tr key={index}>
                                                <Td>{index+1}</Td>
                                                <Td>{ val.count }</Td>
                                                <Td><BreakWord>{ val.message }</BreakWord></Td>
                                                <Td className="d-flex">
                                                        <EditButton onClick={()=>modalOpen('edit',val,index)} data-toggle="modal" data-target="exampleModal">Edit</EditButton>
                                                        <Modal show={modalBool.edit}>
                                                            <Modal.Header>
                                                                Edit Feedback
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <Labels>Rating</Labels>
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
                                                                <Labels>Message</Labels>
                                                                <input className="form-control" value={feed.message} onChange={(e)=>{setFeed((prevState)=>({...prevState,message:e.target.value}))}} ></input>
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="outline-secondary" disabled={feed.message===''} onClick={(e)=>feedChange(e)}>Submit</Button>
                                                                <Button variant="outline-danger" onClick={()=>modalClose('edit')}>Close</Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                        <DeleteButton onClick={()=>modalOpen('delete',val)}>Delete</DeleteButton>
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
                                                </Td>
                                                </Tr>
                                            );
                                        })}                                
                                </TBody>
                            </Table> 
                        </FeedBox2>                       
                    </div>
                </div>
            </div>
            )}                       
        </React.Fragment>
    )
}