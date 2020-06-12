export function getUsers() {
  return fetch("http://localhost:3001/athena-users").then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Bad network response.");
  });
}

export function getUser(user) {
  return fetch("http://localhost:3001/athena-users/" + user.id).then(
    (response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Bad network response.");
    }
  );
}

export function editUser(user) {
  return fetch("http://localhost:3001/athena-users/" + user.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Bad network response.");
  });
}
