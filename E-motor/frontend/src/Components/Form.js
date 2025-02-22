import React,{useState} from 'react'
import axios from 'axios';
import './Form.css'

function Form() {

    const[email,setEmail] = useState('');
    const[phoneNumber,setPhoneNumber]  =useState('');
    const[error,setError] = useState('')
    const[response,setResponse] = useState();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!email && !phoneNumber){
            setError("please enter the valid email")
            return;
        }
        setError('') //clear the error indication

        try{
            const res = await axios.post('http://localhost:8000/api/identify',{
                email,
                phoneNumber
            })
            setResponse(res.data)

        }catch(err){
            setError('error posting data')
            console.log("api error",error)
        }


    }

  return (
    <div className='container'>
   
<h1>E-motor identity Reconciliation Task</h1>

<form onSubmit={handleSubmit} className='form'>
    <h1>Please fill the details</h1>
    <lable className='label'>Email</lable>
    <input type = 'email'placeholder='please enter your email' value={email}onChange={(e)=>setEmail(e.target.value)} className='input'/>
    <label className='label'>PhoenNumber</label>
    <input  placeholder='please enter your phonenumber'value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} className='input'/>
    <button type='submit'className='button' >Submit</button>

    {error && <p className="error">{error}</p>}

                {response && (
                    <div className="response">
                        <h3>API Response:</h3>
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                    </div>
                )}
</form>
      
    </div>
  )
}

export default Form
