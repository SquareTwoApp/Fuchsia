import { GithubOrganization, GithubRepository } from '../src/utils/github'
import { GITHUB_API_KEY } from "../src/utils/config";
import { expect } from 'chai';

const TEST_ORGANIZATION = 'SquareTwoApp-TestOrg'

describe('Github Organizations', () => {
  it('should exist', async () => {
    const org = new GithubOrganization(
      GITHUB_API_KEY,
      TEST_ORGANIZATION
    )
    const exists = await org.checkIfOrgExists()

    expect(exists).to.be.true
  })
  it('should not exist', async () => {
    const org = new GithubOrganization(
      GITHUB_API_KEY,
      'SquareTwoApp-thisshouldneverexistpleasedontmake this'
    )
    const exists = await org.checkIfOrgExists()

    expect(exists).to.be.false
  })
})

describe('Github Repository', () => {
  const repo = new GithubRepository(
    GITHUB_API_KEY,
    'SampleProject',
    TEST_ORGANIZATION
  )
  it('should not exist', async () => {
    const exists = await repo.CheckIfRepoExists()
    expect(exists).false
  })
  it('should be created and then exist', async () => {
    await repo.InitializeNewRepository()
    const exists = await repo.CheckIfRepoExists()
    expect(exists).true
  }).timeout(10000)
  
    it('should have no secrets', async () => {
      const secrets = await repo.GetSecrets()
      expect(secrets.total_count).to.be.equal(0)
    })
    it('should create and have a secret', async () => {
      await repo.AddGithubSecrets({ 'TEST': 'abc123' })
      const secrets = await repo.GetSecrets()
      expect(secrets.secrets.some(s => s.name === 'TEST' )).true
    })
    it('should delete and remove the secret', async () => {
      await repo.DeleteSecret('TEST')
      const secrets = await repo.GetSecrets()
      expect(secrets.total_count).to.be.equal(0)
    })

    it('should be deleted and not exist', async () => {
    await repo.DeleteRepo()
    const exists = await repo.CheckIfRepoExists()
    expect(exists).false
  }).timeout(10000)
})

