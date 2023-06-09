#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const { exec } = require('child_process')
const packageJson = require('../package.json')
const scripts = '"start": "webpack server --mode=development --open --hot",\n "build": "webpack --mode=production"'
const getDeps = (deps) =>
  Object.entries(deps)
    .map((dep) => `${dep[0]}@${dep[1]}`)
    .toString().replace(/,/g, ' ')
    .replace(/^/g, '')
  // exclude the dependency only used in this file, nor relevant to the boilerplate
    .replace(/fs-extra[^\s]+/g, '')
console.log('Initializing project..')

// create folder and initialize npm
exec(
    `mkdir ${process.argv[2]} && cd ${process.argv[2]} && npm init -f`,
    (initErr, initStdout, initStderr) => {
      if (initErr) {
        console.error(`Everything was fine, then it wasn't:
    ${initErr}`)
        return
      }
      const packageJSON = `${process.argv[2]}/package.json`
      // replace the default scripts
      fs.readFile(packageJSON, (err, file) => {
        if (err) throw err
        const data = file
          .toString()
          .replace(
            '"test": "echo \\"Error: no test specified\\" && exit 1"',
            scripts)
        fs.writeFile(packageJSON, data, (err2) => err2 || true)
      })
      const filesToCopy = ['webpack.config.js', 'tailwind.config.js', '.gitignore','.eslintrc.js','.prettierignore','.prettierrc']
      for (let i = 0; i < filesToCopy.length; i += 1) {
        fs.createReadStream(path.join(__dirname, `../${filesToCopy[i]}`)).pipe(
          fs.createWriteStream(`${process.argv[2]}/${filesToCopy[i]}`)
        )
      }

      console.log('npm init -- done\n')

      console.log('start to install node modules\n')
      // installing dependencies console.log("Installing deps -- it might take a few minutes..");
      const devDeps = getDeps(packageJson.devDependencies)
      const deps = getDeps(packageJson.dependencies)
      exec(
            `cd ${process.argv[2]} && git init && node -v && npm -v && npm i -D ${devDeps} && npm i -S ${deps}`,
            (npmErr, npmStdout, npmStderr) => {
              if (npmErr) {
                console.error(`Some error while installing dependencies ${npmErr}`)
                return
              }
              console.log(npmStdout)
              console.log('Dependencies installed')
              console.log('Copying additional files..')
              // copy additional source files
              fs.copy(path.join(__dirname, '../src'), `${process.argv[2]}/src`)
                .then(() =>
                  console.log(
                            `All done!\n\nYour project is now ready\n\nUse the below command to run the app.\n\ncd ${process.argv[2]}\nnpm start`
                  )
                )
                .catch((err) => console.error(err))
            }
      )
    }
)
