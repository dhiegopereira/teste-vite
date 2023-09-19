/* eslint-disable react/prop-types */
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function InputPassword({ value, onChange }) {
  const shadow = "rgba(16, 24, 40, 0.05)";

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <OutlinedInput
        sx={{
          width: "100%",
          height: "2.75rem",
          fontSize: "1rem",
          borderRadius: "0.5rem",
          backgroundColor: "#FFFFFF",
          boxShadow: `0rem 0.063rem 0.125rem 0rem ${shadow}`,
        }}
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Digite a sua senha"
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </div>
  );
}
