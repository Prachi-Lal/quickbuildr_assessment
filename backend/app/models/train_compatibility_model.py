import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import joblib

np.random.seed(42)

# Number of synthetic samples
n_samples = 500

# Generate features between 0 and 10
tech_alignment = np.random.uniform(0, 10, n_samples)
async_match = np.random.uniform(0, 10, n_samples)
communication_match = np.random.uniform(0, 10, n_samples)
timezone_overlap = np.random.uniform(0, 10, n_samples)
quality_alignment = np.random.uniform(0, 10, n_samples)

# True underlying weights (your hidden scoring logic)
true_score = (
    0.30 * tech_alignment +
    0.20 * async_match +
    0.20 * communication_match +
    0.15 * timezone_overlap +
    0.15 * quality_alignment
) * 10

# Add small noise
noise = np.random.normal(0, 5, n_samples)
compatibility_score = true_score + noise

# Clip to 0–100
compatibility_score = np.clip(compatibility_score, 0, 100)

# Create dataframe
df = pd.DataFrame({
    "tech_alignment": tech_alignment,
    "async_match": async_match,
    "communication_match": communication_match,
    "timezone_overlap": timezone_overlap,
    "quality_alignment": quality_alignment,
    "compatibility_score": compatibility_score
})

X = df.drop("compatibility_score", axis=1)
y = df["compatibility_score"]

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)

print("R2 Score:", r2_score(y_test, y_pred))
print("MSE:", mean_squared_error(y_test, y_pred))
print("Learned coefficients:")
for feature, coef in zip(X.columns, model.coef_):
    print(f"{feature}: {coef:.2f}")

# Save model
joblib.dump(model, "compatibility_model.joblib")

print("Model saved as compatibility_model.joblib")
