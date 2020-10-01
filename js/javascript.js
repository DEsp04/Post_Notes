//Create a post-it users can write, drag any where on the page and stay put on that spot when user unclick/undrag.
//Once post-it note is in new location, another new post-it is made on the same location as the one before
//Create an object containing methods that will move post-it, and create a new post-it


// window.onbeforeunload = function () { //Clicking reload button JS will check if window.scrollTo is present (always be true). Before page is unloaded (everything on the page is remove), the page is scrolled to x=0,y=0, then the page is reloaded.
//     if(window.scrollTo) window.scrollTo(0,0);
// };

//Web history is one of several web Application Programming Interfaces (APIs) provided by the browser. It manipulates the browser's tab of a specific loaded page and has a property call scrollRestoration which when set to manual, will change the auto default making the page to scroll all to 0.
if(history && history.scrollRestoration) history.scrollRestoration = "manual";


let position = {
  offsetX: 0,
  offsetY: 0,
  isClicked: false,
  noteBoard: document.getElementById("note-board"),
  textArea: [...document.querySelectorAll('textarea')]
};



//Console side & DOM
let events = {
  clicked: position.textArea.forEach(post => post.addEventListener('mousedown', function(e){
    position.isClicked = true;
    post.classList.add("drag");

    /* offsetX and Y from textArea perspective gives initial position (x= 0 to -189, y = 0 to -189) of the cursor when mouse is clicked */
    position.offsetX = post.offsetLeft - e.pageX;
    position.offsetY = post.offsetTop - e.pageY;

  })),
  clikedMove: position.textArea.forEach(post => post.addEventListener('mousemove', function(e){
    if(!position.isClicked) return

    e.preventDefault();

    /* Once mouse makes initial clicked and kept pressed, position of mouse relative to webpage will be given. Number increase from left -> right */
    /* Adding the position of the moving mouse (relative to webpage) to the position.offsetX (-#) will create a difference that will then be added to style properties top and left */
     let moveX = e.pageX + position.offsetX;
     let moveY = e.pageY + position.offsetY;

     let textAreaPosition = function(x, y) {
       post.style.left = x + "px";
       post.style.top = y + "px";
     }
     textAreaPosition(moveX, moveY);
     //position.newTextArea();
  })),
  mouseLeave: position.textArea.forEach(post => post.addEventListener('mouseleave', function(){
    position.isClicked = false;
    post.classList.remove("drag");
  })),
  mouseup: position.textArea.forEach(post => post.addEventListener('mouseup', function() {
    position.isClicked = false;
    post.classList.remove("drag");
  }))
  // newTextArea: function(){
  //   const parent = position.noteBoard;
  //   parent.append('\<textarea> </textarea>\');
  // }
};







//On screen
