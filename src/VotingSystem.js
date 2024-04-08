class VotingSystem {
    constructor() {
      this.candidates = new Map(); // Using a Map to store candidates and their vote counts
    }
  
    // Register a candidate with initial vote count
    registerCandidate(candidateName, initialVotes = 0) {
      if (this.candidates.has(candidateName)) {
        throw new Error('Candidate already registered');
      }
      this.candidates.set(candidateName, initialVotes);
    }
  
    // Vote for a candidate
    vote(candidateName) {
      if (!this.candidates.has(candidateName)) {
        throw new Error('Candidate not found');
      }
      this.candidates.set(candidateName, this.candidates.get(candidateName) + 1);
    }
  
    // Count the total number of votes
    countTotalVotes() {
      let totalVotes = 0;
      for (const votes of this.candidates.values()) {
        totalVotes += votes;
      }
      return totalVotes;
    }
  
    // Determine the winner(s) of the election
    determineWinner() {
      let maxVotes = 0;
      const winners = [];
      for (const [candidate, votes] of this.candidates) {
        if (votes > maxVotes) {
          maxVotes = votes;
          winners.length = 0; // Clear previous winners if a new maxVotes is found
          winners.push(candidate);
        } else if (votes === maxVotes) {
          winners.push(candidate); // Add candidate to winners if tied
        }
      }
      return winners;
    }
  }
  
  module.exports = VotingSystem;
  