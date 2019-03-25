import React from "react"

const Personal = (props) => {
  return (
    <div>
      <h1>Personal {props.personal.totalMinutes}</h1>
      {props.personal.array
        .sort((a, b) => {
          return b.minutes - a.minutes
        })
        .map((item, idx) => {
          return (
            <div key={idx} id={item.id} onClick={()=>{props.delete(item.id)}}>
              <p>
                {item.minutes} - {item.description}
              </p>
            </div>
          )
        })}
    </div>
  )
}

export default Personal