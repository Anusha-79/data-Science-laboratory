const pythonDocs = {
  label: 'Python data structures tutorial',
  url: 'https://docs.python.org/3/tutorial/datastructures.html',
};

const numpyDocs = {
  label: 'NumPy beginner guide',
  url: 'https://numpy.org/doc/stable/user/absolute_beginners.html',
};

const pandasDocs = {
  label: '10 minutes to pandas',
  url: 'https://pandas.pydata.org/docs/user_guide/10min.html',
};

const sklearnDocs = {
  label: 'Scikit-learn getting started',
  url: 'https://scikit-learn.org/stable/getting_started.html',
};

export const noteBooks = {
  'module-notes': {
    title: 'Data Science Module Notes',
    subtitle: 'Core concepts, workflows, and Python tools',
    pages: [
      {
        title: 'A practical introduction',
        paragraphs: [
          'Data science combines data, computing, and subject knowledge to answer a clearly framed question. A useful result is not just a chart or a model: it is evidence that helps someone make a better decision.',
          'Start with the question, identify what evidence would answer it, and record assumptions before choosing tools.',
        ],
        bullets: [
          'Define the problem and the people who will use the result.',
          'Collect relevant data and check its source, scope, and limitations.',
          'Clean and explore the data before fitting a model.',
          'Communicate findings, uncertainty, and next steps.',
        ],
      },
      {
        title: 'The data science workflow',
        paragraphs: [
          'Treat analysis as an iterative lifecycle. Exploration may reveal that the original question needs to be narrowed, or that more data is required. Keep a record of each transformation so another person can reproduce the result.',
        ],
        bullets: [
          'Frame: write a specific question and a measurable success criterion.',
          'Acquire: identify the source, format, permissions, and relevant fields.',
          'Prepare: validate types, missing values, duplicates, and inconsistent labels.',
          'Explore and model: use summaries and visualizations before selecting a method.',
          'Evaluate and share: test against the objective, explain limitations, and document.',
        ],
      },
      {
        title: 'Collecting and preparing data',
        paragraphs: [
          'A dataset is a representation of a process, not the process itself. Inspect the number of rows and columns, data types, units, time period, and meaning of each field before analysis.',
          'Missing values should be investigated before they are filled or removed. The right approach depends on why values are missing and how much data is affected.',
        ],
        bullets: [
          'Check for duplicate records, impossible values, inconsistent units, and typos.',
          'Use a documented rule for missing values; do not silently replace them.',
          'Keep identifiers and outcome fields distinct from model input features.',
          'Fit scaling and imputation steps using training data only to avoid data leakage.',
        ],
        code: 'import pandas as pd\n\nframe = pd.read_csv("observations.csv")\nprint(frame.head())\nprint(frame.info())\nprint(frame.isna().sum())',
        sources: [pandasDocs],
      },
      {
        title: 'Exploratory data analysis',
        paragraphs: [
          'Exploratory data analysis (EDA) uses summaries and visualizations to understand distributions, relationships, and unusual observations. It helps form hypotheses; it does not by itself establish causation.',
        ],
        bullets: [
          'Use counts for categories and summary statistics for numeric fields.',
          'Histograms show distribution shape; box plots help inspect spread and potential outliers.',
          'Scatter plots can reveal associations between two numeric variables.',
          'Correlation describes a relationship, not proof that one variable causes another.',
          'Label charts clearly and state the population and time period they represent.',
        ],
        code: 'print(frame.describe())\nprint(frame["category"].value_counts())',
      },
      {
        title: 'Python arrays and tables',
        paragraphs: [
          'Python lists are flexible containers. NumPy arrays are designed for efficient operations on large collections of values with a consistent data type. Array shape describes its dimensions, and indexing starts at zero.',
          'pandas builds on arrays with labeled Series and tabular DataFrame objects. Labels make it easier to select columns, filter records, summarize groups, and work with missing data.',
        ],
        bullets: [
          'Use NumPy for numerical arrays and vectorized calculations.',
          'Use pandas Series for one labeled column and DataFrames for tables.',
          'Check the shape and data types of arrays and DataFrames as you work.',
          'Prefer explicit column names and small, testable transformations.',
        ],
        code: 'import numpy as np\nimport pandas as pd\n\nvalues = np.array([2, 4, 6])\nprint(values.mean())\n\nframe = pd.DataFrame({"score": values})\nprint(frame["score"].describe())',
        sources: [pythonDocs, numpyDocs, pandasDocs],
      },
      {
        title: 'Machine learning fundamentals',
        paragraphs: [
          'In supervised learning, examples include input features and a target. Classification predicts categories; regression predicts numeric values. Unsupervised methods look for structure without a supplied target, for example grouping similar records.',
          'A model is useful when it performs well on data it did not use to learn its parameters. Keep a test set separate until final evaluation.',
        ],
        bullets: [
          'Split data into training and test sets before fitting.',
          'Choose a metric that reflects the real cost of errors.',
          'Use cross-validation on training data when comparing model settings.',
          'Place preprocessing and the estimator in one pipeline to reduce leakage.',
          'Compare with a simple baseline and report limitations.',
        ],
        code: 'from sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\nmodel = make_pipeline(StandardScaler(), LogisticRegression())\nmodel.fit(X_train, y_train)\nprint(model.score(X_test, y_test))',
        sources: [sklearnDocs],
      },
      {
        title: 'Interpretation and project reporting',
        paragraphs: [
          'A complete project report lets a reader understand what was done, why it was done, and how much confidence to place in the result. Distinguish observed evidence from interpretation and recommendations.',
        ],
        bullets: [
          'Record the question, dataset source, date, and important assumptions.',
          'Describe cleaning and feature transformations.',
          'Report evaluation results against a baseline and explain the chosen metric.',
          'Include a small number of readable, correctly labeled visualizations.',
          'State limitations, ethical considerations, and a practical next step.',
        ],
      },
      {
        title: 'Quick review and references',
        paragraphs: [
          'Before submitting an analysis, check that the question matches the conclusion, the data and transformations are documented, and the evaluation uses data kept separate from training.',
          'These notes summarize selected concepts and are a study aid. Consult the linked documentation for detailed API guidance and updated examples.',
        ],
        bullets: [
          'Question → data → preparation → exploration → model → evaluation → communication.',
          'Re-run the workflow from a clean state to check reproducibility.',
        ],
        sources: [pythonDocs, numpyDocs, pandasDocs, sklearnDocs],
      },
    ],
  },
  'lab-notes': {
    title: 'Data Science Lab Notes',
    subtitle: 'A repeatable checklist for practical sessions',
    pages: [
      {
        title: 'Before you start',
        paragraphs: [
          'Begin each lab by stating the problem and expected output. Keep the original dataset unchanged and do all cleaning in a documented working copy.',
        ],
        bullets: [
          'Record the experiment title, date, objective, and dataset source.',
          'Inspect rows, columns, data types, missing values, and duplicate records.',
          'Write down any assumptions before changing the data.',
          'Save code, outputs, and observations in a reproducible notebook.',
        ],
        code: 'import pandas as pd\n\ndata = pd.read_csv("sample.csv")\nprint(data.shape)\nprint(data.dtypes)\nprint(data.isna().sum())',
        sources: [pandasDocs],
      },
      {
        title: 'Run, inspect, and record',
        paragraphs: [
          'Make one meaningful change at a time. Inspect the output after each step so errors in preparation do not become hidden inside later analysis.',
        ],
        bullets: [
          'Use summaries before choosing charts or models.',
          'Label axes, units, categories, and filtering choices.',
          'Keep a record of unexpected results and how they were investigated.',
          'For predictive tasks, separate training and test data before fitting.',
          'Include a baseline and explain which metric is appropriate.',
        ],
        sources: [numpyDocs, sklearnDocs],
      },
      {
        title: 'Lab report template',
        paragraphs: [
          'Use this structure to turn a practical session into a clear, reviewable report.',
        ],
        bullets: [
          'Objective and question',
          'Dataset source, fields, and limitations',
          'Method, preparation steps, and tools',
          'Results with labeled tables or visualizations',
          'Interpretation, limitations, and conclusion',
          'References and steps needed to reproduce the work',
        ],
        sources: [pythonDocs, pandasDocs, sklearnDocs],
      },
    ],
  },
};
