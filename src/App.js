import React,{ useReducer, useState} from "react"
import "./App.scss"

import AddWord from "./components/addWord"
import FullScreenDialog from "./components/fullPageDialog";
import SearchAppBar from "./components/appBar";
import Main from "./components/main";

import { wordContext } from "./context/context";
import { initialState, reducer } from "./context/reducer";

const App = () => {

  const [state,dispatch] = useReducer(reducer,initialState);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = (item) => {
    setOpen1(true);
    setDialogData(item)
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const [dialogData,setDialogData] = useState()

  return (
    <wordContext.Provider value={{state,dispatch}}>
      <FullScreenDialog data={dialogData} open={open1} handleClickOpen={handleClickOpen1} handleClose={handleClose1} />
      <AddWord open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      <SearchAppBar handleClickOpen1={handleClickOpen1} handleClickOpen={handleClickOpen} />
      <Main handleClickOpen1={handleClickOpen1} handleClickOpen={handleClickOpen} />
    </wordContext.Provider>
  );
}

export default App;
