import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
    const [currencies, setCurrencies] = useState([]);
    const [sourceCrypto, setSourceCrypto] = useState('');
    const [amount, setAmount] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState(null);

    useEffect(() => {
        axios.get('https://currancy-converter.onrender.com/api/currencies')
            .then(response => setCurrencies(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleConvert = () => {
        if (sourceCrypto && amount) {
            axios.get('http://currancy-converter.onrender.com/api/convert', {
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
            <div className='innerbox-app'>
                <h1>Crypto Converter</h1>
                <form>
                    <label className='label'>
                        Source Cryptocurrency:
                        <select value={sourceCrypto} onChange={(e) => setSourceCrypto(e.target.value)}>
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className='label'>
                        Amount:
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </label>
                    <label className='label'>
                        Target Currency:
                        <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            {/* Add more currencies if needed */}
                        </select>
                    </label>
                    <br />
                    <button type="button" onClick={handleConvert} className='bttn'>
                        Convert
                    </button>
                </form>
                {convertedAmount !== null && (
                    <p>
                        Converted Amount: {convertedAmount} {targetCurrency}
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;


