let callbackStatus = document.getElementById("callbackStatus");
let status = document.getElementById("status");
let callbackBtn = document.getElementById("callbackBtn");
let promiseBtn = document.getElementById("promiseBtn");
function getTeam(done) {
    setTimeout(function () {
        done(["Asha", "Ravi", "Meera"]);
    }, 1000);
}
callbackBtn.addEventListener("click", function () {
    callbackStatus.textContent = "Loading team...";
    getTeam(function (team) {
        callbackStatus.textContent = team.join(", ");
    });
});
function getTeamDetails(team, done) {
    setTimeout(function () {
        done({
            name: team[0],
            role: "Developer"
        });
    }, 1000);
}
function getCity(person, done) {
    setTimeout(function () {
        done("Coimbatore");
    }, 1000);
}
function callbackHell() {
    getTeam(function (team) {
        console.log("Team:", team);
        getTeamDetails(team, function (person) {
            console.log("Person:", person);
            getCity(person, function (city) {
                console.log("City:", city);
            });
        });
    });
}
function getTeamPromise(shouldFail) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (shouldFail) {
                reject("server is down");
            } else {
                resolve(["Asha", "Ravi", "Meera"]);
            }
        }, 1000);
    });
}
function getTeamDetailsPromise(team) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve({
                name: team[0],
                role: "Developer"
            });
        }, 1000);
    });
}
function getCityPromise(person) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve("Coimbatore");
        }, 1000);
    });
}
promiseBtn.addEventListener("click", function () {
    status.classList.remove("error");
    status.textContent = "Loading team...";
    let promise = getTeamPromise(false);
    console.log(promise);
    promise
        .then(function (team) {
            console.log("Team:", team);
            status.textContent = "Team: " + team.join(", ");
            return getTeamDetailsPromise(team);
        })
        .then(function (person) {
            console.log("Person:", person);
            return getCityPromise(person);
        })
        .then(function (city) {
            console.log("City:", city);
            status.textContent += " | City: " + city;
        })
        .catch(function (error) {
            console.log(error);
            status.textContent = error;
            status.classList.add("error");
        });
});