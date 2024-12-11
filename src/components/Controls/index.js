import "./Controls.css";

import React from "react";

import Adjuster from "../Adjuster";

export default function Controls(props) {
  const {
    adjusters,
    adjusterOnChange,
    colorFuncStr,
    shortNamesOnClick,
    useShortNames,
  } = props;

  const adjusterListItems = adjusters.map((a) => {
    const props = {
      ...a,
      onChange: adjusterOnChange,
    };

    return (
      <li key={`${a.name}Adjuster`}>
        <Adjuster {...props} />
      </li>
    );
  });

  return (
    <div className="controls">
      <div className="colorFunc">
        <label className="controlsHeading deprecated" htmlFor="colorFunc">
          [deprecated] Color function
          <button className="btnText deprecated" onClick={shortNamesOnClick}>
            {useShortNames ? "Use full names" : "Use short names"}
          </button>
        </label>
        <input
          className="resetInput colorFuncInput"
          id="colorFunc"
          type="text"
          readOnly
          value={colorFuncStr}
        />
      </div>

      <div className="adjusters">
        <h2 className="controlsHeading">Adjusters</h2>
        <ul className="adjustersList">{adjusterListItems}</ul>
      </div>
    </div>
  );
}

Controls.defaultProps = {
  adjusterOnChange: () => {},
  colorFuncStr: "",
  shortNamesOnClick: () => {},
};