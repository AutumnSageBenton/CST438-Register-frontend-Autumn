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

const EditStudent = (props)  => {
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
    const handleEdit = () => {
        editStudent();
        handleClose();
    }
    
  
    /*
    *  edit student
    */ 
    const editStudent = () => {
        setMessage('');
        console.log("start editStudent"); 
        console.log(student.student_id);

        fetch(`${SERVER_URL}/student/${student.student_id}`,
        { 
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(student)
        })
        .then(res => {
            if (res.ok) {
            console.log("editStudent ok");
            setMessage("Student updated");
            } else {
            console.log('error editStudent ' + res.status);
            setMessage("Error. "+res.status);
            }})
        .catch(err => {
            console.error("exception editStudent "+ err);
            setMessage("Exception "+err);
        })
    }
  
    return (
        <div>
          <Button id="editStudent" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
            Edit Student
          </Button>
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogContent  style={{paddingTop: 20}} >
                <TextField id="email" autoFocus fullWidth label="Student Email" name="email" onChange={handleChangeEmail}  /> 
                <TextField id="name" autoFocus fullWidth label="Student Name" name="name" onChange={handleChangeName}  /> 
              </DialogContent>
              <DialogActions>
                <Button color="secondary" onClick={handleClose} >Cancel</Button>
                <Button id="edit" color="primary" onClick={handleEdit} >Update</Button>
              </DialogActions>
            </Dialog>      
        </div>
    ); 
}

export default EditStudent;