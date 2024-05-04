import React, { useCallback, useEffect, useState } from "react";
import SettingItem from "./components/SettingItem";
import { FaRegCopy, FaSyncAlt } from "react-icons/fa";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(false);
  const [numbersAllowed, setNumbersAllowed] = useState(true);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [rotation, setRotation] = useState(0);

  const generatePassword = useCallback(() => {
    setRotation((prev) => prev + 360);

    let allowedChars = "abcdefghijklmnopqrstuvwxyz";
    if (uppercaseAllowed) allowedChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbersAllowed) allowedChars += "0123456789";
    if (symbolsAllowed) allowedChars += "~`! @#$%^&*()_-+={[}]|:;\"'<,>.?/";

    let tempPass = "";
    for (let i = 0; i < length; i++) {
      tempPass += allowedChars[Math.floor(Math.random() * allowedChars.length)];
    }
    setPassword(tempPass);
  }, [length, uppercaseAllowed, numbersAllowed, symbolsAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, uppercaseAllowed, numbersAllowed, symbolsAllowed]);

  return (
    <div className="bg-[#0e1430] w-full h-screen flex items-center justify-center">
      <div className="main bg-[#1c2653] text-white py-5 px-7 rounded-lg w-[340px]">
        <h1 className="text-2xl font-semibold mb-5 text-center">
          Auto Password Generator
        </h1>

        <div className="password-area flex items-center gap-3 px-5 py-4 mb-2 bg-[#343f6e] rounded">
          <input
            type="text"
            className="w-full bg-inherit outline-none font-semibold"
            readOnly
            value={password}
            placeholder="Password"
          />
          <FaRegCopy className="cursor-pointer text-xl" />
        </div>

        <div className="mini-heading font-medium  mx-2 my-1">
          <span className="opacity-80 text-[11px]">Length: </span>
          <span className="opacity-100 text-[13px]">{length}</span>
        </div>
        <div className="length-area flex items-center justify-between gap-3 p-3 y-4 mb-2 bg-[#343f6e] rounded font-medium">
          <span>4</span>
          <input
            type="range"
            min={4}
            max={32}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
            name=""
            id=""
            className="w-full cursor-pointer"
          />
          <span>32</span>
        </div>

        <div className="mini-heading font-medium  mx-2 my-1">
          <span className="opacity-80 text-[11px]">Settings</span>
        </div>
        <SettingItem
          name="Include Uppercase"
          enabled={uppercaseAllowed}
          changeState={() => {
            setUppercaseAllowed((prev) => !prev);
          }}
        />
        <SettingItem
          name="Include Numbers"
          enabled={numbersAllowed}
          changeState={() => {
            setNumbersAllowed((prev) => !prev);
          }}
        />
        <SettingItem
          name="Include Symbols"
          enabled={symbolsAllowed}
          changeState={() => {
            setSymbolsAllowed((prev) => !prev);
          }}
        />

        <div
          className="generate-new flex items-center justify-center gap-3 p-3 y-4 mt-5 mb-1 bg-gradient-to-r from-[#556eda] to-[#b319e2] rounded font-medium text-lg"
          onClick={generatePassword}
        >
          <span>Re-generate</span>
          <FaSyncAlt
            className="transition-all duration-700"
            style={{ rotate: rotation + "deg" }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
