import React from 'react'
import {
    render
} from 'react-dom'
import './utils/load-service-worker'
import App from "./containers/App"

render(<App /> , document.getElementById('app'));