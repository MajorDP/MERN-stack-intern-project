import { useState } from "react";
import { validate } from "../helpers/validator";

interface IInput {
  id: string;
  name: string;
  placeholder: string;
  label: string;
  value?: string | null;
  type?: string;
  validators: (() => void)[];
  errorText: string;
  onInput?: (isValid: boolean) => void | null;
  isInput?: boolean | null;
}

function Input({
  id,
  name,
  type,
  placeholder,
  label,
  value,
  validators,
  errorText,
  onInput,
  isInput,
}: IInput) {
  const [inputState, setInputState] = useState({
    value: value || "",
    isValid: true,
  });

  const onChange = (value: string) => {
    const isValid = validate(value, validators);
    if (onInput) {
      onInput(isValid);
    }

    setInputState({
      value: value,
      isValid: isValid,
    });
  };

  return (
    <>
      <label
        htmlFor={id}
        className={`${
          !inputState.isValid ? "text-red-500" : "text-black"
        } flex justify-between`}
      >
        {label} {!inputState.isValid && <span>{errorText}</span>}
      </label>
      {isInput ? (
        <input
          value={inputState.value}
          onChange={(e) => onChange(e.target.value)}
          id={id}
          name={name}
          type={type}
          className={`px-2 py-1 border-2 
            ${
              !inputState.isValid
                ? "border-red-500 focus:border-red-500 outline-red-500"
                : "border-black focus:border-black"
            } 
            rounded-md`}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          value={inputState.value}
          onChange={(e) => onChange(e.target.value)}
          id={id}
          name={name}
          className={`px-2 py-1 border-2 
          ${
            !inputState.isValid
              ? "border-red-500 focus:border-red-500 outline-red-500"
              : "border-black focus:border-black"
          } 
          rounded-md text-sm p-3 h-28 `}
          placeholder={placeholder}
        />
      )}
    </>
  );
}

export default Input;
