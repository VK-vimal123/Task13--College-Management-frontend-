document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navItems.forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // 2. Sticky Navbar Shadow & Active Link Highlight on Scroll
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let currentSection = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 110;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Top Notice Bar Auto-Rotation
    const notices = [
        'Applications open for B.E. / B.Tech and M.E. / M.Tech programmes. Entrance counselling begins June 15.',
        'TNEA Counselling Code: 2748 • Merit scholarships available for students scoring above 90% in PCM.',
        'NAAC A+ Accredited Autonomous Institution • Ranked among Top Engineering Colleges in Tamil Nadu.'
    ];
    const noticeTicker = document.getElementById('notice-ticker');
    let noticeIndex = 0;

    setInterval(() => {
        noticeIndex = (noticeIndex + 1) % notices.length;
        noticeTicker.textContent = notices[noticeIndex];
    }, 5000);

    // 4. Courses Filter (All / UG / PG)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filterButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedLevel = button.getAttribute('data-filter');

            courseCards.forEach((card) => {
                const cardLevel = card.getAttribute('data-level');
                if (selectedLevel === 'all' || cardLevel === selectedLevel) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 5. Faculty Department Filter
    const facultySelect = document.getElementById('faculty-dept-select');
    const facultyCards = document.querySelectorAll('.faculty-card');

    facultySelect.addEventListener('change', () => {
        const chosenDept = facultySelect.value;

        facultyCards.forEach((card) => {
            const cardDept = card.getAttribute('data-dept');
            if (chosenDept === 'ALL' || cardDept === chosenDept) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });

    // 6. Department Details Modal Data & Interaction
    const departmentDetails = {
        CSE: {
            title: 'Department of Computer Science & Engineering',
            hod: 'Dr. Karthik Narayanan',
            labs: ['AI & Deep Learning Lab', 'Cloud & Virtualization Lab', 'Cybersecurity & Networks Lab'],
            summary: 'Established in 2002, the CSE department maintains a 97% placement track record with recruiters such as Zoho, TCS Digital, Cognizant, and Amazon.'
        },
        ECE: {
            title: 'Department of Electronics & Communication Engineering',
            hod: 'Dr. S. Meenakshi',
            labs: ['VLSI & Cadence Design Lab', 'Embedded Systems & IoT Lab', 'Microwave & Optical Comm. Lab'],
            summary: 'Equipped with industry-standard FPGA boards and spectrum analyzers, preparing students for semiconductor, telecom, and embedded product roles.'
        },
        EEE: {
            title: 'Department of Electrical & Electronics Engineering',
            hod: 'Dr. Prakash Rajendran',
            labs: ['Power Electronics & Drives Lab', 'EV Battery & Motor Testing Lab', 'PLC & SCADA Automation Lab'],
            summary: 'Focuses on sustainable energy systems, smart grids, and electric vehicle powertrain engineering with AICTE-sponsored research facilities.'
        },
        MECH: {
            title: 'Department of Mechanical Engineering',
            hod: 'Dr. Arvind Krishnamurthy',
            labs: ['CAD/CAM & 3D Printing Lab', 'Thermal & IC Engines Lab', 'Robotics & Mechatronics Lab'],
            summary: 'Offers strong workshop practice alongside modern simulation software (ANSYS, SolidWorks) and active SAE collegiate clubs.'
        },
        CIVIL: {
            title: 'Department of Civil Engineering',
            hod: 'Prof. Anitha Selvam',
            labs: ['Concrete & Highway Testing Lab', 'Geotechnical Engineering Lab', 'Total Station Survey Lab'],
            summary: 'Provides consultancy services for structural testing and trains students in STAAD.Pro, AutoCAD Civil 3D, and sustainable building practices.'
        },
        IT: {
            title: 'Department of Information Technology',
            hod: 'Prof. Divya Bharathi',
            labs: ['Full-Stack Web Engineering Lab', 'Big Data Analytics Lab', 'Mobile App Development Lab'],
            summary: 'Bridges software engineering and business applications through agile project labs, hackathons, and regular industry mentorship.'
        }
    };

    const modal = document.getElementById('info-modal');
    const modalTag = document.getElementById('modal-tag');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const modalEnquireBtn = document.getElementById('modal-enquire-btn');

    const deptButtons = document.querySelectorAll('.view-dept-btn');
    deptButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const deptKey = btn.getAttribute('data-dept');
            const info = departmentDetails[deptKey];
            if (!info) return;

            modalTag.textContent = `${deptKey} Department Overview`;
            modalTitle.textContent = info.title;
            modalBody.innerHTML = `
                <p><strong>Head of Department:</strong> ${info.hod}</p>
                <p style="margin-top: 8px;">${info.summary}</p>
                <p style="margin-top: 12px;"><strong>Key Laboratories:</strong></p>
                <ul>
                    ${info.labs.map((lab) => `<li>${lab}</li>`).join('')}
                </ul>
            `;
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
        });
    });

    // Event Interest Registration via Modal
    const eventButtons = document.querySelectorAll('.register-event-btn');
    eventButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const eventName = btn.getAttribute('data-event');
            modalTag.textContent = 'Event Participation';
            modalTitle.textContent = eventName;
            modalBody.innerHTML = `
                <p>Registrations are open for students from all recognized engineering and arts colleges.</p>
                <p style="margin-top: 10px;">Please bring your valid college ID card on the event day. Use the enquiry form below if you need accommodation or team registration assistance.</p>
            `;
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
        });
    });

    const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    };

    modalClose.addEventListener('click', closeModal);
    modalEnquireBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // 7. Enquiry Form Validation & Submission Feedback
    const enquiryForm = document.getElementById('enquiry-form');
    const formFeedback = document.getElementById('form-feedback');

    enquiryForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const course = document.getElementById('course-select').value;
        const message = document.getElementById('message').value.trim();

        const phonePattern = /^[6-9]\d{9}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (fullName.length < 3) {
            showFeedback('Please enter a valid full name (minimum 3 characters).', 'error');
            return;
        }

        if (!emailPattern.test(email)) {
            showFeedback('Please enter a valid email address.', 'error');
            return;
        }

        if (!phonePattern.test(phone)) {
            showFeedback('Please enter a valid 10-digit Indian mobile number.', 'error');
            return;
        }

        if (!course) {
            showFeedback('Please select the programme you are interested in.', 'error');
            return;
        }

        if (message.length < 10) {
            showFeedback('Please enter a brief message (at least 10 characters).', 'error');
            return;
        }

        const referenceId = `VIET-${Math.floor(100000 + Math.random() * 900000)}`;
        showFeedback(
            `Thank you, ${fullName}. Your enquiry for ${course} has been logged (Ref: ${referenceId}). Our admissions counsellor will contact you within 24 working hours.`,
            'success'
        );
        enquiryForm.reset();
    });

    function showFeedback(text, type) {
        formFeedback.textContent = text;
        formFeedback.className = `form-feedback ${type}`;
    }
});