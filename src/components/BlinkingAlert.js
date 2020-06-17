import React from "react";
import "../styles/BlinkingAlert.css";

export default function BlinkingAlert() {
  return (
    <div>
      <svg
        data-toggle="popover"
        data-content="Some content inside the popover"
        className="bi bi-exclamation-triangle-fill blink"
        width="2em"
        height="3em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
        />
      </svg>
    </div>
  );
}
