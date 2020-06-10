export function getRelations() {
  return fetch("http://localhost:3001/mentoring-relations").then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Bad network response.");
  });
}

export function editRelations(relation) {
  return fetch("http://localhost:3001/mentoring-relations/" + relation.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(relation),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Bad network response.");
  });
}
