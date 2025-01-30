/* eslint-disable react/prop-types */
import { useState } from "react";
import "./FavoriteNumber.css";

function FavoriteNumber(props) {
  const [count, setCount] = useState(props.start);

  return (
    <>
      <h1>Favorite Number</h1>
      <p>Count = {count}</p>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrement
      </button>
      <button
        onClick={() => {
          setCount(0);
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
    </>
  );
}

export default FavoriteNumber;
