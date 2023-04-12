const fsp = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { nanoid } = require("nanoid");

async function listContacts() {
  try {
    const contacts = await fsp.readFile(contactsPath);
    const parsed = JSON.parse(contacts);
    return parsed;
  } catch (error) {
    console.log("error");
  }
}

async function getContactById(contactId) {
  try {
    const contactsParsed = await listContacts();
    const contact = contactsParsed.find((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactsParsed = await listContacts();
    const checkId = contactsParsed.find((contact) => contact.id === contactId);
    if (!checkId) {
      throw new Error();
    }
    const listWithoutContact = contactsParsed.filter(
      (contact) => contact.id !== contactId
    );
    fsp.writeFile(contactsPath, JSON.stringify(listWithoutContact));
    console.log(`contact removed`);
    return listWithoutContact;
  } catch (error) {
    console.log("There is no such Id");
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsParsed = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contactsParsed.push(newContact);
    await fsp.writeFile(contactsPath, JSON.stringify(contactsParsed));
    return contactsParsed;
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (id, body) => {
  const contactsParsed = await listContacts();
  const index = contactsParsed.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contactsParsed[index] = { id, ...body };
  await fsp.writeFile(contactsPath, JSON.stringify(contactsParsed));
  return contactsParsed[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
