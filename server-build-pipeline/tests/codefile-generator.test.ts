import { expect } from 'chai'
import { generateAuthenticationResolver, generateResolver } from '../src/utils/graphql-resolver-generator'
import { generateIndexFile } from '../src/utils/generate-index-file'
import { generateInputFile } from '../src/utils/graphql-input-generator'
import { testData } from './data'
import fs from 'fs'
import path from 'path'
import { generateEntity } from '../src/utils/graphql-entity-generator'

describe('Codefile Generator', () => {
  const userModel = testData.serverConfig.apiConfig.models.find(m => m.name === 'User')
  it('should generate a proper index.ts file', () => {
    // @ts-ignore
    const indexFile = generateIndexFile(testData.serverConfig, testData.serverConfig.apiConfig.models, testData.organization)
    const indexGoal = fs.readFileSync(path.join(__dirname, './testFiles/index.txt'), { encoding: 'utf8' })
    expect(indexFile).to.be.equal(indexGoal)
  })
  it('should generate a proper authentication resolver', () => {
    const authFile = generateAuthenticationResolver(
      // @ts-ignore
      testData.serverConfig.authConfig,
      testData.serverConfig.apiConfig.models
    )
    const authGoal = fs.readFileSync(path.join(__dirname, './testFiles/AuthenticationResolver.txt'), { encoding: 'utf8' })
    expect(authFile).to.be.equal(authGoal)
  })
  it('should generate a proper input file', () => {
    // @ts-ignore
    const inputFile = generateInputFile(userModel, testData.serverConfig.apiConfig.models)
    const inputGoal = fs.readFileSync(path.join(__dirname, './testFiles/UserInput.txt'), { encoding: 'utf8' })
    expect(inputFile).to.be.equal(inputGoal)
  })
  it('should generate a proper entity file', () => {
    // @ts-ignore
    const entityFile = generateEntity(userModel, testData.serverConfig.apiConfig.models)
    const entityGoal = fs.readFileSync(path.join(__dirname, './testFiles/UserEntity.txt'), { encoding: 'utf8' })
    expect(entityFile).to.be.equal(entityGoal)
  })
  it('should generate a proper resolver file', () => {
    // @ts-ignore
    const resolverFile = generateResolver(userModel, testData.serverConfig.apiConfig.models)
    const resolverGoal = fs.readFileSync(path.join(__dirname, './testFiles/UserResolver.txt'), { encoding: 'utf8' })
    expect(resolverFile).to.be.equal(resolverGoal)
  })
})