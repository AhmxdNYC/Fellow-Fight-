// switchStage.js

// List of available stage images
const stageImages = [
    "/Stages/namek.png",
    `https://i.pinimg.com/originals/cb/d5/12/cbd512bde8bbeb2a780bc7fb87f6e98d.gif`
    // Add more paths as needed
];

// Function to get a random stage image
export const getRandomStageImage = () => {
    const randomIndex = Math.floor(Math.random() * stageImages.length);
    return stageImages[randomIndex];
};
