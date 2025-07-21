"use client"

import { ArrowRight, Check, ChevronDown } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { ConsultationModal } from "./components/consultation-modal"

export default function ModularKitchenWebsite() {
  const [scrollY, setScrollY] = useState(0)
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const { setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY
      setScrollY(newScrollY)
      
      // Get the total scrollable height
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = (newScrollY / totalHeight) * 100
      
      // Transition to dark theme when scrollY is more than 300 and we're not near the bottom
      if (newScrollY > 300 && scrollPercentage < 85) {
        setTheme("dark")
      } else {
        setTheme("light")
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [setTheme])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-700">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Logo */}
              <button 
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                  // Wait for scroll to complete before refreshing
                  setTimeout(() => {
                    window.location.reload();
                  }, 500); // 500ms should be enough for the scroll animation
                }}
                className="focus:outline-none"
              >
                <Image
                  src="/Logo.png"
                  alt="Dhiman Kitchen House Logo"
                  width={200}
                  height={200}
                  className="w-48 h-48 object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
                  priority
                />
              </button>
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("design")}
                className="text-muted-foreground hover:text-foreground transition-colors duration-700 cursor-pointer"
              >
                Design
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-muted-foreground hover:text-foreground transition-colors duration-700 cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-muted-foreground hover:text-foreground transition-colors duration-700 cursor-pointer"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("customization")}
                className="text-muted-foreground hover:text-foreground transition-colors duration-700 cursor-pointer"
              >
                Customize
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-muted-foreground hover:text-foreground transition-colors duration-700 cursor-pointer"
              >
                Contact
              </button>
            </div>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-700"
              onClick={() => setIsConsultationModalOpen(true)}
            >
              Get Quote
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/95 relative overflow-hidden transition-colors duration-700">
        {/* Scrolling Kitchen Image */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            opacity: Math.max(0, 1 - scrollY / 400),
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`,
          }}
        >
          <Image
            src="/3d-rendering-white-minimal-kitchen-with-wood-decoration.jpg?height=800&width=1200"
            alt="Background Kitchen"
            width={1200}
            height={800}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/40 transition-colors duration-700"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-thin text-foreground tracking-tight transition-colors duration-700">
              Kitchen Perfection
              <br />
              <span className="font-light">Redefined</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light transition-colors duration-700">
              Modular. Intelligent. Beautiful. Experience the perfect blend of form and function with our revolutionary
              modular kitchen systems.
            </p>
            <div className="pt-8">
              <Image
                src="/modular-kitchen.webp?height=600&width=1000"
                alt="Premium Modular Kitchen"
                width={1000}
                height={600}
                className="mx-auto rounded-2xl shadow-2xl"
                priority
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg"
                onClick={() => scrollToSection("design")}
              >
                Explore Design <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                Watch Video
              </Button>
            </div>
          </div>
          <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
            onClick={() => scrollToSection("design")}
          >
            <ChevronDown className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section id="design" className="py-24 bg-background transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-thin text-foreground transition-colors duration-700">
                Designed for
                <br />
                <span className="font-light">Modern Living</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed transition-colors duration-700">
                Every element is meticulously crafted to create a seamless cooking experience. Our modular approach
                means your kitchen grows and adapts with your lifestyle, not the other way around.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-foreground transition-colors duration-700">Infinite customization possibilities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-foreground transition-colors duration-700">Premium materials and finishes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-foreground transition-colors duration-700">Smart storage solutions</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/download.jpeg?height=500&width=600"
                alt="Kitchen Design Process"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-muted/50 transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-foreground mb-4 transition-colors duration-700">
              Engineered to
              <br />
              <span className="font-light">Perfection</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto transition-colors duration-700">
              Every component is designed with precision and purpose, creating a kitchen that's both beautiful and
              functional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-background transition-colors duration-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-700">
                  <div className="w-8 h-8 bg-primary rounded transition-colors duration-700"></div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 transition-colors duration-700">Modular Design</h3>
                <p className="text-muted-foreground transition-colors duration-700">
                  Mix and match components to create your perfect kitchen layout. Every piece works in harmony.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-background transition-colors duration-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-700">
                  <div className="w-8 h-8 bg-primary rounded-full transition-colors duration-700"></div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 transition-colors duration-700">Smart Storage</h3>
                <p className="text-muted-foreground transition-colors duration-700">
                  Intelligent storage solutions that maximize space and keep everything organized and accessible.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-background transition-colors duration-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-700">
                  <div className="w-8 h-8 bg-primary rounded-sm transition-colors duration-700"></div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 transition-colors duration-700">Premium Materials</h3>
                <p className="text-muted-foreground transition-colors duration-700">
                  Only the finest materials make it into our kitchens. Built to last, designed to impress.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section id="testimonials" className="py-24 bg-background transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-foreground mb-4 transition-colors duration-700">
              Loved by
              <br />
              <span className="font-light">Thousands</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto transition-colors duration-700">
              See what our customers say about their modular kitchen transformation experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-muted/50 transition-colors duration-700">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full mr-1"></div>
                  ))}
                </div>
                <blockquote className="text-foreground mb-6 italic transition-colors duration-700">
                  I had the pleasure of working with this interior designer to revamp my living room, 
                  and I could not be happier with the results. Their creativity and attention to detail resulted in a stunning space that perfectly reflect my personal style.
                   They were also great at communicating throughout project, providing regular updates and listings and listening to my feedback.
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-muted rounded-full mr-4 transition-colors duration-700"></div>
                  <div>
                    <div className="font-semibold text-foreground transition-colors duration-700">Priyanka Kandari</div>
                    <div className="text-sm text-muted-foreground transition-colors duration-700">Homeowner</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-muted/50 transition-colors duration-700">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full mr-1"></div>
                  ))}
                </div>
                <blockquote className="text-foreground mb-6 italic transition-colors duration-700">
                  My experience with Dhiman Kitchen House was very good. High quality products are used overall in the project.
                   Feedbacks and concerns if any were solved immediately. The final outcome is great & absolutely loved the work. I would definitely recommend Dhiman Kitchen House to anyone. 
                   They are very professional and made the entire experience amazing.
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-muted rounded-full mr-4 transition-colors duration-700"></div>
                  <div>
                    <div className="font-semibold text-foreground transition-colors duration-700">Abhinav Saxena</div>
                    <div className="text-sm text-muted-foreground transition-colors duration-700">Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-muted/50 transition-colors duration-700">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full mr-1"></div>
                  ))}
                </div>
                <blockquote className="text-foreground mb-6 italic transition-colors duration-700">
                  Great Experience....
                  Dhiman kitchen did a very good job...
                  the technical framework was great prior to the final order... Price was reasonable...
                   they gave what they had committed...
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-muted rounded-full mr-4 transition-colors duration-700"></div>
                  <div>
                    <div className="font-semibold text-foreground transition-colors duration-700">Jitendar Sasan</div>
                    <div className="text-sm text-muted-foreground transition-colors duration-700">Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-8 text-muted-foreground transition-colors duration-700">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground transition-colors duration-700">500+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
              <div className="w-px h-12 bg-border transition-colors duration-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground transition-colors duration-700">4.3</div>
                <div className="text-sm">Average Rating</div>
              </div>
              <div className="w-px h-12 bg-border transition-colors duration-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground transition-colors duration-700">13+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section id="customization" className="py-24 bg-background transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin text-foreground mb-4 transition-colors duration-700">
              Make it
              <br />
              <span className="font-light">Uniquely Yours</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto transition-colors duration-700">
              Choose from hundreds of configurations, finishes, and accessories to create a kitchen that reflects your
              style.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* Test with regular img tag */}
              <img
                src="/Image.jpg"
                alt="Kitchen Customization Options"
                className="rounded-2xl shadow-xl w-[600px] h-[500px] object-cover"
              />

            </div>
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6 transition-colors duration-700">
                  <h3 className="text-xl font-semibold text-foreground mb-2 transition-colors duration-700">Colors & Finishes</h3>
                  <p className="text-muted-foreground transition-colors duration-700">
                    Choose from over 50 premium finishes and colors to match your aesthetic.
                  </p>
                </div>
                <div className="border-l-4 border-muted pl-6 transition-colors duration-700">
                  <h3 className="text-xl font-semibold text-foreground mb-2 transition-colors duration-700">Layout Options</h3>
                  <p className="text-muted-foreground transition-colors duration-700">L-shaped, U-shaped, island, or galley - we adapt to your space.</p>
                </div>
                <div className="border-l-4 border-muted pl-6 transition-colors duration-700">
                  <h3 className="text-xl font-semibold text-foreground mb-2 transition-colors duration-700">Smart Features</h3>
                  <p className="text-muted-foreground transition-colors duration-700">
                    Integrate smart appliances and lighting for the ultimate modern kitchen.
                  </p>
                </div>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-700" onClick={() => scrollToSection("contact")}>
                Start Customizing <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground transition-colors duration-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-thin mb-6 transition-colors duration-700">
            Ready to Transform
            <br />
            <span className="font-light">Your Kitchen?</span>
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto transition-colors duration-700">
            Schedule a consultation with our design experts and discover how modular design can revolutionize your
            cooking space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="px-8 py-4 text-lg transition-colors duration-700"
              onClick={() => setIsConsultationModalOpen(true)}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal 
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />

      {/* Footer */}
      <footer id="contact" className="bg-background py-16 border-t border-border transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="font-bold text-2xl text-foreground mb-4 transition-colors duration-700">Dhiman Kitchen House</div>
              <p className="text-muted-foreground mb-4 max-w-md transition-colors duration-700">
                Transforming homes with innovative modular kitchen solutions. Where design meets functionality.
              </p>
              <div className="text-sm text-muted-foreground transition-colors duration-700">© 2024 Dhiman Kitchen House. All rights reserved.</div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 transition-colors duration-700">Contact</h4>
              <div className="space-y-2 text-muted-foreground transition-colors duration-700">
                <p>9054035126</p>
                <p>dhimankitchenhouse@gmail.com</p>
                <p>
                Dhiman Kitchen House, Talwara Twp
                  <br />
                  Old Talwara, Punjab 144216
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 transition-colors duration-700">Services</h4>
              <div className="space-y-2 text-muted-foreground transition-colors duration-700">
                <p>Kitchen Design</p>
                <p>Installation</p>
                <p>Consultation</p>
                <p>Maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
