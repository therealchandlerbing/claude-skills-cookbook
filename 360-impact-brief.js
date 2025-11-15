/**
 * 360 Impact Brief - Executive Intelligence Dashboard
 * Production-ready JavaScript module
 * @version 2.0.0
 */

(function () {
    'use strict';

    // ==========================================
    // CONFIGURATION
    // ==========================================

    const CONFIG = {
        DEBUG: false, // Set to true for development
        TOAST_DURATION: 3000,
        CHART_ANIMATION_DURATION: 750,
        MOBILE_BREAKPOINT: 768
    };

    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================

    /**
     * Conditional logger for development
     */
    const log = {
        info: (...args) => CONFIG.DEBUG && console.log('ℹ️', ...args),
        success: (...args) => CONFIG.DEBUG && console.log('✓', ...args),
        error: (...args) => console.error('✗', ...args),
        warn: (...args) => CONFIG.DEBUG && console.warn('⚠️', ...args)
    };

    /**
     * Safe DOM query selector
     */
    function $(selector, context = document) {
        try {
            return context.querySelector(selector);
        } catch (error) {
            log.error(`Invalid selector: ${selector}`, error);
            return null;
        }
    }

    /**
     * Safe DOM query selector all
     */
    function $$(selector, context = document) {
        try {
            return Array.from(context.querySelectorAll(selector));
        } catch (error) {
            log.error(`Invalid selector: ${selector}`, error);
            return [];
        }
    }

    /**
     * Get current week date range
     */
    function getCurrentWeekText() {
        const today = new Date();
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return `Week of ${today.toLocaleDateString('en-US', options)}`;
    }

    /**
     * Format date for timeline
     */
    function formatTimelineDate(daysOffset = 0) {
        const date = new Date();
        date.setDate(date.getDate() + daysOffset);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `${dayName} ${monthDay}`;
    }

    // ==========================================
    // TOAST NOTIFICATIONS
    // ==========================================

    class ToastManager {
        constructor() {
            this.container = $('#toastContainer');
            if (!this.container) {
                log.warn('Toast container not found');
            }
        }

        show(message, type = 'success') {
            if (!this.container) return;

            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');

            const iconMap = {
                success: 'fa-check-circle',
                error: 'fa-exclamation-circle',
                warning: 'fa-exclamation-triangle',
                info: 'fa-info-circle'
            };

            toast.innerHTML = `
                <i class="fas ${iconMap[type] || iconMap.success} toast-icon" aria-hidden="true"></i>
                <div class="toast-message">${message}</div>
            `;

            this.container.appendChild(toast);

            // Auto-dismiss
            setTimeout(() => {
                toast.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => toast.remove(), 300);
            }, CONFIG.TOAST_DURATION);

            log.info(`Toast shown: ${message} (${type})`);
        }
    }

    const toast = new ToastManager();

    // ==========================================
    // WEEK DATE UPDATER
    // ==========================================

    function updateWeekDates() {
        try {
            const weekText = getCurrentWeekText();

            // Update sidebar week selector
            const currentWeekEl = $('#currentWeek');
            if (currentWeekEl) {
                currentWeekEl.textContent = weekText;
            }

            // Update snapshot title
            const snapshotTitle = $('#snapshotTitle');
            if (snapshotTitle) {
                snapshotTitle.textContent = weekText;
            }

            log.success('Week dates updated');
        } catch (error) {
            log.error('Error updating week dates:', error);
        }
    }

    // ==========================================
    // MOBILE MENU
    // ==========================================

    function initializeMobileMenu() {
        try {
            const toggle = $('#mobileMenuToggle');
            const sidebar = $('#sidebar');

            if (!toggle || !sidebar) {
                log.warn('Mobile menu elements not found');
                return;
            }

            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('mobile-open');
                const isOpen = sidebar.classList.contains('mobile-open');
                toggle.setAttribute('aria-expanded', isOpen);

                // Update icon
                const icon = $('i', toggle);
                if (icon) {
                    icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
                }

                log.info(`Mobile menu ${isOpen ? 'opened' : 'closed'}`);
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= CONFIG.MOBILE_BREAKPOINT) {
                    if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                        if (sidebar.classList.contains('mobile-open')) {
                            sidebar.classList.remove('mobile-open');
                            toggle.setAttribute('aria-expanded', 'false');
                            const icon = $('i', toggle);
                            if (icon) icon.className = 'fas fa-bars';
                        }
                    }
                }
            });

            log.success('Mobile menu initialized');
        } catch (error) {
            log.error('Error initializing mobile menu:', error);
        }
    }

    // ==========================================
    // NAVIGATION
    // ==========================================

    function initializeNavigation() {
        try {
            const navItems = $$('.nav-item');
            const sections = $$('section[id]');
            const sidebar = $('#sidebar');

            if (navItems.length === 0) {
                log.warn('No navigation items found');
                return;
            }

            navItems.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();

                    // Update active state
                    navItems.forEach(item => item.classList.remove('active'));
                    this.classList.add('active');

                    // Scroll to section
                    const targetId = this.getAttribute('href').substring(1);
                    const targetSection = $(`#${targetId}`);

                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                        // Close mobile menu if open
                        if (window.innerWidth <= CONFIG.MOBILE_BREAKPOINT) {
                            sidebar?.classList.remove('mobile-open');
                            const toggle = $('#mobileMenuToggle');
                            if (toggle) {
                                toggle.setAttribute('aria-expanded', 'false');
                                const icon = $('i', toggle);
                                if (icon) icon.className = 'fas fa-bars';
                            }
                        }

                        log.info(`Navigated to: ${targetId}`);
                    }
                });

                // Keyboard support
                link.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });

            // Active section highlighting on scroll
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    let current = '';
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        if (window.pageYOffset >= sectionTop - 100) {
                            current = section.getAttribute('id');
                        }
                    });

                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${current}`) {
                            item.classList.add('active');
                        }
                    });
                }, 100);
            });

            log.success('Navigation initialized');
        } catch (error) {
            log.error('Error initializing navigation:', error);
        }
    }

    // ==========================================
    // COLLAPSIBLE SECTIONS
    // ==========================================

    function initializeSections() {
        try {
            const sectionHeaders = $$('.section-header');

            if (sectionHeaders.length === 0) {
                log.warn('No section headers found');
                return;
            }

            sectionHeaders.forEach(header => {
                header.addEventListener('click', function () {
                    const section = this.closest('.section');
                    if (!section) return;

                    const isCollapsed = section.classList.toggle('collapsed');

                    // Update ARIA
                    this.setAttribute('aria-expanded', !isCollapsed);

                    // Save state to localStorage
                    const sectionId = section.getAttribute('id');
                    if (sectionId) {
                        try {
                            localStorage.setItem(`section-${sectionId}`, isCollapsed);
                        } catch (e) {
                            log.warn('LocalStorage not available:', e);
                        }
                    }

                    log.info(`Section ${sectionId} ${isCollapsed ? 'collapsed' : 'expanded'}`);
                });

                // Keyboard support
                header.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });

            // Restore saved states
            $$('.section[id]').forEach(section => {
                const sectionId = section.getAttribute('id');
                try {
                    const isCollapsed = localStorage.getItem(`section-${sectionId}`) === 'true';
                    if (isCollapsed) {
                        section.classList.add('collapsed');
                        const header = $('.section-header', section);
                        if (header) {
                            header.setAttribute('aria-expanded', 'false');
                        }
                    }
                } catch (e) {
                    log.warn('Could not restore section state:', e);
                }
            });

            log.success('Sections initialized');
        } catch (error) {
            log.error('Error initializing sections:', error);
        }
    }

    // ==========================================
    // TIMELINE DATA AND RENDERING
    // ==========================================

    const TIMELINE_DATA = {
        week: [
            {
                offset: 2,
                events: [
                    { text: '360 Annual Board Meeting (12pm PT)', priority: 'critical' },
                    { text: 'Merger transition review', priority: '' },
                    { text: 'Q1 2026 planning discussion', priority: '' }
                ]
            },
            {
                offset: 3,
                events: [
                    { text: 'CNEN IRDose Session 3 (9am PT)', priority: 'high' },
                    { text: 'Limus Leadership Stand-Up', priority: '' },
                    { text: 'Strategy week kickoff', priority: '' }
                ]
            },
            {
                offset: 4,
                events: [
                    { text: 'GenIP biweekly check-in (7am PT)', priority: '' },
                    { text: 'Guilherme arrives Seattle', priority: 'high' },
                    { text: 'Dinner with Bing/Walter', priority: '' }
                ]
            },
            {
                offset: 5,
                events: [
                    { text: 'Nadia offer letter deadline', priority: 'critical' },
                    { text: 'Partnership strategy session', priority: '' },
                    { text: 'Client follow-ups', priority: '' }
                ]
            },
            {
                offset: 6,
                events: [
                    { text: 'Team capacity planning', priority: '' },
                    { text: 'Service package refinement', priority: '' }
                ]
            },
            {
                offset: 7,
                events: [
                    { text: 'Leo contract terms finalization', priority: 'high' },
                    { text: 'Week review and next steps', priority: '' }
                ]
            }
        ],
        twoweeks: [
            {
                offset: 2,
                events: [
                    { text: '360 Annual Board Meeting (12pm PT)', priority: 'critical' },
                    { text: 'Merger transition review', priority: '' },
                    { text: 'Q1 2026 planning discussion', priority: '' }
                ]
            },
            {
                offset: 3,
                events: [
                    { text: 'CNEN IRDose Session 3 (9am PT)', priority: 'high' },
                    { text: 'Limus Leadership Stand-Up', priority: '' },
                    { text: 'Strategy week kickoff', priority: '' }
                ]
            },
            {
                offset: 4,
                events: [
                    { text: 'GenIP biweekly check-in (7am PT)', priority: '' },
                    { text: 'Guilherme arrives Seattle', priority: 'high' },
                    { text: 'Dinner with Bing/Walter', priority: '' }
                ]
            },
            {
                offset: 5,
                events: [
                    { text: 'Nadia offer letter deadline', priority: 'critical' },
                    { text: 'Partnership strategy session', priority: '' },
                    { text: 'Client follow-ups', priority: '' }
                ]
            },
            {
                offset: 6,
                events: [
                    { text: 'Team capacity planning', priority: '' },
                    { text: 'Service package refinement', priority: '' },
                    { text: 'Budget review with finance team', priority: '' }
                ]
            },
            {
                offset: 7,
                events: [
                    { text: 'Leo contract terms finalization', priority: 'high' },
                    { text: 'Week review and next steps', priority: '' }
                ]
            },
            {
                offset: 8,
                events: [
                    { text: 'Strategy week wrap-up', priority: '' },
                    { text: 'Guilherme departure', priority: '' }
                ]
            },
            {
                offset: 9,
                events: [
                    { text: 'Week planning and prep', priority: '' }
                ]
            },
            {
                offset: 10,
                events: [
                    { text: 'Client presentations', priority: 'high' },
                    { text: 'Pipeline review', priority: '' }
                ]
            },
            {
                offset: 11,
                events: [
                    { text: 'Partnership follow-ups', priority: '' },
                    { text: 'Proposal development', priority: '' }
                ]
            },
            {
                offset: 12,
                events: [
                    { text: 'Pre-Thanksgiving planning', priority: '' },
                    { text: 'Team check-ins', priority: '' }
                ]
            },
            {
                offset: 13,
                events: [
                    { text: 'Thanksgiving (US)', priority: '' }
                ]
            },
            {
                offset: 14,
                events: [
                    { text: 'Holiday (US)', priority: '' }
                ]
            },
            {
                offset: 15,
                events: [
                    { text: 'Month-end reviews', priority: '' }
                ]
            }
        ]
    };

    function renderTimeline(view = 'week') {
        try {
            const timelineBar = $('#timelineBar');
            const timelineHeader = $('#timelineHeaderText');

            if (!timelineBar) {
                log.warn('Timeline container not found');
                return;
            }

            const data = TIMELINE_DATA[view] || TIMELINE_DATA.week;

            // Update header text
            if (timelineHeader) {
                timelineHeader.textContent = view === 'twoweeks' ? 'Next Two Weeks' : 'Week Ahead';
            }

            // Render timeline days
            timelineBar.innerHTML = data.map(day => {
                const dateText = formatTimelineDate(day.offset);
                const eventsHtml = day.events.map(event => {
                    const priorityClass = event.priority ? `priority-${event.priority}` : '';
                    return `<div class="timeline-event ${priorityClass}">${event.text}</div>`;
                }).join('');

                return `
                    <div class="timeline-day" role="listitem">
                        <div class="timeline-date">${dateText}</div>
                        <div class="timeline-events">
                            ${eventsHtml}
                        </div>
                    </div>
                `;
            }).join('');

            log.success(`Timeline rendered: ${view}`);
        } catch (error) {
            log.error('Error rendering timeline:', error);
            const timelineBar = $('#timelineBar');
            if (timelineBar) {
                timelineBar.innerHTML = '<div class="chart-loading-text">Error loading timeline</div>';
            }
        }
    }

    function initializeTimeline() {
        try {
            const timelineToggles = $$('.timeline-toggle');

            if (timelineToggles.length === 0) {
                log.warn('No timeline toggles found');
                return;
            }

            timelineToggles.forEach(toggle => {
                toggle.addEventListener('click', function () {
                    // Update active state
                    timelineToggles.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');

                    // Render the selected view
                    const view = this.getAttribute('data-view');
                    renderTimeline(view);
                });

                // Keyboard support
                toggle.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });

            // Initialize with default view
            renderTimeline('week');

            log.success('Timeline initialized');
        } catch (error) {
            log.error('Error initializing timeline:', error);
        }
    }

    // ==========================================
    // CHARTS
    // ==========================================

    function createChart(canvasId, config) {
        try {
            const canvas = document.createElement('canvas');
            canvas.id = canvasId;
            canvas.setAttribute('role', 'img');
            canvas.setAttribute('aria-label', config.ariaLabel || 'Chart visualization');

            return new Chart(canvas, {
                ...config,
                options: {
                    ...config.options,
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: CONFIG.CHART_ANIMATION_DURATION
                    }
                }
            });
        } catch (error) {
            log.error(`Error creating chart ${canvasId}:`, error);
            throw error;
        }
    }

    function initializeCharts() {
        if (typeof Chart === 'undefined') {
            log.error('Chart.js not loaded');
            toast.show('Charts could not be loaded', 'error');
            return;
        }

        try {
            // Set Chart.js defaults
            Chart.defaults.font.family = 'Inter';
            Chart.defaults.color = '#64748B';

            // Revenue Distribution Chart
            const revenueWrapper = $('#revenueChartWrapper');
            if (revenueWrapper) {
                const revenueChart = createChart('revenueChart', {
                    type: 'doughnut',
                    data: {
                        labels: ['Venture IQ', 'Intelligence Audit', 'Innovation Compass', 'Consulting'],
                        datasets: [{
                            data: [35, 25, 30, 10],
                            backgroundColor: ['#6D4ACD', '#DC6B0A', '#0B5FD0', '#047857'],
                            borderWidth: 0,
                            borderRadius: 4
                        }]
                    },
                    options: {
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    font: { size: 12, family: 'Inter', weight: 500 },
                                    padding: 16,
                                    usePointStyle: true,
                                    pointStyle: 'circle'
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                padding: 12,
                                cornerRadius: 8,
                                titleFont: { size: 13, weight: 600 },
                                bodyFont: { size: 12 },
                                callbacks: {
                                    label: (context) => `${context.label}: ${context.parsed}%`
                                }
                            }
                        }
                    },
                    ariaLabel: 'Doughnut chart showing revenue distribution across service offerings'
                });
                revenueWrapper.innerHTML = '';
                revenueWrapper.appendChild(revenueChart.canvas);
                log.success('Revenue chart created');
            }

            // Team Capacity Chart
            const capacityWrapper = $('#capacityChartWrapper');
            if (capacityWrapper) {
                const capacityChart = createChart('capacityChart', {
                    type: 'radar',
                    data: {
                        labels: ['Corp BD', 'AI/Tech', 'Multilingual', 'Strategic', 'Financial', 'Agritech'],
                        datasets: [
                            {
                                label: 'Current Team',
                                data: [50, 75, 60, 70, 50, 30],
                                backgroundColor: 'rgba(11, 95, 208, 0.1)',
                                borderColor: '#0B5FD0',
                                pointBackgroundColor: '#0B5FD0',
                                pointBorderColor: '#fff',
                                pointBorderWidth: 2,
                                borderWidth: 2
                            },
                            {
                                label: 'With Nadia & Leo',
                                data: [90, 85, 95, 90, 90, 85],
                                backgroundColor: 'rgba(4, 120, 87, 0.1)',
                                borderColor: '#047857',
                                pointBackgroundColor: '#047857',
                                pointBorderColor: '#fff',
                                pointBorderWidth: 2,
                                borderWidth: 2
                            }
                        ]
                    },
                    options: {
                        scales: {
                            r: {
                                beginAtZero: true,
                                max: 100,
                                ticks: {
                                    stepSize: 20,
                                    font: { size: 11, family: 'Inter' }
                                },
                                pointLabels: {
                                    font: { size: 12, family: 'Inter', weight: 600 }
                                },
                                grid: { color: 'rgba(0, 0, 0, 0.05)' }
                            }
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    font: { size: 12, family: 'Inter', weight: 500 },
                                    padding: 16,
                                    usePointStyle: true,
                                    pointStyle: 'circle'
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                padding: 12,
                                cornerRadius: 8,
                                titleFont: { size: 13, weight: 600 },
                                bodyFont: { size: 12 }
                            }
                        }
                    },
                    ariaLabel: 'Radar chart comparing current team capacity with projected capacity after hiring'
                });
                capacityWrapper.innerHTML = '';
                capacityWrapper.appendChild(capacityChart.canvas);
                log.success('Capacity chart created');
            }

            // Service Package Chart
            const serviceWrapper = $('#serviceChartWrapper');
            if (serviceWrapper) {
                const serviceChart = createChart('serviceChart', {
                    type: 'bar',
                    data: {
                        labels: ['Venture IQ\n(CVC)', 'Intelligence Audit\n(TTO)', 'Innovation Compass\n(Full Service)'],
                        datasets: [{
                            label: 'Market Fit Score',
                            data: [85, 60, 100],
                            backgroundColor: ['#6D4ACD', '#DC6B0A', '#0B5FD0'],
                            borderRadius: 6,
                            borderSkipped: false
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                padding: 12,
                                cornerRadius: 8,
                                titleFont: { size: 13, weight: 600 },
                                bodyFont: { size: 12 },
                                callbacks: {
                                    label: (context) => `Market Fit: ${context.parsed.x}%`
                                }
                            }
                        },
                        scales: {
                            x: {
                                beginAtZero: true,
                                max: 100,
                                grid: { display: false },
                                ticks: {
                                    callback: (value) => value + '%',
                                    font: { size: 11, family: 'Inter' }
                                }
                            },
                            y: {
                                grid: { display: false },
                                ticks: {
                                    font: { size: 12, family: 'Inter', weight: 500 }
                                }
                            }
                        }
                    },
                    ariaLabel: 'Bar chart showing market fit scores for three service packages'
                });
                serviceWrapper.innerHTML = '';
                serviceWrapper.appendChild(serviceChart.canvas);
                log.success('Service chart created');
            }

            log.success('All charts initialized');
        } catch (error) {
            log.error('Error initializing charts:', error);
            toast.show('Error loading charts', 'error');
        }
    }

    // ==========================================
    // INITIALIZATION
    // ==========================================

    function initialize() {
        log.info('Initializing 360 Impact Brief...');

        try {
            // Update dates
            updateWeekDates();

            // Initialize mobile menu
            initializeMobileMenu();

            // Initialize navigation
            initializeNavigation();

            // Initialize collapsible sections
            initializeSections();

            // Initialize timeline
            initializeTimeline();

            // Initialize charts (wait for Chart.js to load)
            if (typeof Chart !== 'undefined') {
                initializeCharts();
            } else {
                // Wait for Chart.js to load
                let chartLoadAttempts = 0;
                const chartLoadInterval = setInterval(() => {
                    chartLoadAttempts++;
                    if (typeof Chart !== 'undefined') {
                        clearInterval(chartLoadInterval);
                        initializeCharts();
                    } else if (chartLoadAttempts > 20) {
                        clearInterval(chartLoadInterval);
                        log.error('Chart.js failed to load after 20 attempts');
                        toast.show('Charts could not be loaded', 'error');
                    }
                }, 100);
            }

            log.success('✓ 360 Impact Brief initialized successfully');
        } catch (error) {
            log.error('Error during initialization:', error);
            toast.show('An error occurred during initialization', 'error');
        }
    }

    // ==========================================
    // START APPLICATION
    // ==========================================

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateWeekDates();
            log.info('Page visible - dates updated');
        }
    });

    // Expose public API for debugging (only in debug mode)
    if (CONFIG.DEBUG) {
        window.ImpactBrief = {
            updateWeekDates,
            renderTimeline,
            toast,
            version: '2.0.0'
        };
    }
})();
