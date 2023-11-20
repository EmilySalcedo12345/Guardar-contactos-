function openForm(index) {
    const addContactForm = document.getElementById("addContactForm");
    addContactForm.style.display = "block";
  
    if (index !== undefined) {
      const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
      const contact = contacts[index];
      document.getElementById("contactIndex").value = index;
      document.getElementById("name").value = contact.name;
      document.getElementById("email").value = contact.email;
    } else {
      document.getElementById("contactIndex").value = "";
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
    }
  }
  
 
  function saveContact(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const index = document.getElementById("contactIndex").value;
  
    if (name && email) {
      const contact = { name, email };
      let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  
      if (index !== "") {
       
        contacts[index] = contact;
      } else {
      
        contacts.push(contact);
      }
  
      localStorage.setItem("contacts", JSON.stringify(contacts));
  
      updateContactList();
      closeForm();
    }
  }
  
  function deleteContact(index) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  
    updateContactList();
  }
  

  function updateContactList() {
    const contactListContainer = document.getElementById("contact-list");
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  
 
    contactListContainer.innerHTML = "";
  
   
    contacts.forEach((contact, index) => {
      const contactItem = document.createElement("div");
      contactItem.className = "contact-item";
      contactItem.innerHTML = `
        <span>${contact.name} - ${contact.email}</span>
        <button onclick="openForm(${index})">Editar</button>
        <button class="delete-btn" onclick="deleteContact(${index})">Eliminar</button>
      `;
      contactListContainer.appendChild(contactItem);
    });
  }
  

  window.onload = updateContactList;
