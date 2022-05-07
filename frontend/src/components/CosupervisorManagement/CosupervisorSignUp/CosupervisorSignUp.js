import React,{useState} from "react";
import { useHistory} from 'react-router-dom';
import { OutlinedInput } from '@mui/material';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import 'date-fns';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import './CosupervisorSignUp.css';
import axios from "axios";


function CosupervisorSignUp(){

    
    const [password, setPassword]= useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [name,setName]=useState("");
    const [title,setTitle]=useState("");
    const [email,setEmail]=useState("");
    const [fields,setFields]=useState([]);
    const [phoneno,setPhone]=useState("");
    const [previewSource, setPreviewSource] = useState();
    const history =useHistory();

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(event.target.value);
    };

    //display a preview of uploaded image
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    
    async function add(event){
        event.preventDefault();
        const config={
             headers:{
                "content-Type":"application/json"
            }
        };

        let imgUrl

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile)
            formData.append("upload_preset", "cosupervisor")

            try {
                await axios.post("https://api.cloudinary.com/v1_1/tbrmy/image/upload", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

      

        if(password===confirmPassword){
            const newCosupervisor= { title, name, email, fields, phoneno, password, imgUrl }
            
            try{
            
                await axios.post("http://localhost:8070/cosupervisor/signup",newCosupervisor,config);
                alert("Co-Supervisor added successfully")
                history.push(`/cosupervisor/signin`)
            } catch(error){
                alert("Registration failed!");
                
            }
        }else{
            alert("Password mismatch!");
        }
       
    }


    const field = [
        'Internet of Things', 'Blockchain', 'Artificial Intelligence'
    ]

    
    //handling the image uploading
    

    const handleFieldChange = (event) => {
        setFields(event.target.value);
    };
 
    return(   
        <div className="container" align="center">
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2>Sign Up</h2>
                    </div>
                </div>
            </div>
            <form  onSubmit={add} className="cosupervisorSignUp" >
                <div className="row"> 
                    
                    <div className="col-8">
                        <div className="row">
                            <div className="col-xl-12 mb-3">
                                <label>Title</label> &nbsp;
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" type="radio" name="title" id="dr" value="Dr." required
                                        onChange={(event)=> {setTitle(event.target.value)}}
                                    />
                                    <label className="form-check-label" for="dr">Dr.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" type="radio" name="title" id="mr" value="Mr." required
                                        onChange={(event)=> {setTitle(event.target.value)}}
                                    />
                                    <label className="form-check-label" for="mr">Mr.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" type="radio" name="title" id="ms" value="Ms." required
                                        onChange={(event)=> {setTitle(event.target.value)}}
                                    />
                                    <label className="form-check-label" for="prof">Ms.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" type="radio" name="title" id="prof" value="Prof." required
                                        onChange={(event)=> {setTitle(event.target.value)}}
                                    />
                                    <label className="form-check-label" for="mr">Prof.</label>
                                </div>
                            </div>

                            <br/>

                            <div className="col-xl-6 mb-3">
                                <OutlinedInput
                                    type="text"
                                    name="fullname"
                                    id="fullname"
                                    placeholder="Full Name"
                                    onChange={(e) => setName (e.target.value)}
                                    required fullWidth
                                    inputProps={{style: {padding: 12}}}
                                />
                            </div>
                            <div className="col-xl-6 mb-3">
                                <OutlinedInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="E-mail" 
                                    onChange={(e) => setEmail(e.target.value)}
                                    required fullWidth
                                    inputProps={{style: {padding: 12} } }
                                />
                            </div>
                
                            <br/>
                                      
                
                        
                            <br/>
                
                            <div className="col-xl-6 mb-3">
                                <InputLabel id="demo-mutiple-chip-label">Research Field</InputLabel>
                                    <Select
                                        id="demo-mutiple-chip"
                                        multiple fullWidth
                                        value={fields}
                                        onChange={handleFieldChange}
                                        input={<Input id="select-multiple-chip"/>}
                                        renderValue={(selected) => (
                                            <div >
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value}  />
                                                ))}
                                            </div>
                                        )}
                                    >
                                    {field.map((field) => (
                                        <MenuItem key={field} value={field} >
                                            {field}
                                        </MenuItem>
                                    ))}
                                    </Select>
                            </div>

                            <br/>
                
                            <div className="col-xl-6 mb-3">
                                <OutlinedInput
                                    type="tel"
                                    name="phoneNo"
                                    id="phoneNo"
                                    placeholder="Phone Number"
                                    onChange={(e) => setPhone(e.target.value)}
                                    required fullWidth
                                    maxLength="10"
                                    inputProps={{style: {padding: 12}, pattern: "[0-9]{10}"}}
                                />
                            </div>

                            <br/>
                        
                            <div className="col-xl-6 mb-3">  
                                <div  className="form-group">
                                    <OutlinedInput
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        value={password}
                                        id="password"
                                        placeholder="Password"
                                        inputProps={{style: {padding: 12}}}
                                        required fullWidth
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 mb-3">  
                                <div className="form-group">
                                    <OutlinedInput
                                        value={confirmPassword}
                                        type="password"
                                        name="con-password"
                                        id="con-password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                        required fullWidth
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">

                            {previewSource ? 
                                <img src={previewSource} alt="preview" className="previewImg"/>
                            :
                                <img src="/images/avatar.jpg" className="previewImg" alt="profile pic"/>
                            }
                            <div className="form-group">
                                <label htmlFor="profilepic">
                                    <input
                                        style={{ display: 'none' }}
                                        id="profilepic"
                                        name="profilepic"
                                        type="file"
                                        onChange={handleFileInputChange}
                                        value={fileInputState}
                                    />

                                    <Button color="primary" variant="contained" component="span">
                                        <AddAPhotoIcon/> &nbsp; Upload Profile Picture
                                    </Button>
                                </label>
                            </div>
                    </div>
                            
                    <div className="col-xl-12">
                        <input type="submit" className="form-submit-btn" value="Register"  /> 
                    </div>
               </div> 
            </form>
        </div>

    );
}; 
export default CosupervisorSignUp;