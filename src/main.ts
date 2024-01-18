document.addEventListener("DOMContentLoaded", () => {
    const generateTeamsButton = document.querySelector("button");

    if (generateTeamsButton) {
        generateTeamsButton.addEventListener("click", generateTeams);
    }
});

function generateTeams() {
    const namesInput = document.getElementById("names") as HTMLInputElement;
    const teamCountInput = document.getElementById("teamCount") as HTMLInputElement;
    const resultDiv = document.getElementById("result");

    const names = namesInput.value.split(",").map(name => name.trim());
    const teamCount = parseInt(teamCountInput.value, 10);

    if (names.length === 0 || isNaN(teamCount) || teamCount < 1) {
        if (resultDiv) {
            resultDiv.innerHTML = "Por favor, ingresa nombres y un número válido de equipos.";
        }
        return;
    }

    const teams = distributeNamesToTeams(names, teamCount);
    if (resultDiv) {
        resultDiv.innerHTML = formatTeamsResult(teams);
    }
}

function distributeNamesToTeams(names: string[], teamCount: number): string[][] {
    const teams: string[][] = new Array(teamCount).fill([]).map(() => []);

    for (let i = 0; i < names.length; i++) {
        const teamIndex = i % teamCount;
        teams[teamIndex].push(names[i]);
    }

    return teams;
}

function formatTeamsResult(teams: string[][]): string {
    return teams.map((team, index) => `Equipo ${index + 1}: ${team.join(", ")}`).join("<br>");
}
