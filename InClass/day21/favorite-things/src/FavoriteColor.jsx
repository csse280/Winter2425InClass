import "./FavoriteColor.css";
import { useState } from "react";

function FavoriteColor() {
  const [colorText, setColorText] = useState("Redddddddd");
  const [colorClass, setColorClass] = useState("red-box");

  function handleColorChange(text, className) {
    setColorText(text);
    setColorClass(className);
  }

  return (
    <>
      <h1>Favorite Color</h1>
      <div id="favoriteColorBox" className={colorClass}>
        {colorText}
      </div>
      <button
        onClick={() => {
          handleColorChange("Blue", "blue-box");
        }}
        className="blue-box"
      >
        Blue
      </button>
      <button
        onClick={() => {
          handleColorChange("Green", "green-box");
        }}
        className="green-box"
      >
        Green
      </button>
      <button
        onClick={() => {
          handleColorChange("Rose Red", "red-box");
        }}
        className="red-box"
      >
        Red
      </button>
      <button
        onClick={() => {
          handleColorChange("Purple", "purple-box");
        }}
        className="purple-box"
      >
        Purple
      </button>
    </>
  );
}

export default FavoriteColor;
