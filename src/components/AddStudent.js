import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {SERVER_URL} from '../constants'
import AdminHome from './AdminHome';


// properties addStudent is required, function called when Add clicked.
function AddStudent(props) { 

  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({name:'', email:''}); 
  const [message, setMessage] = useState(' ');  // status message
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
   
  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    student.email = email;
  }

  const handleChangeName = (event) => {
    setName(event.target.value);
    student.name = name;
  }

    // Save student and close modal form
  const handleAdd = () => {
      addStudent();
      handleClose();
  }


  /*
  *  add student
  */ 
  const addStudent = () => {
    setMessage('');
    console.log("start addStudent"); 

    fetch(`${SERVER_URL}/student`,
    { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(student)
    })
    .then(res => {
        if (res.ok) {
        console.log("addStudent ok");
        setMessage("Student added");
        } else {
        console.log('error addStudent ' + res.status);
        setMessage("Error. "+res.status);
        }})
    .catch(err => {
        console.error("exception addStudent "+ err);
        setMessage("Exception "+err);
    })
  }


  return (
      <div>
        <Button id="addStudent" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
          Add Student
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="email" autoFocus fullWidth label="Student Email" name="email" onChange={handleChangeEmail}  /> 
              <TextField id="name" autoFocus fullWidth label="Student Name" name="name" onChange={handleChangeName}  /> 
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose} >Cancel</Button>
              <Button id="add" color="primary" onClick={handleAdd} >Add</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 
}
export default AddStudent;