import * as React from "react";
import { render } from "react-dom";
import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer
} from "@react-firebase/auth";
import * as firebase from "firebase/app";
import { config } from "./test-credentials";    

const App = () => {
    return (
        <div>
            <FirebaseAuthConsumer>
                {({ isSignedIn, user, providerId }) =>

                    isSignedIn === true ?

                         <Switch>
                            <Route exact path="/" component={Your Component} />
                         </Switch>
                        : <Switch>
                            <Route exact path="/signIn" component={Login} />
                        </Switch>

                } </FirebaseAuthConsumer>
        </div>
    );
};

render(<App />, document.getElementById("root"));