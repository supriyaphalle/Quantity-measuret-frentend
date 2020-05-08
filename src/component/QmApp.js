import React ,{ Component } from 'react';
import './Qmapp.css';
import TypeSelect from "./TypeSelect";
import DataService from "C:/Users/user/quantitymeasurement-app/src/service/DataService.js";
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';


export default class QmApp extends Component{

  constructor(props){
    super(props)
    this.state= {
      firstValue : 0,
      secondValue : 0,
      arrayOfQuantity1 : [],
      firstSubUnit : 'unit',
      secondSubUnit : 'unit',
      mainQuantity: 'Nothing selected' ,
      unit : []
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

componentDidMount(){
  DataService.getQuantity().then((responce)=>{
    console.log(responce);
    this.setState({
     arrayOfQuantity1 : responce.data
     })  
  }).catch((error)=>{
    console.log(error)
  })
}

getUnit = (selectedValue) => {
  console.log(selectedValue);
    DataService.getUnit(selectedValue).then((responce)=>{
    console.log(responce);
    this.setState({
     unit :responce.data
     })  
  }).catch((error)=>{
    console.log(error)
  })
}

 handleSelectChange = (mainQuantity) =>{
    console.log(mainQuantity);
    this.setState({
      mainQuantity: mainQuantity
    })
     this.getUnit(mainQuantity);
  }

  convertFromFirstValueToSecondValue =(event) =>{
    this.setState({
      firstValue : event.target.value
    })
    const DTOform = {
      //QuantityType quantityType ,Double inputValue,Double outputValue, Unit mainUnit, Unit convertedUnit) {

      quantityType : this.state.mainQuantity,
      inputValue : event.target.value,
      outputValue : this.state.secondValue,
      mainUnit: this.state.firstSubUnit,
      convertedUnit:this.state.secondSubUnit,
    }
    axios.post(`http://localhost:8080//convert`,DTOform).then((responce) =>{
      console.log(responce.data)
      this.setState({
        secondValue : responce.data.value
      })
    }).catch((error)=>{
          console.log(error)
        })
  }
  
  convertFromSecondValueToFirstValue=(event) =>{
    this.setState({
      secondValue : event.target.value
    })
    const DTOform = {
      quantityType : this.state.mainQuantity,
      inputValue : event.target.value,
      outputValue : this.state.firstValue,
      mainUnit:this.state.secondSubUnit,
      convertedUnit: this.state.firstSubUnit,
    }
    axios.post("http://localhost:8080//convert",DTOform).then((responce) =>{
      console.log(responce.data)
      this.setState({
        firstValue : responce.data.value
      })
    }).catch((error)=>{
          console.log(error)
        })

    
  }

  setFirstSubUnit = (selectedValue) =>{
    console.log(selectedValue);
    this.setState({
      firstSubUnit : selectedValue
    })
  }

  setSecondSubUnit = (selectedValue) =>{
    console.log(selectedValue);
    this.setState({
      secondSubUnit : selectedValue
    })
  }

 render(){
    return (
        <Card className= "baseCard">       
          
          <CardContent>
              <TypeSelect
              width="450px"
              name="Quantity"
              arrayOfQuantity={this.state.arrayOfQuantity1} 
              onSelectChange={this.handleSelectChange}
            />
 
              {/* <h6>selected value =  {this.state.mainQuantity}</h6> */}
              <div className="valueField">
                  <TextField id="standard-basic" label="Value" 
                    value = {this.state.firstValue}
                    onChange={this.convertFromFirstValueToSecondValue }
                  />
                  <div>=</div>
                   <TextField id="standard-basi" label="Value"
                   value = {this.state.secondValue} 
                    onChange={this.convertFromSecondValueToFirstValue }
                  
                   />
               </div>
             <div className = "field" >
                  <TypeSelect 
                    name="Sub Unit" 
                    width="250px"  
                    arrayOfQuantity= {this.state.unit}
                    onSelectChange={this.setFirstSubUnit}
                  /> 
                  <div>===</div>
                  
                   {/* < SwapHorizSharpIcon color="primary">add_circle </SwapHorizSharpIcon>   */}
                  <TypeSelect
                  name="Sub Unit"
                  width="250px" 
                  arrayOfQuantity = {this.state.unit}
                  onSelectChange={this.setSecondSubUnit}
              
                  />
            </div>
           
              
          </CardContent>
          

        </Card>
      );
}
}

