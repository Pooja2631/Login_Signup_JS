const fs = require("fs");
const getData = (fileName, type) =>
  new Promise((resolve, reject) =>
    fs.readFile(fileName, type, (err, data) => {
      
      return err ? reject(err) : resolve(data);
    })
  );

getData('file.json', 'utf8')
  .then(data => console.log('Data: ', data))
  .catch(error => console.log('Error: ', error));