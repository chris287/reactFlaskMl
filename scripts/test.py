import joblib
import pandas as pd

clf = joblib.load('classifier.joblib','r')
label = {0:'Fraudlant',1:'NonFraudlant'}
value1=[0.98]
value2=[0.78]
value3=[5]
value4=[0.45]
value5=[8]
value6=[4]
arr = pd.DataFrame({'A':value1,'B':value2,'C':value3,'D':value4,'E':value5,'F':value6})
index = clf.predict(arr)
# print(label[clf.predict(arr)[0]])
# print(clf)