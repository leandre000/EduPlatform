import axios from "axios"

const API_BASE_URL = "http://localhost:8080/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwtToken")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// --- Public Endpoints ---
export const publicApi = {
  registerStudent: (data: any) => api.post("/auth/register/student", data),
  registerInstructor: (data: any) => api.post("/auth/register/instructor", data),
  login: (data: any) => api.post("/auth/login", data),
  forgotPasswordRequest: (data: any) => api.post("/auth/forgot-password/request", data),
  forgotPasswordReset: (data: any) => api.post("/auth/forgot-password/reset", data),
  getAllCourses: (params?: any) => api.get("/courses", { params }),
  getCourseById: (courseId: string) => api.get(`/courses/${courseId}`),
  getReviewsForCourse: (courseId: string) => api.get(`/courses/${courseId}/reviews`),
  submitContact: (data: { name: string; email: string; subject: string; message: string }) =>
    api.post("/contact", data),
}

// --- General Authenticated User Endpoints ---
export const userApi = {
  getProfile: () => api.get("/users/me"),
  updateProfile: (data: any) => api.put("/users/me", data),
  changePassword: (data: any) => api.put("/users/me/password", data),
}

// --- Student Specific Endpoints ---
export const studentApi = {
  enrollInCourse: (data: { courseId: string }) => api.post("/enrollments", data),
  getMyEnrollments: () => api.get("/enrollments/me"),
  markLectureCompleted: (enrollmentId: string, lectureId: string) =>
    api.post(`/enrollments/${enrollmentId}/lectures/${lectureId}/complete`),
  submitCourseReview: (courseId: string, data: { rating: number; comment?: string }) =>
    api.post(`/courses/${courseId}/reviews`, data),
  submitAssignment: (assignmentId: string, data: { submissionText?: string; fileUrl?: string } | FormData) => {
    if (data instanceof FormData) {
      return api.post(`/assignments/${assignmentId}/submissions`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    }
    return api.post(`/assignments/${assignmentId}/submissions`, data)
  },
  downloadMarkingGuide: (guideId: string) => api.get(`/marking-guides/${guideId}/download`, { responseType: "blob" }),
  createComplaint: (data: { subject: string; description: string; courseId?: string }) => api.post("/complaints", data),
  getMyComplaints: () => api.get("/complaints/me"),
}

// --- Instructor Specific Endpoints ---
export const instructorApi = {
  createCourse: (data: any) => api.post("/courses", data),
  updateOwnCourse: (courseId: string, data: any) => api.put(`/courses/${courseId}`, data),
  deleteOwnCourse: (courseId: string) => api.delete(`/courses/${courseId}`),
  createAssignment: (courseId: string, data: any) => api.post(`/courses/${courseId}/assignments`, data),
  getSubmissionsForAssignment: (assignmentId: string) => api.get(`/assignments/${assignmentId}/submissions`),
  markAssignment: (assignmentId: string, submissionId: string, data: { marksObtained: number; feedback?: string }) =>
    api.put(`/assignments/${assignmentId}/submissions/${submissionId}/mark`, data),
  uploadMarkingGuide: (courseId: string, formData: FormData) =>
    api.post(`/courses/${courseId}/marking-guides`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  viewInstructorComplaints: () => api.get("/complaints"),
  respondToComplaint: (complaintId: string, data: { responseText: string; status: "PENDING" | "RESOLVED" }) =>
    api.put(`/complaints/${complaintId}/respond`, data),
  getMyCourses: () => api.get("/courses/instructor/me"),
  getCourseAnalytics: (courseId: string) => api.get(`/courses/${courseId}/analytics`),
}

// --- Admin Specific Endpoints ---
export const adminApi = {
  getAllUsers: (params?: any) => api.get("/admin/users", { params }),
  updateUserRole: (userId: string, data: { role: "STUDENT" | "INSTRUCTOR" | "ADMIN" }) =>
    api.put(`/admin/users/${userId}/role`, data),
  deleteUser: (userId: string) => api.delete(`/admin/users/${userId}`),
  updateAnyCourse: (courseId: string, data: any) => api.put(`/courses/${courseId}`, data),
  deleteAnyCourse: (courseId: string) => api.delete(`/courses/${courseId}`),
  deleteAnyReview: (reviewId: string) => api.delete(`/reviews/${reviewId}`),
  viewAllComplaints: () => api.get("/complaints"),
  respondToAnyComplaint: (complaintId: string, data: { responseText: string; status: "PENDING" | "RESOLVED" }) =>
    api.put(`/complaints/${complaintId}/respond`, data),
  getPlatformStats: () => api.get("/admin/stats"),
  getUserAnalytics: () => api.get("/admin/analytics/users"),
  getCourseAnalytics: () => api.get("/admin/analytics/courses"),
  getContactMessages: () => api.get("/admin/contact-messages"),
}

// Export the default axios instance for general use if needed
export default api
