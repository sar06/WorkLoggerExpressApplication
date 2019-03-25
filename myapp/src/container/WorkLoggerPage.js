import React, { Component } from "react"
import Personal from "../component/Personal"
import Work from "../component/Work"
import axios from "axios"

class WorkLoggerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: "",
      descriptionValid: false,
      minutes: "",
      minutesValid: false,
      personal: { array: [], totalMinutes: 0 },
      work: { array: [], totalMinutes: 0 },
      project: "Personal"
    }
  }

      //   this.state.work.totalMinutes += parseInt(object.minutes)
    //   this.setState({ work: this.state.work })
  componentDidMount(){
    axios.get(`/gettasks`)
  .then((response)=>{
  
    console.log(response)
    var personallist = response.data.task.filter(item => item.project === "Personal");
    var worklist = response.data.task.filter(item => item.project === "Work");

    var totalMinutespersonal = 0
    personallist.map((item, idx) => {
    totalMinutespersonal += parseInt (item.minutes)

    })

    var totalWorklist = 0
    worklist.map((item, idx) => {
    totalWorklist += parseInt (item.minutes)
    })
    

    var personal = Object.assign({}, this.state.personal)
    personal.array = personallist
    personal.totalMinutes = totalMinutespersonal

    var work = Object.assign({}, this.state.work)
    work.array = worklist
    work.totalMinutes = totalWorklist
    this.setState({personal, work})
    // console.log(personallist)
    // console.log(worklist)
    // console.log(totalMinutespersonal)
    // console.log(totalWorklist)

    

  })
  .catch((error)=>{console.log(error)})
  }


  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value }, () => {
      if (this.state.description.length < 5) {
        this.setState({ descriptionValid: false })
      } else {
        this.setState({ descriptionValid: true })
      }
      if (parseInt(this.state.minutes) < 0 || parseInt(this.state.minutes) > 240 || this.state.minutes === "") {
        this.setState({ minutesValid: false })
      } else {
        this.setState({ minutesValid: true })
      }
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    let newtask = {
      description: this.state.description,
      minutes: this.state.minutes,
      project: this.state.project
    }

    axios
    .post(`/tasks`,newtask)
    .then((responsetwo)=>{console.log(responsetwo)
      axios.get(`/gettasks`)
      .then((response)=>{
      
        console.log(response)
        var personallist = response.data.task.filter(item => item.project === "Personal");
        var worklist = response.data.task.filter(item => item.project === "Work");
    
        var totalMinutespersonal = 0
        personallist.map((item, idx) => {
        totalMinutespersonal += parseInt (item.minutes)
    
        })
    
        var totalWorklist = 0
        worklist.map((item, idx) => {
        totalWorklist += parseInt (item.minutes)
        })
        
    
        var personal = Object.assign({}, this.state.personal)
        personal.array = personallist
        personal.totalMinutes = totalMinutespersonal
    
        var work = Object.assign({}, this.state.work)
        work.array = worklist
        work.totalMinutes = totalWorklist
        this.setState({personal, work})
        // console.log(personallist)
        // console.log(worklist)
        // console.log(totalMinutespersonal)
        // console.log(totalWorklist)
    
        
    
      })
      .catch((error)=>{console.log(error)})
    
    })
    .catch((error)=>{console.log(error)})

    // if (this.state.project === "Personal") {
    //   this.state.personal.array.push(object)
    //   this.state.personal.totalMinutes += parseInt(object.minutes)
    //   this.setState({ personal: this.state.personal })
    // } else {
    //   this.state.work.array.push(object)
    //   this.state.work.totalMinutes += parseInt(object.minutes)
    //   this.setState({ work: this.state.work })
    // }
  }


deleteitem = (id) => {
console.log(id)
axios
.delete(`/deletetask/${id}`)
.then((responsetwo)=>{console.log(responsetwo)
  axios.get(`/gettasks`)
.then((response)=>{

  console.log(response)
  var personallist = response.data.task.filter(item => item.project === "Personal");
  var worklist = response.data.task.filter(item => item.project === "Work");

  var totalMinutespersonal = 0
  personallist.map((item, idx) => {
  totalMinutespersonal += parseInt (item.minutes)

  })

  var totalWorklist = 0
  worklist.map((item, idx) => {
  totalWorklist += parseInt (item.minutes)
  })
  

  var personal = Object.assign({}, this.state.personal)
  personal.array = personallist
  personal.totalMinutes = totalMinutespersonal

  var work = Object.assign({}, this.state.work)
  work.array = worklist
  work.totalMinutes = totalWorklist
  this.setState({personal, work})
  // console.log(personallist)
  // console.log(worklist)
  // console.log(totalMinutespersonal)
  // console.log(totalWorklist)

  

})
.catch((error)=>{console.log(error)})
})
.catch((error)=>{console.log(error)})




}


  render() {
    return (
      <div className="container">
        <h1>Work Logger</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            Project{" "}
            <select id="project" onChange={this.handleChange}>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
            </select>
          </label>
          <br />
          <label>
            Description <input id="description" type="text" onChange={this.handleChange} />{" "}
            {this.state.descriptionValid === false && this.state.description !== "" ? (
              <span>Description is not valid</span>
            ) : null}
          </label>
          <br />
          <label>
            Minutes <input id="minutes" type="number" onChange={this.handleChange} />{" "}
            {this.state.minutesValid === false && this.state.minutes !== "" ? <span>Minute entry is not valid</span> : null}
          </label>
          <br />
          <button disabled={!this.state.descriptionValid || !this.state.minutesValid}>Add</button>
        </form>
        <hr />
        <div className="work-area">
          <div className="personal">
            <Personal personal={this.state.personal} delete={this.deleteitem} />
          </div>
          <div className="work">
            <Work work={this.state.work} delete={this.deleteitem} />
          </div>
        </div>
      </div>
    )
  }
}

export default WorkLoggerPage