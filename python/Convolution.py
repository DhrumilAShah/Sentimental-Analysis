import re

import numpy as np
import pandas as pd
from keras.callbacks import TensorBoard
from keras.layers import LSTM, Convolution1D, Dense, Dropout, Flatten
from keras.layers.embeddings import Embedding
from keras.models import Sequential
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import Tokenizer
from keras.utils.np_utils import to_categorical
from nltk.stem.snowball import SnowballStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split

max_features = 2000
max_review_length = 1600
embedding_vecor_length = 300
batch_size = 64

stemmer = SnowballStemmer("english")
data = pd.read_csv('./app/resources/csv/imdb.csv',
                   error_bad_lines=False, delimiter=',')

data['text'] = data['text'].apply(
    (lambda x: re.sub('[^a-zA-z\s]', '', stemmer.stem(str(x).lower()))))

print(data[data['sentiment'] == 1].size)
print(data[data['sentiment'] == 0].size)

tokenizer = Tokenizer(num_words=max_features, split=' ')
tokenizer.fit_on_texts(data['text'].values)
X = tokenizer.texts_to_sequences(data['text'].values)
X = pad_sequences(X)


model = Sequential()
model.add(Embedding(max_features, embedding_vecor_length, input_length=X.shape[1]))
model.add(Convolution1D(64, 3, padding='same'))
model.add(Convolution1D(32, 3, padding='same'))
model.add(Convolution1D(16, 3, padding='same'))
model.add(Flatten())
model.add(Dropout(0.2))
model.add(Dense(180, activation='sigmoid'))
model.add(Dropout(0.2))
model.add(Dense(2, activation='sigmoid'))
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
print(model.summary())

Y = pd.get_dummies(data['sentiment']).values
X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.25, random_state=42)
print(X_train.shape, Y_train.shape)
print(X_test.shape, Y_test.shape)

model.fit(X_train, Y_train, epochs=7, batch_size=batch_size, verbose=2)

# validation_size = 100
# X_validate = X_test[-validation_size:]
# Y_validate = Y_test[-validation_size:]
# X_test = X_test[:-validation_size]
# Y_test = Y_test[:-validation_size]
X_validate = X_test
Y_validate = Y_test
print(X_test.shape, Y_test.shape)
score, acc = model.evaluate(X_test, Y_test, verbose=2, batch_size=batch_size)
print("score: %.2f" % (score))
print("acc: %.2f" % (acc))
