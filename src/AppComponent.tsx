import React, { useState } from "react";

const AppComponent = (): React.ReactElement => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div data-testid="header">This is the count: {count}</div>
      <button onClick={()=>setCount(count+1)} data-testid="button">Press Now</button>
      <a href="http://www.bbc.com" data-testid="link">Link to BBC</a>
    </>
  );
};

export default AppComponent;
