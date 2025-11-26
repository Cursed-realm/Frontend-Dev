class FormBuilder {
  constructor(fields) {
    this.fields = fields;
    this.formElement = null;
  }

  createForm(containerId) {
    const container = document.getElementById(containerId);
    let formHTML = '<form id="dynamicForm">';
    
    this.fields.forEach((field, index) => {
      formHTML += `
        <div>
          <label>${field.label}</label>
          <input type="${field.type}" name="${field.label.toLowerCase()}" id="field${index}">
        </div>
      `;
    });
    
    formHTML += '<button type="submit">Submit</button></form>';
    container.innerHTML = formHTML;
    
    this.formElement = document.getElementById('dynamicForm');
    this.formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(this.getFormData());
    });
  }

  getFormData() {
    const formData = {};
    this.fields.forEach((field, index) => {
      const input = document.getElementById(`field${index}`);
      formData[field.label.toLowerCase()] = input.value;
    });
    return formData;
  }
}

// Usage
const fields = [
  {type: 'text', label: 'Username'},
  {type: 'email', label: 'Email'},
  {type: 'password', label: 'Password'}
];

const formBuilder = new FormBuilder(fields);
formBuilder.createForm('formContainer');