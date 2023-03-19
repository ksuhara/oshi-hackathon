// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Paddock {
  enum Outcome {
    Undecided,
    Success,
    Failure
  }

  struct Project {
    address creator;
    uint256 sponsored;
    uint256 totalBetOnSuccess;
    uint256 totalBetOnFailure;
    Outcome outcome;
    bool fundsDistributed;
  }

  mapping(uint256 => Project) public projects;

  uint256 public projectCounter;

  mapping(uint256 => mapping(address => uint256)) public betsOnSuccess;
  mapping(uint256 => mapping(address => uint256)) public betsOnFailure;

  mapping(uint256 => address[]) public bettorsOnSuccess;
  mapping(uint256 => address[]) public bettorsOnFailure;

  IERC20 public token;

  constructor(IERC20 _token) {
    token = _token;
  }

  function createProject(uint256 _budget) public {
    projectCounter++;
    projects[projectCounter] = Project(msg.sender, _budget, 0, 0, Outcome.Undecided, false);
  }

  function depositToProject(uint256 _projectId, uint256 _budget) public {
    Project storage project = projects[_projectId];
    require(project.creator != address(0), "Project not found.");
    require(project.outcome == Outcome.Undecided, "Project outcome has been decided.");
    token.transferFrom(msg.sender, address(this), _budget);
    project.sponsored += _budget;
  }

  function betOnProject(
    uint256 _projectId,
    bool _betOnSuccess,
    uint256 _amount
  ) public {
    Project storage project = projects[_projectId];
    require(project.creator != address(0), "Project not found.");
    require(project.outcome == Outcome.Undecided, "Project outcome has been decided.");
    require(_amount > 0, "Bet amount must be greater than 0.");

    if (_betOnSuccess) {
      project.totalBetOnSuccess += _amount;
      if (betsOnSuccess[_projectId][msg.sender] == 0) {
        bettorsOnSuccess[_projectId].push(msg.sender);
      }
      betsOnSuccess[_projectId][msg.sender] += _amount;
    } else {
      project.totalBetOnFailure += _amount;
      if (betsOnFailure[_projectId][msg.sender] == 0) {
        bettorsOnFailure[_projectId].push(msg.sender);
      }
      betsOnFailure[_projectId][msg.sender] += _amount;
    }

    // Transfer the bet amount to the contract
    token.transferFrom(msg.sender, address(this), _amount);
  }

  function reportOutcome(uint256 _projectId, bool _success) public {
    Project storage project = projects[_projectId];
    require(msg.sender == project.creator, "Only the project creator can report the outcome.");
    require(project.outcome == Outcome.Undecided, "Project outcome has already been reported.");

    project.outcome = _success ? Outcome.Success : Outcome.Failure;
  }

  function distributeFunds(uint256 _projectId) public {
    Project storage project = projects[_projectId];
    require(project.outcome != Outcome.Undecided, "Project outcome has not been decided.");
    require(!project.fundsDistributed, "Funds have already been distributed.");

    uint256 totalBets = project.totalBetOnSuccess + project.totalBetOnFailure;
    uint256 totalPool = totalBets + project.sponsored;

    if (project.outcome == Outcome.Success) {
      for (uint256 i = 0; i < bettorsOnSuccess[_projectId].length; i++) {
        address bettor = bettorsOnSuccess[_projectId][i];
        uint256 betAmount = betsOnSuccess[_projectId][bettor];
        uint256 payout = (totalPool * betAmount) / project.totalBetOnSuccess;
        token.transfer(bettor, payout);
      }
    } else {
      for (uint256 i = 0; i < bettorsOnFailure[_projectId].length; i++) {
        address bettor = bettorsOnFailure[_projectId][i];
        uint256 betAmount = betsOnFailure[_projectId][bettor];
        uint256 payout = (totalPool * betAmount) / project.totalBetOnSuccess;
        token.transfer(bettor, payout);
      }
    }

    project.fundsDistributed = true;
  }
}
