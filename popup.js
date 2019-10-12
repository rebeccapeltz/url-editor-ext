// chrome.tabs.getCurrent(function (tab) {
//     console.log(tab.url);
//     let url = tab.url
//     document.querySelector('#url').value = url
// }
// );

chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
    let url = decodeURIComponent(tabs[0].url)
    console.log(url)
    document.querySelector('#url').value = url
});

window.addEventListener('DOMContentLoaded', e => {
    const submitButton = document.querySelector('#submit')
    submitButton.addEventListener('click', (event) => {
        let navto = document.querySelector('#url').value
        chrome.tabs.create({ url: navto });
    })
    const closeButton = document.querySelector('#close')
    closeButton.addEventListener('click',event=>{
        window.close()
    })

})

