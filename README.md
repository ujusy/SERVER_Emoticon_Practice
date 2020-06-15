# EmoticBox
------
### Develop Environment
+ Language - JavaScript
+ Design pattern - MVC
+ cloud - AWS RDS

### Getting Start
+ install Node.js 10LTS
+ clone the repository
```
git clone  <git lab template url> <project_name>
```
+ Install dependencie
```
cd <project-name>
npm install
npm install promise-mysql
```
+ Build and run the project
```
npm start
```

### Dependecy
```
"dependencies": {
    "@babel/cli": "^7.10.1",
    "@babel/core": "^7.10.2",
    "@babel/node": "^7.10.1",
    "@babel/polyfill": "^7.10.1",
    "@babel/preset-env": "^7.10.2",
    "@babel/register": "^7.10.1",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "eslint-config-airbnb": "^18.1.0",
    "express": "~4.16.1",
    "morgan": "~1.9.1",
    "mysql": "^2.18.1",
    "promise-mysql": "^4.1.3",
    "request": "^2.88.2",
    "uuid4": "^1.1.4"
  },
```
### Core Technology
1. 예외처리
+ 들어오는 인자의 null값 확인 
+ model에서 인자의 중복값 확인
+ model에서 id의 유효값 확인
+ 서버에러 등에 대한 처리

2. Tags
+ CREATE
+ READ
+ READALL
+ DELETE

3. Emoticons
+ CREATE
> create 할 때마다 tagId의 null값 유무를 확인하여 tag의 emoticon의 수를 update
+ READ 
> recommendation
> + 판매량 정렬 후 id 정렬 
> + 자기 자신의 id는 제외하므로 WHERE NOT IN 구문 사용
> + response 형태를 보면 객체 안에 속성으로 recommendation이 들어감을 확인
> + recommendation 배열을 만들어 주고 result[0].recommendation = recommendation; 의 형식으로 변경.
+ READALL
+ DELETE
> delete 할 때마다 tagId의 null값 유무를 확인하여 tag의 emoticon의 수를 update

4. Response 형식
+ response 형식을 맞추어주기 위해 반환 json을 json.data[0] 혹은 json.data로 반환.






