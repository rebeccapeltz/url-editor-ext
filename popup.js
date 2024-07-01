// add to popup DOM
const linkTable = document.querySelector("#link-table");

const getCell = (css, text) => {
  const cell = document.createElement("div");
  cell.appendChild(document.createTextNode(text));
  const classes = css.split(" ");
  for (let item of classes) {
    cell.classList.add(item);
  }
  return cell;
};
const appendRow = (info) => {
  const row = document.createElement("div");

  if (info.scheme.indexOf("https") < 0) {
    row.classList.add("unencrypted");
  }
  row.classList.add("row");
  linkTable.append(row);

  row.append(getCell("cell scheme-cell", info.scheme));
  row.append(getCell("cell text-cell", info.text));
  row.append(getCell("cell link-cell", info.href));
};

// Update the relevant fields with the new data.
const setDOMInfo = (info) => {
  //console.log("info: ",info);
  for (let i = 0; i < info.length; i++) {
    //console.log(info[i].href, info[i].text, info[i].scheme);
    appendRow(info[i]);
  }
  //document.querySelector('#anchor-data').textContent = JSON.stringify(info)
};

window.addEventListener("DOMContentLoaded", () => {
  // ...query for the active tab...
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      // ...and send a request to content for the DOM info...
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: "popup", subject: "DOMInfo" },
        setDOMInfo
      );
    }
  );
});
