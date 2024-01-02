import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [currencies, setCurrencies] = useState([]);
    const [sourceCrypto, setSourceCrypto] = useState('');
    const [amount, setAmount] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3001/api/currencies')
            .then(response => setCurrencies(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleConvert = () => {
        if (sourceCrypto && amount) {
            axios.get('http://localhost:3001/api/convert', {
                params: {
                    sourceCrypto,
                    amount,
                    targetCurrency,
                },
            })
                .then(response => setConvertedAmount(response.data.convertedAmount))
                .catch(error => console.error(error));
        }
    };

    return (
        <div className="App">
            <h1>Crypto Converter</h1>
            <form>
                <label>
                    Source Cryptocurrency:
                    <select value={sourceCrypto} onChange={(e) => setSourceCrypto(e.target.value)}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Amount:
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </label>
                <br />
                <label>
                    Target Currency:
                    <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        {/* Add more currencies if needed */}
                    </select>
                </label>
                <br />
                <button type="button" onClick={handleConvert}>
                    Convert
                </button>
            </form>
            <h1>helo:{convertedAmount}</h1>
            {convertedAmount !== null && (
                <p style={{color:"black"}}>
                    Converted Amount: {convertedAmount} {targetCurrency}
                </p>
            )}
        </div>
    );
}

export default App;


