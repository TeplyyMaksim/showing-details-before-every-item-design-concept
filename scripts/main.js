document.addEventListener('DOMContentLoaded', function(){
  const buttons = document.querySelectorAll('.item button');
  
  addEventListenerList(buttons, 'click', getItem);
}, false);

function getItem(event) {
  return checkNextSibling(event.target.parentElement);
}

function checkNextSibling(item) {
  var nextItem = item.nextSibling;
  
  if (!nextItem) {
    showDetails(item);
    return;
  }

  var itemBottom = item.getBoundingClientRect().bottom,
    nextItemBottom = nextItem.getBoundingClientRect().bottom;


  if (nextItemBottom > itemBottom) {
    showDetails(item, true);
    return;
  }

  return checkNextSibling(nextItem);
}

function addEventListenerList(list, event, fn) {
  for (var i = 0, len = list.length; i < len; i++) {
      list[i].addEventListener(event, fn, false);
  }
}

function showDetails(item, hasNextSibling) {
  removeOldDetails();

  var wrapper = item.parentElement,
    details = document.createElement('div');

  details.id = 'item-details';
  details.innerHTML = '<h2>Details</h2><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim autem, distinctio ipsa sed quae totam repellendus facere a ut molestiae voluptate animi et nostrum at esse labore harum? Maxime, qui?</p>';

  if (hasNextSibling) {
    wrapper.insertBefore(details, item.nextSibling);
  } else {
    wrapper.appendChild(details);
  }
}

function removeOldDetails() {
  var oldDetails = document.getElementById('item-details');

  if (oldDetails) {
    oldDetails.remove();
  }
}