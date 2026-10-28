const AUTH_API_URL = "http://127.0.0.1:8000/api";
const AUTH_SCRIPT_URL = document.currentScript.src;

function redirectToLogin() {
    const loginUrl = new URL("../login/index.html", AUTH_SCRIPT_URL);
    window.location.replace(loginUrl.href);
}

// Every page that loads this file is a protected admin page.
if (!localStorage.getItem("auth_token")) {
    redirectToLogin();
}

function getAuthToken() {
    return localStorage.getItem("auth_token");
}

function clearAuth() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
}

async function logout() {
    const token = getAuthToken();

    try {
        if (token) {
            await fetch(`${AUTH_API_URL}/auth/logout`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
        }
    } catch (error) {
        console.error("Logout request failed:", error);
    } finally {
        // Always remove the local session, even if the API is unreachable.
        clearAuth();
        redirectToLogin();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const sidebarMenu = document.querySelector(".sidebar-menu");

    if (!sidebarMenu) {
        return;
    }

    const logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.textContent = "Logout";
    logoutLink.addEventListener("click", function (event) {
        event.preventDefault();
        logout();
    });

    sidebarMenu.appendChild(logoutLink);
});
