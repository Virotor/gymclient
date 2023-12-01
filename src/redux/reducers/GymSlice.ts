import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { IGym } from '../interfaces/Gym';



const initialState: GymState = {
    isLoading: false,
    searchValue: "",
    gym: {
        id : 0,
        gymNumber :  "",
        address : "",
        city : "",
    },
    Image: "",
    isLoging : false,
}

export interface GymState {
    isLoading : boolean,
    searchValue? : string,
    gym : IGym,
    isLoging : boolean,
    Image : any
}


// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// });
const headers = {
    "Content-Type": "application/json",
    
  };


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getImage: (state, login : PayloadAction<Number>) => {
            axios({
                method: 'post',
                url: 'http://localhost:8080/gym/image',
                withCredentials: false,
                data: {
                    "id": login.payload
                },
                responseType : "blob",
                headers : headers
            }).then( res =>   {
                state.Image = res.data.message
            }).catch( function(error) {
                if(error.response){
                    alert("Ошибка неверный логин или пароль")
                }else if(error.request){
                    console.log("Ошибка неверный логин или пароль")
                }
            })

        },
        getAllGym : (state) =>{

            axios({
                method: 'get',
                url: 'http://localhost:8080/gym/gym/all',
                withCredentials: false,
            }).then(function (response) {
                console.log(response);
                console.log(response.data);
            })
        }
    },
   



})

export const { getImage,getAllGym } = userSlice.actions
export default userSlice.reducer


// import React from "react";
// import ReactDOM from "react-dom";
// import axios from "axios";

// import "./styles.css";

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       dogs: [],
//       show: false,
//       buttonText: true
//     };
//   }
//   handleClick = () => {
//     axios
//       .get("https://dog.ceo/api/breed/malinois/images")
//       .then(res => {
//         console.log(res);
//         this.setState({ dogs: res.data.message });
//       })
//       .catch(err => console.log(err));
//     this.setState({
//       show: !this.state.show,
//       buttonText: !this.state.buttonText
//     });
//   };

//   render() {
//     return (
//       <div className="App">
//         <div>
//           <u className="h4 text-secondary font-italic font-weight-bold">
//             Fetching Images from api using Axios
//           </u>
//         </div>
//         <button
//           className="mt-3 btn btn-outline-success"
//           type="button"
//           onClick={this.handleClick}
//         >
//           {this.state.buttonText ? "View Images" : "Hide Images"}
//         </button>
//         <div>
//           {this.state.show &&
//             this.state.dogs.map(dog => (
//               <img
//                 className="border border-success mt-3 w-50 d-inline"
//                 src={dog}
//                 key={dog}
//                 alt="dog_images"
//               />
//             ))}
//         </div>
//       </div>
//     );
//   }
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
