import React from 'react';
import './App.css';

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={BurgerBuilder}/>
                        <Route path='/checkout' component={Checkout}/>
                    </Switch>
                </Layout>
            </BrowserRouter>
        </div>
    );
};

export default App;
