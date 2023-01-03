import { useForm } from "react-hook-form";
import React, { useCallback, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//creating Controller =
// const Controller = ({ control, register, name, rules, render }) => {
//     const props =register(name)

//   return render();
// };

//declaring schema
const schema = yup
  .object({
    Name: yup.string().required(),
    ContactNumber: yup.number().positive().integer().required(),
    Age: yup.number().positive().integer().required(),
  })
  .required();

//declare formHOok
export default function FormHook() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  // here we are declaring reset thing
  const resetAsyncForm = useCallback(async () => {
    const result = await fetch("./api/formValues.json"); // result: { firstName: 'test', lastName: 'test2' }
    reset(result); // asynchronously reset your form values
  }, [reset]);

  useEffect(() => {
    resetAsyncForm();
  }, [resetAsyncForm]);

  const onSubmitData = (data) => {
    return console.log(data);
  };

  // console.log(watch("Name"));

  // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmitData)}>
      {/* register your input into the hook by invoking the "register" function */}
      {/* <input defaultValue="test" {...register("example")} /> */}

      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register("exampleRequired", { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}

      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="helpId"
                placeholder="enter name"
                {...register("Name")}
              />
              {/* <small id="helpId" className="form- text text-muted">Help text</small> */}
              {errors.Name && (
                <small id="helpId" className="form- text text-muted">
                  
                  {errors.Name.message}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                aria-describedby="helpId"
                placeholder="enter name"
                {...register("Age")}
              />
              {/* <small id="helpId" className="form- text text-muted">Help text</small> */}
              {errors.Age && (
                <small id="helpId" className="form- text text-muted">
                  {" "}
                  {errors.Age.message}{" "}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Contact Number
              </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="helpId"
                placeholder="enter contact number"
                {...register("ContactNumber")}
              />
              {/* <small id="helpId" className="form-text text-muted">Help text</small> */}
              {errors.ContactNumber && (
                <small id="helpId" className="form- text text-muted">
                  {" "}
                  {errors.ContactNumber.message}{" "}
                </small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                aria-describedby="helpId"
                placeholder="enter email"
                {...register("Email")}
              />
              {/* <small id="helpId" className="form-text text-muted">Help text</small> */}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Gender
              </label>
              <select
                className="form-select form-select-lg"
                name="Gender"
                {...register("Gender")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          reset((formValues) => ({
            ...formValues,
            Name: "default name",
          }));
        }}
      >
        Reset partial
      </button>

      {/* <Controller
        {...{
            control:{},
          register,
          name: "Name",
          rules: {},
          render: () => <input />,
        }}
      /> */}
      <input type="submit" />
    </form>
  );
}
