"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const generateTeamsButton = document.querySelector("button");
    if (generateTeamsButton) {
        generateTeamsButton.addEventListener("click", generateTeams);
    }
});
function generateTeams() {
    const namesInput = document.getElementById("names");
    const teamCountInput = document.getElementById("teamCount");
    const resultDiv = document.getElementById("result");
    const names = namesInput.value.split(",").map(name => name.trim());
    const teamCount = parseInt(teamCountInput.value, 10);
    if (names.length < 2 || isNaN(teamCount) || teamCount < 1 || names.length < 2 * teamCount) {
        if (resultDiv) {
            resultDiv.innerHTML = "Por favor, ingresa al menos dos nombres y selecciona un número válido de equipos.";
        }
        return;
    }
    const teams = distributeNamesToTeams(names, teamCount);
    if (resultDiv) {
        resultDiv.innerHTML = formatTeamsResult(teams);
    }
}
function distributeNamesToTeams(names, teamCount) {
    // Asegurarse de que haya al menos un equipo y cada equipo tenga al menos 2 nombres
    if (teamCount < 1 || names.length < 2 * teamCount) {
        return [['Error: Debes tener al menos un equipo y asegurar al menos 2 nombres por equipo.']];
    }
    const teams = new Array(teamCount).fill([]).map(() => []);
    // Distribuir al menos 2 nombres por equipo
    for (let i = 0; i < names.length; i++) {
        const teamIndex = i % teamCount;
        teams[teamIndex].push(names[i]);
    }
    // Asegurarse de que cada equipo tenga al menos 2 nombres
    teams.forEach(team => {
        while (team.length < 2) {
            // Tomar un nombre de otro equipo
            const otherTeamIndex = (teamCount + teams.indexOf(team) + 1) % teamCount;
            const transferName = teams[otherTeamIndex].pop();
            if (transferName) {
                team.push(transferName);
            }
            else {
                // Si no hay más nombres disponibles, salir del bucle
                break;
            }
        }
    });
    return teams;
}
function formatTeamsResult(teams) {
    return teams.map((team, index) => `Equipo ${index + 1}: ${team.join(", ")}`).join("<br>");
}
