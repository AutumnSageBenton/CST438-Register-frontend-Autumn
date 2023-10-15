import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import {SERVER_URL} from '../constants';

const AdminHome = ()  => {

    useEffect(() => {
        // called once after intial render
        fetchStudents();
        }, [] )

    /* 
        *  list of students 
    */
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState('');

    const fetchStudents = () => {
        console.log("fetchStudents ");
        fetch(`${SERVER_URL}/student`)
        .then((response) => response.json() )
        .then((data) => setStudents(data) )
        .catch((err) =>  { console.log("fetch error "+err); } );
    }

    const refreshStudents = () => {
        setMessage('');
        fetchStudents();
    }

    const deleteStudent = (event) => {
        const row_id = event.target.parentNode.parentNode.rowIndex - 1;
        console.log("deleteStudent "+row_id);
        const studentId = students[row_id].studentId;
        console.log("student_id "+studentId);
        fetch(`${SERVER_URL}/student/${studentId}`, 
          {  
            method: 'DELETE', 
          } 
        )
        .then((response) => { 
            if (response.ok) {
                setMessage('Student deleted.');
                fetchStudents();
            }
         } )
        .catch((err) =>  { setMessage('Error. '+err) } );
    }

    const headers = ['ID', 'name', 'email', 'status code', 'reason',' ', ' '];

    return (
        <div> 
        <div margin="auto" >
          <h3>Students</h3>
          <h4>{message}</h4>
            <table className="Center"> 
              <thead>
                <tr>
                  {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                </tr>
              </thead>
              <tbody>
              {students.map((row,idx) => (
                      <tr key={idx}>
                        <td>{row.studentId}</td>
                        <td id={row.name}>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.statusCode}</td>
                        <td>{row.status}</td>
                        <td id="editStudent"><EditStudent student={students[idx]} onClose={refreshStudents} /></td>
                        <td id="deleteStudent"><button id="deleteStudent" type="button" margin="auto" onClick={deleteStudent}>Delete</button></td>
                      </tr>
                    ))}
              </tbody>
            </table>
            <AddStudent id="NewStudent" onClose={refreshStudents}/>
        </div>
      </div>
    )
}

export default AdminHome;