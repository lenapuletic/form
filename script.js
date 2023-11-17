const form = document.querySelector(".needs-validation");

form.addEventListener("submit", function (e) {
    e.preventDefault()

    const firstName = document.getElementById('first_name');
    const lastName = document.getElementById('last_name');
    const gender = document.getElementById('gender');
    const birthYear = document.getElementById('year');
    const year = parseInt(birthYear.value);
    const address = document.getElementById('address');
    const addressRegex = /^[a-zA-Z\s]+\s\d+[a-zA-Z]?$/;
    const city = document.getElementById('city');
    const termsAndConditions = document.getElementById('terms_and_conditions');

    let isValid = true;

    // Validate First Name (should contain only letters)
    if (!/^[a-zA-Z]+$/.test(firstName.value)) {
        setInvalid(firstName, 'Please provide a valid first name');
        isValid = false;
    } else {
        setValid(firstName);
    }

    // Validate Last Name (should contain only letters)
    if (!/^[a-zA-Z]+$/.test(lastName.value)) {
        setInvalid(lastName, 'Please provide a valid last name');
        isValid = false;
    } else {
        setValid(lastName);
    }

    // Validate Gender (should be selected)
    if (gender.value === "") {
        setInvalid(gender, 'Please choose a valid gender');
        isValid = false;
    } else {
        setValid(gender);
    }

    // Validate Year of Birth (should be a number between 1910 and 2005)
    if (isNaN(year) || year < 1910 || year > 2005) {
        setInvalid(birthYear, 'Please provide a valid year');
        isValid = false;
    } else {
        setValid(birthYear);
    }

    // Validate Address (should not be empty and should contain street name and number)
    if (address.value === "" || !addressRegex.test(address.value)) {
        setInvalid(address, 'Please provide a valid address');
        isValid = false;
    } else {
        setValid(address);
    }

    // Validate City (should not be empty and should contain only letters)
    if (city.value === "" || !/^[a-zA-Z]+$/.test(city.value)) {
        setInvalid(city, 'Please provide a valid city');
        isValid = false;
    } else {
        setValid(city);
    }

    // Validate Terms and Conditions (should be checked)
    if (!termsAndConditions.checked) {
        setInvalid(termsAndConditions, 'Terms and Conditions');
        isValid = false;
    } else {
        setValid(termsAndConditions);
    }

    const finalData = {
        first_name: firstName.value,
        last_name: lastName.value,
        gender: gender.value,
        year_of_birth: year,
        address: address.value,
        city: city.value
    }

    

    if (isValid) {
        // Submit the form via AJAX 
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            displaySuccessMessage(finalData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
});

function setInvalid(field, message) {
    field.classList.add('is-invalid');
    field.nextElementSibling.textContent = message;
}

function setValid(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    field.nextElementSibling.textContent = "";
}

function displaySuccessMessage(finalData) {
    const successMessage = document.getElementById('successMessage');
    const inputData = document.getElementById('inputData');
    const heading = document.getElementById('heading');
    const paragraph = document.getElementById('paragraph');

    

    let listItems = '';

    listItems += `<li><strong>First name:</strong> ${finalData.first_name}</li>`;
    listItems += `<li><strong>Last name:</strong> ${finalData.last_name}</li>`;
    listItems += `<li><strong>Gender:</strong> ${finalData.gender}</li>`;
    listItems += `<li><strong>Year of birth:</strong> ${finalData.year_of_birth}</li>`;
    listItems += `<li><strong>Address:</strong> ${finalData.address}</li>`;
    listItems += `<li><strong>City:</strong> ${finalData.city}</li>`;

    inputData.innerHTML = listItems;
    successMessage.classList.remove('d-none');
    form.classList.add('d-none');

    heading.innerHTML = "Thank you!";
    paragraph.innerHTML = "Goodbye";
}

