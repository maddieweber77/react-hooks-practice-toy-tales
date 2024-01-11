import React, {useState} from "react";

function ToyForm({addNewToy}) {

  const [name, setNewToyName] = useState("")
  const[image, setNewToyImage] = useState("")
  const[likes, setNewToyLikes] = useState(0)

  function handleNewToyName(e) {
    setNewToyName(e.target.value)
  }

  function handleNewToyImage(e) {
    setNewToyImage(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newToy = {image, name, likes}
    
    fetch('http://localhost:4000/toys', {
    method: 'POST', 
    headers: {'Content-Type' : 'Application/json'
    },
    body:JSON.stringify(newToy)
  })
    .then(r => r.json())
    .then(toy => addNewToy(toy))


  }

  
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNewToyName}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          value={image}
          onChange={handleNewToyImage}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;

//make onsubmit = some function on the form
//make two states for the name and the image
// this function should be in the app
//it will push a new item into the toy object
//set the condition in the useEffect to be equal to the toy state
