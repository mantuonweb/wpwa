$(document).ready(() => {
  mdc.ripple.MDCRipple.attachTo(document.querySelector('#btnSubmit'));
  mdc.textField.MDCTextField.attachTo(document.querySelector("#txtCountryCode"));
  mdc.textField.MDCTextField.attachTo(document.querySelector("#txtContactNo"));
  let contacts = getLocaleStorage() || [];
  appendList(contacts);
  $("#btnSubmit").click((e) => {
    let mobileNumber = $("#txtContactNo input").val();
    let countryCode = $("#txtCountryCode input").val();
    if (mobileNumber && countryCode) {
      let contact = {
        countryCode,
        mobileNumber
      };
      if (!contacts.find(item => {
        return ((item.countryCode == contact.countryCode) && (item.mobileNumber == contact.mobileNumber))
      })) {
        contacts.push(contact);
        appendList([contact]);
      }
      setLocalStorage(contacts);
      sendChat(countryCode, mobileNumber);
    }
  });
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("serviceWorker.js")
        .then(registration => {
          console.log("service worker registered");
          registration.onupdatefound = () => {
            updateServiceWorker(registration)
          }
        })
        .catch(err => console.log("service worker not registered", err))
    });
  }
});
function sendChat(countryCode, mobileNumber) {
  let whatsappUrl = 'https://api.whatsapp.com/send?phone=' + countryCode + mobileNumber;
  window.open(whatsappUrl);
}
function setLocalStorage(contacts) {
  try {
    if (contacts) {
      let strcontacts = JSON.stringify(contacts);
      window.localStorage.setItem("contacts", strcontacts);
    }
  }
  catch {

  }
}
function getLocaleStorage() {
  let contacts = window.localStorage.getItem("contacts") || [];
  try {
    if (contacts && typeof contacts == "string") {
      contacts = JSON.parse(contacts);
    }
    else {
      contacts = [];
    }
  }
  catch {
    contacts = [];
  }
  return contacts;
}
function updateServiceWorker(registration) {
  const installingWorker = registration.installing;
  if (installingWorker == null) {
    return;
  }
  installingWorker.onstatechange = () => {
    if (installingWorker.state === 'installed') {
      if (navigator.serviceWorker.controller) {
        // We will use this callback to present button to allow user to refresh 
        // the application

        // Execute callback
        // if (config && config.onUpdate) {
        //   config.onUpdate(registration);
        // }

      } else {
        // Not necessary for this example
      }
    }
  };
}
function appendList(contacts) {
  let strEle = contacts.map(contact => addContactButton(contact.countryCode, contact.mobileNumber)).join("");
  let ele$ = $(strEle);
  $(ele$).find(".delete-rec").click(({ currentTarget }) => {
    let countryCode = $(currentTarget).data("ccode");
    let mobileNumber = $(currentTarget).data("number");
    let contacts = getLocaleStorage() || [];
    contacts = contacts.filter(item => {
      return (!((item.countryCode == countryCode) && (item.mobileNumber ==mobileNumber)))
    });
    setLocalStorage(contacts);
    $($(currentTarget).parents(".mdc-card__actions")).remove();
  });
  $(ele$).find(".send-message").click(({ currentTarget }) => {
    let countryCode = $(currentTarget).data("ccode");
    let mobileNumber = $(currentTarget).data("number");
    sendChat(countryCode, mobileNumber);
  });
  $('.contact-list').append(ele$);
}
function addContactButton(cCode, num) {
  return ` <div class="mdc-card__actions" >
    <button class="mdc-button">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">(${cCode}) ${num}</span>

    </button>
    <button data-number="${num}" data-ccode="${cCode}" class="mdc-button mdc-card__action mdc-card__action--button delete-rec"
        >
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label"> <i class="material-icons mdc-button__icon"
                aria-hidden="true">delete</i></span>
    </button>
    <button data-number="${num}" data-ccode="${cCode}" class="mdc-button mdc-card__action mdc-card__action--button send-message"
       >
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label"><i class="material-icons mdc-button__icon"
                aria-hidden="true">message</i></span>
    </button>
</div>`;
}
