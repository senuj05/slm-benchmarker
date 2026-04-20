const chatInput = document.getElementById("chat-input")
const sendButton =document.getElementById("send-btn")
const chatMessages = document.getElementById("chat-messages")

// Add event listener to the send button
// create a new message element with the input value,then append it to the chat messages container

sendButton.addEventListener("click", async function(){
    const newMessage = document.createElement("div")
    newMessage.innerHTML =`<div class="message-avatar">you</div><div class="message-body"><p>${chatInput.value}</p></div>`
    chatMessages.appendChild(newMessage)
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
    const aiMessage =document.createElement("div")
    aiMessage.innerHTML = `<div class="message-avatar">AI</div><div class="message-body"><p>${parsed.answer}</p></div>`
    chatMessages.appendChild(aiMessage)
    // testing purposes: console.log(data)
    chatInput.value =""
})

// Add event listener to the other model selections
let selectModel = ""

document.querySelectorAll('.nav-item').forEach((model)=>{
    model.addEventListener('click',() =>{
        selectModel = model.querySelector("p").textContent;
        // test: console.log(selectModel)
    });
});

