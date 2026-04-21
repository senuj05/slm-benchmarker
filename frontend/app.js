const chatInput = document.getElementById("chat-input")
const sendButton =document.getElementById("send-btn")
const chatMessages = document.getElementById("chat-messages")

// Add event listener to the send button
// create a new message element with the input value,then append it to the chat messages container

sendButton.addEventListener("click", async function(){
    const newMessage = document.createElement("div")
    newMessage.innerHTML =`<div class="message-avatar">you</div><div class="message-body"><p>${chatInput.value}</p></div>`
    chatMessages.appendChild(newMessage)

    // loading state for the ai response
    const loadingMessage = document.createElement("div")
    loadingMessage.id = "loading-msg"
    loadingMessage.innerHTML =  `<img src="images/loading.gif" width="60" />`
    chatMessages.appendChild(loadingMessage)

    const response = await fetch("http://localhost:8000/benchmark", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model_name: selectModel,
            user_prompt: chatInput.value
        })
    })
    const data = await response.json()
    // Displaying the AI reply in the chat interface
    // console.log(data)
    const dataObj =JSON.parse(data)
    const parsed = JSON.parse(dataObj.raw_response)
    const tokens_per_second = document.getElementById("metric-toks")
    const ttft = document.getElementById("metric-ttft")
    const memory = document.getElementById("metric-memory") 
    // update the metrics in the ui with the actual stats from the response
    tokens_per_second.textContent = dataObj.tokens_per_second
    ttft.textContent = dataObj.time_to_first_token
    memory.textContent = dataObj.memory_used_mb

    const aiMessage =document.createElement("div")
    aiMessage.innerHTML = `<div class="message-avatar">AI</div><div class="message-body"><p>${parsed.answer}</p></div>`
    chatMessages.appendChild(aiMessage)

    // remove the loading gif when the ai reply appears
    document.getElementById("loading-msg").remove()
    // testing purposes: console.log(data)
    chatInput.value =""
})

// Add event listener to the other model selections
let selectModel = ""

document.querySelectorAll('.nav-item').forEach((model)=>{
    model.addEventListener('click',() =>{
        selectModel = model.querySelector("p").textContent;
        // test: console.log(selectModel)
        // Adding the active model name to the top bar when the model is selected
        const activeModelName = document.getElementById("active-model-name")
        activeModelName.textContent =selectModel
    });
});

// Add event listern to the new run button to clear the chat and reset the stats
const newRunBtn = document.getElementById("new-run-btn")
newRunBtn.addEventListener("click",function(){
    chatMessages.innerHTML =""
    const tokens_per_second = document.getElementById("metric-toks")
    const ttft = document.getElementById("metric-ttft")
    const memory = document.getElementById("metric-memory")
    tokens_per_second.textContent = 0
    ttft.textContent = 0
    memory.textContent =0

})


// check the status
async function checkStatus(){
    const url = "http://localhost:8000/"
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }
        await response.json();
        document.getElementById("ollama-icon").style.background = "#22c55e"
    } catch (error) {
        document.getElementById("ollama-icon").style.background = "#ef4444"
    }
}

checkStatus()
setInterval(checkStatus, 5000)
