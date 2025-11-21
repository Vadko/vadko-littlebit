document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        uk: {
            nav_projects: "Проєкти", nav_support: "Підтримка", nav_contacts: "Контакти",
            hero_title: "Грайте українською —<br>відчувайте по-новому.",
            hero_lead: "Улюблені історії — українською, від серця.",
            stat_projects: "ПРОЄКТІВ", stat_avg: "СЕР. ГОТОВНІСТЬ", stat_ea: "РАННІЙ ДОСТУП",
            search_ph: "Пошук всесвіту...", filter_all: "Всі", filter_in_progress: "В процесі", filter_fundraising: "Збір", filter_early_access: "Ранній доступ",
            contacts_title: "Контакти", contacts_text: "Слідкуйте за новинами у наших соцмережах:",
            support_title: "Підтримати нас", support_text: "Ваша підтримка допомагає нам створювати якісні українські локалізації улюблених ігор",
            benefactors_title: "ДОБРОЧИНЦІ",
            st_prog: "В ПРОЦЕСІ", st_fund: "ЗБІР КОШТІВ", st_early: "РАННІЙ ДОСТУП", st_done: "ГОТОВО",
            lbl_readiness: "Готовність", lbl_raised: "Зібрано",
            btn_dl: "Завантажити", btn_details: "Деталі", lbl_episode: "Епізод",
            lbl_text: "Текст", lbl_textures: "Текстури", lbl_fonts: "Шрифти"
        },
        en: {
            nav_projects: "Projects", nav_support: "Support", nav_contacts: "Contacts",
            hero_title: "Play in Ukrainian —<br>feel it anew.",
            hero_lead: "Favorite stories — in Ukrainian, from the heart.",
            stat_projects: "PROJECTS", stat_avg: "AVG. READINESS", stat_ea: "EARLY ACCESS",
            search_ph: "Search universe...", filter_all: "All", filter_in_progress: "In Progress", filter_fundraising: "Fundraising", filter_early_access: "Early Access",
            contacts_title: "Contacts", contacts_text: "Follow our news on social media:",
            support_title: "Support Us", support_text: "Your support helps us create quality Ukrainian localizations of beloved games",
            benefactors_title: "BENEFACTORS",
            st_prog: "IN PROGRESS", st_fund: "FUNDRAISING", st_early: "EARLY ACCESS", st_done: "RELEASED",
            lbl_readiness: "Readiness", lbl_raised: "Raised",
            btn_dl: "Download", btn_details: "Details", lbl_episode: "Episode",
            lbl_text: "Text", lbl_textures: "Textures", lbl_fonts: "Fonts"
        }
    };

    let currentLang = 'uk';

    // Дані імпортуються з data.js

    // TILT
    const initTilt = (card) => {
        card.addEventListener('mousemove', (e) => {
            if(window.innerWidth < 900) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const cx = rect.width / 2; const cy = rect.height / 2;
            const dx = (x - cx) / cx; const dy = (y - cy) / cy;
            card.style.transform = `perspective(1000px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
        });
    };

    const grid = document.getElementById('projects');
    let activeFilter = 'all';

    window.setLang = (lang) => {
        currentLang = lang;
        const t = translations[lang];
        document.querySelectorAll('.lang-opt').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.lang-opt')[lang === 'uk' ? 0 : 1].classList.add('active');

        document.querySelectorAll('[data-i18n]').forEach(el => {
            if(t[el.dataset.i18n]) el.innerHTML = t[el.dataset.i18n];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            if(t[el.dataset.i18nPlaceholder]) el.placeholder = t[el.dataset.i18nPlaceholder];
        });
        renderGrid();
    };

    function renderGrid() {
        const term = document.getElementById('search').value.toLowerCase();
        grid.innerHTML = '';
        const t = translations[currentLang];

        const filtered = projectsData.filter(p => {
            const matchCat = activeFilter === 'all' || p.status === activeFilter;
            const matchTerm = p.title.toLowerCase().includes(term);
            return matchCat && matchTerm;
        });

        filtered.forEach(p => {
            let stClass = 'st-prog', stText = t.st_prog;
            let barColor = 'var(--neon-blue)';
            let metaLabel = t.lbl_readiness;
            let metaVal = `${p.progress}%`;
            let btnClass = 'btn-grad-blue';

            // Автоматичний розрахунок прогресу для збору коштів
            let displayProgress = p.progress;

            if(p.status === 'fundraising') {
                stClass = 'st-fund'; stText = t.st_fund; barColor = 'var(--neon-orange)';
                metaLabel = t.lbl_raised;
                if(p.goal) {
                    metaVal = `${(p.raised/1000).toFixed(1)}k / ${(p.goal/1000).toFixed(1)}k`;
                    // Автоматично розраховуємо прогрес збору коштів
                    displayProgress = Math.min(Math.round((p.raised/p.goal)*100), 100);
                }
                btnClass = 'btn-fund';
            } else if(p.status === 'early-access') {
                stClass = 'st-early'; stText = t.st_early; barColor = 'var(--neon-purple)';
                btnClass = 'btn-early';
            }

            const btnLabel = (currentLang==='uk'? p.cta.label : (p.cta.label_en || p.cta.label));
            let btnHtml = `<a href="${p.cta.url}" target="_blank" class="btn-action ${btnClass}">${btnLabel}</a>`;
            if(p.cta.type === 'disabled') {
                btnHtml = `<span class="btn-action btn-disabled">${btnLabel}</span>`;
            }

            const card = document.createElement('article');
            card.className = 'game-card';
            card.innerHTML = `
                <div class="card-visual">
                    <img src="${p.cover}" class="card-bg-img" loading="lazy">
                    <div class="card-logo-layer">
                        <img src="${p.logo}" class="card-logo" onerror="this.style.display='none'">
                    </div>
                </div>
                <div class="card-info">
                    <div class="c-header"><div class="status-pill ${stClass}">${stText}</div></div>
                    <h3 class="card-title">${p.title}</h3>
                    <div class="progress-wrap">
                        <div class="p-meta"><span>${metaLabel}</span><span>${metaVal}</span></div>
                        <div class="p-track">
                            <div class="p-bar" style="width:${displayProgress}%; background:${barColor}; box-shadow:0 0 10px ${barColor}"></div>
                        </div>
                    </div>
                    <div class="card-actions">
                        ${btnHtml}
                        <button class="btn-action btn-details" onclick="openModal('${p.id}')">${t.btn_details}</button>
                    </div>
                </div>
            `;
            initTilt(card);
            grid.appendChild(card);
        });

        document.getElementById('stat-count').innerText = filtered.length;
        document.getElementById('stat-ea').innerText = filtered.filter(p => p.status === 'early-access').length;

        // Розрахунок середньої готовності з урахуванням автоматичного прогресу збору
        const active = filtered.filter(p => p.status !== 'fundraising');
        const avg = active.length ? Math.round(active.reduce((a,b)=>a+(b.progress||0),0)/active.length) : 0;
        document.getElementById('stat-avg').innerText = avg + "%";
    }

    document.querySelectorAll('.f-btn').forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll('.f-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        activeFilter = b.dataset.filter;
        renderGrid();
    }));
    document.getElementById('search').addEventListener('input', renderGrid);

    const bList = document.getElementById('benefactors-list');
    benefactorsList.forEach(b => {
        const sp = document.createElement('span');
        sp.className = `b-tag ${b.type||''}`;
        sp.innerText = (b.type==='gold'?'👑 ':b.type==='green'?'💚 ':b.type==='flamingo'?'🦩 ':'') + b.name;
        bList.appendChild(sp);
    });

    // МОДАЛЬНЕ ВІКНО (ВИПРАВЛЕНО)
    const modal = document.getElementById('modal');
    window.openModal = (id) => {
        const p = projectsData.find(x => x.id === id);
        if(!p) return;
        const t = translations[currentLang];

        document.getElementById('m-logo').src = p.logo;
        document.getElementById('m-desc').innerHTML = currentLang==='uk'?p.desc: (p.desc_en || p.desc);

        const sBox = document.getElementById('m-stats'); sBox.innerHTML = '';

        const addBar = (l,v) => {
            if(v!==undefined) sBox.innerHTML += `
            <div class="stat-row">
                <div class="stat-label">${l}</div>
                <div class="stat-track"><div class="stat-fill" style="width:${v}%"></div></div>
                <div class="stat-val">${v}%</div>
            </div>`;
        };

        // Логіка для різних типів прогресу
        if (p.progress_mode === 'episodes') {
             for(let i=1; i<=8; i++) {
                const val = p[`progress_ep${i}`];
                if(val !== undefined) addBar(`${t.lbl_episode} ${i}`, val);
             }
        } else if (p.status === 'fundraising') {
            if(p.goal) {
                const pct = Math.min(Math.round((p.raised/p.goal)*100), 100);
                addBar(t.lbl_raised, pct);
            }
            if(p.progress_text) addBar(t.lbl_text, p.progress_text);
        } else {
            if(p.progress_text !== undefined) addBar(t.lbl_text, p.progress_text);
            if(p.progress_textures !== undefined) addBar(t.lbl_textures, p.progress_textures);
            if(p.progress_fonts !== undefined) addBar(t.lbl_fonts, p.progress_fonts);
        }

        const vBox = document.getElementById('m-video'); vBox.innerHTML = '';
        if(p.videos && p.videos.length) {
             const vID = p.videos[0].match(/v=([a-zA-Z0-9_-]+)/)?.[1];
             if(vID) vBox.innerHTML = `<div class="video-wrapper"><iframe src="https://www.youtube.com/embed/${vID}" frameborder="0" allowfullscreen></iframe></div>`;
        }

        // Кнопки дій
        const mActions = document.getElementById('m-actions');
        mActions.innerHTML = '';

        // Steam link
        if(p.steam) {
            mActions.innerHTML += `<a href="${p.steam}" target="_blank" class="btn-action btn-details" style="flex:0 0 auto; padding:0 15px">Steam</a>`;
        }

        // Основна кнопка
        const btnLabel = (currentLang==='uk'? p.cta.label : (p.cta.label_en || p.cta.label));
        if(p.cta.type !== 'disabled') {
            let btnClass = 'btn-grad-blue';
            if(p.status === 'fundraising') btnClass = 'btn-fund';
            else if(p.status === 'early-access') btnClass = 'btn-early';

            mActions.innerHTML += `<a href="${p.cta.url}" target="_blank" class="btn-action ${btnClass}" style="flex:1">${btnLabel}</a>`;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeM = () => { modal.classList.remove('active'); document.body.style.overflow = ''; document.getElementById('m-video').innerHTML=''; };
    document.querySelector('.modal-close').addEventListener('click', closeM);
    modal.addEventListener('click', e => { if(e.target === modal) closeM(); });

    renderGrid();

    // === NEWS SLIDER ===
    const initNewsSlider = () => {
        const slider = document.querySelector('.news-slider');
        if (!slider) return;

        const sliderTrack = slider.querySelector('.slider-track');
        const dotsContainer = slider.querySelector('.slider-dots');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');

        // Рендеримо слайди з newsSlides
        if (typeof newsSlides !== 'undefined' && newsSlides.length > 0) {
            sliderTrack.innerHTML = newsSlides.map((slide, index) => {
                const badgeClass = `news-badge-${slide.badgeType}`;
                const isActive = index === 0 ? 'active' : '';

                return `
                    <div class="news-slide ${isActive}" style="background-image: url('${slide.image}');">
                        <div class="news-slide-overlay"></div>
                        <div class="news-slide-content">
                            <div class="news-badge ${badgeClass}">${slide.badge}</div>
                            <h2 class="news-title">${slide.title}</h2>
                            <p class="news-description">${slide.description}</p>
                            <a href="${slide.link}" target="_blank" class="news-btn">
                                <span>${slide.buttonText}</span>
                            </a>
                        </div>
                        <div class="slide-progress-bar"></div>
                    </div>
                `;
            }).join('');
        }

        const slides = Array.from(slider.querySelectorAll('.news-slide'));

        let currentIndex = 0;
        let autoplayInterval = null;
        let progressInterval = null;
        let isPaused = false;
        let isWaitingAfterManual = false; // Чи очікуємо після ручного перемикання
        let currentProgress = 0;
        const AUTOPLAY_DELAY = 5000; // 5 секунд

        // Створюємо dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Перейти до новини ${index + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(index, true);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.querySelectorAll('.slider-dot'));

        // Анімація прогрес-бару
        const startProgressBar = (startFrom = 0) => {
            const progressBar = slides[currentIndex].querySelector('.slide-progress-bar');
            if (!progressBar) return;

            // Зупинка попереднього інтервалу
            if (progressInterval) {
                clearInterval(progressInterval);
                progressInterval = null;
            }

            currentProgress = startFrom;
            progressBar.style.width = startFrom + '%';
            const increment = 100 / (AUTOPLAY_DELAY / 16); // 60 FPS

            progressInterval = setInterval(() => {
                if (isPaused) return;

                currentProgress += increment;
                if (currentProgress >= 100) {
                    currentProgress = 100;
                    progressBar.style.width = '100%';
                } else {
                    progressBar.style.width = currentProgress + '%';
                }
            }, 16);
        };

        const stopProgressBar = () => {
            if (progressInterval) {
                clearInterval(progressInterval);
                progressInterval = null;
            }
        };

        // Функція переходу до слайду
        const goToSlide = (index, isManual = false) => {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            // Зміна слайдів
            slides[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            currentIndex = index;
            slides[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');

            // Обнуляємо ВСІ прогрес-бари візуально
            slides.forEach(slide => {
                const progressBar = slide.querySelector('.slide-progress-bar');
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
            });

            // Скид та перезапуск прогрес-бару
            stopProgressBar();
            currentProgress = 0;

            if (!isManual) {
                // Автоматичне перемикання - запускаємо прогрес-бар
                startProgressBar(0);
            } else {
                // Ручне перемикання - ресет автоплею з паузою
                resetAutoplay();
            }
        };

        // Автоплей
        const startAutoplay = () => {
            stopAutoplay();
            isPaused = false;

            // Запуск або продовження прогрес-бару
            startProgressBar(currentProgress);

            // Розрахунок залишку часу
            const remainingTime = AUTOPLAY_DELAY * ((100 - currentProgress) / 100);

            // Таймер для переходу на наступний слайд
            autoplayInterval = setTimeout(() => {
                if (!isPaused) {
                    goToSlide(currentIndex + 1, false);
                    // Запуск автоплею для наступного слайду
                    autoplayInterval = setInterval(() => {
                        goToSlide(currentIndex + 1, false);
                    }, AUTOPLAY_DELAY);
                }
            }, remainingTime);
        };

        const stopAutoplay = () => {
            if (autoplayInterval) {
                clearTimeout(autoplayInterval);
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
            stopProgressBar();
        };

        const resetAutoplay = () => {
            stopAutoplay();
            isPaused = false;
            isWaitingAfterManual = true;
            currentProgress = 0;

            // Пауза 3 секунди після ручного перемикання
            setTimeout(() => {
                if (isWaitingAfterManual) {
                    isWaitingAfterManual = false;
                    currentProgress = 0;
                    startAutoplay();
                }
            }, 3000);
        };

        // Події для кнопок
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1, true);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1, true);
        });

        // Пауза при наведенні
        slider.addEventListener('mouseenter', () => {
            // Не реагуємо якщо очікуємо після ручного перемикання
            if (isWaitingAfterManual) return;

            isPaused = true;
            stopAutoplay();
        });

        slider.addEventListener('mouseleave', () => {
            // Не реагуємо якщо очікуємо після ручного перемикання
            if (isWaitingAfterManual) return;

            isPaused = false;
            startAutoplay();
        });

        // Підтримка свайпів на мобільних
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    goToSlide(currentIndex + 1, true);
                } else {
                    goToSlide(currentIndex - 1, true);
                }
            }
        }, { passive: true });

        // Підтримка клавіатури
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1, true);
            if (e.key === 'ArrowRight') goToSlide(currentIndex + 1, true);
        });

        // Запуск автоплею
        startAutoplay();

        // Зупинка при виході з вкладки
        document.addEventListener('visibilitychange', () => {
            // Не реагуємо якщо очікуємо після ручного перемикання
            if (isWaitingAfterManual) return;

            if (document.hidden) {
                isPaused = true;
                stopAutoplay();
            } else {
                isPaused = false;
                startAutoplay();
            }
        });
    };

    // Ініціалізація слайдера
    initNewsSlider();
});
