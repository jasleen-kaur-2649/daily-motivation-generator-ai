// const res = require("express/lib/response");

function generateQuote(event) {
  event.preventDefault();
  let apiKey, quoteTopic, prompt, context, apiUrl;
  quoteTopic = document.querySelector("#quote-topic").value;
  document.querySelector(".quote-section .author-name").innerHTML = "";
  // console.log(quoteTopic);
  if (!quoteTopic) {
    context = `Imagine you are a motivational speaker, You share motivational quotes which inspires or motivates them emotionally,socially and physically, mentally to grow and live a happy and peaceful life also don't use "" these marks in the reply and should be of 4-5 lines only, tells only one quote at a time`;
    prompt = `Share a motivational quote with me`;
  } else {
    context = `Imagine you are a motivational speaker, You share motivational quotes which inspires or motivates them emotionally,socially and physically, mentally to grow and live a happy and peaceful life also don't use "" these marks in the reply and should be of 3-4 lines only NOT MORE THAN 4 , and tells quote related to the topic suggested by the user, don't forget to follow the user's instructions.`;
    prompt = `User's Topic: Generate a motivational quote on ${quoteTopic}`;
  }

  apiKey = `2d8o4b96bdta6ee065c85fc43853285d`;
  apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let hyphen = document.querySelector(".hyphen");
  hyphen.innerHTML = "";

  let quoteSection = document.querySelector(".quote-section");
  quoteSection.querySelector(".left").classList.add("hidden");
  quoteSection.querySelector(".right").classList.add("hidden");
  quoteSection.querySelector(
    ".new-quote"
  ).innerHTML = `<div class="blink-text">⏳generating a quote on ${quoteTopic}...</div>`;

  axios.get(apiUrl).then((response) => {
    // response.preventDefault();
    let newQuote = response.data.answer;

    quoteSection.querySelector(".left").classList.remove("hidden");
    quoteSection.querySelector(".right").classList.remove("hidden");

    new Typewriter(".new-quote", {
      strings: `${newQuote}`,
      autoStart: true,
      speed: 100,
      cursor: "",
    });

    if (!quoteTopic) {
      let newContext = `Imagine you are a motivational speaker, who is very Intelligent and knows the name of all the authors of the motivational quotes, replies with the name of the author only in two or three words if he doesn't know about the author name just writes Unknown instead `;
      let newPrompt = `Who wrote this quote: " ${newQuote}"?`;
      let newApiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${newPrompt}&context=${newContext}&key=${apiKey}`;

      axios.get(newApiUrl).then((reply) => {
        hyphen.innerHTML = "- ";
        let authorName = reply.data.answer;

        new Typewriter(".author-name", {
          strings: `${authorName}`,
          autoStart: true,
          speed: 70,
          cursor: "",
          pauseFor: 4000,
        });
      });
    }
  });
}

let motivateButtonElement = document.querySelector("#generate-quote-button");
motivateButtonElement.addEventListener("click", generateQuote);
