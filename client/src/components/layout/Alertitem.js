import React from 'react'

 const Alertitem = ({alertitem}) => {
     const{msg,type} = alertitem;
    return (
        <div className={`alert alert-${type}`} >
               <i className="fas fa-info-circle"></i>{msg}
        </div>
    )
}
export default Alertitem
