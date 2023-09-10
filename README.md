# Online Schedule lecture project

The project successfully implements an online lecture scheduling system using a MERN stack architecture. It consists of two sections: one for admin and another for instructors. Users are required to log in with their username and password to access the admin panel.

Upon successful login, admin gain access to the admin panel, where they can add new courses by providing details such as course name, level, description, and images. Once a course is created, it is displayed in the course list. admin can also delete courses or add lectures to existing courses.

To add a lecture, admin can select an instructor from a dropdown list and assign a date to it. Once a lecture is assigned to a particular instructor on a selected date, it becomes unavailable for assignment to other instructors to that course or other courses on the same date. Users can also view the list of lectures assigned to a specific course and see a comprehensive list of all instructors.

In the instructor section, instructors need to log in to access their dedicated panel. Upon successful login, instructors can view the lectures assigned to them for specific courses, allowing for effective management of their teaching responsibilities.
 

Stacks used in this project is :
- React.js
- Tailwind
- node.js & express.js
- MongoDB & mongoose

## How to Run this application

- clone this repository.
- Run npm install.
- change in .env file to your mongodb uri.
- to start server navigate to backend folder & Run nodemon index.js.
- On Root directory Run npm start.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

- # credentials required to use this app
- admin login credentials		
name	username	password
satish	Satish@gmail.com	Satish@123
		
-Instructor login credentials		
name	username	password
karan	Karan@gmail.com	Karan@123
jitu	Jitu@gmail.com	Jitu@123
sneha	Sneha@gmail.com	Sneha@123
jagdish	Jagdish@gmail.com	Jagdish@123
chetan	Chetan@gmail.com	Chetan@123

live link for this project:
link- [https://online-lecture-scheduling-fe.vercel.app/](url);

additional file:
database dump in included in the backend directory:
name of the file : dbdump.gzip



