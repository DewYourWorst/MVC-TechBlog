const loginFormHandler = async function (event) {
    event.preventDefault();

    const usernameEl = document.querySelector('#username-input');
    const passwordEl = document.querySelector('#password-input');

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value,
        }),
        headers: { 'Content-Type': 'application/json'},
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to login');
    }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);