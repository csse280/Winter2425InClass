import { Game } from "./Game.js";
import { LeaderboardManager } from "./LeaderboardManager.js";

export class PageController {
    constructor() {
        this.game = new Game();
        this.leaderboardManager = new LeaderboardManager();

        this.leaderboardManager.updateLeaderboard().then( () => {
            console.log("Finished updating the leaderboard data!");
            console.log(this.leaderboardManager.leaderboard);
            this.updateView();
        } );

        this.setupButtons();
    }

    setupButtons() {
        document.querySelector("#fakeWin").addEventListener("click", () => {

            // TODO: Actually determine if they made the leadderboard!
        
          console.log("TODO: Show the dialog!");
          $("#addNameDialog").modal("show");
        });
        
        document.querySelector("#addNameBtn").addEventListener("click", () => {
            document.querySelector("#addNameBtn").blur();
            let name = document.querySelector("#nameInput").value;
            console.log("Name: ", name);
        
            // TODO: Actually send the name to the server!
        
            $("#addNameDialog").modal("hide");
        });
    }

    updateView() {
        const leaderboardEl = document.querySelector("#leaderboard");
        leaderboardEl.innerHTML = "";
        for (let k = 0; k <  this.leaderboardManager.leaderboard.length; k++) {
            let score =  this.leaderboardManager.leaderboard[k];
            console.log("Make a row for", score);
            let row = document.createElement("tr");
            row.innerHTML = `<th scope="row">${k + 1}</th><td>${score.name}</td><td>${score.numMoves}</td>`;
            leaderboardEl.append(row);
        }
        // <tr>
        //       <th scope="row">1</th>
        //       <td>Mark</td>
        //       <td>7</td>
        //     </tr>

    }
}