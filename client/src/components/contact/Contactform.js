import React,{useState,useContext,useEffect} from 'react'
import  ContactContext from '../../context/contact/contactContext'

const Contactform = () => { 
    const contactContext = useContext(ContactContext);
    const {addcontact,current,clearContact, updateContact}  = contactContext;
    const [contact,setContact] = useState({
        name:'',
        email:'',
        phone:'',
        type:'personal'
    });

    useEffect( () => {
           if (current!==null) {
            setContact(current);
           }
           else {
            setContact({
                name:'',
                email:'',
                phone:'',
                type:'personal' 
            })
           }
 
    },[contactContext,current]);

    const clearAll = () => {
        clearContact();
    }
    const{name,email,phone,type} = contact;
    const onChange = e => {
        setContact({...contact, [e.target.name]:e.target.value});
    }
    const onSubmit = e => {
        e.preventDefault();

        if (current === null) {
           addcontact(contact);
        }

        else {
            updateContact(contact);
        }
       
        setContact({
            name:'',
            email:'',
            phone:'',
            type:'personal' 
        })
    }
    return (
        <>
        <form onSubmit={onSubmit}>
               <h2 className="text-primary">{current?'Edit Contact':'Add Contact'}</h2>
               <input type="text" name="name" placeholder="Name" value={name} onChange={onChange}/>
               <input type="email" name="email" placeholder="Email" value={email} onChange={onChange}/>
               <input type="number" name="phone" placeholder="Phone" value={phone} onChange={onChange}/>
               <input type="radio" name="type"  value={type}  checked= {type==="personal"} onChange={onChange}/>Personal{''}
               <input type="radio" name="type"  value="professional"  checked= {type==="professional"} onChange={onChange}/>professional
               <input type="submit" className= "btn btn-primary btn-block" value={current?'Update Profile':'Add Contact'}/>
         
                   {current && <div>
                        <button onClick={clearAll} className='btn btn-light btn-block'>Clear</button>
                       </div>}
            
        </form>
        </>
    )
}

export default Contactform