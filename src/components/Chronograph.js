import React,{useState, useEffect} from 'react';
import {interval} from 'rxjs';

const timer$ = interval(10);

const Chronograph = () =>{
  const [clickCount,setClkCount] = useState(0)

  let [time, setTime] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => 
  {
    if (isCounting) 
    {
        const sub = timer$.subscribe( () => 
        {
            setTime(time => time+1)
        })
        return () => sub.unsubscribe();
    }
  }, [isCounting]);

  useEffect (()=>
  {
    if (clickCount >=2)
    {
      setIsCounting(false);
    }
    setTimeout(()=>
    {
      setClkCount(0);
    },300);
  }
  ,[clickCount]);

  const startTimer = () => 
  {
    setIsCounting(true)
  };

  const stopTimer = () => 
  {
    setIsCounting(false)
    setTime(0)
  }

  const pauseTimer = () => 
  {
    setClkCount(clickCount+1)
  };

  const resetTimer = () => 
  {
    stopTimer()
    setTimeout(startTimer, 500);
  
  };
  const timeFormating = (time) => 
  {
    const hours = Math.floor(time/3600)
    const minutes = Math.floor((time%3600)/60)
    const seconds = time%60
   
    return `${hours<10?'0'+hours:hours}:${minutes<10?'0'+minutes:minutes}:${seconds<10?'0'+seconds:seconds}`
  }

  return (
    <div className="container">
      {timeFormating(time)}
      <div className="btn-container">
        <button onClick={isCounting ? stopTimer : startTimer}> {isCounting ? `stop` : `start`}  </button>
        <button onClick={pauseTimer} id='wait' disabled={!isCounting}> wait </button>
        <button onClick={resetTimer} disabled={!isCounting}> reset </button>
      </div>
    </div>
  );
}
export default Chronograph