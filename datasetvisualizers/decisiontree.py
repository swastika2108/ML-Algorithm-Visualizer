import pandas as pd
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.preprocessing import OneHotEncoder
import matplotlib.pyplot as plt
from variables import INPUT_CSV,OUTPUT_PNG

# Load the dataset
df = pd.read_csv(INPUT_CSV)

# Convert target variable 'play' to numerical format
df['play'] = df['play'].map({'yes': 1, 'no': 0})

# Define features and target
X = df.drop(columns=['play'])
y = df['play']

# One-hot encode categorical features
encoder = OneHotEncoder(handle_unknown='ignore')
X_encoded = encoder.fit_transform(X).toarray()
feature_names = encoder.get_feature_names_out(X.columns)

# Initialize the decision tree classifier
dtree = DecisionTreeClassifier()

# Fit the classifier using training data
dtree.fit(X_encoded, y)

# Visualize the decision tree
plt.figure(figsize=(5, 5))  # Adjust the size as desired (width, height)
plot_tree(dtree, filled=True, rounded=True, class_names=['No', 'Yes'], feature_names=feature_names)

# Save the decision tree plot as an image
plt.savefig(OUTPUT_PNG)  # Change the extension as needed (e.g., .jpg, .jpeg, .svg)
plt.show()
