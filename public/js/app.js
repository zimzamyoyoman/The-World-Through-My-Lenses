var container = document.querySelector('#masonry');
var masonry = new Masonry(container, {
  columnWidth: 80,
  itemSelector: '.item',
  horizontalOrder: true,
  stagger: 30
});