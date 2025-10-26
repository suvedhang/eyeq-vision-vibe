import { useState } from "react";
import RotatingText from "@/components/RotatingText";
import StarBorder from "@/components/StarBorder";
import TiltedCard from "@/components/TiltedCard";
import SpotlightCard from "@/components/SpotlightCard";
import ScrollReveal from "@/components/ScrollReveal";
import BannerModal from "@/components/BannerModal";
import MagicBento from "@/components/MagicBento";
import GlassIcons from "@/components/GlassIcons";
// import LightRays from "@/components/LightRays"; // REMOVED
import eyeqLogo from "@/assets/eyeq-logo.png";
import { Instagram, Linkedin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import TeamMember from "@/components/TeamMember";

interface ModalContent {
  title: string;
  description: string;
}

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({
    title: "",
    description: "",
  });

  const openModal = (title: string, description: string) => {
    setModalContent({ title, description });
    setModalOpen(true);
  };

  const features = [
    {
      title: "Anyone Can Teach One",
      description:
        "Every member is both a learner and a mentor. We grow together through curiosity, not hierarchy. At EyeQ, we believe everyone has something valuable to share, creating a collaborative learning environment where knowledge flows freely.",
    },
    {
      title: "No Skills Required",
      description:
        "Just the Spark to Start. We focus on helping every member build skills step by step. Whether you're a complete beginner or have some experience, EyeQ provides the support and resources you need to grow at your own pace.",
    },
    {
      title: "Curiosity Over Competition",
      description:
        "We start with 'what if?' instead of 'who's best?' Our sessions often start with fun prompts like, 'Can you make your laptop blink with Python?' This approach makes learning exciting and removes the pressure of competition.",
    },
    {
      title: "24/7 Energy Loop",
      description:
        "Some clubs stop after events. We don't. Our energy runs 24/7, from chat memes to late-night debugging sessions. The EyeQ community is always active, always learning, and always supporting each other.",
    },
  ];

  const teamMembers = [
    {
      name: "Aswath S",
      role: "President",
      quote:
        "My vision is to shape this club into a creative space where innovation meets collaboration... where every member learns, grows, and contributes to the ever-evolving world of AI and technology.",
      imageUrl: "/team/President.JPG",
      linkedinUrl: "https://www.linkedin.com/in/aswath-s-a37475336/",
    },
    {
      name: "Sasvanthu G",
      role: "Vice President",
      quote:
        "Leading with passion and purpose, I strive to create an environment where every idea is valued and every member feels empowered to push boundaries.",
      imageUrl: "/team/Vice President.jpg",
      linkedinUrl: "http://www.linkedin.com/in/sasvanthu-g",
    },
    {
      name: "Harsh Limkar N",
      role: "Secretary",
      quote:
        "Organization meets inspiration. My goal is to ensure our community runs smoothly while fostering meaningful connections and collaborative learning.",
      imageUrl: "/team/Secretary.jpg",
      linkedinUrl: "https://www.linkedin.com/in/harsh-limkar/",
    },
    {
      name: "Suvedhan G",
      role: "Treasurer",
      quote:
        "Managing resources wisely to fuel innovation. Every project deserves the support it needs to transform ideas into reality.",
      imageUrl: "/team/Treasurer.jpg",
      linkedinUrl: "https://www.linkedin.com/in/suvedhan-g-284290389/",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Light Rays Background REMOVED */}

      {/* Background Image (Kept as before) */}
      <div
        className="fixed inset-0 z-0 opacity-5 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: 'url(/bg-logo.png)' }}
      />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4 z-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              EyeQ
            </motion.h1>
            <RotatingText
              texts={["See", "Code", "Create"]}
              mainClassName="px-3 sm:px-4 md:px-6 bg-primary text-primary-foreground overflow-hidden py-2 sm:py-2 md:py-3 justify-center rounded-lg text-5xl md:text-7xl font-bold"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1 md:pb-2"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={1500}
            />
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mt-6 animate-fade-in">
            Riding the Vibe Wave in Computer Vision!
          </p>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section id="about" className="relative py-32 px-4 z-10 overflow-hidden">
        {/* Background Texture - Reduced opacity */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/2 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <ScrollReveal>
            <div className="text-center">
              {/* Logo */}
              <div className="flex justify-center mb-12">
                <div className="relative">
                  <img
                    src={eyeqLogo}
                    alt="EyeQ Club Logo"
                    className="w-80 h-80 object-contain hover:scale-105 transition-all duration-500 mx-auto"
                  />
                  {/* Reduced glowing effect */}
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="max-w-4xl mx-auto">
                {/* Heading with Gradient Underline */}
                <div className="mb-8">
                  <h2 className="text-5xl md:text-6xl font-bold mb-4 text-primary leading-tight">
                    Empowering Visionaries in Computer Vision
                  </h2>
                  <div className="h-1 w-32 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto"></div>
                </div>
                
                {/* Mission Statement */}
                <p className="text-xl text-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
                  EyeQ bridges the gap between learning and innovation through{" "}
                  <span className="text-primary font-semibold">real-world projects</span>,{" "}
                  <span className="text-primary font-semibold">mentorship</span>, and{" "}
                  <span className="text-primary font-semibold">community</span>.
                </p>
                
                {/* Animated Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">50</div>
                    <div className="text-sm text-muted-foreground">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">100</div>
                    <div className="text-sm text-muted-foreground">Real-World Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">10</div>
                    <div className="text-sm text-muted-foreground">Expert Mentors</div>
                  </div>
                </div>
                
                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                    onClick={() => openModal("Join EyeQ", "Ready to start your journey in Computer Vision? Join our community of innovators and learners!")}
                  >
                    Join Now
                  </button>
                  <button 
                    className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
                    onClick={() => openModal("Our Projects", "Explore the amazing projects our members have built using Computer Vision technologies!")}
                  >
                    See Our Projects
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What Makes EyeQ Different */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-primary">
              What Makes EyeQ Different?
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <MagicBento
                  textAutoHide={true}
                  enableStars={true}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  spotlightRadius={300}
                  particleCount={12}
                  glowColor="132, 0, 255"
                  className="bg-card border border-border hover:border-primary/50 hover:shadow-primary/20 hover:shadow-2xl transition-all duration-300"
                >
                  <StarBorder
                    as="button"
                    className="w-full p-8 text-left hover:scale-105 transition-transform duration-300 cursor-pointer bg-transparent"
                    color="cyan"
                    speed="5s"
                    onClick={() => openModal(feature.title, feature.description)}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-foreground">
                      {feature.description.substring(0, 120)}...
                    </p>
                    <p className="text-primary text-sm mt-4">Click to read more →</p>
                  </StarBorder>
                </MagicBento>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Student Benefits */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-primary">
              Student Benefits
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Start from Zero, Grow Together",
                  description: "Safe, beginner-friendly peer learning environment",
                },
                {
                  title: "Vibe Coding Sessions",
                  description: "Chill, fun coding with a community focus",
                },
                {
                  title: "Idea to Innovations",
                  description: "Guiding curiosity into real projects",
                },
                {
                  title: "Mini-Projects & Hackathons",
                  description: "Quick skill-building through small challenges",
                },
                {
                  title: "Building Portfolio",
                  description: "Create projects that showcase your skills",
                },
                {
                  title: "24/7 Community Support",
                  description: "Always-on support from mentors and peers",
                },
              ].map((benefit, index) => (
                <div key={index} className="flex justify-center">
                  <MagicBento
                    textAutoHide={true}
                    enableStars={true}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    enableMagnetism={true}
                    clickEffect={true}
                    spotlightRadius={300}
                    particleCount={12}
                    glowColor="132, 0, 255"
                    className="w-[300px] h-[200px] bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-primary/20 hover:shadow-2xl"
                  >
                    <div className="w-full h-full flex flex-col justify-center items-center text-center p-6">
                      <h3 className="text-lg font-bold mb-3 text-primary leading-tight">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </MagicBento>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Meet the Core Team */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-primary">
              Meet the Core Team
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <TeamMember
                  name={member.name}
                  role={member.role}
                  imageUrl={member.imageUrl}
                  linkedinUrl={member.linkedinUrl}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Quotes */}
      <section className="relative py-20 px-4 z-10 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-card border border-border rounded-lg shadow-lg p-8 hover:border-primary/50 hover:shadow-primary/20 hover:shadow-2xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {member.name}
                      </h3>
                      <p className="text-muted-foreground text-sm font-medium mb-4">
                        {member.role}
                      </p>
                      
                      {/* Member Quote */}
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        "{member.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative py-12 px-4 border-t border-border z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Column 1: Logo & Slogan */}
            <div className="flex flex-col items-center md:items-start">
              <img
                src={eyeqLogo}
                alt="EyeQ Club Logo"
                className="w-24 h-24 object-contain mb-4"
              />
              <p className="text-primary font-bold text-lg">See. Code. Create.</p>
            </div>

            {/* Column 2: Address */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">Address</h3>
              <p className="text-muted-foreground leading-relaxed">
                Saveetha Institute of Medical and Technical Sciences
                <br />
                Saveetha Nagar, Thandalam
                <br />
                Chennai - 602 105
              </p>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">Get in Touch</h3>
              <div className="space-y-2 text-muted-foreground mb-6">
                <p className="font-semibold text-foreground">Aswath S</p>
                <p>+91 70949 25601</p>
                <p>eyeq.simats@gmail.com</p>
              </div>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/eyeqclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={28} />
                </a>
                <a
                  href="https://linkedin.com/company/eyeqclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={28} />
                </a>
                <a
                  href="https://wa.me/917094925601"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                  aria-label="WhatsApp"
                >
                  <Phone size={28} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>© 2025 EyeQ Club. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <BannerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
      />
    </div>
  );
};

export default Index;