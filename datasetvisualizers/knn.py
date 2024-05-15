import matplotlib.pyplot as plt
import pandas as pd
from sklearn import neighbors
from mlxtend.plotting import plot_decision_regions
from variables import INPUT_CSV,OUTPUT_PNG

def knn_comparison(data, k):
    x = data[['X', 'Y']].values
    y = data['Z'].astype(int).values
    clf = neighbors.KNeighborsClassifier(n_neighbors=k)
    clf.fit(x, y)
    # Plotting decision region
    plot_decision_regions(x, y, clf=clf, legend=2)
    # Adding axes annotations
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.title('KNN with K=' + str(k))
    plt.savefig(OUTPUT_PNG)  # Change the extension as needed (e.g., .jpg, .jpeg, .svg)
    plt.show()
    return

data = pd.read_csv(INPUT_CSV)  
for k in [40]:
    knn_comparison(data, k)
