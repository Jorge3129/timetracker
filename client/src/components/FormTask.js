import { useState } from "react";

const FormTask = ({ handleFormSubmit }) => {
  let [value, setValue] = useState("");

  function handleChildFormSubmit(event) {
    event.preventDefault();
    handleFormSubmit(value);
  }

  function handleChange(event) {
      setValue(event.target.value);
  }

  return (
    <form className="task" onSubmit={(e) => handleChildFormSubmit(e)}>
      <h3>
        <label>
          <input type="text" value={value} name="task-title" onChange={handleChange}/>
        </label>
      </h3>
    </form>
  );
};

export default FormTask;
