import React from 'react';
import { Helmet } from 'react-helmet';

import './DuplicateArray.scss';

var arr = [7000,7001,7002,7003,7004,7005];

class DuplicateArray extends React.Component {
    state={
        inputData:'',
        uniqueList : [],
        duplicateData : [],
    }

    // regex to validate the range or number
    validateNumber = (inputValue) => {
        const patt1 = /^[0-9,-\s]*$/g;
        const result = inputValue.match(patt1);
        if(result && result[0]) {
            return result[0]
        }
        return false;
    }

    handleSubmit = (event) => {
    event.preventDefault()
    let validatedData = this.validateNumber(this.state.inputData)
    if(validatedData.split('-').length === 1) {
        let elementFlag = arr.includes(parseInt(validatedData))
        if(elementFlag){
            let duplicate=[]
            duplicate.push(parseInt(validatedData))
            this.setState({
                uniqueList : arr.filter((item) => item !== parseInt(validatedData)),
                duplicateData: duplicate
            }, () => {
                console.log(this.state.duplicateData)
            })
        } 
        else {
            this.setState({
                uniqueList : arr,
                duplicateData: []
            })
        }
    } 
    else if (validatedData.split('-').length === 2) {

            let start = parseInt(validatedData.split('-')[0]) // fisrt element of the range
            let end =  parseInt(validatedData.split('-')[1]) // last element of the range
            let elementFlagStart = arr.includes(start) // checking whether first element is in the array
            let elementFlagEnd = arr.includes(end) // checking whether last element is in the array

            //checking if first element of range is in the array and last is not in the array
            if(elementFlagStart && !elementFlagEnd){
                this.setState({ 
                    uniqueList : arr.filter((item) => item < start),
                    duplicateData: arr.filter((item) => item >= start),
                }) 
            } 
            //checking if first element of range is not in the array and last is in the array
            else if(!elementFlagStart && elementFlagEnd) {
                this.setState({ 
                    uniqueList : arr.filter((item) => item > end ),
                    duplicateData: arr.filter((item) => item <= end),
                })
            }
            //checking if first element of range is in the array and last is also in the array
            else if (elementFlagStart && elementFlagEnd) {
                this.setState({ 
                    uniqueList : arr.filter((item) => item < start || item > end),
                    duplicateData: arr.filter((item) => item <= end),
                })
            }
            //checking if first element of range is not in the array and last is also not in the array
            else if(start < arr[0] && end > arr[arr.length-1]) {
                this.setState({
                    uniqueList : [],
                    duplicateData: arr
                })
            } 
            else {
                this.setState({
                    uniqueList : arr,
                    duplicateData: []
                })
            }
    }
}
    handleChange = (e) => {
        e.preventDefault()
        const patt1 = /^[0-9,-\s]*$/g;
        let patternFlag = patt1.test(e.target.value)
        if(patternFlag) {
            debugger
            this.setState({inputData : e.target.value})
        } else {
            alert('Only numbers and `-` allowed')
            this.setState({inputData : ''})
        }
    }

    render(){
        console.log('uniqueList', this.state.uniqueList)
        console.log('duplicateList', this.state.duplicateData)
        return (
            <div className='flex-container'>
                <Helmet>
                    <meta name='description' content="A React.js Boilerplate application" />
                </Helmet>
                <div className='row'> <strong>Given Array Is:</strong> [7000,7001,7002,7003,7004,7005]</div>
                <div className='row'>
                    <form onSubmit={this.handleSubmit}>
                        <strong>Enter the number OR range of number:</strong> &nbsp;&nbsp;
                        <input type='text' name='fname' onChange={this.handleChange} value={this.state.inputData} required/>
                        <div className='row'>
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
                <div className='row'>
                    <strong> Unique Data :</strong> {this.state.uniqueList.map((item)=> {return item+', ' })}
                </div>
                <div className='row'>
                    <strong> Duplicate Data :</strong> {this.state.duplicateData.map((item)=> {return item+', '})}
                </div>
            </div>
          );
    }
  }
  
  export default DuplicateArray;