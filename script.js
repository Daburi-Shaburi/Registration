function showError(field, message) {
    const parent = field.parentElement;
    let errorElement = parent.querySelector('.error-message');

    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        parent.insertBefore(errorElement, field.nextSibling);
    }
    errorElement.textContent = message;
    field.style.borderColor = 'red';
}

function clearError(field) {
    const parent = field.parentElement;
    const errorElement = parent.querySelector('.error-message');

    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderColor = '';
}

function checkRequiredFields() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        clearError(field);
        
        if (field.type === "radio" && !document.querySelector(`input[name="${field.name}"]:checked`)) {
            isValid = false;
            let label = field.name.charAt(0).toUpperCase() + field.name.slice(1);
            let h3Element = document.querySelector(`input[name="${field.name}"]`).closest('main').querySelector(`h3:contains(${label})`);

            if (h3Element) {
                showError(field, `${h3Element.textContent.trim()} is required.`);
            }
            else {
                 showError(field, `${label} is required.`);
            }
        } 

        else if (field.type !== "radio" && field.value.trim() === '') {
            isValid = false;
            let h3Element = field.closest('main').querySelector(`h3:has(> input#${field.id}), h3:has(+ input#${field.id}), h3:contains(${field.name.charAt(0).toUpperCase() + field.name.slice(1)})`);
            
            if (h3Element) {
                 showError(field, `${h3Element.textContent.trim()} is required.`);
            }
            else {
                 showError(field, `${field.name} is required.`);
            }
        } 
        else if (field.type === 'checkbox' && !field.checked) {
             isValid = false;
             showError(field, 'You must agree to the Terms and Conditions.');
        }
    });

    return isValid;
}


function checkPasswordStrength() {
    const password = document.getElementById('pw').value;
    const passwordFeedback = document.getElementById('password-feedback');
    const regex = /^(?=.*[0-9])(?=.*[\W_]).{8,}$/; 
    let isValid = true;

    if (password.length >= 8 && regex.test(password)) {
        passwordFeedback.textContent = "Password meets the requirements.";
        passwordFeedback.style.color = 'green';
    } else {
        passwordFeedback.textContent = "Password must be at least 8 characters long, include 1 number and 1 special character.";
        passwordFeedback.style.color = 'red';
        isValid = false;
    }
    return isValid;
}

function matchPassword() {
    const password = document.getElementById('pw').value;
    const confirmPassword = document.getElementById('Confirm').value;
    const matchFeedback = document.getElementById('match-feedback');
    let isValid = true;

    if (confirmPassword !== password) {
        matchFeedback.textContent = "Passwords do not match!";
        matchFeedback.style.color = 'red';
        isValid = false;
    }
    else if (confirmPassword === "") {
        matchFeedback.textContent = "";
        isValid = false;
    }
    else {
        matchFeedback.textContent = "Passwords match.";
        matchFeedback.style.color = 'green';
    }
    return isValid;
}

document.addEventListener('DOMContentLoaded', function() {
    const bdayInput = document.getElementById('bday');
    const today = new Date();
    const cutoffDate = new Date(
        today.getFullYear() - 18, 
        today.getMonth(),         
        today.getDate()           
    );
    const year = cutoffDate.getFullYear();
    const month = String(cutoffDate.getMonth() + 1).padStart(2, '0');
    const day = String(cutoffDate.getDate()).padStart(2, '0');
    const maxDateString = `${year}-${month}-${day}`;

    bdayInput.setAttribute('max', maxDateString);
    console.log(`Maximum allowed date of birth set to: ${maxDateString}`);
});

function validateAndSubmit(event) {
    const fieldsAreValid = checkRequiredFields();
    const strengthIsValid = checkPasswordStrength();
    const matchIsValid = matchPassword();
    const allValid = fieldsAreValid && strengthIsValid && matchIsValid;

    if (allValid) {
        alert("Successfully Registered!");
        return true;
    } 
    else {
        event.preventDefault();
        return false;
    }
}
