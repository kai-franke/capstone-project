const tutorials = [
  {
    id: "b74d7e1c-acc4-4f65-bfd9-aeaa70dd6878",
    name: "Bathing a hamster",
    cover: "/assets/tutorial-1_cover-image_1900x1900.jpg",
    path: "bathing-a-hamster",
    steps: [
      {
        step: 1,
        title: "Steal a hamster",
        descripton:
          "Step 1 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ",
        img: "/assets/tutorial-1_cover-image_1900x1900.jpg",
      },
      {
        step: 2,
        title: "Put on life vest",
        descripton:
          "Step 2 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ",
        img: "/assets/tutorial-1_cover-image_1900x1900.jpg",
      },
      {
        step: 3,
        title: "Use lukewarm water",
        descripton:
          "Step 3 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ",
        img: "/assets/tutorial-1_cover-image_1900x1900.jpg",
      },
      {
        step: 4,
        title: "Blow dry",
        descripton:
          "Step 4 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ",
        img: "/assets/tutorial-1_cover-image_1900x1900.jpg",
      },
    ],
  },
  {
    id: "6c3158b7-908a-4472-8379-34296a31009d",
    name: "Baking sourdough bread",
    cover: "/assets/tutorial-2_cover-image_2000x2000.jpg",
    path: "baking-sourdough-bread",
    steps: [
      {
        step: 1,
        title: "Weigh the ingredients",
        descripton:
          "Step 1 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ",
        img: "/assets/tutorial-2_cover-image_2000x2000.jpg",
      },
      {
        step: 2,
        title: "Mix the ingredients",
        descripton:
          "Step 2 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ",
        img: "/assets/tutorial-2_cover-image_2000x2000.jpg",
      },
      {
        step: 3,
        title: "Bake at 250 °C",
        descripton:
          "Step 3 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ",
        img: "/assets/tutorial-2_cover-image_2000x2000.jpg",
      },
      {
        step: 4,
        title: "Extinguish the burning oven",
        descripton:
          "Step 4 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ",
        img: "/assets/tutorial-2_cover-image_2000x2000.jpg",
      },
    ],
  },
  {
    id: "01a29dba-6feb-401c-85eb-77f58d5761d8",
    name: "Building a helpful robot",
    cover: "/assets/tutorial-3_cover-image_2000x2000.jpg",
    path: "building-a-helpful-robot",
    steps: [
      {
        step: 1,
        title: "Make friends at NASA",
        descripton:
          "Step 1 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ",
        img: "/assets/tutorial-3_cover-image_2000x2000.jpg",
      },
      {
        step: 2,
        title: "Get drunk with your new friends",
        descripton:
          "Step 2 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ",
        img: "/assets/tutorial-3_cover-image_2000x2000.jpg",
      },
      {
        step: 3,
        title: "Ask them how to build a helpful robot",
        descripton:
          "Step 3 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ",
        img: "/assets/tutorial-3_cover-image_2000x2000.jpg",
      },
    ],
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
