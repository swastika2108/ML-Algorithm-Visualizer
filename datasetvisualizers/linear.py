import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from variables import INPUT_CSV,OUTPUT_PNG

# Provide the file path to the CSV file


# Load the CSV file into a Pandas DataFrame
df = pd.read_csv(INPUT_CSV)

# Assuming the dataset has 'X' and 'y' columns, replace them with the actual column names from your dataset
X = df['X'].values.reshape(-1, 1)
Y = df['Y'].values

# Fit linear regression model
model = LinearRegression()
model.fit(X, Y)

# Make predictions
y_pred = model.predict(X)

# Plot data and linear regression line
plt.scatter(X, Y, color='blue', label='Actual data')
plt.plot(X, y_pred, color='red', label='Linear regression line')
plt.title('Linear Regression')
plt.xlabel('X')
plt.ylabel('y')
plt.legend()
plt.savefig(OUTPUT_PNG)  # Change the extension as needed (e.g., .jpg, .jpeg, .svg)
plt.show()

