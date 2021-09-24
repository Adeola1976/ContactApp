import React,{useContext} from 'react'
import AlertContext from '../alert/alertContext'
import Alertitem from './Alertitem'


 const Alert = () => {
     const alertContext = useContext(AlertContext);
     const {alert} = alertContext; 
    return (
        <div>
              {alert.length>0 &&  alert.map(alertitem => <Alertitem id={alertitem.id} alertitem={alertitem}/>)}
        </div>
    )
}

export default Alert

 