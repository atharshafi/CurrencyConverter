import { useState } from 'react';
import './App.css';
import { Input } from './components/index.js';
import useCurrencyinfo from './hooks/useCurrencyinfo.js';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyinfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className='w-full h-screen flex flex-wrap justify-center 
    items-center bg-cover bg-no-repeat'
      style={{ backgroundImage: `url(https://images.pexels.com/photos/325154/pexels-photo-325154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`}}>
      <div className='w-full'>
      <div className='w-full max-w-md mx-auto border border-gray-60
       rounded-lg p-5 backdrop-blur-sm bg-white/30'>
        <form onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}>
          <div className='w-full mb-1'>
            <Input
              label='from'
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              onAmountChange={(amount) => setAmount(amount)}
              selectedCurrency={from}
            />
          </div>
          <div className='relative w-full h-0.5'>
          <button
            onClick={swap}
            className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2
            border-2 border-white rounded-md bg-orange-500 text-white 
            px-2 py-0.5'
          >SWAP</button>
          </div>
          <div className='w-full mb-1'>
            <Input
              label='to'
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectedCurrency={to}
              amountDisabled />
          </div>
          <button 
          type='submit'
          className='w-full bg-gray-600 text-white'>CONVERT</button>
          </form>
          </div>
      </div>
    </div>
  );
}

export default App;
