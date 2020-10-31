import React from "react";
import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { SignUp } from "./components/SignUp/SignUp";
import { SignIn } from "./components/SignIn/SignIn";
import { Courses } from "./components/courses/Courses";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { VideoPlayer } from "./components/VideoPlayer/VideoPlayer";
import { Profile } from "./components/Profile/Profile";

function App() {
  let location = useLocation();

  return (
    <Provider store={store}>
      <Header />
      <TransitionGroup>
        <CSSTransition timeout={500} classNames="fade" key={location.key}>
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup/:type" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/videoplayer" component={VideoPlayer} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Provider>
  );
}

export default App;
