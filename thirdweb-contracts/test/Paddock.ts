import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe.only("Paddock", function () {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();
    const TestToken = await ethers.getContractFactory("TestToken");
    const testToken = await TestToken.deploy("TestToken", "TT", ethers.utils.parseEther("1000000"));

    const PaddockContract = await ethers.getContractFactory("Paddock");
    const paddockContract = await PaddockContract.deploy(testToken.address);

    await testToken.transfer(paddockContract.address, ethers.utils.parseEther("1000"));
    await testToken.transfer(addr1.address, ethers.utils.parseEther("1000"));
    await testToken.transfer(addr2.address, ethers.utils.parseEther("1000"));
    await testToken.transfer(addr3.address, ethers.utils.parseEther("1000"));
    await testToken.transfer(addr4.address, ethers.utils.parseEther("1000"));
    await testToken.transfer(addr5.address, ethers.utils.parseEther("1000"));
    return {
      paddockContract,
      testToken,
      owner,
      addr1,
      addr2,
      addr3,
      addr4,
      addr5,
    };
  }

  describe("Project Creation", function () {
    it("Should create a new project", async function () {
      const { paddockContract, addr1 } = await loadFixture(deployFixture);
      await paddockContract.connect(addr1).createProject(100);
      const project = await paddockContract.projects(1);
      expect(project.creator).to.equal(addr1.address);
      expect(project.sponsored).to.equal(100);
      expect(project.totalBetOnSuccess).to.equal(0);
      expect(project.totalBetOnFailure).to.equal(0);
      expect(project.outcome).to.equal(0);
      expect(project.fundsDistributed).to.equal(false);
    });
  });
  describe("depositToProject", function () {
    it("Should deposit funds to a project", async function () {
      const { paddockContract, testToken, addr1, addr2 } = await loadFixture(deployFixture);

      await paddockContract.connect(addr1).createProject(100);
      await testToken.connect(addr2).approve(paddockContract.address, 200);
      await paddockContract.connect(addr2).depositToProject(1, 200);

      const project = await paddockContract.projects(1);
      expect(project.sponsored).to.equal(300);
    });
  });

  describe("betOnProject", function () {
    it("Should place bets on a project", async function () {
      const { paddockContract, testToken, addr1, addr2, addr3 } = await loadFixture(deployFixture);
      await paddockContract.connect(addr1).createProject(100);

      // addr2 bets on success
      await testToken.connect(addr2).approve(paddockContract.address, 100);
      await paddockContract.connect(addr2).betOnProject(1, true, 100);

      // addr3 bets on failure
      await testToken.connect(addr3).approve(paddockContract.address, 50);
      await paddockContract.connect(addr3).betOnProject(1, false, 50);

      const project = await paddockContract.projects(1);
      expect(project.totalBetOnSuccess).to.equal(100);
      expect(project.totalBetOnFailure).to.equal(50);

      const betOnSuccess = await paddockContract.betsOnSuccess(1, addr2.address);
      expect(betOnSuccess).to.equal(100);

      const betOnFailure = await paddockContract.betsOnFailure(1, addr3.address);
      expect(betOnFailure).to.equal(50);
    });
  });

  describe("reportOutcome", function () {
    it("Should report the outcome of a project", async function () {
      const { paddockContract, testToken, addr1, addr2, addr3 } = await loadFixture(deployFixture);
      await paddockContract.connect(addr1).createProject(100);
      const projectId = 1;

      expect(await paddockContract.projects(projectId)).to.have.property("outcome", 0); // Undecided

      await paddockContract.connect(addr1).reportOutcome(projectId, true);
      expect(await paddockContract.projects(projectId)).to.have.property("outcome", 1); // Success
    });
  });

  describe("distributeFunds", function () {
    it("Should distribute funds correctly: Solo Winner Takes All", async function () {
      const { paddockContract, testToken, addr1, addr2, addr3 } = await loadFixture(deployFixture);
      await paddockContract.connect(addr1).createProject(ethers.utils.parseEther("100"));
      const projectId = 1;

      const sponsorAmount = ethers.utils.parseEther("50");
      await testToken.connect(addr2).approve(paddockContract.address, sponsorAmount);
      await paddockContract.connect(addr2).depositToProject(projectId, sponsorAmount);

      const betAmount1 = ethers.utils.parseEther("10");
      await testToken.connect(addr1).approve(paddockContract.address, betAmount1);
      await paddockContract.connect(addr1).betOnProject(projectId, true, betAmount1);

      const betAmount2 = ethers.utils.parseEther("20");
      await testToken.connect(addr3).approve(paddockContract.address, betAmount2);
      await paddockContract.connect(addr3).betOnProject(projectId, false, betAmount2);

      await paddockContract.connect(addr1).reportOutcome(projectId, true);

      const initialBalanceAddr1 = await testToken.balanceOf(addr1.address);
      const initialBalanceAddr3 = await testToken.balanceOf(addr3.address);

      await paddockContract.connect(addr1).distributeFunds(projectId);

      const finalBalanceAddr1 = await testToken.balanceOf(addr1.address);
      const finalBalanceAddr3 = await testToken.balanceOf(addr3.address);

      expect(finalBalanceAddr1).to.equal(initialBalanceAddr1.add(ethers.utils.parseEther("180")));
      expect(finalBalanceAddr3).to.equal(initialBalanceAddr3);
    });

    it("Should distribute funds correctly: Divide between winners", async function () {
      const { paddockContract, testToken, addr1, addr2, addr3, addr4, addr5 } = await loadFixture(deployFixture);
      await paddockContract.connect(addr1).createProject(ethers.utils.parseEther("100"));
      const projectId = 1;

      const sponsorAmount = ethers.utils.parseEther("10");
      await testToken.connect(addr2).approve(paddockContract.address, sponsorAmount);
      await paddockContract.connect(addr2).depositToProject(projectId, sponsorAmount);

      const betAmount1 = ethers.utils.parseEther("10");
      await testToken.connect(addr1).approve(paddockContract.address, betAmount1);
      await paddockContract.connect(addr1).betOnProject(projectId, true, betAmount1);

      const betAmount2 = ethers.utils.parseEther("20");
      await testToken.connect(addr3).approve(paddockContract.address, betAmount2);
      await paddockContract.connect(addr3).betOnProject(projectId, true, betAmount2);

      const betAmount3 = ethers.utils.parseEther("10");
      await testToken.connect(addr4).approve(paddockContract.address, betAmount1);
      await paddockContract.connect(addr4).betOnProject(projectId, false, betAmount3);

      await paddockContract.connect(addr1).reportOutcome(projectId, true);

      const initialBalanceAddr1 = await testToken.balanceOf(addr1.address);
      const initialBalanceAddr3 = await testToken.balanceOf(addr3.address);
      const initialBalanceAddr4 = await testToken.balanceOf(addr4.address);

      await paddockContract.connect(addr1).distributeFunds(projectId);

      const finalBalanceAddr1 = await testToken.balanceOf(addr1.address);
      const finalBalanceAddr3 = await testToken.balanceOf(addr3.address);
      const finalBalanceAddr4 = await testToken.balanceOf(addr4.address);

      expect(finalBalanceAddr1).to.equal(initialBalanceAddr1.add(ethers.utils.parseEther("50")));
      expect(finalBalanceAddr3).to.equal(initialBalanceAddr3.add(ethers.utils.parseEther("100")));
      expect(finalBalanceAddr4).to.equal(initialBalanceAddr4);
    });
  });
});
