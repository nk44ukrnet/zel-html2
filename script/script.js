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

    function returnFormattedAccordionItems(data) {
        let output = ``;
        data.forEach(item=>{
            let itemSplit = item.split(':');
            let heading = itemSplit[0].replaceAll('*', '');
            itemSplit.shift();
            let restContent = itemSplit.join(':');
            output += `<div class="hb-expand-cell__item active">
                                        <strong class="hb-expand-cell__heading">
                                            ${heading}
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
        }
    }

    function setPercentagePercent(element, percentage){
        let displayPercentage = 100 - (percentage * 10);
        element.style.setProperty('--fill', `${displayPercentage}%`);
    }

    //onceFetchIsDone()


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
            let tiktokLoginValue = formEl.querySelector('input[name="tiktok-login"]').value;

            if (submitBtn) {
                //temp disable submit button to prevent many requests
                submitBtn.setAttribute('disabled', 'disabled');
                setTimeout(() => {
                    submitBtn.removeAttribute('disabled')
                }, 10000);
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
                                            if (data.elapsed_percentage > 10) {
                                                setProgressBarLength(data.elapsed_percentage);
                                            } else {
                                                setProgressBarLength(10);
                                            }
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
                                                const consistencyContent = results.userInfo.numRecentPosts;
                                                const nicheContent = results.userInfo.account_info.area_of_expertise; //arr
                                                //slide2
                                                const profSummaryUlContent = results.userInfo.highlights.profile_highlights; //arr
                                                const profImageContent = results.userInfo.profile_pic;
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
                                                    console.log('targetAudienceContent done')
                                                }
                                                if (primaryTopicLabelContent && primaryTopicLabel) {
                                                    primaryTopicLabel.innerHTML = primaryTopicLabelContent;
                                                    console.log('primaryTopicLabelContent done')
                                                }
                                                if (followersContent && followers) {
                                                    followers.innerHTML = followersContent;
                                                    console.log('followers done')
                                                }
                                                if (professionContent &&  profession) {
                                                    profession.innerHTML = professionContent;
                                                    console.log('profession done')
                                                }
                                                if(consistencyContent && consistency) {
                                                    consistency.innerHTML = consistencyContent;
                                                    console.log(`consistencyContent done`);
                                                }
                                                // if(engagementRateContent && engagementRate) {
                                                //     engagementRate.innerHTML = engagementRateContent;
                                                //     console.log('engagementRate done')
                                                // }
                                                if(nicheContent && nicheContent.length && niche) {
                                                    niche.innerHTML = nicheContent.map(item => `<span>${item}</span>`).join('');
                                                    console.log('nicheContent done');
                                                }
                                                //slide2
                                                if(profSummaryUlContent && profSummaryUlContent.length && profSummaryUl) {
                                                    profSummaryUl.innerHTML = returnFormattedAccordionItems(profSummaryUlContent);
                                                    console.log('profSummaryUlContent done')
                                                }
                                                if(profImage && profImageContent) {
                                                    profImage.setAttribute('src', profImageContent);
                                                    console.log(`profImageContent done`);
                                                }
                                                if(profName && profNameContent) {
                                                    profName.innerHTML = profNameContent;
                                                    console.log(`profNameContent done`)
                                                }
                                                if(profDescription && profDescriptionContent){
                                                    profDescription.innerHTML = profDescriptionContent;
                                                    console.log(`profDescriptionContent done`);
                                                }
                                                //slide3
                                                if(bioScoreNumsContent && bioScoreNums) {
                                                    bioScoreNums.innerHTML = bioScoreNumsContent;
                                                    console.log('bioScoreNumsContent done');
                                                }
                                                if(bioPercentage && bioScoreNumsContent) {
                                                    setPercentagePercent(bioPercentage, bioScoreNumsContent)
                                                    console.log(`bioPercentage done`);
                                                }
                                                if(bioListUlContent && bioListUlContent.length && bioListUl) {
                                                    bioListUl.innerHTML = returnFormattedAccordionItems(bioListUlContent);
                                                    console.log('bioListUl done');
                                                }
                                                //slide4
                                                if(contentScoreNumsContent && contentScoreNums) {
                                                    contentScoreNums.innerHTML = contentScoreNumsContent;
                                                    console.log('contentScoreNumsContent done');
                                                }
                                                if(contentScoreListUlContent && contentScoreListUlContent.length && contentScoreListUl) {
                                                    contentScoreListUl.innerHTML = returnFormattedAccordionItems(contentScoreListUlContent);
                                                    console.log('contentScoreListUlContent done');
                                                }
                                                if(contentPercentage && contentScoreNumsContent){
                                                    setPercentagePercent(contentPercentage, contentScoreNumsContent);
                                                    console.log('contentPercentage done');
                                                }
                                                //slide 5
                                                if(prodScoreNumsContent && prodScoreNums){
                                                    prodScoreNums.innerHTML = prodScoreNumsContent;
                                                    console.log('prodScoreNumsContent done');
                                                }
                                                if(prodScoreListUlContent && prodScoreListUlContent.length && prodScoreListUl) {
                                                    prodScoreListUl.innerHTML = returnFormattedAccordionItems(prodScoreListUlContent);
                                                    console.log('prodScoreListUlContent done');
                                                }
                                                if(prodScorePercentage && prodScoreNumsContent) {
                                                    setPercentagePercent(prodScorePercentage, prodScoreNumsContent);
                                                    console.log('prodScorePercentage done');
                                                }
                                                //final-slide
                                                if(videScoreImgContent && videScoreImg) {
                                                    videScoreImg.setAttribute('src', videScoreImgContent);
                                                    console.log('videScoreImg done');
                                                }
                                                if(videScoreImgType && socialNetworkType === 'tiktok') {
                                                    videScoreImgType.classList.add('hb-img-long');
                                                }
                                                if(videScoreListUlContent && videScoreListUlContent.length && videScoreListUl) {
                                                    videScoreListUl.innerHTML = returnFormattedAccordionItems(videScoreListUlContent);
                                                    console.log('videScoreListUlContent done');
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
            //initialSlide: 1, // initial slide
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