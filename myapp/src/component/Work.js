import React from "react"

const Work = (props) => {
  return (
    <div>
      <h1>Work</h1>
      {props.work.array
        .sort((a, b) => {
          return b.minutes - a.minutes
        })
        .map((item, idx) => {
          return (
            <div key={idx} id={item.id} onClick={()=>{props.delete(item.id)}}>
              <div>{props.work.totalMinutes}</div>
              <p>
                {item.minutes} - {item.description}
              </p>
            </div>
          )
        })}
    </div>
  )
}

export default Work