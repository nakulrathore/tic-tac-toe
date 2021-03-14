import "./player-element.scss";
function PlayerElement({
  which = "x",
  selected = "",
  selectSide,
  mode = "selecting",
}) {
  const handleRadioClick = () => {
    selectSide(which);
  };
  const selectedClass = selected === which ? "selected" : "";
  return (
    <section className="element-selector-wrapper">
      <div className={`the-${which}`} />
      {mode === "selecting" ? (
        <div
          onClick={handleRadioClick}
          className={`selector-radio ${which} ${selectedClass}`}
        ></div>
      ) : null}
    </section>
  );
}

export default PlayerElement;
