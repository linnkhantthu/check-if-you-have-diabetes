"use client";
import { FormEvent, useState } from "react";

export default function Home() {
  const [result, setResult] = useState("");
  const sendData = async (e: FormEvent<HTMLFormElement>) => {
    setResult("Calculating...");
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const pregnancies = formData.get("pregnancies");
    const glucose = formData.get("glucose");
    const bloodPressure = formData.get("bloodPressure");
    const skinThickness = formData.get("skinThickness");
    const insulin = formData.get("insulin");
    const bmi = formData.get("bmi");
    const diabetesPedigreeFunction = formData.get("diabetesPedigreeFunction");
    const age = formData.get("age");

    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pregnancies: pregnancies,
        glucose: glucose,
        bloodPressure: bloodPressure,
        skinThickness: skinThickness,
        insulin: insulin,
        bmi: bmi,
        diabetesPedigreeFunction: diabetesPedigreeFunction,
        age: age,
      }),
    });
    if (res.ok) {
      const { data } = await res.json();
      setResult(data);
    } else {
      setResult("Connection Failed.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <fieldset>
        <legend>Check Diabetes(Females)</legend>
        <form className="grid grid-cols-2" onSubmit={sendData}>
          <label className="label" htmlFor="pregnancies">
            Pregnancies
          </label>
          <input
            className="input input-primary my-1"
            type="number"
            id="pregnancies"
            name="pregnancies"
            required
          />

          <label className="label" htmlFor="glucose">
            Glucose
          </label>
          <input
            className="input input-primary my-1"
            type="number"
            id="glucose"
            name="glucose"
            required
          />

          <label className="label" htmlFor="bloodPressure">
            Blood Pressure
          </label>
          <input
            className="input input-primary my-1"
            type="number"
            id="bloodPressure"
            name="bloodPressure"
            required
          />

          <label className="label" htmlFor="skinThickness">
            SkinThickness
          </label>
          <input
            className="input input-primary my-1"
            type="number"
            id="skinThickness"
            name="skinThickness"
            required
          />

          <label className="label" htmlFor="insulin">
            Insulin
          </label>
          <input
            className="input input-primary my-1"
            type="number"
            id="insulin"
            name="insulin"
            required
          />

          <label className="label" htmlFor="bmi">
            BMI
          </label>
          <input
            className="input input-primary my-1"
            type="number"
            id="bmi"
            name="bmi"
            step={".01"}
            required
          />

          <label className="label" htmlFor="diabetesPedigreeFunction">
            Diabetes Pedigree Fn
          </label>
          <input
            className="input input-primary my-1"
            type="number"
            id="diabetesPedigreeFunction"
            name="diabetesPedigreeFunction"
            step={".0001"}
            required
          />

          <label className="label" htmlFor="age">
            Age
          </label>
          <input
            className="input input-primary my-1"
            type="number"
            id="age"
            name="age"
            required
          />
          <span></span>
          <span className="text-right">
            <input
              type="submit"
              className=" btn btn-primary w-fit"
              value="Submit"
            />
          </span>
        </form>
        <span>Result: {result}</span>
      </fieldset>
    </main>
  );
}
