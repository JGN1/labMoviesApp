const fs = require('fs');
require('dotenv').config();


const fileName = process.argv[2];
console.log("sourceFil - "+ fileName);
const sourceFile = './src/contexts/'+fileName+'.jsx';
const destinationFile = './src/contexts/authProvider.jsx';

fs.copyFile(sourceFile, destinationFile, (err) => {
  if (err) {
    console.error('An error occurred while copying the file:', err);
    // setTimeout(5000);
  } else {
    console.log('File copied and renamed successfully!');
  }
});