import {useContext} from "react";
import ApiContext from "../contexts/ApiContext";

export default function useApi() {
  return useContext(ApiContext);
}