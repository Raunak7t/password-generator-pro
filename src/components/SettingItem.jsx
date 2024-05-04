import React from "react";

function SettingItem({ name, enabled, changeState }) {
  return (
    <div className="password-area flex items-center justify-between gap-3 p-3 mb-2 bg-[#343f6e] rounded">
      <span className="ps-3">{name}</span>
      <div
        className={`toggle-switch  ${
          enabled ? "bg-[#5a7bff]" : "bg-[#70799c]"
        } rounded-full w-10 h-6 relative transition-all cursor-pointer`}
        onClick={changeState}
      >
        <div
          className={` bg-white rounded-full w-4 h-4 absolute top-1 ${
            enabled ? "left-5" : "left-1"
          } transition-all`}
        ></div>
      </div>
    </div>
  );
}

export default SettingItem;
