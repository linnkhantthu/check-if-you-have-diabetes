import { execSync } from "child_process";
import { __next_app__ } from "next/dist/build/templates/app-page";
import { NextRequest } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  let data;
  const {
    pregnancies,
    glucose,
    bloodPressure,
    skinThickness,
    insulin,
    bmi,
    diabetesPedigreeFunction,
    age,
  } = await request.json();
  console.log(
    pregnancies,
    glucose,
    bloodPressure,
    skinThickness,
    insulin,
    bmi,
    diabetesPedigreeFunction,
    age
  );
  const basepath = path.resolve(__dirname, "../../../../");
  const result = execSync(
    `python ${basepath}/src/lib/check-diabetes.py ${pregnancies} ${glucose} ${bloodPressure} ${skinThickness} ${insulin} ${bmi} ${diabetesPedigreeFunction} ${age}`
  );
  data = result.toString("utf8");
  return Response.json({ data });
}
