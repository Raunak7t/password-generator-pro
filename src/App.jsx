import React, { useCallback, useEffect, useRef, useState } from "react";
import SettingItem from "./components/SettingItem";
import { FaRegCopy, FaSyncAlt } from "react-icons/fa";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(false);
  const [numbersAllowed, setNumbersAllowed] = useState(true);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [rotation, setRotation] = useState(0);

  const passwordInput = useRef(null);
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

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordInput.current.select();
  };

  return (
    <div className="bdg-[#0e1430] bg-gradient-to-tr from-[#44003b67] to-[#0d4c5c9d] backdrop-blur-md w-full h-screen flex items-center justify-center">
      <div className="main bg-[#0e15339d] text-white py-5 px-7 rounded-xl w-[340px] border-white border-[1px]">
        <h1 className="text-2xl font-semibold mb-5 text-center">
          Auto Password Generator
        </h1>

        <div className="password-area flex items-center gap-3 px-5 py-4 mb-2 bg-[#343f6e] rounded">
          <input
            type="text"
            className="w-full bg-inherit outline-none font-semibold selection:bg-[#abe0ffe1] selection:text-[#000]"
            readOnly
            value={password}
            placeholder="Password"
            ref={passwordInput}
          />
          <FaRegCopy
            className="cursor-pointer text-xl"
            onClick={copyToClipboard}
          />
        </div>

        <div className="mini-heading font-medium  mx-2 my-1 ">
          <span className="opacity-80 text-[11px]">Length: </span>
          <span className="opacity-100">{length}</span>
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
          className="generate-new flex items-center justify-center gap-3 p-3 y-4 mt-5 mb-1 bg-gradient-to-r from-[#556eda] to-[#b319e2] rounded font-medium text-lg cursor-pointer"
          onClick={generatePassword}
        >
          <span>Re-generate</span>
          <FaSyncAlt
            className="transition-all duration-500 ease-linear"
            style={{ rotate: rotation + "deg" }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
