import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { SignUp } from "./components/SignUp/SignUp";
import { SignIn } from "./components/SignIn/SignIn";
import { Courses } from "./components/courses/Courses";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function App() {
  let location = useLocation();

  return (
    <>
      <Header />
      <TransitionGroup>
        <CSSTransition timeout={500} classNames="fade" key={location.key}>
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/courses" component={Courses} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
