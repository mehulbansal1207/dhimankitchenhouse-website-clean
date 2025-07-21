"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { db } from "@/app/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { toast } from "sonner"

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: ""
  })
  const [phoneError, setPhoneError] = useState("")

  // Handle mounting/unmounting
  useEffect(() => {
    let mountTimer: NodeJS.Timeout;
    
    if (isOpen) {
      // Verify Firebase connection
      if (!db) {
        console.error("Firebase not initialized");
        return;
      }
      console.log("Firebase connection verified");
      
      // Small delay before mounting to ensure smooth fade in
      mountTimer = setTimeout(() => {
        setMounted(true)
      }, 50)
    } else {
      const unmountTimer = setTimeout(() => {
        setMounted(false)
      }, 300)
      return () => {
        clearTimeout(mountTimer)
        clearTimeout(unmountTimer)
      }
    }
    
    return () => clearTimeout(mountTimer)
  }, [isOpen])

  // Only render if mounted or in the process of closing
  if (!mounted && !isOpen) return null

  const validatePhone = (phone: string) => {
    // Remove any non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    
    if (digitsOnly.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return false;
    }
    
    setPhoneError("");
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits
    const digitsOnly = value.replace(/\D/g, '');
    // Limit to 10 digits
    const truncated = digitsOnly.slice(0, 10);
    
    setFormData(prev => ({
      ...prev,
      phone: truncated
    }));

    // Validate phone number
    validatePhone(truncated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.phone || !formData.address) {
        throw new Error("Please fill in all required fields");
      }

      // Validate phone number before submission
      if (!validatePhone(formData.phone)) {
        throw new Error("Please enter a valid 10-digit phone number");
      }

      if (!db) {
        throw new Error("Database not initialized");
      }

      // Add the consultation request to Firestore
      const consultationsRef = collection(db, "consultations");
      const docRef = await addDoc(consultationsRef, {
        ...formData,
        status: "pending",
        createdAt: serverTimestamp()
      });

      console.log("Document written with ID:", docRef.id);
      
      toast.success("Thank you for your interest! We'll contact you soon.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: ""
      })
      setPhoneError("")
      onClose()
    } catch (error) {
      console.error("Error submitting consultation request:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "phone") {
      handlePhoneChange(e as React.ChangeEvent<HTMLInputElement>);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out ${
        mounted && isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop with transition */}
      <div 
        className={`absolute inset-0 bg-black transition-all duration-300 ease-in-out ${
          mounted && isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal Content with transition */}
      <div 
        className={`relative max-w-2xl w-full transition-all duration-300 ease-in-out transform ${
          mounted && isOpen
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-4 scale-95'
        }`}
      >
        <Card className="border-0 shadow-lg max-h-[90vh] flex flex-col">
          <CardHeader className="text-center relative flex-shrink-0">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 hover:bg-muted rounded-full transition-colors duration-200"
              disabled={isSubmitting}
            >
              <X className="h-5 w-5" />
            </button>
            <CardTitle className="text-3xl font-light">Schedule a Consultation</CardTitle>
            <p className="text-muted-foreground mt-2">
              Fill out the form below and our design experts will get back to you within 24 hours.
            </p>
          </CardHeader>
          <CardContent className="overflow-y-auto flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter your 10-digit phone number"
                    className={`w-full ${phoneError ? 'border-red-500' : ''}`}
                    maxLength={10}
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                  {phoneError && (
                    <p className="text-sm text-red-500 mt-1">{phoneError}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">
                    Address
                  </label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                    Additional Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your kitchen requirements"
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isSubmitting || !!phoneError}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 