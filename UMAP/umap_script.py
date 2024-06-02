import pandas as pd
import umap
import matplotlib.pyplot as plt

# Load the data
data = pd.read_csv('world-happiness-report-2021.csv')

# Select relevant columns for UMAP
features = data[['Logged GDP per capita', 'Social support', 'Healthy life expectancy', 
                 'Freedom to make life choices', 'Generosity', 'Perceptions of corruption']]

# Perform UMAP
reducer = umap.UMAP()
embedding = reducer.fit_transform(features)

# Add UMAP results back to the dataframe
data['UMAP1'] = embedding[:, 0]
data['UMAP2'] = embedding[:, 1]

# Save the processed data for RawGraphs
data.to_csv('umap_processed_data.csv', index=False)

# Optionally, visualize using matplotlib
plt.scatter(data['UMAP1'], data['UMAP2'], c=data['Regional indicator'].map({
    'Western Europe': 0, 
    'North America and ANZ': 1, 
    'Middle East and North Africa': 2, 
    'Latin America and Caribbean': 3, 
    'Central and Eastern Europe': 4, 
    'East Asia': 5, 
    'Southeast Asia': 6, 
    'Commonwealth of Independent States': 7, 
    'Sub-Saharan Africa': 8
}))
plt.xlabel('UMAP1')
plt.ylabel('UMAP2')
plt.title('UMAP of Happiness Dataset')
plt.show()
