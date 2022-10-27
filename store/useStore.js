import create from "zustand";

const useStore = create((set) => {
  return {
    tutorials: [
      {
        id: "5e0d66cb-4b7f-4eec-b3c0-3591603cd233",
        name: "Bathing a hamster",
        cover: "/assets/tutorial-1_cover-image_1900x1900.jpg",
        slug: "bathing-a-hamster",
        steps: [
          {
            step: 0,
          },
          {
            step: 1,
            title: "Take a cute hamster",
            description:
              "Step 1 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
            img: "/assets/tutorial-1_step1-image_2000x2000.jpg",
          },
          {
            step: 2,
            title: "Put on a life vest",
            description:
              "Step 2 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
            img: "/assets/tutorial-1_step2-image_2000x2000.jpg",
          },
          {
            step: 3,
            title: "Bath in lukewarm water",
            description:
              "Step 3 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
            img: "/assets/tutorial-1_step3-image_2000x2000.jpg",
          },
          {
            step: 4,
            title: "Blow dry",
            description:
              "Step 4 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
            img: "/assets/tutorial-1_step4-image_2000x2000.jpg",
          },
        ],
      },
      {
        id: "1b9d100e-442d-47a5-9a35-2c302466de1e",
        name: "Baking sourdough bread",
        cover: "/assets/tutorial-2_cover-image_2000x2000.jpg",
        slug: "baking-sourdough-bread",
        steps: [
          {
            step: 0,
          },
          {
            step: 1,
            title: "Weigh the ingredients",
            description:
              "Step 1 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
            img: "/assets/tutorial-2_step1-image_2000x2000.jpg",
          },
          {
            step: 2,
            title: "Mix the ingredients",
            description:
              "Step 2 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
            img: "/assets/tutorial-2_step2-image_2000x2000.jpg",
          },
          {
            step: 3,
            title: "Bake at 250 °C",
            description:
              "Step 3 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
            img: "/assets/tutorial-2_step3-image_2000x2000.jpg",
          },
          {
            step: 4,
            title: "Extinguish the burning oven",
            description:
              "Step 4 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
            img: "/assets/tutorial-2_step4-image_2000x2000.jpg",
          },
        ],
      },
      {
        id: "653131b5-52fa-4b73-909b-419a6f87697d",
        name: "Building a helpful robot",
        cover: "/assets/tutorial-3_cover-image_2000x2000.jpg",
        slug: "building-a-helpful-robot",
        steps: [
          {
            step: 0,
          },
          {
            step: 1,
            title: "Make friends at NASA",
            description:
              "Step 1 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
            img: "/assets/tutorial-3_step1-image_2000x2000.jpg",
          },
          {
            step: 2,
            title: "Get drunk with your new NASA friends",
            description:
              "Step 2 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
            img: "/assets/tutorial-3_step2-image_2000x2000.jpg",
          },
          {
            step: 3,
            title: "Ask them how to build a helpful robot",
            description:
              "Step 3 description. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.",
            img: "/assets/tutorial-3_step3-image_2000x2000.jpg",
          },
        ],
      },
    ],
    addTutorial: (newTutorial) => {
      set((state) => {
        console.log("Zustand useStore.js: ", state);
        const updatedTutorials = [newTutorial, ...state.tutorials];
        return {
          tutorials: updatedTutorials,
        };
      });
    },
  };
});

export default useStore;
