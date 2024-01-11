import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(()=> {
    fetch('http://localhost:4000/toys')
    .then(r=>r.json())
    .then(toys => {console.log(toys);setToys(toys)})
  }, [setToys])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addNewToy(newToy) {
    setToys([...toys, newToy])
  }

  function deleteToy(deletedToy) {
    setToys(toys.filter((toy) => toy.id !== deletedToy.id))
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addNewToy={addNewToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy}/>
    </>
  );
}

export default App;
