window.onload = function() {
  var container = document.querySelector('#masonry');
  var masonry = new Masonry(container, {
    columnWidth: 40,
    itemSelector: '.item',
    horizontalOrder: true,
    stagger: 30
  });
}

