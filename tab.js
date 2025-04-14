function openTab(evt, tabId) {
  // Get all elements with class="tabcontent" and hide them
  let tabcontent = document.getElementsByClassName("tabcontent");
  tabcontent.forEach((tab) => {
    tab.style.display = "none";
  });

  // Get all elements with class="tablinks" and remove the class "active"
  let tablinks = document.getElementsByClassName("tablink");
  tablinks.forEach((tablink) => {
    tablink.className = tablink.className.replace(" active", "");
  });

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabId).style.display = "block";
  evt.currentTarget.className += " active";
}
