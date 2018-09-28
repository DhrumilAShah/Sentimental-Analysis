import re

import numpy as np
import pandas as pd
from keras.layers import LSTM, Dense, Embedding, SpatialDropout1D
from keras.models import Sequential, model_from_json
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import Tokenizer
from keras.utils.np_utils import to_categorical
from nltk.stem.snowball import SnowballStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split

stemmer = SnowballStemmer("english")
#bow = pd.read_csv('./app/resources/csv/BagOfWords.csv', error_bad_lines=False, delimiter=',')
data = pd.read_csv('./app/resources/csv/twitter_sentences.csv',
                   error_bad_lines=False, delimiter=',')
#data = bow.append(data)
data['text'] = data['text'].apply(
    (lambda x: re.sub('[^a-zA-z\s]', '', stemmer.stem(str(x).lower()))))

print(data[data['sentiment'] == 1].size)
print(data[data['sentiment'] == 0].size)

# for idx, row in data.iterrows():
#     row[0] = row[0].replace('rt', ' ')

max_features = 10000
batch_size = 32
embed_size = 128
lstm_out = 196

tokenizer = Tokenizer(num_words=max_features, split=' ')
tokenizer.fit_on_texts(data['text'].values)
X = tokenizer.texts_to_sequences(data['text'].values)
X = pad_sequences(X)


model = Sequential()
# words or phrases from the vocabulary are mapped to vectors of real numbers
# where the similarity between words in terms of meaning translates to closeness in the vector space
# Example:
# Hope to see you soon
# Nice to see you again
# [0, 1, 2, 3, 4]
# [5, 1, 2, 3, 6]
# Embedding(7, 2, input_length=5)
model.add(Embedding(max_features, embed_size, input_length=X.shape[1]))
# A Simple Way to Prevent Neural Networks from Overfitting(when data is tightly fitted with our model,lyk Skinny jeans),
# Dropout is a technique where randomly selected neurons are ignored during training.They are “dropped-out” randomly
# SpatialDropout1D is same function as Dropout, however it drops entire 1D feature maps instead of individual elements.
model.add(SpatialDropout1D(0.4))
# LSTM layer,196 memory units (smart neurons)
model.add(LSTM(lstm_out))  # , dropout=0.2, recurrent_dropout=0.2
# A dense layer is a classic fully connected neural network layer : each input node is connected to each output node
model.add(Dense(2, activation='sigmoid'))  # sigmoid,softmax
# loss--they calculate the loss, i.e difference between output and target variable.
# Optimizer--used in optimizing a Neural Network by updating the Model parameters such as Weights and Bias values
model.compile(loss='binary_crossentropy',  # categorical_crossentropy
              optimizer='adam', metrics=['accuracy'])
print(model.summary())

Y = pd.get_dummies(data['sentiment']).values
X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.25, random_state=42)
print(X_train.shape, Y_train.shape)
print(X_test.shape, Y_test.shape)

model.fit(X_train, Y_train, epochs=7, batch_size=batch_size, verbose=2)

validation_size = 100
X_validate = X_test[-validation_size:]
Y_validate = Y_test[-validation_size:]
X_test = X_test[:-validation_size]
Y_test = Y_test[:-validation_size]
# X_validate = X_test
# Y_validate = Y_test
print(X_test.shape, Y_test.shape)
score, acc = model.evaluate(X_test, Y_test, verbose=2, batch_size=batch_size)
print("score: %.2f" % (score))
print("acc: %.2f" % (acc))

# pos_cnt, neg_cnt, pos_correct, neg_correct = 0, 0, 0, 0
# for x in range(len(X_validate)):
#     result = model.predict(X_validate[x].reshape(
#         1, X_test.shape[1]), batch_size=1, verbose=2)[0]
#
#     if np.argmax(result) == np.argmax(Y_validate[x]):
#         if np.argmax(Y_validate[x]) == 0:
#             neg_correct += 1
#         else:
#             pos_correct += 1
#
#     if np.argmax(Y_validate[x]) == 0:
#         neg_cnt += 1
#     else:
#         pos_cnt += 1
# print("pos_acc", pos_correct / pos_cnt * 100, "%")
# print("neg_acc", neg_correct / neg_cnt * 100, "%")

twt = 'Meetings: Because all of us are good good good'
# vectorizing the tweet by the pre-fitted tokenizer instance
twt = tokenizer.texts_to_sequences(twt)
# padding the tweet to have exactly the same shape as `embedding_2` input
twt = pad_sequences(twt, maxlen=X_train.shape[1], dtype='int32',
                    padding='post', truncating='post', value=0)
sentiment = model.predict(twt, batch_size=1, verbose=2)[0]
if(np.argmax(sentiment) == 0):
    print("negative")
elif (np.argmax(sentiment) == 1):
    print("positive")


# model_json = model.to_json()
# with open("model.json", "w") as json_file:
#     json_file.write(model_json)
# # serialize weights to HDF5
# model.save_weights("model.h5")
# print("Saved model to disk")
