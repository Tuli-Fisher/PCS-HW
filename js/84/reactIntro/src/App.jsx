
import NameAsker from "./nameAsker.jsx";
import Address from "./Address.jsx";

import "./App.css";

function App() {
  return (
    <>
      <h1>This is my first react component!</h1>
      <h2>check out the cool stuff</h2>
      <NameAsker />
      <h2>Check us out at <Address address='123 Main st' city='lakewood' state='N.J' zip='08701'/> </h2>
    </>
  );
}

export default App;
