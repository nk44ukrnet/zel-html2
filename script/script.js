window.addEventListener('DOMContentLoaded', () => {

    //expandable boxes
    function cellsInitialSetup() {
        let cells = document.querySelectorAll('.hb-expand-cell');
        if (cells.length) {
            cells.forEach(cell => {
                let minHeight = cell.scrollHeight;
                cell.style.minHeight = `${minHeight}px`;
            })
        }
    }

    function cellsActiveOnlyFirst() {
        let cells = document.querySelectorAll('.hb-expand-cell');
        if (cells.length) {
            cells.forEach(cell => {
                let cellItems = cell.querySelectorAll('.hb-expand-cell__item');
                if (cellItems.length) {
                    for (let i = 0; i < cellItems.length; i++) {
                        if (i === 0) {
                            continue;
                        } else {
                            cellItems[i].classList.remove('active');
                        }
                    }
                }
            })
        }
    }

    function removeAllActiveClassesFromCurrentParent(el) {
        let cellItems = el.querySelectorAll('.hb-expand-cell__item');
        if (cellItems.length) {
            cellItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    }

    function cellsActiveClick() {
        let cellItems = document.querySelectorAll('.hb-expand-cell__item');
        if (cellItems.length) {
            for (let i = 0; i < cellItems.length; i++) {
                cellItems[i].addEventListener('click', function (event) {
                    if (cellItems[i].classList.contains('active')) {
                        cellItems[i].classList.remove('active')
                    } else {
                        let parentCell = cellItems[i].closest('.hb-expand-cell');
                        if (parentCell) {
                            removeAllActiveClassesFromCurrentParent(parentCell);
                            cellItems[i].classList.add('active')
                        }
                    }
                });
            }
        }
    }

    function onceFetchIsDone() {
        try {

            let cells = document.querySelectorAll('.hb-expand-cell');
            if (cells.length) {
                // cellsInitialSetup();
                cellsActiveOnlyFirst();
            }
            const elementExpand = document.querySelectorAll('.hb-expand-cell__desc');

            elementExpand.forEach(element => {
                element.setAttribute('style', `--hb-max-height: ${element.scrollHeight}px`);
            });

            cellsActiveClick();

            // gsap.registerPlugin(ScrollTrigger);
            // gsap
            //     .timeline({
            //         scrollTrigger: {
            //             trigger: ".hb-expand-cell",
            //             scrub: 0.3,
            //             start: "top top",
            //             markers: true,
            //             pin: true
            //         }
            //     })
            //     .to(".hb-expand-cell__item", {
            //         className: "+=active",
            //         duration: 1,
            //         ease: "none",
            //         stagger: {
            //             each: 2,
            //             yoyo: true,
            //             repeat: 1
            //         }
            //     });

            // const sectionAnim = document.querySelectorAll('.hb-expand-cell__item');
            // const sectionAnimObserve = new IntersectionObserver((entries, observe) => {
            //     const [entry] = entries;
            //     if (!entry.isIntersecting) return;
            //     if (entry.target.classList.contains('hb-expand-cell__item')) {
            //         entry.target.classList.toggle('active');
            //         // observe.unobserve(entry.target);
            //     }
            // });
            // sectionAnim.forEach(section => {
            //     sectionAnimObserve.observe(section);
            // });


        } catch (e) {
            console.log(e)
        }
    }

    //navigation between screens func
    function screenNav(el) {
        let screenLogin = document.querySelector(`.hb-login`);
        let screenLoading = document.querySelector(`.hb-loading`);
        let screenError = document.querySelector(`.hb-error`);
        let screenSlider = document.querySelector(`.hb-content`);
        let activeCSSClass = 'active';

        let screensArr = [
            screenLogin,
            screenLoading,
            screenError,
            screenSlider
        ];
        screensArr.forEach(screen => {
            screen.classList.remove(activeCSSClass);
        });

        let targetScreen = document.querySelector(`.${el}`);
        if (targetScreen) {
            targetScreen.classList.add(activeCSSClass);
        }
    }

    function fillIDElWithContent(id, content) {
        let el = document.querySelector(`#${id}`);
        if (el) {
            el.innerHTML = content;
        }
    }

    function setProgressBarLength(val) {
        let progressLine = document.querySelector('#hb-progress-line');
        let progressToolTipLine = document.querySelector('#hb-progress-tooltip-line');
        let progressToolTipValue = document.querySelector('#hb-progress-tooltip-value');
        if (progressLine && progressToolTipLine && progressToolTipValue) {
            progressLine.style.width = `${val}%`;
            progressToolTipLine.style.width = `${val}%`;
            progressToolTipValue.innerHTML = `${val}%`;
        }
    }

    onceFetchIsDone()


    //form login + API fetch logic
    try {
        const API_BASE_URL = `https://us-central1-development-427007.cloudfunctions.net/`;
        const tempName = 'lacey_swift'
        const sampleIDForQuickDataAccess = '783b27d0-e9cf-4799-8d0a-84815ab544c7';

        function preparedToPostURL({type = 'instagram', accountId = tempName}) {
            //possible types: 'instagram', 'tiktok'
            return `${API_BASE_URL}execute_workflow?workflow=social_audit&social_media_type=${type}&social_account_id=${accountId}`
        }

        function getTrackRequestURL(id) {
            return `${API_BASE_URL}track_workflow?request_id=${id}`
        }

        let formEl = document.querySelector('.hb-login-form');
        let submitBtn = document.querySelector('#hb-login-submit-button');

        formEl.addEventListener('submit', e => {
            e.preventDefault();
            let instaLoginValue = formEl.querySelector('input[name="insta-login"]').value;
            let tiktokLoginValue = formEl.querySelector('input[name="tiktok-login"]').value;

            if (submitBtn) {
                //temp disable submit button to prevent many requests
                submitBtn.setAttribute('disabled', 'disabled');
                setTimeout(() => {
                    submitBtn.removeAttribute('disabled')
                }, 6000);
            }

            //use values if they are not empty
            if (instaLoginValue.trim() || tiktokLoginValue.trim()) {

                let socialNetworkType = '';
                let loginOfSocialNetworkToBeUsed = '';

                if (instaLoginValue.trim()) {
                    socialNetworkType = 'instagram';
                    loginOfSocialNetworkToBeUsed = instaLoginValue.trim();
                }
                if (tiktokLoginValue.trim()) {
                    socialNetworkType = 'tiktok';
                    loginOfSocialNetworkToBeUsed = tiktokLoginValue.trim();
                }

                axios.post(preparedToPostURL({
                    type: socialNetworkType,
                    accountId: loginOfSocialNetworkToBeUsed
                }))
                    .then(function (response) {

                    })
                    .catch(function (error) {
                        screenNav('hb-error')
                        console.log(error);
                    })

            }

        });


    } catch (e) {
        console.log(e)
    }


    //temp nav
    try {
        let navA = document.querySelectorAll('.hb-nav-test a');
        for (let i = 0; i < navA.length; i++) {
            navA[i].addEventListener('click', e => {
                let current = e.target;
                let attr = current.getAttribute('data-to-screen');
                if (attr) {
                    screenNav(attr);
                }
            })
        }

    } catch (e) {
        console.log(e);
    }

    //loading words
    try {
        let phrases = [
            `Analyzing your bio`,
            `Analyzing your audience engagement`,
            `Analyzing your talking videos`,
            `Creating your recommendations`,
        ];
        let currentPhrase = 0;

        let loadingHeading = document.querySelector('.hb-loading__text');
        let parentEl = loadingHeading.closest('.hb-loading');
        if (loadingHeading && phrases.length > 0) {
            setInterval(() => {
                if (!parentEl.classList.contains('active')) return;

                if ((currentPhrase + 1) < (phrases.length)) {
                    currentPhrase += 1;
                    loadingHeading.textContent = phrases[currentPhrase];
                } else {
                    currentPhrase = 0;
                    loadingHeading.textContent = phrases[currentPhrase];
                }
            }, 4000)
        }
    } catch (e) {
        console.log(e);
    }


    //test navigation code
    try {
        let hbScreenTest = document.querySelectorAll('.hb-screen-test');
        let activeCSSClass = 'active';
        let aTrigger = document.querySelectorAll('a[data-to-screen]');

        function deselect() {
            hbScreenTest.forEach(item => {
                item.classList.remove(activeCSSClass);
            })
        }

        aTrigger.forEach(item => {
            item.addEventListener('click', (e) => {
                let dataset = e.target.dataset.toScreen;
                deselect();
                let targetElement = document.querySelector(`#${dataset}`);
                targetElement.classList.add(activeCSSClass);
            })
        })

    } catch (e) {
        console.log(e)
    }

    //swiper
    try {
        const customPaginationValues = [
            'Info',
            'Highlights',
            'Bio',
            'Content',
            'Production',
            'Video example',
        ];

        let swiper = new Swiper(".mySwiper", {
            clickable: true,
            // initialSlide: 1, // initial slide
            pagination: {
                el: ".swiper-pagination1",
                clickable: true,
                renderBullet: function (index, className) {
                    return `<span class="hb-bullet ${className}"> <span class="hb-bullet__count">${index + 1}</span> <span class="hb-bullet__text">${customPaginationValues[index]}</span> </span>`;
                },
            },
            navigation: {
                nextEl: ".swiper-button-next1",
            },
        });
    } catch (e) {
        console.log(e)
    }

    //swiper footer form placeholder
    try {
        let input = document.querySelector('#hb-target-footer-input');
        let wrapper = document.querySelector('.hb-footer-form__wrapper');
        if (input) {
            let currentPlaceholder = input.placeholder;

            function focusIn() {
                input.placeholder = 'Insert your email for early access ';
                if (wrapper) {
                    wrapper.classList.add('active');
                }
            }

            function focusOut() {
                input.placeholder = currentPlaceholder;
                if (wrapper) {
                    wrapper.classList.remove('active');
                }
            }

            input.addEventListener('mouseover', () => {
                input.focus()
            });
            // input.addEventListener('mouseOut', focusIn);
            input.addEventListener('focus', focusIn);
            input.addEventListener('blur', focusOut);
        }
    } catch (e) {
        console.log(e)
    }


})