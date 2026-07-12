# Ngon-ngu-python
import pandas
import tkinter
from tkinter import *
from tkinter.ttk import *
from tkinter import messagebox
from sklearn import tree
from sklearn.model_selection import train_test_split
import pydotplus
from sklearn.tree import DecisionTreeClassifier
from sklearn.tree import export_text
import matplotlib.pyplot as plt
import matplotlib.image as pltimg
df = pandas.read_csv("buyproduct.csv")
# chuyển dữ liệu sang dạng số
d = {'spring': 0, 'summer': 1, 'winter ': 2, 'autumn': 3}
df['Season'] = df['Season'].map(d)
#print(df['Season'])
d = {'buy a lot ': 0, 'buy some ': 1, 'have not bought yet': 2}
df['Purchase history '] = df['Purchase history '].map(d)
d = {'young ': 0, 'middle age': 1, 'ages': 2}
df['Age'] = df['Age'].map(d)
d = {'hight': 1, 'normal': 0}
df[' Income'] = df[' Income'].map(d)
d = {'No': 0, 'Yes': 1}
df['Buy'] = df['Buy'].map(d)
print(df)
# tach cot chuc nang ra khoi cot muc tieu
features = ['Season', 'Purchase history ', 'Age', ' Income']
X = df[features]
y = df['Buy']
print(X)
print(y)
#Chia du lieu ra 25% test - 75% train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)
clf = DecisionTreeClassifier(criterion="entropy").fit(X_train, y_train)
print(X_test)
# y_pred = clf.predict(pd.DataFrame(data))
# print(y_pred)
tree.plot_tree(clf, filled=True)
plt.show()
r = export_text(clf)
print(r)
dtree = DecisionTreeClassifier()
dtree = dtree.fit(X, y)
window = Tk()
window.title("Dự đoán khả năng mua hàng của khách hàng dựa trên tệp dữ liệu")
window.geometry("900x400")
# Thêm label
lbl = tkinter.Label(window, text="Dự đoán khả năng mua hàng của khách hàng dựa trên tệp dữ liệu", fg="blue", font=("Arial", 14))
lbl.grid(column=0, row=0)
# add layer season
lblseason = tkinter.Label(window, text="season", font=("Arial", 12))
lblseason.grid(column=0, row=1)
comboseason = Combobox(window)
comboseason['values'] = ("spring", "summer", "autumn", "winter")
comboseason.current(0)
comboseason.grid(column=1, row=1)
# add layer Purchase history
lblpurchase = tkinter.Label(window, text="Purchase history ", font=("Arial", 12))
lblpurchase.grid(column=0, row=2)
combopurchase = Combobox(window)
combopurchase['values'] = ("buy a lot", "buy some", "have not bought yet")
combopurchase.current(0)
combopurchase.grid(column=1, row=2)
# Add layer Income
lblincome = tkinter.Label(window, text="Income", font=("Arial", 12))
lblincome.grid(column=0, row=3)
comboincome = Combobox(window)
comboincome['values'] = ("hight", "normal")
comboincome.current(0)
comboincome.grid(column=1, row=3)
# add layer age
lblage = tkinter.Label(window, text="Age", font=("Arial", 12))
lblage.grid(column=0, row=4)
comboage = Combobox(window)
comboage['values'] = ("young", "middle age", "age")
comboage.current(0)
comboage.grid(column=1, row=4)
# add label
lblvlf = tkinter.Label(window, text="Values", fg="red", font=("Arial", 10))
lblvlf.grid(column=0, row=5)
lblvl = tkinter.Label(window, text="Values", fg="red", font=("Arial", 10))
lblvl.grid(column=0, row=6)
def Buttonout():
    ss = comboseason.get()
    pc = combopurchase.get()
    ic = comboincome.get()
    ag = comboage.get()
    # switch case value numbers
    #-------------------------------------- ss
    if ss == 'spring':
        ss = 0
    elif ss == 'summer':
        ss = 1
    elif ss == 'winter':
        ss = 2
    else:
        ss = 3
    ssi = str(ss)
    #---------------------------------------- pc
    if pc == 'buy a lot':
        pc = 0
    elif pc == 'buy some':
        pc = 1
    else:
        pc = 2
    pci = str(pc)
    #------------------------------------------ ic
    if ic == 'hight':
        ic = 1
    else:
        ic = 0
    ici = str(ic)
    #------------------------------------------- ag
    if ag == 'young':
        ag = 0
    elif ag == 'middle age':
        ag = 1
    else:
        ag = 2
    agi = str(ag)
    #-----------------------------------------
    val = dtree.predict([[ss,pc,ic,ag]])
    if val == 1:
        val = "khách hàng có khả năng mua hàng cao"
    else:
        val = "Khách hàng có khả năng mua hàng thấp"
    lblvlf.configure(text = "Thông tin khách hàng là:" + ssi + pci + ici + agi)
    lblvl.configure(text = "Kết quả sau khi đánh giá:" + val)
    return
# add button
btnshowval = Button(window, text = "Dự đoán", command = Buttonout)
btnshowval.grid(column=0, row=7)
window.mainloop()
print(dtree.predict([[2, 1, 1, 2]]))
#print("[1] means 'YES'")
#print("[0] means 'NO'")
plt.show()
