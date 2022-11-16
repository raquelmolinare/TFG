import { useContext } from "react";
import { SnackbarContext } from "../contexts/SnackbarContext";

export function useSnackbar() {
  return useContext(SnackbarContext);
}
