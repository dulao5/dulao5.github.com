---
layout: post
title: 原来C＋＋支持 类成员函数指针
category: cpp
---

```cpp
#include <iostream>
using namespace std;

class A;
typedef void (A::*pAFun)(void);  //定义类成员函数指针

class A{

public:
  void fun(){
      cout<<"A::fun run"<<endl;
  };
};

class B
{
protected:
  A *_a;
  pAFun _callback;

public:
  B():_callback(NULL), _a(NULL)
  {};
  
  void setOnDo(pAFun _pf_callback, A * pA)
  {
      _callback = _pf_callback;
      _a = pA;
  }
  
  void Do()
  {
      cout << "class B::Do ..." <<endl;
      cout << "class B::Do callback: ..." <<endl;
      if(_callback && _a)
      {
          (_a->*_callback)();  //以一种奇怪的方式进行&ldquo;类成员函数指针&rdquo;的调用
      }
      cout << "class B::Do return" <<endl;
  }
  
};

int main(int argc, char *argv[])
{
  A a;
  B b;

  b.setOnDo(&A::fun, &a);

  b.Do();

  return 0;
}
```
刚刚写代码验证的，做个记号。

