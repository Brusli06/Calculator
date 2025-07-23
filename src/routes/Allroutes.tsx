import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home";
import Calculator from "../components/calculator";
import SmartCalculator from "../components/smartcalculator";
export const Allroutes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }, {
        path: "/Calculator",
        element: <Calculator />
    }, {
        path: "/SmartCalculator",
        element: <SmartCalculator/>
    }
]);