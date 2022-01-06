import './App.css';
import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import ProfilePage from "./HomePage";
import {Route} from "react-router";
import NavigationBar from "./NavigationBar";
import LoginPage from "./LoginPage";
import Cookies from "universal-cookie";
import FollowedPage from "./Search";
import FollowedPage from "./Settings";
import FollowedPage from "./StoresList";

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
                        <Route path={"/"} component={homePage} exact={true}/>
                        <Route path={"/home-page"} component={homePage} exact={true}/>
                        <Route path={"/Stores-List"} component={StoresList} exact={true}/>
                        <Route path={"/search"} component={search} exact={true}/>
                        <Route path={"/settings"} component={settings} exact={true}/>
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
