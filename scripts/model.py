import pandas as pd
import numpy as np
from sklearn import linear_model
from sklearn import metrics
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix
import pickle
from sklearn.metrics import classification_report
from sklearn.externals import joblib
import warnings
warnings.filterwarnings('ignore')

data=pd.read_csv('cleaned.csv')
data_headers=data.columns
datax=pd.DataFrame({'A':data['incident_severity'],'B':data['incident_state'],'C':data['months_as_customer'],'D':data['vehicle_claim'],'E':data['total_claim_amount'],'F':data['incident_type']})
train_x, test_x, train_y, test_y = train_test_split(datax,data[data_headers[-5]], train_size=0.7)
tr_x,tes_x,tr_y,tes_y=train_test_split(datax,data[data_headers[-1]],test_size=0.33,random_state=7)

lr = linear_model.LogisticRegression()
lr.fit(train_x, train_y)

#mul_lr = linear_model.LogisticRegression(multi_class='multinomial', solver='newton-cg').fit(train_x, train_y)

# print ("Logistic regression Train Accuracy :: ", metrics.accuracy_score(train_y, lr.predict(train_x)))
# print ("Logistic regression Test Accuracy :: ", metrics.accuracy_score(test_y, lr.predict(test_x)))    
# print ("Multinomial Logistic regression Train Accuracy :: ", metrics.accuracy_score(train_y, mul_lr.predict(train_x)))
# print ("Multinomial Logistic regression Test Accuracy :: ", metrics.accuracy_score(test_y, mul_lr.predict(test_x)))

# sns.countplot(x='fraud_reported',data=data,palette='hls')
# plt.show()
# plt.savefig('count_plot')
y_pred=lr.predict(test_x)
confusion_matrix = confusion_matrix(test_y, y_pred)
# print("Number of correct predictions :: ",confusion_matrix[0][0]+confusion_matrix[1][1])
# print("Number of incorrect predictions :: ",confusion_matrix[0][1]+confusion_matrix[1][0])
ty=pd.DataFrame(test_y)
# print("\n\n\n",confusion_matrix)
# print(y_pred.sum())

# pickle.dump(lr,open('finalised_model.sav','wb'))
joblib.dump(lr,'classifier.joblib')
loaded_model = joblib.load(open('classifier.joblib', 'rb'))
result = loaded_model.score(tr_x, tr_y)
# print(result)

precession=confusion_matrix[0][0]/(confusion_matrix[0][0]+confusion_matrix[0][1])
recall=confusion_matrix[0][0]/(confusion_matrix[0][0]+confusion_matrix[1][0])
# recall
