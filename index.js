const readline = require('readline')
const fs = require('fs')

// Importa cursos e inscripcciones realizadas
const cursos = require('./cursos')
let inscripciones = require('./inscripciones')

// Leer de teclado
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Imprime los cursos
console.log(`\tBienvenido al Tecnologico de Antioquia`)
console.table(cursos)

rl.question('Que desea inscribir/listar: ', inOpcion => {
  if (inOpcion === 'inscribir') {
    rl.question('A que curso desea inscribirse ? Id = ', inCurso => {
      let res = cursos.find(curso => curso.Id == inCurso)
      if (!res) {
        fs.writeFileSync('inscripciones.json', JSON.stringify(inscripciones))
        console.log(`El curso ${inCurso} no existe`)
        rl.close()
      } else {
        rl.question('Ingrese nombre: ', inNombre => {
          rl.question('Ingrese numero de cedula: ', inCedula => {
            inscripciones.push({
              Cedula: inCedula,
              Nombre: inNombre,
              Curso: res.Nombre,
              Duracion: res.Duracion,
              Valor: res.Valor
            })
            fs.writeFileSync('inscripciones.json', JSON.stringify(inscripciones))
            fs.writeFileSync('inscripciones.txt', JSON.stringify(inscripciones))
            console.table(inscripciones)
            rl.close()
          })
        })
      }
    })
  } else {
    fs.writeFileSync('inscripciones.json', JSON.stringify(inscripciones))
    fs.writeFileSync('inscripciones.txt', JSON.stringify(inscripciones))
    console.table(inscripciones)
    rl.close()
  }
})
