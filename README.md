# Project One (easyDo)

### USER STORY

User will see 4 sections on displayed

1. Toolbar
  * plus symbol / add new task  = takes user to the add a new task page
  * plus symol / add new collaborator  = takes user to the add a new collaborator page 
  * V2? plus symbol / add new user  = takes user to the add a new user page
  * V2? Sorting and Filtering

2. To do
  * plus symbol  = takes user to the add a new task page 
  * X symbol = to remove task
  * Task name  = displays name of task (comes from new task page)
  * Edit = takes use to the edit task page
  * Time = displays time to complete task (comes from new task page)
  * Owner = displays name of team member responsible for the task

3. In progress 
  * Task name  = displays name of task (comes from new task page)
  * X symbol = to remove task
  * Edit = takes use to the edit task page
  * Time = displays time to complete task (comes from new task page)
  * Owner = displays name of team member responsible for the task

4. Completed 
  * Check mark = indicates task was completed
  * Task name  = displays name of task (comes from new task page)
  * Time = displays time to complete task (comes from new task page) 
  * Owner = displays name of team member responsible for the task

##### Reference 'add newtask' 'Edit' and 'add new collaborator' above
* plus symbol / add new task  = takes user to the add a new task page
	* Task = user enters name of task
	* Owner = user assigns team member to the task (if no owners, click *)
	* Time = user enters estimate on time to complete task
  * Stage = user can move the task from section to section (to do, in progress, completed)
  * Add = user clicks and a new task is populated in the to do section

* Edit = takes use to the edit task page
	* Same as add task for (task, owner, time, stage)
	* Update button = user clicks and a current task is updated and potentially moved

* plus symbol / add new collaborator  = takes user to the add a new collaborator page
	* Current collaborators = list of names
	* New collaborator = enter new name
	* Add = user clicks to add new collaborator


### SCHEDULE
<!-- schedule table start -->
<table>

<thead>
<tr>
<th>DAY</th>
<th>TASKS</th>
</tr>
</thead>

<tbody>
<tr>
<td>Friday</td>
<td>finish all M+J (MVC and core files)</td>
</tr>

<tr>
<td>Saturday</td>
<td>
  Model (Melisa)<br>
  Controllers - tasks (Melisa)<br>
  Pull collaborators data into tasks controllers (Melisa)<br>
  Views - Tasks (Jimmy)<br>
  Collaborators (M-M) REF<br>
</tr>

<tr>
<td>Sunday</td>
<td>
  Controllers - tasks (Melisa)<br>
  Controllers - Collaborators (Melisa)<br>
  Views - Collaborators/Forms (Jimmy)<br>
</td>
</tr>

<tr>
<td>Monday</td>
<td>
  Finalize both controllers (Melisa)<br>
  Views - Tasks Animation (jimmy)<br>
</td>
</tr>

<tr>
<td>Tuesday</td>
<td>
  v1 (mvp) review and confirm. Push to master as v1<br>
  v1.5 welcome screen(Melisa and Jimmy)<br>
  v1.5 animation (Melisa and Jimmy)<br>
  v1.5 <br>
    Melisa - Projects/Users - Controller<br>
    Jimmy - Projects/Users - Views<br>
  v1.5 review and confirm. Push to master as v1.5<br>
</td>
</tr>

<tr>
<td>Wednesday</td>
<td>
  v2 Choose features to work on in Next Versions -> V2<br>
  More V2<br>
</td>
</tr>

<tr>
<td>Thursday</td>
<td>
  v2 Finish up<br>
  v2 Review and Confirm. Push to master as v2<br>
  Turn in by 4pm (preferably 3pm<br>
</td>
</tr>

</tbody>

</table>
<!-- schedule table end -->

### NEXT VERSIONS

V1.5
User is welcomed by an banner and 
Button to create a project
See a list of current projects

When clicking on ‘create project’ the use is prompted to fill out information about the project 
	Name, collaborators, start date, end date
	Then user clicks add new project
Hover - in progress
V2
Users
Sign in/out
Filter by user
Sorting tasks
	Filter by user
Drag and drop tasks
Priority
Animation upon task completion
DB - collection of projects (maybe v1)
Hide completed tasks


### WIRE FRAME


### ERD
<!-- erd table start -->

<table>

<thead>
<tr>
<th>Tasks</th>
<th>Collaborators</th>
<th>V2 Projects</th>
</tr>
</thead>

<tbody>
<tr>
<td>Name STRING</td>
<td>Name STRING</td>
<td>Name STRING</td>
</tr>

<tr>
<td>Collaborator (O-M) REF</td>
<td>Static Picture STRING</td>
<td>Collaborators (M-M) REF</td>
</tr>

<tr>
<td>Completion Time STRING</td>
<td>Tasks (M-O) REF</td>
<td>Tasks (M-O) REF</td>
</tr>

<tr>
<td>Stage STRING</td>
<td>V2 Projects (M-M) REF</td>
<td>Start Date DATE</td>
</tr>

<tr>
<td>V2 project (O-M) REF</td>
<td>V2 username/pass REF</td>
<td>End Date DATE</td>
</tr>
</tbody>

</table>
<!-- erd table end -->


<!-- task distribution table start -->
### TASK DISTRIBUTION
<table>

<thead>
<tr>
<th>Work Distribution - Option 1 (by models)</th>
<th>Work Distribution - Option 2 (J front M back)</th>
</tr>
</thead>

<body>
<tr>
<td>
Controllers
  tasksController  -  Jimmy
  collaboratorsController  -  Melisa
Models
  Task  -  Jimmy
  Collaborator  -  Melisa
  index  -  M+J
Views
  Tasks
    index   -  Jimmy
    show  -  Jimmy
    new  -  Jimmy
    edit  -  Jimmy
  Collaborators
    index   -  Melisa
    show  -  Melisa
    new  -  Melisa
    edit  -  Melisa
  index  -  M+J
Server.js  -  M+J
Public
  images  -  Jimmy
  app.js  -  Melisa
  styles.css  -  Jimmy
</td>

<td>
Controllers
  tasksController*  -  Melisa (V2 M+J)
  collaboratorsController  -  Melisa
Models
  Task  -  Melisa
  Collaborator  -  Melisa
  index  -  M+J
Views
  Tasks
    index   -  Jimmy
    show  -  Jimmy
    new  -  Jimmy
    edit  -  Jimmy
  Collaborators
    index   -  Jimmy
    show  -  Jimmy
    new  -  Jimmy
    edit  -  Jimmy
  index  -  M+J
Server.js  -  M+J
Public
  images  -  Jimmy
  app.js  -  Melisa
  styles.css  -  Jimmy

*tasksController will populate collaborators
</td>
</tr>
</body>

</table>
<!-- task distribution table end -->