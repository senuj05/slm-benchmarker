const compareAll = document.getElementById("compare-btn")
const compareInput = document.getElementById("compare-input")

async function fetchModel(model_name, user_prompt){
    const response = await fetch("http://localhost:8000/benchmark", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model_name: model_name,
            user_prompt: user_prompt
        })
    })
    const data = await response.json()
    return JSON.parse(data)
}

compareAll.addEventListener("click", async function(){
    const prompt =compareInput.value
    const [model1Data, model2Data, model3Data] = await Promise.all([
        fetchModel("mistral:latest", prompt),
        fetchModel("llama3.2:3b", prompt),
        fetchModel("phi4-mini:latest", prompt)
    ])

    // Update the UI with the fetched data for each model
    document.getElementById("model1-toks").textContent = model1Data.tokens_per_second
    document.getElementById("model1-ttft").textContent = model1Data.time_to_first_token
    document.getElementById("model1-memory").textContent = model1Data.memory_used_mb
    document.getElementById("model1-answer").textContent = JSON.parse(model1Data.raw_response).answer

    document.getElementById("model2-toks").textContent = model2Data.tokens_per_second
    document.getElementById("model2-ttft").textContent = model2Data.time_to_first_token
    document.getElementById("model2-memory").textContent = model2Data.memory_used_mb
    document.getElementById("model2-answer").textContent = JSON.parse(model2Data.raw_response).answer

    document.getElementById("model3-toks").textContent = model3Data.tokens_per_second
    document.getElementById("model3-ttft").textContent = model3Data.time_to_first_token
    document.getElementById("model3-memory").textContent = model3Data.memory_used_mb
    document.getElementById("model3-answer").textContent = JSON.parse(model3Data.raw_response).answer
})