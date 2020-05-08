import React ,{ Component } from 'react';
import './Qmapp.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default class TypeSelect extends Component{

  constructor(props){
    super(props);
    this.state= {
      unitName:"",
      // Units:["Length","Volume","Mass","Temerature"],
      // subUnits:["FEET","INCH","YARD","CENTIMETER"]
  }
  this.handleChange = this.handleChange.bind(this);
    }

handleChange = (event) =>
{
  console.log(event)
    let selectedValue = event.target.value;
    this.props.onSelectChange(selectedValue)
}



    render(){
      let arrayOfQuantity = this.props.arrayOfQuantity;
      let options = arrayOfQuantity.map((data) =>
              <option 
                  key={data}
              >
               {data}
              </option>
          );



        //   {this.props.mainUnits.map((data) =>(
        //     <option key={data}>{data}</option>
        // ))}

      return (
            <FormControl variant="filled" className="classes.formControl">

        <InputLabel htmlFor="filled-age-native-simple">{this.props.name}</InputLabel>
        <Select
        style={{width:this.props.width}}
        native
     //   value={this.state.unitName}
          
          onChange={this.handleChange}
        >
          <option aria-label="None" value="" />
          {options}
        </Select>
      </FormControl>
        )
    }
}
