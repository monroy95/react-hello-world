import React from "react";
import "../assets/scss/App.scss"
import img from "../assets/images/react.svg"

const App = () => (
    <div>
        <figure>
            <img className="reactIcon" src={img} alt="React JS"/>
        </figure>
        <h1>Hola mundo cruel!</h1>
    </div>
)

export default App;