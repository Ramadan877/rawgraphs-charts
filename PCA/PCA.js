const fs = require('fs');
const csv = require('csv-parser');
const { PCA } = require('ml-pca');

// Load the dataset
const data = [];
const headers = [];
fs.createReadStream('world-happiness-report-2021.csv')
  .pipe(csv())
  .on('headers', (headerList) => {
    headers.push(...headerList);
  })
  .on('data', (row) => {
    data.push(Object.values(row).map(value => parseFloat(value)));
  })
  .on('end', () => {
    // Prepare the data for PCA
    // Remove non-numeric columns (first three columns in this case)
    const numericData = data.map(row => row.slice(3));

    // Perform PCA
    const pca = new PCA(numericData);

    // Get the principal components
    const components = pca.getEigenvectors();
    const explainedVariance = pca.getExplainedVariance();
    const cumulativeVariance = pca.getCumulativeVariance();

    console.log('Principal Components:');
    console.log(components);

    console.log('Explained Variance:');
    console.log(explainedVariance);

    console.log('Cumulative Variance:');
    console.log(cumulativeVariance);
  });
