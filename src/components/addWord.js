import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from "axios";
import { wordContext } from '../context/context';
import { WORD } from '../context/action.types';

export default function AddWord({open,handleClose}) {

  const {dispatch} = useContext(wordContext);
  const [word,setWord] = useState();
  const [loading,setLoading] = useState(false);

  const handleSubmit = () => {
      if(!word){
          return alert("Enter a word to continue!")
      }
      setLoading(true);
      axios.post('http://localhost:5000/api/add-word',{word})
        .then(res=>{
          console.log(res)
            if(res.data.error){
                alert(res.data.error)
            }
            axios.get('http://localhost:5000/api/get-words')
          .then(res=>{
            var arr = []
            res.data.map(item=>(
              arr.push(JSON.parse(item.data))
            ))
            dispatch({type:WORD,payload:arr})
          })
            setLoading(false);
            setWord()
            handleClose()
      })
  }
 
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add to Dictionary</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New Word
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            onChange={(e)=>setWord(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {loading ? 
            <span>loading...</span>
            :
            <Button color="primary" onClick={()=>handleSubmit()}>Add</Button>
          }
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
