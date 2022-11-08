import React from "react";
import "./App.scss";
import { Button } from "./components/base/Button";
import { Header } from "./components/base/Header";
import { Main } from "./components/base/Main";

function App() {
  return (
    <div className="App">
      <>
        <Header
          title="Alz Care"
          buttons={
            <>
              <Button className="btn btn-primary mx-2 white">
                <i className="bi bi-house-door-fill white" />
              </Button>
              <Button className="btn btn-secondary mx-2">
                <i className="bi bi-house-door-fill" />
              </Button>
              <Button className="btn btn-success mx-2">
                <i className="bi bi-house-door-fill" />
              </Button>
              <Button className="btn btn-warning mx-2">
                <i className="bi bi-house-door-fill" />
              </Button>
              <Button className="btn btn-danger mx-2">
                <i className="bi bi-house-door-fill" />
              </Button>
              <Button className="btn btn-info mx-2">
                <i className="bi bi-house-door-fill" />
              </Button>
              <Button className="btn btn-light mx-2">
                <i className="bi bi-house-door-fill" />
              </Button>
              <Button className="btn btn-dark mx-2">
                <i className="bi bi-house-door-fill" />
              </Button>
            </>
          }
        />
      </>
      <Main>
        <p>Alz Care APP</p>
      </Main>
    </div>
  );
}

export default App;
