const APIPath = "https://v6.exchangerate-api.com/v6/de4981cdc3ea1fe418b7c0ca/";
const codesSelectorfrom = document.getElementById("codesSelectorFrom");
const codesSelectorTo = document.getElementById("codesSelectorTo");
const amountField = document.querySelector("#amountFrom");
const exchangeResultField = document.querySelector("#exchangeResult");
//Get corrency list
const getCodes = () => {
  fetch(`${APIPath}codes`)
    .then((Response) => Response.json())
    .then((data) => {
      let optionCode = document.createElement("option");
      data.supported_codes.map((code, idx) => {
        optionCode.value = code[0];
        optionCode.textContent = code[0];
        optionCode.title = code[1];
        codesSelectorfrom.options[idx] = new Option(
          optionCode.textContent,
          optionCode.value
        );
        codesSelectorfrom.options[idx].title = optionCode.title;
        codesSelectorTo.options[idx] = new Option(
          optionCode.textContent,
          optionCode.value
        );
        codesSelectorTo.options[idx].title = optionCode.title;
      });
    });
};

window.onload = getCodes();

//Do exchange
const formButton = document.querySelector("#formButton");

formButton.addEventListener("click", (e) => {
  e.preventDefault();
  let amountFrom = amountField.value;
  let fromCode = codesSelectorFrom.value;
  let toCode = codesSelectorTo.value;

  fetch(`${APIPath}pair/${fromCode}/${toCode}/${amountFrom}`)
    .then((response) => response.json())
    .then((data) => {
      let result = data.conversion_result;
      exchangeResultField.innerHTML = `${result}`;
    });
});
