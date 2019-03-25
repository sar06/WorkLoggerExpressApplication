import React, { Component } from "react"
import "./App.css"
import WorkLoggerPage from "./container/WorkLoggerPage"

class App extends Component {
  render() {
    return (
      <div className="App">
        <WorkLoggerPage />
      </div>
    )
  }
}

export default App