import React from "react";

export default function Select({
  options,
  optionType,
  legend,
  register,
  name,
  // editValue,
}) {
  return (
    <div>
      {options ? (
        <>
          <legend className="fieldset-legend">{legend}</legend>
          <select
            defaultValue={`Pick a ${optionType}`}
            className="select select-primary"
            name={name}
            {...register(name)}
          >
            <option disabled={true}>{`choose a ${optionType} `}</option>
            {options.map((cat) => (
              <option key={cat.id}>{cat.name}</option>
            ))}
          </select>
        </>
      ) : null}
    </div>
  );
}
