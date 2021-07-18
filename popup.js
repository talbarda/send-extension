document.addEventListener('DOMContentLoaded', function () {
    let sendmessageButton = document.getElementById("sendmessage");
    sendmessageButton.addEventListener('click', openWhatsApp);
});

function openWhatsApp() {
    let phoneNoElem = document.getElementById("phonenumber");
    let messageContentElem = document.getElementById("messagecontent");
    let countryCode = document.getElementById("countrycode").value.replace(/\D/g, '');
    let message = messageContentElem.value;
    let fixedPhone = phoneNoElem.value.replace(/\D/g, '').replace(/^0+/, '');
	if (!fixedPhone.startsWith(countryCode)) {
		fixedPhone = `${countryCode}${fixedPhone}`
	}
    let whatsAppUrl = `https://api.whatsapp.com/send?phone=${fixedPhone}`;
    if (message !== undefined && message.trim() !== "") {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let tabUrl = tabs[0].url;
            // use `url` here inside the callback because it's asynchronous!
            whatsAppUrl += "&text=" + message.split("URL").join(tabUrl);
            console.log(whatsAppUrl);
            chrome.tabs.create({url: encodeURI(whatsAppUrl)});
        });
    } else {
        console.log(whatsAppUrl);
        chrome.tabs.create({url: encodeURI(whatsAppUrl)});
    }

};