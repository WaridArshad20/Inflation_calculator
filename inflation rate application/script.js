function updateAmountInWords() {
  const amount = parseFloat(document.getElementById("amount").value);
  const amountInWordsElement = document.getElementById("amountInWords");

  if (isNaN(amount) || amount <= 0) {
    amountInWordsElement.textContent = "";
  } else {
    amountInWordsElement.textContent = numberToWords(amount);
  }
}

function numberToWords(number) {
  const words = ["", "thousand", "lac", "crore"];
  let wordRepresentation = "";
  if (number >= 10000000) {
    wordRepresentation = (number / 10000000).toFixed(2) + " " + words[3];
  } else if (number >= 100000) {
    wordRepresentation = (number / 100000).toFixed(2) + " " + words[2];
  } else if (number >= 1000) {
    wordRepresentation = (number / 1000).toFixed(2) + " " + words[1];
  }
  return wordRepresentation;
}

function calculateFutureValue() {
  // Clear previous error messages
  document.getElementById("amountError").style.display = "none";
  document.getElementById("inflationRateError").style.display = "none";
  document.getElementById("yearsError").style.display = "none";

  const amount = parseFloat(document.getElementById("amount").value);
  const inflationRate =
    parseFloat(document.getElementById("inflationRate").value) / 100;
  const years = parseInt(document.getElementById("years").value);

  let isValid = true;

  // Validate input fields
  if (isNaN(amount) || amount <= 0) {
    document.getElementById("amountError").style.display = "block";
    document.getElementById("amountError").textContent =
      "Please enter a valid amount.";
    isValid = false;
  }

  if (isNaN(inflationRate) || inflationRate <= 0) {
    document.getElementById("inflationRateError").style.display = "block";
    document.getElementById("inflationRateError").textContent =
      "Please enter a valid inflation rate.";
    isValid = false;
  }

  if (isNaN(years) || years <= 0) {
    document.getElementById("yearsError").style.display = "block";
    document.getElementById("yearsError").textContent =
      "Please enter a valid number of years.";
    isValid = false;
  }

  if (isValid) {
    const futureValue = amount / Math.pow(1 + inflationRate, years);
    const amountInWords = numberToWords(amount);
    const futureValueInWords = numberToWords(futureValue);
    const resultElement = document.getElementById("result");

    resultElement.textContent = `The future value of ${amount.toLocaleString(
      "en-PK",
      { style: "currency", currency: "PKR" }
    )} (${amountInWords}) after ${years} years, adjusted for an inflation rate of ${(
      inflationRate * 100
    ).toFixed(2)}%, is approximately ${futureValue.toLocaleString("en-PK", {
      style: "currency",
      currency: "PKR",
    })} (${futureValueInWords}).`;
  }
}
