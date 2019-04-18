import React from "react";
import "../../public/assets/scss/App.scss"
import img from "../../public/assets/images/react.svg"

const App = () => (
    <div>
        <figure>
            <img className="reactIcon" src={img} alt="React JS"/>
        </figure>
        <h1>Hola mundo cruel!</h1>
    </div>
)

export default App;