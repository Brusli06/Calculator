import { useState } from 'react'
import { Keyboard } from '../UI/Keyboard'
import { evaluate, nthRoot, sqrt, pow, type MathType } from 'mathjs'

const calculator = () => {

  const [operation, setOperation] = useState('');
  const [overwrite, setOverwrite] = useState(true);
  const [equal, setEqual] = useState(false);
  const [expression, setExpression] = useState('');
  const [displayExpression, setDisplayExpression] = useState('0');
  const [cursor, setCursor] = useState(0);
  const [shift, setShift] = useState(false);

  const setDigit = (digit: string) => {
    if (
      (displayExpression[0] === '0' && (digit === '0' || digit === '00' || digit.includes('^'))) ||
      (displayExpression.includes('.') && digit === '.')
    ) {
      return;
    }
    let updatedExpression = '';
    if (overwrite) {
      updatedExpression = digit;
      setCursor(digit.length);
    } 
    else {
      const before = displayExpression.slice(0, cursor);
      const after = displayExpression.slice(cursor);
      updatedExpression = before + digit + after;
      setCursor(cursor + digit.length); 
    }
    setDisplayExpression(updatedExpression);
    setExpression(updatedExpression);
    setOverwrite(false);
    setEqual(false);
  };

  function normalizeExpression(expresie: string): string {
    return expresie
      .replace(/π/g, 'pi')
      .replace(/∛(\([^()]*\)|\d+(\.\d+)?)/g, 'nthRoot($1, 3)')
      .replace(/(\d+)ⁿ√(\([^()]*\)|\d+(\.\d+)?)/g, 'nthRoot($2, $1)')
      .replace(/√(\([^()]*\)|\d+(\.\d+)?)/g, 'sqrt($1)')
      .replace(/(\d+)log(\([^()]*\)|\d+(\.\d+)?)/g, 'log($2, $1)')
      .replace(/ln([a-zA-Z0-9.]+)/g, 'log($1)')
      .replace(/ln\(([^)]+)\)/g, 'log($1)')   
      .replace(/arcsin(\([^()]*\)|\d+(\.\d+)?)/g, 'asin($1)')
      .replace(/arccos(\([^()]*\)|\d+(\.\d+)?)/g, 'acos($1)')
      .replace(/arctan(\([^()]*\)|\d+(\.\d+)?)/g, 'atan($1)');
  }

  const calculate = () => {
    const normalizedExpression = normalizeExpression(expression);
    return evaluate(normalizedExpression).toString();
  };

  const equals = () => {
    const value = calculate();
    setDisplayExpression(value);
    setExpression(value);
    setOverwrite(true);
    setEqual(true);
    setCursor(0);
  };

  const clearDisplay = () => {
    setExpression('');
    setDisplayExpression('0');
    setOverwrite(true);
  };

  const deleteLast = () => {
    const value1 = displayExpression.slice(0, cursor);
    const value2 = displayExpression.slice(cursor+1, displayExpression.length);
    const value = value1+value2;
    if (displayExpression.length > 1) {
      if (!equal) {
        setDisplayExpression(value);
        setExpression(value);
      } else {
        clearDisplay();
        setEqual(false);
      }
    } else {
      setDisplayExpression('0');
      setExpression('');
      setOverwrite(true);
    }
  };

  const handleShift = (digit: string): string => {
  switch (digit) {
    case 'sin': return shift ? 'arcsin' : 'sin';
    case 'cos': return shift ? 'arccos' : 'cos';
    case 'tg':  return shift ? 'arctg'  : 'tg';
    case 'ⁿ√':  return shift ? '!'   : 'ⁿ√';
    case 'ln': return shift? '%' : 'ln';
    default: return digit;
  }
};

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000]">
        <div className='bg-[#1a1a1a] rounded-lg shadow-lg h-[700px] w-[400px] p-6'>
          <div>
            <div className='bg-[#2a2a2a] text-white rounded-lg p-4 mb-4 h-[100px] flex items-center justify-end text-right text-3xl'>
              <div className='w-full h-full text-right flex  items-center justify-end'>
                <div className="relative gap-1">
                  {displayExpression.slice(0, cursor)}
                  <span className="inline-block w-[2px] h-10 bg-blue-500 animate-pulse align-middle" />
                  {displayExpression.slice(cursor)}
                </div>
              </div>  
            </div>
            <div className='bg-[#2a2a2a] text-white rounded-lg p-4 h-[550px] flex flex-col items-center justify-center text-center text-xl'>
              <div className='grid grid-cols-2 w-[200px] mb-5 gap-5'>
                <Keyboard className='bg-blue-400 text-2xl' onClick={() => setCursor(prev => Math.max(0,prev-1))}>←</Keyboard>
                <Keyboard className='bg-blue-400 text-2xl' onClick={() => setCursor(prev => Math.min(displayExpression.length, prev+1))}>→</Keyboard>
              </div>
              <div className='grid grid-cols-5 gap-2 h-full/2 w-full flex flex-display items-center justify-center'>
                <Keyboard onClick={() => setDigit('(')}>{'('}</Keyboard>
                <Keyboard onClick={() => setDigit(')')}>{')'}</Keyboard>
                <Keyboard onClick={() => { setDigit('√') }}>√</Keyboard>
                <Keyboard onClick={() => { setDigit('∛') }}>³√</Keyboard>
                <Keyboard onClick={() => { setDigit(handleShift('ⁿ√')); }}>{shift? '!' : 'ⁿ√'}</Keyboard>
                <Keyboard onClick={() => { setDigit('^2'); }}>x²</Keyboard>
                <Keyboard onClick={() => { setDigit('^3'); }}>x³</Keyboard>
                <Keyboard onClick={() => { setDigit('^'); }}>xⁿ</Keyboard>
                <Keyboard onClick={() => setDigit('π')}>π</Keyboard>
                <Keyboard onClick={() => setDigit('e')}>e</Keyboard>
                <Keyboard onClick={() => { setDigit(handleShift('sin')); }}>{shift ? 'sin⁻¹' : 'sin'}</Keyboard>
                <Keyboard onClick={() => { setDigit(handleShift('cos')); }}>{shift ? 'cos⁻¹' : 'cos'}</Keyboard>
                <Keyboard onClick={() => { setDigit(handleShift('tan')); }}>{shift ? 'tan⁻¹' : 'tan'}</Keyboard>
                <Keyboard onClick={() => { setDigit("log") }}>log</Keyboard>
                <Keyboard onClick={() => { setDigit(handleShift("ln")); }}>{shift ? '%' : 'ln'}</Keyboard>
                <Keyboard onClick={() => setDigit('7')}>7</Keyboard>
                <Keyboard onClick={() => setDigit('8')}>8</Keyboard>
                <Keyboard onClick={() => setDigit('9')}>9</Keyboard>
                <Keyboard className='bg-red-800' onClick={deleteLast}>C</Keyboard>
                <Keyboard className='bg-red-800' onClick={clearDisplay} >CE</Keyboard>
                <Keyboard onClick={() => setDigit('4')}>4</Keyboard>
                <Keyboard onClick={() => setDigit('5')}>5</Keyboard>
                <Keyboard onClick={() => setDigit('6')}>6</Keyboard>
                <Keyboard onClick={() => setDigit('*')}>*</Keyboard>
                <Keyboard onClick={() => setDigit('/')}>/</Keyboard>
                <Keyboard onClick={() => setDigit('1')} >1</Keyboard>
                <Keyboard onClick={() => setDigit('2')} >2</Keyboard>
                <Keyboard onClick={() => setDigit('3')}>3</Keyboard>
                <Keyboard onClick={() => setDigit('+')}>+</Keyboard>
                <Keyboard onClick={() => setDigit('-')}>-</Keyboard>
                <Keyboard onClick={() => setDigit('0')} >0</Keyboard>
                <Keyboard onClick={() => setDigit('00')}>00</Keyboard>
                <Keyboard onClick={() => setDigit('.')}>.</Keyboard>
                <Keyboard onClick={equals}>=</Keyboard>
                <Keyboard className='bg-yellow-500 text-black inline-flex items-center justify-center px-2 py-1 w-[70px]' onClick={() => setShift(prev => !prev)}>SHIFT</Keyboard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default calculator
