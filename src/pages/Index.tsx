import { useState, useEffect } from "react";
import { Link, Element } from "react-scroll";
import RotatingText from "@/components/RotatingText";
import StarBorder from "@/components/StarBorder";
import ScrollReveal from "@/components/ScrollReveal";
import BannerModal from "@/components/BannerModal";
import MagicBento from "@/components/MagicBento";
// import LightRays from "@/components/LightRays"; // REMOVED
import eyeqLogo from "@/assets/eyeq-logo.png"; // Fixed path
import { Instagram, Linkedin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion, Variants } from "framer-motion";
import TeamMember from "@/components/TeamMember";
import { AnimatedSection } from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Fixed path
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Fixed path

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
  const [showContent, setShowContent] = useState(false);

  // Trigger content animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100); // Small delay to ensure smooth transition
    
    return () => clearTimeout(timer);
  }, []);

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // This creates the stagger effect
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    },
  };

  return (
    <>
      {/* This is your main content wrapper */}
      <motion.div 
        className="min-h-screen bg-transparent text-foreground overflow-x-hidden relative" // <-- bg-background removed, relative added
        style={{ zIndex: 1 }} // <-- ADDED to ensure content is on top
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Navigation Bar */}
        <Navbar />
        
        {/* Old Background Image - REMOVED
        <div
          className="fixed inset-0 z-0 opacity-5 bg-center bg-no-repeat bg-cover parallax"
          style={{ backgroundImage: 'url(/bg-logo.png)' }}
        />
        */}

        {/* Hero Section */}
        <Element name="home">
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4 z-10">
          <div className="text-center">
            <ScrollReveal animation="fade" delay={100} duration={900}>
              <div className="flex items-center justify-center gap-4 mb-8">
                <h1 className="text-6xl md:text-8xl font-bold text-foreground">
                  EyeQ
                </h1>
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
            </ScrollReveal>
            <ScrollReveal animation="slide-up" delay={300} duration={900}>
              <p className="text-xl md:text-2xl text-muted-foreground mt-6">
                Riding the Vibe Wave in Computer Vision!
              </p>
            </ScrollReveal>
            <ScrollReveal animation="slide-up" delay={500} duration={800}>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="about" smooth={true} duration={500} className="hover-lift cursor-pointer">
                  <motion.button 
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </Link>
                <Link to="features" smooth={true} duration={500} className="hover-lift cursor-pointer">
                  <motion.button 
                    className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore
                  </motion.button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
        </Element>

        {/* Our Purpose Section */}
        <Element name="about">
        <section id="about" className="relative py-32 px-4 z-10 overflow-hidden">
          {/* Background Texture - Reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/2 to-transparent parallax"></div>
          
          <div className="max-w-7xl mx-auto relative">
            <ScrollReveal animation="fade" duration={800}>
              <div className="text-center">
                {/* Logo */}
                <div className="flex justify-center mb-12">
                  <div className="relative">
                    <ScrollReveal animation="scale" duration={1000} delay={200}>
                      <img
                        src={eyeqLogo}
                        alt="EyeQ Club Logo"
                        className="w-80 h-80 object-contain hover:scale-105 transition-all duration-500 mx-auto hover-lift"
                      />
                    </ScrollReveal>
                    {/* Reduced glowing effect */}
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="max-w-4xl mx-auto">
                  {/* Heading with Gradient Underline */}
                  <div className="mb-8">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 text-primary leading-tight">
                      Empowering Visionaries in Computer Vision
                    </h1>
                    <ScrollReveal animation="scale" delay={800} duration={600}>
                      <div className="h-1 w-32 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto"></div>
                    </ScrollReveal>
                  </div>
                  
                  {/* Mission Statement */}
                  <ScrollReveal animation="slide-up" delay={300} duration={900}>
                    <p className="text-xl text-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
                      EyeQ bridges the gap between learning and innovation through{" "}
                      <span className="text-primary font-semibold">real-world projects</span>,{" "}
                      <span className="text-primary font-semibold">mentorship</span>, and{" "}
                      <span className="text-primary font-semibold">community</span>.
                    </p>
                  </ScrollReveal>
                  
                  {/* Animated Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
                    <AnimatedSection delay={100}>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">
                          <CountUp
                            from={0}
                            to={50}
                            separator=","
                            direction="up"
                            duration={2}
                            suffix="+"
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">Active Members</div>
                      </div>
                    </AnimatedSection>
                    <AnimatedSection delay={300}>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">
                          <CountUp
                            from={0}
                            to={100}
                            separator=","
                            direction="up"
                            duration={2}
                            suffix="+"
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">Real-World Projects</div>
                      </div>
                    </AnimatedSection>
                    <AnimatedSection delay={500}>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">
                          <CountUp
                            from={0}
                            to={10}
                            separator=","
                            direction="up"
                            duration={2}
                            suffix="+"
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">Expert Mentors</div>
                      </div>
                    </AnimatedSection>
                  </div>
                  
                  {/* Call to Action */}
                  <ScrollReveal animation="slide-up" delay={500} duration={900}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a 
                        href="https://chat.whatsapp.com/GxFFprWNX4d8mOQJOTz7d1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 inline-block text-center"
                      >
                        Join Now
                      </a>
                      <a 
                        href="https://docs.google.com/spreadsheets/d/1EVvQ9yxCOn4SqQX_twvwdRS9951wn6fNcUI7PZdMxYQ/edit?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 inline-block text-center"
                      >
                        See Our Projects
                      </a>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
        </Element>

        {/* What Makes EyeQ Different */}
        <Element name="features">
        <section className="relative py-20 px-4 z-10">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal animation="fade" duration={800}>
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-primary">
                What Makes EyeQ Different?
              </h2>
            </ScrollReveal>

            <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <ScrollReveal key={index} animation="slide-up" delay={index * 100} duration={700}>
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-2xl font-bold text-left py-6 hover:no-underline">
                      <span className="text-primary">{feature.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground pb-6">
                      {feature.description}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </div>
        </section>
        </Element>

        {/* Student Benefits */}
        <section className="relative py-20 px-4 z-10">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-primary">
                Student Benefits
              </h2>
            </ScrollReveal>

            <Carousel
              opts={{
                slidesToScroll: 1,
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
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
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <ScrollReveal animation="scale" delay={index * 50} duration={600}>
                      <div className="p-1">
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
                          className="w-full h-[200px] bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-primary/20 hover:shadow-2xl"
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
                    </ScrollReveal>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>

        {/* Meet the Core Team */}
        <section className="relative py-20 px-4 z-10">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal animation="fade" duration={800}>
              <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-primary">
                Meet the Core Team
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <ScrollReveal key={index} delay={index * 100} animation="slide-up" duration={800}>
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
            <motion.div 
              className="grid grid-cols-1 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {teamMembers.map((member, index) => (
                <ScrollReveal key={index} animation="slide-up" delay={index * 150} duration={700}>
                  <motion.div variants={itemVariants} className="bg-card border border-border rounded-lg shadow-lg p-8 hover:border-primary/50 hover:shadow-primary/20 hover:shadow-2xl transition-all duration-300">
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
                  </motion.div>
                </ScrollReveal>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Element name="contact">
        <footer id="contact" className="relative py-12 px-4 border-t border-border z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Column 1: Logo & Slogan */}
              <ScrollReveal animation="fade" duration={800}>
                <div className="flex flex-col items-center md:items-start">
                  <img
                    src={eyeqLogo}
                    alt="EyeQ Club Logo"
                    className="w-24 h-24 object-contain mb-4"
                  />
                  <p className="text-primary font-bold text-lg">See. Code. Create.</p>
                </div>
              </ScrollReveal>

              {/* Column 2: Address */}
              <ScrollReveal animation="slide-up" duration={800} delay={200}>
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
              </ScrollReveal>

              {/* Column 3: Contact */}
              <ScrollReveal animation="slide-up" duration={800} delay={400}>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">Get in Touch</h3>
                  <div className="space-y-2 text-muted-foreground mb-6">
                    <p className="font-semibold text-foreground">Aswath S</p>
                    <p>+91 70949 25601</p>
                    <p>eyeq.simats@gmail.com</p>
                  </div>
                  <div className="flex gap-4">
                    <motion.a
                      href="https://www.instagram.com/eyeq.simats/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      whileHover={{ scale: 1.1, y: -3, color: "hsl(var(--primary))" }}
                      className="text-muted-foreground"
                    >
                      <Instagram size={28} />
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/company/eyeq-simats/eyeqclub"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      whileHover={{ scale: 1.1, y: -3, color: "hsl(var(--primary))" }}
                      className="text-muted-foreground"
                    >
                      <Linkedin size={28} />
                    </motion.a>
                    <motion.a
                      href="https://wa.me/917094925601"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      whileHover={{ scale: 1.1, y: -3, color: "hsl(var(--primary))" }}
                      className="text-muted-foreground"
                    >
                      <Phone size={28} />
                    </motion.a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal animation="fade" duration={800} delay={600}>
              <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
                <p>© 2025 EyeQ Club. All rights reserved.</p>
                <p className="mt-2 text-sm">Web developed by <a href="https://www.linkedin.com/in/gnana-priyan-g-b4a088389/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Gnana Priyan G</a></p>
              </div>
            </ScrollReveal>
          </div>
        </footer>
        </Element>

        <BannerModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={modalContent.title}
          description={modalContent.description}
        />
      </motion.div>
    </>
  );
};

export default Index;