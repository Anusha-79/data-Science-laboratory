const defaultExperiments = [
  {
    id: 1,
    number: 1,
    title: 'Data Handling and CSV Import',
    objective: 'Load and inspect data from a CSV file using Python libraries.',
    aim: 'Understand how to read, validate, and inspect a dataset before analysis.',
    theory: 'CSV files are a common format for tabular datasets. Efficient data import and initial inspection are essential to ensure correctness before analysis and modeling.',
    procedure: [
      'Open the dataset file in a Python environment.',
      'Use pandas to read the CSV file.',
      'Display the first few rows and column names.',
      'Check for missing values and shape of the dataset.',
      'Summarize the dataset for preliminary observations.',
    ],
    difficulty: 'Beginner',
    youtubeUrl: 'https://www.youtube.com/results?search_query=pandas+read+csv+python+tutorial',
    colabUrl: '',
    code: `import pandas as pd
  from io import StringIO

  csv_text = """name,score,department
  Asha,88,Data Science
  Rahul,92,Computer Science
  Meera,85,Data Science
  """

  data = pd.read_csv(StringIO(csv_text))
  print('Imported data:')
  print(data.to_string(index=False))
  print('Shape (rows, columns):', data.shape)
  print('Missing values by column:')
  print(data.isna().sum().to_string())
  `,
  },
  {
    id: 2,
    number: 2,
    title: 'Data Cleaning and Missing Value Treatment',
    objective: 'Handle missing data and clean the dataset for analysis.',
    aim: 'Prepare a raw dataset for reliable statistical exploration.',
    theory: 'Missing values may affect model quality and statistical conclusions. Cleaning techniques such as deletion, imputation, or interpolation help maintain data reliability.',
    procedure: [
      'Load the dataset into a DataFrame.',
      'Identify null or missing values.',
      'Choose a suitable missing value strategy.',
      'Apply the cleaning operation.',
      'Verify the cleaned dataset summary.',
    ],
    difficulty: 'Beginner',
    youtubeUrl: 'https://www.youtube.com/results?search_query=pandas+missing+values+data+cleaning+tutorial',
    colabUrl: '',
    code: `import pandas as pd

  data = pd.DataFrame({
    'Age': [22, 25, None, 30, 28],
    'Score': [90, 85, 88, None, 92],
    'City': ['Hyderabad', 'Tirupati', 'Hyderabad', None, 'Chennai']
  })

  print('Missing values before cleaning:')
  print(data.isna().sum().to_string())

  data['Age'] = data['Age'].fillna(data['Age'].mean())
  data['Score'] = data['Score'].fillna(data['Score'].median())
  data['City'] = data['City'].fillna('Unknown')

  print('Cleaned data:')
  print(data.to_string(index=False, float_format=lambda value: f'{value:.1f}'))
  print('Missing values after cleaning:', int(data.isna().sum().sum()))
  `,
  },
  {
    id: 3,
    number: 3,
    title: 'Descriptive Statistics',
    objective: 'Compute summary statistics and infer patterns from data.',
    aim: 'Understand the central tendency and variation in the dataset.',
    theory: 'Descriptive statistics summarize distributions and reveal patterns such as spread, central values, and skewness, providing a first layer of understanding.',
    procedure: [
      'Create or import a dataset.',
      'Select the target variable.',
      'Calculate mean, median, mode, and standard deviation.',
      'Interpret the results.',
      'Use the summary to guide further analysis.',
    ],
    difficulty: 'Beginner',
    youtubeUrl: 'https://www.youtube.com/results?search_query=descriptive+statistics+python+pandas+tutorial',
    colabUrl: '',
    code: `import pandas as pd

  marks = pd.Series([78, 82, 65, 91, 84, 70, 88], name='Marks')

  print('Count:', marks.count())
  print('Mean:', round(marks.mean(), 2))
  print('Median:', marks.median())
  print('Mode:', marks.mode().tolist())
  print('Sample standard deviation:', round(marks.std(), 2))
  print('Minimum:', marks.min())
  print('Maximum:', marks.max())
  print('Five-number summary:')
  print(marks.describe().to_string(float_format=lambda value: f'{value:.2f}'))
  `,
  },
  {
    id: 4,
    number: 4,
    title: 'Data Visualization with Matplotlib',
    objective: 'Create plots to detect trends and relationships in data.',
    aim: 'Use visual summaries to communicate patterns clearly.',
    theory: 'Visual analytics helps convert raw data into interpretable insights. Bar graphs, line plots, and scatter plots reveal trends that numbers alone may hide.',
    procedure: [
      'Load a sample dataset.',
      'Choose a relevant variable or relationship.',
      'Plot a line or bar chart using matplotlib.',
      'Label axes and title the chart.',
      'Interpret the outcome.',
    ],
    difficulty: 'Intermediate',
    youtubeUrl: 'https://www.youtube.com/results?search_query=matplotlib+data+visualization+python+tutorial',
    colabUrl: '',
    code: `import matplotlib.pyplot as plt

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  revenue = [1200, 1500, 1300, 1800, 2100, 1900]

  plt.figure(figsize=(8, 4))
  plt.plot(months, revenue, marker='o', linewidth=2, color='#147d64')
  plt.title('Monthly Revenue Trend')
  plt.xlabel('Month')
  plt.ylabel('Revenue ($)')
  plt.grid(True, alpha=0.3)
  plt.tight_layout()
  plt.show()

  print('Highest revenue:', months[revenue.index(max(revenue))], '$' + str(max(revenue)))
  print('Total revenue: $' + str(sum(revenue)))
  `,
  },
  {
    id: 5,
    number: 5,
    title: 'Correlation Analysis',
    objective: 'Explore relationships between variables using correlation.',
    aim: 'Identify whether variables move together and how strong the relationship is.',
    theory: 'Correlation quantifies the strength of the relationship between numerical variables. It is useful for feature selection, diagnostic analysis, and pattern discovery.',
    procedure: [
      'Load the dataset.',
      'Select numerical columns.',
      'Compute the correlation matrix.',
      'Visualize the correlation values.',
      'Interpret the results.',
    ],
    difficulty: 'Intermediate',
    youtubeUrl: 'https://www.youtube.com/results?search_query=correlation+analysis+python+pandas+seaborn+tutorial',
    colabUrl: '',
    code: `import pandas as pd

  data = pd.DataFrame({
    'StudyHours': [2, 3, 5, 7, 8, 9],
    'Marks': [50, 60, 70, 80, 85, 90],
    'SleepHours': [7, 6, 7, 8, 8, 9]
  })

  correlations = data.corr().round(2)
  print('Pearson correlation matrix:')
  print(correlations.to_string())
  print('Study hours vs marks:', correlations.loc['StudyHours', 'Marks'])
  `,
  },
  {
    id: 6,
    number: 6,
    title: 'Linear Regression Prediction',
    objective: 'Build and evaluate a simple regression model.',
    aim: 'Predict a target variable from a numeric input feature.',
    theory: 'Linear regression models the relationship between a dependent variable and one or more independent variables using a linear equation.',
    procedure: [
      'Prepare the training and testing data.',
      'Fit a linear regression model.',
      'Predict target values.',
      'Compare predictions against actual outputs.',
      'Assess the model using error metrics.',
    ],
    difficulty: 'Intermediate',
    youtubeUrl: 'https://www.youtube.com/results?search_query=linear+regression+scikit-learn+python+tutorial',
    colabUrl: '',
    code: `import numpy as np
  from sklearn.linear_model import LinearRegression
  from sklearn.metrics import mean_squared_error, r2_score

  study_hours = np.array([[1], [2], [3], [4], [5]], dtype=float)
  exam_scores = np.array([50, 55, 65, 70, 80], dtype=float)

  model = LinearRegression()
  model.fit(study_hours, exam_scores)
  predictions = model.predict(study_hours)
  new_prediction = model.predict(np.array([[6]], dtype=float))[0]

  print('Slope:', round(model.coef_[0], 2))
  print('Intercept:', round(model.intercept_, 2))
  print('Predicted score for 6 study hours:', round(new_prediction, 2))
  print('Training R-squared:', round(r2_score(exam_scores, predictions), 3))
  print('Training mean squared error:', round(mean_squared_error(exam_scores, predictions), 2))
  `,
  },
  {
    id: 7,
    number: 7,
    title: 'Logistic Regression Classification',
    objective: 'Classify data into binary outcomes using logistic regression.',
    aim: 'Apply an interpretable classification technique to practical data.',
    theory: 'Logistic regression is used for binary classification by estimating the probability of an event outcome.',
    procedure: [
      'Define the feature matrix and target labels.',
      'Split into training and test data.',
      'Train a logistic regression model.',
      'Predict labels and evaluate accuracy.',
      'Interpret the confusion matrix.',
    ],
    difficulty: 'Intermediate',
    youtubeUrl: 'https://www.youtube.com/results?search_query=logistic+regression+classification+scikit-learn+python+tutorial',
    colabUrl: '',
    code: `import numpy as np
  from sklearn.linear_model import LogisticRegression
  from sklearn.metrics import accuracy_score, confusion_matrix

  hours = np.array([[1], [2], [3], [4], [5], [6]], dtype=float)
  passed = np.array([0, 0, 0, 1, 1, 1])

  model = LogisticRegression(random_state=0)
  model.fit(hours, passed)
  predictions = model.predict(hours)
  pass_probability = model.predict_proba(np.array([[3.5]], dtype=float))[0, 1]

  print('Training accuracy:', round(accuracy_score(passed, predictions), 2))
  print('Confusion matrix:')
  print(confusion_matrix(passed, predictions))
  print('Predicted pass probability at 3.5 study hours:', round(pass_probability, 3))
  `,
  },
  {
    id: 8,
    number: 8,
    title: 'Decision Tree Classification',
    objective: 'Use a decision tree to classify sample observations.',
    aim: 'Understand how hierarchical rules can drive classification decisions.',
    theory: 'Decision trees split the data using rule-based conditions until each leaf node represents a class label or prediction.',
    procedure: [
      'Import dataset and define labels.',
      'Train a decision tree classifier.',
      'Display model accuracy.',
      'Inspect feature importance.',
      'Interpret the decision boundaries.',
    ],
    difficulty: 'Intermediate',
    youtubeUrl: 'https://www.youtube.com/results?search_query=decision+tree+classification+scikit-learn+python+tutorial',
    colabUrl: '',
    code: `import numpy as np
  from sklearn.tree import DecisionTreeClassifier
  from sklearn.metrics import accuracy_score

  measurements = np.array([
    [1.0, 1.2], [1.2, 0.8], [0.8, 1.0],
    [6.0, 6.2], [6.2, 5.8], [5.8, 6.0]
  ])
  labels = np.array(['small', 'small', 'small', 'large', 'large', 'large'])

  model = DecisionTreeClassifier(max_depth=2, random_state=0)
  model.fit(measurements, labels)
  predictions = model.predict(measurements)
  new_samples = model.predict(np.array([[1.1, 1.0], [6.1, 6.0]]))

  print('Training accuracy:', round(accuracy_score(labels, predictions), 2))
  print('Feature importances:', model.feature_importances_.round(2).tolist())
  print('Predictions for [1.1, 1.0] and [6.1, 6.0]:', new_samples.tolist())
  `,
  },
  {
    id: 9,
    number: 9,
    title: 'K-Means Clustering',
    objective: 'Group data into clusters based on similar features.',
    aim: 'Explore unsupervised learning and cluster discovery.',
    theory: 'K-means clustering partitions observations into K groups by minimizing within-cluster distance, enabling pattern detection without labeled data.',
    procedure: [
      'Select features for clustering.',
      'Choose the number of clusters K.',
      'Fit the K-means model.',
      'Inspect cluster assignments.',
      'Explain the resulting clusters.',
    ],
    difficulty: 'Advanced',
    youtubeUrl: 'https://www.youtube.com/results?search_query=k-means+clustering+scikit-learn+python+tutorial',
    colabUrl: '',
    code: `import numpy as np
  from sklearn.cluster import KMeans

  points = np.array([
    [1, 1], [1, 2], [2, 1],
    [9, 9], [9, 10], [10, 9]
  ], dtype=float)

  model = KMeans(n_clusters=2, random_state=42, n_init=10)
  model.fit(points)
  order = np.argsort(model.cluster_centers_[:, 0])
  normalized_labels = np.array([np.where(order == label)[0][0] for label in model.labels_])

  print('Cluster centers (ordered by x-coordinate):')
  print(model.cluster_centers_[order].round(2))
  print('Cluster assignment for each point:', normalized_labels.tolist())
  print('Number of points in each cluster:', np.bincount(normalized_labels).tolist())
  `,
  },
  {
    id: 10,
    number: 10,
    title: 'Mini Project: Sales Insight Dashboard',
    objective: 'Combine data cleaning, analysis, and visualization into a small lab project.',
    aim: 'Deliver end-to-end insight generation from raw sales records.',
    theory: 'A complete data science workflow combines data preparation, exploratory analysis, and presentation. This mini-project simulates a realistic lab report pipeline.',
    procedure: [
      'Load sales dataset from a CSV file.',
      'Clean and transform the relevant columns.',
      'Summarize key metrics and patterns.',
      'Create charts for product trends and region performance.',
      'Write a short report with recommendations.',
    ],
    difficulty: 'Advanced',
    youtubeUrl: 'https://www.youtube.com/results?search_query=python+pandas+sales+data+analysis+dashboard+project',
    colabUrl: '',
    code: `import pandas as pd
  import matplotlib.pyplot as plt

  sales = pd.DataFrame({
    'Month': ['Jan', 'Jan', 'Feb', 'Feb', 'Mar', 'Mar'],
    'Region': ['North', 'South', 'North', 'South', 'North', 'South'],
    'Revenue': [500, 350, 620, 410, 710, 490]
  })

  monthly_revenue = sales.groupby('Month', sort=False)['Revenue'].sum()
  print('Monthly revenue:')
  print(monthly_revenue.to_string())
  print('Total revenue: $' + str(int(sales['Revenue'].sum())))
  print('Best month:', monthly_revenue.idxmax())

  plt.figure(figsize=(8, 4))
  monthly_revenue.plot(kind='bar', color='#147d64')
  plt.title('Monthly Sales Revenue')
  plt.xlabel('Month')
  plt.ylabel('Revenue ($)')
  plt.tight_layout()
  plt.show()
  `,
  },
];

