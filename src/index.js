import React from 'react';
import { createRoot } from "react-dom/client"
import { BrowserRouter } from 'react-router-dom'
import "./reset.css"
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Main'

const rootEle = document.getElementById("root")
const root = createRoot(rootEle)

root.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>
)