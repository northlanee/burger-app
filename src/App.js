import React from 'react';
import './App.css';

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={BurgerBuilder}/>
                        <Route path='/checkout' component={Checkout}/>
                        <Route path='/orders' component={Orders}/>
                    </Switch>
                </Layout>
            </BrowserRouter>
        </div>
    );
};

export default App;
