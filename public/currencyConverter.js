const exchangeRates = {
    AUD: 1.531863,
    CAD: 1.36029,
    CLP: 950.662057,
    CNY: 7.128404,
    EUR: 1.03203,
    GBP: 0.920938,
    INR: 81.255504,
    JPY: 143.376504,
    RUB: 57.875038,
    ZAR: 17.92624,
    USD: 1
};

const currencySymbols = {
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    CLP: "Chilean Peso",
    CNY: "Chinese Yuan",
    EUR: "Euro",
    GBP: "British Pound Sterling",
    INR: "Indian Rupee",
    JPY: "Japanese Yen",
    RUB: "Russian Ruble",
    USD: "United States Dollar",
    ZAR: "South African Rand"
};

// Utility to check if the provided currency code is valid
function isValidCurrencyCode(code) {
    return exchangeRates[code];
}

// Populate the conversion result
function displayResult(amount, convertedValue, fromCurrency, toCurrency) {
    const resultElement = document.getElementById("conversion-result");
    const fromCurrencyName = currencySymbols[fromCurrency] || fromCurrency;
    const toCurrencyName = currencySymbols[toCurrency] || toCurrency;

    resultElement.textContent = `${amount} ${fromCurrencyName} = ${convertedValue.toFixed(2)} ${toCurrencyName}`;
}

function populateTable(amount, convertedValue, fromCurrency, toCurrency, tableId) {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = ""; // Clear existing rows

    const increments = [1, 10, 20, 50, 100];
    increments.forEach((increment) => {
        const row = document.createElement("tr");
        const incrementedValue = (increment * convertedValue) / amount;

        row.innerHTML = `
            <td>${increment} ${fromCurrency}</td>
            <td>${incrementedValue.toFixed(2)} ${toCurrency}</td>
        `;
        tableBody.appendChild(row);
    });
}

function convertCurrency(event) {
    event.preventDefault(); 

    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (!isValidCurrencyCode(fromCurrency) || !isValidCurrencyCode(toCurrency)) {
        alert("Invalid currency code.");
        return;
    }

    // Convert to USD first, then to the target currency
    const usdValue = fromCurrency === "USD" ? amount : amount / exchangeRates[fromCurrency];
    const convertedValue = toCurrency === "USD" ? usdValue : usdValue * exchangeRates[toCurrency];

    
    updateHeadings(fromCurrency, toCurrency);

    populateTable(amount, convertedValue, fromCurrency, toCurrency, "table-from-to");
    
    populateTable(amount, convertedValue, toCurrency, fromCurrency, "table-to-from");

    document.querySelector(".results").classList.add("visible");
}

// Swap the "From" and "To" currencies
function swapCurrencies() {
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");

    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
}

// Event listeners
document.getElementById("currency-form").addEventListener("submit", convertCurrency);
document.getElementById("switch").addEventListener("click", swapCurrencies);

function updateHeadings(fromCurrency, toCurrency) {
    const fromToHeading = document.getElementById("heading-from-to");
    const toFromHeading = document.getElementById("heading-to-currency");

    fromToHeading.textContent = `From ${fromCurrency} to ${toCurrency}`;
    toFromHeading.textContent = `From ${toCurrency} to ${fromCurrency}`;
}