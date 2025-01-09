function generateQuote() {
  let apiKey, prompt, context, apiUrl;
  apiKey = `2d8o4b96bdta6ee065c85fc43853285d`;
  apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt={prompt}&context={context}&key={key}`;
}

let motivateButtonElement = document.querySelector("button");
motivateButtonElement.addEventListener("click", generateQuote);
