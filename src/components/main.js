import React, { useEffect,useContext } from "react";
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

import axios from "axios";
import { WORD } from "../context/action.types";
import { wordContext } from '../context/context';

const Main = ({handleClickOpen1,handleClickOpen}) => {
    const {state,dispatch} = useContext(wordContext);
    //const [data,setData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/get-words')
          .then(res=>{
            var arr = []
            res.data.map(item=>(
              arr.push(JSON.parse(item.data))
            ))
            dispatch({type:WORD,payload:arr})
          })
      },[dispatch]);
    return(
        <div>
            <div>
                <List>
                {state && state.length>0 && state.map(item=>(
                    <ListItem button key={item._id} class="mdc-card mdc-card--outlined" onClick={()=>handleClickOpen1(item)}>
                    <div class="mdc-card__content">
                        <div style={{marginLeft:"5%"}}>
                        <h3>{item && item.id}</h3>
                        <ul id="list">
                        <p>
                        {item && item.results && item.results[0].lexicalEntries.map(i=>(
                            <li>
                            {i.lexicalCategory.text}
                            </li>
                        ))}
                        </p>
                        </ul>
                        </div>
                    </div>
                    </ListItem>
                ))}
                </List>
            </div>
            <div class="mdc-touch-target-wrapper">
                <button class="mdc-fab mdc-fab--default mdc-fab--touch" id="f_but" style={{background:"purple"}}
                onClick={handleClickOpen}
                >
                <div class="mdc-fab__ripple"></div>
                <span class="material-icons mdc-fab__icon">bolt</span>
                <div class="mdc-fab__touch"></div>
                </button>
            </div>
        </div>
    )
}

export default Main;