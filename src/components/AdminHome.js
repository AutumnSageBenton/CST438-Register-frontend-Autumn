import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import {SERVER_URL} from '../constants'
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';



const AdminHome = ()  => {
    const [students, setStudents] = useState([]); // list of students
    const [student, setStudent] = useState([]); // a single student
    const [message, setMessage] = useState(' ');  // status message


    useEffect(() => {
        // called once after intial render
        fetchStudents();
        }, [] )


    const fetchStudents = () => {
      console.log("FETCHING");
		//TODO complete this method to fetch students and display list of students
      fetch("http://localhost:8080/student")
      .then((response) => {return response.json(); })
      .then(data => {
        setStudents(data);
      }).catch(err => console.log(err));
    }

    const dropStudent = (event) => {
      setMessage('');
      const row_id = event.target.parentNode.parentNode.rowIndex - 1;
      console.log("drop student "+row_id);
      const s_id = students[row_id].studentId;
  
      if (window.confirm('Are you sure you want to drop the student?')) {
          fetch(`${SERVER_URL}/student/${s_id}?force=yes`,
          {
              method: 'DELETE',
          }
          )
      .then(res => {
          if (res.ok) {
              console.log("drop ok");
              setMessage("Student dropped.");
              fetchStudents();
          } else {
              console.log("drop error");
              setMessage("Error dropStudent. "+res.status);
          }
          })
      .catch( (err) => {
          console.log("exception dropStudent "+err);
          setMessage("Exception. "+err);
       } );
      }
    } 

    const headers = ['ID', 'Name', 'Email', 'Status', 'Status Code', '', ''];

    if (students.length === 0) {
      return (
          <div>
              <h3>No Students</h3>
              <AddStudent />
          </div>
          );
    } else { 
      return (
        <div> 
        <div margin="auto" >
          <h3>Student List</h3>
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
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.statusCode}</td>
                  <td>{row.status}</td>
                  <td><button type="button" margin="auto" onClick={dropStudent}>Drop</button></td>
                  <td><EditStudent onClose={fetchStudents}/></td>
                </tr>
              ))}
            </tbody>
          </table>
          <AddStudent onClose={fetchStudents}/>
        </div>
      </div>
    );
  }

    
}
export default AdminHome;