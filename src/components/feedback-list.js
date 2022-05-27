import React from "react";
import {userContext} from '../App.js';

export default function FeedbackList(){
    const data = React.useContext(userContext)
    console.log(data,'ddd')

    const removeData=(e,val)=>{
        e.preventDefault();
        console.log(val,'val')
    }
    return(
        <>
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
                                    {data.map((val,index)=>{
                                        return (
                                            <tr key={index}>
                                              <td>{index+1}</td>
                                              <td>{ val.count }</td>
                                              <td>{ val.message }</td>
                                              <td className="action"><button className="btn btn-info">Edit</button><button onClick={(e)=>{removeData(e,val)}} className="btn btn-danger mx-2">Delete</button></td>
                                            </tr>
                                          );
                                    })}                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}