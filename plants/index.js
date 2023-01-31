console.log("все требования учтены")

window.onload = function() {

    /// menu block

    const burger = document.querySelector('.burger')
    const nav = document.querySelector('nav')
    const body = document.querySelector('body')
    const main = document.querySelector('main')
    const navItems = document.querySelectorAll('nav ul li')
    const handleMenu = (type) => {
        if(window.innerWidth < 721) {
            if (type === 'toggle') {
                burger.classList.toggle('active')
                nav.classList.toggle('active')
                body.classList.toggle('lock')
            } else {
                burger.classList.remove('active')
                nav.classList.remove('active')
                body.classList.remove('lock')
            }
        }
    }

    burger.addEventListener('click', ()=> {
        handleMenu('toggle')
    })

    navItems.forEach(item => item.addEventListener('click', ()=>{
        handleMenu()
    }))

    main.addEventListener('click', ()=>{
        handleMenu()
    })

    // service block

    const serviceButtons = document.querySelectorAll('.service .button')
    const cards = document.querySelectorAll('.service-cards .card')

    let activeService = []

    const setThirdDisabled = () => {
        if (activeService.length === 2) {
            serviceButtons.forEach(button => {
                if (!activeService.includes(button.attributes['data-service'].value)) {
                    button.disabled = true
                }
            })
        }
    }
    const removeThirdDisabled = () => {
        if (activeService.length < 2) {
            serviceButtons.forEach(button => {
                    button.disabled = false

            })
        }
    }

    serviceButtons.forEach(btn => btn.addEventListener('click', (e)=>{
        if (!activeService.includes(e.target.attributes['data-service'].value) && activeService.length<2 ) {
            btn.classList.toggle('active')
            activeService.push(e.target.attributes['data-service'].value)
        } else if (activeService.includes(e.target.attributes['data-service'].value) && activeService.length<3 ){
            btn.classList.toggle('active')
            activeService = activeService.filter(i => i !== e.target.attributes['data-service'].value)
        }

        cards.forEach(card => {
            activeService.includes(card.attributes['data-service'].value) ? card.classList.add('blur') : card.classList.remove('blur')
        })
        removeThirdDisabled()
        setThirdDisabled()
    }))

    // accordion

    const priceItems = document.querySelectorAll('.prices-list-item')
    const accordionArrow = document.querySelectorAll('.prices-list-item .select-arrow')

    accordionArrow.forEach(item => {

        item.addEventListener('click', ()=>{
            console.log('click')
            priceItems.forEach(i => {
                if (i.classList.contains('open') && i !== item.parentElement.parentElement) {
                    i.classList.remove('open')
                }
            })

            item.parentElement.parentElement.classList.toggle('open')
        })
    })

    // select

    const citySelect = document.querySelector('.contact-city-choose-head')
    const citySelectOptions = document.querySelectorAll('.contact-city-choose-options ul li')
    const selectedCity = document.querySelector('.contact-city-chose-title')
    const addressCard = document.querySelector('.contact-city-addresses')
    const cardCityField = document.querySelector('.contact-city-addresses .city')
    const cardPhoneField = document.querySelector('.contact-city-addresses .phone')
    const cardAddressField = document.querySelector('.contact-city-addresses .address')
    const callButton = document.querySelector('.contact-city-address')

    const cityInfo = [
        {
            city: 'Yonkers, NY',
            phone: '+1 914 678 0003',
            address: '511 Warburton Ave'
        },
        {
            city: 'Canandaigua, NY',
            phone: '+1 585 393 0001',
            address: '151 Charlotte Street'
        },
        {
            city: 'Sherrill, NY',
            phone: '+1 315 908 0004',
            address: '14 WEST Noyes BLVD'
        },
        {
            city: 'New York City',
            phone: '+1 212 456 0002',
            address: '9 East 91st Street'
        },
    ]


    const fillCard = (cityName) => {
        const selectedCity = cityInfo.find(item => item.city === cityName)
        cardCityField.textContent = selectedCity.city || ''
        cardPhoneField.textContent = selectedCity.phone || ''
        cardAddressField.textContent = selectedCity.address || ''
        callButton.href = `tel:${selectedCity.phone || ''}`
    }

    const handleSelected = (option) => {
        option.classList.toggle('selected')
        if (option.classList.contains("selected")) {
            selectedCity.textContent = option.textContent
            addressCard.classList.add('opened')
            fillCard(option.textContent)
        } else {
            selectedCity.textContent = "City"
            addressCard.classList.remove('opened')
        }
        citySelect.classList.remove('opened')
    }

    citySelect.addEventListener('click', ()=>{
        citySelect.classList.toggle('opened')
    })

    citySelectOptions.forEach(option => {
        option.addEventListener('click', ()=>{
            citySelectOptions.forEach(opt => {
                if (opt !== option) {
                    opt.classList.remove('selected')
                }
            })
            handleSelected(option)
        })
    })

};