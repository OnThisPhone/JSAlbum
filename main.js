/***
 * No copyright. Use as thou wilt
 * Made by onThisPhone
 * 
 * A simple example of a thing that can show images depending on
 * what was clicked
 * 
 * NOTE The image names are generic 1, 2, 3, etc..
 *      This example probably didn't need anything more specific.
 *      But.. Since they're generic, it let me be a little lazy
 *      and load images directly with an index.
 * 
 * NOTE I chose classes for each container instead of ID, becuase
 *      it's said to be slightly faster than "id"/# in most instances
 * 
 * NOTE In the CSS style file, i skipped using the shorthand for background because it can
 *      sometimes cause some issues when manipulating backgrounds in JS (I speak from experience)
 * 
 * NOTE Since i got the email so late, i didn't have time to add everything i wanted. But i feel this
 *      is sufficient to demonstrate how i write in an hour.
 */

//When the document loads, run some inits
window.onload = (e) =>{
    //Loads all the images at start
    LoadImages();

    //Click listeners
    //Clicking the main image
    document.body.querySelector(".mainImage").addEventListener("click", (e) =>{

        //Handle clicks
        HandleMainImageClicks(e);
    });

    //Click any of the children of the mainTabs class.
    document.body.querySelector(".mainTabs").addEventListener('click', (e) => {

        //Only do the click if it was one of the children and not the parent
        if(!e.target.classList.contains("mainTabs")){
            //Break image into the index it finds in the path name
            let index = BreakImageIndex(e.target.style.backgroundImage);

            //Updates the image
            UpdateMainImage(index);
        }
    });

}

//Loads the images into the panels
function LoadImages(){

    //Load the thumbnails first
    LoadThumbnails();

    //Update/Load the main image in the big panel (Start on index 0)
    UpdateMainImage(1);
}

//Loads the thumbnails for the bottom panels
function LoadThumbnails(){

    //Set the element
    let mainTabs = document.querySelectorAll(".mainTabs div");

    //Step through each element in the mainTabs parent
    //Add an image to each
    for(let i = 0; i < mainTabs.length; ++i){
        mainTabs[i].style.backgroundImage = "url('data/thumbnails/" + (i + 1) + ".webp')";
    }
}

//Changes the main image
function UpdateMainImage(index){

    //Set the element
    let mainImage = document.body.querySelector(".mainImage");

    mainImage.style.backgroundImage = "url('data/images/" + index + ".webp')";
}

//Handles clicks for the main image
function HandleMainImageClicks(event){

    //The current index of the image
    let curIndex = BreakImageIndex(event.target.style.backgroundImage);

    //NOTE Since the content is always centered horizontally, this works. No need to check the element's physical position and size in DOM
    //Click on the right side of the main image.
    if(event.clientX > document.body.clientWidth / 2){
        ++curIndex;
    }
        
    //Click on the left side of the main image.
    else{
        --curIndex;
    }

    //Check range of the index change and loop it.
    if(curIndex > 6)
        curIndex = 1;
    else if(curIndex < 1)
        curIndex = 6;

    //Update image with new index
    UpdateMainImage(curIndex);
}

//Takes a path to either a thumbnail or a main file and converts it into an index the app can use to change the
//main image.
function BreakImageIndex(path){

    //Looks through the string and gets the letter of the file
    let ind = path.indexOf(".webp");
    let imgIndex = path.substring(ind - 1, ind);
    
    //Returns the index it found
    return imgIndex;
}
