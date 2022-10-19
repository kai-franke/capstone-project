const tutorials = [
  {
    id: "b74d7e1c-acc4-4f65-bfd9-aeaa70dd6878",
    name: "Bathing a hamster",
    cover: "/assets/tutorial-1_cover-image_1900x1900.jpg",
  },
  {
    id: "6c3158b7-908a-4472-8379-34296a31009d",
    name: "Baking sourdough bread",
    cover: "/assets/tutorial-2_cover-image_2000x2000.jpg",
  },
  {
    id: "01a29dba-6feb-401c-85eb-77f58d5761d8",
    name: "Building a helpful robot",
    cover: "/assets/tutorial-3_cover-image_2000x2000.jpg",
  },
];

export async function getAllTutorials() {
  return tutorials;
}
/* 
export async function getTutorialById(id) {
  return tutorials.find((tutorial) => tutorial.id === id);
}
 */