defaultExperiments.forEach((experiment) => {
  experiment.code = experiment.code.replace(/^ {2}/gm, '');
});

const STORAGE_KEY = 'ds-lab-experiments';

function loadExperiments() {
  if (typeof window === 'undefined') {
    return defaultExperiments.map((experiment) => ({ ...experiment }));
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return defaultExperiments.map((experiment) => ({ ...experiment }));
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return defaultExperiments.map((experiment) => ({ ...experiment }));
    }

    return parsed.map((experiment) => ({
      ...defaultExperiments.find((defaultExperiment) => String(defaultExperiment.id) === String(experiment.id)) || {},
      ...experiment,
      procedure: Array.isArray(experiment.procedure) ? experiment.procedure : [],
    }));
  } catch {
    return defaultExperiments.map((experiment) => ({ ...experiment }));
  }
}

export let experiments = loadExperiments();

export function getExperiments() {
  return experiments;
}

export function saveExperiments(nextExperiments) {
  const normalized = Array.isArray(nextExperiments) ? nextExperiments : defaultExperiments.map((experiment) => ({ ...experiment }));

  experiments = normalized.map((experiment) => ({ ...experiment }));

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(experiments));
  }

  return experiments;
}

export function updateExperiment(updatedExperiment) {
  const nextExperiments = experiments.map((experiment) => (
    String(experiment.id) === String(updatedExperiment.id)
      ? { ...experiment, ...updatedExperiment }
      : experiment
  ));

  return saveExperiments(nextExperiments);
}
