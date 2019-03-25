const express = require("express");
const app = express();


const axios = require("axios");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static("./../myapp/build/"))

app.post(`/tasks`, (request, response) => {
axios.post(`http://5c9918ba423656001439320c.mockapi.io/tasks`,request.body)
.then((res)=>{
    console.log(res)
    response.json({status: true})
})
.catch((error)=>{console.log(error)})
console.log(request.body)
})

app.get(`/gettasks`, (request, response)=> {
axios.get(`http://5c9918ba423656001439320c.mockapi.io/tasks`)
.then((res)=>{
    response.json({
        status: true,
        task: res.data
    })
})
.catch((error)=>{console.log(error)})

})

app.delete(`/deletetask/:id` , (request, response)=> {
    console.log("hello")
    console.log(request.params.id)

    axios.delete(`http://5c9918ba423656001439320c.mockapi.io/tasks/${request.params.id}`)
    .then((res)=>{
    res.json({status: true})

    })
    .catch((error)=>{console.log(error)})
})


// app.get(`/score/:username`, 
//     auth,
//     test, 
//     (request, response, next) => { }, 
//     (request, response, next) => { },
// );



// app.get(`/score/:username`, (request, response) => {
//     const username = request.params.username;

//     axios
//     .get(`https://api.github.com/users/${username}`)
//     .then( (githubResponse) => {
//         const userScore = githubResponse.data.followers + githubResponse.data.public_repos;
//         const username = githubResponse.data.login;
        
//         axios.post(`http://5c98ee2d42365600143931b8.mockapi.io/score`, {score: userScore, username: username})
//         .then( (mockApiResponse) => {
            
//             axios.get(`http://5c98ee2d42365600143931b8.mockapi.io/score`)
//             .then( (mockApiRecords) => {

//                 return response.json({
//                     status: true,
//                     score: userScore,
//                     history: mockApiRecords.data
//                 })
//             })
//         })

        
    // })
    // axios
    // .get(`https://api.github.com/users/${username}`)
    // .then( (githubResponse) => {
    //     const userScore = githubResponse.data.followers + githubResponse.data.public_repos;
    //     const username = githubResponse.data.login;
        
    //     axios
    //     .post(`http://5c98ee2d42365600143931b8.mockapi.io/score`, {score: userScore, username: username})
    //     .then( (mockApiResponse) => {
    //         return axios.get(`http://5c98ee2d42365600143931b8.mockapi.io/score`)
    //     })
    //     .then( (mockApiRecords) => {
    //         return response.json({
    //             status: true,
    //             score: userScore,
    //             history: mockApiRecords.data
    //         })
    //     })
    //     .catch(errorHandler)
        
        
    // })

// })

app.listen(1337);