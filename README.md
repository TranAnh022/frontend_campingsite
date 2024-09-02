# Introduction

This project is a thesis assignment, showcasing the development of a basic social application. Built using React and Bootstrap, the application interacts with a backend API for data management, enabling users to create, read, update, and delete data.

The application features a robust authentication system with role-based access control. Basic users can explore and interact with products by filtering, searching, sorting, and adding or removing review

Check out the website [here](https://campingsite.netlify.app/)

NOTE: This repository only contains the frontend of the application. The backend can be found [here](https://github.com/TranAnh022/backend_campsite)

### Prerequisites:
- React
- Redux
- BootStrap
- Typescript

### File Structure:
<pre>
src
├── components
│   ├── CampsiteCard.tsx
│   ├── Error.tsx
│   ├── Footer.tsx
│   ├── ImageUpload.tsx
│   ├── Map.tsx
│   ├── Mapbox.tsx
│   ├── Nav.tsx
│   ├── Rating.tsx
│   ├── ReviewCard.tsx
│   ├── Reviews.tsx
│   ├── Thumbnail.tsx
├── scenes
│   ├── Campsites
│   │   ├── Create.tsx
│   │   ├── Edit.tsx
│   │   ├── index.tsx
│   │   ├── Show.tsx
│   ├── LoginPage
│   │   ├── index.tsx
│   ├── Password
│   │   ├── index.tsx
│   ├── RegisterPage
│   │   ├── index.tsx
├── state
│   ├── error.ts
│   ├── index.ts
App.tsx
index.css
index.tsx
type.d.ts
validationForm.tsx
</pre>

### Installation:
   Clone the repo:
```
   git clone https://github.com/TranAnh022/frontend_campingsite.git
```
   Then, install all the dependencies:
```
   npm install
```
   Start the project with:
```
   npm start
```


## Picture Demo

![image](https://github.com/TranAnh022/frontend_campingsite/assets/63698770/540e7d3a-bba7-4247-b889-a95aa6e6c1d6)
![image](https://github.com/TranAnh022/frontend_campingsite/assets/63698770/3748b103-dd56-4fc2-a563-3125942d21e6)

