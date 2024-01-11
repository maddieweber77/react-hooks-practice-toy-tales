import React, { useState } from "react";

function ToyCard({ id, name, image, likes, deleteToy }) {
  const [localLikes, setLocalLikes] = useState(likes);

  function handleLikes() {
    // Increment the local likes state
    setLocalLikes(localLikes + 1);

    // Send a PATCH request to update the likes on the server
    fetch(`http://localhost:4000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: localLikes + 1 }), // Send the updated likes value
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  }

  const toy = { id, image, name, likes: localLikes };

  function handleDelete() {
    deleteToy(toy);

    fetch(`http://localhost:4000/toys/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json());
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{localLikes} Likes </p>
      <button className="like-btn" onClick={handleLikes}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
