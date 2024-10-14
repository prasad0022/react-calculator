import { Button, Container, Grid2, Paper, styled } from "@mui/material";
import GridDigitButton from "./components/GridDigitButton.tsx";
import { useState } from "react";
import { GridOperationButton } from "./components/GridOperationButton.tsx";

const OutputContainer = styled(`div`)(({ theme }) => ({
  width: "100%",
  textAlign: "right",
  height: "2em",
  padding: theme.spacing(2),
  fontSize: "3em",
  overflow: "hidden",
}));

const CalculatorBase = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: 15,
}));

export const App = () => {
  const [currentValue, setCurrentValue] = useState("0");
  const [operation, setOperation] = useState("");
  const [preValue, setPreValue] = useState("");
  const [overWrite, setOverWrite] = useState(true);

  const setDigit = (digit: string) => {
    if (digit === "0" && currentValue[0] === "0") return;
    if (currentValue.includes(".") && digit === ".") return;
    if (overWrite && digit !== ".") {
      setCurrentValue(digit);
    } else {
      setCurrentValue(`${currentValue}${digit}`);
    }
    setOverWrite(false);
  };

  const selectOperation = (operation: string) => {
    setPreValue(currentValue);
    setOperation(operation);
    setOverWrite(true);
  };

  // Clear operation as well as all digits
  const allClear = () => {
    setPreValue("");
    setOperation("");
    setCurrentValue("0");
    setOverWrite(true);
  };

  // Clear digits only
  const clear = () => {
    setCurrentValue("0");
    setOverWrite(true);
  };

  // Function for percentage value
  const percent = () => {
    const curr = parseFloat(currentValue);
    setCurrentValue((curr / 100).toLocaleString());
  };

  // Function for calculatiions
  const calculate = () => {
    if (!preValue && !operation) return currentValue;

    const curr = parseFloat(currentValue);
    const prev = parseFloat(preValue);
    let result;

    switch (operation) {
      case "÷":
        result = prev / curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "+":
        result = prev + curr;
        break;
    }
    return result;
  };

  // Function for showing result on button click
  const equals = () => {
    const val = calculate();
    setCurrentValue(`${val}`);
    setOperation("");
    setPreValue("");
    setOverWrite(true);
  };

  return (
    <Container maxWidth="sm">
      <h1 className="header">Calculator</h1>
      <CalculatorBase elevation={3}>
        <Grid2 container spacing={1}>
          <OutputContainer>{currentValue}</OutputContainer>
        </Grid2>
        <Grid2 container spacing={1}>
          <GridOperationButton
            operation="AC"
            selectOperation={allClear}
            selectedOperation={operation}
          />
          <GridOperationButton
            operation="C"
            selectOperation={clear}
            selectedOperation={operation}
          />
          <GridOperationButton
            operation="%"
            selectOperation={percent}
            selectedOperation={operation}
          />
          <GridOperationButton
            operation="÷"
            selectOperation={selectOperation}
            selectedOperation={operation}
          />
        </Grid2>
        <div className="btn-container">
          <Grid2 container spacing={1}>
            <GridDigitButton digit="7" enterDigit={setDigit} />
            <GridDigitButton digit="8" enterDigit={setDigit} />
            <GridDigitButton digit="9" enterDigit={setDigit} />
            <GridOperationButton
              operation="*"
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid2>
        </div>
        <div className="btn-container">
          <Grid2 container spacing={1}>
            <GridDigitButton digit="4" enterDigit={setDigit} />
            <GridDigitButton digit="5" enterDigit={setDigit} />
            <GridDigitButton digit="6" enterDigit={setDigit} />
            <GridOperationButton
              operation="-"
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid2>
        </div>
        <div className="btn-container">
          <Grid2 container spacing={1}>
            <GridDigitButton digit="1" enterDigit={setDigit} />
            <GridDigitButton digit="2" enterDigit={setDigit} />
            <GridDigitButton digit="3" enterDigit={setDigit} />
            <GridOperationButton
              operation="+"
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid2>
        </div>
        <div className="btn-container">
          <Grid2 container spacing={1}>
            <GridDigitButton digit="." enterDigit={setDigit} />
            <GridDigitButton digit="0" enterDigit={setDigit} />
            <Grid2 size={6}>
              <Button fullWidth variant="contained" onClick={equals}>
                =
              </Button>
            </Grid2>
          </Grid2>
        </div>
      </CalculatorBase>
    </Container>
  );
};
