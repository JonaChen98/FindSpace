import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Navbar from '../components/navbar';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Footer from '../components/footer';
import axios from 'axios';
import '../styles/profilesetup.css';


const ProfileSetupStudent = () => {
  const history = useHistory();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
  const [age, setAge] = useState(0);
  

  // onChange = (e) => {
  //   /*
  //     Because we named the inputs to match their
  //     corresponding values in state, it's
  //     super easy to update the state
  //   */
  //   this.setState({ [e.target.name]: e.target.value });
  // }

  // signUp = (e) => {
  //   e.preventDefault();
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [major, setMajor] = useState("");
    // const [age, setAge] = useState(0);
    
  //   axios.post('/api/register-student', {
  //       name: this.state.name, 
  //       password: this.state.password, 
  //       age: this.state.age, 
  //       school_email: this.state.email, 
  //       major: this.state.major
  //     })
  //     .then(res => {
  //       localStorage.setItem("studentInfo", JSON.stringify(res.data.student));
  //      // history.push('/student-dashboard');
  //     })
  //     .catch((err) => {
  //       console.log("Error");
  //     })
  // }

  // const validate = () => {
  //   let nameError = "";
  //   let emailError = "";
  //   let passwordError = "";
  //   let ageError = "";
  //   let majorError = "";

  //   if (name) {
  //     nameError = "Please enter your first and last name.";
  //   }

  //   if (email.includes(".edu")){
  //     emailError = "invalid email";
  //   }
  //   if (isNaN(age)){
  //     ageError = "Enter a number.";
  //   }
    
  //   if (password.length < 8){
  //     passwordError = "Password must be 8 characters";
  //   }

  //   if (emailError || nameError || passwordError|| ageError || majorError) {
      
      
  //     this.setState({ emailError, nameError, passwordError, 
  //       ageError, majorError });
        
  //     return false;
  //   }

  //   return true;
  // };

  
  const handleSubmit = event => {
    event.preventDefault();
    // const isValid = this.validate();
    
    const registerStudent = async () => {
      const res = await axios.post("/api/register-student", {
        name: name, 
        password: password, 
        age: age, 
        school_email: email, 
        major: major
      });
      console.log(res.data.student);
      localStorage.setItem("studentInfo", JSON.stringify(res.data.student));
      history.push('/student-dashboard');
    }
    
    registerStudent();
      
    // if (isValid) {
    //   console.log(this.state);
    //   // clear form
    //   this.setState(initialState);
    //   // console.log(this.state.name);
    //   axios.post('/api/register-student', {
    //           name: state.name, 
    //           password: state.password, 
    //           age: state.age, 
    //           school_email: state.email, 
    //           major: state.major
    //         })
    //         .then(res => {
    //           localStorage.setItem("studentInfo", JSON.stringify(res.data.student));
    //          history.push('/student-dashboard');
    //         })
    //         .catch((err) => {
    //           console.log("Error");
    //         })
      
    // }
  };


    return (
    <div>
      <Navbar/>
        <div  className="center">
          <form onSubmit={handleSubmit} className="form">
            <div>
            <label> Full Name: </label>
              <TextField
                name="name"
                placeholder="name"
                // value={state.name}
                onChange={event => setName(event.target.value)}
              />
              {/* <div style={{ fontSize: 12, color: "red" }}>
                {state.nameError}
              </div> */}
            </div>

            <div className="text-field">
              <h4> Age: </h4>
              <TextField 
                label="Required*"
                name="age"
                placeholder="age"
                // value={state.age}
                onChange={event => setAge(event.target.value)}
                
              />
              
              {/* <div style={{ fontSize: 12, color: "red" }}> */}
                {/* {state.ageError} */}
              {/* </div> */}
            </div>

            <div>
            <label> Major: </label>
            <TextField
                name="major"
                placeholder="major"
                // value={state.major}
                onChange={event => setMajor(event.target.value)}
              />
              {/* <div style={{ fontSize: 12, color: "red" }}>
                {state.majorError}
              </div> */}
            </div>
            <div>
            <TextField
                name="email"
                fullWidth
                placeholder="email"
                // value={state.email}
                onChange={event => setEmail(event.target.value)}
              />
              {/* <div style={{ fontSize: 12, color: "red" }}>
                {state.emailError}
              </div> */}
            </div>
            <div>
            <TextField
                type="password"
                name="password"
                placeholder="password"
                // value={state.password}
                onChange={event => setPassword(event.target.value)}
              />
              {/* <div style={{ fontSize: 12, color: "red" }}>
                {state.passwordError}
              </div> */}
            </div>
            <div>
              <h4> Briefly describe yourself</h4>
                  <TextField id="standard-basic" variant="outlined" />
              <h4> What do you intend to use the desk space if given?</h4>
                  <TextField id="standard-basic" variant="outlined" />
            </div>
            <Button variant="contained" type="submit" color="primary" style={{justifyContent: "center", alignItems: "center"}}>
                Submit
            </Button>
          </form>
        </div>
      
        
      {/* <Footer/> */}
      
    </div>
      
    );
}

// function ProfileSetupStudent() {
//   // const classes = useStyles();
  
//   const history = useHistory();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [major, setMajor] = useState("");
//   const [age, setAge] = useState(0);



//   return (
//     <div>
//       <Navbar/>
      
//       <div className="center">

//       <div>
//         <h1 style={{textAlign:"center"}}> Tell us about yourself.</h1>
//         <form onSubmit=noValidate autoComplete="off">
  
//             <h4> Full Name: </h4>
//             <TextField required id="standard-required" name="checkname" label="required" onChange={event => setName(event.target.value)}/>
//             <h4> Age: </h4>
//             <TextField required id="margin-none" onChange={event => setAge(event.target.value)}/>
//             <h4> School Email: </h4>
//             <TextField required id="margin-none" onChange={event => setEmail(event.target.value)}/>
//             <h4> Password: </h4>
//             <TextField id="margin-none" onChange={event => setPassword(event.target.value)}/>
//             <h4> School Name: </h4>
//             <TextField id="margin-none"/>
//             <h4> Major: </h4>
//             <TextField id="margin-none" onChange={event => setMajor(event.target.value)}/>
//         </form>
//       </div>
    
//     <div>
//       <form noValidate autoComplete="off" style={{margin: "auto", width: "50%", padding: "10px"}}>
//         <h4> Briefly describe yourself</h4>
//           <TextField id="standard-basic" variant="outlined" />
//         <h4> What do you intend to use the desk space if given?</h4>
//           <TextField id="standard-basic" variant="outlined" />

//         <Button variant="contained" type="submit" color="primary" onClick={(e) => signUp(e)} style={{justifyContent: "center", alignItems: "center"}}>
//             Submit
//         </Button>
//       </form>
//     </div>
//     </div>
//     <hr/>
//     <Footer/>
    
//     </div>
//   );
          
// };

export default ProfileSetupStudent;