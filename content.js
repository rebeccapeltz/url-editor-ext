// Listen for messages from the popup.
// params are request object showing where from and subject, sender knows the tab if needed,
// sendReponse is the name of the function in popup to send the DOM data to
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // First, validate the message's structure.
  console.log(request);
  if (request.from === "popup" && request.subject === "DOMInfo") {
    const schemeRegex = /^([a-z][a-z0-9+\-.]*):/;
    const anchors = document.getElementsByTagName("a");
    const links = new Array(anchors.length);
    for (let i = 0; i < links.length; i++) {
      let schemeMatch = anchors[i].href.match(schemeRegex);
      links[i] = {
        href: anchors[i].href,
        text: anchors[i].text,
        scheme: schemeMatch ? schemeMatch[1]: ""
      };
    }
    sendResponse(links);
  }
});