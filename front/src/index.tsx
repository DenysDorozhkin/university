import { createRoot } from "react-dom/client";
import AppProvider from "./components/app-provider";
// import reportWebVitals from './reportWebVitals';
import "./styles/index.scss";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(<AppProvider />);
// root.render(
//   <React.StrictMode>
//       <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
