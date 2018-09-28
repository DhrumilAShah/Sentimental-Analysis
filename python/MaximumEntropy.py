import re

import numpy as np
import pandas as pd
from nltk.stem.snowball import SnowballStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

stemmer = SnowballStemmer("english")
cv = CountVectorizer(min_df=1,
                     stop_words='english', lowercase=True, analyzer='word')
bow = pd.read_csv('./app/resources/csv/BagOfWords.csv',
                  error_bad_lines=False, delimiter=',')
data = pd.read_csv('./app/resources/csv/yelp_labelled.csv')
#data = bow.append(data)
data['text'] = data['text'].apply(
    (lambda x: re.sub('[^a-zA-z\s]', '', stemmer.stem(re.sub(r'\b\w{1,2}\b', '', str(x).lower())))))

X = data['text'].values
X = cv.fit_transform(X)

Y = pd.get_dummies(data['sentiment']).idxmax(axis=1)
X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.25, random_state=42)

print(X_train.shape, Y_train.shape)
print(X_test.shape, Y_test.shape)

clf = LogisticRegression()

clf.fit(X_train, Y_train)
print("trained...")

predicted = clf.predict(X_test)

# print(predicted)
# print(Y_test)
# print(X_test)
print(accuracy_score(Y_test, predicted))
# validation_size = 100
# X_validate = X_test[-validation_size:]
# Y_validate = Y_test[-validation_size:]
# X_test = X_test[:-validation_size]
# Y_test = Y_test[:-validation_size]
# X_validate = X_test
# Y_validate = Y_test
#print(X_test.shape, Y_test.shape)


# twt = 'Meetings: Because none of us is as good as all of us.'
# # vectorizing the tweet by the pre-fitted tokenizer instance
# twt = tokenizer.texts_to_sequences(twt)
# # padding the tweet to have exactly the same shape as `embedding_2` input
# twt = pad_sequences(twt, maxlen=X_train.shape[1], dtype='int32',
#                     padding='post', truncating='post', value=0)
# sentiment = model.predict(twt, batch_size=1, verbose=2)[0]
# if(np.argmax(sentiment) == 0):
#     print("negative")
# elif (np.argmax(sentiment) == 1):
#     print("positive")
