import csv
import re

import nltk
import numpy as np
import pandas as pd
#from nltk.corpus import stopwords
#from nltk.stem import PorterStemmer
from nltk.stem.snowball import SnowballStemmer
#from nltk.tokenize import word_tokenize
#from numpy import genfromtxt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
#from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC

stemmer = SnowballStemmer("english")
tf = TfidfVectorizer(min_df=1,   # max_df=100,
                     stop_words='english', lowercase=True, analyzer='word')  # ngram_range=(1, 3)
# np.set_printoptions(threshold='nan')
# # nltk.download("stopwords")
# # nltk.download("punkt")
# stop_words = set(stopwords.words('english'))
# ps = PorterStemmer()
# _X = []
# _Y = []
# SENT_Y = []
# SENT_X = []


# def docMaker(csv):
# my_data = genfromtxt(open(csv, 'rb'), delimiter=',',
#                      invalid_raise=False, dtype='str', comments='|||()**&')  # usecols=np.arange(0, 2),
# X, Y = np.hsplit(my_data, 2)
# for idx, sent in enumerate(X):
#     arr = []
#     for w in word_tokenize(sent[0]):
#         w = re.sub('[^A-Za-z]+', '', ps.stem(w.lower())).strip()
#         arr.append(w)
#         _X.append(w)
#         _Y.append(Y[idx][0])
#
#     SENT_Y.append(Y[idx][0])
#     SENT_X.append(" ".join(arr))

#    docMaker('C:\\Users\\Dhrumil\\Desktop\\sentimental_analysis\\app\\resources\\csv\\yelp_labelled.csv')
# docMaker('C:\\Users\\Dhrumil\\Desktop\\sentimental_analysis\\app\\resources\\csv\\amazon_sentences.csv')
# docMaker('C:\\Users\\Dhrumil\\Desktop\\sentimental_analysis\\app\\resources\\csv\\imdb_sentences.csv')
# docMaker('C:\\Users\\Dhrumil\\Desktop\\sentimental_analysis\\app\\resources\\csv\\twitter_sentences_2.csv')

data = pd.read_csv('./app/resources/csv/sarcasm_sentences.csv',
                   error_bad_lines=False, delimiter=',')
# data1 = pd.read_csv('./app/resources/csv/yelp_labelled.csv',
#                     error_bad_lines=False, delimiter=',')
# data = data.append(data1)
#bow = pd.read_csv('./app/resources/csv/BagOfWords.csv', error_bad_lines=False, delimiter=',')
#data = bow.append(data)
data['text'] = data['text'].apply(
    (lambda x: re.sub('[^a-zA-z\s]', '', stemmer.stem(re.sub(r'\b\w{1,2}\b', '', str(x).lower())))))

# print(data[data['sentiment'] == 1].size)
# print(data[data['sentiment'] == 0].size)
# print(data['text'])
# for idx, row in data.iterrows():
#     row[0] = row[0].replace('rt', ' ')

# max_fatures = 2000
# tokenizer = Tokenizer(num_words=max_fatures, split=' ')
# tokenizer.fit_on_texts(data['text'].values)
# X = tokenizer.texts_to_sequences(data['text'].values)
# X = pad_sequences(X)
X = data['text'].values
tfidf_matrix = tf.fit_transform(X)
# splits columns, 1 represents columns
Y = pd.get_dummies(data['sentiment']).idxmax(axis=1)

X_train, X_test, Y_train, Y_test = train_test_split(
    tfidf_matrix, Y, test_size=0.25, random_state=42)

print(X_train.shape, X_test.shape)
print(Y_train.shape, Y_test.shape)

#tfidf_matrix = tf.fit_transform(_X)
tfidf_matrix = tf.fit_transform(X)
print("transformed...")
clf = SVC(kernel='linear')
#clf.fit(tfidf_matrix, _Y)
clf.fit(X_train, Y_train)
print("trained...")
#X_new_counts = tf.transform(SENT_X)
predicted = clf.predict(X_test)  # (X_new_counts)
print("calculating accuracy...")
# counter = 0
# for idx, i in enumerate(predicted):
#     if i == Y_test[idx]:  # :SENT_Y[idx]:
#         counter = 1 + counter
# # print(counter)
# #print((counter / float(len(SENT_Y))) * 100)
# print((counter / float(len(Y_test))) * 100)
print(accuracy_score(Y_test, predicted))
