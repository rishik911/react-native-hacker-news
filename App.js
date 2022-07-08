import React, { Component }  from "react";
import HomeScreen from "./src/modules/HomeModule/Container/HomeScreen";
import {Provider} from 'react-redux';
import store from "./src/Redux/store";
class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    ) 
  }
}

export default App