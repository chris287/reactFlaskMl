import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn import preprocessing

data=pd.read_csv('insurance_claims.csv')
# label_en=preprocessing.LabelEncoder()

# data['incident_severity']=label_en.fit_transform(data['incident_severity'])
# data['incident_state']=label_en.fit_transform(data['incident_state'])
# data['months_as_customer']=label_en.fit_transform(data['months_as_customer'])
# data['incident_type']=label_en.fit_transform(data['incident_type'])

# test_data=pd.DataFrame({'incident_severity':data['incident_severity'],'incident_state':data['incident_state'],'months_as_customer':data['months_as_customer'],'vehicle_claim':data['vehicle_claim'],'total_claim_amount':data['total_claim_amount'],'incident_type':data['incident_type'],'fraud_reported':data['fraud_reported']})
# test_data.to_csv('test_data.csv')

# pd.crosstab(data.months_as_customer,data.fraud_reported).plot(kind='bar')

pd.crosstab(data.incident_state,data.fraud_reported).plot(kind='bar')
plt.title('State of claimed Insurance')
plt.xlabel('MAC')
plt.ylabel('Fraud/NonFraud')
plt.savefig('delete')