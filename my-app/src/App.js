import './App.css';
import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import ProfilePage from "./ProfilePage";
import PostsPage from "./PostsPage";
import {Route} from "react-router";
import NavigationBar from "./NavigationBar";
import LoginPage from "./LoginPage";
import Cookies from "universal-cookie";
import FollowedPage from "./FollowedPage";
import FollowedProfilePage from "./FollowedProfilePage";

class App extends React.Component {

  state = {
    isLoggedIn: false,
    token : "",
    newUser: false
  }

  componentDidMount() {
    const cookies = new Cookies();
    if (cookies.get("logged_in")) {
      this.setState({
        isLoggedIn: true,
        token : cookies.get("logged_in")
      })
    }

    axios.get("http://127.0.0.1:8989/check_if_new_user",{
      params:{
        username:this.state.username
      }
    }).then((response) => {
      this.setState({
        newUser: response.data
      })
    })
  }

  render() {
    return (
        <div>
          <BrowserRouter>
            {
              this.state.isLoggedIn ?
                  this.state.newUser?
                      <Route path={"/"} component={settings}/>
                      :
                      <div style={{display: "flex", alignItems: "start", marginTop: "50px"}}>
                        <NavigationBar/>
                        <Route path={"/"} component={ProfilePage} exact={true}/>
                        <Route path={"/profile"} component={ProfilePage} exact={true}/>
                        <Route path={"/posts"} component={PostsPage} exact={true}/>
                        <Route path={"/followed"} component={FollowedPage} exact={true}/>
                        <Route path={"/user/:userId"} component={FollowedProfilePage}/>
                      </div>

                  :
                  <div>
                    <Route path={"/"} component={LoginPage}/>
                  </div>
            }
          </BrowserRouter>
        </div>
    )
  }

}

export default App;
