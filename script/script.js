window.addEventListener('DOMContentLoaded', () => {
    const MOB_SIZE = 768;
    let loadingProgress = 0;

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
        setTimeout(() => {
            let activeSlide = document.querySelectorAll('.hb-content.active .swiper-slide.swiper-slide-active .hb-expand-cell__item');
            if (activeSlide.length) {
                let hasActiveSlides = false;

                activeSlide.forEach(cell => {
                    if (cell.classList.contains('active')) {
                        hasActiveSlides = true;
                    }
                })

                if (hasActiveSlides === false) {
                    activeSlide[0].classList.add('active');
                }
            }
        }, 200);

        /* let cells = document.querySelectorAll('.hb-expand-cell');
         if (cells.length) {
             cells.forEach(cell => {
                 let cellItems = cell.querySelectorAll('.hb-expand-cell__item');
                 if (cellItems.length) {
                     let firstItem = '';
                     for (let i = 0; i < cellItems.length; i++) {
                         cellItems[i].classList.remove('active');
                         if (i === 0) {
                             // continue;
                             // setTimeout(() => {
                                 cellItems[i].classList.add('active');
                             // }, 400)
                             firstItem = cellItems[i];
                         } //else {
                             cellItems[i].classList.remove('active');
                         //}
                         cellItems[i].classList.remove('active');
                     }
                     setTimeout(()=>{
                         firstItem.classList.add('active');
                     }, 200)
                     // firstItem.classList.add('active');
                 }
             })
         }*/
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

    function numberFormatOutput(num) {
        if (num < 1000) {
            return num.toString(); // Return as is if less than 1000
        } else if (num >= 1000 && num < 1000000) {
            const formatted = (num / 1000).toFixed(1);
            return formatted.endsWith('.0') ? parseInt(formatted) + 'K' : formatted + 'K';
        } else if (num >= 1000000) {
            const formatted = (num / 1000000).toFixed(1);
            return formatted.endsWith('.0') ? parseInt(formatted) + 'M' : formatted + 'M';
        }
    }

    function onceFetchIsDone() {
        try {

            let cells = document.querySelectorAll('.hb-expand-cell');
            if (cells.length) {
                // cellsInitialSetup();
                // cellsActiveOnlyFirst();
            }
            const elementExpand = document.querySelectorAll('.hb-expand-cell__desc');

            elementExpand.forEach(element => {
                element.setAttribute('style', `--hb-max-height: ${element.scrollHeight}px`);
            });

            cellsActiveClick();


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

    //todo: comment it
    // screenNav('hb-content');

    function returnFormattedAccordionItems(data) {
        let output = ``;
        data.forEach(item => {
            let itemSplit = item.split(':');
            let heading = itemSplit[0].replaceAll('*', '');
            itemSplit.shift();
            let restContent = itemSplit.join(':');
            output += `<div class="hb-expand-cell__item">
                                        <strong class="hb-expand-cell__heading">
                                        <span class="hb-expand-cell__num"><span></span></span>
                                            <span class="hb-expand-cell__heading-text">${heading}</span>
                                        </strong>
                                        <div class="hb-expand-cell__desc" style="--hb-max-height: 151px">
                                            ${restContent}
                                        </div>
                                    </div>`
        });
        return output;
    }

    function setProgressBarLength(val) {
        let progressLine = document.querySelector('#hb-progress-line');
        let progressToolTipLine = document.querySelector('#hb-progress-tooltip-line');
        let progressToolTipValue = document.querySelector('#hb-progress-tooltip-value');
        if (progressLine && progressToolTipLine && progressToolTipValue) {
            progressLine.style.width = `${val}%`;
            progressToolTipLine.style.width = `${val}%`;
            progressToolTipValue.innerHTML = `${val}%`;
            if (val <= 6) {
                progressLine.style.borderRadius = `50%`;
            } else {
                progressLine.style.borderRadius = ``;
            }
        }
        loadingProgress = val;
    }

    //todo: comment it
    //setProgressBarLength('94')

    function setPercentagePercent(element, percentage) {
        let displayPercentage = 100 - (percentage * 10);
        element.style.setProperty('--fill', `${displayPercentage}%`);
    }

    //todo: comment it
    //onceFetchIsDone();

    //slider mail form submit
    try {
        let formSliderWrapper = document.querySelector('.hb-footer-form');
        let formSliderMail = document.querySelector('.hb-footer-form form');
        let formInputMail = document.querySelector('#hb-target-footer-input');
        let formErrorClass = 'hb-form-has-error';

        formSliderMail.addEventListener('submit', event => {
            event.preventDefault();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailPattern.test(formInputMail.value)) {
                formSliderWrapper.classList.remove(formErrorClass);
            } else {
                formSliderWrapper.classList.add(formErrorClass);
            }

        })

    } catch (e) {
        console.log(e);
    }


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

        //content fillers
        //slide1
        const targetAudience = document.querySelector(`#hb-target-audience`); //+
        const primaryTopicLabel = document.querySelector(`#hb-primary-topic-label`); //+
        const followers = document.querySelector(`#hb-followers`); //+
        const profession = document.querySelector(`#hb-profession`); //+
        // const engagementRate = document.querySelector(`#hb-engagement-rate`);
        const consistency = document.querySelector(`#hb-consistency`); //+
        const niche = document.querySelector(`#hb-niche`); //+
        //slide2
        const profSummaryUl = document.querySelector(`#hb-prof-summary-ul`); //+
        const profImage = document.querySelector(`#hb-prof-img`); //+
        const profName = document.querySelector(`#hb-prof-name`); //+
        const profDescription = document.querySelector(`#hb-prof-description`); //+
        //slide3
        const bioScoreNums = document.querySelector(`#hb-bio-score-nums`); //+
        const bioListUl = document.querySelector(`#hb-bio-list`); //+
        const bioPercentage = document.querySelector(`#hb-bio-percentage`); //+
        //slide4
        const contentScoreNums = document.querySelector(`#hb-content-score-num`); //+
        const contentScoreListUl = document.querySelector(`#hb-content-score-list`); //+
        const contentPercentage = document.querySelector(`#hb-content-percentage`); //+
        //slide5
        const prodScoreNums = document.querySelector(`#hb-prod-score-num`); //+
        const prodScoreListUl = document.querySelector(`#hb-prod-score-list`); //+
        const prodScorePercentage = document.querySelector(`#hb-prod-score-percentage`); //+
        //final-slide
        const videScoreImg = document.querySelector(`#hb-video-score-img`);
        const videScoreImgType = document.querySelector(`#hb-video-score-img-type`);
        const videScoreListUl = document.querySelector(`#hb-video-score-list`); //+

        let formEl = document.querySelector('.hb-login-form');
        let submitBtn = document.querySelector('#hb-login-submit-button');

        formEl.addEventListener('submit', e => {
            e.preventDefault();
            let instaLoginValue = formEl.querySelector('input[name="insta-login"]').value;
            let instaLoginEl = formEl.querySelector('input[name="insta-login"]').closest('.hb-login-form__item');
            let tiktokLoginValue = formEl.querySelector('input[name="tiktok-login"]').value;
            let tiktokLoginEl = formEl.querySelector('input[name="tiktok-login"]').closest('.hb-login-form__item');

            let inputErrCSSClass = 'hb-has-error';

            if (submitBtn) {
                //temp disable submit button to prevent many requests
                if (instaLoginValue.trim() === '' && tiktokLoginValue.trim() === '') {
                    instaLoginEl.classList.add(inputErrCSSClass);
                    tiktokLoginEl.classList.add(inputErrCSSClass);
                } else {
                    submitBtn.setAttribute('disabled', 'disabled');
                    instaLoginEl.classList.remove(inputErrCSSClass);
                    tiktokLoginEl.classList.remove(inputErrCSSClass);
                    setTimeout(() => {
                        submitBtn.removeAttribute('disabled')
                    }, 10000);
                }

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
                        if (response.data.request_id) {
                            let requestID = response.data.request_id;
                            screenNav('hb-loading');

                            async function getLoadingData(requestID) {
                                const intervalID = setInterval(async () => {
                                    try {
                                        let trackResponse = await axios.get(getTrackRequestURL(requestID));
                                        let data = trackResponse.data;
                                        if (data.elapsed_percentage !== undefined && data.elapsed_percentage < 100) {
                                            console.log(`Progress: ${data.elapsed_percentage}%`);
                                            setProgressBarLength(data.elapsed_percentage);
                                        } else {
                                            console.log('Final data:', data);
                                            let results = data.results_data;
                                            if (results) {

                                                //slide1
                                                const targetAudienceContent = results.userInfo.account_info.target_audience;
                                                const primaryTopicLabelContent = results.userInfo.account_info.primary_topic;
                                                const followersContent = results.userInfo.followers;
                                                const professionContent = results.userInfo.account_info.profession;
                                                // const engagementRateContent = results.userInfo.results_summary.engagement_rate;
                                                const consistencyContent = results.userInfo.results_summary.consistency_score;
                                                const nicheContent = results.userInfo.account_info.area_of_expertise; //arr
                                                //slide2
                                                const profSummaryUlContent = results.userInfo.highlights.profile_highlights; //arr
                                                const profImageContent = results.userInfo.localProfilePic;
                                                const profNameContent = results.social_account_id;
                                                const profDescriptionContent = results.userInfo.biography;
                                                //slide3
                                                const bioScoreNumsContent = results.userInfo.results_summary.bio_score;
                                                const bioListUlContent = results.userInfo.highlights.bio_highlights; // arr
                                                //slide4
                                                const contentScoreNumsContent = results.userInfo.results_summary.overall_content_score;
                                                const contentScoreListUlContent = results.userInfo.highlights.content_highlights; //arr
                                                //slide 5
                                                const prodScoreNumsContent = results.userInfo.results_summary.overall_production_score;
                                                const prodScoreListUlContent = results.userInfo.highlights.production_highlights; //arr
                                                //final-slide
                                                const videScoreImgContent = results.userInfo.results_summary.deep_dive_thumbnail;
                                                const videScoreListUlContent = results.userInfo.highlights.deep_dive_highlights; //arr

                                                if (targetAudienceContent && targetAudience) {
                                                    targetAudience.innerHTML = targetAudienceContent;
                                                }
                                                if (primaryTopicLabelContent && primaryTopicLabel) {
                                                    primaryTopicLabel.innerHTML = primaryTopicLabelContent;
                                                }
                                                if (followersContent && followers) {
                                                    followers.innerHTML = numberFormatOutput(followersContent);
                                                }
                                                if (professionContent && profession) {
                                                    profession.innerHTML = professionContent;
                                                }
                                                if (consistencyContent && consistency) {
                                                    consistency.innerHTML = consistencyContent;
                                                }
                                                // if(engagementRateContent && engagementRate) {
                                                //     engagementRate.innerHTML = engagementRateContent;
                                                //     console.log('engagementRate done')
                                                // }

                                                if (nicheContent && nicheContent.length && niche) {
                                                    niche.innerHTML = nicheContent.map(item => `<span>${item}</span>`).join('');
                                                }
                                                //slide2
                                                if (profSummaryUlContent && profSummaryUlContent.length && profSummaryUl) {
                                                    profSummaryUl.innerHTML = returnFormattedAccordionItems(profSummaryUlContent);
                                                }
                                                if (profImage && profImageContent) {
                                                    profImage.setAttribute('src', profImageContent);
                                                }
                                                if (profName && profNameContent) {
                                                    profName.innerHTML = profNameContent;
                                                }
                                                if (profDescription && profDescriptionContent) {
                                                    profDescription.innerHTML = profDescriptionContent;
                                                }
                                                //slide3
                                                if (bioScoreNumsContent && bioScoreNums) {
                                                    bioScoreNums.innerHTML = bioScoreNumsContent;
                                                }
                                                if (bioPercentage && bioScoreNumsContent) {
                                                    setPercentagePercent(bioPercentage, bioScoreNumsContent)
                                                }
                                                if (bioListUlContent && bioListUlContent.length && bioListUl) {
                                                    bioListUl.innerHTML = returnFormattedAccordionItems(bioListUlContent);
                                                }
                                                //slide4
                                                if (contentScoreNumsContent && contentScoreNums) {
                                                    contentScoreNums.innerHTML = contentScoreNumsContent;
                                                }
                                                if (contentScoreListUlContent && contentScoreListUlContent.length && contentScoreListUl) {
                                                    contentScoreListUl.innerHTML = returnFormattedAccordionItems(contentScoreListUlContent);
                                                }
                                                if (contentPercentage && contentScoreNumsContent) {
                                                    setPercentagePercent(contentPercentage, contentScoreNumsContent);
                                                }
                                                //slide 5
                                                if (prodScoreNumsContent && prodScoreNums) {
                                                    prodScoreNums.innerHTML = prodScoreNumsContent;
                                                }
                                                if (prodScoreListUlContent && prodScoreListUlContent.length && prodScoreListUl) {
                                                    prodScoreListUl.innerHTML = returnFormattedAccordionItems(prodScoreListUlContent);
                                                }
                                                if (prodScorePercentage && prodScoreNumsContent) {
                                                    setPercentagePercent(prodScorePercentage, prodScoreNumsContent);
                                                }
                                                //final-slide
                                                if (videScoreImgContent && videScoreImg) {
                                                    videScoreImg.setAttribute('src', videScoreImgContent);
                                                }
                                                if (videScoreImgType && socialNetworkType === 'tiktok') {
                                                    videScoreImgType.classList.add('hb-img-long');
                                                }
                                                if (videScoreListUlContent && videScoreListUlContent.length && videScoreListUl) {
                                                    videScoreListUl.innerHTML = returnFormattedAccordionItems(videScoreListUlContent);
                                                }

                                                //switch to slider screen
                                                screenNav('hb-content');
                                                //run accordion logic
                                                onceFetchIsDone();

                                            } else {
                                                screenNav('hb-error');
                                            }
                                            clearInterval(intervalID);  // Stop polling
                                        }


                                    } catch (error) {
                                        console.log('Error fetching data:', error);
                                        clearInterval(intervalID);
                                        screenNav('hb-error');
                                    }
                                }, 2000) // Poll every 2 seconds
                            }

                            // Call the async function to start polling
                            getLoadingData(requestID);

                        } else {
                            screenNav('hb-error');
                        }
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


    //loading words
    try {
        let phrases = [
            `Analyzing your primary topic, target audience and niche`,
            `Analyzing your bio`,
            `Analyzing your posts`,
            `Analyzing your posting consistency`,
            `Analyzing your latest talking videos’ content`,
            `Analyzing your hooks punchiness`,
            `Analyzing script tightness`,
            `Analyzing Call-To-Action clarity and effectiveness`,
            `Analyzing your latest talking videos’ production level`,
            `Creating your personal recommendations
`,
        ];
        let currentPhrase = 0;

        let loadingHeading = document.querySelector('.hb-loading__text');
        let parentEl = loadingHeading.closest('.hb-loading');
        if (loadingHeading && phrases.length > 0) {
           let currentInterval =  setInterval(() => {
                if (!parentEl.classList.contains('active')) return;

                if(loadingProgress >= 95) {
                    loadingHeading.textContent = phrases[phrases.length - 1];
                    return;
                }

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
            //initialSlide: 6, // initial slide todo: comment it
            pagination: {
                el: ".swiper-pagination1",
                clickable: true,
                renderBullet: function (index, className) {
                    return `<span class="hb-bullet ${className}"> <span class="hb-bullet__count"><span>${index + 1}</span></span> <span class="hb-bullet__text">${customPaginationValues[index]}</span> </span>`;
                },
            },
            navigation: {
                nextEl: ".swiper-button-next1",
            },
            on: {
                slideChange: function () {
                    cellsActiveOnlyFirst(); // Call your function here
                }
            }
        });

        let customSwiperPrevButton = document.querySelector('.swiper-custom-button-prev');
        let customSwiperNextButton = document.querySelector('.swiper-custom-button-next');
        if (customSwiperPrevButton && customSwiperNextButton) {
            customSwiperPrevButton.addEventListener('click', function () {
                console.log('prev click')
                swiper.slidePrev();
            })
            customSwiperNextButton.addEventListener('click', function () {
                swiper.slideNext();
            })
        }

        // Function to check if screen size matches the criteria
        function isScreenSizeMatch() {
            //with this dimension it shouldn't be a scrollbar
            return window.innerWidth > 1220 && window.innerHeight > 694;
        }

        // Add scroll event listener
        window.addEventListener("mousewheel", () => {
            let sliderHolder = document.querySelector('.hb-content');

            if (isScreenSizeMatch() && sliderHolder.classList.contains('active')) {

                const {scrollY, innerHeight} = window;
                const documentHeight = document.documentElement.scrollHeight;

                // Check if the user scrolled near the bottom (within 100px of the bottom)
                if (scrollY + innerHeight >= documentHeight - 100) {
                    swiper.slideNext(); // Move to the next slide
                }
            }
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

            function handleMobileScreensInput() {
                if (window.innerWidth < MOB_SIZE) {
                    if (wrapper) {
                        wrapper.classList.add('active');
                        input.placeholder = 'Insert your email for early access ';
                    }
                }
            }

            window.addEventListener('resize', handleMobileScreensInput);
            handleMobileScreensInput();

            function focusIn() {
                if (window.innerWidth > MOB_SIZE) {
                    input.placeholder = 'Insert your email for early access ';
                    if (wrapper) {
                        wrapper.classList.add('active');
                    }
                }
            }

            function focusOut() {
                if (window.innerWidth > MOB_SIZE) {
                    input.placeholder = currentPlaceholder;
                    if (wrapper) {
                        wrapper.classList.remove('active');
                    }
                }
            }

            input.addEventListener('mouseover', () => {
                if (window.innerWidth > MOB_SIZE) {
                    input.focus();
                }
            });
            // input.addEventListener('mouseOut', focusIn);
            input.addEventListener('focus', focusIn);
            input.addEventListener('blur', focusOut);
        }
    } catch (e) {
        console.log(e)
    }


})