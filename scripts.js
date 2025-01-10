// const res = require("express/lib/response");

function generateQuote() {
  let apiKey, prompt, context, apiUrl;
  apiKey = `2d8o4b96bdta6ee065c85fc43853285d`;
  context = `Imagine you are a motivational speaker, You share motivational quotes which inspires or motivates them emotionally,socially and physically to grow and live a happy and peaceful life also don't use "" these marks in the reply and should be of 4-5 lines only, tells only one quote at a time`;
  prompt = `Share a motivational quote with me`;
  apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;
  axios.get(apiUrl).then((response) => {
    document.querySelector(".quote-section .author-name").innerHTML="";

    let newQuote = response.data.answer;
    new Typewriter(".new-quote", {
      strings: `${newQuote}`,
      autoStart: true,
      speed: 100,
      cursor: "",
    });
    

    let newContext = `Imagine you are a motivational speaker, who is very Intelligent and knows the name of all the authors of the motivational quotes, replies with the name of the author only in two or three words if he doesn't know about the author name just writes Unknown instead `;
    let newPrompt = `Who wrote this quote: " ${newQuote}"?`;
    let newApiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${newPrompt}&context=${newContext}&key=${apiKey}`;
    axios.get(newApiUrl).then((reply) => {
      let authorName = reply.data.answer;
      
      new Typewriter(".author-name", {
        strings: `${authorName}`,
        autoStart: true,
        speed: 100,
        cursor: "",
        pauseFor: 3000,
      });
    });
  });
}

let motivateButtonElement = document.querySelector("button");
motivateButtonElement.addEventListener("click", generateQuote);
