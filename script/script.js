window.addEventListener('DOMContentLoaded', () => {
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
        if(input) {
            let currentPlaceholder = input.placeholder;

            function focusIn(){
                input.placeholder = 'Insert your email for early access ';
                if(wrapper) {
                    wrapper.classList.add('active');
                }
            }
            function focusOut(){
                input.placeholder = currentPlaceholder;
                if(wrapper) {
                    wrapper.classList.remove('active');
                }
            }

            input.addEventListener('mouseover', ()=>{
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