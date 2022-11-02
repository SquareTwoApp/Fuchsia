import path from 'path'
import fs from 'fs-extra'
import { generatePackageJson } from './utils/package-json-generator'
import { REDIS_PORT, REDIS_URL } from './utils/config';
import { APIGatewayEvent } from 'aws-lambda';

export async function GenerateProject(organizationName: string, projectName: string, version: string) {
  const workdir = path.join('/tmp', `${projectName}-server`)
  const srcdir = path.join(workdir, 'src')
  const biolerplatedir = path.join(__dirname, 'boilerplate')
  const utilsdir = path.join(srcdir, 'utils')
  
  fs.rmSync(workdir, { recursive: true, force: true })
  await fs.ensureDir(srcdir)
  await fs.ensureDir(workdir)
  await fs.ensureDir(path.join(workdir, '.github'))
  await fs.ensureDir(path.join(workdir, '.github', 'workflows'))
  await fs.ensureDir(utilsdir)

  await fs.writeFile(
    path.join(workdir, 'package.json'),
    generatePackageJson(organizationName, projectName, version)
  )
  await Promise.all(['yarn.lock', 'Dockerfile', '.dockerignore', 'tsconfig.json'].map(async file => 
    await fs.copyFile(
      path.join(biolerplatedir, file),
      path.join(workdir, file)) 
    )
  )

  await fs.copyFile(
    path.join(biolerplatedir, 'deploy_test_server.yaml'),
    path.join(workdir, '.github', 'workflows', 'deploy_test_server.yaml')
  )

  await fs.copyFile(
    path.join(biolerplatedir, 'types.txt'),
    path.join(srcdir, 'types.ts')
  )
  await Promise.all([
    'types', 
    'common.input', 
  ].map(async file => 
    await fs.copyFile(
      path.join(biolerplatedir, `${file}.txt`),
      path.join(srcdir, `${file}.ts`))
    )
  )
  
  await Promise.all([
    'object-id.scalar', 
    'ref-type', 
    'typegoose-middleware', 
    'consts', 
    'auth-checker', 
    'filter-parser',
    's3-uploader',
    'config',
  ].map(async file => 
    await fs.copyFile(
      path.join(biolerplatedir, `${file}.txt`),
      path.join(utilsdir, `${file}.ts`))
    )
  )

  await fs.writeFile(
    path.join(workdir, 'package.json'),
    generatePackageJson(organizationName, projectName, version)
  )

  // await Promise.all(
  //   models.map(async model => {
  //     const modelFolder = path.join(srcdir, model.name)
  //     await fs.ensureDir(modelFolder)
  //     await fs.writeFile(
  //       path.join(modelFolder, `${model.name}.resolver.ts`),
  //       await generateResolver(model, models)
  //     )
  //     await fs.writeFile(
  //       path.join(modelFolder, `${model.name}.entity.ts`),
  //       await generateEntity(model, models)
  //     )
  //     modelsImportsBuilder.push(
  //       `import { ${model.name} } from './${model.name}/${model.name}.entity`
  //     )
  //     modelsBuilder.push(
  //       `export const ${model.name}Model = getModelForClass(${model.name});`
  //     )
  //     await fs.writeFile(
  //       path.join(modelFolder, `${model.name}.input.ts`),
  //       await generateInputFile(model, models)
  //     )
  //     await fs.ensureDir(modelFolder)
  //   })
  // )
  
  // await fs.writeFile(
  //   path.join(srcdir, 'index.ts'),
  //   generateIndexFile(payload, models, projectId)
  // )

  // await fs.writeFile(
  //   path.join(srcdir, 'Models.ts'),
  //   await generateModelFile(models)
  // )
  
  // if (payload.serverConfig.authConfig.requiresAuth) {
  //   const modelFolder = path.join(srcdir, 'Authentication')
  //   await fs.ensureDir(modelFolder)
  //   await fs.writeFile(
  //     path.join(modelFolder, `Authentication.resolver.ts`),
  //     await generateAuthenticationResolver(payload, models)
  //   )
  // }
}

exports.handler = async (event: APIGatewayEvent) => {
  
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda and Github!"),
  }
  return response
}