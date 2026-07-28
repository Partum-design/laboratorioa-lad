# Graph Report - /home/bryanpartum/Documentos/GitHub/laboratorioa-lad  (2026-07-20)

## Corpus Check
- Large corpus: 77 files · ~1,785,727 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 472 nodes · 661 edges · 45 communities (40 shown, 5 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- TypeScript Configuration
- Legacy LAD Design
- About Page and Icons
- Runtime Dependencies
- Layout and Footer
- Clinical Data Pages
- Development Tooling
- Vacancies Page
- Diagnostic Website Mockup
- Contact and WhatsApp
- Trust and Quality
- Clinical Website Concept
- Homepage Content
- Laboratory Quality Messaging
- Service Value Messaging
- Diagnostic Trust Banner
- Future Diagnostics
- Quality Promotional Banner
- Futuristic Lab Website
- Human-Centered Diagnostics
- Clinical Lab Advertisement
- Clinical Lab Advertisement Copy
- Medical Website Inspiration
- Biotech Consultancy Inspiration
- Navigation Components
- Automated Laboratory Image
- Automated Laboratory Copy
- Laboratory Research Image
- Healthcare Landing Inspiration
- Biotech Landing Inspiration
- Patient Testimonials
- Modern Laboratory Interior
- Laboratory Team Visual
- Sterile Lab Infrastructure
- Construction Preview
- LAD Brand Mark
- Model Configuration
- LAD Logo Asset
- Brand Design References
- Next.js Configuration
- PostCSS Configuration
- German Laboratory Equipment
- Tailwind Configuration
- Not Found Concept

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `iconColorAt()` - 11 edges
3. `LAD Diagnostic Laboratory Service Banner` - 11 edges
4. `LAD Diagnostic Laboratory Promotional Banner` - 10 edges
5. `LAD Diagnostic Laboratory Homepage Concept` - 10 edges
6. `LAD Diagnostic Laboratory Promotional Banner` - 10 edges
7. `LAD Clinical Laboratory Advertisement` - 9 edges
8. `LAD Diagnostic Laboratory Promotional Banner` - 9 edges
9. `LAD Clinical Laboratory Advertisement` - 9 edges
10. `LAD Clinical Diagnostics` - 9 edges

## Surprising Connections (you probably didn't know these)
- `LAD Design System` --conceptually_related_to--> `LAD Registered Logo`  [INFERRED]
  LAD CODIGOS A ACOMODAR.txt → doc/LAD-1.pdf
- `LAD Design System` --conceptually_related_to--> `LAD Registered Logo`  [INFERRED]
  LAD CODIGOS A ACOMODAR.txt → doc/LAD.pdf
- `LAD Registered Logo` --semantically_similar_to--> `LAD Registered Logo`  [INFERRED] [semantically similar]
  doc/LAD-1.pdf → doc/LAD.pdf
- `NosotrosPage()` --calls--> `iconColorAt()`  [EXTRACTED]
  src/app/nosotros/page.tsx → src/lib/icon-palette.ts
- `HomePage()` --calls--> `iconColorAt()`  [EXTRACTED]
  src/app/page.tsx → src/lib/icon-palette.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Shared LAD Page Motion Pattern** — lad_codigos_a_acomodar_homepage, lad_codigos_a_acomodar_estudiospage, lad_codigos_a_acomodar_nosotrospage, lad_codigos_a_acomodar_contactopage, lad_codigos_a_acomodar_uneteepage, lad_codigos_a_acomodar_pagetransition, lad_codigos_a_acomodar_scrollreveal [EXTRACTED 1.00]
- **LAD Patient Service Flow** — lad_codigos_a_acomodar_homepage, lad_codigos_a_acomodar_estudiospage, lad_codigos_a_acomodar_contactopage, lad_codigos_a_acomodar_catalogo_de_estudios, lad_codigos_a_acomodar_solicitud_de_cita [INFERRED 0.85]
- **Pillars of Trustworthy Diagnostic Service** — img_chatgpt_image_2_jun_2026_12_10_37_p_m_1_tecnologia_de_alta_gama, img_chatgpt_image_2_jun_2026_12_10_37_p_m_1_profesionales_especializados, img_chatgpt_image_2_jun_2026_12_10_37_p_m_1_confidencialidad_y_seguridad, img_chatgpt_image_2_jun_2026_12_10_37_p_m_1_calidad_certificada, img_chatgpt_image_2_jun_2026_12_10_37_p_m_1_diagnosticos_confiables [INFERRED 0.85]
- **Trustworthy Diagnostic Service Foundations** — img_chatgpt_image_2_jun_2026_12_10_37_p_m_advanced_technology, img_chatgpt_image_2_jun_2026_12_10_37_p_m_specialized_professionals, img_chatgpt_image_2_jun_2026_12_10_37_p_m_confidentiality_security, img_chatgpt_image_2_jun_2026_12_10_37_p_m_iso_9001_2015 [INFERRED 0.85]
- **Automated Laboratory Workflow** — img_ai_generated_6a1c47083bfcf_robotic_laboratory_arms, img_ai_generated_6a1c47083bfcf_automated_liquid_handling, img_ai_generated_6a1c47083bfcf_laboratory_scientists, img_ai_generated_6a1c47083bfcf_digital_experiment_monitoring, img_ai_generated_6a1c47083bfcf_laboratory_glassware [INFERRED 0.85]
- **Modern Diagnostic Laboratory Workspace** — img_ai_generated_6a1c4771ba72a_automated_analyzer, img_ai_generated_6a1c4771ba72a_fume_extraction, img_ai_generated_6a1c4771ba72a_controlled_environment, img_ai_generated_6a1c4771ba72a_safety_infrastructure [INFERRED 0.85]
- **Clinical Laboratory Workflow** — img_ai_generated_6a1dc1076908f_laboratory_technicians, img_ai_generated_6a1dc1076908f_analytical_instruments, img_ai_generated_6a1dc1076908f_microscope, img_ai_generated_6a1dc1076908f_chemistry_glassware [EXTRACTED 1.00]
- **Trustworthy Diagnostic Service Foundations** — img_image_1_advanced_technology, img_image_1_specialized_professionals, img_image_1_confidentiality_security, img_image_1_iso_9001_2015 [INFERRED 0.85]
- **Pillars of Trustworthy Clinical Laboratory Service** — img_image_tecnologia_de_vanguardia, img_image_calidad_certificada, img_image_atencion_personalizada, img_image_precision_confianza_y_cuidado, img_image_salud_como_prioridad [INFERRED 0.95]
- **Patient Access and Care Flow** — inspiracion_1a4c824e3e6de2584c020b17e66483e1_login_and_signup, inspiracion_1a4c824e3e6de2584c020b17e66483e1_make_appointment, inspiracion_1a4c824e3e6de2584c020b17e66483e1_professional_doctor_connection, inspiracion_1a4c824e3e6de2584c020b17e66483e1_specialist_doctor_network [INFERRED 0.85]
- **Biotechnology Venture Ecosystem** — inspiracion_7723e2985b67e3d0a70a10e71bd8a07b_world_class_biotech_consultants, inspiracion_7723e2985b67e3d0a70a10e71bd8a07b_biotech_leaders, inspiracion_7723e2985b67e3d0a70a10e71bd8a07b_bioentrepreneur_network, inspiracion_7723e2985b67e3d0a70a10e71bd8a07b_scientist_advisor_collective, inspiracion_7723e2985b67e3d0a70a10e71bd8a07b_partner_organizations [INFERRED 0.85]
- **Diagnostic Quality Pillars** — inspiracion_gemini_generated_image_ozc7nlozc7nlozc7_cutting_edge_technology, inspiracion_gemini_generated_image_ozc7nlozc7nlozc7_certified_experts, inspiracion_gemini_generated_image_ozc7nlozc7nlozc7_total_confidentiality, inspiracion_gemini_generated_image_ozc7nlozc7nlozc7_iso_9001_2015_quality [EXTRACTED 1.00]
- **Clinical Service Offerings** — inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_clinical_services_catalog, inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_general_checkups, inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_specialized_tests, inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_preventive_analysis [EXTRACTED 1.00]
- **Digital Patient Journey** — inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_appointment_booking, inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_clinical_services_catalog, inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_online_patient_results, inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_security_and_confidentiality [INFERRED 0.85]
- **LAD Logo Composition** — logo_logo_lad_lad_wordmark, logo_logo_lad_registered_trademark_symbol, logo_logo_lad_red_rounded_square, logo_logo_lad_molecular_dot_motif [EXTRACTED 1.00]
- **Laboratory Trust Pillars** — public_img_chatgpt_image_2_jun_2026_12_10_37_p_m_1_high_end_technology, public_img_chatgpt_image_2_jun_2026_12_10_37_p_m_1_specialized_professionals, public_img_chatgpt_image_2_jun_2026_12_10_37_p_m_1_confidentiality_and_security, public_img_chatgpt_image_2_jun_2026_12_10_37_p_m_1_iso_9001_2015_quality [EXTRACTED 1.00]
- **Pillars of Trustworthy Diagnostic Service** — public_img_chatgpt_image_2_jun_2026_12_10_37_p_m_tecnologia_de_alta_gama, public_img_chatgpt_image_2_jun_2026_12_10_37_p_m_profesionales_especializados, public_img_chatgpt_image_2_jun_2026_12_10_37_p_m_confidencialidad_y_seguridad, public_img_chatgpt_image_2_jun_2026_12_10_37_p_m_calidad_certificada, public_img_chatgpt_image_2_jun_2026_12_10_37_p_m_diagnosticos_confiables [INFERRED 0.85]
- **Automated Laboratory Workflow** — public_img_ai_generated_6a1c47083bfcf_robotic_laboratory_arms, public_img_ai_generated_6a1c47083bfcf_automated_liquid_handling, public_img_ai_generated_6a1c47083bfcf_laboratory_scientists, public_img_ai_generated_6a1c47083bfcf_digital_experiment_monitoring, public_img_ai_generated_6a1c47083bfcf_laboratory_glassware [INFERRED 0.85]
- **Controlled Laboratory Infrastructure** — public_img_ai_generated_6a1c4771ba72a_analytical_instruments, public_img_ai_generated_6a1c4771ba72a_fume_extraction_system, public_img_ai_generated_6a1c4771ba72a_enclosed_safety_workstation, public_img_ai_generated_6a1c4771ba72a_sterile_laboratory_environment [INFERRED 0.85]
- **Scientific Analysis Workflow** — public_img_ai_generated_6a1dc1076908f_laboratory_scientists, public_img_ai_generated_6a1dc1076908f_microscopy, public_img_ai_generated_6a1dc1076908f_instrumental_analysis, public_img_ai_generated_6a1dc1076908f_chemical_samples, public_img_ai_generated_6a1dc1076908f_laboratory_glassware [INFERRED 0.85]
- **Pillars of Trustworthy Diagnostic Service** — public_img_image_1_atencion_rapida_y_eficiente, public_img_image_1_tecnologia_de_alta_gama, public_img_image_1_profesionales_especializados, public_img_image_1_confidencialidad_y_seguridad, public_img_image_1_compromiso_con_la_calidad, public_img_image_1_diagnosticos_confiables [INFERRED 0.95]
- **Pillars of Trustworthy Clinical Laboratory Service** — public_img_image_tecnologia_de_vanguardia, public_img_image_calidad_certificada, public_img_image_atencion_personalizada, public_img_image_precision_confianza_y_cuidado, public_img_image_salud_como_prioridad [INFERRED 0.95]
- **Digital Patient Access Model** — public_inspiracion_1a4c824e3e6de2584c020b17e66483e1_appointment_booking, public_inspiracion_1a4c824e3e6de2584c020b17e66483e1_emergency_service, public_inspiracion_1a4c824e3e6de2584c020b17e66483e1_specialist_doctor_network, public_inspiracion_1a4c824e3e6de2584c020b17e66483e1_doctor_connection [INFERRED 0.85]
- **Biotech Innovation Ecosystem** — public_inspiracion_7723e2985b67e3d0a70a10e71bd8a07b_global_bioentrepreneur_network, public_inspiracion_7723e2985b67e3d0a70a10e71bd8a07b_advisor_network, public_inspiracion_7723e2985b67e3d0a70a10e71bd8a07b_partner_organizations [INFERRED 0.85]
- **LAD Diagnostic Service Portfolio** — public_inspiracion_gemini_generated_image_ozc7nlozc7nlozc7_general_checkups, public_inspiracion_gemini_generated_image_ozc7nlozc7nlozc7_specialized_tests, public_inspiracion_gemini_generated_image_ozc7nlozc7nlozc7_preventive_analysis [EXTRACTED 1.00]
- **Clinical Diagnostic Trust Foundations** — public_inspiracion_gemini_generated_image_ozc7nlozc7nlozc7_latest_generation_equipment, public_inspiracion_gemini_generated_image_ozc7nlozc7nlozc7_certified_experts, public_inspiracion_gemini_generated_image_ozc7nlozc7nlozc7_data_confidentiality, public_inspiracion_gemini_generated_image_ozc7nlozc7nlozc7_iso_9001_2015 [INFERRED 0.85]
- **LAD Clinical Analysis Service Portfolio** — public_inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_general_checkups, public_inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_specialized_tests, public_inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_preventive_analysis [EXTRACTED 1.00]
- **LAD Diagnostic Differentiators** — public_inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_german_technology, public_inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_certified_experts, public_inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_security_confidentiality, public_inspiracion_gemini_generated_image_tr1lsttr1lsttr1l_iso_9001_2015 [EXTRACTED 1.00]

## Communities (45 total, 5 thin omitted)

### Community 0 - "TypeScript Configuration"
Cohesion: 0.07
Nodes (27): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, ./src/*, **/*.ts (+19 more)

### Community 1 - "Legacy LAD Design"
Cohesion: 0.11
Nodes (24): Animation Controls Start, Catálogo de estudios clínicos, ContactoPage, Diagnóstico clínico, Equipo clínico, EstudiosPage, Footer, Contacto Handle Change (+16 more)

### Community 2 - "About Page and Icons"
Cohesion: 0.14
Nodes (16): PORTAL_ICONS, areas, hitos, valores, IconAward(), IconCertificate(), IconCulture(), IconEye() (+8 more)

### Community 3 - "Runtime Dependencies"
Cohesion: 0.09
Nodes (22): framer-motion, gsap, next, dependencies, framer-motion, gsap, next, react (+14 more)

### Community 4 - "Layout and Footer"
Cohesion: 0.10
Nodes (11): metadata, EdenMark(), EdenMarkProps, EdenWordmarkProps, links, IconFacebook(), IconGrid(), IconMapPin() (+3 more)

### Community 5 - "Clinical Data Pages"
Cohesion: 0.14
Nodes (18): ContactoBody(), categoriasOrden, estudios, categorias, EstudiosPage(), INDICACION_LABEL, whatsappLinkFor(), NosotrosPage() (+10 more)

### Community 6 - "Development Tooling"
Cohesion: 0.11
Nodes (19): autoprefixer, eslint, eslint-config-next, devDependencies, autoprefixer, eslint, eslint-config-next, postcss (+11 more)

### Community 7 - "Vacancies Page"
Cohesion: 0.15
Nodes (12): beneficios, posiciones, IconChevronDown(), IconGraduation(), IconHeartPulse(), IconPaperclip(), IconSmile(), IconTrendUp() (+4 more)

### Community 8 - "Diagnostic Website Mockup"
Cohesion: 0.14
Nodes (14): Online Appointment Scheduling, Certified Laboratory Experts, General Checkups, High-End German Laboratory Technology, ISO 9001:2015 Certified Quality, LAD — Laboratorio de Apoyo y Diagnóstico, LAD Clinical Laboratory Website Mockup, Fast and Secure Online Results (+6 more)

### Community 9 - "Contact and WhatsApp"
Cohesion: 0.16
Nodes (9): horarios, IconCatalog(), IconCheckCircle(), IconClipboard(), IconClock(), IconPhone(), IconSend(), IconWhatsApp() (+1 more)

### Community 10 - "Trust and Quality"
Cohesion: 0.22
Nodes (13): High-End Laboratory Technology, Confidentiality and Information Security, Continuous Improvement Beyond Expectations, Human, Close, and Wellbeing-Focused Service, ISO 9001:2015 Quality Management System, LAD — Laboratorio de Apoyo y Diagnóstico, Patient Certainty and Trust, LAD Diagnostic Laboratory Promotional Banner (+5 more)

### Community 11 - "Clinical Website Concept"
Cohesion: 0.15
Nodes (13): Advanced Clinical Laboratory, Appointment Booking, Clinical Services Catalog, General Check-ups, ISO 9001:2015 Certified Quality, Laboratory Mission, Laboratory Professional, LAD Full Website Concept (+5 more)

### Community 12 - "Homepage Content"
Cohesion: 0.17
Nodes (11): heroTitles, heroVideos, rutasRapidas, servicios, stats, valores, IconCheck(), IconPackage() (+3 more)

### Community 13 - "Laboratory Quality Messaging"
Cohesion: 0.18
Nodes (12): Automated Clinical Analyzer, Certainty and Trust, Confidentiality and Security, Continuous Improvement, Diagnósticos confiables y resultados que importan, High-end Technology, Human, Close, and Committed Service, ISO 9001:2015 Certified Quality (+4 more)

### Community 14 - "Service Value Messaging"
Cohesion: 0.27
Nodes (12): Atención rápida y eficiente, Certeza y confianza, Compromiso con la calidad, Confidencialidad y seguridad, LAD Diagnostic Laboratory Service Banner, Diagnósticos confiables y resultados que importan, ISO 9001:2015 Quality Management System, LAD Laboratorio de Apoyo y Diagnóstico (+4 more)

### Community 15 - "Diagnostic Trust Banner"
Cohesion: 0.29
Nodes (11): Calidad certificada, Certeza y confianza, Confidencialidad y seguridad, Diagnósticos confiables y resultados que importan, ISO 9001:2015 Quality Management System, LAD Laboratorio de Apoyo y Diagnóstico, Mejora continua, Profesionales especializados (+3 more)

### Community 16 - "Future Diagnostics"
Cohesion: 0.20
Nodes (11): Appointment Booking, Certified Experts, Clinical Testing Services, Cutting-edge Technology, Future of Clinical Diagnostics, ISO 9001:2015 Certified Quality, Laboratory Professional Handling a Sample, LAD (+3 more)

### Community 17 - "Quality Promotional Banner"
Cohesion: 0.29
Nodes (11): Calidad certificada, Certeza y confianza, Confidencialidad y seguridad, Diagnósticos confiables y resultados que importan, ISO 9001:2015 Quality Management System, LAD Laboratorio de Apoyo y Diagnóstico, Mejora continua, Profesionales especializados (+3 more)

### Community 18 - "Futuristic Lab Website"
Cohesion: 0.18
Nodes (11): Online Appointment Scheduling, Certified Laboratory Experts, Patient Data and Result Confidentiality, Future of Clinical Diagnostics, General Checkups, ISO 9001:2015 Quality Management, LAD Clinical Diagnostics, LAD Futuristic Diagnostic Website Concept (+3 more)

### Community 19 - "Human-Centered Diagnostics"
Cohesion: 0.27
Nodes (10): High-End Laboratory Technology, Confidentiality and Information Security, Continuous Quality Improvement, Human-Centered Laboratory Service, ISO 9001:2015 Quality Management System, LAD — Laboratorio de Apoyo y Diagnóstico, Patient Certainty and Trust, LAD Laboratory Promotional Banner (+2 more)

### Community 20 - "Clinical Lab Advertisement"
Cohesion: 0.33
Nodes (10): Análisis de muestras sanguíneas, Atención personalizada, Calidad certificada, LAD Clinical Laboratory Advertisement, Equipos modernos de laboratorio, LAD Laboratorio de Análisis Clínicos, Precisión que genera confianza y resultados que cuidan de ti, Procesos certificados (+2 more)

### Community 21 - "Clinical Lab Advertisement Copy"
Cohesion: 0.33
Nodes (10): Análisis de muestras sanguíneas, Atención personalizada, Calidad certificada, LAD Clinical Laboratory Advertisement, Equipos modernos de laboratorio, LAD Laboratorio de Análisis Clínicos, Precisión que genera confianza y resultados que cuidan de ti, Procesos certificados (+2 more)

### Community 22 - "Medical Website Inspiration"
Cohesion: 0.25
Nodes (9): 24/7 Emergency Service, Featured Medical Doctor, 100K+ Happy Patient Metric, Healthcare Homepage Mockup, Patient Login and Sign-up, Make Appointment Call to Action, Medical and Treatment Center, Professional Doctor Connection (+1 more)

### Community 23 - "Biotech Consultancy Inspiration"
Cohesion: 0.25
Nodes (9): United Bio-entrepreneur Network, BIONOVA, BIONOVA Biotechnology Consultancy Landing Page, Biotech Leaders, Innovative Bioventure Creation, Partner Organizations, Request a Call, 34 Scientist and Advisor Collective (+1 more)

### Community 24 - "Navigation Components"
Cohesion: 0.25
Nodes (6): IconBadge(), IconBadgeProps, IconChip(), IconChipProps, IconLogin(), navLinks

### Community 25 - "Automated Laboratory Image"
Cohesion: 0.36
Nodes (8): Automated Liquid Handling, Digital Experiment Monitoring, Futuristic Automated Laboratory Interior, Human-Robot Laboratory Collaboration, LAB Brand Identity, Laboratory Glassware and Samples, Laboratory Scientists, Robotic Laboratory Arms

### Community 26 - "Automated Laboratory Copy"
Cohesion: 0.36
Nodes (8): Automated Liquid Handling, Digital Experiment Monitoring, Futuristic Automated Laboratory Interior, Human-Robot Laboratory Collaboration, LAB Brand Identity, Laboratory Glassware and Samples, Laboratory Scientists, Robotic Laboratory Arms

### Community 27 - "Laboratory Research Image"
Cohesion: 0.36
Nodes (8): Active LAB Solutions Research Laboratory, Chemical Samples and Reagents, Collaborative Laboratory Research Workflow, Instrumental Laboratory Analysis, LAB Solutions Brand, Laboratory Glassware, Laboratory Scientists, Microscopic Analysis

### Community 28 - "Healthcare Landing Inspiration"
Cohesion: 0.29
Nodes (8): Online Appointment Booking, Connect with a Professional Doctor, 24/7 Emergency Service, Healthcare Service Landing Page, Healthcare Platform, Medical and Treatment Center, Happy Patient Social Proof, Specialist Doctor Network

### Community 29 - "Biotech Landing Inspiration"
Cohesion: 0.29
Nodes (8): Scientist and Investor Advisor Network, Bioventure Creation, Bionova, Bionova Biotech Consultancy Landing Page, Biotech Leadership Consulting, Global Bio-Entrepreneur Network, Innovative Life Science Enterprises, Professional-Led Partner Organizations

### Community 30 - "Patient Testimonials"
Cohesion: 0.25
Nodes (6): firstColumn, secondColumn, Testimonial, testimonials, TestimonialsSection(), thirdColumn

### Community 31 - "Modern Laboratory Interior"
Cohesion: 0.48
Nodes (7): Automated Laboratory Analyzer, Clinical Laboratory Facility, Clean Controlled Laboratory Environment, Laboratory Fume Extraction System, LAD Laboratory Brand, Modern LAD Laboratory Interior, Laboratory Safety Infrastructure

### Community 32 - "Laboratory Team Visual"
Cohesion: 0.43
Nodes (7): Analytical Laboratory Instruments, Chemistry Glassware and Colored Reagents, LAB SOLUTIONS Wordmark, Laboratory Technicians, Laboratory Microscope, Modern Clinical Laboratory Interior, Red and White Laboratory Visual Identity

### Community 33 - "Sterile Lab Infrastructure"
Cohesion: 0.38
Nodes (7): Automated Analytical Instruments, Controlled Testing Environment, Enclosed Laboratory Safety Workstation, Laboratory Fume Extraction System, LAD Brand Identity, Modern LAD Laboratory Interior, Sterile Laboratory Environment

### Community 34 - "Construction Preview"
Cohesion: 0.33
Nodes (5): COLORS, ConstruccionOverlay(), Particle, useParticles(), videos

### Community 35 - "LAD Brand Mark"
Cohesion: 0.40
Nodes (6): LAD Registered Logo, LAD Wordmark, Molecular Dot Motif, Red Rounded-square Brand Field, Red and White Brand Identity, Registered Trademark Symbol

### Community 36 - "Model Configuration"
Cohesion: 0.50
Nodes (4): Claude 4 Sonnet, Example Config, my gpt-5, qwen2.5-coder 7b

### Community 37 - "LAD Logo Asset"
Cohesion: 0.67
Nodes (4): LAD Brand, LAD Logo Image, Red Laboratory Brand Identity, Registered Trademark

### Community 38 - "Brand Design References"
Cohesion: 1.00
Nodes (3): LAD Registered Logo, LAD Registered Logo, LAD Design System

## Ambiguous Edges - Review These
- `Bionova` → `Professional-Led Partner Organizations`  [AMBIGUOUS]
  public/inspiracion/7723e2985b67e3d0a70a10e71bd8a07b.jpg · relation: shares_data_with

## Knowledge Gaps
- **169 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+164 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Bionova` and `Professional-Led Partner Organizations`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._
- **Why does `devDependencies` connect `Development Tooling` to `Runtime Dependencies`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Why does `LAD_WHATSAPP_LINK` connect `Contact and WhatsApp` to `Construction Preview`, `Homepage Content`, `Layout and Footer`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _169 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Legacy LAD Design` be split into smaller, more focused modules?**
  _Cohesion score 0.11231884057971014 - nodes in this community are weakly interconnected._
- **Should `About Page and Icons` be split into smaller, more focused modules?**
  _Cohesion score 0.13768115942028986 - nodes in this community are weakly interconnected._