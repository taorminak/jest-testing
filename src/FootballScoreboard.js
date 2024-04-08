class FootballScoreboard {
    constructor() {
      this.homeTeam = 'Home';
      this.awayTeam = 'Away';
      this.homeScore = 0;
      this.awayScore = 0;
      this.gameEvents = [];
    }
  
    // Set the names of the home and away teams
    setTeamNames(homeTeam, awayTeam) {
      this.homeTeam = homeTeam;
      this.awayTeam = awayTeam;
    }
  
    // Record a touchdown for the specified team
    recordTouchdown(team) {
      if (team === this.homeTeam) {
        this.homeScore += 6;
      } else if (team === this.awayTeam) {
        this.awayScore += 6;
      } else {
        throw new Error('Invalid team');
      }
      this.gameEvents.push(`${team} scored a touchdown`);
    }
  
    // Record a field goal for the specified team
    recordFieldGoal(team) {
      if (team === this.homeTeam) {
        this.homeScore += 3;
      } else if (team === this.awayTeam) {
        this.awayScore += 3;
      } else {
        throw new Error('Invalid team');
      }
      this.gameEvents.push(`${team} scored a field goal`);
    }
  
    // Record a safety for the specified team
    recordSafety(team) {
      if (team === this.homeTeam) {
        this.homeScore += 2;
      } else if (team === this.awayTeam) {
        this.awayScore += 2;
      } else {
        throw new Error('Invalid team');
      }
      this.gameEvents.push(`${team} scored a safety`);
    }
  
    // Get the current score of the home team
    getHomeScore() {
      return this.homeScore;
    }
  
    // Get the current score of the away team
    getAwayScore() {
      return this.awayScore;
    }
  
    // Get the summary of the game status
    getGameSummary() {
      return `${this.homeTeam}: ${this.homeScore} - ${this.awayTeam}: ${this.awayScore}`;
    }
  }
  
  module.exports = FootballScoreboard;
  