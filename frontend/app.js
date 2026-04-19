const chatInput = document.getElementById("chat-input")
const sendButton =document.getElementById("send-btn")
const chatMessages = document.getElementById("chat-messages")

// Add event listener to the send button

sendButton.addEventListener("click", function(){
    const newMessage = document.createElement("div")
    newMessage.innerHTML =`<div class="message-avatar">you</div><div class="message-body"><p>${chatInput.value}</p></div>`
    chatMessages.appendChild(newMessage)
    chatInput.value =""
})

