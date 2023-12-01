import React, { PureComponent, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";



export  const Gym : React.FC = () => {


    const [gyms, setGyms ] = useState([])
    const [show, setShow] = useState(false)
    const [buttonText, setbuttonText] = useState(true)

    const handleClick = () => {
        setGyms([])
        setShow(!show)
        setbuttonText(!buttonText)
      };



      


      return (
        <div className="App">
          <div>
            <u className="h4 text-secondary font-italic font-weight-bold">
              Fetching Images from api using Axios
            </u>
          </div>
          <button
            className="mt-3 btn btn-outline-success"
            type="button"
            onClick={handleClick}
          >
            {buttonText ? "View Images" : "Hide Images"}
          </button>
          <div>
            {show &&
              gyms.map(gym => (
                <img
                  className="border border-success mt-3 w-50 d-inline"
                  src={gym}
                  key={gym}
                  alt="dog_images"
                />
              ))}
          </div>
        </div>
      );
}



  