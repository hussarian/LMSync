import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import '@/app/globals.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from '@/app/page.jsx'
import Dashboard from '@/app/dashboard/page.jsx'
import Account from '@/app/account/page.jsx'
import Individual from '@/app/account/individual/page.jsx'
import Bulk from '@/app/account/bulk/page.jsx'
import Register from '@/app/account/register/page.jsx'
import Academic from '@/app/academic/page.jsx'
import Students from '@/app/academic/students/page.jsx'
import RegisterAcademic from '@/app/academic/register/page.jsx'
import CourseList from '@/app/courses/list/page.jsx'
import Course from '@/app/courses/page.jsx'
import RegisterCourse from '@/app/courses/register/page.jsx'
import Subjects from '@/app/courses/subjects/page.jsx'
import RegisterSubject from '@/app/courses/subjects/register/page.jsx'
import SubjectDetail from '@/app/courses/subjects/detail/page.jsx'
import Attendance from '@/app/attendance/page.jsx'
import RegisterAttendance from '@/app/attendance/register/page.jsx'
import AttendanceRooms from '@/app/attendance/rooms/page.jsx'
import Survey from '@/app/survey/page.jsx'
import SurveyItems from '@/app/survey/items/page.jsx'
import SurveyLectures from '@/app/survey/lectures/page.jsx'
import SurveyTemplates from '@/app/survey/templates/page.jsx'
import Exam from '@/app/exam/page.jsx'
import ExamCourses from '@/app/exam/courses/page.jsx'
import ExamQuestions from '@/app/exam/questions/page.jsx'
import Permission from '@/app/permission/page.jsx'
import Instructor from '@/app/instructor/courses/page.jsx'
import InstructorCourses from '@/app/instructor/courses/page.jsx'
import InstructorLectures from '@/app/instructor/courses/lectures/page.jsx'
import InstructorAssignments from '@/app/instructor/courses/assignments/page.jsx'
import RegisterInstitution from '@/app/institution/register/page.jsx'
import InstructorQuestionBank from '@/app/instructor/exam/question-bank/page.jsx'
import QuestionBank from '@/app/instructor/question-bank/all/page.jsx'
import ExamQuestionBank from '@/app/instructor/exam/question-bank/page.jsx'
import MyExams from '@/app/instructor/exam/my-exams/page.jsx'
import QuestionBankAll from '@/app/instructor/question-bank/all/page.jsx'
import LectureStatus from '@/app/instructor/lectures/[id]/page.jsx'
import LectureHistory from '@/app/instructor/exam/lectures/history/page.jsx'


createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Account */}
      <Route path="/account" element={<Account />} />
      <Route path="/account/individual" element={<Individual />} />
      <Route path="/account/bulk" element={<Bulk />} />
      <Route path="/account/register" element={<Register />} />

      {/* Academic */}
      <Route path="/academic" element={<Academic />} />
      <Route path="/academic/students" element={<Students />} />
      <Route path="/academic/register" element={<RegisterAcademic />} />

      {/* Course */}
      <Route path="/courses" element={<Course />} />
      <Route path="/courses/list" element={<CourseList />} />
      <Route path="/courses/register" element={<RegisterCourse />} />
      <Route path="/courses/subjects" element={<Subjects />} />
      <Route path="/courses/subjects/register" element={<RegisterSubject />} />
      <Route path="/courses/subjects/detail" element={<SubjectDetail />} />

      {/* Attendance */}
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/attendance/rooms" element={<AttendanceRooms />} />
      <Route path="/attendance/register" element={<RegisterAttendance />} />

      {/* Survey */}
      <Route path="/survey" element={<Survey />} />
      <Route path="/survey/items" element={<SurveyItems />} />
      <Route path="/survey/lectures" element={<SurveyLectures />} />
      <Route path="/survey/templates" element={<SurveyTemplates />} />

      {/* Exam */}
      <Route path="/exam" element={<Exam />} />
      <Route path="/exam/courses" element={<ExamCourses />} />
      <Route path="/exam/questions" element={<ExamQuestions />} />

      {/* Permission */}
      <Route path="/permission" element={<Permission />} />
      {/* 권환관련된 기능 2개는 프론트 미구현으로 보류 */}

      {/* Instructor */}
      <Route path="/instructor" element={<Instructor />} />
      <Route path="/instructor/courses" element={<InstructorCourses />} />
      <Route path="/instructor/courses/lectures" element={<InstructorLectures />} />
      <Route path="/instructor/courses/assignments" element={<InstructorAssignments />} />
      <Route path="/instructor/question-bank" element={<InstructorQuestionBank />} />
      <Route path="/instructor/question-bank/all" element={<QuestionBankAll />} />
      <Route path="/instructor/exam/question-bank" element={<ExamQuestionBank />} />
      <Route path="/instructor/exam/my-exams" element={<MyExams />} />
      <Route path="/instructor/exam/lectures/history" element={<LectureHistory />} />
      <Route path="/instructor/survey/lectures" element={<SurveyLectures />} />
  
      {/* question bank */}
      <Route path="/question-bank" element={<QuestionBank />} />
      {/* question bank all 없음 */}


      {/* Institution */}
      <Route path="/institution/register" element={<RegisterInstitution />} />

      {/* lecture */}
      <Route path="/lecture-status" element={<LectureStatus />} />
    </Routes>
  </Router>
)
