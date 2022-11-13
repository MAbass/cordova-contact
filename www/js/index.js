document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  findAllContact();
}

function findAllContact() {
  var options = new ContactFindOptions();
  options.filter = "";
  options.multiple = true;
  fields = ["displayName", "phoneNumbers"];
  navigator.contacts.find(
    fields,
    contactfindSuccess,
    contactfindError,
    options
  );

  function contactfindSuccess(contacts) {
    const listContacts = document.getElementById("list-contacts");
    listContacts.innerHTML = "";
    contacts.forEach((singleContact) => {
      const listContacts = document.getElementById("list-contacts");

      const containerContact = document.createElement("div");
      containerContact.setAttribute("data-role", "collapsible");

      const nameContact = document.createElement("h2");
      nameContact.innerText = singleContact.displayName;

      containerContact.appendChild(nameContact);

      const listSubContact = document.createElement("ul");
      listSubContact.setAttribute("data-role", "listview");
      listSubContact.setAttribute("id", "detailsContact");

      const nameSubContact = document.createElement("li");
      const nameSubContactText = document.createElement("h5");
      nameSubContactText.innerText =
        "Nom du contact:" + singleContact.displayName;
      nameSubContact.appendChild(nameSubContactText);

      const phoneSubContact = document.createElement("li");
      const phoneSubContactText = document.createElement("h5");
      phoneSubContactText.innerText =
        "Numéro de téléphone:" + singleContact.phoneNumbers[0].value;
      phoneSubContact.appendChild(phoneSubContactText);

      listSubContact.appendChild(nameSubContact);
      listSubContact.appendChild(phoneSubContact);

      containerContact.appendChild(listSubContact);

      $(containerContact).on("swipeleft", function () {
        $(this).hide("slow", function () {
          singleContact.remove(onSuccess);
        });
      });

      listContacts.appendChild(containerContact);

      $(listContacts).collapsibleset("refresh");
    });
  }

  function contactfindError(message) {
    alert("Failed because: " + message);
  }
}

function addContact() {
  let contact = navigator.contacts.create();
  contact.givenName = firstname.value + lastname.value;

  let name = new ContactName();
  name.givenName = firstname.value;
  name.familyName = lastname.value;
  contact.name = name;

  let listAddress = [];
  let addressContact = new ContactAddress();
  addressContact.streetAddress = address.value;
  listAddress[0] = addressContact;
  contact.addresses = listAddress;

  let listContactField = [];
  let contactField = new ContactAddress();
  contactField.type = "home";
  contactField.value = phoneNumber.value;
  contactField.pref = true;
  listContactField[0] = contactField;
  contact.phoneNumbers = listContactField;

  // save to device
  contact.save(onSuccess, onError);

  function onSuccess() {
    location.href = "#homepage";
    findAllContact();
  }
  function onError(message) {
    alert("Error for added:", message);
  }
}
