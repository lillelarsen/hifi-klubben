
    function openNav() {
        document.getElementById("mySidenav").style.display = "block";
        document.getElementById("mySidenav").setAttribute('class', 'sidenav');
        document.getElementById("mySidenav").style.width = "250px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.display = "none";   
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("mySidenav").removeAttribute('class', 'sidenav');
    }

    function openAdminNav() {
        document.getElementById("myAdminSidenav").style.display = "block";
        document.getElementById("myAdminSidenav").setAttribute('class', 'adminsidenav');
        document.getElementById("myAdminSidenav").style.width = "250px";
    }

    function closeAdminNav() {
        document.getElementById("myAdminSidenav").style.display = "none";   
        document.getElementById("myAdminSidenav").style.width = "0";
        document.getElementById("myAdminSidenav").removeAttribute('class', 'adminsidenav');
    }
