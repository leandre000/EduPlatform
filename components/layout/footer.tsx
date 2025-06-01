import Link from "next/link"
import { BookOpen, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
    ],
    courses: [
      { name: "Web Development", href: "/courses/web-development" },
      { name: "Data Science", href: "/courses/data-science" },
      { name: "Mobile Development", href: "/courses/mobile" },
      { name: "UI/UX Design", href: "/courses/design" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-teal-400">Learn</span>
            </Link>
            <p className="text-gray-400 max-w-sm">
              Empowering learners worldwide with high-quality online education and expert-led courses.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-teal-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Courses</h3>
            <ul className="space-y-2">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-teal-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-teal-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Learn Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
