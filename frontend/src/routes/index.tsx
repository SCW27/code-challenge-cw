import { Routes as Switch, Route } from "react-router-dom";
import Chat from "./Chat";
import Home from "./Home";
// import Chat from './Chat';
// import Home from './Home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="chat/:userId" element={<Chat />} />
    </Switch>
  );
}
