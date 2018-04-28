$(document).ready(function () {
    const logIn = (event) => {
        event.preventDefault();
        const typedUsername = $(".username-input-field").val();
        const typedPassword = $(".password-input-field").val();
        const localStorageUsername = localStorage.getItem("username");
        const localStoragePassword = localStorage.getItem("password");
        if (typedUsername == localStorageUsername && typedPassword === localStoragePassword) {
            window.location.href = "file:///C:/Users/Dan/Desktop/Coding/Reading%20Recommendations/main-app-page.html";
        } else if (localStorageUsername === null || localStoragePassword === null) {
            alert("Please create an account.")
        } else {
            alert("Wrong Username or Password")
        }
    }

    $("#log-in-button").click(logIn);

    const unhideCreateForm = (event) => {
        event.preventDefault();
        $("#create-account-form").css("display", "block");
        $("#log-in-form").css("display", "none");
        $(".log-in-page-form").css("margin-bottom", "10%");
    }

    $("#create-account-link").click(unhideCreateForm);


    const hideCreateForm = (event) => {
        event.preventDefault();
        $("#create-account-form").css("display", "none");
        $("#log-in-form").css("display", "block");
        $(".log-in-page-form").css("margin-bottom", "13%");
    }

    $("#back-link").click(hideCreateForm);

    //This function registers new accounts
    const registerNewAccount = (event) => {
        event.preventDefault();
        const registerUsername = $("#create-username-input-field").val();
        const registerPassword = $("#create-password-input-field").val();
        const confirmPassword = $(".confirm-pass-input-field").val();
        if (registerPassword === confirmPassword) {
            localStorage.setItem("username", registerUsername);
            localStorage.setItem("password", registerPassword);
        } else {
            alert("Your passwords do not match!");
        }

    };

    $("#create-account-button").click(registerNewAccount);



})