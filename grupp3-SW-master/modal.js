//connect html elements to the javascript code
const modal = document.querySelector('.modal')
const closeButton = document.querySelector('.close-button')
const ul = document.querySelector('.detailList')
//toggle the modal function
function toggleModal() {
  modal.classList.toggle('show-modal')
}
//when the user clicks outside of the modal, then call this function
function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal()
  }
}
//listen for button event when the user clicks show more
document.getElementById('moreResults').addEventListener('click', (e) => {
  //get the url when the user clicks show more on a result row
  let url = e.target.value
  //call the function to show the details of the result which the user clicks on
  showDetails(url)
  //call the function to make the modal visible
  toggleModal()
})
//handle the event when the user clicks close button or clicks outside of the modal
closeButton.addEventListener('click', toggleModal)
window.addEventListener('click', windowOnClick)
//show the details on the modal
function showDetails(url) {
  //call fetch function to fetch data from the url
  fetch(`${url}`)
    .then((response) => response.json())
    .then((data) => {
      //if the data is null then show to the user message
      if (Object.keys(data).length === 0) {
        alert('No results')
      } else {
        // pick the first 10 keys and values to show
        let details = pairingKeyAndValue(
          Object.fromEntries(Object.entries(data).slice(0, 10))
        )
        ul.innerHTML = details
      }
    })
}
//the function to map key and value and return strings
function pairingKeyAndValue(obj) {
  return Object.entries(obj)
    .map(([key, value]) => {
      return `${key} : ${value}`
    })
    .join('<br>')
}
