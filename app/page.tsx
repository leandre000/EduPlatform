"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
  BookOpen,
  Users,
  Clock,
  Award,
  Star,
  Play,
  BarChart3,
  Shield,
  TrendingUp,
  CheckCircle,
  GraduationCap,
  Rocket,
  Heart,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Globe,
  Zap,
  Target,
  Lightbulb,
} from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/context/auth-context"
import { useState } from "react"
import { publicApi } from "@/utils/api"

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStartLearning = () => {
    if (isAuthenticated) {
      document.querySelector("#courses")?.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = "/register"
    }
  }

  const handleBrowseCourses = () => {
    if (isAuthenticated) {
      window.location.href = "/courses"
    } else {
      toast.info("Please login or sign up to explore our courses", {
        action: {
          label: "Sign Up",
          onClick: () => (window.location.href = "/register"),
        },
      })
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await publicApi.submitContact(contactForm)
      toast.success("Message sent successfully! We'll get back to you soon.")
      setContactForm({ name: "", email: "", subject: "", message: "" })
    } catch {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Learn From Experts",
      description: "World-class instructors with industry experience",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Learn At Your Pace",
      description: "Flexible scheduling with lifetime access",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Earn Certificates",
      description: "Industry-recognized certificates upon completion",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Track Progress",
      description: "Advanced analytics and progress tracking",
      color: "from-green-500 to-teal-500",
    },
  ]

  const platformFeatures = [
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: "Student Dashboard",
      description: "Comprehensive learning hub with progress tracking, course management, and interactive assignments.",
      features: ["Course Progress Tracking", "Assignment Submissions", "Certificate Management", "Learning Analytics"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Instructor Portal",
      description: "Complete course creation and management tools with revenue tracking and student analytics.",
      features: ["Course Creation Tools", "Student Management", "Revenue Analytics", "Assignment Grading"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Admin Control",
      description: "Powerful administrative tools for platform management and user oversight.",
      features: ["User Management", "Platform Analytics", "Content Moderation", "System Monitoring"],
      color: "from-orange-500 to-red-500",
    },
  ]

  const modernFeatures = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Personalized learning paths with AI recommendations",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Community",
      description: "Connect with learners worldwide in study groups",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Skill Assessment",
      description: "Regular assessments to track your skill development",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Interactive Labs",
      description: "Hands-on coding labs and virtual environments",
      color: "from-emerald-500 to-teal-500",
    },
  ]

  const stats = [
    { number: "50K+", label: "Active Students", icon: <Users className="w-6 h-6" /> },
    { number: "2,500+", label: "Expert Instructors", icon: <GraduationCap className="w-6 h-6" /> },
    { number: "10K+", label: "Courses Available", icon: <BookOpen className="w-6 h-6" /> },
    { number: "98%", label: "Success Rate", icon: <TrendingUp className="w-6 h-6" /> },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "This platform transformed my career. The courses are comprehensive and the instructors are amazing!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Data Scientist",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Best learning experience I've ever had. The analytics help me track my progress perfectly.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "UI/UX Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "The course quality is outstanding. I landed my dream job after completing the design bootcamp.",
      rating: 5,
    },
  ]

  const courseCategories = [
    {
      name: "Web Development",
      courses: 245,
      students: "12.5K",
      icon: "💻",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      name: "Data Science",
      courses: 189,
      students: "8.9K",
      icon: "📊",
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    },
    {
      name: "Mobile Development",
      courses: 156,
      students: "7.2K",
      icon: "📱",
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },
    {
      name: "UI/UX Design",
      courses: 134,
      students: "6.5K",
      icon: "🎨",
      color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    },
    {
      name: "Digital Marketing",
      courses: 98,
      students: "4.8K",
      icon: "📈",
      color: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
    },
    {
      name: "Business",
      courses: 87,
      students: "3.8K",
      icon: "💼",
      color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 dark:from-teal-950 dark:via-blue-950 dark:to-purple-950" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-teal-100 to-green-100 text-teal-700 dark:from-teal-900 dark:to-green-900 dark:text-teal-300 border-0"
                >
                  🚀 Transform Your Career Today
                </Badge>
                <h1 className="text-4xl lg:text-7xl font-bold leading-tight">
                  Master New Skills with{" "}
                  <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Expert-Led
                  </span>{" "}
                  Courses
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                  Join thousands of learners advancing their careers with our comprehensive online learning platform.
                  Learn from industry experts, track your progress, and earn recognized certificates.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={handleStartLearning}
                  className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning Free
                </Button>
                <Button size="lg" variant="outline" className="border-2" onClick={handleBrowseCourses}>
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Courses
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2 text-teal-600">{stat.icon}</div>
                    <div className="text-2xl lg:text-3xl font-bold text-foreground">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/education-hero.svg"
                    alt="Interactive Learning Dashboard"
                    width={500}
                    height={400}
                    className="rounded-2xl w-full h-auto"
                  />
                </div>

                {/* Floating Certificate */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl p-4 shadow-lg animate-bounce">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Certificate</div>
                      <div className="text-xs opacity-90">Earned!</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <Avatar key={i} className="w-8 h-8 border-2 border-white">
                          <AvatarFallback className="bg-gradient-to-br from-teal-500 to-green-500 text-white text-xs">
                            {i}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div>
                      <div className="text-sm font-medium">50K+ Students</div>
                      <div className="text-xs text-muted-foreground">Learning Together</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-purple-200 dark:from-teal-800 dark:to-purple-800 rounded-3xl transform -rotate-6 scale-105 opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              About EduPlatform
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Revolutionizing{" "}
              <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                Online Education
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to make quality education accessible to everyone, everywhere. Our platform combines
              cutting-edge technology with expert instruction to deliver an unparalleled learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modernFeatures.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="space-y-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto text-white group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Platform Features
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform provides role-based dashboards, advanced analytics, and powerful tools for
              students, instructors, and administrators.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                />
                <CardHeader className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Core Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="space-y-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto text-white group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section
        id="courses"
        className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Course Categories
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Course Library
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from thousands of courses across multiple disciplines, taught by industry experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-4xl p-3 rounded-xl ${category.color}`}>{category.icon}</div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{category.courses}</div>
                      <div className="text-xs text-muted-foreground">Courses</div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-teal-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{category.students} students enrolled</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full group-hover:bg-teal-50 group-hover:text-teal-600 dark:group-hover:bg-teal-950"
                    onClick={handleBrowseCourses}
                  >
                    Explore Courses
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Student Success
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              What Our{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Students Say
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of successful learners who have transformed their careers with our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-to-br from-teal-500 to-green-500 text-white">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Get In Touch
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Contact{" "}
              <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                Our Team
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Send us a message
                </CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-muted-foreground">support@eduplatform.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Visit Us</h3>
                    <p className="text-muted-foreground">123 Education St, Learning City, LC 12345</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-950 dark:to-green-950 border-teal-200 dark:border-teal-800">
                <h3 className="font-semibold mb-2">Quick Response Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  We typically respond to all inquiries within 2-4 hours during business hours. For urgent matters,
                  please call us directly.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-blue-600 to-purple-600" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              🎯 Ready to Start?
            </Badge>
            <h2 className="text-3xl lg:text-6xl font-bold text-white leading-tight">
              Transform Your Future with Expert-Led Learning
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join our community of learners and start building the skills you need for your dream career. Get started
              today with our comprehensive courses and expert support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={handleStartLearning}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Learning Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Heart className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-white/80 text-sm">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-white/80 text-sm">Money Back Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">∞</div>
                <div className="text-white/80 text-sm">Lifetime Access</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-white/80 text-sm">Student Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
