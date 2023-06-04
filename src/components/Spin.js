import React, { Component } from 'react'
import loading from './Spinnergif.gif'
export class Spin extends Component {
  render() {
    return (
    <div className="d-flex justify-content-center">
        <img  src={loading} alt="loading" />
    </div>
      
      
    )
  }
}

export default Spin
