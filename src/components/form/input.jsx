import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { styled } from "@stitches/react";
import style from "./input.css";

const Small = styled("small", {
  margin: "2px 0 20px",
  color: "red",
  fontSize: 13,
  lineHeight: 1.5,
  left: 0,
  bottom: 0,
});

const InputText = styled("input", {
  aall: "unset",
  color: `gray`,
  width: "100%",
  flex: "1",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "10px 20px",
  fontSize: 15,
  lineHeight: 1,
  boxShadow: `0 0 0 1px gray / 25%`,
  height: "auto",
  border: `1px solid gray`,
  //backgroundColor:'#f4f7fa',

  "&:focus": {
    color: "#212529",
    boxShadow: `0 0 0 0.25rem rgb(13 110 253 / 25%)`,
    border: "1px solid #86b7fe",
  },
});

const FieldSet = styled("fieldset", {
  marginBottom: "20px",
  border: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "100%",
});

export default function Input({ name, type, displayName, onChange, ...rest }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const inputRef = useRef(null);
  const [format, setFormat] = React.useState(1);
  const [errorState, setErrorState] = React.useState("");

  const changeFormat = (e) => {
    if (e.type === "focus") {
      setFormat(2);
    } else {
      setFormat(1);
    }
  };
  const onChangeForm = (e) => {
    setErrorState("");
    if (typeof onChange === "function") {
      onChange(e);
    }
  };

  useEffect(() => {
    setErrorState(error);
  }, [error]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);
  if (type != "hidden")
    return (
      <FieldSet>
        <div className="input-wrapper">
          <label htmlFor={fieldName}>{format === 1 ? "" : displayName}</label>
          <InputText
            onFocus={(e) => {
              changeFormat(e);
            }}
            onBlur={(e) => {
              changeFormat(e);
            }}
            onChange={(e) => {
              onChangeForm(e);
            }}
            ref={inputRef}
            defaultValue={defaultValue}
            {...rest}
            id={fieldName}
            type={type || "text"}
            placeholder={format === 1 ? displayName : ""}
          />
          {error && <Small>{errorState}</Small>}
        </div>
      </FieldSet>
    );
  else
    return (
      <>
        <input
          type={type}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
          id={fieldName}
        />
        {error && <Small>{errorState}</Small>}
      </>
    );
}
