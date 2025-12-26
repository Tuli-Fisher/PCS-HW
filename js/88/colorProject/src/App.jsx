import { useState } from "react";
import "./App.css";

export default function App() {
  // const [backColor, setBackColor] = useState("#d3a6a6ff");
  // const [fontColor, setFontColor] = useState("#ff0000");

  const [formColors, setFormColors] = useState({
    fontColor: "rgba(82, 182, 149, 1)",
    backColor: "#713e7eff",
  });

  const [colors, setColors] = useState({
    fontColor: "#d3a6a6ff",
    backColor: "#ff0000",
  });
  const [fontStyle, setFontStyle] = useState("Arial, sans-serif");

  const fonts = [
    "Arial, sans-serif",
    "Georgia, serif",
    "Tahoma, sans-serif",
    "Courier New, monospace",
  ];

  const handleSubmit = e => {
    e.preventDefault();
    setColors({ ...formColors });
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
          <input
            value={formColors.fontColor}
            name="fontColor"
            type="color"
            onChange={(e) =>
              setFormColors({ ...formColors, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Background color:</label>
          <input
            value={formColors.backColor}
            name="backColor"
            type="color"
            onChange={(e) =>
              setFormColors({ ...formColors, [e.target.name]: e.target.value })
            }
          />
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
