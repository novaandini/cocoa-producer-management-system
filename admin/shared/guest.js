// The login page is for guests only.
if (localStorage.getItem("auth_token")) {
    const dashboardUrl = new URL(
        "../dashboard/index.html",
        document.currentScript.src
    );

    window.location.replace(dashboardUrl.href);
}
