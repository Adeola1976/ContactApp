import React,{useRef,useContext,useEffect} from 'react'
import  ContactContext from '../../context/contact/contactContext'

const Contactfilter = () => {

    const contactContext = useContext(ContactContext);
    const {filtered,filterContact,clearFilter}  = contactContext;
    const text = useRef('');

    const onChange  = e => {
          
        if(text.current.value!=='') {
            filterContact(e.target.value)
        }
       else {
         clearFilter()
       }
    }

    useEffect( () => {
        if(filtered===null) {
            text.current.value=''
        }
    })
   

    return (
        <div className="form-group">
            <input ref={text} placeholder='type a text to search' onChange={onChange} className="form-control"/>
        </div>
    )
}

export default Contactfilter