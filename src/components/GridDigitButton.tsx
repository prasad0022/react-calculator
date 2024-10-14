import { Button, Grid2 } from "@mui/material";

interface GridDigitButtonProps {
  digit: string;
  enterDigit: (digit: string) => void;
  xs?: number;
}

const GridDigitButton: React.FC<GridDigitButtonProps> = ({
  digit,
  enterDigit,
  xs = 3,
}) => {
  return (
    <Grid2 size={xs}>
      <Button fullWidth variant="outlined" onClick={() => enterDigit(digit)}>
        {digit}
      </Button>
    </Grid2>
  );
};

export default GridDigitButton;
