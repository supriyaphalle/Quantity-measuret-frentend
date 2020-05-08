import React ,{ Component } from 'react';
import './Qmapp.css';

 import { makeStyles } from '@material-ui/core/styles';


export default class Inputfield extends Component{

render(){
    return (
        <form className="inputfield" noValidate autoComplete="off">
         <div>  
          <TextField id="standard-basic" label="Value" />
         <div>=</div>
          <TextField id="standard-basic" label="Value" />
          </div> 
          </form>
      );
}
}
