import React from "react";
import "./InfoTooltip.css";
import close from "../../images/close-icon.svg";

export default function InfoTooltip(props) {
  function handleClickOverlay(e) {
    e.stopPropagation();
  }

  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`} onClick={props.onClose}>
      <div className="popup__container" onClick={handleClickOverlay}>
        <button className="popup__exit" type="button" onClick={props.onClose}>
          <img className="popup__exit-sign" src={close} alt="Кнопка выхода" />
        </button>
        <div className="popup__box">
          <p className="popup__message">{props.tooltipMessage}</p>
        </div>
      </div>
    </div>
  );
}
