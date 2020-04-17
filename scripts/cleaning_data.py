import pandas as pd
import numpy as np
from sklearn import linear_model
from sklearn import metrics
from sklearn.model_selection import train_test_split
from collections import Counter
from sklearn import preprocessing
from sklearn.preprocessing import MinMaxScaler

from warnings import simplefilter
simplefilter(action='ignore', category=FutureWarning)

data=pd.read_csv('insurance_claims.csv')
column_values=data['policy_csl']
percentage=[]
for val in column_values:
    temp=val.split("/")
    percentage.append(round(int(temp[0])/int(temp[1])*100,2))
data['policy_csl']=percentage

label_en=preprocessing.LabelEncoder()
data['insured_sex']=label_en.fit_transform(data['insured_sex'])
data['policy_state'] = label_en.fit_transform(data['policy_state'])
data['insured_education_level']=label_en.fit_transform(data['insured_education_level'])
data['insured_occupation'] = label_en.fit_transform(data['insured_occupation'])
data['insured_hobbies'] = label_en.fit_transform(data['insured_hobbies'])
data['insured_relationship'] = label_en.fit_transform(data['insured_relationship'])
data['incident_type'] = label_en.fit_transform(data['incident_type'])
data['incident_severity'] = label_en.fit_transform(data['incident_severity'])
data['authorities_contacted'] = label_en.fit_transform(data['authorities_contacted'])
data['incident_state'] = label_en.fit_transform(data['incident_state'])
data['incident_city'] = label_en.fit_transform(data['incident_city'])
data['auto_make'] = label_en.fit_transform(data['auto_make'])
data['auto_model'] = label_en.fit_transform(data['auto_model'])
data['fraud_reported'] = label_en.fit_transform(data['fraud_reported'])

incident_date=data['incident_date']
incident_year=[]
incident_month=[]
for value in incident_date:
    temp=value.split("-")
    incident_month.append(int(temp[1]))
    incident_year.append(int(temp[2]))
data['incident_month']=incident_month
data['incident_year']=incident_year
data.drop(['incident_date'],axis=1,inplace = True)

policy_bind_date=data['policy_bind_date']
policy_bind_month=[]
policy_bind_year=[]
for value in policy_bind_date:
    temp=value.split("-")
    policy_bind_month.append(int(temp[1]))
    policy_bind_year.append(int(temp[2]))
data['policy_bind_month']=policy_bind_month
data['policy_bind_year']=policy_bind_year
data.drop(['policy_bind_date'],axis=1,inplace = True)

k=0
col_list=[]
for i in data['collision_type']:
    if i=="Front Collision":
        col_list.append(i)
    if i=="Rear Collision":
        col_list.append(i)
    if i=="Side Collision":
        col_list.append(i)
    if i=="?":
        data.loc[k,'collision_type']="Rear Collision"
    k=k+1
dc=Counter(col_list)
print("? in 'collision_type' were replaced with mode :: ",dc.most_common())

dam_list=[]
l=0
for i in data['property_damage']:
    if i=="YES":
        dam_list.append(i)
    if i=="NO":
        dam_list.append(i)
    if i=="?":
        data.loc[l,'property_damage']="NO"
    l=l+1    
c=Counter(dam_list)
print ("? in 'property_damage' were replaced with mode :: ",c.most_common(1))#FINDING MODE OF A LIST VARIABLE

pr_count=[]
count=0
for i in data['police_report_available']:
    if i =='YES':
        pr_count.append(i)
    if i == 'NO':
        pr_count.append(i)
    if i == '?':
        data.loc[count,'police_report_available']="NO"
    count+=1
pc=Counter(pr_count)
print ("? in 'police_report_available' were replaced with mode :: ",pc.most_common(1))

label_en=preprocessing.LabelEncoder()
data['collision_type'].fillna('Rear Collision',inplace=True)
data['property_damage'].fillna('NO',inplace=True)
data['police_report_available'].fillna('NO',inplace=True)

data['collision_type']=label_en.fit_transform(data['collision_type'])
data['property_damage']=label_en.fit_transform(data['property_damage'])
data['police_report_available']=label_en.fit_transform(data['police_report_available'])

cols=list(data)
cols.insert(41,cols.pop(cols.index('fraud_reported'))) 
#MOVING THE FRAUD REPORTED COLUMN TO THE LAST

scaler=MinMaxScaler()
da=pd.DataFrame({'A':data['capital-gains'],'B':data['umbrella_limit'],'C':data['policy_deductable'],'D':data['policy_annual_premium'],'E':data['total_claim_amount'],'F':data['injury_claim'],'G':data['property_claim'],'H':data['vehicle_claim']})
da