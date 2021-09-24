import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../alert/alertContext'

const Login = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const {setAlert} = alertContext;
    const {Login,error,clearError,isAutheticated} = authContext;

    const [user,setUser] = useState({
        email:'',
        password:'',
       
    });

    const{email,password} = user;

    const onChange = e => {
        setUser({...user, [e.target.name]:e.target.value});
    }
    const onSubmit = e => {
        e.preventDefault();
        if(email===''||password==='') {
            setAlert('please enter all fields','danger');
        }
        Login({email,password})
    }

    useEffect( () => {
        if (isAutheticated)  {
           props.history.push('./');
        }
        if(error==='incorrect credentials') 
       setAlert(error,'danger');
       clearError();
       // eslint-disable-next-line
   },[error,isAutheticated,props.history])

    return (
        <div className='form-container offset-2'>
              <h2> Account <span className="text-primary">Login</span></h2>
              <form onSubmit={onSubmit}>
                <div className="col-md-4">
                <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Email" value={email} className="form-control" onChange={onChange} />
                </div>
                        
                <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={onChange}  className="form-control"/>
                </div>
                        <input type="submit" className= "btn btn-primary btn-block" value='Login User'/>
               </div>
               </form>

            
        </div>
    )
}

export default Login
