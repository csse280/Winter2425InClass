export class LeaderboardManager {
    constructor() {
        this.leaderboard = [];
    }

    async updateLeaderboard() {
        let response = await fetch("/api/leaderboard");
        this.leaderboard = await response.json();
    }

    async getThreshold() {
        let response = await fetch("/api/threshold");
        let theJson = await response.json();
        return theJson.threshold;
    }

    async addName(name, numMoves) {

    }

}