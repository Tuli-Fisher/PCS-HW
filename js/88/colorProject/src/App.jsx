import { useState } from "react";
import "./App.css";

export default function App() {
  // const [backColor, setBackColor] = useState("#d3a6a6ff");
  // const [fontColor, setFontColor] = useState("#ff0000");

  const [colors,setColors] = useState({fontColor:"#d3a6a6ff", backColor:"#ff0000"});
  const [fontStyle, setFontStyle] = useState();

  const fonts = [
    "Arial, sans-serif",
    "Georgia, serif",
    "Tahoma, sans-serif",
    "Courier New, monospace",
  ];

  const handleSubmit = e =>{
    setColors({...colors, [e.target.name]:e.target.value})
  };

  return (
    <>
      {/* <div>
        choose a background color:
        <input
          type="color"
          value={backColor}
          onChange={(e) => setBackColor(e.target.value)}
        />
      </div>
      <div>
        choose a font color:
        <input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
      </div> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>color:</label>
          <input value={colors.fontColor} name="color" type="color" onChange={(e) => setColors({...colors,[e.target.name]:e.target.value})} />
        </div>
        <div className="form-group">
          <label>Background color:</label>
          <input value={colors.backColor} name="backColor" type="color" onChange={(e) => setColors({...colors,[e.target.name]:e.target.value})} />
        </div>
        <button>ok</button>
      </form>

      <select
        name="fontSelector"
        value={fontStyle}
        onChange={(e) => setFontStyle(e.target.value)}
      >
        <option hidden>Select a font</option>
        {fonts?.map((font, index) => (
          <option key={index} value={font}>
            {font}
          </option>
        ))}
      </select>
      <p
        style={{
          color: colors.fontColor,
          backgroundColor: colors.backColor,
          fontFamily: fontStyle,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
        similique nihil qui voluptate facilis perferendis at cumque, facere iste
        maiores dicta aut, excepturi nulla iure amet, libero sed ipsa mollitia
        quae neque incidunt repudiandae quod? Similique nobis odio vel!
        Voluptatem quos eius earum similique recusandae consequuntur distinctio
        ratione, fugit dicta totam sint voluptatibus minus! Magni, at omnis
        consequuntur error, amet deleniti repellendus saepe, eius laudantium
        quod corrupti ea illo harum hic maiores obcaecati laborum quo!
        Consequatur, ullam sapiente nihil ipsum asperiores officia temporibus
      </p>
    </>
  );
}
