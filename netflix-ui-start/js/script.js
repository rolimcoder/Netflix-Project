(function() {

  
  let container = document.querySelector('.container-marcio'),
      list = document.querySelector('.list'),
      leftArrow = container.querySelector('.left-arrow'),
      rightArrow = container.querySelector('.right-arrow'),
      cards = Array.from(document.querySelectorAll('.list__item')),
      containerWidth = list.offsetWidth,
      cardWidth = cards[0].offsetWidth,
      cardsInView = containerWidth / cardWidth,
      xMoved = 0,
      absPosition = 0,
      availableShifts = Math.floor(cards.length / (containerWidth / cardWidth)),
      movedRight = 0,
      cardsMoved = 0; 

  init();
  
  function init() {
    leftArrow.addEventListener('click', moveRight);
    rightArrow.addEventListener('click', moveLeft);
    
    setupCarousel();
  }
  
  // function calcuslatseAvailableShifts() {
  //   return containerWidth / cardWidth; 
  // }
  
// Clone X nodes to front and back for infinite looping
  function setupCarousel() {
    cloneFrontNodes();
    cloneBackNodes();
  }
  
  function cloneFrontNodes() {
    let numOfClones = caclculateCloneNum(),
        docFrag = document.createDocumentFragment();
          
    for (let i = 0; i < numOfClones; i++) {
      let card = cards[i];
      let clone = card.cloneNode(true);
 
      docFrag.append(clone);
    }
        
    list.appendChild(docFrag);
  }
  
  function cloneBackNodes() {
    let numOfClones = caclculateCloneNum(),
         docFrag = document.createDocumentFragment();
    
    for(let i = cards.length - numOfClones; i < cards.length; i++){
       let clone = cards[i].cloneNode(true); 
       docFrag.append(clone);
    }
    
    list.prepend(docFrag);
    nonAnimatedTransform(-containerWidth);
  }
  
  function caclculateCloneNum() { 
    return Math.floor(containerWidth / cardWidth); 
  }
  
  function nonAnimatedTransform(distance){
    xMoved = distance;
    
    list.style.transition = 'none';
    list.style.transform = `translateX(${xMoved}px)`;
    flushCSS(list);
    list.style.transition = '1s ease-in-out';
  }
  
  
  function moveRight(){    
    absPosition++;

    calculateDistance(true);
    list.style.transform = `translateX(${xMoved}px)`; 
  }
  
  function moveLeft(){    
    absPosition--;

    calculateDistance(false);
    list.style.transform = `translateX(${xMoved}px)`; 
  }
  
// If on the last shift, check to see if there is a remainder number of cards and translate for remainder of cards. 
// If we've translated the remainder, reset to 0.
// If no remainder, reset to beginning 0 translate.
  function calculateDistance(dir) {
    let distance;
    
    if (Math.abs(absPosition) >= availableShifts && availableShifts >= Math.abs(absPosition)) {
        distance = (cardWidth + 10) * (Math.ceil(cards.length % cardsInView));
    } else {
      distance = containerWidth;
    }

    xMoved += dir ? distance : -1 * distance;
  } 
  
 //Give the new container position, and the new
 //number of how many cards will be moved at end.
  //e.g reset to beginning? 
  //---> distance = containerWidth; 
  //---> newCardsMoved = 0;
 function waitForTransitionEnd(distance, newCardsMoved){
    setTimeout(() => {
      nonAnimatedTransform(distance);
      cardsMoved = newCardsMoved;
    }, 1000)
 } 

  
 //Temporary function until transiton event is added
  function flushCSS(el){
      el.offsetHeight;
 }
  
})();