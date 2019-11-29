const list = require('../../public/data/country/country')
const objList = list.map(item => {
  const l = item.split('-')
  return {
    enName: l[0],
    name: l[1],
    code: l[2]
  }
})
console.log(JSON.stringify(objList))
